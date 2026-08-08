"use client";

import { motion } from "framer-motion";
import {
  FlowCanvas,
  FlowEdge,
  FlowLabel,
  FlowNode,
} from "@/components/flow/FlowPrimitives";

const realEstateManual = [
  { label: "SDR / Agent chases 30 portal leads", owner: "sales" },
  { label: "Coordinator texts post-showing feedback", owner: "ops" },
  { label: "Agent manually posts open houses", owner: "marketing" },
  { label: "Broker updates MLS & CRM status", owner: "admin" },
  { label: "TC chases disclosure signature docs", owner: "closing" },
  { label: "Agent sends price drop notifications", owner: "sales" },
  { label: "Staff re-keys leads across tools", owner: "data" },
  { label: "Manager builds weekly deal summary", owner: "founder" },
];

const realEstateAutomations = [
  {
    label: "Lead & Portal Workflows",
    sub: "instant response · routing · CRM sync",
  },
  {
    label: "Showing & Listing Workflows",
    sub: "feedback loops · open house · price drop",
  },
  {
    label: "Deal & Nurture Workflows",
    sub: "doc chasing · client updates · digests",
  },
];

export default function RealEstateFlowchart() {
  const W = 1000;
  const H = 520;

  const ROW_W = 270;
  const ROW_H = 30;
  const ROW_GAP = 10;
  const ROWS_START_X = 20;
  const ROWS_START_Y = 60;
  const rowY = (i: number) => ROWS_START_Y + i * (ROW_H + ROW_GAP);
  const rowsBottom = rowY(realEstateManual.length - 1) + ROW_H;

  const HUB_X = 410;
  const HUB_Y = 210;
  const HUB_W = 180;
  const HUB_H = 120;

  const OUT_X = 730;
  const OUT_W = 250;
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
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
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
                Brokerages run the same weekly loops. We turn them into automated systems.
              </h2>
              <p className="text-body-md text-white/78 mt-5 leading-[1.55] max-w-md">
                Portal lead response, showing feedback, listing price updates, doc chasing, and agent digests — the same tasks week after week. We build durable workflows plugged into your CRM, MLS tools, and Slack.
              </p>

              <ul className="mt-8 space-y-3 text-body-md text-white/85 max-w-md">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                  Zillow and site leads get first-touch response within 60 seconds.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                  Showing feedback automatically nudges agents and digests to listing clients.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
                  Transaction milestone alerts land in Slack threads every morning.
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-canvas p-4 md:p-5 text-ink">
              <FlowCanvas width={W} height={H}>
                <FlowLabel x={ROWS_START_X} y={30} text="manual real estate tasks" />
                <FlowLabel x={HUB_X + 8} y={30} text="limedock engine" />
                <FlowLabel x={OUT_X} y={30} text="automated brokerage loops" />

                {realEstateManual.map((task, i) => (
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

                {realEstateManual.map((_, i) => (
                  <FlowEdge
                    key={i}
                    from={[ROWS_START_X + ROW_W, rowY(i) + ROW_H / 2]}
                    to={[HUB_X, HUB_Y + HUB_H / 2]}
                    shape="curve"
                    muted
                    arrow={false}
                  />
                ))}

                <FlowNode
                  x={HUB_X}
                  y={HUB_Y}
                  w={HUB_W}
                  h={HUB_H}
                  label="Brokerage automations"
                  sub="wired to MLS + CRM"
                  tone="accent"
                  badge="RE"
                />

                <FlowLabel
                  x={(ROWS_START_X + ROW_W + HUB_X) / 2}
                  y={HUB_Y - 12}
                  text="today's manual drag"
                  align="middle"
                  color="rgba(24,29,38,0.5)"
                />
                <FlowLabel
                  x={(HUB_X + HUB_W + OUT_X) / 2}
                  y={HUB_Y - 12}
                  text="tomorrow's owned loops"
                  align="middle"
                  color="rgba(24,29,38,0.5)"
                />

                {realEstateAutomations.map((o, i) => (
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

                {realEstateAutomations.map((_, i) => (
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

                <FlowLabel
                  x={ROWS_START_X}
                  y={Math.max(rowsBottom + 30, H - 18)}
                  text="hours saved per agent every week"
                />
                <FlowLabel
                  x={W - 20}
                  y={H - 18}
                  text="syncs with slack, follow-up boss, kvcore & crm"
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
