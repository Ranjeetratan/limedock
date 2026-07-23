"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import TiltCard from "./motion/TiltCard";

const modes = [
  {
    label: "Workflow audit",
    title: "We map the manual work your team runs every week.",
    copy:
      "Before writing a line of code, we sit with your marketing, sales, and management leads and document how work actually moves. Every hand-off, spreadsheet, and \"someone pings someone\" goes on the same canvas.",
    stats: ["1 workflow map", "manual-work inventory", "automation shortlist"],
    color: "bg-signature-peach",
  },
  {
    label: "Ship automations",
    title: "We build the workflows and wire them into your team's tools.",
    copy:
      "Each automation is a small internal workflow that plugs into your Slack, CRM, and internal platform — running on your infrastructure. AI shows up where it earns its keep: drafting, ranking, summarizing, routing.",
    stats: ["ships in weeks", "on your infra", "in your Slack + CRM"],
    color: "bg-signature-mint",
  },
  {
    label: "Own & operate",
    title: "You keep the code. We keep tuning it with you.",
    copy:
      "We hand over source, prompts, integrations, and documentation. Then we stay on as a lightweight ops partner — new workflows, prompt tuning, model swaps — so your automations keep improving alongside the team.",
    stats: ["full code ownership", "weekly tune-ups", "new workflow every Friday"],
    color: "bg-signature-yellow",
  },
];

function MiniBoard({ color }: { color: string }) {
  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-md bg-canvas soft-hairline p-5">
      <div className="grid grid-cols-[150px_1fr] gap-4 h-full">
        <div className="rounded-md bg-surface-soft p-3 space-y-2">
          {["Audit", "Design", "Build", "Ship"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-sm px-3 py-2 text-caption ${
                index === 1
                  ? `${color} text-ink`
                  : "bg-canvas text-muted"
              }`}
            >
              {item}
            </motion.div>
          ))}
        </div>
        <div className="space-y-4">
          <div className={`${color} card-luminous rounded-md p-4 min-h-[122px] relative overflow-hidden`}>
            <div className="flex items-center justify-between text-caption text-ink/70">
              <span>Project health</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-ink/60 animate-ping" />
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-ink" />
                </span>
                Live
              </span>
            </div>
            <div className="mt-8 h-3 rounded-full bg-ink/20 overflow-hidden">
              <motion.div
                initial={{ width: "18%" }}
                animate={{ width: ["18%", "72%", "46%", "88%", "62%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="h-full rounded-full bg-ink"
              />
            </div>
            <div className="mt-3 text-caption text-ink/60 tabular-nums flex items-center justify-between">
              <span>Build cycle 04</span>
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                72%
              </motion.span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md bg-surface-soft p-4">
              <div className="h-2 w-16 rounded-full bg-ink/20" />
              <div className="mt-8 space-y-2">
                <div className="h-2 rounded-full bg-ink/16" />
                <div className="h-2 w-2/3 rounded-full bg-ink/12" />
              </div>
            </div>
            <div className="rounded-md bg-surface-soft p-4">
              <div className="flex items-center gap-2 text-caption text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-signature-coral" />
                Sync channel
              </div>
              <div className="mt-4 space-y-1.5">
                {["#growth", "#ops", "#build"].map((tag) => (
                  <div
                    key={tag}
                    className="rounded-sm bg-canvas soft-hairline px-2 py-1 text-caption text-ink font-mono"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  const [active, setActive] = useState(0);
  const current = modes[active];

  return (
    <section id="services" className="section-air bg-canvas">
      <div className="container-air">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">
              <span className="dot" />
              How we build with you
            </span>
            <h2 className="text-display-md text-ink mt-7 max-w-lg">
              One team, three phases — from manual workflow to a live automation.
            </h2>
            <p className="text-label-md text-body mt-6 max-w-md leading-[1.45]">
              We don&apos;t start with a demo. We start with the jobs your
              team does by hand every week. Then we design and ship the
              workflows that run those jobs for them.
            </p>

            {/* Step list under the headline */}
            <ul className="mt-10 space-y-3 max-w-sm">
              {modes.map((m, i) => (
                <li key={m.label} className="flex items-center gap-3 text-body-md text-muted">
                  <span className={`h-7 w-7 rounded-full grid place-items-center text-caption ${
                    i === active
                      ? "bg-ink text-canvas"
                      : "bg-surface-soft text-muted border border-hairline"
                  } transition-colors`}>
                    {i + 1}
                  </span>
                  <span className={i === active ? "text-ink" : ""}>{m.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="feature-card-tabbed rounded-lg bg-surface-soft p-4 md:p-8"
          >
            <div className="grid md:grid-cols-[200px_1fr] gap-5">
              {/* Tabs with sliding indicator using layoutId */}
              <div className="relative flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
                {modes.map((mode, index) => (
                  <button
                    key={mode.label}
                    type="button"
                    onClick={() => setActive(index)}
                    className="relative shrink-0 rounded-md px-4 py-3 text-left text-title-md transition-colors z-10"
                  >
                    {active === index && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="absolute inset-0 -z-10 rounded-md bg-canvas soft-hairline"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    )}
                    <span
                      className={
                        active === index ? "text-ink" : "text-muted"
                      }
                    >
                      {mode.label}
                    </span>
                  </button>
                ))}
              </div>

              <TiltCard className="rounded-md" max={4} spotlight={false}>
                <div className="rounded-md bg-canvas p-4 md:p-6 soft-hairline">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <MiniBoard color={current.color} />
                      <h3 className="text-title-lg text-ink mt-7">
                        {current.title}
                      </h3>
                      <p className="text-body-md text-body mt-3 max-w-xl leading-[1.55]">
                        {current.copy}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {current.stats.map((stat, idx) => (
                          <motion.span
                            key={stat}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + idx * 0.05 }}
                            className="rounded-full border border-hairline px-3 py-1.5 text-caption text-muted hover:text-ink hover:border-ink/30 transition-colors"
                          >
                            {stat}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
