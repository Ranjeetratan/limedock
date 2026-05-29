"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center w-full bg-canvas overflow-hidden pt-40 md:pt-48 pb-24 md:pb-32">
      {/* Atmospheric backdrop — not a section gradient, a glow halo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full aurora-violet animate-aurora" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-7"
        >
          <span className="eyebrow">
            <span className="dot" />
            <span className="text-ink-muted">Now booking Q3 — 2 slots left</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-display-xl text-ink mx-auto max-w-[1000px]"
        >
          Design, build & ship
          <br />
          products founders<br className="hidden md:block" />{" "}
          <span className="text-ink-muted">actually grow with.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-subhead text-ink-muted max-w-2xl mx-auto mt-7"
        >
          LimeDock is a senior product studio. End-to-end execution, or embedded
          inside your team — whichever moves you faster.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://cal.com/limedock-admin-nb05ck/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book an intro call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M17 7H8M17 7V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#work" className="btn-secondary">
            See recent work
          </a>
        </motion.div>

        {/* Trust signal — avatar pile + caption */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[
              { src: "/ranjeet-profile-pic.jpeg", alt: "Ranjeet" },
              { src: "/dipit-profile-pic.jpeg", alt: "Dipit" },
              { src: "/aman-profile-pic.jpeg", alt: "Aman" },
            ].map((p) => (
              <div
                key={p.src}
                className="w-8 h-8 rounded-full border-2 border-canvas overflow-hidden bg-surface-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-caption text-ink-muted">
            Trusted by 40+ founders building from seed to Series A
          </p>
        </motion.div>
      </div>
    </section>
  );
}
