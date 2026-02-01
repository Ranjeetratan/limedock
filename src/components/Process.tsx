'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: "Step 1",
    title: "Alignment Sprint",
    description: "We get clear on what matters now. Product goals, constraints, team structure, and technical reality — all aligned into a focused execution plan.",
    type: "dark"
  },
  {
    step: "Step 2",
    title: "Build With Your Team",
    description: "We work alongside your existing team to design and implement the right systems — UX, architecture, and workflows — without disrupting what’s already working.",
    type: "dark"
  },
  {
    step: "Step 3",
    title: "Ready to Scale",
    description: "You leave with a product that’s clearer, faster, and easier to grow — supported by decisions, systems, and documentation your team can actually run with.",
    type: "gradient"
  }
];

const syncItems = [
  "Clear communication",
  "Lightweight check-ins",
  "Continuous progress visibility"
];

// Reusable abstract UI components for the placeholders
const VideoCallUI = () => (
  <div className="w-full h-full flex items-center justify-center p-8 relative">
    {/* Avatar 1 */}
    <div className="absolute left-[25%] top-[30%] w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center animate-float" style={{ animationDelay: '0s' }}>
       <div className="w-8 h-8 rounded-full bg-white/20" />
    </div>
    {/* Avatar 2 (Center, larger) */}
    <div className="relative z-10 w-24 h-24 rounded-full bg-white/10 border border-white/30 backdrop-blur-md flex items-center justify-center shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
       <div className="w-12 h-12 rounded-full bg-white/30" />
       {/* Active indicator */}
       <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#00AC47] rounded-full border-2 border-[#0C1412]" />
    </div>
    {/* Avatar 3 */}
    <div className="absolute right-[25%] bottom-[30%] w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
       <div className="w-7 h-7 rounded-full bg-white/20" />
    </div>
    
    {/* Controls Bar */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
        <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors" />
        <div className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
        <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors" />
    </div>
  </div>
);

const IdeUI = () => (
  <div className="w-full h-full p-6 flex flex-col gap-3 relative overflow-hidden">
     {/* Sidebar */}
     <div className="absolute left-0 top-0 bottom-0 w-16 bg-white/5 border-r border-white/10 flex flex-col items-center py-6 gap-4">
        <div className="w-8 h-8 rounded-lg bg-white/10" />
        <div className="w-6 h-6 rounded bg-white/5" />
        <div className="w-6 h-6 rounded bg-white/5" />
     </div>
     
     {/* Main Code Area */}
     <div className="ml-16 flex-1 flex flex-col gap-2 pt-4">
         {/* Code Lines */}
         <div className="w-3/4 h-3 rounded bg-white/10" />
         <div className="w-1/2 h-3 rounded bg-[#FF7B10]/40" />
         <div className="w-5/6 h-3 rounded bg-white/5" />
         <div className="w-2/3 h-3 rounded bg-white/5" />
         
         {/* Floating Window */}
         <div className="absolute right-8 bottom-8 w-40 h-32 bg-[#1A1A1A] rounded-xl border border-white/10 shadow-xl p-3 flex flex-col gap-2 animate-float" style={{ animationDelay: '1.5s' }}>
             <div className="w-full h-20 bg-gradient-to-br from-white/5 to-transparent rounded-lg border border-white/5" />
             <div className="w-full h-2 rounded bg-white/10" />
             <div className="w-2/3 h-2 rounded bg-[#00AC47]/50" />
         </div>
     </div>
  </div>
);

const LaunchUI = () => (
   <div className="w-full h-full flex items-center justify-center relative">
      {/* Phone Frame */}
      <div className="w-40 h-[220px] bg-white rounded-[24px] shadow-2xl border-[4px] border-white relative overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
         {/* Screen Content */}
         <div className="absolute inset-0 bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-4">
                <div className="w-12 h-3 rounded-full bg-gray-200" />
                <div className="w-6 h-6 rounded-full bg-gray-200" />
            </div>
            {/* Hero */}
            <div className="flex-1 p-4 flex flex-col gap-2 items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7B10] to-[#E8E700] shadow-lg mb-2" />
                <div className="w-20 h-3 rounded-full bg-gray-200" />
                <div className="w-16 h-2 rounded-full bg-gray-100" />
            </div>
            {/* Button */}
            <div className="p-4">
                <div className="w-full h-8 bg-black rounded-full" />
            </div>
         </div>
      </div>
      
      {/* Success Badge */}
      <div className="absolute top-1/2 right-8 transform translate-x-1/2 -translate-y-full bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 animate-bounce">
         <div className="w-2 h-2 rounded-full bg-[#00AC47]" />
         <span className="text-xs font-bold text-black">Live</span>
      </div>
   </div>
);

export default function Process() {
  return (
    <section className="py-24 bg-white w-full">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[124px]">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-gray-100 rounded-full px-4 py-1.5 text-sm font-medium text-gray-800 mb-6"
          >
            The Process
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-black mb-6 max-w-4xl mx-auto leading-tight"
          >
            How we move you from complexity to clarity — fast
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Most founders don’t need more vendors or opinions. 
            They need momentum without chaos. This is how we work.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="flex flex-col items-center text-center"
            >
              {/* Card Container */}
              <div className={`w-full aspect-[4/3] rounded-[32px] mb-8 border-[6px] border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group ${item.type === 'dark' ? 'bg-[#0C1412]' : ''}`}>
                
                {/* Background Styles */}
                {item.type === 'gradient' && (
                    <div 
                        className="absolute inset-0" 
                        style={{
                            background: 'radial-gradient(circle at top left, #E8E700 0%, #FF7B10 50%, #8ec4b4 100%)'
                        }}
                    />
                )}

                {/* Content Render */}
                <div className="absolute inset-0">
                    {index === 0 && <VideoCallUI />}
                    {index === 1 && <IdeUI />}
                    {index === 2 && <LaunchUI />}
                </div>

                {/* Ready for Launch Badge */}
                 {index === 2 && (
                    <div className="absolute top-6 right-6 bg-[#FF7B10] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-3 z-20">
                        Ready for Launch
                    </div>
                )}
              </div>

              <div className="space-y-3 px-4">
                <span className="text-[#FF7B10] font-bold text-sm tracking-wide uppercase">
                    {item.step}
                </span>
                <h3 className="text-2xl font-bold text-[#0C1412]">
                    {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                    {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center space-y-8"
        >
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <span className="text-lg font-bold text-[#0C1412]">How we stay in sync</span>
                <div className="hidden md:block w-px h-6 bg-gray-200"></div>
                {syncItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00AC47]" />
                        <span className="text-gray-600 font-medium">{item}</span>
                    </div>
                ))}
            </div>

            <p className="text-xl font-medium text-[#0C1412]">
                We don’t take over. We help you move forward — with confidence.
            </p>
        </motion.div>

      </div>
    </section>
  );
}
