'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What happens if my project scope changes mid-way?',
    answer:
      "Priorities can shift, especially in fast-moving industries. For fixed projects, we re-scope with a revised SOW. For retainers, scope changes roll into the ongoing engagement — no re-papering.",
  },
  {
    question: 'Can you collaborate with our in-house team?',
    answer:
      "Yes — and we do it often. We sit inside your Slack, Linear and Figma, ship from your repo, and work in the same rituals your team already runs.",
  },
  {
    question: 'Why not hire designers full-time?',
    answer:
      "Hiring senior IC takes months and salaries scale fast. With LimeDock you get a senior team on day one — and the ability to flex up or down without HR overhead.",
  },
  {
    question: 'How do you communicate and manage work?',
    answer:
      "Notion + Slack as the source of truth. Every client gets a portal with the project plan, decisions log and task system. Daily updates, weekly demos.",
  },
  {
    question: 'Do you work fixed-scope or retainer?',
    answer:
      "Both. Fixed-scope for one-off launches (a site, a brand, a deck). Retainer for ongoing product and growth work — pause anytime with two weeks' notice.",
  },
  {
    question: 'How quickly can we kick off?',
    answer:
      "Most engagements start the same week you sign. Onboarding is async and takes a couple of hours of your team's time — we drive the rest.",
  },
];

const FAQRow = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-hairline-soft last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-6 py-7 text-left group"
      >
        <span
          className={`text-[20px] md:text-[22px] tracking-[-0.025em] leading-snug font-medium transition-colors ${
            isOpen ? 'text-ink' : 'text-ink group-hover:text-ink'
          }`}
        >
          {question}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full grid place-items-center border transition-all duration-300 ${
            isOpen
              ? 'bg-ink text-canvas border-ink rotate-45'
              : 'bg-surface-1 text-ink border-hairline'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-12 text-body-lg text-ink-muted max-w-3xl leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative py-24 md:py-32 bg-canvas w-full">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Side header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4"
        >
          <span className="eyebrow mb-5">
            <span className="dot" />
            FAQs
          </span>
          <h2 className="font-display text-display-lg text-ink mt-5">
            Common questions
            <br />
            <span className="text-ink-muted">before we kick off.</span>
          </h2>
          <p className="text-body text-ink-muted mt-5 max-w-xs">
            Can&apos;t find what you&apos;re looking for? Drop us a line — we usually
            reply same day.
          </p>
          <a
            href="mailto:ranjeet@limedock.com"
            className="mt-6 inline-flex btn-secondary"
          >
            ranjeet@limedock.com
          </a>
        </motion.div>

        {/* Accordion */}
        <div className="lg:col-span-8">
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <FAQRow
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
