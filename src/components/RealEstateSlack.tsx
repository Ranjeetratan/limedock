"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Real-estate themed workflow feed — shows the exact automations
 * LimeDock ships for brokerages: lead routing, showing feedback,
 * nurture nudges, and agent digests posting into a Slack channel.
 */

type BotMessage = {
  id: string;
  time: string;
  title: string;
  body: string;
  actions?: string[];
  tone?: "default" | "alert" | "win";
};

const FEED: BotMessage[] = [
  {
    id: "lead",
    time: "Today · 9:04 am",
    title: "New portal lead — assigned",
    body: "Zillow inquiry on 14 Maple Ave ($895k). Routed to Sarah Chen · first-touch drafted · CRM contact created. Response time: 3 min.",
    actions: ["Send reply", "View lead"],
    tone: "win",
  },
  {
    id: "showing",
    time: "Today · 11:32 am",
    title: "Showing feedback captured",
    body: "Marcus logged post-showing notes for 22 Birchwood Dr. Buyer rated 8/10 — hot signal. Seller summary sent. CRM updated.",
    actions: ["View feedback", "Follow up"],
    tone: "win",
  },
  {
    id: "stalled",
    time: "Today · 2:15 pm",
    title: "Stalled listing — nudge ready",
    body: "7 Oak St has had 3 showings, zero follow-up in 9 days. Personalized nudge drafted for each buyer agent. Ready to dispatch.",
    actions: ["Send nudges", "Dismiss"],
    tone: "alert",
  },
  {
    id: "nurture",
    time: "Today · 3:48 pm",
    title: "Nurture sequence triggered",
    body: "12 open-house visitors from Saturday. Stage-aware follow-up sequence started — price alerts, similar listings, and check-in at day 3.",
    actions: ["Review sequence"],
  },
  {
    id: "digest",
    time: "Mon · 8:01 am",
    title: "Agent digest — weekly",
    body: "Team: 18 active leads · 4 stalled listings · 6 unanswered follow-ups. Top closer: Marcus (3 contracts). Response avg: 6 min.",
    actions: ["Open full report"],
    tone: "win",
  },
  {
    id: "review",
    time: "Fri · 10:20 am",
    title: "Review request sent",
    body: "Post-close sequence triggered for the Johnsons (48 River Rd). Google review link sent + referral intro template ready.",
    actions: ["View template"],
  },
];

const VISIBLE = 3;
const CYCLE_MS = 4200;

export default function RealEstateSlack() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setOffset((o) => (o + 1) % FEED.length),
      CYCLE_MS
    );
    return () => clearInterval(id);
  }, []);

  const messages = Array.from(
    { length: VISIBLE },
    (_, i) => FEED[(offset + i) % FEED.length]
  );

  return (
    <div className="w-full max-w-[520px] mx-auto lg:mx-0">
      <div className="relative rounded-xl bg-canvas soft-hairline overflow-hidden shadow-[0_24px_60px_-30px_rgba(24,29,38,0.25)]">
        {/* Slack-style header */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-soft px-4 py-3">
          <div className="flex items-center gap-2 text-caption text-muted">
            <span className="inline-flex h-6 w-6 rounded-md bg-signature-coral items-center justify-center text-white text-caption font-medium">
              LD
            </span>
            <span className="text-ink text-body-md font-medium">
              #real-estate-ops
            </span>
            <span className="text-muted">· LimeDock</span>
          </div>
          <div className="flex items-center gap-1.5 text-caption text-muted">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-60" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            live
          </div>
        </div>

        {/* Feed */}
        <div className="p-4 space-y-3 min-h-[420px] relative">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={`${msg.id}-${offset}`}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="flex items-start gap-3"
              >
                <div className="h-9 w-9 rounded-md bg-signature-coral flex items-center justify-center text-white text-caption font-medium shrink-0">
                  LD
                </div>
                <div
                  className={`flex-1 min-w-0 rounded-md soft-hairline p-3 ${
                    msg.tone === "win"
                      ? "bg-signature-mint/40"
                      : msg.tone === "alert"
                        ? "bg-signature-peach/40"
                        : "bg-canvas"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-body-md text-ink font-medium">
                      LimeDock
                    </span>
                    <span className="rounded-sm bg-ink/10 px-1 py-0 text-[10px] text-muted font-mono uppercase tracking-wider">
                      bot
                    </span>
                    <span className="text-caption text-muted">{msg.time}</span>
                  </div>
                  <div className="text-body-md text-ink font-medium mt-2">
                    {msg.title}
                  </div>
                  <p className="text-body-md text-body mt-1 leading-[1.5]">
                    {msg.body}
                  </p>
                  {msg.actions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actions.map((a) => (
                        <span
                          key={a}
                          className="rounded border border-hairline bg-canvas px-2.5 py-1 text-caption text-ink"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer — always-on typing indicator */}
        <div className="border-t border-hairline bg-canvas px-4 py-3 flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-signature-coral/20 flex items-center justify-center text-[10px] text-signature-coral font-medium">
            LD
          </div>
          <div className="flex items-center gap-2 text-caption text-muted">
            <span className="flex gap-1" aria-hidden>
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-ink/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
            Scanning CRM for the next action…
          </div>
        </div>
      </div>
    </div>
  );
}
