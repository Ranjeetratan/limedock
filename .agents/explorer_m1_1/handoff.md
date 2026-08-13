# Handoff Report — Explorer 1 (Milestone 1: Layout & Global Wrapper)

## 1. Observation
1. **Target File Analysis**:
   - `src/app/real-estate-services/page.tsx` (lines 1-75): Implements full global layout wrapper pattern:
     ```tsx
     <main className="min-h-screen bg-canvas text-body">
       <JsonLd data={jsonLd} />
       <ScrollProgress />
       <CursorBlob />
       <Navbar />
       <RealEstateLandingContent />
       <Footer />
     </main>
     ```
   - `src/app/law-firms/page.tsx` (lines 57-64): Currently missing `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, and `<main className="min-h-screen bg-canvas text-body">` container:
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
   - `src/app/law-firms/LawFirmsLandingContent.tsx` (lines 1-430): Client component currently containing legacy content; needs refactoring to a clean, minimal skeleton aligned with the 6 redesign sections specified in `PROJECT.md` and `SCOPE.md`.

2. **Design Tokens & System (`src/app/globals.css`)**:
   - Palette Tokens: `--canvas` (`#ffffff`), `--surface-soft` (`#f8fafc`), `--surface-dark` (`#181d26`), `--hairline` (`#dddddd`), `--ink` (`#181d26`), `--body` (`#333840`), `--muted` (`#41454d`).
   - Utility Classes: `.container-air` (max-w 1280px, responsive padding), `.section-air` (padding-block 96px/72px), `.eyebrow`, `.dot`, `.text-display-xl`, `.text-display-lg`, `.text-display-md`, `.text-title-lg`, `.text-title-md`, `.text-body-md`, `.btn-primary`, `.btn-secondary`, `.ui-window`.

3. **Build Status**:
   - `npm run build` executed successfully (exited with code 0). Zero TypeScript or linting errors.

---

