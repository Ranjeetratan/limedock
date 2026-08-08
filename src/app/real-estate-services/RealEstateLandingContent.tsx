"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
    line: "Zillow lead. 3h 42m. No response.",
    sub: "Speed-to-lead",
    img: "/images/real-estate/hero.jpg",
    overlay: "rgba(10,46,14,0.72)",
  },
  {
    line: "Showing feedback? Three unanswered texts.",
    sub: "Showing follow-up",
    img: "/images/real-estate/interior.jpg",
    overlay: "rgba(170,45,0,0.65)",
  },
  {
    line: "Open house, 14 visitors. 0 follow-ups sent.",
    sub: "Nurture sequences",
    img: "/images/real-estate/hero.jpg",
    overlay: "rgba(24,29,38,0.75)",
  },
  {
    line: "Listing stale 11 days. No price-drop alert sent.",
    sub: "Listing automation",
    img: "/images/real-estate/interior.jpg",
    overlay: "rgba(252,171,121,0.25)",
  },
  {
    line: "Deal closed. Review never asked for.",
    sub: "Referral capture",
    img: "/images/real-estate/agent-desk.jpg",
    overlay: "rgba(10,46,14,0.68)",
  },
  {
    line: "Monday digest. Built by hand. Every week.",
    sub: "Agent accountability",
    img: "/images/real-estate/interior.jpg",
    overlay: "rgba(24,29,38,0.72)",
  },
];

const workflows = [
  {
    num: "01",
    title: "Portal Lead → Slack + CRM in 60 seconds",
    desc: "Inbound lead from Zillow, Realtor.com, or your site auto-creates a CRM contact, assigns the right agent, and posts a drafted first-touch in Slack.",
    trigger: "Trigger: portal webhook",
    img: "/images/real-estate/hero.jpg",
  },
  {
    num: "02",
    title: "Stage-aware listing nurture",
    desc: "Buyer and seller sequences that fire on MLS status changes — new listing, price reduction, open house, under contract. No manual list management.",
    trigger: "Trigger: MLS status change",
    img: "/images/real-estate/listing.jpg",
  },
  {
    num: "03",
    title: "Showing feedback loop",
    desc: "Post-showing nudge to the buyer agent → structured notes → summary to seller → CRM updated. The full loop, automated.",
    trigger: "Trigger: showing window end",
    img: "/images/real-estate/open-house.jpg",
  },
  {
    num: "04",
    title: "Agent coordination digest",
    desc: "Daily Slack digest of open leads, stalled listings, and unanswered follow-ups. Your team lead sees what's leaking before the week gets loud.",
    trigger: "Trigger: cron 8:00 AM",
    img: "/images/real-estate/agent-desk.jpg",
  },
  {
    num: "05",
    title: "Post-close review & referral capture",
    desc: "Closing triggers a multi-touch sequence: Google/Zillow review request, video testimonial link, and a referral intro template — all on schedule.",
    trigger: "Trigger: deal close date",
    img: "/images/real-estate/closing.jpg",
  },
  {
    num: "06",
    title: "Real-time attribution dashboard",
    desc: "Track which sources close, which agents convert, and what your marketing ROI actually is — live, without rebuilding a spreadsheet every week.",
    trigger: "Trigger: live event stream",
    img: "/images/real-estate/interior.jpg",
  },
];


const befores = [
  ["Portal leads wait in a shared inbox", "Leads route to the right agent in < 60s"],
  ["Showing feedback lives in iMessage threads", "Feedback captured, summarized, sent to seller automatically"],
  ["Nurture stops when the market gets loud", "Stage-aware sequences run regardless of how busy it gets"],
  ["Team lead compiles digest on Sunday night", "Digest lands in Slack every Monday at 8am"],
  ["Closed deal, no review asked for", "Post-close sequence fires on closing date, every time"],
  ["No idea which agent responded in time", "Response times tracked, visible, actionable"],
];

