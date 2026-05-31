"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Fullscreen pan-anywhere image canvas. Inspired by the Codrops
 * infinite-canvas reference — a single draggable surface holds every
 * work tile at a fixed coord in a large virtual space. The user pans
 * the surface; momentum carries the throw.
 *
 * Behaviour
 *   • Drag to pan with momentum
 *   • Mouse-wheel + trackpad pinch to zoom (clamped 0.4 → 1.8)
 *   • Cursor: grab when idle, grabbing during drag
 *   • Esc closes; clicks on tiles do nothing (no nested links here)
 */

type AspectKey = "portrait" | "landscape";
type Tile = {
  id: string;
  src: string;
  alt: string;
  aspect: AspectKey;
  x: number; // virtual position, viewport centre = (0,0)
  y: number;
  w: number;
  h: number;
};

const MOBILE_W = 260;
const MOBILE_H = 560;
const LAND_W = 460;
const LAND_H = 258;

// Build a deterministic, gently-jittered grid that scatters all works
// across a large virtual surface. Even-numbered grid rows are bricked
// half a cell to the right so the canvas does not feel like a spreadsheet.
function buildTiles(): Tile[] {
  const mobileSrc = (i: number) =>
    `/works-mobile/mobile-${String(i + 1).padStart(2, "0")}.png`;
  const landSrc = (i: number) =>
    `/placeholder-images/${String(i + 1).padStart(2, "0")}.png`;

  // Reserve grid positions (col,row) for the 9 mobile tiles — scattered
  // so they punctuate the landscape board instead of clustering.
  const mobileCells = [
    [0, 1],
    [3, 0],
    [6, 1],
    [2, 3],
    [5, 4],
    [8, 2],
    [1, 5],
    [4, 6],
    [7, 5],
  ] as const;
  const mobileLookup = new Map<string, number>();
  mobileCells.forEach(([c, r], i) => mobileLookup.set(`${c},${r}`, i));

  const COLS = 10;
  const ROWS = 8;
  const CELL_W = 540;
  const CELL_H = 360;

  const tiles: Tile[] = [];
  let landIdx = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const brick = r % 2 === 0 ? -CELL_W / 4 : CELL_W / 4;
      const baseX = (c - COLS / 2) * CELL_W + brick;
      const baseY = (r - ROWS / 2) * CELL_H;

      // gentle deterministic jitter so the grid breathes
      const jx = ((c * 73 + r * 19) % 90) - 45;
      const jy = ((r * 47 + c * 29) % 70) - 35;

      const mobileIdx = mobileLookup.get(`${c},${r}`);
      if (mobileIdx !== undefined) {
        tiles.push({
          id: `m-${mobileIdx}`,
          src: mobileSrc(mobileIdx),
          alt: `Mobile work ${mobileIdx + 1}`,
          aspect: "portrait",
          x: baseX + jx,
          y: baseY + jy,
          w: MOBILE_W,
          h: MOBILE_H,
        });
      } else if (landIdx < 55) {
        tiles.push({
          id: `l-${landIdx}`,
          src: landSrc(landIdx),
          alt: `Project ${landIdx + 1}`,
          aspect: "landscape",
          x: baseX + jx,
          y: baseY + jy,
          w: LAND_W,
          h: LAND_H,
        });
        landIdx++;
      }
    }
  }

  return tiles;
}

export default function InfiniteCanvas({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { stiffness: 220, damping: 28 });

  const dragLayerRef = useRef<HTMLDivElement>(null);
  const [draggingNow, setDraggingNow] = useState(false);
  const tiles = useMemo(() => buildTiles(), []);

  // Lock body scroll while open, re-center on open, listen for Esc.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    x.set(0);
    y.set(0);
    scale.set(1);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, scale, x, y]);

  // Pinch / ctrl-wheel zoom only. Drag is the canonical pan gesture so
  // we deliberately skip wheel-pan (it makes the canvas unpredictable
  // when a trackpad emits horizontal scroll).
  useEffect(() => {
    if (!open) return;
    const el = dragLayerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      // Clamp the per-event delta so a single aggressive pinch can't fling
      // the canvas to the min/max zoom in one frame.
      const delta = Math.max(-0.08, Math.min(0.08, -e.deltaY * 0.005));
      const next = Math.max(0.5, Math.min(1.8, scale.get() + delta));
      scale.set(next);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [open, scale]);

  // Double-click anywhere on the surface recenters and resets zoom.
  const recenter = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [scale, x, y]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="canvas-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[200] bg-canvas"
          ref={dragLayerRef}
        >
          {/* The pan surface. Anchored at the viewport centre so virtual
              coords (0,0) sit dead-centre when the canvas opens. */}
          <motion.div
            drag
            dragMomentum
            dragTransition={{ power: 0.35, timeConstant: 280 }}
            dragConstraints={{
              left: -3200,
              right: 3200,
              top: -2200,
              bottom: 2200,
            }}
            dragElastic={0.18}
            onDragStart={() => setDraggingNow(true)}
            onDragEnd={() => setDraggingNow(false)}
            onDoubleClick={recenter}
            style={{
              x,
              y,
              scale: scaleSpring,
              cursor: draggingNow ? "grabbing" : "grab",
              touchAction: "none",
            }}
            className="absolute left-1/2 top-1/2 w-0 h-0 select-none will-change-transform"
          >
            {tiles.map((tile) => (
              <div
                key={tile.id}
                className="absolute card-luminous rounded-md overflow-hidden soft-hairline bg-surface-soft"
                style={{
                  left: tile.x,
                  top: tile.y,
                  width: tile.w,
                  height: tile.h,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes={tile.aspect === "portrait" ? "260px" : "460px"}
                  className={
                    tile.aspect === "portrait"
                      ? "object-contain p-2 bg-ink/95"
                      : "object-cover"
                  }
                  unoptimized={tile.aspect === "landscape"}
                />
              </div>
            ))}
          </motion.div>

          {/* Soft vignette so the centre reads as a focal point. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[201]"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(255,255,255,0.55) 95%)",
            }}
          />

          {/* Top hint pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[210] flex items-center gap-2 rounded-full bg-canvas/85 backdrop-blur border border-hairline px-4 py-2 text-caption text-muted"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-signature-coral animate-ping" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signature-coral" />
            </span>
            Drag to pan · Pinch / ⌘+scroll to zoom · Double-click to recenter · {tiles.length} works
          </motion.div>

          {/* Exit pill — fixed at bottom centre */}
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[210] inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-3 text-body-md font-medium hover:scale-105 active:scale-100 transition-transform"
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
