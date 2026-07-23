"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import {
  FlowCanvas,
  FlowChip,
  FlowEdge,
  FlowLabel,
  FlowNode,
} from "./flow/FlowPrimitives";

function AuditFlow() {
  return (
    <FlowCanvas width={360} height={220}>
      <FlowLabel x={16} y={22} text="phase 01 · audit" />
      <FlowChip x={16} y={56} w={100} h={24} label="Interviews" />
      <FlowChip x={16} y={90} w={100} h={24} label="Stack export" />
      <FlowChip x={16} y={124} w={100} h={24} label="Docs & tickets" />
      <FlowNode x={155} y={70} w={130} h={70} label="Workflow map" sub="what to keep / kill / build" tone="highlight" badge="LD" />
      <FlowEdge from={[116, 68]} to={[155, 95]} shape="curve" />
      <FlowEdge from={[116, 102]} to={[155, 105]} shape="curve" />
      <FlowEdge from={[116, 136]} to={[155, 115]} shape="curve" />
      <FlowNode x={155} y={162} w={130} h={38} label="Sprint 0 brief" tone="accent" />
      <FlowEdge from={[220, 140]} to={[220, 162]} shape="straight" />
    </FlowCanvas>
  );
}

function BuildFlow() {
  return (
    <FlowCanvas width={360} height={220}>
      <FlowLabel x={16} y={22} text="phase 02 · build" />
      <FlowNode x={16} y={58} w={90} h={50} label="Design" sub="in figma" />
      <FlowNode x={130} y={58} w={90} h={50} label="Engineer" sub="in repo" tone="highlight" />
      <FlowNode x={244} y={58} w={100} h={50} label="AI wiring" sub="prompts + evals" />
      <FlowEdge from={[106, 83]} to={[130, 83]} shape="straight" />
      <FlowEdge from={[220, 83]} to={[244, 83]} shape="straight" />
      <FlowNode x={90} y={140} w={180} h={44} label="Weekly demo" sub="one link, visible progress" tone="accent" />
      <FlowEdge from={[62, 108]} to={[140, 140]} shape="curve" muted arrow={false} />
      <FlowEdge from={[175, 108]} to={[180, 140]} shape="curve" muted arrow={false} />
      <FlowEdge from={[293, 108]} to={[220, 140]} shape="curve" muted arrow={false} />
    </FlowCanvas>
  );
}

function OwnFlow() {
  return (
    <FlowCanvas width={360} height={220}>
      <FlowLabel x={16} y={22} text="phase 03 · own" />
      <FlowNode x={16} y={56} w={110} h={44} label="Handover" sub="code + docs" tone="accent" />
      <FlowNode x={150} y={56} w={90} h={44} label="Metrics" sub="live" />
      <FlowNode x={260} y={56} w={86} h={44} label="Tune" sub="weekly" tone="highlight" />
      <FlowEdge from={[126, 78]} to={[150, 78]} shape="straight" />
      <FlowEdge from={[240, 78]} to={[260, 78]} shape="straight" />
      <FlowEdge from={[303, 100]} to={[71, 100]} shape="curve" muted dashed label="new module" arrow={false} />
      <FlowChip x={16} y={148} w={100} h={22} label="Prompts v3" />
      <FlowChip x={130} y={148} w={100} h={22} label="Model swap" />
      <FlowChip x={244} y={148} w={100} h={22} label="New surface" />
      <FlowLabel x={16} y={198} text="platform keeps improving after we leave" />
    </FlowCanvas>
  );
}

type Step = {
  label: string;
  title: string;
  copy: string;
  diagram: ReactNode;
  tone: string;
};

const steps: Step[] = [
  {
    label: "Audit",
    title: "We turn a messy workflow into an execution map.",
    copy:
      "Every subscription, spreadsheet, and manual step in your marketing or sales workflow gets on the same canvas. What to keep, what to kill, and what to build lands in one crisp brief.",
    diagram: <AuditFlow />,
    tone: "bg-signature-mint",
  },
  {
    label: "Build",
    title: "Design, engineering, and AI move in the same room.",
    copy:
      "Every week has visible output: internal screens, working prototypes, integrated APIs, and the prompts, evals, and infrastructure behind them.",
    diagram: <BuildFlow />,
    tone: "bg-signature-peach",
  },
  {
    label: "Own",
    title: "Launch is where the tuning loop begins.",
    copy:
      "We hand over code, prompts, and docs, then stay on for the tuning that keeps the platform sharp — new modules, model swaps, and workflow tweaks as the team learns.",
    diagram: <OwnFlow />,
    tone: "bg-signature-yellow",
  },
];

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="section-air bg-canvas"
    >
      <div className="container-air">
        <div className="rounded-lg bg-signature-cream p-6 md:p-12 overflow-hidden relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(252,171,121,0.55), transparent 70%)",
            }}
          />

          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-16 relative">
            <div className="lg:sticky lg:top-28 h-fit">
              <span className="eyebrow">
                <span className="dot" />
                Process
              </span>
              <h2 className="text-display-md text-ink mt-7 max-w-md">
                A three-step loop that turns your workflow into software you own.
              </h2>
              <p className="text-body-md text-body mt-5 leading-[1.55] max-w-sm">
                The trick is not more meetings. It is spending real time with
                your team, then shipping fast enough that the next decision
                arrives before the last one goes stale.
              </p>

              <div className="mt-10 relative">
                <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
                  <motion.div
                    style={{ width: progress }}
                    className="h-full rounded-full bg-ink"
                  />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-caption text-muted">
                  {steps.map((s) => (
                    <span key={s.label} className="text-center">
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {steps.map((step, index) => (
                <motion.article
                  key={step.label}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.58, delay: index * 0.06 }}
                  className="cream-callout-card rounded-md bg-canvas soft-hairline p-5 md:p-6 grid md:grid-cols-[300px_1fr] gap-6 items-center group hover:shadow-[0_18px_45px_rgba(24,29,38,0.08)] transition-shadow"
                >
                  {/* Mini flowchart replaces the previous phase illustration */}
                  <div
                    className={`relative rounded-md overflow-hidden card-luminous ${step.tone} p-3 transition-transform duration-500 group-hover:scale-[1.01]`}
                  >
                    <div className="rounded-md bg-canvas soft-hairline p-2">
                      {step.diagram}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-caption text-muted tabular-nums">
                        0{index + 1}
                      </span>
                      <span className="text-caption text-link inline-flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-link" />
                        {step.label}
                      </span>
                    </div>
                    <h3 className="text-title-lg text-ink mt-4 max-w-xl">
                      {step.title}
                    </h3>
                    <p className="text-body-md text-body mt-3 leading-[1.55] max-w-xl">
                      {step.copy}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
