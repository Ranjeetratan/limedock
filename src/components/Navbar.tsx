"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface NavChildItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChildItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Platform",
    children: [
      { label: "Approach", href: "/#collapse", description: "The collapse of traditional SaaS" },
      { label: "Capabilities", href: "/#services", description: "Autonomous AI enterprise agents" },
      { label: "The Math", href: "/#capabilities", description: "Unit economics and efficiency" },
      { label: "System", href: "/#system", description: "Integrated agentic infrastructure" },
      { label: "Process", href: "/#how-we-work", description: "From discovery to deployment" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Law Firms", href: "/#services", description: "Legal document analysis and automation" },
      { label: "Real Estate", href: "/#services", description: "Portfolio intelligence and processing" },
      { label: "Custom Workflows", href: "/#services", description: "Tailored enterprise solutions" },
    ],
  },
  {
    label: "Works",
    href: "/works",
  },
  {
    label: "Resources",
    children: [
      { label: "Trending Agents", href: "/trending-agents", description: "Top performing AI workforce" },
      { label: "Directories", href: "/directories", description: "Ecosystem and tool integrations" },
      { label: "Blog", href: "/blog", description: "Insights, updates, and research" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLDivElement>(null);

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

  // Click outside and global Escape key handler for dropdowns
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label));
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const toSlug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

  const handleTriggerKeyDown = (e: React.KeyboardEvent, item: NavItem) => {
    const slug = toSlug(item.label);
    if (!item.children || item.children.length === 0) return;

    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenDropdown(item.label);
      setTimeout(() => {
        document.getElementById(`nav-menuitem-${slug}-0`)?.focus();
      }, 20);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpenDropdown(item.label);
      const lastIndex = item.children.length - 1;
      setTimeout(() => {
        document.getElementById(`nav-menuitem-${slug}-${lastIndex}`)?.focus();
      }, 20);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpenDropdown(null);
    }
  };

  const handleMenuItemKeyDown = (
    e: React.KeyboardEvent,
    item: NavItem,
    index: number
  ) => {
    if (!item.children) return;
    const total = item.children.length;
    const slug = toSlug(item.label);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (index + 1) % total;
      document.getElementById(`nav-menuitem-${slug}-${nextIdx}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (index - 1 + total) % total;
      document.getElementById(`nav-menuitem-${slug}-${prevIdx}`)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      document.getElementById(`nav-menuitem-${slug}-0`)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      document.getElementById(`nav-menuitem-${slug}-${total - 1}`)?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpenDropdown(null);
      document.getElementById(`nav-item-${slug}`)?.focus();
    } else if (e.key === "Tab") {
      setOpenDropdown(null);
    }
  };

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
        <nav className="container-air h-16 flex items-center justify-between gap-4 lg:gap-6" aria-label="Main Navigation">
          {/* Brand Logo */}
          <Link href="/" className="shrink-0 focus-ring rounded-sm" aria-label="Limedock Homepage">
            <Logo className="h-6 w-[141px]" />
          </Link>

          {/* Desktop Navigation Menu (5 top-level items) */}
          <div
            ref={navRef}
            className="hidden md:flex items-center gap-1 lg:gap-2 text-body-md text-ink"
          >
            {NAV_ITEMS.map((item) => {
              const slug = toSlug(item.label);
              const isOpen = openDropdown === item.label;

              if (item.children) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      id={`nav-item-${slug}`}
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-controls={`nav-dropdown-${slug}`}
                      onClick={() => toggleDropdown(item.label)}
                      onKeyDown={(e) => handleTriggerKeyDown(e, item)}
                      className="group inline-flex items-center gap-1 px-3 py-2 text-body-md text-ink hover:text-ink/80 focus-ring rounded-md transition-colors font-medium cursor-pointer select-none"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-ink" : ""
                        }`}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`nav-dropdown-${slug}`}
                          role="menu"
                          aria-labelledby={`nav-item-${slug}`}
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-1.5 min-w-[280px] bg-canvas/98 backdrop-blur-xl border border-hairline rounded-xl shadow-xl p-2 z-50 focus:outline-none"
                        >
                          {item.children.map((child, index) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              role="menuitem"
                              id={`nav-menuitem-${slug}-${index}`}
                              tabIndex={0}
                              onClick={() => setOpenDropdown(null)}
                              onKeyDown={(e) => handleMenuItemKeyDown(e, item, index)}
                              className="group flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-surface-soft focus:bg-surface-soft focus:outline-none transition-colors"
                            >
                              <span className="text-body-md font-medium text-ink group-hover:text-primary transition-colors">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="text-caption text-muted text-xs leading-snug">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-3 py-2 text-body-md text-ink hover:text-ink/80 focus-ring rounded-md transition-colors font-medium"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Call to Action button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://cal.com/limedock-admin-nb05ck/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !min-h-10 !px-4 !py-2 !text-body-md"
            >
              Book demo
            </a>
          </div>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setIsMobileOpen((value) => !value)}
            className="md:!hidden button-icon-circular focus-ring"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {isMobileOpen ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
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

      {/* Mobile Navigation Drawer with Accordions */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-canvas pt-20 px-6 pb-8 md:hidden overflow-y-auto"
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col"
            >
              {NAV_ITEMS.map((item) => {
                const slug = toSlug(item.label);
                const isExpanded = !!mobileExpanded[item.label];

                if (item.children) {
                  return (
                    <div key={item.label} className="border-b border-hairline py-1">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-accordion-${slug}`}
                        onClick={() => toggleMobileAccordion(item.label)}
                        className="flex items-center justify-between w-full py-3.5 text-title-md text-ink font-normal text-left focus-ring rounded-sm cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-5 h-5 text-muted transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-ink" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`mobile-accordion-${slug}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            className="overflow-hidden bg-surface-soft/60 rounded-xl my-1.5"
                          >
                            <div className="py-2 px-2 flex flex-col gap-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="flex flex-col py-2 px-3 rounded-lg hover:bg-surface-strong/40 transition-colors focus-ring"
                                >
                                  <span className="text-body-md font-medium text-ink">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="text-caption text-muted text-xs mt-0.5">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setIsMobileOpen(false)}
                    className="border-b border-hairline py-4 text-title-md text-ink font-normal hover:text-primary transition-colors focus-ring rounded-sm"
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-8 grid gap-3">
                <a
                  href="https://cal.com/limedock-admin-nb05ck/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
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
