"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.nav
        layout
        initial={{ width: "100%", maxWidth: "1440px" }}
        animate={{
          width: isScrolled ? "auto" : "100%",
          maxWidth: isScrolled ? "100%" : "1440px",
          marginTop: isScrolled ? (isMobile ? "16px" : "30px") : "0px",
          y: 0,
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.7)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          borderRadius: isScrolled ? "12px" : "0px",
          border: isScrolled ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid transparent",
          paddingLeft: isMobile ? "16px" : "24px",
          paddingRight: isScrolled ? "8px" : (isMobile ? "16px" : "24px"),
          paddingTop: isScrolled ? "8px" : (isMobile ? "16px" : "24px"),
          paddingBottom: isScrolled ? "8px" : (isMobile ? "16px" : "24px"),
          boxShadow: isScrolled 
            ? "0 8px 32px 0 rgba(31, 38, 135, 0.07)" 
            : "none",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
        className="flex items-center justify-between gap-4 mx-auto pointer-events-auto"
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1.5">
            <Logo className="h-5 w-28 md:h-6 md:w-36 transition-all duration-300" />
          </Link>
        </div>

        <div className={`hidden md:flex items-center ${isScrolled ? 'space-x-8 mx-8' : 'space-x-12'} text-[16px] font-medium text-[#1A1A1A] transition-all duration-300`}>
          <Link href="#work" className="hover:opacity-70 transition-opacity">
            Work
          </Link>
          <Link href="#how-we-work" className="hover:opacity-70 transition-opacity">
            Process
          </Link>
          <Link href="#faqs" className="hover:opacity-70 transition-opacity">
            FAQs
          </Link>
        </div>

        <div>
          <a 
            href="https://cal.com/limedock-admin-nb05ck/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-black text-white px-4 py-2 rounded-[10px] text-[14px] font-bold hover:bg-gray-900 transition-colors cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-4 h-4">
               <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <g clipPath="url(#clip0_829_268)">
                     <path d="M11.3125 8.00012L13.2622 10.1668L15.8839 11.7957L16.3411 8.01345L15.8839 4.31567L13.2119 5.74679L11.3125 8.00012Z" fill="#00832D"/>
                     <path d="M0 11.4445V14.6667C0 15.4034 0.613714 16.0001 1.37143 16.0001H4.68571L5.37143 13.5645L4.68571 11.4445L2.41143 10.7778L0 11.4445Z" fill="#0066DA"/>
                     <path d="M4.68571 0L0 4.55556L2.41143 5.22222L4.68571 4.55556L5.36 2.46444L4.68571 0Z" fill="#E94235"/>
                     <path d="M4.68571 4.55566H0V11.4446H4.68571V4.55566Z" fill="#2684FC"/>
                     <path d="M18.8818 1.92881L15.8875 4.31548V11.7955L18.8955 14.1933C19.3458 14.5355 20.0041 14.2233 20.0041 13.6666V2.44437C20.0041 1.88103 19.3309 1.57214 18.8818 1.92881ZM11.3161 7.99992V11.4444H4.6875V15.9999H14.5161C15.2738 15.9999 15.8875 15.4033 15.8875 14.6666V11.7955L11.3161 7.99992Z" fill="#00AC47"/>
                     <path d="M14.5161 0H4.6875V4.55556H11.3161V8L15.8875 4.31778V1.33333C15.8875 0.596667 15.2738 0 14.5161 0Z" fill="#FFBA00"/>
                  </g>
                  <defs>
                     <clipPath id="clip0_829_268">
                        <rect width="20" height="16" fill="white"/>
                     </clipPath>
                  </defs>
               </svg>
            </div>
            <span className={isScrolled ? "hidden lg:inline" : "inline"}>Book a call</span>
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
