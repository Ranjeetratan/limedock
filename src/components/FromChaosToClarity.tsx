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
 * "Manual today → Automated tomorrow" — the same set of jobs a SaaS
 * team runs every week, on the left as manual work and on the right as
 * LimeDock-built automations that plug into the client's own
 * platform / Slack / CRM. The middle node is the LimeDock build itself.
 */

type ManualTask = { label: string; owner: string };

const manual: ManualTask[] = [
  { label: "SDR chases 40 follow-ups", owner: "sales" },
  { label: "Marketing schedules 12 posts", owner: "marketing" },
  { label: "You pull a weekly report", owner: "founder" },
  { label: "PM triages 30 support tickets", owner: "product" },
  { label: "Ops updates the KPI board", owner: "ops" },
  { label: "Recruiter screens 60 CVs", owner: "hiring" },
  { label: "AM logs calls back to CRM", owner: "sales" },
  { label: "Analyst rebuilds the dashboard", owner: "ops" },
];

const automations = [
  {
    label: "Sales workflows",
    sub: "follow-ups · scoring · nudges",
  },
  {
    label: "Marketing workflows",
    sub: "content · scheduling · attribution",
  },
  {
    label: "Management workflows",
    sub: "digests · KPI board · standup",
  },
];

export default function FromChaosToClarity() {
  const W = 1000;
  const H = 520;

  // Left column: manual task rows
  const ROW_W = 260;
  const ROW_H = 30;
  const ROW_GAP = 10;
  const ROWS_START_X = 20;
  const ROWS_START_Y = 60;

  const rowY = (i: number) => ROWS_START_Y + i * (ROW_H + ROW_GAP);
  const rowsBottom = rowY(manual.length - 1) + ROW_H;

  // Middle hub
  const HUB_X = 400;
  const HUB_Y = 210;
  const HUB_W = 180;
  const HUB_H = 120;

  // Right column: automations
  const OUT_X = 730;
  const OUT_W = 240;
  const OUT_H = 62;
  const OUT_GAP = 22;
  const OUT_START_Y = 160;

  return (
    <section id="collapse" className="section-air bg-canvas">
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="signature-card bg-signature-forest text-on-dark overflow-hidden relative"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(252,171,121,0.55), transparent 70%)",
            }}
          />

          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-14 relative">
            <div>
              <span className="eyebrow !text-white/80">
                <span className="dot !bg-white" />
                Manual vs. automated
              </span>
              <h2 className="text-display-md text-white mt-7 max-w-md">
                Your team runs the same workflows every week. We automate them.
              </h2>
              <p className="text-body-md text-white/78 mt-5 leading-[1.55] max-w-md">
                Follow-ups, content, weekly reports, ticket triage, KPI
                boards, recruiter screening — the same jobs, week after
                week. We build workflows that run them for you, plugged
                into the Slack, CRM, and internal platform your team
                already uses.
              </p>

              <ul className="mt-8 space-y-3 text-body-md text-white/85 max-w-md">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                  Sales follow-ups go out without an SDR chasing them.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                  Content ships on schedule with attribution wired in.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                  Weekly digest lands in your Slack every Monday, 8am.
                </li>
              </ul>
            </div>

            {/* Flowchart card */}
            <div className="rounded-lg bg-canvas p-4 md:p-5 text-ink">
              <FlowCanvas width={W} height={H}>
                {/* Column headers */}
                <FlowLabel x={ROWS_START_X} y={30} text="manual · every week" />
                <FlowLabel x={HUB_X + 8} y={30} text="limedock builds" />
                <FlowLabel x={OUT_X} y={30} text="automated · runs itself" />

                {/* Left column: manual tasks as horizontal rows */}
                {manual.map((task, i) => (
                  <g key={task.label}>
                    <rect
                      x={ROWS_START_X}
                      y={rowY(i)}
                      width={ROW_W}
                      height={ROW_H}
                      rx={4}
                      fill="#ffffff"
                      stroke="rgba(24,29,38,0.24)"
                      strokeWidth={1}
                    />
                    <text
                      x={ROWS_START_X + 12}
                      y={rowY(i) + ROW_H / 2 + 4}
                      fontSize={11}
                      fill="#181d26"
                      fontFamily="ui-sans-serif, system-ui, sans-serif"
                    >
                      {task.label}
                    </text>
                    <text
                      x={ROWS_START_X + ROW_W - 12}
                      y={rowY(i) + ROW_H / 2 + 3}
                      textAnchor="end"
                      fontSize={9}
                      fill="rgba(24,29,38,0.55)"
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {task.owner}
                    </text>
                  </g>
                ))}

                {/* Edges: manual tasks → hub (converging) */}
                {manual.map((_, i) => (
                  <FlowEdge
                    key={i}
                    from={[ROWS_START_X + ROW_W, rowY(i) + ROW_H / 2]}
                    to={[HUB_X, HUB_Y + HUB_H / 2]}
                    shape="curve"
                    muted
                    arrow={false}
                  />
                ))}

                {/* Hub */}
                <FlowNode
                  x={HUB_X}
                  y={HUB_Y}
                  w={HUB_W}
                  h={HUB_H}
                  label="Workflow automations"
                  sub="built to your ops"
                  tone="accent"
                  badge="LD"
                />

                {/* Explanatory label between */}
                <FlowLabel
                  x={(ROWS_START_X + ROW_W + HUB_X) / 2}
                  y={HUB_Y - 12}
                  text="what your team does today"
                  align="middle"
                  color="rgba(24,29,38,0.5)"
                />
                <FlowLabel
                  x={(HUB_X + HUB_W + OUT_X) / 2}
                  y={HUB_Y - 12}
                  text="what runs itself tomorrow"
                  align="middle"
                  color="rgba(24,29,38,0.5)"
                />

                {/* Right column: workflow automations */}
                {automations.map((o, i) => (
                  <FlowNode
                    key={o.label}
                    x={OUT_X}
                    y={OUT_START_Y + i * (OUT_H + OUT_GAP)}
                    w={OUT_W}
                    h={OUT_H}
                    label={o.label}
                    sub={o.sub}
                    tone="highlight"
                  />
                ))}

                {/* Hub → automations */}
                {automations.map((_, i) => (
                  <FlowEdge
                    key={i}
                    from={[HUB_X + HUB_W, HUB_Y + HUB_H / 2]}
                    to={[
                      OUT_X,
                      OUT_START_Y + i * (OUT_H + OUT_GAP) + OUT_H / 2,
                    ]}
                    shape="curve"
                  />
                ))}

                {/* Footer notes */}
                <FlowLabel
                  x={ROWS_START_X}
                  y={Math.max(rowsBottom + 30, H - 18)}
                  text="hours per week your team never gets back"
                />
                <FlowLabel
                  x={W - 20}
                  y={H - 18}
                  text="lands in slack, cli, digest — where your team already lives"
                  align="end"
                />
              </FlowCanvas>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
