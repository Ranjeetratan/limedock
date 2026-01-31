'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="#00AC47" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = ({ color = "red" }: { color?: "red" | "yellow" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke={color === "red" ? "#EF4444" : "#EAB308"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const rows = [
  {
    feature: "Cost",
    us: { text: "$", type: "success" },
    fullTime: { text: "$$$$ (High Overhead)", type: "error" },
    other: { text: "$$", type: "warning" }
  },
  {
    feature: "Senior-Level Expert",
    us: { text: "Guaranteed", type: "success" },
    fullTime: { text: "Hopefully", type: "warning" },
    other: { text: "Maybe", type: "warning" }
  },
  {
    feature: "Turnaround Time",
    us: { text: "48 hours for most projects", type: "success" },
    fullTime: { text: "Can take weeks due to other tasks", type: "error" },
    other: { text: "Weeks, depending on workload", type: "error" }
  },
  {
    feature: "Start Time",
    us: { text: "Today itself", type: "success" },
    fullTime: { text: "Weeks to onboard and train", type: "error" },
    other: { text: "Days to set up agreements", type: "error" }
  },
  {
    feature: "Unlimited Revisions",
    us: { text: "Yes, we keep working until it's perfect", type: "success" },
    fullTime: { text: "Limited, with extra time constraints", type: "error" },
    other: { text: "Limited revisions per project", type: "error" }
  },
  {
    feature: "Client Portal",
    us: { text: "Yes, track progress easily", type: "success" },
    fullTime: { text: "Internal systems may vary, often less accessible", type: "warning" },
    other: { text: "No consistent system", type: "error" }
  },
  {
    feature: "Scalability",
    us: { text: "Scale up or down with ease", type: "success" },
    fullTime: { text: "Possible", type: "success" },
    other: { text: "Limited by freelancer's capacity", type: "error" }
  },
  {
    feature: "Flexibility",
    us: { text: "Pause or adjust your subscription anytime", type: "success" },
    fullTime: { text: "Locked into salaries and benefits", type: "error" },
    other: { text: "Inflexible, project-based", type: "error" }
  }
];

export default function Comparison() {
  return (
    <section className="py-8 bg-background w-full">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[124px]">
        
        {/* Header (Optional, if needed, but the design is a big card) */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Why choose us?
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The smart alternative to full-time hires and traditional agencies.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-transparent rounded-[32px] border-2 border-dashed border-black/10 p-4 md:p-6 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-[1.2fr_1.2fr_1.2fr_1.2fr] gap-3 mb-4 items-end">
              <div className="text-base font-medium text-gray-500"></div>
              
              {/* Us Column Header */}
              <div className="flex flex-col items-center">
                 <div className="flex items-center justify-center mb-1">
                    <Logo className="h-4 w-24" />
                 </div>
              </div>

              {/* Full-time Column Header */}
              <div className="text-center">
                <h3 className="text-base font-bold text-black mb-1">Full-time Hire</h3>
              </div>

              {/* Other Agencies Column Header */}
              <div className="text-center">
                <h3 className="text-base font-bold text-black mb-1">Other agencies</h3>
              </div>
            </div>

            {/* Table Body */}
            <div className="space-y-1">
              {rows.map((row, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-[1.2fr_1.2fr_1.2fr_1.2fr] gap-3 py-2 border-b border-black/10 last:border-0 items-center"
                >
                  {/* Feature Name */}
                  <div className="text-sm font-medium text-gray-700">
                    {row.feature}
                  </div>

                  {/* Us Cell */}
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 mt-0.5">
                        <CheckIcon />
                    </div>
                    <span className="text-xs font-medium text-gray-900 leading-snug">
                        {row.us.text}
                    </span>
                  </div>

                  {/* Full-time Cell */}
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 mt-0.5">
                        {row.fullTime.type === 'success' ? <CheckIcon /> : <CrossIcon color={row.fullTime.type === 'warning' ? 'yellow' : 'red'} />}
                    </div>
                    <span className="text-xs font-medium text-gray-600 leading-snug">
                        {row.fullTime.text}
                    </span>
                  </div>

                  {/* Other Agencies Cell */}
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 mt-0.5">
                         {row.other.type === 'success' ? <CheckIcon /> : <CrossIcon color={row.other.type === 'warning' ? 'yellow' : 'red'} />}
                    </div>
                    <span className="text-xs font-medium text-gray-600 leading-snug">
                        {row.other.text}
                    </span>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
