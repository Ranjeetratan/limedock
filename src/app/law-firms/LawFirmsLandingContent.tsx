"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BOOK_DEMO_URL } from "@/lib/site";

const EASE = [0.2, 0.8, 0.2, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, margin: "-80px" },
  transition: { duration: 0.65, ease: EASE },
};

const pains = [
  {
    line: "New-matter intake. Missing 3 fields. 4 emails to fix it.",
    sub: "Intake Friction",
    img: "/images/law-firms/courthouse.jpg",
    overlay: "rgba(22, 32, 45, 0.75)", // Deep navy/slate
  },
  {
    line: "Client status update. 45 minutes of associate archaeology.",
    sub: "Client Communication",
    img: "/images/law-firms/associate.jpg",
    overlay: "rgba(45, 55, 72, 0.65)", // Slate
  },
  {
    line: "Referral sent. Thank you forgotten. Pipeline blind.",
    sub: "Business Development",
    img: "/images/law-firms/handshake.jpg",
    overlay: "rgba(15, 23, 42, 0.8)", // Darkest slate
  },
  {
    line: "Outstanding documents. Nudge delayed until the deadline.",
    sub: "Matter Follow-up",
    img: "/images/law-firms/documents.jpg",
    overlay: "rgba(71, 85, 105, 0.4)", // Lighter slate
  },
  {
    line: "Partner meeting. CRM pipeline is 3 weeks out of date.",
    sub: "Firm Visibility",
    img: "/images/law-firms/lobby.jpg",
    overlay: "rgba(22, 32, 45, 0.75)",
  },
  {
    line: "Monthly newsletter. Built by hand by a senior associate.",
    sub: "Marketing Ops",
    img: "/images/law-firms/stairs.jpg",
    overlay: "rgba(15, 23, 42, 0.7)",
  },
];

const workflows = [
  {
    num: "01",
    title: "Intake → CRM matter + Slack channel",
    desc: "Web form or email inquiry becomes a structured matter record, triggers a missing-field chase, and opens a dedicated Slack thread for the team.",
    trigger: "Trigger: new intake form",
    img: "/images/law-firms/gavel.jpg",
  },
  {
    num: "02",
    title: "Matter follow-up sequences",
    desc: "Outstanding docs, conflict checks, and engagement-letter reminders fire on schedule with clear owners in Slack.",
    trigger: "Trigger: status change",
    img: "/images/law-firms/briefcase.jpg",
  },
  {
    num: "03",
    title: "Client status digests",
    desc: "Weekly or on-demand summaries generated from CRM and calendar so client updates don’t require a full matter archaeology session.",
    trigger: "Trigger: weekly cron / slash command",
    img: "/images/law-firms/library.jpg",
  },
  {
    num: "04",
    title: "Referral tracking loop",
    desc: "Capture the source, auto-draft a thank you to the referrer, schedule a BD follow-up, and report on which relationships actually convert.",
    trigger: "Trigger: matter won",
    img: "/images/law-firms/meeting.jpg",
  },
];

const befores = [
  ["Intake forms sit as PDFs in a shared inbox", "Intake auto-creates CRM matters and notifies the team in Slack"],
  ["Associates dig through emails to update clients", "Client status digests are generated automatically from case data"],
  ["Matter follow-ups depend on calendar reminders", "Automated sequences chase missing documents and engagement letters"],
  ["Referrals are tracked in a partner's personal spreadsheet", "Referral sources are logged, tracked, and thanked systematically"],
  ["Marketing ops steal billable hours from associates", "Newsletters, event lists, and CRM hygiene run on autopilot"],
];

