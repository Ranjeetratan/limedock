'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 6L9 17L4 12" stroke="#4CD964" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = ({ tone = "error" }: { tone?: "error" | "warning" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke={tone === "warning" ? "#FFB020" : "#FF5C5C"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Tone = "success" | "error" | "warning";

type Row = {
  feature: string;
  us: { text: string; tone: Tone };
  fullTime: { text: string; tone: Tone };
  other: { text: string; tone: Tone };
};

const rows: Row[] = [
  {
    feature: "Cost",
    us: { text: "$ — predictable retainer", tone: "success" },
    fullTime: { text: "$$$$ — high overhead", tone: "error" },
    other: { text: "$$ — variable", tone: "warning" },
  },
  {
    feature: "Senior-level expertise",
    us: { text: "Guaranteed, on every project", tone: "success" },
    fullTime: { text: "Hopefully — if you hire well", tone: "warning" },
    other: { text: "Maybe — depends on staffing", tone: "warning" },
  },
  {
    feature: "Turnaround time",
    us: { text: "48 hours for most asks", tone: "success" },
    fullTime: { text: "Weeks — competing priorities", tone: "error" },
    other: { text: "Weeks — load dependent", tone: "error" },
  },
  {
    feature: "Time to start",
    us: { text: "Today", tone: "success" },
    fullTime: { text: "Weeks to onboard", tone: "error" },
    other: { text: "Days to paper", tone: "error" },
  },
  {
    feature: "Unlimited revisions",
    us: { text: "Yes — until it's perfect", tone: "success" },
    fullTime: { text: "Bound by time on team", tone: "error" },
    other: { text: "Limited per project", tone: "error" },
  },
  {
    feature: "Client portal",
    us: { text: "Live, with daily updates", tone: "success" },
    fullTime: { text: "Internal tools — varies", tone: "warning" },
    other: { text: "No consistent system", tone: "error" },
  },
  {
    feature: "Scalability",
    us: { text: "Scale up or down anytime", tone: "success" },
    fullTime: { text: "Hire / fire cycle", tone: "warning" },
    other: { text: "Capped by their team", tone: "error" },
  },
  {
    feature: "Flexibility",
    us: { text: "Pause or adjust anytime", tone: "success" },
    fullTime: { text: "Locked into salary + benefits", tone: "error" },
    other: { text: "Project-locked", tone: "error" },
  },
];

const Cell = ({ text, tone }: { text: string; tone: Tone }) => (
  <div className="flex items-start gap-2.5">
    <span className="shrink-0 mt-[3px]">
      {tone === "success" ? <CheckIcon /> : <CrossIcon tone={tone === "warning" ? "warning" : "error"} />}
    </span>
    <span className={`text-[13.5px] leading-snug ${tone === "success" ? "text-ink" : "text-ink-muted"}`}>
      {text}
    </span>
  </div>
);

export default function Comparison() {
  return (
    <section className="relative py-24 md:py-32 bg-canvas w-full">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16 max-w-3xl"
        >
          <span className="eyebrow mb-5">
            <span className="dot" />
            Why us
          </span>
          <h2 className="font-display text-display-lg text-ink mt-5">
            The senior team you wish
            <br />
            <span className="text-ink-muted">you didn&apos;t have to hire.</span>
          </h2>
          <p className="text-subhead text-ink-muted mt-5 max-w-2xl">
            The smart alternative to full-time hires and traditional agencies — at a
            fraction of the cost, and a fraction of the friction.
          </p>
        </motion.div>

        {/* Table card */}
        <div className="rounded-[24px] bg-surface-1 border border-hairline p-3 md:p-4 overflow-x-auto">
          <div className="min-w-[820px] rounded-[18px] bg-surface-2/60 border border-hairline-soft">
            {/* Header */}
            <div className="grid grid-cols-[1.4fr_1.4fr_1.4fr_1.4fr] gap-4 px-6 py-5 border-b border-hairline-soft items-end">
              <div className="text-caption text-ink-muted">Feature</div>
              <div className="flex items-center gap-2">
                <Logo className="h-5 w-24" />
                <span className="text-caption text-accent-blue ml-1">(That&apos;s us)</span>
              </div>
              <div className="text-headline text-ink">Full-time hire</div>
              <div className="text-headline text-ink">Other agencies</div>
            </div>

            {/* Rows */}
            <div>
              {rows.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="grid grid-cols-[1.4fr_1.4fr_1.4fr_1.4fr] gap-4 px-6 py-4 border-b border-hairline-soft last:border-0 items-start"
                >
                  <div className="text-[13.5px] font-medium text-ink-muted leading-snug pt-[1px]">
                    {row.feature}
                  </div>
                  <Cell text={row.us.text} tone={row.us.tone} />
                  <Cell text={row.fullTime.text} tone={row.fullTime.tone} />
                  <Cell text={row.other.text} tone={row.other.tone} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