## 2. Logic Chain
1. *Observation*: `src/app/real-estate-services/page.tsx` serves as the benchmark page structure for LimeDock vertical landing pages.
2. *Deduction*: `src/app/law-firms/page.tsx` must adopt the exact same wrapper pattern (`Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, `JsonLd`, and `main.min-h-screen.bg-canvas.text-body`) to maintain global UI consistency, responsive navigation, scroll progress tracking, and cursor blob effects.
3. *Observation*: The 6 redesign sections defined in `ORIGINAL_REQUEST.md` and `PROJECT.md` are:
   - Section 1: "A Custom AI Infrastructure for your firm"
   - Section 2: "That Helps you to Win More of the Right Business"
   - Section 3: "Do your best legal work"
   - Section 4: "Sync all your Employee Devices"
   - Section 5: "Run the Firm Without the Busywork"
   - Section 6: "And Much More"
   - Lead Capture Form container (`#lead-capture-form`)
4. *Deduction*: `src/app/law-firms/LawFirmsLandingContent.tsx` skeleton must define these 6 section containers using LimeDock layout tokens (`container-air`, `bg-canvas`, `bg-surface-soft`, `bg-surface-dark`, `eyebrow`, `text-display-md`, etc.), providing a solid foundation for Milestone 2 (Scroll Animations) and Milestone 3 (Lead Capture Form).

---

## 3. Caveats
- Milestone 1 focuses on global layout wrapper refactoring and content skeleton structure. Scroll animations (`framer-motion` variants) and external lead capture form submission (`Web3Forms`) will be fully implemented in Milestones 2 and 3 respectively.
- No caveats.

---

## 4. Conclusion & Proposed Code Plan

### A. Code for `src/app/law-firms/page.tsx`

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CursorBlob from "@/components/motion/CursorBlob";
import LawFirmsLandingContent from "./LawFirmsLandingContent";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Law Firm Workflow Automation & AI Infrastructure | LimeDock";
const description =
  "LimeDock automates intake, client updates, matter follow-ups, and referral tracking for law firms — custom, owned AI workflows in Slack and your CRM.";

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
    name: "Law Firm Workflow Automation & AI Infrastructure",
    provider: {
      "@type": "Organization",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    description:
      "Custom owned workflow automations for law firms including matter intake, client update digests, referral tracking loops, and cross-device sync.",
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

### B. Code for `src/app/law-firms/LawFirmsLandingContent.tsx` Skeleton

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BOOK_DEMO_URL } from "@/lib/site";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function LawFirmsLandingContent() {
  return (
    <div className="bg-canvas text-body min-h-screen">
      {/* ── SECTION 1: A Custom AI Infrastructure for your firm ── */}
      <section className="relative min-h-[90vh] flex items-center py-24 md:py-32 overflow-hidden bg-canvas">
        <div className="container-air relative z-10">
          <span className="eyebrow mb-6">
            <span className="dot" />
            Law Firm AI Infrastructure
          </span>
          <h1 className="text-display-xl text-ink max-w-4xl font-medium tracking-tight">
            A Custom AI Infrastructure for your firm
          </h1>
          <p className="text-muted text-title-md mt-6 max-w-2xl leading-relaxed">
            LimeDock builds and deploys custom, owned workflow automation systems for law firms — automated intake, client updates, matter follow-ups, and referral tracking wired directly into Slack and CRM.
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
            <Link href="#lead-capture-form" className="btn-secondary">
              Request Firm Audit
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: That Helps you to Win More of the Right Business ── */}
      <section className="py-24 md:py-32 bg-surface-soft border-y border-hairline">
        <div className="container-air">
          <div className="max-w-3xl">
            <span className="eyebrow mb-4">
              <span className="dot" />
              High-Value Intake & Conversion
            </span>
            <h2 className="text-display-lg text-ink font-medium">
              That Helps you to Win More of the Right Business
            </h2>
            <p className="text-body text-title-sm mt-4 leading-relaxed">
              Capture web inquiries instantly, validate intake criteria, eliminate missing fields, and route high-intent leads to senior partners before competitors respond.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Do your best legal work ── */}
      <section className="py-24 md:py-32 bg-canvas">
        <div className="container-air">
          <div className="max-w-3xl">
            <span className="eyebrow mb-4">
              <span className="dot" />
              Operational Excellence
            </span>
            <h2 className="text-display-lg text-ink font-medium">
              Do your best legal work
            </h2>
            <p className="text-body text-title-sm mt-4 leading-relaxed">
              Remove non-billable administrative archaeology. Automatic matter status updates, document reminders, and conflict check notifications keep your legal team focused on high-value practice.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Sync all your Employee Devices ── */}
      <section className="py-24 md:py-32 bg-surface-soft border-y border-hairline">
        <div className="container-air">
          <div className="max-w-3xl">
            <span className="eyebrow mb-4">
              <span className="dot" />
              Connected Firm Operations
            </span>
            <h2 className="text-display-lg text-ink font-medium">
              Sync all your Employee Devices
            </h2>
            <p className="text-body text-title-sm mt-4 leading-relaxed">
              Unify calendar events, email communications, mobile Slack updates, and desktop CRM records in real-time across partners, associates, and administrative staff.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Run the Firm Without the Busywork ── */}
      <section className="py-24 md:py-32 bg-canvas">
        <div className="container-air">
          <div className="max-w-3xl">
            <span className="eyebrow mb-4">
              <span className="dot" />
              Automated Operations
            </span>
            <h2 className="text-display-lg text-ink font-medium">
              Run the Firm Without the Busywork
            </h2>
            <p className="text-body text-title-sm mt-4 leading-relaxed">
              Automate weekly client digests, engagement letter reminders, referral thank-you notes, and marketing touchpoints on autopilot.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: And Much More ── */}
      <section className="py-24 md:py-32 bg-surface-dark text-on-dark">
        <div className="container-air">
          <div className="max-w-3xl">
            <span className="eyebrow text-white/70 mb-4">
              <span className="dot bg-white" />
              Extensible Platform
            </span>
            <h2 className="text-display-lg text-white font-medium">
              And Much More
            </h2>
            <p className="text-white/80 text-title-sm mt-4 leading-relaxed">
              Custom webhooks, practice management integrations, automated billing alerts, and tailored reporting dashboards built for your firm's exact practice areas.
            </p>
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM CONTAINER (Milestone 3 Target) ── */}
      <section id="lead-capture-form" className="py-24 md:py-32 bg-canvas border-t border-hairline">
        <div className="container-air max-w-4xl">
          <div className="ui-window p-8 md:p-12">
            <span className="eyebrow mb-4">
              <span className="dot" />
              Customized Workflow Request
            </span>
            <h2 className="text-display-md text-ink font-medium">
              Get Customized Workflow
            </h2>
            <p className="text-muted text-body-md mt-2 mb-8">
              Tell us about your law firm to receive a tailored automation audit and workflow design.
            </p>
            {/* Lead capture form component to be mounted here in Milestone 3 */}
            <div className="p-6 bg-surface-soft border border-dashed border-border-strong rounded-lg text-center text-muted">
              [Lead Capture Form Component — Milestone 3 Target]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 5. Verification Method
1. **Source Inspection**: Confirm `src/app/law-firms/page.tsx` imports `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, and wraps `LawFirmsLandingContent` inside `<main className="min-h-screen bg-canvas text-body">`.
2. **Skeleton & Tokens Check**: Confirm `src/app/law-firms/LawFirmsLandingContent.tsx` uses `"use client"` and proper LimeDock token classes (`bg-canvas`, `text-body`, `container-air`, `eyebrow`, `dot`, `text-display-md`, etc.).
3. **Build Command**: Execute `npm run build` from root directory `/Users/ranjeetratan/Desktop/limedock-website` and verify 0 TypeScript/lint errors.
