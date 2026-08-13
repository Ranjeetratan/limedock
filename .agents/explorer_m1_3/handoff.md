# Handoff Report: Explorer 3 — Milestone 1 (Layout & Global Wrapper)

## 1. Observation

### Existing Layout Component Pattern
In `src/app/real-estate-services/page.tsx` (lines 1-75):
- Page is a Next.js Server Component export (`RealEstateServicesPage`).
- Wraps inner client content in `<main className="min-h-screen bg-canvas text-body">`.
- Includes root layout/interactive components in order:
  - `<JsonLd data={jsonLd} />` (structured data schema)
  - `<ScrollProgress />` (`@/components/motion/ScrollProgress`)
  - `<CursorBlob />` (`@/components/motion/CursorBlob`)
  - `<Navbar />` (`@/components/Navbar`)
  - `<RealEstateLandingContent />` (Client Component)
  - `<Footer />` (`@/components/Footer`)
- Defines standard Next.js metadata object (`Metadata` from `"next"`) with title, description, canonical URL, OpenGraph, and Twitter tags.

### Current `src/app/law-firms/page.tsx` State
In `src/app/law-firms/page.tsx` (lines 1-65):
- Missing `<main className="min-h-screen bg-canvas text-body">` wrapper.
- Missing `ScrollProgress`, `CursorBlob`, `Navbar`, and `Footer` components.
- Currently only returns `<JsonLd data={jsonLd} />` and `<LawFirmsLandingContent />` wrapped in a React Fragment `<>`.

### Design System Tokens (`src/app/globals.css`)
Key tokens and utility classes verified in `src/app/globals.css`:
- **Canvas / Surfaces**: `bg-canvas` (`#ffffff`), `bg-surface-soft` (`#f8fafc`), `bg-surface-dark` (`#181d26`), `bg-surface-dark-elevated` (`#1d1f25`), `border-hairline` (`#dddddd`).
- **Typography**: `font-display` (Mona-Sans), `text-display-xl` (clamp 40-48px), `text-display-lg` (clamp 34-40px), `text-display-md` (clamp 28-32px), `text-title-lg` (24px), `text-title-md` (20px), `text-title-sm` (18px), `text-body-md` (14px), `text-caption` (14px).
- **Text Color Tokens**: `text-ink` (`#181d26`), `text-body` (`#333840`), `text-muted` (`#41454d`), `text-on-dark` (`#ffffff`).
- **Containers & Sections**: `container-air` (`width: min(1280px, calc(100% - 48px)); margin-inline: auto;`), `section-air` (`padding-block: 96px`).
- **UI Components**: `eyebrow` (`display: inline-flex; align-items: center; gap: 9px; color: var(--muted); font-size: 14px; font-weight: 500`), `dot` (`width: 7px; height: 7px; border-radius: 9999px; background: var(--primary)`), `btn-primary`, `btn-secondary`, `btn-secondary-on-dark`, `signature-card`.

---

## 2. Logic Chain

