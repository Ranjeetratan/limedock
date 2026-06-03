"use client";

import { motion } from "framer-motion";
import CountUp from "./motion/CountUp";

const logos = [
  "Cofounderbase",
  "Hireschema",
  "Xleadforge",
  "Kingdom of Kumar",
  "LimeDock Labs",
  "Northstar AI",
  "Heron",
  "Anvil",
];

const stats: Array<{
  value: number;
  suffix: string;
  label: string;
}> = [
  { value: 40, suffix: "+", label: "founders served" },
  { value: 100, suffix: "+", label: "production releases" },
  { value: 48, suffix: "h", label: "avg. first turnaround" },
];

export default function TrustStrip() {
  return (
    <section className="bg-canvas pb-24">
      <div className="container-air">
        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="border-y border-hairline py-7 overflow-hidden mask-fade-x relative"
        >
          {/* Subtle drift loop */}
          <div className="flex gap-14 md:gap-20 whitespace-nowrap animate-scroll-left will-change-transform" style={{ width: "max-content" }}>
            {[...logos, ...logos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="group inline-flex items-center gap-2 text-caption text-muted hover:text-ink transition-colors"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-hairline group-hover:bg-signature-coral transition-colors" />
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats with count-up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group flex items-end justify-center gap-4 relative"
            >
              <span className="text-display-md text-ink tabular-nums">
                <CountUp to={s.value} suffix={s.suffix} />
              </span>
              <span className="text-body-md text-muted pb-2">{s.label}</span>
              {/* Animated underline accent */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px w-0 bg-ink/30 transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
