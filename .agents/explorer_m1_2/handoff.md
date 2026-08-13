# Handoff Report: Milestone 1 — Layout & Global Wrapper Investigation

## 1. Observation
- **Reference Pattern in `src/app/real-estate-services/page.tsx`**:
  Lines 63-74 of `src/app/real-estate-services/page.tsx`:
  ```tsx
  export default function RealEstateServicesPage() {
    return (
      <main className="min-h-screen bg-canvas text-body">
        <JsonLd data={jsonLd} />
        <ScrollProgress />
        <CursorBlob />
        <Navbar />
        <RealEstateLandingContent />
        <Footer />
      </main>
    );
  }
  ```
  The layout imports global components (`Navbar`, `Footer`, `JsonLd`, `ScrollProgress`, `CursorBlob`) and wraps the entire page in `<main className="min-h-screen bg-canvas text-body">`.

- **Current State of `src/app/law-firms/page.tsx`**:
  Lines 57-63 of `src/app/law-firms/page.tsx`:
  ```tsx
  export default function LawFirmsPage() {
    return (
      <>
        <JsonLd data={jsonLd} />
        <LawFirmsLandingContent />
      </>
    );
  }
  ```
  `src/app/law-firms/page.tsx` is missing `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, and the `<main className="min-h-screen bg-canvas text-body">` wrapper element.

- **Design Token Classes in `src/app/globals.css`**:
  - `bg-canvas` (`var(--canvas)`, line 14 & 56)
  - `text-body` (`var(--body)`, line 24 & 64)
  - `text-ink` (`var(--ink)`, line 23 & 63)
  - `container-air` (line 324: `width: min(1280px, calc(100% - 48px)); margin-inline: auto;`)
  - `section-air` (line 329: `padding-block: 96px;`)
  - `eyebrow` (line 306: `inline-flex items-center gap: 9px; font-size: 14px; font-weight: 500;`)
  - `dot` (line 317: `width: 7px; height: 7px; border-radius: 9999px; background: var(--primary);`)
  - `text-display-xl` (line 152: `font-size: clamp(40px, 5.4vw, 48px); line-height: 1.1; font-weight: 500;`)
  - `text-display-lg` (line 160: `font-size: clamp(34px, 4.5vw, 40px); line-height: 1.2; font-weight: 400;`)
  - `text-display-md` (line 168: `font-size: clamp(28px, 3.5vw, 32px); line-height: 1.2; font-weight: 400;`)
  - `btn-primary` (line 251: primary dark button)
  - `btn-secondary` (line 270: secondary outline button)

---

## 2. Logic Chain
1. **Observation 1**: `src/app/real-estate-services/page.tsx` establishes the canonical standard for landing page layouts in this codebase, incorporating `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, and `JsonLd` inside `<main className="min-h-screen bg-canvas text-body">`.
2. **Observation 2**: `src/app/law-firms/page.tsx` currently lacks `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, and `<main>` wrapper, causing header/footer and background styling inconsistencies on `/law-firms`.
3. **Observation 3**: Updating `src/app/law-firms/page.tsx` to include `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, and `<main className="min-h-screen bg-canvas text-body">` guarantees complete visual and structural alignment across landing pages.
4. **Observation 4**: Creating `src/app/law-firms/LawFirmsLandingContent.tsx` as a `"use client"` skeleton using LimeDock design tokens (`container-air`, `section-air`, `eyebrow`, `dot`, `text-display-md`, `bg-canvas`, etc.) provides a clean, build-ready foundation for Milestone 2 (Content & Framer Motion Scroll Animations) and Milestone 3 (Lead Form Integration).

---

## 3. Caveats
- No caveats. The layout wrapper and token usage pattern match the production standards set in `src/app/real-estate-services/page.tsx` and `src/app/globals.css`.

---

## 4. Conclusion & Implementation Plan

### Implementation Plan Summary
1. Update `src/app/law-firms/page.tsx` to import and render `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, and wrap content in `<main className="min-h-screen bg-canvas text-body">`.
2. Update `src/app/law-firms/LawFirmsLandingContent.tsx` skeleton with `"use client"`, `export default function LawFirmsLandingContent()`, and structure sections matching the 6 required redesign titles using LimeDock design tokens.

---

### Exact Code Proposals

#### Proposed `src/app/law-firms/page.tsx`
```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CursorBlob from "@/components/motion/CursorBlob";
import LawFirmsLandingContent from "./LawFirmsLandingContent";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Law Firm Workflow Automation & AI Systems | LimeDock";
const description =
  "Custom owned workflow automations and AI infrastructure for law firms. Automate intake, client updates, matter follow-ups, and referral tracking in Slack & CRM.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/law-firms",
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/law-firms"),
    type: "website",
    siteName: "LimeDock",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: absoluteUrl("/law-firms"),
  isPartOf: {
    "@type": "WebSite",
    name: "LimeDock",
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "Service",
    name: "Law Firm Workflow Automation",
    provider: {
      "@type": "Organization",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    description:
      "Owned workflow automations for law firms including intake processing, client updates, matter follow-ups, and referral tracking.",
  },
  offers: {
    "@type": "Offer",
    name: "Book a Law Firm Workflow Call",
    url: BOOK_DEMO_URL,
  },
};

