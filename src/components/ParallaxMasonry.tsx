"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";

/**
 * Five-column scroll-driven masonry rendered inside a fixed-height
 * window. Mobile screens occupy the portrait columns (1, 4); the
 * landscape placeholder library fills cols 2, 3, 5.
 *
 * Layout
 *   col 1 — portrait  (mobile screens), parallax UP
 *   col 2 — landscape (placeholders),   static
 *   col 3 — landscape (placeholders),   parallax UP
 *   col 4 — portrait  (mobile screens), static
 *   col 5 — landscape (placeholders),   parallax UP
 */

type ImageDescriptor = { id: string; src: string; alt: string };

const MOBILE_IMAGES: ImageDescriptor[] = Array.from({ length: 9 }, (_, i) => {
  const id = String(i + 1).padStart(2, "0");
  return {
    id: `mob-${id}`,
    src: `/works-mobile/mobile-${id}.png`,
    alt: `LimeDock mobile work ${id}`,
  };
});

const LANDSCAPE_IMAGES: ImageDescriptor[] = Array.from(
  { length: 55 },
  (_, i) => {
    const id = String(i + 1).padStart(2, "0");
    return {
      id: `ls-${id}`,
      src: `/placeholder-images/${id}.png`,
      alt: `LimeDock project ${id}`,
    };
  }
);

type AspectKey = "portrait" | "landscape";

type ColumnSpec = {
  aspect: AspectKey;
  parallax: boolean;
  show: "always" | "lg-only" | "md-up";
  source: "mobile" | "landscape";
  tiles: number;
  /** Starting index inside the source pool (so columns don't share images) */
  offset: number;
};

const SPECS: ColumnSpec[] = [
  { aspect: "portrait",  parallax: true,  show: "lg-only", source: "mobile",    tiles: 5,  offset: 0 },  // 1
  { aspect: "landscape", parallax: false, show: "always",  source: "landscape", tiles: 10, offset: 0 },  // 2
  { aspect: "landscape", parallax: true,  show: "always",  source: "landscape", tiles: 10, offset: 10 }, // 3
  { aspect: "portrait",  parallax: false, show: "lg-only", source: "mobile",    tiles: 4,  offset: 5 },  // 4
  { aspect: "landscape", parallax: true,  show: "md-up",   source: "landscape", tiles: 10, offset: 20 }, // 5
];

const ASPECT_CLASS: Record<AspectKey, string> = {
  // Mobile screens are 780x1688 → ~9:19.5; portrait box approximates that.
  portrait: "aspect-[9/18]",
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
  images: ImageDescriptor[];
  yUp: MotionValue<string>;
}) {
  const isMobile = spec.source === "mobile";
  return (
    <motion.div
      style={{ y: spec.parallax ? yUp : 0 }}
      className={`flex-col gap-3 md:gap-4 will-change-transform ${SHOW_CLASS[spec.show]}`}
    >
      {images.map((img) =>
        isMobile ? (
          // Mobile mocks are transparent PNGs — drop the card chrome
          // entirely so the phone silhouette floats on the page canvas.
          <div
            key={img.id}
            className={`relative w-full ${ASPECT_CLASS[spec.aspect]}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1280px) 240px, (min-width: 768px) 33vw, 50vw"
              className="object-contain transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div
            key={img.id}
            className={`card-luminous relative w-full overflow-hidden rounded-md soft-hairline bg-surface-soft ${ASPECT_CLASS[spec.aspect]}`}
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
        )
      )}
    </motion.div>
  );
}

export default function ParallaxMasonry() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yUp = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);

  const columns = useMemo(() => {
    return SPECS.map((spec) => {
      const pool = spec.source === "mobile" ? MOBILE_IMAGES : LANDSCAPE_IMAGES;
      const images: ImageDescriptor[] = [];
      for (let i = 0; i < spec.tiles; i++) {
        images.push(pool[(spec.offset + i) % pool.length]);
      }
      return { spec, images };
    });
  }, []);

  return (
    <div ref={sectionRef} className="container-air mt-12 md:mt-16">
      <div
        className="relative overflow-hidden rounded-lg border border-hairline bg-canvas"
        style={{ height: "clamp(680px, 88vh, 1100px)" }}
      >
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
