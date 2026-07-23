"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Hero chat panel. A Slack-style feed where a LimeDock bot posts the
 * status of the workflows we automate for the client. The message list
 * rotates every few seconds so the panel reads as a live, always-on
 * automation feed — the concrete thing a founder actually gets, not an
 * abstract "workflow loop" diagram.
 */

type BotMessage = {
  id: string;
  time: string;
  title: string;
  body: string;
  actions?: string[];
  /** Tone accent shown on the left of the message card */
  tone?: "default" | "alert" | "win";
};

const FEED: BotMessage[] = [
  {
    id: "digest",
    time: "Mon · 8:02 am",
    title: "Weekly digest",
    body: "Signups +12% WoW · MRR +$4.2k · 3 demos booked. Marketing led on content; sales followed up on 92% within 4 hours.",
    actions: ["Open report", "Draft follow-up"],
    tone: "win",
  },
  {
    id: "outreach",
    time: "Tue · 10:14 am",
    title: "Outreach dispatched",
    body: "12 leads opened your Monday email 3× in 48h. Personalised follow-up sequences went out to each, tuned by role.",
    actions: ["Review sequences"],
  },
  {
    id: "content",
    time: "Wed · 9:03 am",
    title: "Content ready to ship",
    body: "LinkedIn post drafted from Monday's product update. Attribution wiring standing by for the 3 channels you use.",
    actions: ["Ship now", "Edit draft"],
  },
  {
    id: "stalled",
    time: "Thu · 11:20 am",
    title: "Deal stalled — nudge?",
    body: "Acme ($32k ARR) hasn't moved in 8 days. Drafted a nudge using their last CS ticket as context.",
    actions: ["Send nudge", "Reassign"],
    tone: "alert",
  },
  {
    id: "signup",
    time: "Thu · 3:45 pm",
    title: "High-intent signup",
    body: "david@notion.so hit /pricing 4× in 20 minutes. Meeting slot proposed and reserved on your calendar.",
    actions: ["Confirm slot"],
    tone: "win",
  },
  {
    id: "recruit",
    time: "Fri · 8:15 am",
    title: "Recruiting update",
    body: "2 senior FE candidates responded overnight. Screener rewritten from last quarter's hits — ready to send.",
    actions: ["Open pipeline"],
  },
];

const VISIBLE = 3;
const CYCLE_MS = 4200;

export default function HeroSlack() {
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
        {/* Slack-style header */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-soft px-4 py-3">
          <div className="flex items-center gap-2 text-caption text-muted">
            <span className="inline-flex h-6 w-6 rounded-md bg-signature-coral text-white grid place-items-center text-caption font-medium">
              LD
            </span>
            <span className="text-ink text-body-md font-medium">#growth</span>
            <span className="text-muted">· LimeDock workspace</span>
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
                key={`${msg.id}-${offset}-${msg.id === messages[0].id ? "top" : ""}`}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="flex items-start gap-3"
              >
                <div className="h-9 w-9 rounded-md bg-signature-coral grid place-items-center text-white text-caption font-medium shrink-0">
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

        {/* Typing indicator — the always-on "next update is coming" footer */}
        <div className="border-t border-hairline bg-canvas px-4 py-3 flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-signature-coral/20 grid place-items-center text-[10px] text-signature-coral font-medium">
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
            LimeDock is scanning your CRM for the next update…
          </div>
        </div>
      </div>
    </div>
  );
}
