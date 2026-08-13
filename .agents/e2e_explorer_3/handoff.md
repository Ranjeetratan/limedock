# E2E Test Suite Architecture Handoff Report (Tiers 1-4)

**Agent**: Explorer 3 (`teamwork_preview_explorer`)  
**Working Directory**: `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_explorer_3`  
**Target Page**: `/law-firms` landing page redesign  
**Date**: 2026-08-13  

---

## 1. Observation

### 1.1 Source Documents & Codebase Facts
- **`PROJECT.md` & `ORIGINAL_REQUEST.md` Requirements**:
  - Landing page path: `/law-firms` (`src/app/law-firms/page.tsx` and client component `src/app/law-firms/LawFirmsLandingContent.tsx`).
  - Stack: Next.js 16.1.2, React 19.2.3, Framer Motion 12.27.1, Tailwind CSS v4, Web3Forms.
  - Required 6 Landing Page Sections:
    1. *Section 1*: "A Custom AI Infrastructure for your firm" (Hero Stagger & Word Reveal)
    2. *Section 2*: "That Helps you to Win More of the Right Business" (Split Horizontal Slide-In)
    3. *Section 3*: "Do your best legal work" (Spring Scale-Reveal Grid Cards)
    4. *Section 4*: "Sync all your Employee Devices" (Device Node Cascade & Animated SVG Beam Line)
    5. *Section 5*: "Run the Firm Without the Busywork" (Vertical Timeline Scroll Tracker)
    6. *Section 6*: "And Much More" (Luminous Pulse & Staggered Field Reveal)
  - Required Lead Capture Form:
    - 5 Input Fields: Company Website (Text), Area of Practice (Dropdown), Firm Size (Dropdown), Roles (Dropdown), Email (Email).
    - 16 Practice Area Options: `Bankruptcy`, `Business Law`, `Civil Litigation`, `Commercial Real Estate`, `Corporate / M&A`, `Criminal Defense`, `Employment Law`, `Estate Planning`, `Family Law`, `Immigration`, `Intellectual Property`, `Personal Injury`, `Real Estate`, `Tax Law`, `Trusts & Estates`, `White Collar Defense`.
    - 4 Firm Sizes: `Solo`, `Small`, `Mid-Sized`, `Enterprise`.
    - 7 Roles: `Associate Attorney`, `Billing Manager`, `IT Manager`, `Legal Administrator`, `Managing Partner`, `Paralegal`, `Solo Lawyer`.
    - Submit Button: Labeled `"Get Customized Workflow"`.
    - External Integration: Web3Forms POST request to `https://api.web3forms.com/submit` configured with recipient `limedockadmn@gmail.com`.

### 1.2 Baseline Package & Tooling Observation
- Current `package.json` contains runtime dependencies (`next`, `react`, `framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei`) and devDependencies (`typescript`, `eslint`, `tailwindcss`).
- Test runner and Playwright dependencies (`@playwright/test`) are specified for installation to enable headful/headless browser E2E test execution.

---

## 2. Logic Chain

From the observed requirements, an opaque-box end-to-end testing architecture is designed to validate all functional, visual, boundary, combinational, and end-to-end user flow behaviors without mutating source code during test runs.

```
+-----------------------------------------------------------------------------------+
|                            E2E TEST SUITE ARCHITECTURE                            |
+-----------------------------------------------------------------------------------+
|  Tier 1: Feature Coverage      |  Tier 2: Boundary & Corner Cases                 |
|  - Page structure & layout     |  - Empty & malformed inputs                      |
|  - 6 sections & copy strings   |  - Missing required fields                       |
|  - 5 form fields & 27 options  |  - Network 400/500/timeout handling               |
|  - Web3Forms submit handler    |  - Rapid double-submission protection            |
+--------------------------------+--------------------------------------------------+
|  Tier 3: Cross-Feature Combos  |  Tier 4: Real-World Scenarios                    |
|  - Complex dropdown selection  |  - Full user lead submission journey             |
|  - Scroll state + form visual  |  - Step-by-step navigation, fill & submit        |
|  - Error recovery & re-submit  |  - End-to-end HTTP mock verification             |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                              TEST HARNESS LAYER                                   |
|  - e2e/harness/web3forms.mock.ts  (Network Interception & HTTP Mocking)           |
|  - e2e/harness/scroll.helper.ts   (Framer-Motion Viewport & Scroll Helpers)       |
|  - e2e/harness/selectors.ts       (Centralized `data-testid` Selector Dictionary) |
|  - e2e/harness/test.fixture.ts    (Isolated Custom Playwright Test Fixture)      |
+-----------------------------------------------------------------------------------+
```

