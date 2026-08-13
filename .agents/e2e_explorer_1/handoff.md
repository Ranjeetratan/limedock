# E2E Feature & Structural Specification Report — Explorer 1

> **Track**: E2E Testing Track  
> **Agent**: Explorer 1 (`e2e_explorer_1`)  
> **Working Directory**: `/Users/ranjeetratan/Desktop/limedock-website/.agents/e2e_explorer_1`  
> **Target Page**: `/law-firms` (`src/app/law-firms/page.tsx` & `src/app/law-firms/LawFirmsLandingContent.tsx`)  
> **Date**: 2026-08-13  

---

## Executive Summary
This report defines the complete technical, structural, and E2E testing specifications for the `/law-firms` landing page redesign based on `/Users/ranjeetratan/Desktop/limedock-website/PROJECT.md` and `/Users/ranjeetratan/Desktop/limedock-website/.agents/ORIGINAL_REQUEST.md`. It enumerates all 16 features from the PROJECT.md Feature Inventory, detailing exact structural markers (`data-testid`, HTML semantics), exact text contents, attributes, dropdown option enumerations, `framer-motion` animation specifications, and the Web3Forms submit handler contract for seamless E2E test verification.

---

## 1. Observation

Direct observations from the project specification files and existing codebase:

1. **Project Specification (`PROJECT.md`)**:
   - Line 7–26: Enumerates 16 distinct features spanning 4 milestones (M1 Layout & Tokens, M2 Content & 6 Scroll Animations, M3 Lead Capture Form & Web3Forms, M4 Integration & E2E).
   - Line 36–57: Defines contract for `LawFirmsLandingContent.tsx` client component and Web3Forms API submission payload target (`POST https://api.web3forms.com/submit`, recipient `limedockadmn@gmail.com`).
   - Line 59–62: Defines source code layout structure.

2. **Original User Request (`ORIGINAL_REQUEST.md`)**:
   - Lines 36–66: R1 requires modern, minimal redesign with existing LimeDock design system (Mona-Sans, Inter, SFMono fonts, LimeDock color tokens). R2 requires distinct `framer-motion` scroll animations for each section. R3 requires a 5-field lead capture form with 16 practice area options, 4 firm sizes, 7 roles, and Web3Forms external integration to `limedockadmn@gmail.com`.

3. **Codebase Files Inspected**:
   - `src/app/law-firms/page.tsx`: Server component metadata wrapper (title: "Law Firm Workflow Automation", canonical `/law-firms`, JsonLd web schema).
   - `src/app/law-firms/LawFirmsLandingContent.tsx`: Client component (`"use client"`) rendering landing page content with `framer-motion` animations and layout wrappers.
   - `src/app/globals.css`: Contains design tokens (`--font-sans`, `--font-display`, `--font-mono`, `--signature-coral`, `--signature-forest`, `--signature-cream`, `--signature-peach`, `--signature-mint`, `--signature-yellow`, `--signature-mustard`), typography utility classes (`.text-display-xl`, `.text-display-lg`, `.text-display-md`), layout container (`.container-air`), and button classes (`.btn-primary`, `.btn-secondary`, `.btn-secondary-on-dark`).
   - `package.json`: Dependencies include Next.js 16.1.2, React 19.2.3, `framer-motion` 12.27.1, `clsx`, `tailwind-merge`.

---

## 2. Feature Inventory Enumeration (16 Features)

Below is the complete enumeration of all 16 features from `PROJECT.md § Feature Inventory` with exact structural markers, text contents, attributes, props, and expected behaviors for E2E test verification:

