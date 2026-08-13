## 2026-08-13T09:46:53Z

<USER_REQUEST>
You are E2E Test Writer 2 (`e2e_worker_2`).
Working Directory: /Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_worker_2

Your task: Remediation of Iteration 1 Reviewer Findings for E2E Test Suite.
Read `/Users/ranjeetratan/Desktop/limedock-website/.agents/ORIGINAL_REQUEST.md`, `/Users/ranjeetratan/Desktop/limedock-website/PROJECT.md`, and reviewer reports at:
- `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_reviewer_1/handoff.md`
- `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_reviewer_2/handoff.md`

Perform the following explicit fixes in `/Users/ranjeetratan/Desktop/limedock-website`:

1. **`tsconfig.json` Update**:
   - Update `/Users/ranjeetratan/Desktop/limedock-website/tsconfig.json` `include` array to include `"e2e/**/*.ts"`.

2. **`e2e/specs/tier2_boundary_corner.spec.ts` Fixes**:
   - Fix line 2 import: import `setupWeb3FormsMock` from `'../harness/web3forms.mock'` (not `'../harness/selectors'`).
   - In `T2.3` (HTTP 500 error test), remove the `if ((await errorMessage.count()) > 0)` conditional guard and directly assert `await expect(errorMessage.first()).toBeVisible();`.
   - In `T2.4` and `T2.5`, populate all required form fields before submit click so the network POST call is dispatched to the mock.

3. **`e2e/specs/tier1_feature_coverage.spec.ts` Fixes**:
   - In `T1.5` (Practice Area options test), remove the `>= 10` relaxed check. Strictly assert that all 16 practice area options defined in `PracticeAreaOptions` are present in the dropdown.
   - In `T1.2` (Page container & global wrappers), add explicit locator assertions for `LawFirmsSelectors.layout.scrollProgress` and `LawFirmsSelectors.layout.cursorBlob`.

4. **`e2e/specs/tier4_real_world.spec.ts` Fixes**:
   - In `T4.1`, assert exact value equality for payload fields (`practice_area`, `firm_size`, `role`, `website`, `email`, `to_email: 'limedockadmn@gmail.com'`).

5. **`scroll.helper.ts`**:
   - Use `assertMotionElementVisible` in section scroll tests or clean up dead methods.

6. **Dependency Installation & Compilation Verification**:
   - Run `npm install` so `@playwright/test` is installed.
   - Run `npx tsc --noEmit` to verify 0 TypeScript compilation errors across `src/` and `e2e/`.

7. **Documentation**:
   - Update `/Users/ranjeetratan/Desktop/limedock-website/TEST_INFRA.md` and `/Users/ranjeetratan/Desktop/limedock-website/TEST_READY.md`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write your handoff report to `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_worker_2/handoff.md` and update progress.md in your directory.
Send a message when completed referencing your handoff report.
</USER_REQUEST>
