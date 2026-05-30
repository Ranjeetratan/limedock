"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";

/**
 * Five-column scroll-driven masonry.
 *
 * Layout spec
 * ─────────────────────────────────────────────────────────────
 * Desktop (lg+)
 *   col 1 — portrait (9:16), parallax UP   ← drifts up
 *   col 2 — landscape (16:9), static
 *   col 3 — landscape (16:9), parallax UP  ← drifts up
 *   col 4 — landscape (16:9), static
 *   col 5 — portrait (9:16), parallax UP   ← drifts up
 *
 * Tablet (md)
 *   3 columns. Drop the portrait outer columns.
 *
 * Mobile (< md)
 *   2 columns of landscape, col-1 drifts, col-2 static.
 *
 * Top + bottom of the section are masked so the parallax never feels
 * "cut" — the columns appear to flow through a window.
 */

const ALL_IMAGES = Array.from({ length: 55 }, (_, i) => {
  const id = String(i + 1).padStart(2, "0");
  return { id, src: `/placeholder-images/${id}.png`, alt: `LimeDock project ${id}` };
});

type AspectKey = "portrait" | "landscape";

type ColumnSpec = {
  aspect: AspectKey;
  parallax: boolean;
  /** Visibility breakpoint */
  show: "always" | "lg-only" | "md-up";
  /** How many tiles this column should hold. */
  tiles: number;
};

// Build the 5-col layout, then slice ALL_IMAGES across them.
const SPECS: ColumnSpec[] = [
  { aspect: "portrait", parallax: true, show: "lg-only", tiles: 6 }, // 1
  { aspect: "landscape", parallax: false, show: "always", tiles: 9 }, // 2
  { aspect: "landscape", parallax: true, show: "md-up", tiles: 9 }, // 3
  { aspect: "landscape", parallax: false, show: "lg-only", tiles: 9 }, // 4
  { aspect: "portrait", parallax: true, show: "lg-only", tiles: 6 }, // 5
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
            className="object-cover transition-transform duration-700 hover:scale-[1.04]"
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

  // Drift the parallax columns up as the section scrolls through the viewport.
  const yUp = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  // Distribute images deterministically across columns so the visual rhythm
  // is consistent across reloads.
  const columns = useMemo(() => {
    const result: Array<{ spec: ColumnSpec; images: typeof ALL_IMAGES }> = SPECS.map(
      (spec) => ({ spec, images: [] })
    );
    let cursor = 0;
    SPECS.forEach((spec, idx) => {
      const slice = ALL_IMAGES.slice(cursor, cursor + spec.tiles);
      result[idx].images = slice;
      cursor += spec.tiles;
    });
    // If we have leftovers, sprinkle them into the landscape columns.
    const leftover = ALL_IMAGES.slice(cursor);
    leftover.forEach((img, i) => {
      // cycle through indices 1, 2, 3 (landscape cols)
      const target = result[1 + (i % 3)];
      target.images.push(img);
    });
    return result;
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden mt-12 md:mt-16"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div className="container-air">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_1.4fr_1.4fr_1.4fr_1fr] gap-3 md:gap-4">
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
  );
}
