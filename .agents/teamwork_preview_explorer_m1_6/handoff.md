# Handoff Report — Build Failure Investigation (`tsconfig.json` & E2E configuration)

## Observation
- **Error Observed**: During Forensic Audit of Milestone 1, running `npm run build` failed with the following TypeScript error:
  `./e2e/config/playwright.config.ts:1:39 Type error: Cannot find module '@playwright/test' or its corresponding type declarations.`
- **Target Configuration File (`tsconfig.json`)**:
  - `include` array contains:
    - `"next-env.d.ts"`
    - `"src/**/*.ts"`
    - `"src/**/*.tsx"`
    - `".next/types/**/*.ts"`
    - `".next/dev/types/**/*.ts"`
    - `"e2e/**/*.ts"` (line 32)
  - `exclude` array contains:
    - `"node_modules"` (line 34)
- **Dependency State**: `package.json` lists `"@playwright/test": "^1.50.0"` in `devDependencies`. However, `@playwright/test` is not installed or available in `node_modules` during production build compilation.
- **E2E Test File Imports**:
  - `e2e/config/playwright.config.ts` line 1: `import { defineConfig, devices } from '@playwright/test';`
  - `e2e/harness/test.fixture.ts` line 1: `import { test as base, expect } from '@playwright/test';`

## Logic Chain
1. **Build Step Execution**: `npm run build` triggers `next build --webpack`. Next.js compiles the web application assets and subsequently runs TypeScript typechecking (`Running TypeScript ...`) using the root `tsconfig.json`.
2. **TypeScript File Discovery**: Because `tsconfig.json` includes `"e2e/**/*.ts"`, Next.js includes all files in the `e2e/` directory in its build typechecking phase.
3. **Missing Module Failure**: Next.js type-checker attempts to resolve imports in `e2e/config/playwright.config.ts`. Since `@playwright/test` is missing from `node_modules` in the build environment, TypeScript fails compilation with error code 1.
4. **Scope Separation**: E2E test files (`e2e/**/*`) are testing infrastructure, not runtime code for the Next.js web application (`src/**/*`). Next.js production builds should only type-check application source files and Next.js generated types.
5. **Resolution Strategy**: Removing `"e2e/**/*.ts"` from the `include` section and adding `"e2e"` to the `exclude` section in `tsconfig.json` prevents Next.js from attempting to compile non-application E2E test runner dependencies during `npm run build`.

## Caveats
- Playwright uses its own built-in TypeScript transpiler (esbuild) when executing test suites (`npx playwright test`). Removing `e2e` from Next.js `tsconfig.json` will not break Playwright test execution.
- If standalone IDE type-checking for `e2e` files is desired without impacting Next.js, an `e2e/tsconfig.json` file can optionally be created inside the `e2e/` folder.

## Conclusion
- The build failure is caused by invalid TypeScript configuration in `tsconfig.json` where `"e2e/**/*.ts"` is included in Next.js build compilation.
- **Fix Strategy for Worker**:
  1. Modify `tsconfig.json`:
     - Remove `"e2e/**/*.ts"` from `include`.
     - Add `"e2e"` to `exclude`.
  2. Optional (Recommended): Add `e2e/tsconfig.json` for isolated test runner IDE support.
  3. Re-run `npm run build` to verify the build completes with zero errors.

## Proposed Code Changes

### Patch File: `fix_tsconfig.patch`
Location: `/Users/ranjeetratan/Desktop/limedock-website/.agents/teamwork_preview_explorer_m1_6/fix_tsconfig.patch`

```patch
--- tsconfig.json
+++ tsconfig.json
@@ -29,8 +29,7 @@
     "src/**/*.ts",
     "src/**/*.tsx",
     ".next/types/**/*.ts",
-    ".next/dev/types/**/*.ts",
-    "e2e/**/*.ts"
   ],
-  "exclude": ["node_modules"]
+  "exclude": ["node_modules", "e2e"]
 }
```

### Complete Proposed `tsconfig.json`
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

## Verification Method
1. Apply the modification to `/Users/ranjeetratan/Desktop/limedock-website/tsconfig.json`.
2. Execute build command:
   `cd /Users/ranjeetratan/Desktop/limedock-website && npm run build`
3. Verify that `npm run build` completes successfully with exit code 0 and zero TypeScript or linting errors.
