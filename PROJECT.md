# Project: Limedock Website Navbar UI/UX Refactoring

## Architecture
Limedock is a Next.js 16 (App Router) modern web application built with React 19, Tailwind CSS v4, and Framer Motion.
The navigation architecture consists of:
- `src/components/Navbar.tsx`: Global navigation header rendering the brand logo, desktop navigation links/dropdowns, CTA action button ("Book demo"), and mobile hamburger toggle & slide-over/accordion menu.
- Desktop Navigation: Reduced from 10 scattered top-level links to exactly 5 high-level items (`Platform`, `Solutions`, `Works`, `Resources`, `Contact`) with accessible dropdown menus.
- Mobile Navigation: Responsive grouped drawer with collapsible accordion sections for dropdown categories and direct links for single destinations.
- Subpage Link Safety: Anchors prefixed with `/#` so that navigation works consistently from both homepage (`/`) and subpages (`/blog`, `/directories`, `/trending-agents`, `/works`, `/contact`).

## Feature Inventory
Every destination and navigation requirement is enumerated below and mapped to its milestone:
| # | Feature | Description | Target Destination | Milestone | Status | Source |
|---|---------|-------------|--------------------|-----------|--------|--------|
| 1 | Top-Level Constraint | Desktop navbar renders exactly 5 top-level nav items | `src/components/Navbar.tsx` | M2 | DONE | ORIGINAL_REQUEST §R1 |
| 2 | Platform Grouping | Accessible dropdown containing in-page platform anchors (Approach, Capabilities, Math, System, Process) | `/#collapse`, `/#services`, `/#capabilities`, `/#system`, `/#how-we-work` | M2 | DONE | ORIGINAL_REQUEST §R2 |
| 3 | Solutions Grouping | Accessible dropdown for industry solutions (Law Firms, Real Estate, Custom Workflows) | `/#services` | M2 | DONE | ORIGINAL_REQUEST §R2 |
| 4 | Resources Grouping | Accessible dropdown for content & ecosystem hubs (Trending Agents, Directories, Blog) | `/trending-agents`, `/directories`, `/blog` | M2 | DONE | ORIGINAL_REQUEST §R2, §R3 |
| 5 | Works Direct Link | Direct top-level navigation link to the Works portfolio page | `/works` | M2 | DONE | ORIGINAL_REQUEST §R3 |
| 6 | Contact Direct Link | Direct top-level navigation link to Contact page | `/contact` | M2 | DONE | ORIGINAL_REQUEST §R3 |
| 7 | CTA & Logo | Brand logo linking to `/` and "Book demo" CTA button | `/` and `/contact` | M2 | DONE | Codebase Survey |
| 8 | WAI-ARIA & Keyboard A11y | `aria-expanded`, `aria-haspopup="menu"`, `role="menu"`, Enter/Space/Escape/Arrow/Home/End navigation | `src/components/Navbar.tsx` | M2 | DONE | UX Survey |
| 9 | Mobile Grouped Accordion | Mobile menu with smooth collapsible accordion sections for Platform, Solutions, Resources | `src/components/Navbar.tsx` | M3 | DONE | ORIGINAL_REQUEST §Acceptance |
| 10 | Preserved Reachability | 100% of all 10 original destinations reachable across desktop & mobile | All routes/anchors | M2, M3 | DONE | ORIGINAL_REQUEST §R3 |
| 11 | Tablet Responsive Fix | Viewport 768px-1024px displays desktop nav cleanly (`md:flex`) without layout clipping | `src/components/Navbar.tsx` | M2, M3 | DONE | Survey Findings |
| 12 | E2E Testing Suite (Tiers 1-4)| Comprehensive automated test suite verifying top-level link count, dropdown visibility, mobile menu, and all route reachability | `scripts/verify-navbar.ts` / `tests/navbar-e2e.test.ts` | M1 | DONE | Dual Track E2E |
| 13 | Final Verification & Hardening | 100% pass of E2E suite, production build (`npm run build`), and adversarial coverage hardening (Tier 5) | Full project | M4 | DONE | Dual Track Final |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Test Suite Creation (Testing Track) | Build comprehensive test harness & test cases (Tiers 1-4) verifying top-level link count <= 5, all 10 destinations reachable, mobile navigation, keyboard a11y, and publish `TEST_READY.md`. | none | DONE |
| 2 | Desktop Navbar Refactoring (Implementation Track) | Refactor `Navbar.tsx` desktop navigation to exactly 5 high-level items (Platform, Solutions, Works, Resources, Contact) with Framer Motion dropdowns, accessible WAI-ARIA attributes, and `/#` root-relative hash anchors. | none | DONE |
| 3 | Mobile Navigation & Accordion Refactoring | Update mobile menu drawer with interactive accordions for grouped categories, preserving all destinations, touch friendliness, and clean transitions. | M2 | DONE |
| 4 | Final E2E Pass & Adversarial Hardening | Verify 100% E2E test pass, production build verification (`npm run build`), and execute Tier 5 adversarial edge-case stress testing with Challenger & Auditor. | M1, M2, M3 | DONE |

## Interface Contracts
### Navbar Navigation Structure Contract
```typescript
export interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
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
```

## Code Layout
- `src/components/Navbar.tsx`: Main Navbar component (Desktop + Mobile)
- `scripts/verify-navbar.ts`: E2E test runner (Tiers 1-4)
- `tests/navbar-e2e.test.ts`: E2E test suite
- `tests/challenger-tier5-hardening.test.ts`: Tier 5 Adversarial hardening suite
- `PROJECT.md`: Project architecture & completed milestones
- `TEST_INFRA.md`: E2E testing specification and tiers
- `TEST_READY.md`: E2E test suite ready attestation
