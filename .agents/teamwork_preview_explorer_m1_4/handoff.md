# Investigation & Recommendation Report: Forensic Audit `npm run build` Failure Analysis

**Agent**: teamwork_preview_explorer_m1_4  
**Target Issue**: Forensic Audit build failure analysis for `npm run build`  
**Date**: 2026-08-13  

---

## Executive Summary
Empirical investigation of `npm run build` revealed two distinct TypeScript compilation issues preventing a clean build:
1. **`tsconfig.json` E2E Include Leak**: `tsconfig.json` explicitly included `"e2e/**/*.ts"`, forcing Next.js's production build to type-check Playwright test files (`./e2e/config/playwright.config.ts`). Since `@playwright/test` is missing from `node_modules`, `tsc` failed with `Cannot find module '@playwright/test'`.
2. **Framer Motion 12 Easing Type Mismatch**: In `src/app/law-firms/LawFirmsLandingContent.tsx` (line 31), `transition: { duration: 0.6, ease: "easeOut" }` caused TypeScript to infer `ease` as wide `string`, which is incompatible with Framer Motion 12's `Easing` type definition.

The minimal fix strategy requires excluding `e2e` from `tsconfig.json` and adding `as const` to `ease: "easeOut"` in `LawFirmsLandingContent.tsx`.

---

## 5-Component Handoff Report

### 1. Observation
- **Inspected Files**:
  - `tsconfig.json` (lines 26–35):
    ```json
    "include": [
      "next-env.d.ts",
      "src/**/*.ts",
      "src/**/*.tsx",
      ".next/types/**/*.ts",
      ".next/dev/types/**/*.ts",
      "e2e/**/*.ts"
    ],
    "exclude": ["node_modules"]
    ```
  - `package.json` (line 30):
    `"@playwright/test": "^1.50.0"` is present under `devDependencies`, but `node_modules/@playwright/test` does not exist in the working environment.
  - `src/app/law-firms/LawFirmsLandingContent.tsx` (lines 26–33):
    ```tsx
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };
    ```

- **Observed Build Failure Outputs (Verbatim)**:
  - *Error 1 (E2E)*:
    ```
    ./e2e/config/playwright.config.ts:1:39
    Type error: Cannot find module '@playwright/test' or its corresponding type declarations.
    > 1 | import { defineConfig, devices } from '@playwright/test';
    ```
  - *Error 2 (Framer Motion Variant Type Incompatibility)*:
    ```
    ./src/app/law-firms/LawFirmsLandingContent.tsx:71:26
    Type error: Type '{ hidden: { opacity: number; y: number; }; visible: { opacity: number; y: number; transition: { duration: number; ease: string; }; }; }' is not assignable to type 'Variants'.
      Types of property 'ease' are incompatible.
        Type 'string' is not assignable to type 'Easing | Easing[] | undefined'.
    ```

---

### 2. Logic Chain

1. **Question 1: Why is Next.js / TypeScript (`tsconfig.json`) attempting to compile/type-check `./e2e/config/playwright.config.ts` during `npm run build`?**
   - Next.js runs TypeScript type-checking (`tsc --noEmit`) as part of `next build`.
   - `tsconfig.json` at line 32 explicitly includes `"e2e/**/*.ts"` in its `"include"` array.
   - Because `e2e/config/playwright.config.ts` matches `"e2e/**/*.ts"`, Next.js includes it in the root TypeScript project compilation unit and attempts to type-check it during build.

2. **Question 2: Is `e2e` excluded, or should `@playwright/test` be installed or excluded from Next.js build?**
   - **Current `tsconfig.json` status**: `e2e` is NOT excluded; it is explicitly included in `"include"`. `"exclude"` only lists `["node_modules"]`.
   - **Architectural Analysis**: Next.js production web builds (`next build`) compile and validate application code (`src/**/*`). E2E test files (`e2e/**/*`) are standalone test scripts intended for Playwright's test runner (`playwright test`), not Next.js production runtime bundles.
   - **Resolution**: `e2e` should be excluded from Next.js's production build `tsconfig.json`.

3. **Question 3: What is the precise, minimal fix strategy?**
   - **Fix Action 1 (`tsconfig.json`)**: Remove `"e2e/**/*.ts"` from `"include"` and add `"e2e"` to `"exclude"`.
   - **Fix Action 2 (`src/app/law-firms/LawFirmsLandingContent.tsx`)**: Update line 31 from `ease: "easeOut"` to `ease: "easeOut" as const` (or `ease: [0, 0, 0.2, 1]`).
   - **Preservation of M1**: All layout structures, copy, components, and framer-motion animations in `src/app/law-firms/page.tsx` and `LawFirmsLandingContent.tsx` remain 100% intact and preserved.

---

### 3. Caveats
- Playwright tests run via `npx playwright test` / `npm test` use Playwright's internal TypeScript transpiler and do not rely on Next.js's `tsconfig.json` `"include"` array.
- Framer Motion 12 string easing values inside un-typed object literals default to wide `string` types in TypeScript unless marked `as const` or typed as `Variants`.

---

### 4. Conclusion
- Resolving both the `tsconfig.json` E2E inclusion leak and the `LawFirmsLandingContent.tsx` easing literal type mismatch will allow `npm run build` to complete cleanly with zero errors.

---

### 5. Verification Method

1. **Apply the patch**:
   Apply `/Users/ranjeetratan/Desktop/limedock-website/.agents/teamwork_preview_explorer_m1_4/proposed_fix.patch`.

2. **Run Build Command**:
   `cd /Users/ranjeetratan/Desktop/limedock-website && npm run build`

3. **Expected Result**:
   - `next build` compiles successfully.
   - Running TypeScript step completes with zero errors.
   - Build process exits with code 0.
