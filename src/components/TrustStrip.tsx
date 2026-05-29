"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "40+", label: "Founders served" },
  { value: "100+", label: "Products shipped" },
  { value: "4.9", label: "Avg. CSAT" },
  { value: "5 yrs", label: "Avg. team seniority" },
];

// Pure typographic logo strip — simple, fast, no asset wrangling.
const wordmarks = [
  "Cofounderbase",
  "Hireschema",
  "Kingdom of Kumar",
  "Kickofflist",
  "LimeDock Labs",
  "Northstar AI",
  "Heron",
  "Anvil",
];

export default function TrustStrip() {
  return (
    <section className="relative w-full bg-canvas pt-8 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-[20px] overflow-hidden border border-hairline bg-hairline-soft"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-canvas px-6 py-8 md:py-10 flex flex-col items-start gap-2"
            >
              <span className="font-display text-[40px] md:text-[56px] leading-none tracking-[-0.04em] text-ink">
                {s.value}
              </span>
              <span className="text-caption text-ink-muted">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Wordmark strip */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <span className="text-caption text-ink-muted uppercase tracking-[0.18em]">
            Built for & with
          </span>
          <div className="w-full overflow-hidden mask-fade-x">
            <div className="flex gap-12 md:gap-16 animate-scroll-left whitespace-nowrap will-change-transform" style={{ width: "max-content" }}>
              {[...wordmarks, ...wordmarks].map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="font-display text-[22px] md:text-[26px] tracking-[-0.04em] text-ink-muted/70 hover:text-ink transition-colors"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
