# Survey Report: Build System, Routing Architecture & Test Infrastructure

**Surveyor**: teamwork_preview_explorer_survey_3  
**Working Directory**: `/Users/ranjeetratan/Desktop/limedock-website/.agents/explorer_survey_3`  
**Date**: 2026-08-17  

---

## 1. Observation

### 1.1 Next.js Framework & Router Architecture
- **Next.js Version**: `16.1.2` (`package.json` line 24).
- **React Ecosystem**: `react: "19.2.3"`, `react-dom: "19.2.3"` (`package.json` lines 25–26).
- **Router Type**: **App Router exclusively** located under `src/app/`. There is no `src/pages` or `pages/` directory.
- **Next Config**: `next.config.ts` has `reactCompiler: true` enabled (line 5).
- **Layout Architecture**: 
  - Root layout is in `src/app/layout.tsx`. It applies global fonts (`monaSans`), global styles (`globals.css`), Google Analytics/GTM scripts, and Schema.org `Organization` + `WebSite` JSON-LD.
  - Individual pages (e.g. `src/app/page.tsx`, `src/app/trending-agents/page.tsx`, `src/app/directories/page.tsx`, `src/app/works/page.tsx`, `src/app/blog/page.tsx`, `src/app/contact/page.tsx`) explicitly import and render `<Navbar />` and `<Footer />`.
- **Existing Routes**:
  - Root: `src/app/page.tsx` (`/`)
  - Trending Agents: `src/app/trending-agents/page.tsx` (`/trending-agents`) and `src/app/trending-agents/[slug]/page.tsx` (55 SSG slug pages)
  - Directories: `src/app/directories/page.tsx` (`/directories`) and `src/app/directories/[slug]/page.tsx` (418 SSG slug pages)
  - Works: `src/app/works/page.tsx` (`/works`)
  - Blog: `src/app/blog/page.tsx` (`/blog`) and `src/app/blog/[slug]/page.tsx`
  - Contact: `src/app/contact/page.tsx` (`/contact`)
  - Vertical Landing Pages: `src/app/law-firms/page.tsx` (`/law-firms`), `src/app/real-estate-services/page.tsx` (`/real-estate-services`), `src/app/real-estate/page.tsx` (`/real-estate`)
  - Presentations: `src/app/presentations/new/page.tsx` and `src/app/p/[id]/page.tsx`
  - Admin: `src/app/admin/contacts/page.tsx`, `src/app/admin/leads/page.tsx`, `src/app/admin/trending-agents/page.tsx`
  - Legal: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`
  - API Routes: `src/app/api/admin/github-lookup/route.ts`, `src/app/api/contact/route.ts`, `src/app/api/leads/route.ts`, `src/app/api/presentations/route.ts`, `src/app/api/screenshot/route.ts`

### 1.2 Package.json Scripts & Dependencies
- **`package.json` scripts**:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "eslint",
    "test": "playwright test --config=e2e/config/playwright.config.ts",
    "test:e2e": "playwright test --config=e2e/config/playwright.config.ts",
    "test:tier1": "playwright test e2e/specs/tier1_feature_coverage.spec.ts --config=e2e/config/playwright.config.ts",
    "test:tier2": "playwright test e2e/specs/tier2_boundary_corner.spec.ts --config=e2e/config/playwright.config.ts",
    "test:tier3": "playwright test e2e/specs/tier3_combinations.spec.ts --config=e2e/config/playwright.config.ts",
    "test:tier4": "playwright test e2e/specs/tier4_real_world.spec.ts --config=e2e/config/playwright.config.ts"
  }
  ```
- **Dependencies**:
  - `@react-three/drei`: `^10.7.7`
  - `@react-three/fiber`: `^9.6.1`
  - `@vercel/kv`: `^3.0.0`
  - `clsx`: `^2.1.1`
  - `framer-motion`: `^12.27.1`
  - `mona-sans`: `^1.0.0`
  - `next`: `16.1.2`
  - `react`: `19.2.3`
  - `react-dom`: `19.2.3`
  - `tailwind-merge`: `^3.4.0`
  - `three`: `^0.184.0`
- **DevDependencies**:
  - `@playwright/test`: `^1.62.1`
  - `@tailwindcss/postcss`: `^4`
  - `@tailwindcss/typography`: `^0.5.19`
  - `@types/node`: `^20`
  - `@types/react`: `^19`
  - `@types/react-dom`: `^19`
  - `@types/three`: `^0.184.1`
  - `babel-plugin-react-compiler`: `1.0.0`
  - `eslint`: `^9`
  - `eslint-config-next`: `16.1.2`
  - `tailwindcss`: `^4`
  - `typescript`: `^5`
- **Test Framework Inventory**:
  - `@playwright/test` (v1.62.1) is installed and active.
  - Jest, Vitest, Cypress, Mocha, Jasmine, and React Testing Library (`@testing-library/*`) are **NOT installed** in the repository.

