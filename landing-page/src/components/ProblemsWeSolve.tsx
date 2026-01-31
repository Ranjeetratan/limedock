'use client';

import React from 'react';

const PROBLEMS = [
  {
    title: "Your brand doesn't clearly stand out",
    description: "In a crowded market, your messaging and positioning feel generic, making it hard for users to understand why they should choose you."
  },
  {
    title: "Your brand doesn't clearly stand out",
    description: "In a crowded market, your messaging and positioning feel generic, making it hard for users to understand why they should choose you."
  },
  {
    title: "Your brand doesn't clearly stand out",
    description: "In a crowded market, your messaging and positioning feel generic, making it hard for users to understand why they should choose you."
  },
  {
    title: "Your brand doesn't clearly stand out",
    description: "In a crowded market, your messaging and positioning feel generic, making it hard for users to understand why they should choose you."
  },
  {
    title: "Your brand doesn't clearly stand out",
    description: "In a crowded market, your messaging and positioning feel generic, making it hard for users to understand why they should choose you."
  },
  {
    title: "Your brand doesn't clearly stand out",
    description: "In a crowded market, your messaging and positioning feel generic, making it hard for users to understand why they should choose you."
  }
];

export default function ProblemsWeSolve() {
  return (
    <section className="py-24 bg-background w-full" id="problems">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The problems we help founders solve
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-medium">
            Scaling is hard. We bridge the gap between vision and execution
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROBLEMS.map((item, index) => (
            <div 
              key={index} 
              className="p-10 rounded-[32px] border-2 border-dashed border-black/10 flex flex-col gap-4 bg-transparent hover:border-black/20 transition-colors"
            >
              <h3 className="text-xl font-bold text-foreground leading-tight">
                {item.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed text-[15px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}