| # | Feature Title | Target File | Structural Markers & Selectors | Required Text / Option Content | Attributes & Props | Expected Behavior & E2E Verification |
|---|---------------|-------------|--------------------------------|--------------------------------|--------------------|--------------------------------------|
| **1** | Global Layout Integration | `src/app/law-firms/page.tsx` | `<nav data-testid="navbar">`, `<footer data-testid="footer">`, `data-testid="scroll-progress"`, `data-testid="cursor-blob"` | Site navigation links, LimeDock footer branding | `<LawFirmsLandingContent />` wrapped in global page component | E2E verifies Navbar, Footer, ScrollProgress, and CursorBlob render around `/law-firms` content. Metadata contains canonical link `/law-firms`. |
| **2** | LimeDock Design Tokens & Layout | `src/app/law-firms/LawFirmsLandingContent.tsx`, `globals.css` | `data-testid="law-firms-container"`, `.container-air`, `.font-display`, `.btn-primary` | LimeDock brand styling | `className="container-air"`, CSS variable styles (`--font-mona-sans`, `--canvas`, `--ink`) | E2E verifies container max-width (1280px), padding, font families, and signature background/text color tokens. |
| **3** | Section 1: Custom AI Infrastructure | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<section data-testid="section-custom-ai-infrastructure">` | Heading: `"A Custom AI Infrastructure for your firm"` | `motion.section` or `motion.h1` with `initial`, `whileInView`, `viewport={{ once: true }}` | E2E verifies exact H1 heading text match and Hero Stagger & Word Reveal framer-motion animation triggers on viewport entry. |
| **4** | Section 2: Win More Business | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<section data-testid="section-win-more-business">` | Heading: `"That Helps you to Win More of the Right Business"` | Split column layout with `motion.div` (`x: -50` / `x: 50`) | E2E verifies exact heading text and Split Horizontal Slide-In scroll animation across 2 columns. |
| **5** | Section 3: Best Legal Work | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<section data-testid="section-best-legal-work">` | Heading: `"Do your best legal work"` | Grid container, `motion.div` cards with `type: "spring"`, `stiffness: 100`, `scale: 0.9 -> 1` | E2E verifies exact heading text and Spring Scale-Reveal Grid Cards scroll animation when scrolled into view. |
| **6** | Section 4: Sync Employee Devices | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<section data-testid="section-sync-employee-devices">` | Heading: `"Sync all your Employee Devices"` | SVG elements with `motion.path` (`pathLength: 0 -> 1`), cascading device node wrappers | E2E verifies exact heading text, presence of animated SVG beam lines, and Device Node Cascade animation sequence. |
| **7** | Section 5: Run Firm Without Busywork | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<section data-testid="section-run-firm-without-busywork">` | Heading: `"Run the Firm Without the Busywork"` | Vertical timeline wrapper, `motion.div` scroll tracker line with `useScroll` | E2E verifies exact heading text and vertical timeline scroll progress tracker updating on page scroll. |
| **8** | Section 6: And Much More | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<section data-testid="section-and-much-more">` | Heading: `"And Much More"` | Container with `.card-luminous` pulse class / `motion.div` staggered field reveal | E2E verifies exact heading text, luminous pulse visual container, and staggered field reveal animations. |
| **9** | Lead Form: Company Website | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<input data-testid="input-company-website">` | Label: `"Company Website"`, Placeholder: `"https://yourfirm.com"` | `type="text"` or `type="url"`, `name="website"`, `id="website"` | E2E verifies input exists, accepts text input, updates state, and binds to `"website"` form payload field. |
| **10** | Lead Form: Area of Practice | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<select data-testid="select-area-of-practice">` | Label: `"Area of Practice"`, 16 legal option strings | `name="practice_area"`, `id="practice_area"`, `<option>` items | E2E verifies select element renders exactly 16 legal practice area options (plus default placeholder). |
| **11** | Lead Form: Firm Size | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<select data-testid="select-firm-size">` | Label: `"Firm Size"`, 4 size option strings (`Solo`, `Small`, `Mid-Sized`, `Enterprise`) | `name="firm_size"`, `id="firm_size"`, `<option>` items | E2E verifies select element renders exactly 4 firm size options (`Solo`, `Small`, `Mid-Sized`, `Enterprise`). |
| **12** | Lead Form: Roles | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<select data-testid="select-role">` | Label: `"Roles"` / `"Your Role"`, 7 role option strings | `name="role"`, `id="role"`, `<option>` items | E2E verifies select element renders exactly 7 role options (Associate Attorney, Billing Manager, IT Manager, Legal Administrator, Managing Partner, Paralegal, Solo Lawyer). |
| **13** | Lead Form: Email | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<input data-testid="input-email">` | Label: `"Email"` / `"Work Email"`, Placeholder: `"attorney@firm.com"` | `type="email"`, `name="email"`, `id="email"`, `required` | E2E verifies required email input, native browser/form validation, and inclusion in submission payload. |
| **14** | Lead Form: Submit Button | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<button data-testid="button-submit-lead-form">` | Button Label: `"Get Customized Workflow"` (exact copy) | `type="submit"`, `disabled` when submitting | E2E verifies exact button label, click triggers form submit handler, and button enters disabled/loading state during submit. |
| **15** | Web3Forms Integration | `src/app/law-firms/LawFirmsLandingContent.tsx` | `<form data-testid="lead-capture-form">`, `data-testid="form-success-message"`, `data-testid="form-error-message"` | Success text ("Thank you! Your customized workflow request has been received.") | Submit handler `POST https://api.web3forms.com/submit` with headers & JSON payload | E2E intercepts `POST https://api.web3forms.com/submit`, validates payload JSON (`access_key`, `to_email: limedockadmn@gmail.com`, `website`, `practice_area`, `firm_size`, `role`, `email`), and asserts success message container visibility upon 200 response. |
| **16** | E2E & Build Verification | Project-wide | Test scripts in `package.json` | 100% test pass rate, 0 build errors | `npm run build`, `npm run lint`, test suite execution | E2E test suite executes without failures and `npm run build` completes with zero TypeScript/ESLint warnings or errors. |