### 1.3 TypeScript, Path Aliases, and ESLint Setup
- **TypeScript Configuration (`tsconfig.json`)**:
  - Compiler: `target: "ES2017"`, `module: "esnext"`, `moduleResolution: "bundler"`, `strict: true`, `jsx: "react-jsx"`.
  - Path alias: `"@/*": ["./src/*"]` (configured under `compilerOptions.paths`).
  - Includes: `next-env.d.ts`, `src/**/*.ts`, `src/**/*.tsx`, `.next/types/**/*.ts`, `.next/dev/types/**/*.ts`.
  - Excludes: `node_modules`, `e2e`.
- **ESLint Configuration (`eslint.config.mjs`)**:
  - ESLint 9 Flat Config using `defineConfig` from `eslint/config`.
  - Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
  - Ignores `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.
- **Build System Verification**:
  - Executed command `npm run build` (`next build --webpack`).
  - Result: TypeScript compilation succeeded, Next.js compiled in 4.1s, static page generation produced 497 pages (exit code 0).

### 1.4 Navbar Implementation & Link Structure (`src/components/Navbar.tsx`)
- **Desktop Navigation (lines 50–71)**:
  - In-page Anchor Links (5 links): `#collapse` ("The math"), `#services` ("Approach"), `#capabilities` ("Capabilities"), `#system` ("System"), `#how-we-work` ("Process").
  - Route Links (5 links): `/trending-agents` ("Trending Agents"), `/directories` ("Directories"), `/works` ("Works"), `/blog` ("Blog"), `/contact` ("Contact").
  - Logo (`/`) and CTA button `https://cal.com/limedock-admin-nb05ck/30min` ("Book demo").
  - Current desktop link count inside `<div className="hidden lg:flex ...">`: **10 links** (5 anchors + 5 route links).
- **Mobile Drawer Navigation (lines 121–151)**:
  - Combines `NAV_LINKS` with `[{ href: "/trending-agents", label: "Trending Agents" }, { href: "/directories", label: "Directories" }, { href: "/works", label: "Works" }, { href: "/blog", label: "Blog" }, { href: "/contact", label: "Contact" }]`.
  - Current mobile link count: **10 links** + "Book demo" CTA button.

---

## 2. Logic Chain

1. **Routing Architecture Choice**:
   - Next.js 16 App Router is the established architectural standard across `src/app/`.
   - Creating the unified landing page hub at `src/app/resources/page.tsx` (or `src/app/explore/page.tsx`) seamlessly integrates with Next.js dynamic metadata, server rendering/SSG, and path aliasing (`@/lib/trending-agents`, `@/lib/directories`, `@/components/Navbar`, `@/components/Footer`).
   - The unified hub page can leverage existing data helpers (`catalogStats()`, `getAllAgents()` from `@/lib/trending-agents` and `countByType()`, `getAllEntries()` from `@/lib/directories`) to provide live stats, category pills, and rich pathway cards.

2. **Navbar Consolidation Impact**:
   - In `src/components/Navbar.tsx`:
     - Removing `<Link href="/trending-agents">Trending Agents</Link>` and `<Link href="/directories">Directories</Link>` and replacing them with `<Link href="/resources" className="focus-ring rounded-sm">Resources</Link>` (or `/explore` / "Explore") reduces the desktop nav items from 10 down to 9.
     - In the mobile menu array, replacing the two entries with `{ href: "/resources", label: "Resources" }` reduces the mobile nav items from 10 down to 9.
     - Net reduction of top-level visual clutter: exactly 1 link removed from both desktop and mobile views while preserving all other nav links ("Works", "Blog", "Contact", anchor links, CTA).

3. **Test Infrastructure Alignment**:
   - Because `@playwright/test` is already the exclusive and official test framework of the project (with established config in `e2e/config/playwright.config.ts`), test suites should be written in Playwright specs inside `e2e/specs/` (e.g. `e2e/specs/navbar_consolidation.spec.ts`).
   - Testing can also be supplemented by a fast programmatic validator / Agent-as-Judge script (`scripts/verify-navbar-hub.mjs` or `e2e/verify-navbar-hub.mjs`) to verify:
     1. Build success (`next build --webpack`).
     2. Navbar AST/DOM link count reduction (asserting 9 items instead of 10, no top-level `/trending-agents` or `/directories` in navbar).
     3. Unified hub route HTTP 200 response and visual pathway elements.
     4. Navigation to `/trending-agents` and `/directories` via hub pathway cards.

---

## 3. Caveats

1. **Route Naming Convention**:
   - The prompt suggests `/resources` or `/explore`. `/resources` aligns closely with existing SaaS convention and references `/directories` resources and `/trending-agents` catalog. The implementation team should choose one canonical route (e.g. `/resources`) and maintain consistency across Navbar and sitemap.
2. **ESLint Strictness**:
   - Running `npm run lint` (`eslint`) in the root directory currently surfaces 24 pre-existing warnings/errors across unrelated legacy files (such as React compiler rules for `setState` in effects in `DirectoriesBrowser.tsx` and unescaped HTML entities in `ContactContent.tsx`). The new files (`src/app/resources/page.tsx`, updated `Navbar.tsx`, and test specs) must be strictly clean of lint errors and use properly escaped entities (`&apos;`, `&quot;`).
