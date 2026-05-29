"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#how-we-work", label: "Process" },
  { href: "#faqs", label: "FAQs" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={false}
          animate={{
            marginTop: isScrolled ? 12 : 16,
            width: isScrolled ? "min(960px, calc(100% - 24px))" : "min(1200px, calc(100% - 24px))",
            backgroundColor: isScrolled
              ? "rgba(20, 20, 20, 0.72)"
              : "rgba(20, 20, 20, 0.4)",
            borderColor: isScrolled
              ? "rgba(255, 255, 255, 0.10)"
              : "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(24px) saturate(1.4)",
          }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="pointer-events-auto flex items-center justify-between gap-4 px-3 py-2 rounded-full border"
          style={{
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            boxShadow: isScrolled
              ? "0 10px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
              : "0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
          }}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 pl-2 shrink-0">
            <Logo className="h-5 w-24 md:h-5 md:w-28" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 text-[14px] font-medium text-ink-muted">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-full hover:text-ink hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="hidden sm:inline-flex btn-ghost px-3 py-2"
            >
              Blog
            </Link>
            <a
              href="https://cal.com/limedock-admin-nb05ck/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Book a call</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsMobileOpen((v) => !v)}
              className="md:hidden ml-1 w-9 h-9 rounded-full bg-surface-1 border border-hairline grid place-items-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                {isMobileOpen ? (
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-[76px] z-40 md:hidden rounded-2xl border border-hairline bg-surface-1/95 backdrop-blur-xl p-4"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-3 py-3 text-ink text-[15px] font-medium rounded-md hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/blog"
                onClick={() => setIsMobileOpen(false)}
                className="px-3 py-3 text-ink text-[15px] font-medium rounded-md hover:bg-white/5"
              >
                Blog
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
