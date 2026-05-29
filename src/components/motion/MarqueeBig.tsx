"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * A giant, scroll-coupled wordmark used as a brand stamp. Drifts horizontally
 * as the page scrolls past it. Designed to live at the bottom of the page.
 */
export default function MarqueeBig({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative overflow-hidden select-none">
      <motion.div
        style={{ x }}
        className="text-ink/90 leading-[0.82] tracking-[-0.04em] font-display whitespace-nowrap"
      >
        <span
          aria-hidden
          className="block"
          style={{
            fontSize: "clamp(120px, 22vw, 280px)",
            fontWeight: 500,
            WebkitTextStroke: "0px transparent",
          }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  );
}
