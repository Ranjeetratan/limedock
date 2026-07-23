"use client";

import { motion } from "framer-motion";
import TiltCard from "./motion/TiltCard";
import { ReactNode } from "react";
import {
  FlowCanvas,
  FlowChip,
  FlowEdge,
  FlowLabel,
  FlowNode,
} from "./flow/FlowPrimitives";

type Service = {
  id: string;
  title: string;
  description: string;
  diagram: ReactNode;
  surface: string;
  span: string;
  height: string;
};

/* ---------------------------------------------------------------
 * Mini flowcharts — one per capability card. Each is a purpose-built
 * SVG diagram in the shared "technical drawing" style so all six cards
 * feel like pages from the same engineering notebook, not stock art.
 * ------------------------------------------------------------- */

function SalesFlow() {
  return (
    <FlowCanvas width={600} height={260}>
      <FlowLabel x={20} y={26} text="sales workflow · daily loop" />
      <FlowChip x={20} y={70} w={110} h={26} label="Cold list" />
      <FlowNode x={165} y={55} w={130} h={56} label="Lead scoring" sub="AI-ranked" tone="highlight" />
      <FlowNode x={335} y={55} w={130} h={56} label="Outreach queue" sub="drafted daily" />
      <FlowNode x={505} y={55} w={80} h={56} label="Meeting" tone="accent" />
      <FlowEdge from={[130, 83]} to={[165, 83]} shape="straight" />
      <FlowEdge from={[295, 83]} to={[335, 83]} shape="straight" />
      <FlowEdge from={[465, 83]} to={[505, 83]} shape="straight" />
      <FlowChip x={165} y={160} w={130} h={26} label="Enrichment API" />
      <FlowChip x={335} y={160} w={130} h={26} label="Call summariser" />
      <FlowEdge from={[230, 160]} to={[230, 111]} shape="straight" muted arrow={false} />
      <FlowEdge from={[400, 160]} to={[400, 111]} shape="straight" muted arrow={false} />
      <FlowLabel x={20} y={230} text="revenue team opens one tool, not seven" />
    </FlowCanvas>
  );
}

function MarketingFlow() {
  return (
    <FlowCanvas width={600} height={260}>
      <FlowLabel x={20} y={26} text="marketing OS · content → attribution" />
      <FlowChip x={20} y={70} w={110} h={26} label="Idea capture" />
      <FlowChip x={20} y={106} w={110} h={26} label="Research API" />
      <FlowNode x={165} y={70} w={130} h={62} label="Draft &amp; ship" sub="AI-assisted" tone="highlight" />
      <FlowNode x={335} y={70} w={130} h={62} label="Distribution" sub="email · social · SEO" />
      <FlowNode x={505} y={70} w={80} h={62} label="Attrib." sub="live" tone="accent" />
      <FlowEdge from={[130, 83]} to={[165, 90]} shape="curve" />
      <FlowEdge from={[130, 119]} to={[165, 110]} shape="curve" />
      <FlowEdge from={[295, 101]} to={[335, 101]} shape="straight" />
      <FlowEdge from={[465, 101]} to={[505, 101]} shape="straight" />
      <FlowEdge from={[545, 132]} to={[95, 200]} shape="curve" muted dashed arrow={false} />
      <FlowLabel x={20} y={220} text="attribution feeds tomorrow's ideas" />
      <FlowLabel x={20} y={240} text="one canvas · one team · one truth" />
    </FlowCanvas>
  );
}

function CopilotFlow() {
  return (
    <FlowCanvas width={600} height={260}>
      <FlowLabel x={20} y={26} text="internal AI copilot · retrieval loop" />
      <FlowChip x={20} y={70} w={110} h={24} label="Docs & wiki" />
      <FlowChip x={20} y={104} w={110} h={24} label="CRM records" />
      <FlowChip x={20} y={138} w={110} h={24} label="Product data" />
      <FlowNode x={175} y={70} w={130} h={96} label="Retriever" sub="scoped to you" />
      <FlowNode x={345} y={82} w={130} h={70} label="LLM answer" sub="cited sources" tone="highlight" />
      <FlowNode x={505} y={97} w={80} h={40} label="Slack" tone="accent" />
      <FlowEdge from={[130, 82]} to={[175, 100]} shape="curve" />
      <FlowEdge from={[130, 116]} to={[175, 118]} shape="curve" />
      <FlowEdge from={[130, 150]} to={[175, 136]} shape="curve" />
      <FlowEdge from={[305, 118]} to={[345, 117]} shape="straight" />
      <FlowEdge from={[475, 117]} to={[505, 117]} shape="straight" />
      <FlowLabel x={20} y={220} text="answers come from your data, not the public internet" />
    </FlowCanvas>
  );
}

