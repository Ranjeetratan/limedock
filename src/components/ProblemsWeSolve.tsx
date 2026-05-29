'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PROBLEMS = [
  {
    title: "Your brand doesn't stand out.",
    description:
      "Messaging and positioning feel generic. Users can't articulate why you, in a crowded market.",
  },
  {
    title: "Your site looks fine. Nothing converts.",
    description:
      "Traffic comes. Action doesn't. The journey, copy and proof aren't doing the work they should.",
  },
  {
    title: "Design & dev are out of sync.",
    description:
      "What gets shipped isn't what was designed. Quality slips. So does the team's confidence.",
  },
  {
    title: "Users can't figure your product out.",
    description:
      "Features exist. Adoption doesn't. The UX is the bottleneck — not the feature roadmap.",
  },
  {
    title: "Social presence is scattered.",
    description:
      "No system, no rhythm, no payoff. Content drops in waves and falls off a cliff.",
  },
  {
    title: "You can't pitch it in one sentence.",
    description:
      "Text and static visuals aren't carrying the story. The first-30-seconds problem is real.",
  },
];

export default function ProblemsWeSolve() {
  return (
    <section className="relative py-24 md:py-32 bg-canvas w-full" id="problems">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <span className="eyebrow mb-5">
            <span className="dot" />
            What founders bring us
          </span>
          <h2 className="font-display text-display-lg text-ink mt-5">
            Six problems we&apos;ve seen
            <br />
            <span className="text-ink-muted">a hundred times.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PROBLEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.05 }}
              className="group relative rounded-[20px] bg-surface-1 border border-hairline p-7 lift overflow-hidden"
            >
              {/* corner accent */}
              <div className="flex items-start justify-between mb-8">
                <span className="font-display text-[28px] text-ink-faint leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent-blue/70 group-hover:bg-accent-blue transition-colors" />
              </div>

              <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.025em] text-ink max-w-[18ch]">
                {item.title}
              </h3>
              <p className="text-body text-ink-muted mt-3 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
