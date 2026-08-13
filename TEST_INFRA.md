# E2E Test Infrastructure & Manual

## Architecture Overview
The test infrastructure for the `/law-firms` landing page redesign is built on **Playwright** (`@playwright/test`). It provides opaque-box End-to-End testing across 4 comprehensive tiers without mutating application source code.

```
/Users/ranjeetratan/Desktop/limedock-website/
├── e2e/
│   ├── config/
│   │   └── playwright.config.ts         # Playwright runner configuration & WebServer setup
│   ├── harness/
│   │   ├── selectors.ts                 # Centralized DOM selectors & option enumerations
│   │   ├── web3forms.mock.ts            # Network route interceptor for Web3Forms API
│   │   ├── scroll.helper.ts             # Framer-motion scroll animation test helper
│   │   └── test.fixture.ts              # Custom test fixture extending base test
│   └── specs/
│       ├── tier1_feature_coverage.spec.ts  # Tier 1: Feature Structural Coverage
│       ├── tier2_boundary_corner.spec.ts   # Tier 2: Boundary & Corner Cases
│       ├── tier3_combinations.spec.ts      # Tier 3: Cross-Feature Combinations
│       └── tier4_real_world.spec.ts        # Tier 4: Real-World End-to-End Journey
```

---

## Centralized Harness Modules

### 1. `e2e/harness/selectors.ts`
- Provides centralized `data-testid` selectors for Navbar, Footer, ScrollProgress, CursorBlob, 6 landing page sections, and 5 form input fields.
- Enumerates 16 practice area options, 4 firm sizes (`Solo`, `Small`, `Mid-Sized`, `Enterprise`), and 7 roles (`Associate Attorney`, `Billing Manager`, `IT Manager`, `Legal Administrator`, `Managing Partner`, `Paralegal`, `Solo Lawyer`).
- Defines API target constants: `https://api.web3forms.com/submit` and target email `limedockadmn@gmail.com`.

### 2. `e2e/harness/web3forms.mock.ts`
- Network interceptor using Playwright `page.route` targeting `https://api.web3forms.com/submit`.
- Supports 200 OK success responses, 400 Bad Request, 500 Internal Error, network delays, request aborts, and payload verification.
- Enforces recipient verification against `limedockadmn@gmail.com`.

### 3. `e2e/harness/scroll.helper.ts`
- Handles page scrolling and framer-motion `whileInView` animation triggers.
- Utility methods: `scrollToElement`, `scrollThroughAllSections`, `scrollToBottom`, `scrollToTop`.

### 4. `e2e/harness/test.fixture.ts`
- Extends standard `@playwright/test` with pre-configured `web3formsMock` and `scrollHelper` fixtures.

---

## Test Tier Breakdown

| Tier | File | Description | Features Covered |
|------|------|-------------|------------------|
| **Tier 1** | `tier1_feature_coverage.spec.ts` | Structural Feature Coverage | Page metadata, Navbar, Footer, 6 section headings, 5 form fields, 16 practice options, 4 firm sizes, 7 roles, submit handler wiring |
| **Tier 2** | `tier2_boundary_corner.spec.ts` | Boundary & Corner Cases | Empty inputs, malformed email formats, HTTP 500/400 error handling, network timeouts, rapid double-click protection |
| **Tier 3** | `tier3_combinations.spec.ts` | Cross-Feature Combinations | Multi-field dropdown selection matrices, scroll state interactions, validation recovery & re-submission |
| **Tier 4** | `tier4_real_world.spec.ts` | Real-World End-to-End Journey | Full user walkthrough: page arrival -> section scrolling -> form completion -> lead submission dispatch |

---

## CLI Execution Commands

### Run Full Test Suite
```bash
npx playwright test --config=e2e/config/playwright.config.ts
# or via npm script
npm run test:e2e
```

### Run Specific Tiers
```bash
npm run test:tier1
npm run test:tier2
npm run test:tier3
npm run test:tier4
```
