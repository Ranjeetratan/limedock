"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What counts as a \"workflow automation\"?",
    answer:
      "A repeating job your team does every week that can run on its own. Sales follow-ups after a lead opens an email. Content drafts sent from a product update. A weekly digest composed from CRM, Stripe, and product data. Ticket triage, meeting scheduling, standup summaries. We build each one as a small internal workflow that plugs into the tools your team already uses.",
  },
  {
    question: "Do you replace our Slack, CRM, or internal platform?",
    answer:
      "No. The workflows plug into whatever you already use. Slack stays your Slack. HubSpot stays your HubSpot. Notion stays Notion. We build the automations that live between them and give your team a single place to act on the output.",
  },
  {
    question: "Who owns the code, prompts, and data?",
    answer:
      "You do. Source lives in your Git org, infrastructure runs in your cloud account, prompts and evals ship as versioned files in the repo, and your data never leaves your walls. If we part ways tomorrow, every workflow keeps running.",
  },
  {
    question: "What do we pay besides your build fee?",
    answer:
      "API keys — OpenAI, Anthropic, or whatever model you route to — plus your usual cloud bill. There are no per-seat invoices from LimeDock. Costs scale with usage, not headcount.",
  },
  {
    question: "Do you work on marketing, sales, or management?",
    answer:
      "We usually pick one to start. Focusing on the department where the manual work stings the most gets you a live automation in the first two weeks. Once it's stable, we extend into the other sides — often on the same codebase.",
  },
  {
    question: "How long until we can use the first workflow?",
    answer:
      "First working prototype lands within 48 hours of a workflow call. A production-ready automation ships in the first few weeks. From there we release a new workflow, or a meaningful upgrade to an existing one, every Friday.",
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
            The things SaaS teams ask before they hand us their workflow.
          </h2>
          <p className="text-body-md text-body mt-5 leading-[1.55] max-w-sm">
            If your question isn&apos;t here, send a short note. We usually reply
            the same day.
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
