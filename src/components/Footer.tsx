"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import Magnetic from "./motion/Magnetic";
import MarqueeBig from "./motion/MarqueeBig";

const footerGroups = [
  {
    title: "Platform",
    links: [
      ["Work", "#work"],
      ["Services", "#services"],
      ["Capabilities", "#capabilities"],
      ["Process", "#how-we-work"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Startup websites", "#capabilities"],
      ["Product design", "#capabilities"],
      ["Brand systems", "#capabilities"],
      ["Pitch decks", "#capabilities"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/blog"],
      ["FAQs", "#faqs"],
      ["Products", "#products"],
      ["Book demo", "https://cal.com/limedock-admin-nb05ck/30min"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Twitter", "https://x.com/limedock"],
      ["LinkedIn", "https://www.linkedin.com/company/limedock/"],
      ["Instagram", "https://www.instagram.com/limedock_agency/"],
      ["Email", "mailto:ranjeet@limedock.com"],
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-canvas pb-10">
      <div className="container-air">
        {/* CTA band with shimmer */}
        <section className="cta-band-light rounded-lg bg-surface-strong p-8 md:p-12 mb-16 relative overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-2xl animate-scan"
          />
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center relative">
            <div>
              <span className="eyebrow">
                <span className="dot" />
                Start the conversation
              </span>
              <h2 className="text-display-md text-ink mt-5 max-w-xl">
                Start building with a studio that thinks like an operator.
              </h2>
              <p className="text-body-md text-body mt-4 max-w-lg leading-[1.55]">
                Bring a messy idea, half-built product, or growth bottleneck.
                We will map the fastest useful next step.
              </p>
            </div>
            <Magnetic strength={14} className="inline-block">
              <a
                href="https://cal.com/limedock-admin-nb05ck/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                Sign up for free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </section>

        {/* Giant brand mark */}
        <div className="mb-12 -mx-6">
          <MarqueeBig text="LIMEDOCK · STUDIO" />
        </div>

        {/* Link grid */}
        <div className="border-t border-hairline pt-12 grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-4">
            <Logo className="h-6 w-[141px]" />
            <p className="text-body-md text-body mt-6 max-w-xs leading-[1.55]">
              A modern tech agency helping teams design, develop, and grow
              digital products end-to-end.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-caption text-muted">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-60" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Accepting new projects
            </div>
          </div>

          <div className="hidden md:block md:col-span-1" />

          {footerGroups.map((group) => (
            <div key={group.title} className="md:col-span-1 lg:col-span-2">
              <h3 className="text-caption text-ink mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map(([label, href]) => {
                  const external =
                    href.startsWith("http") || href.startsWith("mailto:");
                  const className =
                    "text-body-md text-muted focus-ring rounded-sm relative group inline-block";
                  return (
                    <li key={label}>
                      {external ? (
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className={className}
                        >
                          <span className="transition-colors group-hover:text-ink">
                            {label}
                          </span>
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                        </a>
                      ) : (
                        <Link href={href} className={className}>
                          <span className="transition-colors group-hover:text-ink">
                            {label}
                          </span>
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-hairline flex flex-col md:flex-row justify-between gap-4 text-body-md text-muted">
          <p>
            &copy; {new Date().getFullYear()} LimeDock. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="focus-ring rounded-sm hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link href="#" className="focus-ring rounded-sm hover:text-ink transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
