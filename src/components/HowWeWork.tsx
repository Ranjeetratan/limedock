'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type IconRef = { src: string; alt: string; className: string; link?: string };

type Step = {
  step: string;
  title: string;
  description: string;
  image: string;
  icons: IconRef[];
  variant: 'surface-1' | 'spot-violet' | 'spot-orange';
};

const steps: Step[] = [
  {
    step: 'Step 01',
    title: 'Align',
    description:
      'A focused kickoff to lock down the vision, audience, constraints and the first 30 days of priorities.',
    image: '/align1.png',
    icons: [
      { src: '/google-meet.svg', alt: 'Google Meet', className: 'top-6 left-6 -rotate-12', link: 'https://cal.com/limedock-admin-nb05ck/30min' },
      { src: '/notion.svg', alt: 'Notion', className: 'bottom-6 left-6 rotate-6' },
      { src: '/slack.svg', alt: 'Slack', className: 'top-1/2 right-4 -translate-y-1/2 rotate-12' },
    ],
    variant: 'surface-1',
  },
  {
    step: 'Step 02',
    title: 'Create',
    description:
      'Design, build, ship — in tight weekly cycles. Brand, product, and growth move in lockstep.',
    image: '/align-step2.png',
    icons: [
      { src: '/figma.svg', alt: 'Figma', className: 'bottom-6 left-6 -rotate-6' },
      { src: '/after-effects.svg', alt: 'After Effects', className: 'top-4 left-1/2 -translate-x-1/2' },
      { src: '/vs-code.png', alt: 'VS Code', className: 'top-6 right-6 rotate-12' },
    ],
    variant: 'spot-violet',
  },
  {
    step: 'Step 03',
    title: 'Grow',
    description:
      'Launch with confidence, then keep iterating. We hand over docs, systems and momentum your team can run with.',
    image: '/Align-step3.png',
    icons: [
      { src: '/rocket.svg', alt: 'Rocket', className: 'top-8 right-12 -rotate-12' },
    ],
    variant: 'surface-1',
  },
];

const variantClasses: Record<Step['variant'], string> = {
  'surface-1': 'bg-surface-1 border border-hairline',
  'spot-violet': 'bg-spot-violet border border-white/15',
  'spot-orange': 'bg-spot-orange border border-white/15',
};

const isGradient = (v: Step['variant']) => v !== 'surface-1';

export default function HowWeWork() {
  return (
    <section className="relative py-24 md:py-32 w-full bg-canvas" id="how-we-work">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <span className="eyebrow mb-5">
            <span className="dot" />
            How we work
          </span>
          <h2 className="font-display text-display-lg text-ink mt-5">
            A simple loop.
            <br />
            <span className="text-ink-muted">Align. Create. Grow.</span>
          </h2>
          <p className="text-subhead text-ink-muted mt-5 max-w-2xl">
            No agency theatre, no 8-week discovery decks. Three modes, run
            in tight cycles, every week.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-[24px] lift ${variantClasses[item.variant]}`}
            >
              {/* Visual */}
              <div className={`relative w-full aspect-[16/11] flex items-center justify-center overflow-hidden ${
                index === 2 ? 'items-end pt-6 px-6' : 'p-8'
              }`}>
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`object-contain ${isGradient(item.variant) ? 'opacity-95' : ''} ${index === 2 ? 'object-bottom' : ''}`}
                  />
                </div>

                {item.icons.map((icon, i) =>
                  icon.link ? (
                    <a
                      key={i}
                      href={icon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`absolute w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 z-10 ${icon.className} cursor-pointer hover:scale-110 transition-transform`}
                    >
                      <Image src={icon.src} alt={icon.alt} width={32} height={32} className="w-full h-full object-contain" />
                    </a>
                  ) : (
                    <div
                      key={i}
                      className={`absolute w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 z-10 ${icon.className}`}
                    >
                      <Image src={icon.src} alt={icon.alt} width={32} height={32} className="w-full h-full object-contain" />
                    </div>
                  )
                )}
              </div>

              {/* Text */}
              <div className="p-7 md:p-8">
                <span className={`text-caption ${isGradient(item.variant) ? 'text-white/70' : 'text-ink-muted'}`}>
                  {item.step}
                </span>
                <h3 className={`font-display text-display-md mt-3 ${isGradient(item.variant) ? 'text-white' : 'text-ink'}`}>
                  {item.title}
                </h3>
                <p className={`text-body mt-3 max-w-md leading-relaxed ${isGradient(item.variant) ? 'text-white/85' : 'text-ink-muted'}`}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
