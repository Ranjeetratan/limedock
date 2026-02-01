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

export default function ProjectShowcase() {
  return (
    <section id="work" className="w-full py-12 overflow-hidden bg-background">
      <div className="flex flex-col w-full gap-8">
        <div className="flex w-full">
          <motion.div
            key={`row-a-${DURATION}`}
            className="flex gap-8 px-4"
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
              <div
                key={`${project.id}-${index}`}
                className="relative shrink-0 overflow-hidden rounded-2xl border border-black/5 shadow-sm w-[400px] h-[274px]"
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="400px"
                  unoptimized
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex w-full">
          <motion.div
            key={`row-b-${DURATION}`}
            className="flex gap-8 px-4"
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
              <div
                key={`${project.id}-${index}`}
                className="relative shrink-0 overflow-hidden rounded-2xl border border-black/5 shadow-sm w-[400px] h-[274px]"
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="600px"
                  unoptimized
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
