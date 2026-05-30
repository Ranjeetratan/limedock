"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";

/**
 * Five-column scroll-driven masonry rendered inside a fixed-height
 * window so the staggered column edges fold into a single viewport
 * instead of poking out unevenly at top + bottom.
 *
 * Layout
 * ─────────────────────────────────────────────────────────────
 * Desktop (lg+)
 *   col 1 — portrait  (9:16),  parallax UP     ← drifts up
 *   col 2 — landscape (16:9),  static
 *   col 3 — landscape (16:9),  parallax UP     ← drifts up
 *   col 4 — portrait  (9:16),  static
 *   col 5 — landscape (16:9),  parallax UP     ← drifts up
 *
 * Tablet (md)
 *   3 columns. Drop both portrait columns (1, 4).
 *
 * Mobile (< md)
 *   2 columns of landscape. col 5 hidden.
 *
 * Inside, the grid lives in an absolutely-positioned layer with a
 * top/bottom mask so column overflow softly fades into the window.
 */

const ALL_IMAGES = Array.from({ length: 55 }, (_, i) => {
  const id = String(i + 1).padStart(2, "0");
  return { id, src: `/placeholder-images/${id}.png`, alt: `LimeDock project ${id}` };
});

type AspectKey = "portrait" | "landscape";

type ColumnSpec = {
  aspect: AspectKey;
  parallax: boolean;
  show: "always" | "lg-only" | "md-up";
  tiles: number;
};

const SPECS: ColumnSpec[] = [
  { aspect: "portrait",  parallax: true,  show: "lg-only", tiles: 5 },  // 1
  { aspect: "landscape", parallax: false, show: "always",  tiles: 10 }, // 2
  { aspect: "landscape", parallax: true,  show: "always",  tiles: 10 }, // 3
  { aspect: "portrait",  parallax: false, show: "lg-only", tiles: 5 },  // 4
  { aspect: "landscape", parallax: true,  show: "md-up",   tiles: 10 }, // 5
];

const ASPECT_CLASS: Record<AspectKey, string> = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-[16/9]",
};

const SHOW_CLASS: Record<ColumnSpec["show"], string> = {
  always: "flex",
  "md-up": "hidden md:flex",
  "lg-only": "hidden lg:flex",
};

function ParallaxColumn({
  spec,
  images,
  yUp,
}: {
  spec: ColumnSpec;
  images: typeof ALL_IMAGES;
  yUp: MotionValue<string>;
}) {
  return (
    <motion.div
      style={{ y: spec.parallax ? yUp : 0 }}
      className={`flex-col gap-3 md:gap-4 will-change-transform ${SHOW_CLASS[spec.show]}`}
    >
      {images.map((img) => (
        <div
          key={img.id}
          className={`card-luminous relative w-full overflow-hidden rounded-md bg-surface-soft soft-hairline ${ASPECT_CLASS[spec.aspect]}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1280px) 240px, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            unoptimized
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function ParallaxMasonry() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 25% range of vertical drift inside the window. Cols 1/3/5 ride this.
  const yUp = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);

  // Stable image distribution across columns.
  const columns = useMemo(() => {
    const result = SPECS.map(
      (spec) => ({ spec, images: [] as typeof ALL_IMAGES })
    );
    let cursor = 0;
    SPECS.forEach((spec, idx) => {
      result[idx].images = ALL_IMAGES.slice(cursor, cursor + spec.tiles);
      cursor += spec.tiles;
    });
    return result;
  }, []);

  return (
    <div ref={sectionRef} className="container-air mt-12 md:mt-16">
      {/* Window: fixed height, rounded, clips column overflow */}
      <div
        className="relative overflow-hidden rounded-lg border border-hairline bg-canvas"
        style={{ height: "clamp(680px, 88vh, 1100px)" }}
      >
        {/* Masked content layer — soft fade at top + bottom edges so the
            parallax feels like it flows through a window. */}
        <div
          className="absolute inset-0 p-3 md:p-5"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 6%, rgba(0,0,0,0.35) 12%, #000 22%, #000 78%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0.05) 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 6%, rgba(0,0,0,0.35) 12%, #000 22%, #000 78%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0.05) 94%, transparent 100%)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_1.4fr_1.4fr_1fr_1.4fr] gap-3 md:gap-4 items-start">
            {columns.map((col, idx) => (
              <ParallaxColumn
                key={idx}
                spec={col.spec}
                images={col.images}
                yUp={yUp}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
