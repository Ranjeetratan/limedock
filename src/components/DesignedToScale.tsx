"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./motion/TiltCard";

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  surface: string;
  span: string;
  height: string;
};

const services: Service[] = [
  {
    id: "01",
    title: "Brand identity",
    description:
      "Naming support, marks, type, color, motion rules, and launch kits.",
    image: "/services-images/Brand Identity.png",
    surface: "bg-signature-peach",
    span: "lg:col-span-5",
    height: "min-h-[420px]",
  },
  {
    id: "02",
    title: "Website design & dev",
    description:
      "Editorial marketing sites with crisp UX, conversion paths, and clean frontend implementation.",
    image: "/services-images/Web Design & Dev.png",
    surface: "bg-signature-cream",
    span: "lg:col-span-7",
    height: "min-h-[500px]",
  },
  {
    id: "03",
    title: "Product design & dev",
    description:
      "Dashboards, onboarding, internal tools, and production-grade user flows.",
    image: "/services-images/Product Design & Dev.png",
    surface: "bg-signature-mint",
    span: "lg:col-span-7",
    height: "min-h-[470px]",
  },
  {
    id: "04",
    title: "Video & motion",
    description:
      "Product explainers, launch loops, paid creative, and motion systems.",
    image: "/services-images/Videos & Motion.png",
    surface: "bg-signature-yellow",
    span: "lg:col-span-5",
    height: "min-h-[400px]",
  },
  {
    id: "05",
    title: "Social & content",
    description:
      "Repeatable design-led content engines across LinkedIn, X, reels, and founder-led channels.",
    image: "/services-images/Social Media Management.png",
    surface: "bg-signature-mustard",
    span: "lg:col-span-4",
    height: "min-h-[440px]",
  },
  {
    id: "06",
    title: "Pitch decks & collateral",
    description:
      "Investor decks, sales narratives, and partner collateral that make the product easy to buy.",
    image: "/services-images/Pitch Decks.png",
    surface: "bg-canvas",
    span: "lg:col-span-8",
    height: "min-h-[440px]",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Image rides ~36px inside the tile as you scroll past
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.06 }}
      className={`group ${service.span}`}
    >
      <TiltCard className="rounded-[10px]" max={4} spotlight>
        <div
          ref={ref}
          className={`demo-card soft-hairline ${service.surface} ${service.height} flex flex-col overflow-hidden relative`}
        >
          {/* hover scan-line */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20"
          />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <span className="text-caption text-muted">{service.id}</span>
            <span className="text-caption text-muted opacity-80">
              LimeDock / {service.title}
            </span>
          </div>

          <div className="relative mt-6 flex-1 min-h-[220px] overflow-hidden rounded-md bg-canvas/65 soft-hairline">
            <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </motion.div>
          </div>

          <div className="pt-6 grid md:grid-cols-[0.55fr_1fr] gap-4 items-start relative z-10">
            <h3 className="text-title-lg text-ink flex items-center gap-2">
              {service.title}
              <motion.span
                aria-hidden
                initial={false}
                className="inline-block h-[6px] w-[6px] rounded-full bg-ink/40 group-hover:bg-ink transition-colors"
              />
            </h3>
            <p className="text-body-md text-body leading-[1.55]">
              {service.description}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

export default function DesignedToScale() {
  return (
    <section id="capabilities" className="section-air bg-canvas">
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid lg:grid-cols-[0.75fr_0.55fr] gap-8 items-end"
        >
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Capabilities
            </span>
            <h2 className="text-display-md text-ink mt-7 max-w-2xl">
              The pieces founders usually hire five teams to handle.
            </h2>
          </div>
          <p className="text-label-md text-body leading-[1.45] max-w-md lg:justify-self-end">
            Brand, product, web, motion, content, and decks can finally share
            the same taste and execution bar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
