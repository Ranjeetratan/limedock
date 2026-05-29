"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./motion/TiltCard";
import Magnetic from "./motion/Magnetic";

const workImages = Array.from({ length: 18 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0");
  return {
    id,
    src: `/placeholder-images/${id}.png`,
    alt: `LimeDock project ${id}`,
  };
});

const loop = [...workImages, ...workImages];

const projectRows = [
  { name: "Launch site", screens: "36 screens", chip: "Live", tone: "bg-signature-mint" },
  { name: "SaaS dashboard", screens: "8 flows", chip: "In dev", tone: "bg-signature-peach" },
  { name: "Brand system", screens: "14 assets", chip: "Shipped", tone: "bg-signature-yellow" },
  { name: "Growth engine", screens: "4 channels", chip: "Optimizing", tone: "bg-signature-cream" },
];

function WorkTile({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const h = index % 3 === 0 ? "h-[246px]" : index % 3 === 1 ? "h-[210px]" : "h-[276px]";
  return (
    <TiltCard className="shrink-0" max={5} spotlight>
      <div
        className={`relative w-[300px] md:w-[384px] overflow-hidden rounded-md bg-canvas soft-hairline ${h}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
          sizes="384px"
          unoptimized
        />
        {/* corner index chip */}
        <span className="absolute top-3 left-3 rounded-full bg-canvas/85 backdrop-blur px-2.5 py-1 text-caption text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </TiltCard>
  );
}

export default function ProjectShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

  return (
    <section
      ref={ref}
      id="work"
      className="section-air bg-canvas overflow-hidden"
    >
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          className="signature-card bg-signature-coral text-on-dark overflow-hidden relative"
        >
          {/* sweeping highlight on the coral card */}
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
                Production apps in prototype speed.
              </h2>
              <p className="text-body-md text-white/84 mt-5 max-w-md leading-[1.55]">
                We turn loose ideas into launchable systems: brand, website,
                interface, content, and the connective tissue between them.
              </p>
              <Magnetic strength={10} className="inline-block">
                <a href="#products" className="btn-secondary-on-dark mt-8 group">
                  Explore live products
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>

              {/* stats below CTA */}
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-sm">
                {[
                  ["18", "active projects"],
                  ["12", "frameworks"],
                  ["4", "time zones"],
                ].map(([n, l]) => (
                  <div key={l} className="rounded-md bg-white/10 border border-white/15 px-3 py-3">
                    <div className="text-title-md text-white">{n}</div>
                    <div className="text-caption text-white/70 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[430px] lg:min-h-[510px] overflow-hidden">
              {/* Scroll-coupled drifting tile row, 3D tilt on each tile */}
              <motion.div
                style={{ x }}
                className="absolute top-0 left-0 flex gap-4 will-change-transform"
              >
                {loop.map((project, index) => (
                  <WorkTile
                    key={`${project.id}-${index}`}
                    src={project.src}
                    alt={project.alt}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* Faux Airtable mini-window with animated rows */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 ui-window"
              >
                <div className="ui-toolbar">
                  <span className="ui-dot" />
                  <span className="ui-dot" />
                  <span className="ui-dot" />
                  <span className="ml-2 text-caption text-muted">
                    release-board.air
                  </span>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
