'use client';

import React from 'react';
import Image from 'next/image';

type FloatingIcon = {
  src: string;
  alt: string;
  className: string;
  link?: string;
};

const steps = [
  {
    step: "Step 1",
    title: "Align",
    description: "We start by aligning on your vision, goals, audience, and constraints to set clear priorities.",
    image: "/align1.png",
    icons: [
      { src: "/google-meet.svg", alt: "Google Meet", className: "top-6 left-6 -rotate-12", link: "https://cal.com/limedock-admin-nb05ck/30min" },
      { src: "/notion.svg", alt: "Notion", className: "bottom-6 left-6 rotate-6" },
      { src: "/slack.svg", alt: "Slack", className: "top-1/2 right-4 -translate-y-1/2 rotate-12" }
    ]
  },
  {
    step: "Step 2",
    title: "Create",
    description: "We design, build, and execute in focused cycles – keeping brand, product, and growth aligned.",
    image: "/align-step2.png",
    icons: [
        { src: "/figma.svg", alt: "Figma", className: "bottom-6 left-6 -rotate-6" },
        { src: "/after-effects.svg", alt: "After Effects", className: "top-4 left-1/2 -translate-x-1/2" },
        { src: "/vs-code.png", alt: "VS Code", className: "top-6 right-6 rotate-12" }
    ]
  },
  {
    step: "Step 3",
    title: "Grow",
    description: "We help you launch with confidence then continue refining and optimizing as you grow.",
    image: "/Align-step3.png",
    icons: [
        { src: "/rocket.svg", alt: "Rocket", className: "top-8 right-12 -rotate-12" }
    ]
  }
];

export default function HowWeWork() {
  return (
    <section className="py-24 w-full bg-background" id="how-we-work">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How we work
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            A simple, focused process to align, execute, and grow without chaos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    {/* Image Card */}
                    <div className={`relative w-full aspect-[16/10] bg-[#FFF6C5] rounded-[32px] mb-8 flex overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ${
                        index === 2 ? 'items-end justify-center pt-8 px-8 pb-0' : 'items-center justify-center p-8'
                    }`}>
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className={`object-contain ${index === 2 ? 'object-bottom' : ''}`}
                            />
                        </div>
                        
                        {/* Floating Icons */}
                        {item.icons.map((icon: FloatingIcon, i) =>
                            icon.link ? (
                                <a
                                    key={i}
                                    href={icon.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`absolute w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center p-2 z-10 ${icon.className} cursor-pointer hover:scale-110 transition-transform`}
                                >
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-contain"
                                    />
                                </a>
                            ) : (
                                <div
                                    key={i}
                                    className={`absolute w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center p-2 z-10 ${icon.className}`}
                                >
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )
                        )}
                    </div>

                    <span className="text-[#FFC700] font-bold text-lg mb-2">{item.step}</span>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-foreground/60 leading-relaxed text-[16px] max-w-sm">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}
