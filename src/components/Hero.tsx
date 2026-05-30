"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "./motion/Magnetic";
import TiltCard from "./motion/TiltCard";
import RevealWords from "./motion/RevealWords";

const proof = [
  {
    label: "Brand systems",
    metric: "+128%",
    desc: "Brand recall lift",
    color: "bg-signature-peach",
  },
  {
    label: "Web apps",
    metric: "2.4s",
    desc: "Avg. ship cycle",
    color: "bg-signature-mint",
  },
  {
    label: "Product UX",
    metric: "94/100",
    desc: "Lighthouse perf",
    color: "bg-signature-cream",
  },
  {
    label: "Growth loops",
    metric: "3.6×",
    desc: "Conversion lift",
    color: "bg-signature-yellow",
  },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yCards = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const yEyebrow = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={ref}
      className="relative bg-canvas pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden"
    >
      {/* Quiet atmospheric grid + signature gradient halo behind type */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-x-0 top-0 h-[560px] opacity-[0.55]"
          style={{
            background:
              "radial-gradient(60% 60% at 70% 0%, rgba(252,171,121,0.30), transparent 60%), radial-gradient(50% 60% at 10% 20%, rgba(168,216,196,0.28), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(24,29,38,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,29,38,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="container-air relative">
        <div className="max-w-[920px]">
          <motion.div
            style={{ y: yEyebrow }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="eyebrow mb-7 inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas/70 backdrop-blur px-3 py-1.5"
          >
            <span className="dot" />
            <span>Senior design and product engineering studio</span>
            <span className="hidden sm:inline-block w-px h-3.5 bg-hairline mx-1" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-ink">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-60" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Booking · Q3
            </span>
          </motion.div>

          <h1 className="text-display-lg text-ink max-w-[760px] overflow-hidden">
            <RevealWords
              text="We help ambitious teams build sharper brands, better products, and websites that turn attention into action."
              highlightIndices={[6, 9, 13]}
              highlightClassName="text-ink/55"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.55,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="mt-6 max-w-[590px] text-label-md text-body leading-[1.45]"
          >
            LimeDock works end-to-end or alongside your in-house team: strategy,
            design, development, launch, and iteration in one calm operating
            rhythm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.7,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="mt-9 flex flex-col sm:flex-row gap-3 max-w-md sm:max-w-none"
          >
            <Magnetic strength={14}>
              <a
                href="https://cal.com/limedock-admin-nb05ck/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10">Sign up for a project sprint</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="absolute inset-0 -z-0 translate-y-full bg-signature-coral transition-transform duration-500 ease-out group-hover:translate-y-0"
                  aria-hidden
                />
              </a>
            </Magnetic>
            <Magnetic strength={10}>
              <a href="#work" className="btn-secondary group">
                See how we work
                <span
                  className="ml-1 inline-block h-2 w-2 rounded-full bg-ink/40 transition-all duration-300 group-hover:bg-signature-coral group-hover:scale-125"
                  aria-hidden
                />
              </a>
            </Magnetic>
          </motion.div>

          {/* Live activity ribbon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 flex items-center gap-3 text-caption text-muted"
          >
            <span className="flex -space-x-2">
              {[
                "/ranjeet-profile-pic.jpeg",
                "/dipit-profile-pic.jpeg",
                "/aman-profile-pic.jpeg",
              ].map((src) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-7 w-7 rounded-full border-2 border-canvas object-cover"
                />
              ))}
            </span>
            <span>
              Trusted by 40+ founders shipping from seed to Series A
            </span>
          </motion.div>
        </div>

        {/* Proof cards with tilt + scroll parallax + scan-line on hover */}
        <motion.div
          style={{ y: yCards }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.85,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {proof.map((item, index) => (
            <TiltCard
              key={item.label}
              className="group rounded-[10px]"
              max={6}
              spotlight
            >
              <div
                className={`demo-card card-luminous min-h-[170px] md:min-h-[200px] relative ${item.color}`}
              >
                {/* Scan-line sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan z-[2]"
                />
                <div className="flex items-center justify-between text-caption text-ink/70">
                  <span>0{index + 1}</span>
                  <span className="h-2 w-2 rounded-full bg-ink/45 transition-transform duration-300 group-hover:scale-150 group-hover:bg-ink" />
                </div>
                <div className="mt-7 md:mt-10 text-title-md text-ink max-w-[14ch]">
                  {item.label}
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <span className="text-display-md text-ink">{item.metric}</span>
                  <span className="text-caption text-ink/70 pb-2 text-right max-w-[14ch]">
                    {item.desc}
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Subtle scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12 flex items-center gap-3 text-caption text-muted justify-start"
        >
          <span className="h-px w-10 bg-hairline" />
          <span>Scroll to inspect</span>
        </motion.div>
      </div>
    </section>
  );
}
