'use client';

import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    label: "End-to-end",
    title: "We own it from zero to ship.",
    description:
      "For teams without an in-house product org. We take ownership of strategy, design, engineering and launch — and hand over a system your team can run with.",
    bullets: ["Strategy + product", "Design systems", "Frontend + backend", "Launch & growth"],
    variant: "surface" as const,
  },
  {
    label: "Embedded",
    title: "We plug into your team.",
    description:
      "For teams with existing capability who need senior firepower. We sit alongside your designers, PMs and engineers — closing skill gaps and shipping faster.",
    bullets: ["Slack-first comms", "Sprint-paced", "Senior-only ICs", "Doc-driven"],
    variant: "violet" as const,
  },
];

const Bullet = ({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "light" }) => (
  <li className={`flex items-center gap-2 text-[14px] ${tone === "muted" ? "text-ink-muted" : "text-white/85"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${tone === "muted" ? "bg-white/40" : "bg-white"}`} />
    <span>{children}</span>
  </li>
);

const WhatWeDo = () => {
  return (
    <section id="services" className="w-full bg-canvas py-24 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6 relative">
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
            How we engage
          </span>
          <h2 className="font-display text-display-lg text-ink mt-5">
            Two ways in.<br />
            <span className="text-ink-muted">One outcome.</span>
          </h2>
          <p className="text-subhead text-ink-muted mt-5 max-w-2xl">
            Whether we run the whole thing or sit inside your team, the goal is
            the same — a product you&apos;re proud to ship.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-[30px] p-8 md:p-10 lift ${
                card.variant === "violet"
                  ? "bg-spot-violet border border-white/10"
                  : "bg-surface-1 border border-hairline"
              }`}
              style={{ minHeight: 440 }}
            >
              {/* Soft shine for gradient card */}
              {card.variant === "violet" && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background:
                      "radial-gradient(80% 50% at 50% 0%, rgba(255,255,255,0.25), transparent 60%)",
                  }}
                />
              )}

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-caption px-2.5 py-1 rounded-full border ${
                      card.variant === "violet"
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-surface-2 border-hairline text-ink-muted"
                    }`}
                  >
                    {card.label}
                  </span>
                  <span className={`text-caption ${card.variant === "violet" ? "text-white/70" : "text-ink-muted"}`}>
                    0{i + 1} / 02
                  </span>
                </div>

                <h3 className={`font-display text-display-md mt-10 max-w-md ${card.variant === "violet" ? "text-white" : "text-ink"}`}>
                  {card.title}
                </h3>

                <p className={`text-body-lg mt-5 max-w-md ${card.variant === "violet" ? "text-white/80" : "text-ink-muted"}`}>
                  {card.description}
                </p>

                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
                  {card.bullets.map((b) => (
                    <Bullet key={b} tone={card.variant === "violet" ? "light" : "muted"}>
                      {b}
                    </Bullet>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <a
                    href="https://cal.com/limedock-admin-nb05ck/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-[14px] font-semibold ${
                      card.variant === "violet" ? "text-white" : "text-ink"
                    } group`}
                  >
                    Talk to us
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