### 2.1 Tier 1: Feature Coverage Spec
- **Objective**: Verify existence, visibility, structure, and attributes of every component and option.
- **Test File**: `e2e/specs/tier1_feature_coverage.spec.ts`
- **Coverage Details**:
  1. **Page Structure**: Canonical URL `/law-firms`, page `<title>`, `<meta name="description">`, Schema.org `JsonLd` script presence.
  2. **6 Sections**:
     - Section 1: Heading containing `"A Custom AI Infrastructure for your firm"`.
     - Section 2: Heading containing `"That Helps you to Win More of the Right Business"`.
     - Section 3: Heading containing `"Do your best legal work"`.
     - Section 4: Heading containing `"Sync all your Employee Devices"`.
     - Section 5: Heading containing `"Run the Firm Without the Busywork"`.
     - Section 6: Heading containing `"And Much More"`.
  3. **Lead Capture Form Fields**:
     - `Company Website`: `input[type="text"]` or `input[type="url"]` (`data-testid="input-website"`).
     - `Area of Practice`: `select` element (`data-testid="select-practice-area"`) containing all 16 specified options verbatim.
     - `Firm Size`: `select` element (`data-testid="select-firm-size"`) containing 4 specified options (`Solo`, `Small`, `Mid-Sized`, `Enterprise`).
     - `Role`: `select` element (`data-testid="select-role"`) containing 7 specified options (`Associate Attorney`, `Billing Manager`, `IT Manager`, `Legal Administrator`, `Managing Partner`, `Paralegal`, `Solo Lawyer`).
     - `Email`: `input[type="email"]` (`data-testid="input-email"`), marked `required`.
     - `Submit Button`: `<button type="submit">` labeled `"Get Customized Workflow"` (`data-testid="btn-submit"`).
  4. **Web3Forms Submission Wiring**: Form action / submission handler configured to target `https://api.web3forms.com/submit`.

### 2.2 Tier 2: Boundary & Corner Cases Spec
- **Objective**: Ensure robustness against invalid user inputs, missing data, network outages, and duplicate submissions.
- **Test File**: `e2e/specs/tier2_boundary_corner.spec.ts`
- **Coverage Details**:
  1. **Empty Form Submission**: Submitting without entering email or selecting options triggers native HTML5 validation or custom UI error callouts (`data-testid="error-message"`).
  2. **Malformed Email Inputs**: Entering `invalid-email`, `user@`, `user@domain`, or whitespace-padded string triggers validation error and prevents HTTP call.
  3. **Invalid Website URL**: Entering string without proper URL scheme or domain (if URL validation active) handles error state cleanly.
  4. **Network Error Handling (HTTP 500 / 400)**:
     - Mocking Web3Forms endpoint to return HTTP 500 (`{ "success": false, "message": "Server Error" }`).
     - Verifying UI renders error message, does not crash, and enables submit button for retry.
  5. **Network Timeout / Offline**:
     - Simulating request abort or timeout.
     - Verifying UI shows network error feedback and retains user's typed input values.
  6. **Rapid Double Submission**:
     - Rapidly clicking submit button twice within 50ms.
     - Verifying submit button enters disabled state (`disabled` or `aria-disabled="true"`) on first click, ensuring only **1** HTTP request is dispatched.