3. **SSG vs Dynamic Rendering for the Hub**:
   - Since `/resources` aggregates static catalog data (`@/lib/trending-agents` and `@/lib/directories`), it can be statically pre-rendered at build time (`○ Static` or `● SSG`), maximizing performance and SEO.

---

## 4. Conclusion

- **Framework**: Next.js 16.1.2 with React 19.2.3 on App Router (`src/app/`).
- **Build System**: `next build --webpack` compiles successfully with zero errors across 497 static routes.
- **Navbar Modification**:
  - Modify `src/components/Navbar.tsx` to replace separate `/trending-agents` and `/directories` links with a single link to `/resources` ("Resources") on both desktop (`hidden lg:flex`) and mobile (`md:hidden`) navigation menus.
- **Hub Page Creation**:
  - Implement `src/app/resources/page.tsx` featuring hero copy, statistics/badges, pathway card to `/trending-agents`, pathway card to `/directories`, SEO metadata, and Schema.org JSON-LD.
- **Test Harness Architecture**:
  - Construct a comprehensive Playwright E2E spec at `e2e/specs/navbar_consolidation.spec.ts` testing desktop link count (9), mobile link count (9), absence of direct navbar links to `/trending-agents` and `/directories`, hub page rendering at `/resources`, and click-through navigation to both target sections.

---

## 5. Verification Method

### 5.1 Playwright Test Suite Specification (`e2e/specs/navbar_consolidation.spec.ts`)
The test harness should verify the following test cases:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Navbar Consolidation & Unified Hub Page', () => {
  test('1. Navbar on Desktop renders consolidated link and correct total count', async ({ page }) => {
    await page.goto('/');
    const desktopNav = page.locator('nav .hidden.lg\\:flex');
    
    // Assert consolidated link exists
    const resourcesLink = desktopNav.locator('a[href="/resources"]');
    await expect(resourcesLink).toBeVisible();
    await expect(resourcesLink).toHaveText(/Resources|Explore/i);

    // Assert old separate links are NOT in top-level desktop navbar
    await expect(desktopNav.locator('a[href="/trending-agents"]')).toHaveCount(0);
    await expect(desktopNav.locator('a[href="/directories"]')).toHaveCount(0);

    // Assert total desktop nav link count is exactly 9 (5 anchors + Resources + Works + Blog + Contact)
    const links = desktopNav.locator('a');
    await expect(links).toHaveCount(9);
  });

  test('2. Mobile navigation drawer renders consolidated link and correct total count', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Open hamburger menu
    await page.click('button[aria-label="Open menu"]');
    const mobileMenu = page.locator('nav + div, div.fixed.inset-0.z-40');
    await expect(mobileMenu).toBeVisible();

    // Check consolidated link
    const resourcesLink = mobileMenu.locator('a[href="/resources"]');
    await expect(resourcesLink).toBeVisible();

    // Check separate links are removed from mobile menu
    await expect(mobileMenu.locator('a[href="/trending-agents"]')).toHaveCount(0);
    await expect(mobileMenu.locator('a[href="/directories"]')).toHaveCount(0);
  });

  test('3. Unified Hub page renders with status 200, metadata, and pathways', async ({ page }) => {
    const response = await page.goto('/resources');
    expect(response?.status()).toBe(200);

    // Check title and meta
    await expect(page).toHaveTitle(/Resources|Explore|LimeDock/i);

    // Check visual pathway cards to Trending Agents and Directories
    const trendingCard = page.locator('a[href="/trending-agents"]');
    const directoriesCard = page.locator('a[href="/directories"]');
    await expect(trendingCard.first()).toBeVisible();
    await expect(directoriesCard.first()).toBeVisible();
  });

  test('4. Pathways navigate successfully to Trending Agents and Directories', async ({ page }) => {
    await page.goto('/resources');
    
    // Click Trending Agents pathway
    await page.locator('a[href="/trending-agents"]').first().click();
    await expect(page).toHaveURL(/\/trending-agents$/);
    await expect(page.locator('h1, main')).toBeVisible();

    // Return to resources and click Directories pathway
    await page.goto('/resources');
    await page.locator('a[href="/directories"]').first().click();
    await expect(page).toHaveURL(/\/directories$/);
    await expect(page.locator('h1, main')).toBeVisible();
  });
});
```

### 5.2 Build and Run Commands
1. **Run Next.js Build**:
   ```bash
   npm run build
   ```
   *Expected outcome*: Exit code 0, TypeScript checks pass, static route `/resources` is compiled.

2. **Run Playwright E2E Tests**:
   ```bash
   npx playwright test e2e/specs/navbar_consolidation.spec.ts --config=e2e/config/playwright.config.ts
   ```
   *Expected outcome*: All assertions pass.

3. **Run Code Linting on Modified Files**:
   ```bash
   npx eslint src/components/Navbar.tsx src/app/resources/page.tsx
   ```
   *Expected outcome*: Zero errors.
