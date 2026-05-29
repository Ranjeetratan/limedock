"use client";

import { motion } from "framer-motion";
import Magnetic from "./motion/Magnetic";

const rows = [
  ["Time to start", "Same week", "Weeks of recruiting", "Days of sales calls"],
  ["Team seniority", "Senior-only execution", "Depends on hire", "Depends on staffing"],
  ["Design + dev quality", "Same system, same room", "Often siloed", "Often handoff-heavy"],
  ["Cost profile", "Predictable sprint / retainer", "Salary + benefits", "Scope creep"],
  ["Visibility", "Daily async updates", "Internal rituals", "Status calls"],
  ["Flexibility", "Scale up or pause", "Hard to resize", "Locked by project"],
];

function Check() {
  return (
    <motion.span
      initial={{ scale: 0.3, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="inline-grid h-6 w-6 place-items-center rounded-full bg-success/10 text-success"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}

export default function Comparison() {
  return (
    <section className="section-air bg-canvas">
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="hero-card-dark signature-card bg-surface-dark text-on-dark overflow-hidden relative"
        >
          {/* slow drifting halo on dark card */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(252,171,121,0.6), rgba(244,211,94,0.2) 60%, transparent 80%)",
            }}
          />

          <div className="grid lg:grid-cols-[0.76fr_1.24fr] gap-10 lg:gap-16 relative">
            <div>
              <span className="eyebrow !text-white/75">
                <span className="dot !bg-white" />
                Why LimeDock
              </span>
              <h2 className="text-display-md text-white mt-7 max-w-md">
                The senior team you wish you did not have to hire.
              </h2>
              <p className="text-body-md text-white/75 leading-[1.55] mt-5 max-w-sm">
                A focused alternative to full-time hires and slow agencies:
                fewer handoffs, faster production, clearer ownership.
              </p>
              <Magnetic strength={10} className="inline-block">
                <a
                  href="https://cal.com/limedock-admin-nb05ck/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-on-dark mt-8 group"
                >
                  Book demo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>

              {/* extra trust pills under CTA */}
              <div className="mt-10 flex flex-wrap gap-2 max-w-sm">
                {["No long-term lock-in", "Pause anytime", "Senior-only ICs", "Daily updates"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-caption text-white/80"
                    >
                      {chip}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[720px] rounded-md bg-white text-ink overflow-hidden">
                <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] border-b border-hairline bg-surface-soft">
                  {[
                    "Category",
                    "LimeDock",
                    "Full-time",
                    "Traditional agency",
                  ].map((head) => (
                    <div
                      key={head}
                      className="px-4 py-4 text-caption text-muted"
                    >
                      {head}
                    </div>
                  ))}
                </div>
                {rows.map(([label, us, hire, agency], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                    }}
                    className="grid grid-cols-[1.1fr_1fr_1fr_1fr] border-b border-hairline last:border-0 group hover:bg-surface-soft/70 transition-colors"
                  >
                    <div className="px-4 py-4 text-caption text-muted flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-hairline group-hover:bg-ink transition-colors" />
                      {label}
                    </div>
                    <div className="px-4 py-4 flex gap-3 text-body-md text-ink">
                      <Check />
                      <span className="relative">
                        {us}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink/40 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </div>
                    <div className="px-4 py-4 text-body-md text-body">
                      {hire}
                    </div>
                    <div className="px-4 py-4 text-body-md text-body">
                      {agency}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