export default function LawFirmsLandingContent() {
  return (
    <div>
      {/* ── SECTION 1: HERO — full-bleed boardroom photo ── */}
      <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
        {/* Background photo */}
        <Image src="/images/law-firms/hero.jpg" alt="Luxury modern law firm boardroom" fill priority sizes="100vw" className="object-cover object-center" />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.3) 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="container-air relative z-10"
        >
          <span className="inline-flex items-center gap-2 text-caption text-white/60 tracking-[0.06em] uppercase mb-6">
            <span className="h-px w-8 bg-white/40" />
            Workflow automation for law firms
          </span>

          <h1
            className="text-white max-w-3xl leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", fontWeight: 600 }}
          >
            We build the automation layer your law firm is missing.
          </h1>

          <p className="text-white/70 mt-6 text-lg max-w-xl leading-[1.65]">
            LimeDock designs and deploys custom, owned workflow systems for law firms — automated intake, client updates, matter follow-ups, and referral tracking. Wired into your Slack, CRM, and practice management tools. You own the code, forever.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a workflow call
            </a>
            <Link
              href="/"
              className="text-white/60 hover:text-white text-body-md transition-colors"
            >
              See how LimeDock works →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2: YOUR TUESDAY MORNING — editorial story ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container-air">
          <motion.div {...fadeUp} className="max-w-xl mb-14">
            <span className="eyebrow" style={{ color: "#334155" }}>
              <span className="dot" style={{ backgroundColor: "#0f172a" }} />
              A Partner's Tuesday
            </span>
            <h2 className="text-display-md text-ink mt-5">
              Here's what a typical Tuesday looks like without automation.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
            <div className="space-y-12">
              {/* Scene 1 */}
              <motion.div {...fadeUp} className="border-l-2 pl-7" style={{ borderColor: "#475569" }}>
                <p className="text-caption font-mono text-muted tracking-widest">9:00 AM</p>
                <p className="text-title-sm text-ink mt-2 mb-3">Intake is stalled.</p>
                <p className="text-body-md text-body leading-[1.65]">
                  A high-value prospect filled out the web form last night. It's sitting in a generic `info@` inbox. The form is missing key details. A paralegal will eventually find it and start an email chain to get the rest of the information. By the time it hits the CRM, it's 3 PM.
                </p>
              </motion.div>

              {/* Scene 2 */}
              <motion.div {...fadeUp} className="border-l-2 pl-7" style={{ borderColor: "#64748b" }}>
                <p className="text-caption font-mono text-muted tracking-widest">1:30 PM</p>
                <p className="text-title-sm text-ink mt-2 mb-3">The client update fire drill.</p>
                <p className="text-body-md text-body leading-[1.65]">
                  A key client calls asking for a status update on their matter. You ping your senior associate. They spend 45 minutes digging through email threads, Slack DMs, and calendar events to piece together a summary. That's 45 minutes of non-billable archaeology.
                </p>
              </motion.div>

              {/* Scene 3 */}
              <motion.div {...fadeUp} className="border-l-2 border-hairline pl-7">
                <p className="text-caption font-mono text-muted tracking-widest">6:00 PM</p>
                <p className="text-title-sm text-ink mt-2 mb-3">The invisible pipeline.</p>
                <p className="text-body-md text-body leading-[1.65]">
                  You successfully closed a matter. The referring attorney is top of mind, but there is no system to trigger a thank you note, track the referral source, or schedule a follow-up lunch. The relationship is left to chance and memory.
                </p>
              </motion.div>

              {/* Pull quote */}
              <motion.blockquote
                {...fadeUp}
                className="border-l-4 pl-6 py-2"
                style={{ borderColor: "#0f172a" }}
              >
                <p
                  className="text-ink leading-[1.4] italic"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", fontWeight: 500 }}
                >
                  "The billable hour is sacred. Your admin overhead is bleeding it dry."
                </p>
              </motion.blockquote>
            </div>

            {/* Photo accent */}
            <motion.div
              {...fadeUp}
              className="hidden lg:block sticky top-28"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image src="/images/law-firms/partner.jpg" alt="Law partner at desk" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover object-center" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-caption font-mono tracking-widest opacity-70">
                    THE REALITY WITHOUT AUTOMATION
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PAIN MOMENTS — photo card grid ── */}
      <section className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="container-air">
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <span className="eyebrow !text-white/60">
              <span className="dot !bg-white" />
              The 6 moments you lose time and trust
            </span>
            <h2 className="text-display-md text-white mt-5">
              Every week. Same leaks. Different matters.
            </h2>
            <p className="text-white/60 text-body-md mt-4 leading-[1.55] max-w-lg">
              These aren't edge cases. They're Monday through Friday at every firm running without automation.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pains.map((pain, i) => (
              <motion.div
                key={pain.line}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative rounded-xl overflow-hidden aspect-[4/3] group"
              >
                <Image src={pain.img} alt={pain.sub} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div
                  className="absolute inset-0"
                  style={{ background: pain.overlay }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-caption font-mono text-white/50 tracking-widest uppercase mb-2">
                    {pain.sub}
                  </p>
                  <p className="text-white font-medium leading-[1.3]" style={{ fontSize: "1.05rem" }}>
                    {pain.line}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: BEFORE / AFTER transformation ── */}
      <section className="py-24 md:py-32 bg-canvas">
        <div className="container-air">
          <motion.div {...fadeUp} className="max-w-xl mb-16">
            <span className="eyebrow">
              <span className="dot" style={{ backgroundColor: "#334155" }} />
              The transformation
            </span>
            <h2 className="text-display-md text-ink mt-5">
              What changes when your firm runs on owned automation.
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-hairline"
          >
            {/* Before column */}
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-hairline bg-canvas">
              <p className="text-caption font-mono text-muted tracking-widest mb-8">WITHOUT LIMEDOCK</p>
              <ul className="space-y-7">
                {befores.map(([before]) => (
                  <li key={before} className="flex items-start gap-4">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: "#94a3b8" }} />
                    <p className="text-body-md text-body leading-[1.5]">{before}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* After column */}
            <div className="p-8 md:p-10" style={{ backgroundColor: "#f1f5f9" }}>
              <p className="text-caption font-mono tracking-widest mb-8" style={{ color: "#0f172a" }}>
                WITH LIMEDOCK
              </p>
              <ul className="space-y-7">
                {befores.map(([, after]) => (
                  <li key={after} className="flex items-start gap-4">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: "#0f172a" }} />
                    <p className="text-body-md leading-[1.5]" style={{ color: "#0f172a" }}>{after}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: WORKFLOWS — vertical numbered timeline ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container-air">
          <motion.div {...fadeUp} className="max-w-xl mb-20">
            <span className="eyebrow" style={{ color: "#334155" }}>
              <span className="dot" style={{ backgroundColor: "#334155" }} />
              The automations
            </span>
            <h2 className="text-display-md text-ink mt-5">
              Pick the workflow costing you the most hours.
            </h2>
            <p className="text-body-md text-body mt-4 leading-[1.55]">
              We ship the first one in 48 hours. Then one every week. You own the code.
            </p>
          </motion.div>

          <div className="space-y-20">
            {workflows.map((wf, i) => (
              <motion.div
                key={wf.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Text side */}
                <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                  <p
                    className="font-mono leading-none mb-5"
                    style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "rgba(15,23,42,0.1)", fontWeight: 700 }}
                  >
                    {wf.num}
                  </p>
                  <h3 className="text-title-lg text-ink leading-[1.25] -mt-4 md:-mt-6">
                    {wf.title}
                  </h3>
                  <p className="text-body-md text-body mt-4 leading-[1.65] max-w-md">
                    {wf.desc}
                  </p>
                  <p className="text-caption font-mono text-muted mt-5 tracking-widest">
                    {wf.trigger}
                  </p>
                </div>

                {/* Photo side */}
                <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)]">
                    <Image src={wf.img} alt={wf.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.15) 0%, transparent 60%)" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CLOSING CTA — full-bleed photo ── */}
      <section className="relative py-32 md:py-44 overflow-hidden flex items-center">
        <Image src="/images/law-firms/team.jpg" alt="Law team walking" fill sizes="100vw" className="object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.6) 60%, rgba(15,23,42,0.3) 100%)" }}
        />

        <motion.div {...fadeUp} className="container-air relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-caption text-white/50 tracking-[0.06em] uppercase mb-6">
              <span className="h-px w-8 bg-white/30" />
              Get started
            </span>
            <h2
              className="text-white leading-[1.15] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 600 }}
            >
              Map one workflow bleeding hours.{" "}
              <span className="text-white/60">30 minutes.</span>
            </h2>
            <p className="text-white/65 mt-5 text-lg leading-[1.55] max-w-lg">
              Bring your intake process, client updates, or referral tracking. We'll sketch the fastest path to a live automation your firm owns.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a workflow call
              </a>
              <span className="text-white/40 text-body-md">
                No pitch. Just your workflow on a whiteboard.
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