### 2.3 Tier 3: Cross-Feature Combinations Spec
- **Objective**: Validate interdependent states, multi-field dropdown combinations, scroll state persistence, and form recovery.
- **Test File**: `e2e/specs/tier3_combinations.spec.ts`
- **Coverage Details**:
  1. **Multi-Dropdown Matrix Testing**:
     - Test combination 1: Practice = `Intellectual Property`, Size = `Enterprise`, Role = `Managing Partner`.
     - Test combination 2: Practice = `Criminal Defense`, Size = `Solo`, Role = `Solo Lawyer`.
     - Test combination 3: Practice = `Commercial Real Estate`, Size = `Mid-Sized`, Role = `IT Manager`.
     - Assert that selected values are accurately reflected in the outgoing Web3Forms payload JSON body (`practice_area`, `firm_size`, `role`).
  2. **Scroll State & Animation Interaction**:
     - Scroll to Section 1 -> Section 3 -> Section 6 (Lead Form).
     - Assert form elements remain interactive and fully clickable even during framer-motion scroll entry animations.
  3. **Validation Recovery & Re-Submission**:
     - Enter invalid email `test@bad` -> click submit -> catch validation error.
     - Correct email to `test@validlaw.com` -> click submit -> catch successful payload dispatch and error dismissal.
  4. **Form Re-fill & Subsequent Submission**:
     - Submit form once -> view success banner -> reset or re-fill -> submit second lead with different data -> verify second HTTP POST call dispatched with updated payload.

### 2.4 Tier 4: Real-World Scenarios Spec
- **Objective**: End-to-end verification of complete user journey from arrival to successful lead submission.
- **Test File**: `e2e/specs/tier4_real_world.spec.ts`
- **Coverage Details**:
  1. **Full User Journey Walkthrough**:
     - Step 1: User opens `/law-firms` page.
     - Step 2: User scrolls sequentially through Section 1 ("Custom AI Infrastructure"), Section 2 ("Win More Business"), Section 3 ("Best Legal Work"), Section 4 ("Sync Employee Devices"), Section 5 ("Run Firm Without Busywork"), Section 6 ("And Much More").
     - Step 3: User fills out form:
       - Website: `https://vanguardlegal.com`
       - Practice Area: `Corporate / M&A`
       - Firm Size: `Mid-Sized`
       - Role: `Managing Partner`
       - Email: `partner@vanguardlegal.com`
     - Step 4: User clicks `"Get Customized Workflow"`.
     - Step 5: Harness intercepts POST request to `https://api.web3forms.com/submit`.
     - Step 6: Harness verifies payload structure:
       ```json
       {
         "access_key": "YOUR_WEB3FORMS_ACCESS_KEY",
         "to_email": "limedockadmn@gmail.com",
         "subject": "New Law Firm Lead Capture Submission",
         "from_name": "LimeDock Law Firms Landing",
         "website": "https://vanguardlegal.com",
         "practice_area": "Corporate / M&A",
         "firm_size": "Mid-Sized",
         "role": "Managing Partner",
         "email": "partner@vanguardlegal.com"
       }
       ```
     - Step 7: Harness returns HTTP 200 `{ "success": true, "message": "Lead submission received" }`.
     - Step 8: Assert UI displays success confirmation banner (`data-testid="submission-success-message"`).

---

## 3. Concrete Test Infrastructure & Harness Specifications

### 3.1 Test Directory Structure (`e2e/`)
```
/Users/ranjeetratan/Desktop/limedock-website/
├── e2e/
│   ├── config/
│   │   └── playwright.config.ts         # Main E2E Playwright Configuration
│   ├── harness/
│   │   ├── web3forms.mock.ts            # Network Interceptor & Web3Forms Mock API
│   │   ├── scroll.helper.ts             # Framer-Motion Scroll & Animation Helper
│   │   ├── selectors.ts                 # Centralized DOM Data-TestID Dictionary
│   │   └── test.fixture.ts              # Extended Playwright Test Fixture
│   └── specs/
│       ├── tier1_feature_coverage.spec.ts  # Tier 1 Spec
│       ├── tier2_boundary_corner.spec.ts   # Tier 2 Spec
│       ├── tier3_combinations.spec.ts      # Tier 3 Spec
│       └── tier4_real_world.spec.ts        # Tier 4 Spec
```

