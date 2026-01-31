'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const EndToEndIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      <div className="relative w-[180px] h-[180px] flex items-center justify-center perspective-[800px] translate-y-4">
        <div className="relative w-28 h-28 transform rotate-x-60 rotate-z-45 scale-90" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(45deg) scale(0.9)' }}>
          
          {/* Base Layer - Foundation */}
          <motion.div
            className="absolute inset-0 bg-[#454540] rounded-xl shadow-lg border border-white/10"
            style={{ translateZ: 0 }}
          />

          {/* Middle Layer - Process */}
          <motion.div
            className="absolute inset-0 bg-[#50504B] rounded-xl border border-[#E3D026]/20 shadow-sm flex items-center justify-center"
            animate={{ translateZ: [20, 50, 20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundColor: 'rgba(80, 80, 75, 0.95)' }}
          >
             {/* Internal details for tech feel */}
             <div className="w-16 h-16 border border-dashed border-white/10 rounded-full" />
          </motion.div>

          {/* Top Layer - Product */}
          <motion.div
            className="absolute inset-0 bg-[#E3D026] rounded-xl shadow-[0_0_20px_rgba(227,208,38,0.2)] flex items-center justify-center"
            animate={{ translateZ: [40, 100, 40] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-10 h-10 bg-[#F6F6DF] rounded-lg shadow-inner" />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export const CollaborativeIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Container ensures no overflow/distortion */}
      <div className="relative w-[240px] h-[120px] flex items-center justify-between px-6">
        
        {/* Connection Line Background */}
        <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-[2px] bg-[#E5E5E0]" />

        {/* Active Data Transfer Line */}
        <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-[2px] overflow-hidden rounded-full">
            <motion.div 
                className="w-16 h-full bg-[#50504B]"
                animate={{ x: [-64, 160] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
        </div>
        
        {/* Left Node (Agency) */}
        <div className="relative z-10 flex-shrink-0">
            <motion.div 
              className="w-16 h-16 bg-white border border-[#E5E5E0] rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
                {/* Diamond Progress Loading */}
                <div className="w-8 h-8 transform rotate-45 border-2 border-[#454540]/20 rounded-md overflow-hidden relative">
                    <motion.div 
                        className="absolute inset-0 bg-[#454540]"
                        animate={{ y: ["100%", "0%", "0%", "-100%"] }}
                        transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            times: [0, 0.4, 0.6, 1]
                        }}
                    />
                </div>
            </motion.div>
        </div>

        {/* Sync Indicator (Center) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-center">
             <motion.div 
                className="w-8 h-8 rounded-full border border-[#E5E5E0] flex items-center justify-center bg-[#F6F6DF]/50 text-[#454540]/20"
                animate={{ rotate: 180 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
             >
                <svg width="32" height="32" viewBox="0 0 32 32" className="w-full h-full p-1.5">
                    <line x1="16" y1="0" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="0" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" />
                </svg>
             </motion.div>
        </div>

        {/* Right Node (Client) */}
        <div className="relative z-10 flex-shrink-0">
            <motion.div 
              className="w-16 h-16 bg-[#454540] rounded-2xl flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.05 }}
            >
                {/* Static Icon */}
                <div className="w-6 h-6 bg-[#E3D026] rounded-md transform rotate-45" />
            </motion.div>
        </div>

      </div>
    </div>
  );
};