1. **Global Wrapper Consistency**: `src/app/real-estate-services/page.tsx` provides the standard layout wrapper contract across LimeDock marketing pages. To ensure `/law-firms` has identical navigation, footer, scroll progress indicator, custom cursor blob, and accessibility/theme styling, `src/app/law-firms/page.tsx` must wrap `<LawFirmsLandingContent />` with `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, and `<main className="min-h-screen bg-canvas text-body">`.
2. **Skeleton & Design Tokens for Client Component**: `LawFirmsLandingContent.tsx` is a `"use client"` component. Structuring it with LimeDock token classes (`bg-canvas`, `text-body`, `text-ink`, `container-air`, `section-air`, `eyebrow`, `text-display-md`, `text-display-xl`, `btn-primary`, `border-hairline`, etc.) provides consistent spacing, font hierarchy, and color palettes matching the LimeDock design system.
3. **Milestone Scoping & Section Anchors**: The client component skeleton establishes 6 clear section containers corresponding to the required features:
   - Section 1: Custom AI Infrastructure (Hero)
   - Section 2: Win More Business
   - Section 3: Do your best legal work
   - Section 4: Sync Employee Devices
   - Section 5: Run Firm Without Busywork
   - Section 6: And Much More + Lead Capture Form Anchor

---

## 3. Caveats

- **Scope Separation**: Milestone 1 focuses exclusively on the page wrapper architecture and design token skeleton integration. Milestone 2 will implement the 6 detailed section layouts with framer-motion scroll animations, and Milestone 3 will implement the Web3Forms lead capture form component.
- **Image Assets**: Existing images in `/images/law-firms/` (e.g. `hero.jpg`, `partner.jpg`, `gavel.jpg`) are available for M2 animation integration.

---

## 4. Conclusion & Implementation Plan

### File 1: `src/app/law-firms/page.tsx`
```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CursorBlob from "@/components/motion/CursorBlob";
import LawFirmsLandingContent from "./LawFirmsLandingContent";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Custom AI Infrastructure & Workflow Automation for Law Firms | LimeDock";
const description =
  "Custom owned AI infrastructure and workflow automations for modern law firms. Win more business, eliminate administrative busywork, sync employee devices, and let your team do their best legal work.";

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
    name: "Law Firm AI Infrastructure & Workflow Automation",
    provider: {
      "@type": "Organization",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    description:
      "Custom owned AI infrastructure for law firms including automated lead capture, matter management, client update digests, employee device sync, and workflow automation.",
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

### File 2: `src/app/law-firms/LawFirmsLandingContent.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BOOK_DEMO_URL } from "@/lib/site";

export default function LawFirmsLandingContent() {
  return (
    <div className="bg-canvas text-body">
      {/* ── SECTION 1: A Custom AI Infrastructure for your firm ── */}
      <section className="relative min-h-[90vh] flex items-center py-24 md:py-32 overflow-hidden bg-canvas">
        <div className="container-air relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="eyebrow mb-6">
              <span className="dot" />
              <span>Tailored Law Firm Automation</span>
            </div>

            <h1 className="text-display-xl text-ink font-display tracking-tight mb-8">
              A Custom AI Infrastructure for your firm
            </h1>

            <p className="text-title-md text-muted max-w-2xl leading-relaxed mb-10">
              LimeDock designs, builds, and deploys custom AI infrastructure and workflow automation systems built exclusively for law firms. Retain 100% ownership of your data, workflows, and code.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get Customized Workflow
              </a>
              <a
                href="#lead-capture-form"
                className="btn-secondary"
              >
                Explore Practice Solutions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: That Helps you to Win More of the Right Business ── */}
      <section className="section-air bg-surface-soft border-y border-hairline">
        <div className="container-air">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">
              <span className="dot" />
              <span>Intelligent Acquisition & Growth</span>
            </div>
            <h2 className="text-display-md text-ink mb-6">
              That Helps you to Win More of the Right Business
            </h2>
            <p className="text-body-md text-body leading-relaxed max-w-xl">
              Qualify high-value prospective matters instantly. Auto-route client inquiries, perform instant conflict pre-checks, and ensure zero billable opportunities slip through the cracks.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Do your best legal work ── */}
      <section className="section-air bg-canvas">
        <div className="container-air">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">
              <span className="dot" />
              <span>Practice Optimization</span>
            </div>
            <h2 className="text-display-md text-ink mb-6">
              Do your best legal work
            </h2>
            <p className="text-body-md text-body leading-relaxed max-w-xl">
              Eliminate non-billable administrative friction. Empower associates and partners to focus on strategic counsel, oral advocacy, and high-margin legal strategy.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Sync all your Employee Devices ── */}
      <section className="section-air bg-surface-dark text-on-dark">
        <div className="container-air">
          <div className="max-w-2xl">
            <div className="eyebrow !text-white/70 mb-4">
              <span className="dot !bg-white" />
              <span>Unified Firm Ecosystem</span>
            </div>
            <h2 className="text-display-md text-white mb-6">
              Sync all your Employee Devices
            </h2>
            <p className="text-body-md text-white/80 leading-relaxed max-w-xl">
              Keep partners, associates, paralegals, and legal administrators seamlessly connected across desktop, mobile, Slack, CRM, and document repositories in real time.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Run the Firm Without the Busywork ── */}
      <section className="section-air bg-surface-soft border-y border-hairline">
        <div className="container-air">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">
              <span className="dot" />
              <span>Automated Operations</span>
            </div>
            <h2 className="text-display-md text-ink mb-6">
              Run the Firm Without the Busywork
            </h2>
            <p className="text-body-md text-body leading-relaxed max-w-xl">
              Autopilot status updates, client digests, engagement letter follow-ups, and matter tracking without sacrificing precision or compliance.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: And Much More & Lead Capture Form ── */}
      <section id="lead-capture-form" className="section-air bg-canvas">
        <div className="container-air">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-4">
              <span className="dot" />
              <span>Comprehensive Solutions</span>
            </div>
            <h2 className="text-display-md text-ink mb-6">
              And Much More
            </h2>
            <p className="text-body-md text-body leading-relaxed max-w-xl">
              Discover how custom AI workflows transform every department in your firm. Request your personalized workflow roadmap below.
            </p>
          </div>

          {/* Lead Capture Form Anchor / Placeholder */}
          <div className="signature-card bg-surface-soft border border-hairline max-w-2xl">
            <h3 className="text-title-lg text-ink mb-2">Get Customized Workflow</h3>
            <p className="text-body-md text-muted mb-6">
              Fill out your firm details below to receive a custom AI infrastructure blueprint.
            </p>
            {/* Lead capture form component will be mounted here in M3 */}
            <div className="p-8 border border-dashed border-hairline rounded-lg text-center text-muted">
              [ Lead Capture Form Placeholder — M3 Component Anchor ]
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

1. **File Inspection**:
   - Verify `src/app/law-firms/page.tsx` imports and renders `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, `JsonLd`, and `LawFirmsLandingContent` inside `<main className="min-h-screen bg-canvas text-body">`.
   - Verify `src/app/law-firms/LawFirmsLandingContent.tsx` begins with `"use client"`, exports `LawFirmsLandingContent` as default, and utilizes LimeDock token classes (`bg-canvas`, `text-body`, `container-air`, `section-air`, `eyebrow`, `dot`, `text-display-md`, `text-display-xl`, `btn-primary`, `border-hairline`).
2. **Build Verification**:
   - Execute `npm run build` in working directory `/Users/ranjeetratan/Desktop/limedock-website`.
   - Confirm build finishes with exit code 0 and zero TypeScript / linting errors.
3. **E2E Verification**:
   - Run Playwright test suite against `/law-firms` route to verify layout components (`Navbar`, `Footer`) are present.
