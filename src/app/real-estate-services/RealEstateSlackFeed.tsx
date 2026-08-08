"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type RealEstateFeedMessage = {
  id: string;
  time: string;
  title: string;
  body: string;
  actions?: string[];
  tone?: "default" | "alert" | "win";
};

const FEED: RealEstateFeedMessage[] = [
  {
    id: "portal-lead",
    time: "Mon · 9:02 am",
    title: "Zillow Premier Lead auto-routed",
    body: "Sarah Jenkins ($1.25M Evergreen Terrace) assigned to Alex Rivera in Follow Up Boss. SMS first-touch dispatched (< 45s).",
    actions: ["View CRM contact", "Draft SMS"],
    tone: "win",
  },
  {
    id: "showing-feedback",
    time: "Mon · 2:15 pm",
    title: "Showing feedback captured",
    body: "402 Hillside Dr showing complete. Agent note: 'Loved kitchen, client preparing offer.' Seller digest automatically delivered.",
    actions: ["Open feedback", "Notify seller"],
    tone: "win",
  },
  {
    id: "stalled-listing",
    time: "Tue · 11:30 am",
    title: "Stalled listing alert",
    body: "1840 Oak Ave has 0 showings in 12 days. Price drop alert sequence drafted for 34 past interested buyers.",
    actions: ["Review sequence", "Approve price drop"],
    tone: "alert",
  },
  {
    id: "broker-digest",
    time: "Wed · 8:00 am",
    title: "Weekly brokerage digest",
    body: "Speed-to-lead avg: 1.4 min · 42 leads auto-responded · 18 showing reports logged · 4 contracts signed this week.",
    actions: ["Open analytics", "Agent scoreboard"],
    tone: "win",
  },
  {
    id: "open-house",
    time: "Thu · 4:10 pm",
    title: "Open house follow-up active",
    body: "14 attendees from Sunday open house at 912 Pine St imported to CRM. Personal thank-you drip sequence engaged.",
    actions: ["View roster", "Sequence status"],
    tone: "default",
  },
  {
    id: "post-close",
    time: "Fri · 10:05 am",
    title: "Post-close review loop fired",
    body: "Closing verified for 504 Maple Way. Automated Google & Zillow review request + video testimonial link delivered.",
    actions: ["Check reviews", "Client card"],
    tone: "win",
  },
];

const VISIBLE = 3;
const CYCLE_MS = 4200;

export default function RealEstateSlackFeed() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOffset((o) => (o + 1) % FEED.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const messages = Array.from(
    { length: VISIBLE },
    (_, i) => FEED[(offset + i) % FEED.length]
  );

  return (
    <div className="w-full max-w-[520px] mx-auto lg:mx-0">
      <div className="relative rounded-xl bg-canvas soft-hairline overflow-hidden shadow-[0_24px_60px_-30px_rgba(24,29,38,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-soft px-4 py-3">
          <div className="flex items-center gap-2 text-caption text-muted">
            <span className="inline-flex h-6 w-6 rounded-md bg-signature-coral text-white grid place-items-center text-caption font-medium">
              RE
            </span>
            <span className="text-ink text-body-md font-medium">#real-estate-ops</span>
            <span className="text-muted">· LimeDock engine</span>
          </div>
          <div className="flex items-center gap-1.5 text-caption text-muted">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-60" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            live feed
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
                <div className="h-9 w-9 rounded-md bg-signature-coral grid place-items-center text-white text-caption font-medium shrink-0">
                  RE
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
                      LimeDock Bot
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

        {/* Footer */}
        <div className="border-t border-hairline bg-canvas px-4 py-3 flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-signature-coral/20 grid place-items-center text-[10px] text-signature-coral font-medium">
            RE
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
            LimeDock is scanning MLS & CRM for the next update…
          </div>
        </div>
      </div>
    </div>
  );
}
