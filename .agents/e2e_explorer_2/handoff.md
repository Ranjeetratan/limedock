# E2E Testing Track — Explorer 2 Handoff Report

## 1. Observation

### 1.1 Environment & Package Dependencies
- **Node.js**: `v24.16.0` (verified via `node -v`).
- **TypeScript Runner**: `tsx v4.23.9` is available via `npx tsx` (verified via `npx tsx --version`).
- **Vitest Runner**: `vitest v4.1.10` is available via `npx vitest` (verified via `npx vitest --version`).
- **Playwright Runner**: `playwright v1.61.1` is available via `npx playwright` (verified via `npx playwright --version`).
- **Built-in Node Test Runner**: `node:test` and `node:assert` modules are built into Node 24 and function natively (verified via `node -e 'import test from "node:test"; import assert from "node:assert"; test("sample test", () => { assert.strictEqual(1, 1); });'`).
- **Native TypeScript Stripping**: Node 24 supports `node --experimental-strip-types` out of the box (verified via `node --experimental-strip-types -e 'const x: number = 42; console.log(x);'`).
- **`package.json` (`/Users/ranjeetratan/Desktop/limedock-website/package.json`)**:
  ```json
  "dependencies": {
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.6.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.27.1",
    "mona-sans": "^1.0.0",
    "next": "16.1.2",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.4.0",
    "three": "^0.184.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5.19",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "^0.184.1",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.1.2",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
  ```
- **Existing `scripts` in `package.json`**:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "eslint"
  }
  ```
- **Observation on Test Dependencies**: `vitest`, `playwright`, and `tsx` are available in the system environment via `npx`. They are not yet explicitly declared in `package.json` devDependencies, nor is a `test` script present in `package.json`.

### 1.2 Codebase Structure, Page Components & Form Logic
- **Page File**: `/Users/ranjeetratan/Desktop/limedock-website/src/app/law-firms/page.tsx`
  - Server Component providing Next.js `Metadata`, rendering `JsonLd` schema, and rendering `LawFirmsLandingContent`.
- **Landing Page Component**: `/Users/ranjeetratan/Desktop/limedock-website/src/app/law-firms/LawFirmsLandingContent.tsx`
  - Client component using `"use client"`, `framer-motion`, Next.js `<Image>`, and `<Link>`.
- **Project Requirements (`PROJECT.md` & `ORIGINAL_REQUEST.md`)**:
  - `/law-firms` landing page redesign requires:
    1. Modern minimal aesthetic using LimeDock design tokens (`globals.css`).
    2. 6 Animated sections with framer-motion scroll animations:
       - Section 1: "A Custom AI Infrastructure for your firm"
       - Section 2: "That Helps you to Win More of the Right Business"
       - Section 3: "Do your best legal work"
       - Section 4: "Sync all your Employee Devices"
       - Section 5: "Run the Firm Without the Busywork"
       - Section 6: "And Much More"
    3. Lead Capture Form Integration:
       - Fields: `website` (Company Website, text/url), `practice_area` (16 practice areas dropdown), `firm_size` (Solo, Small, Mid-Sized, Enterprise dropdown), `role` (7 roles dropdown), `email` (Email input, required).
       - Submit Button: "Get Customized Workflow".
       - Web3Forms API endpoint: `POST https://api.web3forms.com/submit`.
       - Payload contract:
         ```json
         {
           "access_key": "YOUR_WEB3FORMS_ACCESS_KEY",
           "to_email": "limedockadmn@gmail.com",
           "subject": "New Law Firm Lead Capture Submission",
           "from_name": "LimeDock Law Firms Landing",
           "website": "...",
           "practice_area": "...",
           "firm_size": "...",
           "role": "...",
           "email": "..."
         }
         ```
- **Test Markers / Data Attributes**:
  - Search for `data-testid` across `src/` yielded zero results (`No results found`).
  - No existing data-testid attributes or dedicated test hooks exist in the codebase.

## 2. Logic Chain

1. **Test Runner Capability & Suitability**:
   - Node 24 is installed (`v24.16.0`), which includes `node:test` and `node:assert`.
   - `npx tsx` (`v4.23.9`), `npx vitest` (`v4.1.10`), and `npx playwright` (`v1.61.1`) are all available in the system environment via `npx`.
   - For fast Unit & Contract testing (Tier 1), `node:test` combined with `npx tsx --test` requires zero additional npm installations and executes instantly.
   - For Component & DOM logic testing (Tier 2), React 19 client components with state handlers (`useState`, `fetch`) can be run via `npx vitest run`.
   - For End-to-End (E2E) testing (Tier 3), Playwright (`npx playwright test`) is ideal because Next.js client components rendered with Framer Motion, images, and network calls (`https://api.web3forms.com/submit`) are best verified in real headless browser engines (Chromium/Webkit/Firefox) with network route interception (`page.route()`).

