'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const products = [
  {
    title: "Kingdom of Kumar",
    description: "An indigenous directory of cool apps designed to solve everyday problems with AI. Built for fun by our vibe-coder team.",
    image: "/kingdomofkumar.png",
    link: "https://kingdomofkumar.com/",
    tags: ["AI directory", "Community"],
  },
  {
    title: "Hireschema",
    description: "An ATS resume scanner and roaster that optimizes your resume for job posts and prepares you for the interview, end-to-end.",
    image: "/Hireschema.png",
    link: "https://www.hireschema.com/",
    tags: ["Career tool", "AI"],
  },
  {
    title: "Kickofflist",
    description: "An extension of LimeDock — a specialized system for SEO and GEO optimization for fast-growing businesses.",
    image: "/Kickofflist.png",
    link: "https://kickofflist.tech/",
    tags: ["SEO", "Growth"],
  },
  {
    title: "Cofounderbase",
    description: "A cult community of founders and co-founders building leading products in tech — includes a private operator group.",
    image: "/Cofounderbase.png",
    link: "https://cofounderbase.com/",
    tags: ["Community", "Network"],
  },
];

export default function FeaturedProducts() {
  return (
    <section className="relative py-24 md:py-32 bg-canvas w-full overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <span className="eyebrow mb-5">
            <span className="dot" />
            Things we built for ourselves
          </span>
          <h2 className="font-display text-display-lg text-ink mt-5">
            Our own products.
            <br />
            <span className="text-ink-muted">Live in the wild.</span>
          </h2>
          <p className="text-subhead text-ink-muted mt-5 max-w-2xl">
            We eat our own cooking. Here&apos;s a slice of what the team has shipped
            in spare hours — built on the same stack we&apos;ll use on yours.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((product, index) => (
            <motion.a
              key={product.title}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
              className="group relative overflow-hidden rounded-[24px] bg-surface-1 border border-hairline lift"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-caption rounded-full bg-surface-2 border border-hairline text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-display-md text-ink">
                  {product.title}
                </h3>
                <p className="text-body text-ink-muted mt-3 leading-relaxed max-w-md">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[14px] font-semibold text-ink">
                  <span>Visit site</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
