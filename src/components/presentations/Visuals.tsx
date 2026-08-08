"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Many channels → one hub → CRM / Gmail / calendar */
export function ChannelHubDiagram({
  ink,
  brass,
  channels,
}: {
  ink: string;
  brass: string;
  channels: string[];
}) {
  const reduce = useReducedMotion();
  const left = channels.slice(0, Math.ceil(channels.length / 2));
  const right = channels.slice(Math.ceil(channels.length / 2));

  return (
    <div className="relative overflow-hidden px-2 py-8 md:px-6 md:py-12">
      <div className="mx-auto grid max-w-4xl items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-3 md:items-end">
          {left.map((c, i) => (
            <motion.div
              key={c}
              initial={reduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45, ease }}
              className="flex items-center gap-2 md:flex-row-reverse"
            >
              <span
                className="rounded-sm px-3 py-2 text-xs font-medium tracking-wide"
                style={{ background: `${ink}10`, border: `1px solid ${ink}18` }}
              >
                {c}
              </span>
              <span className="hidden h-px w-8 md:block" style={{ background: brass }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="relative mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-full text-center text-white shadow-lg md:h-44 md:w-44"
          style={{ background: ink }}
        >
          <span
            className="absolute inset-2 rounded-full border"
            style={{ borderColor: `${brass}66` }}
          />
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: brass }}>
            Front desk
          </p>
          <p
            className="mt-1 px-3 text-sm font-medium leading-snug"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Read · log · draft · assign
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 md:items-start">
          {right.map((c, i) => (
            <motion.div
              key={c}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45, ease }}
              className="flex items-center gap-2"
            >
              <span className="hidden h-px w-8 md:block" style={{ background: brass }} />
              <span
                className="rounded-sm px-3 py-2 text-xs font-medium tracking-wide"
                style={{ background: `${ink}10`, border: `1px solid ${ink}18` }}
              >
                {c}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-3">
        {["In CRM", "Draft in Gmail", "Follow-up timed"].map((out) => (
          <span
            key={out}
            className="px-4 py-2 text-xs tracking-wide"
            style={{ background: brass, color: "#0C2838" }}
          >
            {out}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Visual: ~15 min desk vs rest of day selling */
export function DaySplitChart({ ink, brass }: { ink: string; brass: string }) {
  // Donut: 15/480 ≈ 3% of 8hr day — exaggerate slightly for clarity: 12% slice labeled 15 min
  const desk = 14; // visual weight
  const sell = 86;
  const r = 54;
  const c = 2 * Math.PI * r;
  const deskLen = (desk / 100) * c;
  const sellLen = (sell / 100) * c;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="relative mx-auto h-56 w-56">
        <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={`${ink}14`}
            strokeWidth="18"
          />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={brass}
            strokeWidth="18"
            strokeDasharray={`${deskLen} ${c - deskLen}`}
            strokeLinecap="butt"
          />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={ink}
            strokeWidth="18"
            strokeDasharray={`${sellLen} ${c - sellLen}`}
            strokeDashoffset={-deskLen}
            strokeLinecap="butt"
            opacity={0.85}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-3xl" style={{ fontFamily: "Georgia, serif", color: brass }}>
            ~15
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase opacity-50">min desk</p>
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <span className="mt-1 h-3 w-3 shrink-0" style={{ background: brass }} />
          <div>
            <p className="font-medium">Desk work</p>
            <p className="mt-1 text-sm opacity-65">
              Approve drafts. Clear hot leads. Assign. Then close the laptop.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="mt-1 h-3 w-3 shrink-0" style={{ background: ink }} />
          <div>
            <p className="font-medium">The rest of the day</p>
            <p className="mt-1 text-sm opacity-65">
              Showings. Listing appointments. Negotiations. People.
            </p>
          </div>
        </div>
        <p className="text-xs opacity-45">
          Target once systems are running — not day one.
        </p>
      </div>
    </div>
  );
}

/** Two delivery paths side by side */
export function DeliveryPaths({ ink, brass }: { ink: string; brass: string }) {
  const paths = [
    {
      title: "Local app",
      sub: "Mac or PC",
      points: ["Download & run locally", "Privacy on your machine", "We help wire APIs"],
    },
    {
      title: "From where you already work",
      sub: "Slack · Claude · ChatGPT · Gemini",
      points: ["Same workflows", "Approve in chat", "No extra SaaS home"],
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {paths.map((path, i) => (
        <div
          key={path.title}
          className="relative overflow-hidden p-8 text-white"
          style={{ background: i === 0 ? ink : `${ink}e8` }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: brass }}>
            Option {i + 1}
          </p>
          <h3
            className="mt-3 text-2xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {path.title}
          </h3>
          <p className="mt-1 text-sm text-white/55">{path.sub}</p>
          <ul className="mt-6 space-y-2">
            {path.points.map((pt) => (
              <li key={pt} className="flex gap-2 text-sm text-white/80">
                <span style={{ color: brass }}>→</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Compact before → after row */
export function GapArrow({
  title,
  gap,
  fix,
  brass,
  paper,
}: {
  title: string;
  gap: string;
  fix: string;
  brass: string;
  paper: string;
}) {
  return (
    <div
      className="grid gap-3 border-t py-6 md:grid-cols-[1.1fr_auto_1.2fr] md:items-center"
      style={{ borderColor: `${paper}22` }}
    >
      <div>
        <p className="text-xs tracking-wide uppercase opacity-40">{title}</p>
        <p className="mt-1 text-sm text-white/70">{gap}</p>
      </div>
      <span className="hidden text-lg md:block" style={{ color: brass }}>
        →
      </span>
      <p className="text-sm font-medium" style={{ color: brass }}>
        {fix}
      </p>
    </div>
  );
}

/** Simple horizontal bar comparison */
export function BeforeAfterBars({ ink, brass }: { ink: string; brass: string }) {
  const rows = [
    { label: "Hunting inboxes", before: 92, after: 18 },
    { label: "Writing first replies", before: 78, after: 22 },
    { label: "Listing → social posts", before: 85, after: 25 },
  ];
  return (
    <div className="space-y-6">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-2 flex justify-between text-xs tracking-wide">
            <span className="opacity-70">{row.label}</span>
            <span className="opacity-40">before → after</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-sm" style={{ background: `${ink}14` }}>
            <div
              className="absolute inset-y-0 left-0 opacity-35"
              style={{ width: `${row.before}%`, background: ink }}
            />
            <div
              className="absolute inset-y-0 left-0"
              style={{ width: `${row.after}%`, background: brass }}
            />
          </div>
        </div>
      ))}
      <div className="flex gap-6 text-[11px] uppercase tracking-wider opacity-50">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-4 opacity-35" style={{ background: ink }} /> Today
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-4" style={{ background: brass }} /> With systems
        </span>
      </div>
    </div>
  );
}