### 3.2 Selectors Dictionary (`e2e/harness/selectors.ts`)
```typescript
export const LawFirmsSelectors = {
  // Page Sections
  sections: {
    hero: '[data-testid="section-hero"]',
    winBusiness: '[data-testid="section-win-business"]',
    legalWork: '[data-testid="section-legal-work"]',
    syncDevices: '[data-testid="section-sync-devices"]',
    busywork: '[data-testid="section-busywork"]',
    muchMore: '[data-testid="section-much-more"]',
  },
  // Lead Capture Form
  form: {
    container: '[data-testid="lead-capture-form"]',
    inputWebsite: '[data-testid="input-website"]',
    selectPracticeArea: '[data-testid="select-practice-area"]',
    selectFirmSize: '[data-testid="select-firm-size"]',
    selectRole: '[data-testid="select-role"]',
    inputEmail: '[data-testid="input-email"]',
    btnSubmit: '[data-testid="btn-submit"]',
    successMessage: '[data-testid="submission-success-message"]',
    errorMessage: '[data-testid="submission-error-message"]',
  },
} as const;

export const PracticeAreaOptions = [
  "Bankruptcy", "Business Law", "Civil Litigation", "Commercial Real Estate",
  "Corporate / M&A", "Criminal Defense", "Employment Law", "Estate Planning",
  "Family Law", "Immigration", "Intellectual Property", "Personal Injury",
  "Real Estate", "Tax Law", "Trusts & Estates", "White Collar Defense",
] as const;

export const FirmSizeOptions = ["Solo", "Small", "Mid-Sized", "Enterprise"] as const;

export const RoleOptions = [
  "Associate Attorney", "Billing Manager", "IT Manager",
  "Legal Administrator", "Managing Partner", "Paralegal", "Solo Lawyer",
] as const;
```

### 3.3 Network Interceptor (`e2e/harness/web3forms.mock.ts`)
```typescript
import { Page, Request } from '@playwright/test';

export interface Web3FormsPayload {
  access_key?: string;
  to_email?: string;
  subject?: string;
  from_name?: string;
  website?: string;
  practice_area?: string;
  firm_size?: string;
  role?: string;
  email?: string;
}

export async function setupWeb3FormsMock(
  page: Page,
  options: {
    status?: number;
    responseBody?: object;
    delayMs?: number;
    onIntercept?: (payload: Web3FormsPayload, req: Request) => void;
  } = {}
) {
  const status = options.status ?? 200;
  const responseBody = options.responseBody ?? {
    success: status >= 200 && status < 300,
    message: status === 200 ? "Form submitted successfully" : "Submission failed",
  };

  await page.route('https://api.web3forms.com/submit', async (route, req) => {
    if (options.delayMs) {
      await new Promise((r) => setTimeout(r, options.delayMs));
    }

    let payload: Web3FormsPayload = {};
    try {
      payload = JSON.parse(req.postData() || '{}');
    } catch {
      payload = {};
    }

    if (options.onIntercept) {
      options.onIntercept(payload, req);
    }

    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(responseBody),
    });
  });
}
```

### 3.4 Test Runner Configuration (`e2e/config/playwright.config.ts`)
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../specs',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: '../../playwright-report' }], ['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

---

## 4. Draft Templates for Metadata Delivery

### 4.1 Draft Template for `TEST_INFRA.md`
Below is the draft structure for `TEST_INFRA.md` to be generated upon harness implementation:

```markdown
# E2E Test Infrastructure & Specification Manual

## Overview
This document specifies the End-to-End (E2E) testing setup, harness architecture, mocking strategy, and test execution procedures for the `/law-firms` landing page redesign.

## Architecture
- **Framework**: Playwright (`@playwright/test`)
- **Target Page**: `http://localhost:3000/law-firms`
- **Network Interception Layer**: Custom Playwright route handler intercepting `POST https://api.web3forms.com/submit`.
- **Selector Protocol**: `data-testid` markers integrated into `src/app/law-firms/LawFirmsLandingContent.tsx`.

## Key Files
- `e2e/config/playwright.config.ts`: Runner config, multi-browser matrix (Chromium, Firefox, WebKit), webServer startup.
- `e2e/harness/selectors.ts`: Marker constants for sections, fields, practice area options, firm sizes, roles.
- `e2e/harness/web3forms.mock.ts`: Mock setup functions for 200 OK, 400 Bad Request, 500 Internal Error, and latency delays.
- `e2e/harness/scroll.helper.ts`: Helper for scrolling into view and triggering framer-motion animations.
- `e2e/specs/tier1_feature_coverage.spec.ts`: Tier 1 specs (6 sections, 5 fields, dropdown contents).
- `e2e/specs/tier2_boundary_corner.spec.ts`: Tier 2 specs (Validation, empty fields, HTTP 500 error, double click).
- `e2e/specs/tier3_combinations.spec.ts`: Tier 3 specs (Multi-field matrices, scroll interaction, re-submission).
- `e2e/specs/tier4_real_world.spec.ts`: Tier 4 specs (Complete end-to-end lead submission journey).

