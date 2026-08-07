"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StartExperienceButton from "./StartExperienceButton";

const NAV_LINKS = [
  { href: "#collapse", label: "The math" },
  { href: "#services", label: "Approach" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#system", label: "System" },
  { href: "#how-we-work", label: "Process" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          borderColor: isScrolled ? "rgba(221,221,221,1)" : "rgba(221,221,221,0)",
          boxShadow: isScrolled ? "0 1px 0 rgba(24,29,38,0.04)" : "none",
        }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 top-0 z-50 border-b bg-canvas/92 backdrop-blur-xl"
      >
        <nav className="container-air h-16 flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0 focus-ring rounded-sm">
            <Logo className="h-6 w-[141px]" />
          </Link>

          <div className="hidden lg:flex items-center gap-7 text-body-md text-ink">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="focus-ring rounded-sm">
                {link.label}
              </Link>
            ))}
            <Link href="/directories" className="focus-ring rounded-sm">
              Directories
            </Link>
            <Link href="/blog" className="focus-ring rounded-sm">
              Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <StartExperienceButton variant="ghost" label="View all works" />
            <a
              href="https://cal.com/limedock-admin-nb05ck/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !min-h-10 !px-4 !py-2 !text-body-md"
            >
              Book demo
            </a>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((value) => !value)}
            className="md:!hidden button-icon-circular focus-ring"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-canvas pt-24 px-6 md:hidden"
          >
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col gap-1"
            >
              {[
                ...NAV_LINKS,
                { href: "/directories", label: "Directories" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="border-b border-hairline py-5 text-title-lg text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-8 grid gap-3">
                <StartExperienceButton
                  variant="ghost"
                  label="View all works"
                  className="w-full justify-center"
                />
                <a
                  href="https://cal.com/limedock-admin-nb05ck/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Book demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
