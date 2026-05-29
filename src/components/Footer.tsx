'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export default function Footer() {
  return (
    <footer className="relative bg-canvas text-ink pt-16 pb-10 w-full">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Big CTA card — gradient spotlight */}
        <div className="relative overflow-hidden rounded-[30px] bg-spot-violet border border-white/15 p-10 md:p-16 mb-20">
          {/* Atmospheric highlights */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, rgba(255,255,255,0.18), transparent 60%)",
            }}
          />
          <div className="relative z-10 flex flex-col items-start md:items-center md:text-center gap-7">
            <span className="text-caption text-white/70 uppercase tracking-wider">
              Let&apos;s build something
            </span>
            <h2 className="font-display text-display-xl text-white max-w-3xl">
              Ready to ship<br />
              <span className="text-white/70">something great?</span>
            </h2>
            <p className="text-subhead text-white/80 max-w-xl">
              30-minute intro call. We&apos;ll talk through the work, fit, and where
              we can help — no slides, no pitch.
            </p>
            <div className="flex flex-wrap gap-3 mt-2 justify-start md:justify-center">
              <a
                href="https://cal.com/limedock-admin-nb05ck/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book an intro call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="mailto:ranjeet@limedock.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/25 bg-white/10 text-white text-[14px] font-semibold hover:bg-white/15 transition-colors"
              >
                Email us instead
              </a>
            </div>
          </div>
        </div>

        {/* Footer link grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-hairline-soft">
          <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
            <Logo className="h-6 w-32" />
            <p className="text-body text-ink-muted max-w-xs leading-relaxed">
              A modern tech agency helping teams design, develop, and grow
              digital products end-to-end.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-caption text-ink-muted">Accepting new projects</span>
            </div>
          </div>

          <div className="md:col-span-1 hidden md:block" />

          <div className="md:col-span-2">
            <h4 className="text-caption text-ink-muted uppercase tracking-wider mb-5">Explore</h4>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="#work" className="text-ink hover:text-accent-blue transition-colors">Work</Link></li>
              <li><Link href="#services" className="text-ink hover:text-accent-blue transition-colors">Services</Link></li>
              <li><Link href="#how-we-work" className="text-ink hover:text-accent-blue transition-colors">Process</Link></li>
              <li><Link href="#faqs" className="text-ink hover:text-accent-blue transition-colors">FAQs</Link></li>
              <li><Link href="/blog" className="text-ink hover:text-accent-blue transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-caption text-ink-muted uppercase tracking-wider mb-5">Social</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a href="https://x.com/limedock" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent-blue transition-colors">Twitter</a></li>
              <li><a href="https://www.linkedin.com/company/limedock/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent-blue transition-colors">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/limedock_agency/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent-blue transition-colors">Instagram</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-caption text-ink-muted uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a href="mailto:ranjeet@limedock.com" className="text-ink hover:text-accent-blue transition-colors">ranjeet@limedock.com</a></li>
              <li><a href="tel:+917903959739" className="text-ink hover:text-accent-blue transition-colors">+91 7903959739</a></li>
              <li className="text-ink-muted">Based in India, working globally</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-caption text-ink-muted">
          <p>&copy; {new Date().getFullYear()} LimeDock. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-ink transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
