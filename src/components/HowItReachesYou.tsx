"use client";

import { motion } from "framer-motion";
import {
  FlowCanvas,
  FlowChip,
  FlowEdge,
  FlowLabel,
  FlowNode,
} from "./flow/FlowPrimitives";

/**
 * System-architecture flowchart:
 *
 *   Data sources        Platform (accent)        Surfaces          You
 *   (chips)          →   [Marketing OS]      →   [Slack bot]   →   founder
 *                        [Sales OS]              [Claude CLI]      + team
 *                        [Ops copilot]           [Codex CLI]
 *                             ↑                  [Digest email]
 *                        AI providers            [Dashboard]
 *                        (your keys)
 *
 * Drawn as a single SVG (no bento cards) so it reads as a diagram.
 */
export default function HowItReachesYou() {
  const W = 1000;
  const H = 520;

  // X positions of the four vertical bands
  const X = {
    sources: 20,
    platform: 340,
    surfaces: 680,
    you: 900,
  };

  const sources = [
    "CRM",
    "Stripe",
    "Product analytics",
    "Docs & wiki",
    "Calendar",
    "Support inbox",
  ];

  const surfaces = [
    { label: "Slack bot", sub: "in-thread nudges" },
    { label: "Claude Code CLI", sub: "ask in the terminal" },
    { label: "Codex CLI", sub: "trigger from shell" },
    { label: "Weekly digest email", sub: "Fri 8:00am" },
    { label: "Web dashboard", sub: "always-on" },
  ];

  const platformNodes = [
    { label: "Marketing workflows", y: 100 },
    { label: "Sales workflows", y: 170 },
    { label: "Management workflows", y: 240 },
  ];

  const CHIP_W = 128;
  const CHIP_H = 26;
  const CHIP_GAP = 12;
  const SURFACE_W = 190;
  const SURFACE_H = 40;
  const SURFACE_GAP = 12;

  const PLATFORM_X = X.platform;
  const PLATFORM_W = 300;
  const PLATFORM_Y = 70;
  const PLATFORM_H = 240;

  // Center Y for each chip on the left
  const chipY = (i: number) => 60 + i * (CHIP_H + CHIP_GAP);

  // Center Y for each surface node on the right
  const surfaceY = (i: number) => 60 + i * (SURFACE_H + SURFACE_GAP);

  return (
    <section id="system" className="section-air bg-canvas">
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid lg:grid-cols-[0.7fr_0.55fr] gap-8 items-end"
        >
          <div>
            <span className="eyebrow">
              <span className="dot" />
              How the automations reach you
            </span>
            <h2 className="text-display-md text-ink mt-7 max-w-2xl">
              Your data on the left. Automations in the middle. Your team on the right.
            </h2>
          </div>
          <p className="text-label-md text-body leading-[1.45] max-w-md lg:justify-self-end">
            LimeDock builds the workflow automations that sit between your
            data and your team. They plug into your Slack, CLI, and
            internal tools — AI providers plug in from below, on your
            keys, on your bill.
          </p>
        </motion.div>

        {/* Real SVG flowchart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-lg bg-canvas soft-hairline p-4 md:p-6"
        >
          <FlowCanvas width={W} height={H}>
            {/* Column headers */}
            <FlowLabel x={X.sources} y={32} text="1 · Your data" />
            <FlowLabel x={X.platform + 8} y={32} text="2 · Workflow automations" />
            <FlowLabel x={X.surfaces} y={32} text="3 · Where you already work" />
            <FlowLabel x={X.you} y={32} text="4 · You" />

            {/* Data source chips */}
            {sources.map((s, i) => (
              <FlowChip
                key={s}
                x={X.sources}
                y={chipY(i)}
                w={CHIP_W}
                h={CHIP_H}
                label={s}
              />
            ))}

            {/* Platform container box (accent) */}
            <g>
              <rect
                x={PLATFORM_X}
                y={PLATFORM_Y}
                width={PLATFORM_W}
                height={PLATFORM_H}
                rx={8}
                fill="rgba(24,29,38,0.04)"
                stroke="rgba(24,29,38,0.35)"
                strokeWidth={1.25}
                strokeDasharray="4 3"
              />
              <text
                x={PLATFORM_X + 12}
                y={PLATFORM_Y + 20}
                fontSize={9}
                fill="rgba(24,29,38,0.55)"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                runs on your infra
              </text>
              {platformNodes.map((n) => (
                <FlowNode
                  key={n.label}
                  x={PLATFORM_X + 20}
                  y={n.y}
                  w={PLATFORM_W - 40}
                  h={44}
                  label={n.label}
                  tone="accent"
                />
              ))}
            </g>

            {/* Edges: sources → platform (converging into left edge of platform) */}
            {sources.map((_, i) => (
              <FlowEdge
                key={i}
                from={[X.sources + CHIP_W, chipY(i) + CHIP_H / 2]}
                to={[PLATFORM_X, PLATFORM_Y + PLATFORM_H / 2]}
                shape="curve"
                muted
              />
            ))}

            {/* AI providers node under the platform */}
            <FlowNode
              x={PLATFORM_X + 40}
              y={370}
              w={PLATFORM_W - 80}
              h={54}
              label="AI providers"
              sub="Claude · OpenAI · your keys"
              tone="highlight"
              badge="KEY"
            />
            <FlowEdge
              from={[
                PLATFORM_X + PLATFORM_W / 2,
                370,
              ]}
              to={[PLATFORM_X + PLATFORM_W / 2, PLATFORM_Y + PLATFORM_H]}
              shape="straight"
              label="model calls"
            />

            {/* Edges: platform → surfaces */}
            {surfaces.map((_, i) => (
              <FlowEdge
                key={i}
                from={[PLATFORM_X + PLATFORM_W, PLATFORM_Y + PLATFORM_H / 2]}
                to={[X.surfaces, surfaceY(i) + SURFACE_H / 2]}
                shape="curve"
              />
            ))}

            {/* Surface nodes */}
            {surfaces.map((s, i) => (
              <FlowNode
                key={s.label}
                x={X.surfaces}
                y={surfaceY(i)}
                w={SURFACE_W}
                h={SURFACE_H}
                label={s.label}
                sub={s.sub}
              />
            ))}

            {/* You node */}
            <FlowNode
              x={X.you}
              y={surfaceY(1) + SURFACE_H / 2}
              w={80}
              h={100}
              label="Founder"
              sub="+ team"
              tone="highlight"
            />

            {/* Edges: surfaces → you */}
            {surfaces.map((_, i) => (
              <FlowEdge
                key={i}
                from={[X.surfaces + SURFACE_W, surfaceY(i) + SURFACE_H / 2]}
                to={[X.you, surfaceY(1) + SURFACE_H / 2 + 50]}
                shape="curve"
                muted
                arrow={false}
              />
            ))}

            {/* Footnote line */}
            <FlowLabel
              x={20}
              y={H - 14}
              text="slack-native today · microsoft teams on the roadmap, not the shelf"
            />
            <FlowLabel
              x={W - 20}
              y={H - 14}
              text="data never leaves the platform column"
              align="end"
            />
          </FlowCanvas>
        </motion.div>

        {/* Concrete example: a Monday-morning Slack message the platform sends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mt-10 rounded-lg bg-surface-soft soft-hairline p-5 md:p-6"
        >
          <div className="grid lg:grid-cols-[0.5fr_1fr] gap-6 items-start">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                Example surface · Monday 8:02am
              </span>
              <h3 className="text-title-lg text-ink mt-5 max-w-sm">
                What the founder actually reads.
              </h3>
              <p className="text-body-md text-body mt-3 leading-[1.55] max-w-sm">
                Every surface is a rendered view of the same platform data.
                The Slack digest below is not a screenshot from another
                product — it is a scheduled job inside the tool we ship you.
              </p>
            </div>

            <div className="rounded-md bg-canvas soft-hairline p-5">
              <div className="flex items-center gap-2 text-caption text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Slack · #growth · Monday 8:02am
              </div>
              <div className="mt-5 flex items-start gap-3">
                <div className="h-9 w-9 rounded-md bg-signature-coral grid place-items-center text-white text-caption shrink-0">
                  LD
                </div>
                <div className="flex-1">
                  <div className="text-body-md text-ink font-medium">
                    LimeDock · Weekly digest
                  </div>
                  <p className="text-body-md text-body mt-1 leading-[1.55]">
                    Signups +12% WoW · MRR +$4.2k · 3 new demos booked.
                    Marketing led on content, sales followed up 92% within
                    4 hours. Product growth: 41 new active workspaces.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Open full report", "Draft the follow-up", "Snooze 7d"].map(
                      (chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-hairline bg-surface-soft px-3 py-1 text-caption text-ink"
                        >
                          {chip}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