export default function RealEstateLandingContent() {
  return (
    <div>
      {/* ── SECTION 1: HERO — full-bleed property photo ── */}
      <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
        {/* Background photo */}
        <img
          src="/images/real-estate/hero.jpg"
          alt="Luxury property"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,14,20,0.92) 0%, rgba(10,14,20,0.55) 50%, rgba(10,14,20,0.25) 100%)",
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
            Workflow automation for real estate brokerages
          </span>

          <h1
            className="text-white max-w-3xl leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", fontWeight: 600 }}
          >
            We build the automation layer your real estate brokerage is missing.
          </h1>

          <p className="text-white/70 mt-6 text-lg max-w-xl leading-[1.65]">
            LimeDock designs and deploys custom, owned workflow systems for real estate teams — portal lead routing, showing feedback loops, MLS-triggered listing nurture, agent coordination digests, and post-close review capture. Everything wired into your Slack, CRM, and listing tools. You own the code, forever.
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

      {/* ── SECTION 2: YOUR MONDAY MORNING — editorial story ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#f9f4ec" }}>
        <div className="container-air">
          <motion.div {...fadeUp} className="max-w-xl mb-14">
            <span className="eyebrow">
              <span className="dot !bg-signature-coral" />
              A founder's Monday
            </span>
            <h2 className="text-display-md text-ink mt-5">
              Here's what a typical Monday looks like without automation.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
            <div className="space-y-12">
              {/* Scene 1 */}
              <motion.div {...fadeUp} className="border-l-2 border-signature-coral pl-7">
                <p className="text-caption font-mono text-muted tracking-widest">9:02 AM</p>
                <p className="text-title-sm text-ink mt-2 mb-3">The inbox is already behind.</p>
                <p className="text-body-md text-body leading-[1.65]">
                  Three Zillow leads came in overnight. They're sitting in a shared Gmail with no owner. 
                  Your top agent is on a showing. Someone will get to them — probably after lunch. 
                  The competing brokerage responded at 8:47am. They'll take two of those three.
                </p>
              </motion.div>

              {/* Scene 2 */}
              <motion.div {...fadeUp} className="border-l-2 border-signature-peach pl-7">
                <p className="text-caption font-mono text-muted tracking-widest">1:17 PM</p>
                <p className="text-title-sm text-ink mt-2 mb-3">The showing happened. Now what?</p>
                <p className="text-body-md text-body leading-[1.65]">
                  Marcus did the showing at 22 Birchwood. The buyer seemed interested. But feedback? 
                  It's in Marcus's texts, maybe. The seller calls you at 1pm asking how it went. 
                  You text Marcus. He's between showings. You'll try again tonight.
                </p>
              </motion.div>

              {/* Scene 3 */}
              <motion.div {...fadeUp} className="border-l-2 border-hairline pl-7">
                <p className="text-caption font-mono text-muted tracking-widest">5:44 PM</p>
                <p className="text-title-sm text-ink mt-2 mb-3">The week slipped through again.</p>
                <p className="text-body-md text-body leading-[1.65]">
                  You pull up the CRM to see who followed up on what. Half the leads have no activity. 
                  Two listings have been stale for 9 days. Saturday's open house had 14 visitors. 
                  Zero follow-up emails went out. You'll build a digest this weekend. You said that last weekend too.
                </p>
              </motion.div>

              {/* Pull quote */}
              <motion.blockquote
                {...fadeUp}
                className="border-l-4 border-ink pl-6 py-2"
              >
                <p
                  className="text-ink leading-[1.4] italic"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", fontWeight: 500 }}
                >
                  "The market moves in minutes. Your inbox takes hours."
                </p>
              </motion.blockquote>
            </div>

            {/* Photo accent */}
            <motion.div
              {...fadeUp}
              className="hidden lg:block sticky top-28"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src="/images/real-estate/agent-desk.jpg"
                  alt="Real estate agent at work"
                  className="w-full h-full object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(10,14,20,0.5) 0%, transparent 60%)" }}
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
      <section className="py-24 md:py-32 bg-ink overflow-hidden">
        <div className="container-air">
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <span className="eyebrow !text-white/60">
              <span className="dot !bg-white" />
              The 6 moments you lose a deal
            </span>
            <h2 className="text-display-md text-white mt-5">
              Every week. Same leaks. Different deals.
            </h2>
            <p className="text-white/60 text-body-md mt-4 leading-[1.55] max-w-lg">
              These aren't edge cases. They're Monday through Friday at every brokerage running without automation.
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
                <img
                  src={pain.img}
                  alt={pain.sub}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
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
              <span className="dot !bg-signature-forest" />
              The transformation
            </span>
            <h2 className="text-display-md text-ink mt-5">
              What changes when your brokerage runs on owned automation.
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
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-signature-coral shrink-0" />
                    <p className="text-body-md text-body leading-[1.5]">{before}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* After column */}
            <div className="p-8 md:p-10" style={{ backgroundColor: "#f0f7f3" }}>
              <p className="text-caption font-mono tracking-widest mb-8" style={{ color: "#0a2e0e" }}>
                WITH LIMEDOCK
              </p>
              <ul className="space-y-7">
                {befores.map(([, after]) => (
                  <li key={after} className="flex items-start gap-4">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: "#0a2e0e" }} />
                    <p className="text-body-md leading-[1.5]" style={{ color: "#0a2e0e" }}>{after}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: WORKFLOWS — vertical numbered timeline ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#f9f4ec" }}>
        <div className="container-air">
          <motion.div {...fadeUp} className="max-w-xl mb-20">
            <span className="eyebrow">
              <span className="dot !bg-signature-coral" />
              The automations
            </span>
            <h2 className="text-display-md text-ink mt-5">
              Pick the workflow losing you the most leads.
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
                    style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "rgba(24,29,38,0.12)", fontWeight: 700 }}
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
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_-20px_rgba(24,29,38,0.18)]">
                    <img
                      src={wf.img}
                      alt={wf.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(135deg, rgba(10,46,14,0.15) 0%, transparent 60%)" }}
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
        <img
          src="/images/real-estate/interior.jpg"
          alt="Modern property interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,14,20,0.88) 0%, rgba(10,14,20,0.55) 60%, rgba(10,14,20,0.3) 100%)" }}
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
              Map one workflow losing you leads.{" "}
              <span className="text-white/60">30 minutes.</span>
            </h2>
            <p className="text-white/65 mt-5 text-lg leading-[1.55] max-w-lg">
              Bring your lead response, listing follow-up, or showing feedback. We'll sketch the fastest path to a live automation your brokerage owns.
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
