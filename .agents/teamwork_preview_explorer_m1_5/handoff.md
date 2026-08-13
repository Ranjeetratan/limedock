# Forensic Investigation Report & Handoff — Build Error Analysis

**Target Issue**: `./e2e/config/playwright.config.ts:1:39 Type error: Cannot find module '@playwright/test' or its corresponding type declarations.` during `npm run build`.  
**Investigator**: `teamwork_preview_explorer_m1_5`  
**Working Directory**: `/Users/ranjeetratan/Desktop/limedock-website/.agents/teamwork_preview_explorer_m1_5`  
**Date**: 2026-08-13  

---

## 1. Observation

### Verbatim Build Error (from Auditor Report)
```
> landing-page@0.1.0 build
> next build --webpack

▲ Next.js 16.1.2 (webpack)

  Creating an optimized production build ...
 ✓ Compiled successfully
  Running TypeScript ...
Failed to compile.

./e2e/config/playwright.config.ts:1:39
Type error: Cannot find module '@playwright/test' or its corresponding type declarations.

> 1 | import { defineConfig, devices } from '@playwright/test';
    |                                       ^
  2 |
  3 | /**
  4 |  * Playwright E2E Test Runner Configuration
Next.js build worker exited with code: 1 and signal: null
```

### Direct Code & System Observations

1. **`tsconfig.json` (`/Users/ranjeetratan/Desktop/limedock-website/tsconfig.json`)**:
   - Lines 26–35:
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
   - `"e2e/**/*.ts"` is explicitly included in the Next.js TypeScript compilation scope (line 32).

2. **`package.json` (`/Users/ranjeetratan/Desktop/limedock-website/package.json`)**:
   - Lines 29–31:
     ```json
     "devDependencies": {
       "@playwright/test": "^1.50.0",
     ```
   - `@playwright/test` is declared under `devDependencies`.

3. **`e2e/config/playwright.config.ts` (`/Users/ranjeetratan/Desktop/limedock-website/e2e/config/playwright.config.ts`)**:
   - Line 1:
     ```ts
     import { defineConfig, devices } from '@playwright/test';
     ```

4. **Node Modules & Network Environment Verification**:
   - Command `npm ls @playwright/test` returned `-- (empty)`.
   - `@playwright/test` module is not installed in local `node_modules`.
   - Running `npm install` failed with network error `ENOTFOUND registry.npmjs.org` due to sandbox network isolation.
   - **Critical Fact**: The solution CANNOT rely on fetching `@playwright/test` over the internet via `npm install`. The fix MUST be achieved by correcting the Next.js `tsconfig.json` build boundary.

---

## 2. Logic Chain

1. **Next.js Build Pipeline**: When `npm run build` is run, Next.js executes `next build --webpack`. First, webpack compiles the application bundles (`✓ Compiled successfully`). Second, Next.js enters the TypeScript validation step (`Running TypeScript ...`).
2. **TypeScript Inclusion**: Next.js uses `tsconfig.json` to instruct the TypeScript compiler (`tsc`) on which files to type-check. Because `tsconfig.json` includes `"e2e/**/*.ts"` in its `"include"` array, `tsc` attempts to validate all `.ts` files under `e2e/`, including `e2e/config/playwright.config.ts` and `e2e/specs/*.ts`.
3. **Module Resolution Failure**: `e2e/config/playwright.config.ts` imports `@playwright/test`. Because `@playwright/test` is missing from `node_modules`, `tsc` failed to locate `@playwright/test` or its type declarations, resulting in `Type error: Cannot find module '@playwright/test'`.
4. **Architectural Decoupling**: E2E test files in `e2e/` are designed to be run by Playwright test runner (`npx playwright test`), not built into the Next.js production web application (`src/`). Including `e2e` in the application `tsconfig.json` improperly couples application build success to test configuration files.
5. **Decoupling Solves Build Offline**: Excluding `e2e` from `tsconfig.json` completely eliminates the dependency on `@playwright/test` during `npm run build`, allowing `next build` to complete with 0 errors and exit code 0 even without network access or test packages installed.

---

## 3. Caveats

- **IDE Autocomplete for E2E Tests**: Removing `e2e/**/*.ts` from `tsconfig.json` will prevent `next build` from type-checking `e2e` files. Playwright handles TypeScript compilation internally when running `playwright test`. If IDE autocompletion for `e2e` files is needed without impacting `next build`, a standalone `tsconfig.e2e.json` or `e2e/tsconfig.json` can be configured specifically for E2E tests.
- **Offline Environment**: In offline/sandboxed environments where `npm install` cannot reach external registries, configuring `tsconfig.json` properly is the ONLY way to ensure `npm run build` succeeds.

---

## 4. Conclusion & Actionable Solution Plan for Worker

### Conclusion
The build error occurs because `tsconfig.json` incorrectly included `"e2e/**/*.ts"` in Next.js's type checking scope, combined with `@playwright/test` not being present in local `node_modules`.

### Solution Plan for Worker

Worker must apply the following step to resolve the build failure:

#### Step 1: Update `tsconfig.json`
Edit `/Users/ranjeetratan/Desktop/limedock-website/tsconfig.json`:
1. Remove `"e2e/**/*.ts"` from the `"include"` array.
2. Add `"e2e"` to the `"exclude"` array so Next.js ignores test files during production build.

**Exact `tsconfig.json` content**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules", "e2e"]
}
```

#### Step 2: Run Build & Verification
Run in terminal:
```bash
npm run build
```
Verify that `npm run build` completes with exit code 0 and zero TypeScript or linting errors.

---

## 5. Verification Method

To independently verify the solution:
1. Edit `tsconfig.json` to exclude `"e2e"`.
2. Run `npm run build` in `/Users/ranjeetratan/Desktop/limedock-website`.
3. Expect output:
   `✓ Compiled successfully`
   `✓ Linting and checking validity of types`
   `Exit code: 0`
4. Verify no `@playwright/test` type errors occur.
