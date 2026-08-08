# Project: LimeDock Real Estate Services Landing Page

## Architecture
- Target Route: `/real-estate-services` (`src/app/real-estate-services/page.tsx`)
- App Router layout integrating `Navbar`, `Footer`, `JsonLd`, metadata SEO.
- Custom Section Components:
  1. Hero (`HeroRealEstate` / `RealEstateLandingContent` + `RealEstateSlackFeed`): Two-column, left copy/CTAs, right live Slack/workflow feed
  2. Pain Section (`PainRealEstate`): Dark `bg-signature-forest` card with 7 specific real estate operational pains
  3. Flowchart Section (`RealEstateFlowchart`): Adapting `FromChaosToClarity` flow diagram pattern using `FlowCanvas`, `FlowNode`, `FlowEdge`, `FlowLabel`
  4. How It Works: 3-step process using `card-luminous`
  5. Workflows Showcase: Grid of 6 real estate automations with alternating cream/mint/peach backgrounds
  6. Proof/Metrics Strip: 4 `TiltCard` metrics cards
  7. Closing CTA: Full-width gradient banner cream -> mint with CTA button
- Wiring: Nav link in `Navbar.tsx`, entry in `src/app/sitemap.ts`, footer link in `Footer.tsx`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Architecture | Analyze design system, existing pages, map dependencies and build plan | None | DONE |
| 2 | Custom Component & Section Implementation | Build `src/app/real-estate-services/page.tsx` and all 7 custom sections complying with R1, R2, R3 | M1 | DONE |
| 3 | Route Wiring, SEO & Sitemap Integration | Add route to `Navbar.tsx`, `Footer.tsx`, `sitemap.ts`, add JSON-LD and meta tags | M2 | DONE |
| 4 | Verification, Review & Forensic Audit | Run `npm run build`, execute reviewer & challenger checks, perform forensic integrity audit | M3 | IN_PROGRESS |

## Interface Contracts
- Page Component: Export default Next.js page component at `src/app/real-estate-services/page.tsx` returning metadata and JSX.
- Shared Utils: `BOOK_DEMO_URL`, `absoluteUrl` from `@/lib/site`.
- Shared Components: `@/components/Navbar`, `@/components/Footer`, `@/components/JsonLd`, `@/components/icons/Icons`, `@/components/flow/FlowPrimitives`, `@/components/motion/*`.

## Code Layout
- Main Page: `src/app/real-estate-services/page.tsx`
- Interactive Content Container: `src/app/real-estate-services/RealEstateLandingContent.tsx`
- Live Feed Mockup: `src/app/real-estate-services/RealEstateSlackFeed.tsx`
- Flowchart Component: `src/app/real-estate-services/RealEstateFlowchart.tsx`
- Navigation: `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- Sitemap: `src/app/sitemap.ts`