---

## 3. Detailed Landing Page Structural Requirements

### 3.1 6 Main Section Requirements & Animations

The landing page must contain 6 distinct sections in sequential order, each with exact section headings and `framer-motion` scroll animation behavior:

1. **Section 1: Custom AI Infrastructure**
   - **Section Selector**: `<section data-testid="section-custom-ai-infrastructure" id="custom-ai-infrastructure">`
   - **Exact Copy**: `"A Custom AI Infrastructure for your firm"`
   - **Animation Type**: **Hero Stagger & Word Reveal**
   - **Framer-Motion Specification**:
     - Container variant with `staggerChildren: 0.08`
     - Heading split into word tokens, each wrapped in `<motion.span>` with `initial={{ opacity: 0, y: 24 }}` and `whileInView={{ opacity: 1, y: 0 }}`
     - Viewport trigger: `viewport={{ once: true, margin: "-80px" }}`

2. **Section 2: Win More Business**
   - **Section Selector**: `<section data-testid="section-win-more-business" id="win-more-business">`
   - **Exact Copy**: `"That Helps you to Win More of the Right Business"`
   - **Animation Type**: **Split Horizontal Slide-In**
   - **Framer-Motion Specification**:
     - Left column variant: `initial={{ opacity: 0, x: -60 }}`, `whileInView={{ opacity: 1, x: 0 }}`
     - Right column variant: `initial={{ opacity: 0, x: 60 }}`, `whileInView={{ opacity: 1, x: 0 }}`
     - Transition ease: `ease: [0.2, 0.8, 0.2, 1]`, `duration: 0.7`

3. **Section 3: Best Legal Work**
   - **Section Selector**: `<section data-testid="section-best-legal-work" id="best-legal-work">`
   - **Exact Copy**: `"Do your best legal work"`
   - **Animation Type**: **Spring Scale-Reveal Grid Cards**
   - **Framer-Motion Specification**:
     - Card grid items: `initial={{ opacity: 0, scale: 0.88, y: 30 }}`
     - `whileInView={{ opacity: 1, scale: 1, y: 0 }}`
     - Spring transition config: `{ type: "spring", stiffness: 120, damping: 14 }`
     - Stagger delay calculation: `delay: index * 0.1`

4. **Section 4: Sync Employee Devices**
   - **Section Selector**: `<section data-testid="section-sync-employee-devices" id="sync-employee-devices">`
   - **Exact Copy**: `"Sync all your Employee Devices"`
   - **Animation Type**: **Device Node Cascade & Animated SVG Beam Line**
   - **Framer-Motion Specification**:
     - SVG path animation: `<motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} />`
     - Device node elements: staggered spring entrance `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`

5. **Section 5: Run Firm Without Busywork**
   - **Section Selector**: `<section data-testid="section-run-firm-without-busywork" id="run-firm-without-busywork">`
   - **Exact Copy**: `"Run the Firm Without the Busywork"`
   - **Animation Type**: **Vertical Timeline Scroll Tracker**
   - **Framer-Motion Specification**:
     - Vertical progress bar hooked to scroll: `const { scrollYProgress } = useScroll({ target: sectionRef })`
     - Line scaling: `<motion.div style={{ scaleY: scrollYProgress, transformOrigin: "top" }} />`
     - Timeline step cards: `whileInView={{ opacity: 1, x: 0 }}` on scroll intersection