export default function LawFirmsPage() {
  return (
    <main className="min-h-screen bg-canvas text-body">
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <CursorBlob />
      <Navbar />
      <LawFirmsLandingContent />
      <Footer />
    </main>
  );
}
```

#### Proposed `src/app/law-firms/LawFirmsLandingContent.tsx` Skeleton
```tsx
"use client";

import React from "react";
import Link from "next/link";
import { BOOK_DEMO_URL } from "@/lib/site";

export default function LawFirmsLandingContent() {
  return (
    <div className="bg-canvas text-body">
      {/* ── SECTION 1: Custom AI Infrastructure ── */}
      <section className="section-air relative overflow-hidden bg-canvas">
        <div className="container-air">
          <div className="max-w-3xl">
            <span className="eyebrow">
              <span className="dot" />
              Custom AI Infrastructure for your firm
            </span>
            <h1 className="text-display-xl text-ink mt-6 font-display">
              A Custom AI Infrastructure for your firm
            </h1>
            <p className="text-body-md text-muted mt-6 text-lg max-w-xl leading-[1.65]">
              LimeDock designs and deploys custom, owned workflow systems for law firms — automated intake, client updates, matter follow-ups, and referral tracking.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get Customized Workflow
              </a>
              <Link
                href="#lead-form"
                className="btn-secondary"
              >
                Explore Workflows ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Win More Business ── */}
      <section className="section-air bg-surface-soft border-t border-hairline">
        <div className="container-air">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">
              <span className="dot" />
              Business Growth
            </span>
            <h2 className="text-display-lg text-ink mt-4 font-display">
              That Helps you to Win More of the Right Business
            </h2>
            <p className="text-body-md text-body mt-4 leading-[1.65]">
              Streamline prospect intake and referral response loops so high-value clients never slip through the cracks.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Do Your Best Legal Work ── */}
      <section className="section-air bg-canvas border-t border-hairline">
        <div className="container-air">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">
              <span className="dot" />
              Practice Automation
            </span>
            <h2 className="text-display-lg text-ink mt-4 font-display">
              Do your best legal work
            </h2>
            <p className="text-body-md text-body mt-4 leading-[1.65]">
              Eliminate admin friction and associate archaeology. Focus your billable hours on high-value legal strategy.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Sync Employee Devices ── */}
      <section className="section-air bg-surface-dark text-on-dark border-t border-hairline">
        <div className="container-air">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow !text-white/60">
              <span className="dot !bg-white" />
              Seamless Integration
            </span>
            <h2 className="text-display-lg text-white mt-4 font-display">
              Sync all your Employee Devices
            </h2>
            <p className="text-white/70 text-body-md mt-4 leading-[1.65]">
              Real-time updates delivered straight to Slack, mobile devices, and practice management tools.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Run Firm Without Busywork ── */}
      <section className="section-air bg-surface-soft border-t border-hairline">
        <div className="container-air">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">
              <span className="dot" />
              Operational Efficiency
            </span>
            <h2 className="text-display-lg text-ink mt-4 font-display">
              Run the Firm Without the Busywork
            </h2>
            <p className="text-body-md text-body mt-4 leading-[1.65]">
              Automate matter chase sequences, missing document follow-ups, and partner status digests.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: And Much More ── */}
      <section className="section-air bg-canvas border-t border-hairline">
        <div className="container-air">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">
              <span className="dot" />
              Platform Scope
            </span>
            <h2 className="text-display-lg text-ink mt-4 font-display">
              And Much More
            </h2>
            <p className="text-body-md text-body mt-4 leading-[1.65]">
              Custom Slack commands, automated client updates, and custom analytics dashboards tailored to your firm.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Lead Capture Form Anchor ── */}
      <section id="lead-form" className="section-air bg-surface-soft border-t border-hairline">
        <div className="container-air">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow justify-center">
              <span className="dot" />
              Get Started
            </span>
            <h2 className="text-display-md text-ink mt-4 font-display">
              Request Your Customized Workflow
            </h2>
            <p className="text-body-md text-body mt-4">
              Lead capture form placeholder for M3.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 5. Verification Method

### 1. Build Verification
Run the build command to ensure zero TypeScript or Next.js build errors:
```bash
npm run build
```

### 2. Layout & Token Inspection
- Verify that `src/app/law-firms/page.tsx` imports and renders `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, `JsonLd`, and `LawFirmsLandingContent` wrapped in `<main className="min-h-screen bg-canvas text-body">`.
- Verify that `src/app/law-firms/LawFirmsLandingContent.tsx` uses `"use client"` and standard LimeDock classes (`container-air`, `section-air`, `eyebrow`, `dot`, `text-display-md`, `bg-canvas`, `btn-primary`).

### 3. Invalidation Conditions
- If `npm run build` fails due to missing imports or syntax errors.
- If global components (`Navbar`, `Footer`, etc.) are missing from the rendered `/law-firms` DOM layout.