function DataFlow() {
  return (
    <FlowCanvas width={600} height={260}>
      <FlowLabel x={20} y={26} text="data & integrations · one bus" />
      <FlowChip x={20} y={60} w={100} h={24} label="CRM" />
      <FlowChip x={20} y={90} w={100} h={24} label="Stripe" />
      <FlowChip x={20} y={120} w={100} h={24} label="Product" />
      <FlowChip x={20} y={150} w={100} h={24} label="Calendar" />
      <FlowChip x={20} y={180} w={100} h={24} label="Support" />
      <FlowNode x={200} y={90} w={160} h={100} label="Event bus" sub="normalised schema" tone="highlight" badge="ETL" />
      <FlowNode x={400} y={70} w={170} h={40} label="Sales workflows" tone="accent" />
      <FlowNode x={400} y={130} w={170} h={40} label="Marketing workflows" tone="accent" />
      <FlowNode x={400} y={190} w={170} h={40} label="Management workflows" tone="accent" />
      {[72, 102, 132, 162, 192].map((y, i) => (
        <FlowEdge key={i} from={[120, y]} to={[200, 140]} shape="curve" muted />
      ))}
      <FlowEdge from={[360, 130]} to={[400, 90]} shape="curve" />
      <FlowEdge from={[360, 140]} to={[400, 150]} shape="curve" />
      <FlowEdge from={[360, 150]} to={[400, 210]} shape="curve" />
      <FlowLabel x={20} y={230} text="every workflow reads the same normalised events" />
    </FlowCanvas>
  );
}

function PromptOpsFlow() {
  return (
    <FlowCanvas width={600} height={260}>
      <FlowLabel x={20} y={26} text="prompt & model ops · release pipeline" />
      <FlowNode x={20} y={70} w={110} h={50} label="Prompt v3" sub="git-tracked" />
      <FlowNode x={160} y={70} w={110} h={50} label="Eval suite" sub="100 cases" tone="highlight" badge="CI" />
      <FlowNode x={300} y={70} w={110} h={50} label="Ship" tone="accent" />
      <FlowNode x={440} y={70} w={140} h={50} label="Monitor" sub="drift · cost · P95" />
      <FlowEdge from={[130, 95]} to={[160, 95]} shape="straight" />
      <FlowEdge from={[270, 95]} to={[300, 95]} shape="straight" label="pass" />
      <FlowEdge from={[410, 95]} to={[440, 95]} shape="straight" />
      <FlowEdge from={[510, 120]} to={[75, 120]} shape="curve" muted dashed label="regressed?" arrow={false} />
      <FlowChip x={160} y={175} w={110} h={22} label="Model routing" />
      <FlowChip x={300} y={175} w={110} h={22} label="Cost cap" />
      <FlowEdge from={[215, 175]} to={[215, 120]} shape="straight" muted arrow={false} />
      <FlowEdge from={[355, 175]} to={[355, 120]} shape="straight" muted arrow={false} />
      <FlowLabel x={20} y={230} text="every change is versioned, evaluated, and reversible" />
    </FlowCanvas>
  );
}

function ManagementFlow() {
  return (
    <FlowCanvas width={600} height={260}>
      <FlowLabel x={20} y={26} text="management workflow · founder digest" />
      {/* Sources on the left */}
      {[
        "MRR",
        "Pipeline",
        "Signups",
        "Support",
        "Hiring",
        "Product",
      ].map((label, i) => (
        <FlowChip
          key={label}
          x={20 + (i % 2) * 96}
          y={60 + Math.floor(i / 2) * 32}
          w={86}
          h={22}
          label={label}
        />
      ))}
      <FlowNode
        x={230}
        y={80}
        w={140}
        h={100}
        label="Weekly report"
        sub="composed for you"
        tone="highlight"
        badge="LD"
      />
      <FlowNode x={410} y={65} w={170} h={40} label="Slack #standup" tone="accent" />
      <FlowNode x={410} y={115} w={170} h={40} label="Email digest · Fri 8am" tone="accent" />
      <FlowNode x={410} y={165} w={170} h={40} label="KPI board" tone="accent" />
      {[70, 102, 134].map((y, i) => (
        <FlowEdge key={i} from={[200, y + 11]} to={[230, 130]} shape="curve" muted arrow={false} />
      ))}
      {[70, 102, 134].map((y, i) => (
        <FlowEdge key={`r-${i}`} from={[200, y + 11 + 12]} to={[230, 130]} shape="curve" muted arrow={false} />
      ))}
      <FlowEdge from={[370, 130]} to={[410, 85]} shape="curve" />
      <FlowEdge from={[370, 130]} to={[410, 135]} shape="curve" />
      <FlowEdge from={[370, 130]} to={[410, 185]} shape="curve" />
      <FlowLabel x={20} y={230} text="the whole company on one page, every week" />
    </FlowCanvas>
  );
}

