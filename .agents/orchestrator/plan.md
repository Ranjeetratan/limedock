# Orchestration Plan: Navbar Refactoring & Unified Hub Page

## Objective
Refactor the website navbar to consolidate "Trending Agents" and "Directories" into a single unified landing page hub (e.g. `/resources` or `/explore`), fulfilling all acceptance criteria in `ORIGINAL_REQUEST.md`.

## Execution Phases

### Phase 0: Survey & Scoping (Parallel Explorers)
- Dispatch 3 Explorers in parallel:
  1. `teamwork_preview_explorer_survey_1`: Investigate current navbar implementation, routes, links, and structure.
  2. `teamwork_preview_explorer_survey_2`: Investigate existing pages, components, design system, Tailwind/CSS classes, trending agents & directories pages.
  3. `teamwork_preview_explorer_survey_3`: Investigate build system, Next.js configuration, routing mechanism (App router vs Pages router), and testing setup.
- Merge Explorer findings into `PROJECT.md` at project root with Feature Inventory, Milestones, and Interface Contracts.

### Phase 1: Dual Track Setup (E2E Testing Track)
- Create `TEST_INFRA.md`.
- Dispatch E2E test writers to create comprehensive opaque-box test suite (Tiers 1-4) validating routing, navbar links, landing page rendering, and Next.js build.
- Publish `TEST_READY.md`.

### Phase 2: Implementation Track
- M1: Create Unified Hub Page component at chosen route (`/resources` or `/explore`) matching site aesthetic and linking to `/trending-agents` and `/directories`.
- M2: Update `src/components/Navbar.tsx` to consolidate links into a single link pointing to the new hub page.

### Phase 3: Verification & Auditing Gate
- Run E2E Test Suite (Tiers 1-4).
- 2 Reviewers (`teamwork_preview_reviewer`) review code quality, UX/UI match, and acceptance criteria.
- 2 Challengers (`teamwork_preview_challenger`) run adversarial / edge cases.
- 1 Forensic Auditor (`teamwork_preview_auditor`) performs integrity checks (zero tolerance for hardcoded tests/facades).
- Record gate status in `GATE_STATUS.md`.

### Phase 4: Final Victory Report
- Synthesize all findings and report to user/parent agent via `send_message`.
