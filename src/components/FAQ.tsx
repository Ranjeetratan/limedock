"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What happens if scope changes mid-project?",
    answer:
      "We expect scope to evolve. Fixed projects get a lightweight SOW adjustment. Retainer work rolls changes into the sprint backlog so priorities stay visible.",
  },
  {
    question: "Can you work with our in-house team?",
    answer:
      "Yes. We join your Slack, Figma, Notion, Linear, and Git workflow. We can lead the work or behave like senior embedded ICs.",
  },
  {
    question: "Why not hire full-time?",
    answer:
      "Hiring senior product talent takes time, salary, and management overhead. LimeDock gives you a senior bench immediately, with the ability to scale up or pause.",
  },
  {
    question: "How do you communicate?",
    answer:
      "One source of truth, async updates, weekly demos, and decision logs. Calls are used when they move the work, not as a default ceremony.",
  },
  {
    question: "Do you do fixed scope or retainer?",
    answer:
      "Both. Launches, rebrands, websites, and pitch decks often fit fixed scope. Ongoing product and growth work usually fits a retainer.",
  },
];

function FAQRow({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        onClick={onClick}
        className="w-full py-7 flex items-center justify-between gap-8 text-left focus-ring"
      >
        <span className="text-title-md text-ink">{question}</span>
        <span className={`button-icon-circular shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 max-w-3xl text-label-md text-body leading-[1.5]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="section-air bg-canvas">
      <div className="container-air grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">
            <span className="dot" />
            FAQs
          </span>
          <h2 className="text-display-md text-ink mt-7 max-w-md">
            Common questions before we start.
          </h2>
          <p className="text-body-md text-body mt-5 leading-[1.55] max-w-sm">
            If the thing you care about is not here, send a short note. We usually
            reply the same day.
          </p>
          <a href="mailto:ranjeet@limedock.com" className="text-link text-label-md inline-flex mt-6">
            ranjeet@limedock.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="border-t border-hairline"
        >
          {faqs.map((faq, index) => (
            <FAQRow
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
