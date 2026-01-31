'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const services = [
  {
    id: '01',
    title: "Brand Identity",
    description: "Get a differentiated and unique brand identity to stand out your product from competitor",
    images: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '02',
    title: "Website Design & Dev",
    description: "We design high-performing websites that balance aesthetics, usability, and conversion to support your business goals.",
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '03',
    title: "Product Design & Dev",
    description: "We design intuitive, user-centered products built for scale and long-term growth.",
    images: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '04',
    title: "Videos & Motion",
    description: "We create engaging videos and motion graphics to tell your brand's story.",
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '05',
    title: "Social Media Marketing",
    description: "From no-code to custom development, we build fast, reliable, and scalable digital products using modern technology.",
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '06',
    title: "Pitch Decks & Collateral",
    description: "From no-code to custom development, we build fast, reliable, and scalable digital products using modern technology.",
    images: [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop'
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
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[124px] relative h-full flex flex-col">
          
          {/* Header */}
          <div className="text-center pt-16 mb-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need to scale
            </h2>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left: Radial Navigation */}
            <div className="md:col-span-5 relative h-[600px] flex items-end">
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
            <div className="md:col-span-7 relative h-[400px]">
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
                               className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                             />
                          </div>
                        ))}
                     </div>
                   </div>
                 );
               })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
