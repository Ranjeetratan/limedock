'use client';

import React from 'react';
import { EndToEndIllustration, CollaborativeIllustration } from './ExecutionIllustrations';
import { motion } from 'framer-motion';

const WhatWeDo = () => {
  return (
    <section className="w-full bg-background py-24 relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What we do
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            We are a full-stack tech agency focused on building and scaling digital products
          </p>
        </motion.div>

        {/* Execution Models */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* End-to-end Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative bg-[#F6F6DF] rounded-[32px] border-[3px] border-white flex flex-col w-full max-w-[420px] hover:scale-[1.02] transition-all duration-500"
            style={{
               boxShadow: "0px 4px 16px 0px #908F731F"
            }}
          >
            {/* Illustration Area */}
            <div className="relative flex justify-center w-full h-[280px] items-center overflow-hidden">
               <div className="scale-110 group-hover:scale-125 transition-transform duration-700 ease-out">
                 <EndToEndIllustration />
               </div>
            </div>
            
            {/* Content Area */}
            <div className="bg-white m-2 mt-0 p-8 rounded-[24px] flex-1 flex flex-col justify-center shadow-sm min-h-[220px]">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  End-to-end Execution
                </h3>
                <p className="text-foreground/60 text-[16px] leading-relaxed">
                  For teams that want ownership handled externally. We take it from zero to one with complete autonomy and transparency.
                </p>
            </div>
          </motion.div>

          {/* Collaborative Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative bg-[#F6F6DF] rounded-[32px] border-[3px] border-white flex flex-col w-full max-w-[420px] hover:scale-[1.02] transition-all duration-500"
            style={{
               boxShadow: "0px 4px 16px 0px #908F731F"
            }}
          >
            {/* Illustration Area */}
            <div className="relative flex justify-center w-full h-[280px] items-center overflow-hidden">
               <div className="scale-110 group-hover:scale-125 transition-transform duration-700 ease-out">
                 <CollaborativeIllustration />
               </div>
            </div>

            {/* Content Area */}
            <div className="bg-white m-2 mt-0 p-8 rounded-[24px] flex-1 flex flex-col justify-center shadow-sm min-h-[220px]">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Collaborative Execution
                </h3>
                <p className="text-foreground/60 text-[16px] leading-relaxed">
                  For teams with strong in-house capabilities. We plug in seamlessly to accelerate your velocity and fill skill gaps.
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
