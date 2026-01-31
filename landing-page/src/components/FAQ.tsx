'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What happens if my project scope changes mid-way?",
    answer: "Priorities can shift, especially in fast-moving industries. For fixed projects, we can issue a revised scope of work (SOW) to account for any new additions or changes. For retainer clients, these adjustments can often be rolled into your ongoing engagement."
  },
  {
    question: "Can you collaborate with our in-house team?",
    answer: "Absolutely. We’re experienced in working alongside internal teams and third-party collaborators to ensure alignment and smooth execution. Think of us as an extension of your team."
  },
  {
    question: "Why not hire designers full-time?",
    answer: "Hiring full-time requires extensive time and resources for recruitment, onboarding, and management. With us, you get a ready-to-go senior team that delivers immediately, without the overhead of permanent hires."
  },
  {
    question: "How do you communicate and manage work?",
    answer: "We use Notion and Slack. You get a clean Client Portal with all documentation and a task system. We share daily updates and host calls as needed."
  }
];

const FAQCard = ({ question, answer, isOpen, onClick, index }: { question: string, answer: string, isOpen: boolean, onClick: () => void, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`border-b border-black/10 last:border-0 transition-all duration-300`}
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-8 text-left"
      >
        <span className={`text-xl font-bold text-foreground`}>
            {question}
        </span>
        
        <div className={`shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pb-8 text-foreground/60 text-lg leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background w-full" id="faqs">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16">
          FAQs
        </h2>

        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <FAQCard 
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}