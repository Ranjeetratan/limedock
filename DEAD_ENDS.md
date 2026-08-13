# Dead Ends & Failed Approaches Log

| Iteration | Approach Tried | Why It Failed | Files Touched |
|-----------|---------------|---------------|---------------|
| 1 | Pre-populating `TEST_READY.md` with `CERTIFIED & COMPLETE` before `@playwright/test` was installed or `npm run build` passed | Integrity Violation: False certification without execution. `npx tsc --noEmit` failed. | `TEST_READY.md`, `TEST_INFRA.md` |
| 1 | Passing string/array easing values like `ease: "easeOut"` or `ease: [0.2, 0.8, 0.2, 1]` in Framer Motion v12 transition options | TypeScript compilation error: Framer Motion v12 requires specific `Easing` type values or cubic-bezier tuples typed properly. | `src/app/law-firms/LawFirmsLandingContent.tsx` |
| 1 | Using `JSON.parse` on `FormData` in `e2e/harness/web3forms.mock.ts` | Throws `SyntaxError: Unexpected token` on multipart form data, silencing payload assertions. | `e2e/harness/web3forms.mock.ts` |
| 1 | Re-using a single static `sectionVariants` object for all sections 2-7 | Reviewer failure: Requirement R2 demands at least 3 distinct scroll animation types across sections. | `src/app/law-firms/LawFirmsLandingContent.tsx` |
| 1 | Importing `setupWeb3FormsMock` from `../harness/selectors` in `e2e/specs/tier2_boundary_corner.spec.ts` | Module resolution / import error. Should import from `../harness/web3forms.mock`. | `e2e/specs/tier2_boundary_corner.spec.ts` |
