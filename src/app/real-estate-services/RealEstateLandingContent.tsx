"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/motion/Magnetic";
import RevealWords from "@/components/motion/RevealWords";
import TiltCard from "@/components/motion/TiltCard";
import RealEstateSlackFeed from "./RealEstateSlackFeed";
import RealEstateFlowchart from "./RealEstateFlowchart";
import {
  IconClock,
  IconCalendar,
  IconSpark,
  IconLock,
  IconArrowRight,
  IconSlack,
  IconMerge,
  IconTerminal,
  IconKey,
  IconInfra,
} from "@/components/icons/Icons";
import { BOOK_DEMO_URL } from "@/lib/site";

export default function RealEstateLandingContent() {
  return (
    <div className="space-y-0">
      {/* SECTION 1: HERO */}
      <section className="section-air bg-canvas pt-28 md:pt-36">
        <div className="container-air">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 lg:gap-16 items-center">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                For real estate founders & brokerage leaders
              </span>

              <h1 className="text-display-xl text-ink mt-6 font-medium tracking-tight">
                <RevealWords
                  text="Stop losing portal leads and listing updates to manual inbox hustle."
                  highlightIndices={[2, 3, 7, 8]}
                  highlightClassName="text-signature-coral font-semibold"
                />
              </h1>

              <p className="text-title-md text-body mt-6 leading-[1.55] max-w-xl">
                LimeDock builds custom, owned workflow automations that auto-route Zillow & Realtor.com leads, capture showing feedback, trigger stage-aware listing nurture, and deliver daily agent digests inside Slack & CRM.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={16}>
                  <a
                    href={BOOK_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group inline-flex items-center gap-2"
                  >
                    Book a workflow call
                    <IconArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </Magnetic>

                <Magnetic strength={12}>
                  <a href="#workflows" className="btn-secondary">
                    Explore workflows
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Right-column Slack live feed mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <RealEstateSlackFeed />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PAIN SECTION (DARK CARD TREATMENT) */}
      <section className="section-air bg-canvas" id="pains">
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
                  "radial-gradient(circle, rgba(252,171,121,0.4), transparent 70%)",
              }}
            />

            <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-14 relative">
              <div>
                <span className="eyebrow !text-white/80">
                  <span className="dot !bg-white" />
                  The real estate operations bottleneck
                </span>
                <h2 className="text-display-md text-white mt-7 max-w-md">
                  Speed-to-lead and listing follow-up shouldn&apos;t depend on who remembers to check the board.
                </h2>
                <p className="text-body-md text-white/78 mt-5 leading-[1.55] max-w-md">
                  Generic CRMs offer rigid drip campaigns that agents ignore. Meanwhile, portal leads cold-out in shared inboxes, showing feedback stays locked in iMessage, and listing follow-ups drop when market activity spikes.
                </p>
              </div>

              {/* 7 Visceral Real Estate Pains Grid */}
              <div className="grid sm:grid-cols-2 gap-4 text-ink">
                <div className="card-luminous rounded-xl p-5 bg-signature-cream relative">
                  <div className="text-caption font-mono text-muted">01 · SPEED-TO-LEAD</div>
                  <h3 className="text-title-sm text-ink mt-2 font-medium">Portal Speed-to-Lead Lag</h3>
                  <p className="text-body-md text-body mt-2 leading-[1.5]">
                    Inbound leads from Zillow, Realtor.com, and website forms sit in a shared email inbox while agents manual-assign. Competitors respond in 2 minutes while your team takes 2 hours.
                  </p>
                </div>

                <div className="card-luminous rounded-xl p-5 bg-signature-mint relative">
                  <div className="text-caption font-mono text-muted">02 · LISTING FOLLOW-UP</div>
                  <h3 className="text-title-sm text-ink mt-2 font-medium">Forgotten Listing Follow-Up</h3>
                  <p className="text-body-md text-body mt-2 leading-[1.5]">
                    Price adjustments, open house alerts, and stale inquiry re-engagements depend on memory or whiteboards instead of automated stage triggers.
                  </p>
                </div>

                <div className="card-luminous rounded-xl p-5 bg-signature-peach relative">
                  <div className="text-caption font-mono text-muted">03 · SHOWINGS</div>
                  <h3 className="text-title-sm text-ink mt-2 font-medium">Scattered Showing Feedback</h3>
                  <p className="text-body-md text-body mt-2 leading-[1.5]">
                    Agent feedback after property showings is trapped in personal SMS threads and Slack DMs. Sellers don&apos;t get updates, and listing agents miss hot buyer signals.
                  </p>
                </div>

                <div className="card-luminous rounded-xl p-5 bg-canvas relative">
                  <div className="text-caption font-mono text-muted">04 · NURTURE</div>
                  <h3 className="text-title-sm text-ink mt-2 font-medium">Dead Nurture Sequences</h3>
                  <p className="text-body-md text-body mt-2 leading-[1.5]">
                    Buyer and seller nurture sequences freeze the moment a deal goes into escrow or market volatility surges—leaving past clients and pipeline leads untouched.
                  </p>
                </div>

                <div className="card-luminous rounded-xl p-5 bg-signature-cream relative">
                  <div className="text-caption font-mono text-muted">05 · ACCOUNTABILITY</div>
                  <h3 className="text-title-sm text-ink mt-2 font-medium">Manual Agent Coordination</h3>
                  <p className="text-body-md text-body mt-2 leading-[1.5]">
                    Team leads waste hours every week manually compiling open lead status, stalled listings, and pending follow-ups to keep agents accountable.
                  </p>
                </div>

                <div className="card-luminous rounded-xl p-5 bg-signature-mint relative">
                  <div className="text-caption font-mono text-muted">06 · REVIEWS</div>
                  <h3 className="text-title-sm text-ink mt-2 font-medium">Leaked Post-Close Referrals</h3>
                  <p className="text-body-md text-body mt-2 leading-[1.5]">
                    Zero automated mechanism to convert closed deals into verified Google reviews, client video testimonials, or neighborhood circle marketing.
                  </p>
                </div>

                <div className="card-luminous rounded-xl p-5 bg-signature-peach sm:col-span-2 lg:col-span-2 relative">
                  <div className="text-caption font-mono text-muted">07 · VISIBILITY</div>
                  <h3 className="text-title-sm text-ink mt-2 font-medium">Black-Box Pipeline Visibility</h3>
                  <p className="text-body-md text-body mt-2 leading-[1.5]">
                    Brokerage founders have no real-time visibility into lead response velocity, abandoned inquiries, or agent close-loop metrics until the weekly summary.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: MANUAL VS AUTOMATED FLOWCHART */}
      <RealEstateFlowchart />

      {/* SECTION 4: HOW IT WORKS (3-STEP PROCESS) */}
      <section className="section-air bg-canvas" id="how-it-works">
        <div className="container-air">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="dot" />
              The process
            </span>
            <h2 className="text-display-lg text-ink mt-5">
              How LimeDock builds your brokerage engine
            </h2>
            <p className="text-body-md text-body mt-4 leading-[1.55]">
              From auditing lead drop-offs to deploying live automations in Slack & CRM, we ship your system step by step.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="card-luminous rounded-xl p-8 bg-signature-cream relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className="rounded-full bg-ink text-white px-3 py-1 text-caption font-mono inline-block">
                  Step 01
                </span>
                <h3 className="text-title-lg text-ink mt-6 font-medium">
                  Discovery & Workflow Audit
                </h3>
                <p className="text-body-md text-body mt-4 leading-[1.55]">
                  We audit your lead channels (Zillow, Realtor.com, website), CRM (Follow Up Boss, HubSpot), and agent communication tools (Slack/SMS) to map where deals are leaking.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-hairline/60 flex items-center justify-between text-caption text-muted font-mono">
                <span>Auditing lead drop-off</span>
                <span>Week 1</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="card-luminous rounded-xl p-8 bg-signature-mint relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className="rounded-full bg-ink text-white px-3 py-1 text-caption font-mono inline-block">
                  Step 02
                </span>
                <h3 className="text-title-lg text-ink mt-6 font-medium">
                  Custom System Architecture
                </h3>
                <p className="text-body-md text-body mt-4 leading-[1.55]">
                  We engineer custom, dedicated automation pipelines tailored to your brokerage&apos;s routing rules and listing stage triggers—built on code you own 100%.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-hairline/60 flex items-center justify-between text-caption text-muted font-mono">
                <span>Custom API wiring</span>
                <span>Week 2</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="card-luminous rounded-xl p-8 bg-signature-peach relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className="rounded-full bg-ink text-white px-3 py-1 text-caption font-mono inline-block">
                  Step 03
                </span>
                <h3 className="text-title-lg text-ink mt-6 font-medium">
                  Live in Your Stack (48h Cadence)
                </h3>
                <p className="text-body-md text-body mt-4 leading-[1.55]">
                  We deploy directly into your Slack, CRM, and listing infrastructure. Your team gets live alerts and automated loops without learning another SaaS tool.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-hairline/60 flex items-center justify-between text-caption text-muted font-mono">
                <span>Live Slack & CRM launch</span>
                <span>Friday release</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WORKFLOWS SHOWCASE (6 AUTOMATIONS GRID) */}
      <section className="section-air bg-canvas" id="workflows">
        <div className="container-air">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="dot" />
              Real estate automations
            </span>
            <h2 className="text-display-lg text-ink mt-5">
              Pick the workflow losing you the most leads
            </h2>
            <p className="text-body-md text-body mt-4 leading-[1.55]">
              We build and ship these core real estate engines first, then expand to match your brokerage&apos;s custom operating manual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="card-luminous rounded-xl p-6 bg-signature-cream relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-lg bg-canvas text-ink inline-block">
                    <IconSlack size={20} />
                  </span>
                  <span className="text-caption font-mono text-muted bg-canvas/80 px-2 py-0.5 rounded">
                    Speed-to-lead
                  </span>
                </div>
                <h3 className="text-title-sm text-ink mt-5 font-medium">
                  Portal Lead → Instant Slack & CRM Touch
                </h3>
                <p className="text-body-md text-body mt-3 leading-[1.55]">
                  Captures Zillow, Realtor.com & web leads instantly, creates CRM contact, assigns right agent, posts structured alert & drafted response in Slack.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hairline/60 text-caption font-mono text-muted">
                Trigger: New portal webhook · SLA &lt; 60s
              </div>
            </div>

            <div className="card-luminous rounded-xl p-6 bg-signature-mint relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-lg bg-canvas text-ink inline-block">
                    <IconMerge size={20} />
                  </span>
                  <span className="text-caption font-mono text-muted bg-canvas/80 px-2 py-0.5 rounded">
                    Listing retention
                  </span>
                </div>
                <h3 className="text-title-sm text-ink mt-5 font-medium">
                  Stage-Aware Listing Nurture
                </h3>
                <p className="text-body-md text-body mt-3 leading-[1.55]">
                  Automated buyer/seller drip sequences triggered by MLS status changes (new listing, price reduction, open house, under contract).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hairline/60 text-caption font-mono text-muted">
                Trigger: MLS status change · Auto-drip
              </div>
            </div>

            <div className="card-luminous rounded-xl p-6 bg-signature-peach relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-lg bg-canvas text-ink inline-block">
                    <IconClock size={20} />
                  </span>
                  <span className="text-caption font-mono text-muted bg-canvas/80 px-2 py-0.5 rounded">
                    Seller updates
                  </span>
                </div>
                <h3 className="text-title-sm text-ink mt-5 font-medium">
                  Automated Showing Feedback Loop
                </h3>
                <p className="text-body-md text-body mt-3 leading-[1.55]">
                  Post-showing automated SMS/Slack prompt to buyer agents → structured feedback summary sent directly to seller and logged in CRM.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hairline/60 text-caption font-mono text-muted">
                Trigger: Showing window end · SMS prompt
              </div>
            </div>

            <div className="card-luminous rounded-xl p-6 bg-signature-cream relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-lg bg-canvas text-ink inline-block">
                    <IconTerminal size={20} />
                  </span>
                  <span className="text-caption font-mono text-muted bg-canvas/80 px-2 py-0.5 rounded">
                    Operations
                  </span>
                </div>
                <h3 className="text-title-sm text-ink mt-5 font-medium">
                  Agent Coordination & Accountability Digest
                </h3>
                <p className="text-body-md text-body mt-3 leading-[1.55]">
                  Scheduled daily/weekly Slack digests flagging uncontacted leads, overdue listing tasks, and agent response times for brokerage leaders.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hairline/60 text-caption font-mono text-muted">
                Trigger: Cron 8:00 AM · Slack thread
              </div>
            </div>

            <div className="card-luminous rounded-xl p-6 bg-signature-mint relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-lg bg-canvas text-ink inline-block">
                    <IconKey size={20} />
                  </span>
                  <span className="text-caption font-mono text-muted bg-canvas/80 px-2 py-0.5 rounded">
                    Growth
                  </span>
                </div>
                <h3 className="text-title-sm text-ink mt-5 font-medium">
                  Post-Close Review & Referral Capture
                </h3>
                <p className="text-body-md text-body mt-3 leading-[1.55]">
                  Automated sequence triggered upon closing date to request Google/Zillow reviews, referral introductions, and anniversary check-ins.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hairline/60 text-caption font-mono text-muted">
                Trigger: Deal closed date · Multi-touch
              </div>
            </div>

            <div className="card-luminous rounded-xl p-6 bg-signature-peach relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-lg bg-canvas text-ink inline-block">
                    <IconInfra size={20} />
                  </span>
                  <span className="text-caption font-mono text-muted bg-canvas/80 px-2 py-0.5 rounded">
                    Analytics
                  </span>
                </div>
                <h3 className="text-title-sm text-ink mt-5 font-medium">
                  Real-Time Marketing Attribution Dashboard
                </h3>
                <p className="text-body-md text-body mt-3 leading-[1.55]">
                  Tracks source-to-close metrics, agent conversion speed, and marketing ROI live without manual spreadsheet updates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hairline/60 text-caption font-mono text-muted">
                Trigger: Live event stream · Board sync
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROOF / METRICS STRIP (4 TILTCARDS) */}
      <section className="section-air bg-canvas" id="proof">
        <div className="container-air">
          <div className="max-w-xl">
            <span className="eyebrow">
              <span className="dot" />
              Proven metrics
            </span>
            <h2 className="text-display-lg text-ink mt-5">
              Built for speed, owned by your brokerage
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <TiltCard max={8} spotlight className="h-full">
              <div className="card-luminous rounded-xl p-6 bg-signature-cream h-full flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-canvas text-ink">
                      <IconClock size={20} />
                    </span>
                    <span className="text-caption font-mono text-muted">SLA</span>
                  </div>
                  <div className="text-display-lg text-ink font-medium mt-6">
                    &lt; 2 min
                  </div>
                  <div className="text-title-sm text-ink mt-2 font-medium">
                    Speed-to-Lead Response
                  </div>
                  <p className="text-body-md text-body mt-3 leading-[1.5]">
                    Auto-route portal leads &amp; fire first touch in under 120 seconds.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard max={8} spotlight className="h-full">
              <div className="card-luminous rounded-xl p-6 bg-signature-mint h-full flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-canvas text-ink">
                      <IconSpark size={20} />
                    </span>
                    <span className="text-caption font-mono text-muted">SPEED</span>
                  </div>
                  <div className="text-display-lg text-ink font-medium mt-6">
                    48h
                  </div>
                  <div className="text-title-sm text-ink mt-2 font-medium">
                    First Workflow Live
                  </div>
                  <p className="text-body-md text-body mt-3 leading-[1.5]">
                    Your first custom real estate automation running live in your stack.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard max={8} spotlight className="h-full">
              <div className="card-luminous rounded-xl p-6 bg-signature-peach h-full flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-canvas text-ink">
                      <IconCalendar size={20} />
                    </span>
                    <span className="text-caption font-mono text-muted">CADENCE</span>
                  </div>
                  <div className="text-display-lg text-ink font-medium mt-6">
                    Friday
                  </div>
                  <div className="text-title-sm text-ink mt-2 font-medium">
                    Delivery Cadence
                  </div>
                  <p className="text-body-md text-body mt-3 leading-[1.5]">
                    Weekly release cycle — new workflow automations shipped every Friday.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard max={8} spotlight className="h-full">
              <div className="card-luminous rounded-xl p-6 bg-signature-cream h-full flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-canvas text-ink">
                      <IconLock size={20} />
                    </span>
                    <span className="text-caption font-mono text-muted">OWNERSHIP</span>
                  </div>
                  <div className="text-display-lg text-ink font-medium mt-6">
                    100%
                  </div>
                  <div className="text-title-sm text-ink mt-2 font-medium">
                    Code Ownership
                  </div>
                  <p className="text-body-md text-body mt-3 leading-[1.5]">
                    You own the code and workflows. Zero per-seat fees or platform lock-in.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* SECTION 7: CLOSING CTA */}
      <section className="section-air bg-canvas pb-20" id="cta">
        <div className="container-air">
          <div className="rounded-[16px] border border-hairline bg-gradient-to-r from-signature-cream via-canvas to-signature-mint/30 p-8 md:p-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                Get started
              </span>
              <h2 className="text-display-md text-ink mt-3 max-w-xl">
                Ready to stop losing real estate deals to manual follow-up?
              </h2>
              <p className="text-body-md text-body mt-3 max-w-lg leading-[1.55]">
                Map your brokerage&apos;s lead response, listing loops, or showing feedback on a 30-minute workflow call.
              </p>
            </div>

            <Magnetic strength={14} className="shrink-0">
              <a
                href={BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group inline-flex items-center gap-2"
              >
                Book a workflow call
                <IconArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
