## 2026-08-17T09:42:23Z

You are the E2E Test Writer agent for Milestone 1 of Project Limedock Navbar Refactoring.
Your working directory is: /Users/ranjeetratan/Desktop/limedock-website/.agents/teamwork_preview_test_writer_m1/
Project root: /Users/ranjeetratan/Desktop/limedock-website
Original request: /Users/ranjeetratan/Desktop/limedock-website/.agents/ORIGINAL_REQUEST.md
Test Infra specification: /Users/ranjeetratan/Desktop/limedock-website/TEST_INFRA.md
Project specification: /Users/ranjeetratan/Desktop/limedock-website/PROJECT.md

Scope & Write Ownership:
You own writing the test infrastructure and automated test cases in `scripts/verify-navbar.ts` and/or `tests/navbar-e2e.test.ts`. You MUST NOT modify `src/components/Navbar.tsx`.

Tasks:
1. Read ORIGINAL_REQUEST.md, PROJECT.md, and TEST_INFRA.md.
2. Implement a comprehensive automated test runner script in TypeScript (e.g. `scripts/verify-navbar.ts`) that can be executed via `npx tsx scripts/verify-navbar.ts` or `npm test`.
3. The test suite must rigorously evaluate:
   - Tier 1 (Feature Coverage, ≥50 test cases): Exactly 4 to 5 top-level items on desktop, Platform grouping, Solutions grouping, Resources grouping, Works link, Contact link, CTA button, mobile menu toggle, mobile accordion sections.
   - Tier 2 (Boundary & Corner cases, ≥50 test cases): Zero missing links from the original 10 destinations (`/#collapse`, `/#services`, `/#capabilities`, `/#system`, `/#how-we-work`, `/trending-agents`, `/directories`, `/works`, `/blog`, `/contact`), anchor prefix consistency (`/#` vs `#`), empty/null/rapid state toggles, ARIA attributes (`aria-expanded`, `aria-haspopup="true"`, `role="menu"`, `role="menuitem"`), keyboard navigation triggers.
   - Tier 3 (Pairwise & Combinatorial, ≥10 test cases): Cross-feature interactions (e.g., navigating from subpages `/blog` to `/#collapse`, opening dropdown then switching to another dropdown, opening mobile menu then toggling accordion).
   - Tier 4 (Real-world user scenarios, ≥5 test cases): 5 realistic end-to-end user navigation flows across desktop and mobile.
4. Execute the test runner and verify it runs cleanly.
5. Create `/Users/ranjeetratan/Desktop/limedock-website/TEST_READY.md` at the project root summarizing test commands, coverage table across Tiers 1-4, and feature checklist.
6. Write your handoff to `/Users/ranjeetratan/Desktop/limedock-website/.agents/teamwork_preview_test_writer_m1/handoff.md` and send a completion message to the orchestrator.
