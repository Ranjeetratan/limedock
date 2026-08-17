# E2E Test Infra: Limedock Website Navbar Refactoring

## Test Philosophy
- Opaque-box, requirement-driven. No internal private state dependencies.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload Testing.
- Execution Environment: Node.js / Playwright / Jest / React Testing Library or programmatic verification harness.

## Feature Inventory & Test Mapping
| # | Feature | Requirement Source | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Pairwise) | Tier 4 (Scenario) |
|---|---------|-------------------|:-----------------:|:-----------------:|:-----------------:|:-----------------:|
| 1 | Top-Level Navigation Count (<= 5) | ORIGINAL_REQUEST §R1 | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 2 | Platform Grouping & Destinations | ORIGINAL_REQUEST §R2 | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 3 | Solutions Grouping & Destinations | ORIGINAL_REQUEST §R2 | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 4 | Resources Grouping & Destinations | ORIGINAL_REQUEST §R2, §R3 | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 5 | Works Direct Link | ORIGINAL_REQUEST §R3 | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 6 | Contact Direct Link & CTA | ORIGINAL_REQUEST §R3 | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 7 | Accessibility (ARIA, Keyboard) | UX / A11y Standards | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 8 | Mobile Responsive Menu & Accordions | ORIGINAL_REQUEST §Acceptance | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 9 | Preserved Reachability (All 10 links) | ORIGINAL_REQUEST §R3 | ≥5 cases | ≥5 cases | ✓ | ✓ |
| 10| Subpage Root-Relative Anchors | Codebase Survey | ≥5 cases | ≥5 cases | ✓ | ✓ |

## Test Architecture
- Test Runner: Programmatic test script / runner executed via `npm test` or `npx tsx scripts/verify-navbar.ts` / `tests/navbar-e2e.test.ts`.
- Verification Mechanics:
  1. Desktop top-level nav item count validation (assert === 4 or 5).
  2. Complete destination presence validation (assert all 10 original targets: `/#collapse`, `/#services`, `/#capabilities`, `/#system`, `/#how-we-work`, `/trending-agents`, `/directories`, `/works`, `/blog`, `/contact` are present and reachable in the navigation tree).
  3. Dropdown expansion state validation (`aria-expanded`, hover/click toggle, focus management).
  4. Mobile menu open/close toggle and accordion expansion validation.
  5. Build verification: `npm run build` succeeds with zero errors.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Desktop User explores Enterprise AI Platform (clicks Platform dropdown -> navigates to Approach `/#collapse` and The Math `/#capabilities`) | F1, F2, F7, F10 | Medium |
| 2 | Industry Prospect explores Solutions (opens Solutions dropdown -> clicks Law Firms) | F1, F3, F7, F10 | Medium |
| 3 | Ecosystem User searches Resources (opens Resources dropdown -> navigates to `/trending-agents`, `/directories`, and `/blog`) | F1, F4, F7, F9 | High |
| 4 | Portfolio Reviewer & Direct Inquirer (clicks Works `/works` -> then Contact `/contact` -> clicks "Book demo" CTA) | F1, F5, F6, F7 | Medium |
| 5 | Mobile User Navigation (opens hamburger menu -> expands Platform accordion -> expands Resources accordion -> clicks Blog -> verifies mobile drawer closes on navigation) | F8, F9, F10 | High |

## Coverage Thresholds
- Tier 1: ≥5 test cases per feature (≥50 test cases total)
- Tier 2: ≥5 boundary/edge test cases per feature (≥50 test cases total)
- Tier 3: Pairwise interaction tests (≥10 test cases)
- Tier 4: Realistic end-to-end user application scenarios (≥5 scenarios)
- Total: ≥115 test cases across Tiers 1-4
