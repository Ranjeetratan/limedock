'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const products = [
  {
    title: "Kingdom of Kumar",
    description: "An indigenous directory of cool apps designed to solve everyday problems with AI. Built for fun by our vibe coder team.",
    image: "/kingdomofkumar.png",
    link: "https://kingdomofkumar.com/",
    tags: ["AI Directory", "Community Project"],
    colors: {
      text: "group-hover:text-yellow-400",
      shadow: "hover:shadow-yellow-500/10",
      icon: "text-yellow-400"
    }
  },
  {
    title: "Hireschema",
    description: "An ATS Resume Scanner and Roaster that optimizes your resume for job posts and prepares you for interviews end-to-end.",
    image: "/Hireschema.png",
    link: "#",
    tags: ["Career Tool", "AI Resume Scanner"],
    colors: {
      text: "group-hover:text-orange-400",
      shadow: "hover:shadow-orange-500/10",
      icon: "text-orange-400"
    }
  },
  {
    title: "Kickofflist",
    description: "An extension of Limedock, a specialized system for SEO and GEO optimization for businesses.",
    image: "/Kickofflist.png",
    link: "#",
    tags: ["SEO Tool", "Business Growth"],
    colors: {
      text: "group-hover:text-green-400",
      shadow: "hover:shadow-green-500/10",
      icon: "text-green-400"
    }
  },
  {
    title: "Cofounderbase.com",
    description: "A cult community of founders and co-founders building leading products in the tech industry. Includes a private WhatsApp group.",
    image: "/Cofounderbase.png",
    link: "#",
    tags: ["Community", "Networking"],
    colors: {
      text: "group-hover:text-blue-400",
      shadow: "hover:shadow-blue-500/10",
      icon: "text-blue-400"
    }
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gray-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[124px] relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            Our Indigenous Live Products
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Check out the live websites and products built by our vibe coder team.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.a
              href={product.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-2xl ${product.colors.shadow}`}
            >
              {/* Image Container */}
              <div className="aspect-[16/9] w-full relative overflow-hidden bg-black/50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 transition-colors ${product.colors.text}`}>
                  {product.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {product.description}
                </p>

                <div className={`mt-6 flex items-center text-sm font-medium text-white transition-colors ${product.colors.text}`}>
                  Visit Website 
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
