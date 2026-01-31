'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-8 w-full">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 xl:px-[124px]">
        
        {/* CTA Section */}
        <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-5xl md:text-[80px] font-bold mb-6 tracking-tight leading-none">
                Ready to build<br />
                <span className="text-gray-500">something great?</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed">
                Let&apos;s turn your idea into a world-class digital product.
            </p>
            
            <button className="group relative inline-flex items-center gap-3 bg-[#E8E700] text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-[#E8E700]/90 transition-all duration-300 hover:scale-105">
                <span>Book an intro call</span>
                <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center text-black group-hover:bg-black/20 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </button>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-white/10 pt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-4 space-y-6">
                <div className="brightness-0 invert opacity-90">
                    <Logo className="h-8 w-40" />
                </div>
                <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                    A modern tech agency helping teams design, develop, and grow digital products.
                </p>
            </div>

            {/* Spacer */}
            <div className="hidden md:block md:col-span-2"></div>

            {/* Links Columns */}
            <div className="md:col-span-2">
                <h4 className="font-bold text-white mb-6 text-lg">Explore</h4>
                <ul className="space-y-4 text-gray-400">
                    <li><Link href="#work" className="hover:text-[#E8E700] transition-colors">Work</Link></li>
                    <li><Link href="#services" className="hover:text-[#E8E700] transition-colors">Services</Link></li>
                    <li><Link href="#how-we-work" className="hover:text-[#E8E700] transition-colors">Process</Link></li>
                    <li><Link href="#faqs" className="hover:text-[#E8E700] transition-colors">FAQs</Link></li>
                </ul>
            </div>

            <div className="md:col-span-2">
                <h4 className="font-bold text-white mb-6 text-lg">Socials</h4>
                <ul className="space-y-4 text-gray-400">
                    <li><a href="#" className="hover:text-[#E8E700] transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-[#E8E700] transition-colors">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-[#E8E700] transition-colors">Instagram</a></li>
                </ul>
            </div>
             
             {/* Contact */}
            <div className="md:col-span-2">
                 <h4 className="font-bold text-white mb-6 text-lg">Contact</h4>
                 <a href="mailto:hello@limedock.com" className="text-gray-400 hover:text-[#E8E700] transition-colors block mb-2">hello@limedock.com</a>
                 <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm gap-4">
            <p>&copy; {new Date().getFullYear()} LimeDock. All rights reserved.</p>
            <div className="flex gap-8">
                <Link href="#" className="hover:text-[#E8E700] transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-[#E8E700] transition-colors">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
