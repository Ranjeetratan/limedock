'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  span: string; // tailwind col-span classes
  variant: 'surface-1' | 'surface-2' | 'spot-orange' | 'spot-coral';
};

const services: Service[] = [
  {
    id: '01',
    title: 'Brand identity',
    description: 'Marks, type systems, color, motion — built so the brand stays sharp at every size.',
    image: '/services-images/Brand Identity.png',
    span: 'lg:col-span-7',
    variant: 'surface-1',
  },
  {
    id: '02',
    title: 'Website design & dev',
    description: 'Marketing sites that look beautiful and convert — measured at every scroll.',
    image: '/services-images/Web Design & Dev.png',
    span: 'lg:col-span-5',
    variant: 'spot-orange',
  },
  {
    id: '03',
    title: 'Product design & dev',
    description: 'Onboarding, dashboards, internal tools. Designed and shipped to production.',
    image: '/services-images/Product Design & Dev.png',
    span: 'lg:col-span-5',
    variant: 'surface-2',
  },
  {
    id: '04',
    title: 'Video & motion',
    description: 'Product films, looped UI motion, and ads that actually feel like the product.',
    image: '/services-images/Videos & Motion.png',
    span: 'lg:col-span-7',
    variant: 'surface-1',
  },
  {
    id: '05',
    title: 'Social & content',
    description: 'A consistent presence — design system, content calendar, distribution.',
    image: '/services-images/Social Media Management.png',
    span: 'lg:col-span-7',
    variant: 'surface-1',
  },
  {
    id: '06',
    title: 'Pitch decks & collateral',
    description: 'Investor and sales decks that translate strategy into a story buyers act on.',
    image: '/services-images/Pitch Decks.png',
    span: 'lg:col-span-5',
    variant: 'spot-coral',
  },
];

const variantClasses: Record<Service['variant'], string> = {
  'surface-1': 'bg-surface-1 border border-hairline',
  'surface-2': 'bg-surface-2 border border-hairline',
  'spot-orange': 'bg-spot-orange border border-white/15',
  'spot-coral': 'bg-spot-coral border border-white/15',
};

const isGradient = (v: Service['variant']) => v === 'spot-orange' || v === 'spot-coral';

export default function DesignedToScale() {
  return (
    <section id="capabilities" className="relative w-full bg-canvas py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <div>
            <span className="eyebrow mb-5">
              <span className="dot" />
              Capabilities
            </span>
            <h2 className="font-display text-display-lg text-ink mt-5 max-w-3xl">
              Everything you need
              <br />
              <span className="text-ink-muted">to scale a product.</span>
            </h2>
          </div>
          <p className="text-body-lg text-ink-muted max-w-md">
            Six disciplines, one team. Pick one or wire them all together — we
            scope to what you actually need.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
              className={`relative overflow-hidden rounded-[24px] lift ${variantClasses[s.variant]} ${s.span}`}
              style={{ minHeight: 360 }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className={`object-cover ${isGradient(s.variant) ? 'mix-blend-screen opacity-90' : ''}`}
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
                {!isGradient(s.variant) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                )}
                <span className={`absolute top-4 left-4 px-2 py-1 rounded-full text-caption border ${
                  isGradient(s.variant)
                    ? 'bg-white/15 border-white/25 text-white'
                    : 'bg-black/40 border-white/15 text-white/80'
                }`}>
                  {s.id}
                </span>
              </div>
              {/* Content */}
              <div className="p-6 md:p-7">
                <h3 className={`font-display text-display-md ${isGradient(s.variant) ? 'text-white' : 'text-ink'}`}>
                  {s.title}
                </h3>
                <p className={`text-body mt-3 max-w-md ${isGradient(s.variant) ? 'text-white/85' : 'text-ink-muted'}`}>
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
