# Project: LimeDock Next.js Image Optimization Refactoring

## Architecture
- Target Routes: `/real-estate-services` and `/law-firms`
- Primary Components:
  - `src/app/real-estate-services/RealEstateLandingContent.tsx` (5 Next.js `<Image>` components)
  - `src/app/law-firms/LawFirmsLandingContent.tsx` (5 Next.js `<Image>` components)
- Goal: Replace all HTML `<img>` elements with Next.js `import Image from 'next/image'` component across both target page content components.
- Layout Requirements:
  - Preserve background image `fill` positioning and container styling (`absolute inset-0 w-full h-full object-cover`, `relative`, aspect-ratio containers, hover transitions).
  - Proper usage of `fill`, `sizes`, `priority`, `alt`, and CSS class names to guarantee visual zero-regression.
- Build Requirements:
  - `npm run build` must compile with 0 TypeScript and 0 ESLint errors.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Image Migration Audit | Inspect `RealEstateLandingContent.tsx` and `LawFirmsLandingContent.tsx`, identify all `<img>` tags, parent container layouts, image sources, and Next.js `<Image>` requirements | None | DONE |
| 2 | Image Optimization Implementation | Migrate all `<img>` tags to Next.js `<Image>` component on both pages, ensuring correct props (`fill`, `sizes`, `priority`, `alt`) and verifying `npm run build` | M1 | DONE |
| 3 | Verification, Review & Forensic Audit | Run reviewer, challenger stress tests, and forensic integrity audit to confirm 0 `<img>` tags, identical layout, clean build, and authentic implementation | M2 | DONE |

## Interface Contracts
- Standardized Next.js `<Image>` component usage: `import Image from "next/image"`.
- Container layout compatibility: Containers utilizing `fill` must have `position: relative` or `absolute inset-0` parent framing.

## Code Layout
- Real Estate Landing Content: `src/app/real-estate-services/RealEstateLandingContent.tsx`
- Law Firms Landing Content: `src/app/law-firms/LawFirmsLandingContent.tsx`
- Related Components / Images: `public/images/real-estate/`, `public/images/law-firms/`