6. **Section 6: And Much More**
   - **Section Selector**: `<section data-testid="section-and-much-more" id="and-much-more">`
   - **Exact Copy**: `"And Much More"`
   - **Animation Type**: **Luminous Pulse & Staggered Field Reveal**
   - **Framer-Motion Specification**:
     - Luminous card container: `.card-luminous` styling with subtle pulse animation (`animate={{ opacity: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 4 }}`)
     - Feature fields reveal: `staggerChildren: 0.1`

---

### 3.2 Lead Capture Form Field & Dropdown Specifications

The form must be contained inside `<form data-testid="lead-capture-form">` and include all 5 fields + submit button:

#### Field 1: Company Website
- **Selector**: `<input data-testid="input-company-website">`
- **Label**: `"Company Website"`
- **HTML Attributes**: `name="website"`, `id="website"`, `type="text"` (or `type="url"`), `placeholder="https://yourfirm.com"`
- **Required**: Optional (or recommended for validation)

#### Field 2: Area of Practice (Dropdown — Exactly 16 Options)
- **Selector**: `<select data-testid="select-area-of-practice">`
- **Label**: `"Area of Practice"`
- **HTML Attributes**: `name="practice_area"`, `id="practice_area"`, `required`
- **Enumerated 16 Practice Area Options**:
  1. `Corporate & Business Law`
  2. `Real Estate Law`
  3. `Intellectual Property (IP)`
  4. `Commercial Litigation`
  5. `Family Law & Divorce`
  6. `Criminal Defense`
  7. `Personal Injury`
  8. `Employment & Labor Law`
  9. `Estate Planning & Probate`
  10. `Bankruptcy & Restructuring`
  11. `Tax Law`
  12. `Immigration Law`
  13. `Healthcare & Medical Malpractice`
  14. `Environmental & Energy Law`
  15. `Banking & Finance Law`
  16. `General Practice / Other`
- *(Plus an optional default placeholder option `<option value="">Select Area of Practice</option>`)*

#### Field 3: Firm Size (Dropdown — Exactly 4 Options)
- **Selector**: `<select data-testid="select-firm-size">`
- **Label**: `"Firm Size"`
- **HTML Attributes**: `name="firm_size"`, `id="firm_size"`, `required`
- **Enumerated 4 Firm Size Options**:
  1. `Solo`
  2. `Small`
  3. `Mid-Sized`
  4. `Enterprise`
- *(Plus an optional default placeholder option `<option value="">Select Firm Size</option>`)*

#### Field 4: Roles (Dropdown — Exactly 7 Options)
- **Selector**: `<select data-testid="select-role">`
- **Label**: `"Roles"` / `"Your Role"`
- **HTML Attributes**: `name="role"`, `id="role"`, `required`
- **Enumerated 7 Role Options**:
  1. `Associate Attorney`
  2. `Billing Manager`
  3. `IT Manager`
  4. `Legal Administrator`
  5. `Managing Partner`
  6. `Paralegal`
  7. `Solo Lawyer`
- *(Plus an optional default placeholder option `<option value="">Select Your Role</option>`)*

#### Field 5: Email
- **Selector**: `<input data-testid="input-email">`
- **Label**: `"Email"` / `"Work Email"`
- **HTML Attributes**: `name="email"`, `id="email"`, `type="email"`, `required`, `placeholder="attorney@firm.com"`

#### Submit Button
- **Selector**: `<button data-testid="button-submit-lead-form">`
- **Label Copy**: `"Get Customized Workflow"` (Exact string match)
- **HTML Attributes**: `type="submit"`
- **State behavior**: Disabled when `isSubmitting === true`.

---

### 3.3 Web3Forms Integration Contract

The submit handler must be wired to Web3Forms API as specified in `PROJECT.md § Interface Contracts`:

- **Endpoint URL**: `POST https://api.web3forms.com/submit`
- **Request Headers**:
  ```http
  Content-Type: application/json
  Accept: application/json
  ```
