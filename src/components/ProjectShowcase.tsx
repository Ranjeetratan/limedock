"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const placeholderImages = Array.from({ length: 55 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0");
  return {
    id,
    src: `/placeholder-images/${id}.png`,
    alt: `Project Showcase ${id}`,
  };
});

const rowA = [...placeholderImages, ...placeholderImages];
const rowB = [...placeholderImages];
const rowBLoop = [...rowB, ...rowB];

const DURATION = 240;

const Tile = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative shrink-0 overflow-hidden rounded-[20px] border border-hairline bg-surface-1 w-[360px] h-[246px] lg:w-[400px] lg:h-[274px]">
    <Image src={src} alt={alt} fill className="object-cover" sizes="400px" unoptimized />
    {/* light edge */}
    <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{
      boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.12), inset 0 -0.5px 0 rgba(0,0,0,0.5)"
    }} />
  </div>
);

export default function ProjectShowcase() {
  return (
    <section id="work" className="relative w-full py-20 md:py-28 overflow-hidden bg-canvas">
      {/* Section eyebrow + title row */}
      <div className="max-w-[1200px] mx-auto px-6 mb-12 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <span className="eyebrow mb-4">
            <span className="dot" />
            Selected work
          </span>
          <h2 className="font-display text-display-lg text-ink mt-4 max-w-2xl">
            Built across<br className="hidden md:block" /> brand, product & web.
          </h2>
        </div>
        <p className="text-body-lg text-ink-muted max-w-md">
          A look at recent work — design systems, landing pages, full
          product launches. Every tile shipped to production.
        </p>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col w-full gap-6 mask-fade-x">
        <div className="flex w-full">
          <motion.div
            key={`row-a-${DURATION}`}
            className="flex gap-6 px-4"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: DURATION,
              ease: "linear",
            }}
            style={{ width: "max-content" }}
          >
            {rowA.map((project, index) => (
              <Tile key={`a-${project.id}-${index}`} src={project.src} alt={project.alt} />
            ))}
          </motion.div>
        </div>

        <div className="flex w-full">
          <motion.div
            key={`row-b-${DURATION}`}
            className="flex gap-6 px-4"
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: DURATION,
              ease: "linear",
            }}
            style={{ width: "max-content" }}
          >
            {rowBLoop.map((project, index) => (
              <Tile key={`b-${project.id}-${index}`} src={project.src} alt={project.alt} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
