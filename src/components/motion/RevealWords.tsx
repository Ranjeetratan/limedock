"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Apply a subtle highlight to specific word indices (0-based). */
  highlightIndices?: number[];
  /** Tailwind class for highlighted words. */
  highlightClassName?: string;
  /** Stagger between words in seconds. */
  stagger?: number;
};

/**
 * Word-by-word reveal: each word rises in from below with stagger,
 * giving a headline a deliberate, cinematic feel without going theatrical.
 */
export default function RevealWords({
  text,
  className,
  delay = 0,
  highlightIndices = [],
  highlightClassName = "",
  stagger = 0.045,
}: Props) {
  const words = text.split(/(\s+)/); // keep spaces

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        if (/^\s+$/.test(word)) return <span key={i}>{word}</span>;
        const wordIndex = words
          .slice(0, i)
          .filter((w) => !/^\s+$/.test(w)).length;
        const highlighted = highlightIndices.includes(wordIndex);
        return (
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + wordIndex * stagger,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className={`inline-block ${highlighted ? highlightClassName : ""}`}
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
