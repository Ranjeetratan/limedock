"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    label: "Align",
    title: "We turn the fuzzy brief into an execution map.",
    copy:
      "Goals, audience, constraints, launch window, and success metrics get compressed into a crisp first sprint.",
    image: "/align1.png",
    tone: "bg-signature-mint",
  },
  {
    label: "Create",
    title: "Design and build move in the same room.",
    copy:
      "Every week has visible output: screens, prototypes, shipped code, content, and the decisions behind them.",
    image: "/align-step2.png",
    tone: "bg-signature-peach",
  },
  {
    label: "Grow",
    title: "Launch becomes the start of the learning loop.",
    copy:
      "We refine the funnel, measure behavior, document systems, and leave your team with momentum.",
    image: "/Align-step3.png",
    tone: "bg-signature-yellow",
  },
];

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="section-air bg-canvas"
    >
      <div className="container-air">
        <div className="rounded-lg bg-signature-cream p-6 md:p-12 overflow-hidden relative">
          {/* slow drifting halo */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(252,171,121,0.55), transparent 70%)",
            }}
          />

          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-16 relative">
            <div className="lg:sticky lg:top-28 h-fit">
              <span className="eyebrow">
                <span className="dot" />
                Process
              </span>
              <h2 className="text-display-md text-ink mt-7 max-w-md">
                A three-step operating loop, tuned for speed without chaos.
              </h2>
              <p className="text-body-md text-body mt-5 leading-[1.55] max-w-sm">
                The trick is not more meetings. It is making progress visible
                enough that decisions arrive when they are needed.
              </p>

              {/* Scroll-coupled progress bar */}
              <div className="mt-10 relative">
                <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
                  <motion.div
                    style={{ width: progress }}
                    className="h-full rounded-full bg-ink"
                  />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-caption text-muted">
                  {steps.map((s) => (
                    <span key={s.label} className="text-center">
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {steps.map((step, index) => (
                <motion.article
                  key={step.label}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.58, delay: index * 0.06 }}
                  className="cream-callout-card rounded-md bg-canvas soft-hairline p-5 md:p-6 grid md:grid-cols-[220px_1fr] gap-6 items-center group hover:shadow-[0_18px_45px_rgba(24,29,38,0.08)] transition-shadow"
                >
                  <div
                    className={`relative aspect-[4/3] rounded-md overflow-hidden card-luminous ${step.tone} transition-transform duration-500 group-hover:scale-[1.02]`}
                  >
                    <Image
                      src={step.image}
                      alt={step.label}
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className={`object-contain p-5 ${
                        index === 2 ? "object-bottom p-0 pt-4" : ""
                      } transition-transform duration-700 group-hover:scale-[1.04]`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-caption text-muted tabular-nums">
                        0{index + 1}
                      </span>
                      <span className="text-caption text-link inline-flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-link" />
                        {step.label}
                      </span>
                    </div>
                    <h3 className="text-title-lg text-ink mt-4 max-w-xl">
                      {step.title}
                    </h3>
                    <p className="text-body-md text-body mt-3 leading-[1.55] max-w-xl">
                      {step.copy}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
