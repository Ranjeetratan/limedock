"use client";

import { motion } from "framer-motion";
import Magnetic from "./motion/Magnetic";
import ParallaxMasonry from "./ParallaxMasonry";
import StartExperienceButton from "./StartExperienceButton";

const projectRows = [
  { name: "Marketing workspace", screens: "12 modules", chip: "Live", tone: "bg-signature-mint" },
  { name: "SDR outreach engine", screens: "8 flows", chip: "In dev", tone: "bg-signature-peach" },
  { name: "Lead scoring model", screens: "custom", chip: "Shipped", tone: "bg-signature-yellow" },
  { name: "Content pipeline", screens: "4 sources", chip: "Optimizing", tone: "bg-signature-cream" },
  { name: "Campaign attribution", screens: "22 signals", chip: "Drafted", tone: "bg-signature-mustard" },
  { name: "Sales assistant", screens: "6 skills", chip: "Iterating", tone: "bg-signature-mint" },
];

export default function ProjectShowcase() {
  return (
    <section id="work" className="section-air bg-canvas overflow-hidden">
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          className="signature-card card-luminous bg-signature-coral text-on-dark overflow-hidden relative"
        >
          {/* drifting highlight ribbon — adds life to the coral surface */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/8 blur-3xl animate-slide-y"
          />

          <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-16 items-start relative">
            <div>
              <span className="eyebrow !text-white/80">
                <span className="dot !bg-white" />
                Selected work
              </span>
              <h2 className="text-display-md mt-7 max-w-xl text-white">
                Custom platforms shipped in weeks, not quarters.
              </h2>
              <p className="text-body-md text-white/84 mt-5 max-w-md leading-[1.55]">
                We turn your marketing or sales workflow into internal
                software your team actually uses — AI-native, integrated,
                and living on infrastructure you own.
              </p>
              <Magnetic strength={10} className="inline-block">
                <a href="#products" className="btn-secondary-on-dark mt-8 group">
                  Explore live products
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Magnetic>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-sm">
                {[
                  ["20+", "SaaS teams"],
                  ["60+", "workflows automated"],
                  ["0", "vendor lock-in"],
                ].map(([n, l]) => (
                  <div
                    key={l}
                    className="rounded-md bg-white/10 border border-white/15 px-3 py-3"
                  >
                    <div className="text-title-md text-white">{n}</div>
                    <div className="text-caption text-white/70 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: expanded Airtable-style mini window — the tile row that
                used to live here moved into the dedicated parallax masonry
                below, so this can breathe at full height. */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="ui-window relative"
            >
              <div className="ui-toolbar">
                <span className="ui-dot" />
                <span className="ui-dot" />
                <span className="ui-dot" />
                <span className="ml-2 text-caption text-muted">release-board.air</span>
                <span className="ml-auto text-caption text-muted hidden sm:inline-flex items-center gap-1.5">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-success/80 animate-ping" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  live
                </span>
              </div>
              <div>
                {projectRows.map((row, idx) => (
                  <motion.div
                    key={row.name}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: 0.25 + idx * 0.07 }}
                    className="ui-row group"
                  >
                    <span className={`h-6 w-6 rounded-full ${row.tone}`} />
                    <span className="text-body-md text-ink flex items-center gap-2">
                      {row.name}
                      <span className="text-caption text-muted rounded-full border border-hairline px-2 py-0.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        {row.chip}
                      </span>
                    </span>
                    <span className="text-caption text-muted text-right tabular-nums">
                      {row.screens}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Full-bleed parallax masonry — solves the "only 3-4 work tiles visible"
          problem by laying out many more works across 5 differently-paced
          columns. */}
      <ParallaxMasonry />

      {/* Launch pad for the fullscreen pan-anywhere canvas */}
      <div className="container-air mt-10 md:mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-label-md text-muted max-w-md">
          Every project, one infinite space. Drag, pan, and zoom your way
          through the work.
        </p>
        <StartExperienceButton
          variant="primary"
          label="View all works · Start experience"
        />
      </div>
    </section>
  );
}
