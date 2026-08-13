# Scope: Milestone 1 — Layout & Global Wrapper

## Architecture
- Target files: `src/app/law-firms/page.tsx` and `src/app/law-firms/LawFirmsLandingContent.tsx`
- `page.tsx` must wrap `LawFirmsLandingContent` with global layout components (`Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`) following `src/app/real-estate-services/page.tsx` pattern.
- `LawFirmsLandingContent.tsx` skeleton must be a `"use client"` component styled with LimeDock tokens (`globals.css`).

## Feature Inventory Scope
| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 1 | Global Layout Integration | `src/app/law-firms/page.tsx` wrapper with Navbar, Footer, ScrollProgress, CursorBlob | IN_PROGRESS |
| 2 | LimeDock Design Tokens & Layout | Modern minimal aesthetic using Mona-Sans, Inter, SFMono fonts, LimeDock colors & container classes | IN_PROGRESS |

## Code Layout
- `src/app/law-firms/page.tsx`: Server component wrapping `LawFirmsLandingContent` with `Navbar`, `Footer`, `ScrollProgress`, `CursorBlob`, `JsonLd`, and metadata.
- `src/app/law-firms/LawFirmsLandingContent.tsx`: Client component (`"use client"`) skeleton styled with LimeDock design tokens (`globals.css`).
