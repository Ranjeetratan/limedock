"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { WorkflowNodeChart } from "@/components/presentations/WorkflowNodeChart";
import {
  BeforeAfterBars,
  ChannelHubDiagram,
  DaySplitChart,
  DeliveryPaths,
  GapArrow,
} from "@/components/presentations/Visuals";
import { resolveHeroImageSrc } from "@/lib/presentations/hero";
import { BOOK_DEMO_URL } from "@/lib/site";
import type { Presentation } from "@/lib/presentations/types";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const HUB_CHANNELS = [
  "WhatsApp",
  "Enquiry forms",
  "Instagram",
  "LinkedIn",
  "Google Maps",
  "Portals",
  "Valuation",
  "Phone / SMS",
];

export function PresentationView({
  presentation: p,
  accent,
  logo,
  expiresLocal,
}: {
  presentation: Presentation;
  accent: string;
  logo: string | null;
  expiresLocal: string;
}) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  resolveHeroImageSrc({
    companyUrl: p.company.url,
    ogImageUrl: p.company.ogImageUrl,
    curatedHeroUrl: p.company.heroImageUrl,
  });

  const ink = p.company.brandColors[0] || "#0C2838";
  const brass = p.company.brandColors[1] || accent || "#C2A67C";
  const paper = p.company.brandColors[2] || "#F4EFE6";
  const portrait = p.company.portraitUrl || null;
  const firstName = p.recipientName?.split(" ")[0] || "you";

  const { scrollYProgress: pageProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const progressWidth = useTransform(pageProgress, [0, 1], ["0%", "100%"]);
  const heroImgY = useTransform(heroProgress, [0, 1], reduce ? [0, 0] : [0, 80]);
  const heroCopyY = useTransform(heroProgress, [0, 1], reduce ? [0, 0] : [0, 32]);
  const heroFade = useTransform(heroProgress, [0, 0.85], [1, 0.3]);

  const shortObs = p.observations.slice(0, 4);
  const topOpps = (p.opportunities ?? []).slice(0, 5);
  const topCharts = (p.workflowCharts ?? []).slice(0, 3);
  const topModules = p.modules.slice(0, 8);
  const topBeats = (p.pitchBeats ?? []).filter((b) =>
    ["inbox", "delivery", "fifteen", "team", "geo"].includes(b.id),
  );

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-x-clip"
      style={{ background: paper, color: ink }}
    >
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px]"
        style={{ width: progressWidth, background: brass }}
        aria-hidden
      />

      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: `${ink}22`, background: `${paper}ee` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <div className="flex min-w-0 items-center gap-4">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={p.company.name}
                className="h-8 w-auto max-w-[180px] object-contain object-left md:h-9"
                style={{ mixBlendMode: "multiply" }}
              />
            ) : (
              <span style={{ fontFamily: "Georgia, serif" }}>{p.company.name}</span>
            )}
            <p className="hidden text-[11px] tracking-[0.18em] uppercase opacity-50 md:block">
              Private · {p.company.domain}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/limedock-logo.svg" alt="LimeDock" className="h-5 w-auto opacity-70" />
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[78vh] overflow-hidden">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          {portrait ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portrait}
                alt={p.recipientName || p.company.name}
                className="absolute inset-0 h-[115%] w-full object-cover object-[center_18%] md:left-auto md:right-0 md:w-[55%]"
              />
              <div
                className="absolute inset-0 md:hidden"
                style={{
                  background: `linear-gradient(180deg, ${ink}b8 0%, ${ink}f0 100%)`,
                }}
              />
              <div
                className="absolute inset-0 hidden md:block"
                style={{
                  background: `linear-gradient(90deg, ${ink} 0%, ${ink}f2 40%, ${ink}88 62%, transparent 88%)`,
                }}
              />
            </>
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `radial-gradient(ellipse at 70% 20%, ${brass}33, transparent 50%), ${ink}`,
              }}
            />
          )}
        </motion.div>

        <motion.div
          style={{ y: heroCopyY, opacity: heroFade }}
          className="relative z-10 mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-6 pb-14 pt-24 md:px-10 md:pb-20"
        >
          <p className="text-xs tracking-[0.28em] uppercase" style={{ color: brass }}>
            Private brief · {p.recipientName || "LimeDock"}
          </p>
          <h1
            className="mt-4 max-w-xl text-[clamp(2rem,4.8vw,3.4rem)] font-normal leading-[1.08] text-white"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {p.headline}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/72">
            {p.subhead}
          </p>
          <div className="mt-8 flex flex-wrap gap-5">
            <a
              href={BOOK_DEMO_URL}
              className="inline-flex px-7 py-3.5 text-sm font-medium"
              style={{ background: brass, color: ink }}
            >
              {p.callPlan?.ctaLabel || "Book 30 minutes"}
            </a>
            <a
              href="#pains"
              className="self-center text-sm text-white/65 underline-offset-4 hover:underline"
            >
              Where it breaks ↓
            </a>
          </div>
        </motion.div>
      </section>

      {/* Snapshot chips */}
      <section id="brief" className="border-b" style={{ borderColor: `${ink}14`, background: paper }}>
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
          <div className="flex flex-wrap gap-2">
            {shortObs.map((o) => (
              <span
                key={o}
                className="max-w-full truncate rounded-sm px-3 py-2 text-xs md:max-w-[280px]"
                style={{ background: `${ink}0a`, border: `1px solid ${ink}14` }}
                title={o}
              >
                {o.length > 72 ? `${o.slice(0, 70)}…` : o}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Visual: channel hub */}
      <section id="picture" style={{ background: paper }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              The fix, drawn
            </p>
            <h2 className="mt-3 max-w-xl text-3xl md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              Hands raised on six channels. One desk that answers.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <ChannelHubDiagram ink={ink} brass={brass} channels={HUB_CHANNELS} />
          </Reveal>
        </div>
      </section>

      {/* Day split + before/after */}
      <section style={{ background: `${brass}12` }}>
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <Reveal>
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              After it works
            </p>
            <h2 className="mt-3 text-3xl" style={{ fontFamily: "Georgia, serif" }}>
              Short desk. Long day with clients.
            </h2>
            <div className="mt-10">
              <DaySplitChart ink={ink} brass={brass} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              What we’re cutting
            </p>
            <h2 className="mt-3 text-3xl" style={{ fontFamily: "Georgia, serif" }}>
              Busywork that doesn’t close houses
            </h2>
            <div className="mt-10">
              <BeforeAfterBars ink={ink} brass={brass} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Delivery */}
      <section className="border-y" style={{ borderColor: `${ink}12`, background: paper }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              Delivery
            </p>
            <h2 className="mt-3 max-w-lg text-3xl" style={{ fontFamily: "Georgia, serif" }}>
              On your laptop — or in the apps you already open
            </h2>
          </Reveal>
          <div className="mt-10">
            <DeliveryPaths ink={ink} brass={brass} />
          </div>
        </div>
      </section>

      {/* Gaps — Nancy pains */}
      <section id="pains" style={{ background: ink, color: paper }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              {firstName}&apos;s pain → our fix
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl text-white md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              Where money quietly leaks after someone already chose you
            </h2>
          </Reveal>
          <div className="mt-8">
            {topOpps.map((op) => (
              <GapArrow
                key={op.title}
                title={op.title}
                gap={op.gap}
                fix={op.fix}
                brass={brass}
                paper={paper}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key charts only */}
      <section style={{ background: paper }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              How the fix runs
            </p>
            <h2 className="mt-3 text-3xl" style={{ fontFamily: "Georgia, serif" }}>
              Three flows. Not a product catalog.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-8">
            {topCharts.map((chart, i) => (
              <Reveal key={chart.id} delay={i * 0.05}>
                <WorkflowNodeChart chart={chart} accent={brass} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modules as tile grid */}
      <section id="modules" style={{ background: `${ink}`, color: paper }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              Menu of fixes
            </p>
            <h2 className="mt-3 max-w-xl text-3xl text-white" style={{ fontFamily: "Georgia, serif" }}>
              We start with one. The rest wait.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topModules.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.03}>
                <div
                  className="flex h-full flex-col border p-5"
                  style={{ borderColor: `${paper}22` }}
                >
                  <p className="font-mono text-[10px] opacity-35">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-3 text-lg leading-snug text-white"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {m.title}
                  </h3>
                  <p className="mt-auto pt-4 text-xs leading-relaxed" style={{ color: brass }}>
                    {m.whyForThem}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pitch beats */}
      {topBeats.length > 0 && (
        <section style={{ background: paper }}>
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
            <Reveal>
              <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
                Founder notes
              </p>
              <h2 className="mt-3 text-3xl" style={{ fontFamily: "Georgia, serif" }}>
                What we’d argue for on a whiteboard
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {topBeats.map((beat, i) => (
                <Reveal key={beat.id} delay={i * 0.04}>
                  <div
                    className="h-full border p-6"
                    style={{ borderColor: `${ink}18` }}
                  >
                    <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: brass }}>
                      {beat.eyebrow}
                    </p>
                    <h3
                      className="mt-2 text-xl leading-snug"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {beat.title}
                    </h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed opacity-65">
                      {beat.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Morning dashboard */}
      <section className="border-y" style={{ borderColor: `${ink}12`, background: paper }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:grid md:grid-cols-12 md:gap-10 md:px-10 md:py-20">
          <Reveal className="md:col-span-4">
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              If it worked Monday
            </p>
            <h2 className="mt-3 text-3xl" style={{ fontFamily: "Georgia, serif" }}>
              This is the screen — not five apps
            </h2>
          </Reveal>
          <Reveal className="mt-8 md:col-span-8 md:mt-0" delay={0.08}>
            <div className="p-8 text-white md:p-10" style={{ background: ink }}>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {[
                  [p.morningBrief.activeLeads, "active"],
                  [p.morningBrief.hotLeads, "hot"],
                  [p.morningBrief.siteVisitsToday, "showings"],
                  [p.morningBrief.dealsLikelyClose, "closing"],
                ].map(([n, label]) => (
                  <div key={String(label)}>
                    <p className="text-3xl" style={{ fontFamily: "Georgia, serif", color: brass }}>
                      {n}
                    </p>
                    <p className="mt-1 text-[10px] tracking-wider uppercase opacity-45">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-2 border-t pt-6" style={{ borderColor: `${paper}20` }}>
                {p.morningBrief.attention.map((a) => (
                  <p key={a.text} className="text-sm text-white/75">
                    <span style={{ color: brass }}>
                      {a.level === "red" ? "●" : a.level === "orange" ? "◐" : "○"}
                    </span>{" "}
                    {a.text}
                  </p>
                ))}
              </div>
              <p className="mt-6 text-sm" style={{ color: brass }}>
                {p.morningBrief.recommendedAction}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stack chips only */}
      <section style={{ background: paper }}>
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
            Wired into
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.stackConnected.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 text-xs"
                style={{ background: `${ink}0c`, border: `1px solid ${ink}14` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline spine — compact */}
      <section style={{ background: `${brass}14` }}>
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">
          <h2 className="text-2xl" style={{ fontFamily: "Georgia, serif" }}>
            How we’d actually start
          </h2>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
            {p.workflowSteps.slice(0, 4).map((step, i) => (
              <div
                key={step}
                className="min-w-[200px] border bg-white/50 p-4 md:min-w-0"
                style={{ borderColor: `${ink}14` }}
              >
                <p className="font-mono text-[10px] opacity-40">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next */}
      <section id="next" style={{ background: paper }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <Reveal>
            {portrait ? (
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portrait}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover object-top"
                  style={{ boxShadow: `0 0 0 2px ${brass}` }}
                />
                <div>
                  <p className="font-medium">{p.recipientName}</p>
                  <p className="text-xs opacity-55">{p.company.tagline}</p>
                </div>
              </div>
            ) : null}
            <p className="mt-8 max-w-md text-sm leading-relaxed opacity-75">
              You’re already the local name. We close the gaps after someone
              raises a hand — so the team sells, not babysits inboxes.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: brass }}>
              Next
            </p>
            <h2 className="mt-3 text-3xl" style={{ fontFamily: "Georgia, serif" }}>
              {p.callPlan?.nextAction || "Next step: 30 minutes"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed opacity-70">
              {p.callPlan?.callGoal}
            </p>
            <ol className="mt-6 space-y-3">
              {(p.callPlan?.afterCall || []).map((n, i) => (
                <li key={n} className="flex gap-3 text-sm opacity-80">
                  <span className="font-mono text-xs opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {n}
                </li>
              ))}
            </ol>
            <a
              href={BOOK_DEMO_URL}
              className="mt-8 inline-flex px-7 py-3.5 text-sm font-medium text-white"
              style={{ background: ink }}
            >
              {p.callPlan?.ctaLabel || "Book 30 minutes"}
            </a>
          </Reveal>
        </div>
        <p className="pb-10 text-center text-[11px] opacity-35">
          LimeDock × {p.company.name} · Expires {expiresLocal}
        </p>
      </section>
    </main>
  );
}
