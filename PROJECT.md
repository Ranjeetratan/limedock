# Project: Law Firms Landing Page Redesign

## Architecture
Next.js App Router landing page for `/law-firms` (`src/app/law-firms/page.tsx` and `src/app/law-firms/LawFirmsLandingContent.tsx`).
Utilizes LimeDock design system tokens (`globals.css`), `framer-motion` for scroll animations, and Web3Forms (`https://api.web3forms.com/submit`) for lead capture form submissions.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Global Layout Integration | `src/app/law-firms/page.tsx` wrapper with Navbar, Footer, ScrollProgress, CursorBlob | M1 | Survey |
| 2 | LimeDock Design Tokens & Layout | Modern minimal aesthetic using Mona-Sans, Inter, SFMono fonts, LimeDock colors & container classes | M1 | Survey |
| 3 | Section 1: Custom AI Infrastructure | Copy "A Custom AI Infrastructure for your firm" + Hero Stagger & Word Reveal framer-motion scroll animation | M2 | Survey |
| 4 | Section 2: Win More Business | Copy "That Helps you to Win More of the Right Business" + Split Horizontal Slide-In scroll animation | M2 | Survey |
| 5 | Section 3: Best Legal Work | Copy "Do your best legal work" + Spring Scale-Reveal Grid Cards scroll animation | M2 | Survey |
| 6 | Section 4: Sync Employee Devices | Copy "Sync all your Employee Devices" + Device Node Cascade & Animated SVG Beam Line scroll animation | M2 | Survey |
| 7 | Section 5: Run Firm Without Busywork | Copy "Run the Firm Without the Busywork" + Vertical Timeline Scroll Tracker animation | M2 | Survey |
| 8 | Section 6: And Much More | Copy "And Much More" + Luminous Pulse & Staggered Field Reveal animation | M2 | Survey |
| 9 | Lead Form: Company Website | Text input for Company Website (`type="url"` or `type="text"`) | M3 | Survey |
| 10 | Lead Form: Area of Practice | Dropdown with 16 legal practice area options | M3 | Survey |
| 11 | Lead Form: Firm Size | Dropdown with 4 options (Solo, Small, Mid-Sized, Enterprise) | M3 | Survey |
| 12 | Lead Form: Roles | Dropdown with 7 options (Associate Attorney, Billing Manager, IT Manager, Legal Administrator, Managing Partner, Paralegal, Solo Lawyer) | M3 | Survey |
| 13 | Lead Form: Email | Email input (`type="email"`, required) | M3 | Survey |
| 14 | Lead Form: Submit Button | Submit button labeled "Get Customized Workflow" | M3 | Survey |
| 15 | Web3Forms Integration | Submit handler posting to `https://api.web3forms.com/submit` configured for `limedockadmn@gmail.com` | M3 | Survey |
| 16 | E2E & Build Verification | Pass 100% E2E test suite and `npm run build` with zero TypeScript or lint errors | M4 | Survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Design & create E2E test suite for /law-firms redesign (Tiers 1-4) | None | IN_PROGRESS |
| M1 | Layout & Global Wrapper | Refactor `page.tsx` & skeleton `LawFirmsLandingContent.tsx` with LimeDock layout tokens | None | IN_PROGRESS |
| M2 | Content & 6 Scroll Animations | Implement 6 sections with exact copy and distinct framer-motion scroll animations | M1 | PLANNED |
| M3 | Lead Capture Form & Web3Forms | Implement 5-field lead capture form and Web3Forms submit handler | M1 | PLANNED |
| M4 | Integration & Hardening | Pass E2E test suite, `npm run build`, and Tier 5 adversarial coverage hardening | M2, M3, E2E | PLANNED |

## Interface Contracts
### `src/app/law-firms/page.tsx` ↔ `src/app/law-firms/LawFirmsLandingContent.tsx`
- `LawFirmsLandingContent` is a client component (`"use client"`) rendering the complete landing page body inside page wrapper.
- Exports standard React component `default function LawFirmsLandingContent()`.

### Lead Capture Form ↔ Web3Forms API
- Endpoint: `POST https://api.web3forms.com/submit`
- Headers: `Content-Type: application/json`, `Accept: application/json`
- Payload Body:
  ```json
  {
    "access_key": "YOUR_WEB3FORMS_ACCESS_KEY",
    "to_email": "limedockadmn@gmail.com",
    "subject": "New Law Firm Lead Capture Submission",
    "from_name": "LimeDock Law Firms Landing",
    "website": "string",
    "practice_area": "string",
    "firm_size": "Solo | Small | Mid-Sized | Enterprise",
    "role": "Associate Attorney | Billing Manager | IT Manager | Legal Administrator | Managing Partner | Paralegal | Solo Lawyer",
    "email": "string"
  }
  ```

## Code Layout
- `src/app/law-firms/page.tsx`: Server component metadata & global layout wrapper (Navbar, Footer, ScrollProgress, CursorBlob).
- `src/app/law-firms/LawFirmsLandingContent.tsx`: Client component containing section components, framer-motion scroll animations, and LeadCaptureForm component.