2. **Form State & Web3Forms Mocking Strategy**:
   - The Lead Capture Form will manage input states (`website`, `practice_area`, `firm_size`, `role`, `email`).
   - In E2E tests (Playwright), network POST calls to `https://api.web3forms.com/submit` must be intercepted using `page.route('**/api.web3forms.com/submit', route => route.fulfill({ status: 200, body: JSON.stringify({ success: true }) }))`. This prevents actual network requests during automated test runs while validating the exact JSON body payload sent by the form handler.
   - In unit/component tests (`node:test` or `vitest`), global `fetch` can be mocked (`global.fetch = async () => ...`).

3. **Marker & Selector Strategy**:
   - To make tests resilient against visual styling changes, explicit `data-testid` attributes must be added to components during development:
     - `data-testid="law-firms-landing-page"`
     - `data-testid="section-hero"`
     - `data-testid="section-win-business"`
     - `data-testid="section-best-legal-work"`
     - `data-testid="section-sync-devices"`
     - `data-testid="section-busywork"`
     - `data-testid="section-and-much-more"`
     - `data-testid="lead-capture-form"`
     - `data-testid="input-website"`
     - `data-testid="select-practice-area"`
     - `data-testid="select-firm-size"`
     - `data-testid="select-role"`
     - `data-testid="input-email"`
     - `data-testid="submit-button"`
     - `data-testid="form-status-message"`

## 3. Caveats

- **System vs Local Project Manifest**: While `vitest` and `playwright` are executable via `npx` from the environment, adding them explicitly to `package.json` `devDependencies` ensures consistent CI/CD reproduction across all environments.
- **Node 24 TypeScript Stripping**: Node 24 native type stripping (`--experimental-strip-types`) supports `.ts` files, but does NOT strip JSX syntax in `.tsx` files without a transformer like `tsx` or `babel`/`esbuild`. Therefore, `npx tsx` or `vitest` should be used when importing `.tsx` component files directly in test files.
- **Web3Forms Access Key**: `PROJECT.md` specifies `YOUR_WEB3FORMS_ACCESS_KEY` as a placeholder key. Tests must not depend on a live production key and must intercept network requests or mock the fetch response.

## 4. Conclusion

We recommend a 4-Tier Test Architecture for the LimeDock Law Firms Landing Page E2E & Component Test Suite:

### 1. Tier 1: Unit & Contract Tests (`node:test` + `npx tsx`)
- **Scope**: Contract validation, dropdown arrays (16 practice areas, 4 firm sizes, 7 roles), payload builder functions, JSON-LD schema objects.
- **Command**: `npx tsx --test tests/unit/**/*.test.ts`
- **Dependency**: Uses built-in `node:test` + `node:assert` via `npx tsx`.

### 2. Tier 2: Component & DOM Unit Tests (`npx vitest`)
- **Scope**: React component rendering (`LawFirmsLandingContent`), form state updates, validation errors, submission loading state, and mocked `fetch` handling.
- **Command**: `npx vitest run`

### 3. Tier 3: End-to-End Browser Automation Tests (`npx playwright`)
- **Scope**: Full browser execution against `http://localhost:3000/law-firms`, validating section visibility, framer-motion animations, responsive layouts, Next.js `<Image>` rendering, and user form submission with network route mocking.
- **Command**: `npx playwright test`

### 4. Tier 4: Build & System Contract Hardening
- **Scope**: Type checking (`tsc --noEmit`), Linting (`npm run lint`), Next.js Production Build (`npm run build`).

### Recommended `package.json` Scripts
```json
"scripts": {
  "dev": "next dev",
  "build": "next build --webpack",
  "start": "next start",
  "lint": "eslint",
  "test": "npx tsx --test tests/unit/*.test.ts",
  "test:unit": "npx tsx --test tests/unit/*.test.ts",
  "test:component": "npx vitest run",
  "test:e2e": "npx playwright test",
  "test:all": "npm run test:unit && npm run build"
}
```

## 5. Verification Method

To independently verify the test environment and setup:

1. **Verify Node 24 native test runner**:
   Run command: `node -e 'import test from "node:test"; import assert from "node:assert"; test("node:test works", () => assert.ok(true));'`
   *Expected result*: Exits with code 0 and prints `✔ node:test works`.

2. **Verify TSX execution**:
   Run command: `npx tsx --version`
   *Expected result*: Outputs `tsx v4.23.9` or similar.

3. **Verify Vitest availability**:
   Run command: `npx vitest --version`
   *Expected result*: Outputs `vitest/4.1.10 darwin-arm64 node-v24.16.0` or similar.

4. **Verify Playwright availability**:
   Run command: `npx playwright --version`
   *Expected result*: Outputs `Version 1.61.1` or similar.

5. **Verify Next.js build capability**:
   Run command: `npm run build`
   *Expected result*: Completes with zero TypeScript or linting errors.

6. **Invalidation Conditions**:
   - If `.tsx` files are imported directly in `node:test` without `tsx` or a JSX compiler, syntax errors will occur.
   - If Web3Forms POST calls are made in tests without network interception (`page.route` or `fetch` mock), tests will fail due to missing/invalid API keys or external network dependency.
