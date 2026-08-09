# Execution Plan: Next.js Image Optimization Refactoring

## Overview
Refactor the `/real-estate-services` and `/law-firms` landing page components to replace all HTML `<img>` elements with Next.js `<Image>` components, ensuring faster load times, proper lazy loading, automatic webp/avif format conversion, zero visual regressions, zero `<img>` tags remaining in target files, and a passing `npm run build`.

## Milestones & Execution Steps

### Milestone 1: Exploration & Image Migration Audit (DONE)
- [x] Step 1.1: Initialize orchestrator tracking files (`plan.md`, `progress.md`, `BRIEFING.md`, `PROJECT.md`, `ORIGINAL_REQUEST.md`).
- [x] Step 1.2: Dispatch 3 `teamwork_preview_explorer` subagents:
  - Explorer 1: Inspect `src/app/real-estate-services/RealEstateLandingContent.tsx` for all `<img>` elements, attributes, parent classes, image asset paths.
  - Explorer 2: Inspect `src/app/law-firms/LawFirmsLandingContent.tsx` for all `<img>` elements, attributes, parent classes, image asset paths.
  - Explorer 3: Inspect Next.js config (`next.config.js` / `next.config.mjs` / `next.config.ts`), image imports, public directory assets, and overall build check commands.
- [x] Step 1.3: Synthesize Explorer findings into detailed migration plan for Worker.

### Milestone 2: Image Optimization Implementation (DONE)
- [x] Step 2.1: Dispatch `teamwork_preview_worker` to migrate all standard `<img>` tags in `RealEstateLandingContent.tsx` and `LawFirmsLandingContent.tsx` to Next.js `<Image>`.
- [x] Step 2.2: Worker executes `npm run build` and verifies 0 TypeScript/ESLint errors and 0 remaining standard `<img>` tags in target files.

### Milestone 3: Verification, Review, Stress Test & Forensic Audit (DONE)
- [x] Step 3.1: Dispatch 2 `teamwork_preview_reviewer` subagents to check code quality, layout preservation, prop correctness (`fill`, `sizes`, `priority`, `alt`, `className`).
- [x] Step 3.2: Dispatch 2 `teamwork_preview_challenger` subagents to perform static regex scan for `<img>` tags and test build stability.
- [x] Step 3.3: Dispatch `teamwork_preview_auditor` to conduct forensic integrity verification.
- [x] Step 3.4: Synthesize verdicts and notify Sentinel of victory.