## CLI Execution Commands
- Run all E2E specs: `npx playwright test --config=e2e/config/playwright.config.ts`
- Run Tier 1 only: `npx playwright test e2e/specs/tier1_feature_coverage.spec.ts`
- Run Tier 2 only: `npx playwright test e2e/specs/tier2_boundary_corner.spec.ts`
- Run Tier 3 only: `npx playwright test e2e/specs/tier3_combinations.spec.ts`
- Run Tier 4 only: `npx playwright test e2e/specs/tier4_real_world.spec.ts`
```

### 4.2 Draft Template for `TEST_READY.md`
Below is the draft template for `TEST_READY.md` to certify test suite readiness for Milestone M4 gate check:

```markdown
# E2E Test Suite Readiness Certification

## Handoff Summary
- **Status**: READY FOR GATE VERIFICATION
- **Target Page**: `/law-firms`
- **Test Runner**: Playwright Test Runner

## Test Tier Coverage Matrix
| Tier | Description | Spec File | Status | Pass Rate Target |
|------|-------------|-----------|--------|------------------|
| Tier 1 | Feature Coverage | `e2e/specs/tier1_feature_coverage.spec.ts` | READY | 100% |
| Tier 2 | Boundary & Corner Cases | `e2e/specs/tier2_boundary_corner.spec.ts` | READY | 100% |
| Tier 3 | Cross-Feature Combinations | `e2e/specs/tier3_combinations.spec.ts` | READY | 100% |
| Tier 4 | Real-World Scenarios | `e2e/specs/tier4_real_world.spec.ts` | READY | 100% |

## Passing Verification Criteria
1. All specs in Tiers 1-4 execute with 0 failures across Chromium, Firefox, WebKit.
2. `npm run build` completes with 0 TypeScript or linting errors.
3. Network mocks correctly intercept Web3Forms calls without reaching external servers.
4. Lead capture payload matches schema contract verbatim (`to_email: "limedockadmn@gmail.com"`).
```

---

## 5. Caveats

1. **External API Isolation**: Real POST requests to `https://api.web3forms.com/submit` must never execute un-mocked in automated CI runs to avoid spamming `limedockadmn@gmail.com` or triggering API rate-limiting.
2. **Animation Timing & Viewport Interception**: Framer Motion scroll animations (`whileInView`) may introduce slight rendering delays. Tests must use `await expect(locator).toBeVisible()` or explicit viewport scroll triggers via `scroll.helper.ts` rather than hardcoded timeouts.
3. **Data-TestID Integration Dependency**: Worker implementation of `LawFirmsLandingContent.tsx` in M1/M2/M3 must strictly attach the exact `data-testid` attributes specified in `selectors.ts` for clean test locator binding.

---

## 6. Conclusion

The E2E Test Suite Architecture for Tiers 1-4 provides complete, multi-tiered test coverage for the `/law-firms` landing page redesign:
- **Tier 1** guarantees feature structural completeness across 6 sections, 5 form fields, 27 dropdown options, and submission handler wiring.
- **Tier 2** guarantees boundary robustness, network failure resilience, and double-click protection.
- **Tier 3** validates complex inter-field option combinations, scroll animation interactions, and form re-submission workflows.
- **Tier 4** validates the complete real-world user journey from page landing to lead submission confirmation.

The design includes concrete test specs, Playwright runner configuration, network/scroll test harness helpers, and draft templates for `TEST_INFRA.md` and `TEST_READY.md`.

---

## 7. Verification Method

To independently verify this E2E Test Suite Architecture design:

1. **Inspect Handoff Artifact**:
   - Check `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_explorer_3/handoff.md` for section completeness (Observation, Logic Chain, Caveats, Conclusion, Verification Method).
2. **Validate Feature Mapping**:
   - Verify that all 16 items in `PROJECT.md § Feature Inventory` are mapped to Tier 1-4 spec files.
   - Verify that all 16 practice areas, 4 firm sizes, and 7 roles match `ORIGINAL_REQUEST.md`.
3. **Validate Test Harness Interfaces**:
   - Confirm `web3forms.mock.ts` matches the endpoint `https://api.web3forms.com/submit` and recipient `limedockadmn@gmail.com`.
   - Confirm `playwright.config.ts` configuration includes `webServer` settings for Next.js dev server on port 3000.