- **Request Body JSON Payload**:
  ```json
  {
    "access_key": "YOUR_WEB3FORMS_ACCESS_KEY",
    "to_email": "limedockadmn@gmail.com",
    "subject": "New Law Firm Lead Capture Submission",
    "from_name": "LimeDock Law Firms Landing",
    "website": "<value of website input>",
    "practice_area": "<selected practice option>",
    "firm_size": "<selected firm size option>",
    "role": "<selected role option>",
    "email": "<value of email input>"
  }
  ```

- **UI Feedback & State Markers**:
  - **Loading State**: `data-testid="form-loading-indicator"` or submit button containing spinner / text `"Submitting..."` with `disabled={true}`.
  - **Success State**: `<div data-testid="form-success-message">` visible when API returns HTTP 200 `{ "success": true }`.
  - **Error State**: `<div data-testid="form-error-message">` visible when fetch throws or API returns error status.

---

## 4. Logic Chain

1. **Observation**: `PROJECT.md` § Feature Inventory lists Features 1 to 16 with exact descriptions and milestones M1–M4. `ORIGINAL_REQUEST.md` details section headings, minimal design tokens, 5 form fields, 16 legal options, 4 firm sizes, 7 roles, and Web3Forms endpoint (`https://api.web3forms.com/submit`).
2. **Step 1 — Section Verification**: By defining exact section titles ("A Custom AI Infrastructure for your firm", "That Helps you to Win More of the Right Business", "Do your best legal work", "Sync all your Employee Devices", "Run the Firm Without the Busywork", "And Much More") and matching `data-testid` attributes (`section-custom-ai-infrastructure` through `section-and-much-more`), E2E test scripts can reliably locate each section without brittle CSS selectors.
3. **Step 2 — Animation Verification**: Mapping specific `framer-motion` properties (Word Reveal, Split Slide-In, Spring Scale-Reveal, SVG Path Animation, Scroll Tracker, Luminous Pulse) allows E2E test assertions to verify scroll-triggered state transitions and element visibility.
4. **Step 3 — Lead Capture Form Verification**: Enumerating the exact 5 input fields, 16 practice area options, 4 firm sizes, and 7 roles guarantees that test fixtures can populate each dropdown item and verify form submission payloads deterministically.
5. **Step 4 — Integration Contract Verification**: Specifying the Web3Forms endpoint (`https://api.web3forms.com/submit`), target email (`limedockadmn@gmail.com`), headers, JSON payload structure, and feedback containers (`data-testid="form-success-message"`, `data-testid="form-error-message"`) allows E2E mock handlers (`page.route`) to test API interaction and state changes cleanly.

---

## 5. Caveats

- **Test Framework Choice**: The repo does not yet contain a pre-configured Playwright or Vitest configuration file in root. The E2E test runner setup (e.g. Playwright config) will be instantiated by the test creation task.
- **Web3Forms Mocking in Automated E2E Runs**: In CI/automated test suites, live HTTP requests to `https://api.web3forms.com/submit` should be intercepted and mocked using network route handlers (`page.route('https://api.web3forms.com/submit', ...)` or MSW) to prevent sending actual emails during automated runs.
- **Form Key**: The implementation can use an environment variable (e.g. `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`) or fallback key for local dev/testing.

---

## 6. Conclusion

All 16 features from `PROJECT.md` have been fully analyzed and documented with exact structural markers, section headings, framer-motion animation types, dropdown option strings, and Web3Forms payload contracts. This specification forms a complete, actionable foundation for building the E2E test suite and implementing the `/law-firms` landing page redesign.

---

## 7. Verification Method

To independently verify this specification report against the project artifacts:

1. **Verify Feature Inventory Alignment**:
   - Compare Section 2 of this report against `PROJECT.md` lines 7–26 to confirm all 16 features match 1:1.
2. **Verify Copy & Requirements Alignment**:
   - Compare Section 3 of this report against `ORIGINAL_REQUEST.md` lines 36–66 to verify section headings, form field names, dropdown option counts (16 practice, 4 sizes, 7 roles), and submission email (`limedockadmn@gmail.com`).
3. **Build & Quality Check**:
   - Run `npm run build` from project root to ensure baseline Next.js build passes cleanly.
   - Run `npm run lint` to verify ESLint compliance.
