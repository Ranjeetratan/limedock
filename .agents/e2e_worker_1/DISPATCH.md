## 2026-08-13T14:57:45Z
You are the E2E Test Suite Writer for the law-firms landing page redesign.
Working Directory: /Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_worker_1

Your task:
1. Read `/Users/ranjeetratan/Desktop/limedock-website/.agents/ORIGINAL_REQUEST.md` and `/Users/ranjeetratan/Desktop/limedock-website/PROJECT.md`.
2. Read Explorer reports at:
   - `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_explorer_1/handoff.md`
   - `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_explorer_2/handoff.md`
   - `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_explorer_3/handoff.md`

3. Create the test harness infrastructure in `/Users/ranjeetratan/Desktop/limedock-website`:
   - Set up test dependencies and npm scripts in `package.json` (e.g. `@playwright/test` / `vitest` / test runner scripts).
   - Create `e2e/config/playwright.config.ts` (or runner config).
   - Create `e2e/harness/selectors.ts` with centralized DOM selectors (`data-testid`), 16 practice area options, 4 firm sizes, 7 roles.
   - Create `e2e/harness/web3forms.mock.ts` network interceptor for `POST https://api.web3forms.com/submit` targeting recipient `limedockadmn@gmail.com`.
   - Create `e2e/harness/scroll.helper.ts` helper for framer-motion scroll animation testing.
   - Create `e2e/harness/test.fixture.ts` test fixture setup.

4. Implement the comprehensive opaque-box E2E test suite covering all 16 features in `PROJECT.md § Feature Inventory`:
   - `e2e/specs/tier1_feature_coverage.spec.ts`: Tier 1 Feature Coverage (page structure, 6 sections with exact text, 5 form fields, 16 practice options, 4 firm sizes, 7 roles, Web3Forms submit handler).
   - `e2e/specs/tier2_boundary_corner.spec.ts`: Tier 2 Boundary & Corner Cases (empty/invalid form inputs, malformed email/url, missing required fields, network 400/500 error handling, timeout handling, rapid double-click protection).
   - `e2e/specs/tier3_combinations.spec.ts`: Tier 3 Cross-Feature Combinations (multi-field option selection matrices + form submission + scroll state interactions, form error recovery, re-submission).
   - `e2e/specs/tier4_real_world.spec.ts`: Tier 4 Real-World Scenarios (complete end-to-end user lead submission journey).

5. Create documentation files at project root:
   - `/Users/ranjeetratan/Desktop/limedock-website/TEST_INFRA.md`: Summarize test architecture, harness setup, framework config, test tier breakdown, and execution CLI commands.
   - `/Users/ranjeetratan/Desktop/limedock-website/TEST_READY.md`: Certify test suite completion, tier matrix status, pass criteria, and Web3Forms mock contract verification.

6. Run build and test suite execution commands to verify test runner setup and test files compile and execute cleanly.
