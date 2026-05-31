"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Infinite Canvas — pan-anywhere, wrap-forever image space.
 *
 * Architecture (inspired by edoardolunardi/infinite-canvas):
 *
 *  1. A base "world" of WORLD_W × WORLD_H holds every tile at a
 *     fixed position. We render a 3×3 grid of copies of that world
 *     so the visible viewport always has neighbours in every
 *     direction.
 *  2. Pan position wraps with modulo whenever it exceeds ±WORLD/2.
 *     Because every copy is identical, the wrap is invisible.
 *  3. Motion uses a velocity model on requestAnimationFrame:
 *       targetVel  ← decayed each frame
 *       vel        ← lerps toward targetVel
 *       pan        += vel
 *     Drag injects pointer deltas into targetVel — releasing gives
 *     natural momentum.
 *  4. Wheel scrolls the zoom (no modifier needed). Scroll down zooms
 *     out, scroll up zooms in. Pinch (ctrl/⌘-wheel) does the same.
 *     Zoom is cursor-anchored: the world point under the cursor
 *     stays put.
 *  5. A radial vignette fades content toward the edges so the canvas
 *     reads as a focused, breathing field rather than a wallpaper.
 */

// ── World geometry ───────────────────────────────────────────────
const WORLD_W = 4400;
const WORLD_H = 3200;

const MOBILE_W = 230;
const MOBILE_H = 500;
const LAND_W = 440;
const LAND_H = 248;

const COLS = 10;
const ROWS = 7;

// Scattered grid cells reserved for the 9 mobile screens — they
// punctuate the landscape board rather than clustering.
const MOBILE_CELLS: ReadonlyArray<readonly [number, number]> = [
  [1, 1],
  [4, 0],
  [8, 2],
  [2, 3],
  [6, 4],
  [0, 5],
  [9, 5],
  [3, 6],
  [7, 6],
];

type Tile = {
  id: string;
  src: string;
  alt: string;
  x: number; // world coords (0..WORLD_W, 0..WORLD_H)
  y: number;
  w: number;
  h: number;
  portrait: boolean;
};

function buildWorld(): Tile[] {
  const cellW = WORLD_W / COLS;
  const cellH = WORLD_H / ROWS;
  const mobileLookup = new Map<string, number>();
  MOBILE_CELLS.forEach(([c, r], i) => mobileLookup.set(`${c},${r}`, i));

  const tiles: Tile[] = [];
  let landIdx = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Brick-shift even rows for organic rhythm.
      const brick = r % 2 === 0 ? 0 : cellW * 0.3;
      const baseX = c * cellW + cellW / 2 + brick;
      const baseY = r * cellH + cellH / 2;

      // Deterministic jitter so the grid breathes.
      const jx = ((c * 73 + r * 31) % 110) - 55;
      const jy = ((r * 47 + c * 29) % 90) - 45;

      // Size variation in 0.7 – 1.35 range — adds the moodboard feel.
      const sizeMul = 0.7 + ((c * 17 + r * 13) % 65) / 100;

      const mobileIdx = mobileLookup.get(`${c},${r}`);
      if (mobileIdx !== undefined) {
        tiles.push({
          id: `m-${c}-${r}`,
          src: `/works-mobile/mobile-${String(mobileIdx + 1).padStart(2, "0")}.png`,
          alt: `Mobile work ${mobileIdx + 1}`,
          x: baseX + jx,
          y: baseY + jy,
          w: MOBILE_W * sizeMul,
          h: MOBILE_H * sizeMul,
          portrait: true,
        });
      } else if (landIdx < 55) {
        tiles.push({
          id: `l-${c}-${r}`,
          src: `/placeholder-images/${String(landIdx + 1).padStart(2, "0")}.png`,
          alt: `Project ${landIdx + 1}`,
          x: baseX + jx,
          y: baseY + jy,
          w: LAND_W * sizeMul,
          h: LAND_H * sizeMul,
          portrait: false,
        });
        landIdx++;
      }
    }
  }
  return tiles;
}

const COPY_OFFSETS: ReadonlyArray<readonly [number, number]> = (() => {
  const out: Array<[number, number]> = [];
  for (let dy = 0; dy < 3; dy++)
    for (let dx = 0; dx < 3; dx++) out.push([dx, dy]);
  return out;
})();