const services: Service[] = [
  {
    id: "01",
    title: "Sales workflows",
    description:
      "SDR follow-ups, lead scoring, meeting prep, pipeline nudges — the repeating tasks your revenue team spends the week on, moving without them chasing.",
    diagram: <SalesFlow />,
    surface: "bg-signature-peach",
    span: "lg:col-span-5",
    height: "min-h-[420px]",
  },
  {
    id: "02",
    title: "Marketing workflows",
    description:
      "Content pipeline, campaign scheduling, drip email, and attribution — designed for how your team actually markets, not a generic template.",
    diagram: <MarketingFlow />,
    surface: "bg-signature-cream",
    span: "lg:col-span-7",
    height: "min-h-[500px]",
  },
  {
    id: "03",
    title: "Team copilots",
    description:
      "Slack chat, search, and workflow assistants that answer from your docs, CRM, and product data — not a public LLM guessing at your business.",
    diagram: <CopilotFlow />,
    surface: "bg-signature-mint",
    span: "lg:col-span-7",
    height: "min-h-[470px]",
  },
  {
    id: "04",
    title: "Data & integrations",
    description:
      "The plumbing that wires your CRM, product, calendar, docs, and API providers into a single source of truth every workflow can trust.",
    diagram: <DataFlow />,
    surface: "bg-signature-yellow",
    span: "lg:col-span-5",
    height: "min-h-[400px]",
  },
  {
    id: "05",
    title: "AI ops",
    description:
      "Versioned prompts, model routing, evals, and cost dashboards so every AI-powered workflow keeps improving instead of quietly drifting.",
    diagram: <PromptOpsFlow />,
    surface: "bg-signature-mustard",
    span: "lg:col-span-4",
    height: "min-h-[440px]",
  },
  {
    id: "06",
    title: "Management workflows",
    description:
      "Weekly digests, KPI board, cross-team standup — the workflows that keep the founder, ops, and product side in sync without a Sunday spreadsheet.",
    diagram: <ManagementFlow />,
    surface: "bg-canvas",
    span: "lg:col-span-8",
    height: "min-h-[440px]",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.06 }}
      className={`group ${service.span}`}
    >
      <TiltCard className="rounded-[10px]" max={4} spotlight>
        <div
          className={`demo-card card-luminous soft-hairline ${service.surface} ${service.height} flex flex-col relative`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20"
          />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <span className="text-caption text-muted">{service.id}</span>
            <span className="text-caption text-muted opacity-80">
              LimeDock / {service.title}
            </span>
          </div>

          {/* Flowchart canvas — bg-canvas so the SVG's dotted grid reads
              as a diagram, not part of the coloured surface. */}
          <div className="relative mt-6 flex-1 min-h-[220px] overflow-hidden rounded-md bg-canvas soft-hairline p-3 md:p-4">
            {service.diagram}
          </div>

          <div className="pt-6 grid md:grid-cols-[0.55fr_1fr] gap-4 items-start relative z-10">
            <h3 className="text-title-lg text-ink flex items-center gap-2">
              {service.title}
              <motion.span
                aria-hidden
                initial={false}
                className="inline-block h-[6px] w-[6px] rounded-full bg-ink/40 group-hover:bg-ink transition-colors"
              />
            </h3>
            <p className="text-body-md text-body leading-[1.55]">
              {service.description}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

export default function DesignedToScale() {
  return (
    <section id="capabilities" className="section-air bg-canvas">
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid lg:grid-cols-[0.75fr_0.55fr] gap-8 items-end"
        >
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Capabilities
            </span>
            <h2 className="text-display-md text-ink mt-7 max-w-2xl">
              The workflow automations we build around your marketing, sales, and management.
            </h2>
          </div>
          <p className="text-label-md text-body leading-[1.45] max-w-md lg:justify-self-end">
            Every capability is a small flowchart your team can trust. Pick
            the workflows you need this quarter — we wire them into the
            Slack, CRM, and internal platform you already use. Pay us
            once. Pay the model providers as you scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
