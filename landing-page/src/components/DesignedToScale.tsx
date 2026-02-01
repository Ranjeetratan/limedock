'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const services = [
  {
    id: '01',
    title: "Brand Identity",
    description: "Get a differentiated and unique brand identity to stand out your product from competitor.",
    images: [
      '/services-images/Brand Identity.png',
      '/Brand Identity 2.png'
    ]
  },
  {
    id: '02',
    title: "Website Design & Dev",
    description: "We design high-performing websites that balance aesthetics, usability, and conversion to support your business goals.",
    images: [
      '/services-images/Web Design & Dev.png',
      '/services-images/Web Design & Dev-1.png'
    ]
  },
  {
    id: '03',
    title: "Product Design & Dev",
    description: "We design intuitive, user-centered products built for scale and long-term growth.",
    images: [
      '/services-images/Product Design & Dev.png',
      '/services-images/Product Design & Dev-1.png'
    ]
  },
  {
    id: '04',
    title: "Videos & Motion",
    description: "We craft product-focused videos and motion edits that help brands stand out and convert.",
    images: [
      '/services-images/Videos & Motion.png',
      '/services-images/Videos & Motion-1.png'
    ]
  },
  {
    id: '05',
    title: "Social Media Marketing",
    description: "We help brands grow through design-led social media, clear strategy, and consistent execution.",
    images: [
      '/services-images/Social Media Management.png',
      '/services-images/Social Media Management-1.png'
    ]
  },
  {
    id: '06',
    title: "Pitch Decks & Collateral",
    description: "We design pitch decks and collateral built to persuade helping you present your story clearly, and drive decisions.",
    images: [
      '/services-images/Pitch Decks.png',
      '/Pitch Decks 2.png'
    ]
  }
];

export default function DesignedToScale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Calculate active index based on scroll progress
      // We have 6 items, so 5 segments.
      const index = Math.min(
        Math.floor(latest * services.length),
        services.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-auto md:h-[300vh] bg-black">
      <div className="relative md:sticky md:top-0 md:h-screen overflow-hidden flex flex-col items-center justify-center py-12 md:py-0">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[124px] relative h-full flex flex-col">
          
          {/* Header */}
          <div className="text-center md:pt-16 mb-12 md:mb-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need to scale
            </h2>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid flex-1 grid-cols-12 gap-12 items-center w-full">
            
            {/* Left: Radial Navigation */}
            <div className="col-span-5 relative h-[600px] flex items-end">
               <div className="absolute left-[-800px] -bottom-[650px] w-[1200px] h-[1200px] rounded-full border border-dashed border-white/20 flex items-center justify-center">
                  {/* Inner Rings */}
                  <div className="absolute inset-[15%] rounded-full border border-white/10" />
                  
                  {/* Items */}
                  {services.map((service, index) => {
                    // Position items on the arc
                    // Center is bottom-left (off-screen).
                    // We want rays in the top-right quadrant relative to center.
                    // 01 at Top (-75 deg), 06 at Bottom (-15 deg).
                    
                    const totalAngle = 60; // degrees spread
                    const startAngle = -75; // 01 starts near top
                    const step = totalAngle / (services.length - 1);
                    const angle = startAngle + (index * step); // Move downwards (less negative)
                    
                    const isActive = index === activeIndex;
                    
                    return (
                      <div 
                        key={service.id}
                        className="absolute w-full h-full pointer-events-none"
                        style={{ 
                          transform: `rotate(${angle}deg)` 
                        }}
                      >
                         <div className="absolute left-[50%] top-1/2 w-[50%] h-[1px] origin-left">
                            {/* The line */}
                            <div className={`absolute left-0 top-0 h-full bg-white/10 transition-all duration-500 ${isActive ? 'w-full bg-[#FDF200]' : 'w-full'}`} />
                            
                            {/* The Number */}
                            <div 
                              className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 pl-6"
                              style={{ transform: `rotate(${-angle}deg)` }} // Counter-rotate text
                            >
                               <span className={`text-3xl font-bold transition-colors duration-300 ${isActive ? 'text-[#FDF200]' : 'text-white/20'}`}>
                                 {service.id}
                               </span>
                            </div>
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            {/* Right: Content */}
            <div className="col-span-7 relative h-[400px]">
               {services.map((service, index) => {
                 const isActive = index === activeIndex;
                 return (
                   <div 
                     key={service.id}
                     className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
                   >
                     <h3 className="text-3xl font-bold text-white mb-6">
                       {service.title}
                     </h3>
                     <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
                       {service.description}
                     </p>

                     <div className="grid grid-cols-2 gap-6">
                        {service.images.map((img, i) => (
                          <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3] bg-white/5 border border-white/10 relative group">
                             <img 
                               src={img} 
                               alt={`${service.title} ${i + 1}`}
                               className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                             />
                          </div>
                        ))}
                     </div>
                   </div>
                 );
               })}
            </div>

          </div>

          {/* Mobile Layout */}
          <div className="md:hidden w-full flex flex-col gap-16 pb-12">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#FDF200] text-xl font-bold">{service.id}</span>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
                
                <p className="text-white/60 text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.images.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden aspect-video bg-white/5 border border-white/10">
                       <img 
                         src={img} 
                         alt={`${service.title} ${i + 1}`}
                         className="w-full h-full object-cover" 
                       />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