export default function InfiniteCanvas({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const tiles = useMemo(() => buildWorld(), []);

  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  // All hot-path state lives in a ref — RAF mutates it without
  // triggering re-renders.
  const stateRef = useRef({
    panX: 0,
    panY: 0,
    velX: 0,
    velY: 0,
    targetVelX: 0,
    targetVelY: 0,
    scale: 1,
    targetScale: 1,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  // RAF velocity + scale loop — runs while the canvas is open.
  useEffect(() => {
    if (!open) return;

    const s = stateRef.current;
    s.panX = 0;
    s.panY = 0;
    s.velX = 0;
    s.velY = 0;
    s.targetVelX = 0;
    s.targetVelY = 0;
    s.scale = 1;
    s.targetScale = 1;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const VEL_LERP = 0.16;
    const VEL_DECAY = 0.91;
    const SCALE_LERP = 0.12;

    let raf = 0;
    const tick = () => {
      // Lerp current velocity toward target.
      s.velX += (s.targetVelX - s.velX) * VEL_LERP;
      s.velY += (s.targetVelY - s.velY) * VEL_LERP;

      // Integrate.
      s.panX += s.velX;
      s.panY += s.velY;

      // Wrap the pan so it stays in [-WORLD/2, WORLD/2]. Because every
      // copy of the world is identical, this wrap is visually
      // continuous — the heart of the "infinite" effect.
      if (s.panX > WORLD_W / 2) s.panX -= WORLD_W;
      else if (s.panX < -WORLD_W / 2) s.panX += WORLD_W;
      if (s.panY > WORLD_H / 2) s.panY -= WORLD_H;
      else if (s.panY < -WORLD_H / 2) s.panY += WORLD_H;

      // Decay target velocity — no input means motion glides to a stop.
      s.targetVelX *= VEL_DECAY;
      s.targetVelY *= VEL_DECAY;
      if (Math.abs(s.targetVelX) < 0.005) s.targetVelX = 0;
      if (Math.abs(s.targetVelY) < 0.005) s.targetVelY = 0;

      // Smooth zoom.
      s.scale += (s.targetScale - s.scale) * SCALE_LERP;

      if (surfaceRef.current) {
        surfaceRef.current.style.transform = `translate3d(${-s.panX}px, ${-s.panY}px, 0) scale(${s.scale})`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Wheel + pinch: zoom (cursor-anchored). Scroll down zooms out.
  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = stateRef.current;

      // Same formula handles both vertical scroll and pinch-zoom
      // (pinch arrives as ctrlKey+wheel on macOS).
      const sensitivity = e.ctrlKey || e.metaKey ? 0.012 : 0.0022;
      const delta = -e.deltaY * sensitivity;

      const oldScale = s.targetScale;
      const newScale = Math.max(0.35, Math.min(2.6, oldScale + delta));
      if (newScale === oldScale) return;

      // Cursor-anchored zoom: keep the world point under the cursor
      // pinned in place across the zoom.
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;

      const ratio = newScale / oldScale;
      s.panX = cx + (s.panX - cx) * ratio;
      s.panY = cy + (s.panY - cy) * ratio;

      s.targetScale = newScale;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open]);

  // Pointer drag injects velocity. Pointer capture keeps drag alive
  // when the cursor crosses child tiles.
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== 0 && e.pointerType !== "touch") return;
    const s = stateRef.current;
    s.isDragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    // Inject into targetVel — drag feels weighty + throws fling.
    s.targetVelX -= dx * 0.55;
    s.targetVelY -= dy * 0.55;
  };

  const endDrag: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    s.isDragging = false;
    setDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  const recenter = () => {
    const s = stateRef.current;
    s.targetVelX = -s.panX * 0.15;
    s.targetVelY = -s.panY * 0.15;
    s.targetScale = 1;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="canvas-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onDoubleClick={recenter}
          className="fixed inset-0 z-[200] bg-canvas overflow-hidden"
          style={{
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
        >
          {/* The pan surface lives at the viewport centre; its top-left
              corner is offset so the middle copy of the world sits at
              (0,0) viewport-space. JS rewrites the transform every
              animation frame. */}
          <div
            ref={surfaceRef}
            className="absolute will-change-transform pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              width: WORLD_W * 3,
              height: WORLD_H * 3,
              marginLeft: -WORLD_W * 1.5,
              marginTop: -WORLD_H * 1.5,
              transformOrigin: "center center",
            }}
          >
            {COPY_OFFSETS.map(([dx, dy]) => (
              <div
                key={`${dx}-${dy}`}
                className="absolute"
                style={{
                  left: dx * WORLD_W,
                  top: dy * WORLD_H,
                  width: WORLD_W,
                  height: WORLD_H,
                }}
              >
                {tiles.map((tile) => (
                  <div
                    key={`${dx}-${dy}-${tile.id}`}
                    className="absolute rounded-md overflow-hidden card-luminous soft-hairline"
                    style={{
                      left: tile.x,
                      top: tile.y,
                      width: tile.w,
                      height: tile.h,
                      transform: "translate(-50%, -50%)",
                      background: tile.portrait
                        ? "rgb(24,29,38)"
                        : "rgb(248,250,252)",
                    }}
                  >
                    <Image
                      src={tile.src}
                      alt={tile.alt}
                      fill
                      sizes={tile.portrait ? "230px" : "440px"}
                      unoptimized={!tile.portrait}
                      className={
                        tile.portrait
                          ? "object-contain p-2"
                          : "object-cover"
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Radial vignette — focuses attention on the centre and
              dampens the visual repeat of the wrap. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at center, transparent 0%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.75) 88%, rgba(255,255,255,1) 100%)",
            }}
          />

          {/* Top hint pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[210] flex items-center gap-2 rounded-full bg-canvas/90 backdrop-blur border border-hairline px-4 py-2 text-caption text-muted shadow-sm"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-signature-coral animate-ping" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signature-coral" />
            </span>
            Drag to pan · Scroll to zoom · {tiles.length} works · Infinite
          </motion.div>

          {/* Exit pill */}
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[210] inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-3 text-body-md font-medium hover:scale-[1.04] active:scale-100 transition-transform shadow-lg"
            aria-label="Exit experience"
          >
            Exit experience
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
