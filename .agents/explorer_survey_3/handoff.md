# Handoff Report — Explorer 3: Lead Capture Form & Web3Forms Survey

## 1. Observation

### Existing Forms & Inputs in Codebase
- **Form Usage**:
  - `src/app/presentations/new/page-client.tsx` (lines 54-91): Uses a native `<form>` with standard `<input>` elements (text, url) and a submit button with inline state handling (`useState` for `loading` and `error`).
  - `src/components/directories/DirectoryFilters.tsx` (lines 108-138): Uses search `<input>` and industry `<select>` dropdown styled with `rounded-md border border-hairline bg-canvas px-4 min-h-12 text-body-md text-ink outline-none focus:border-ink`.
  - `src/app/admin/trending-agents/AdminClient.tsx` (lines 340-418): Uses native `<select>` and `<input>` elements.
  - `src/app/admin/trending-agents/page.tsx` (lines 87-122): Uses native server action forms.
- **Styling & Component Libraries**:
  - **CSS Framework**: Tailwind CSS v4 (`@tailwindcss/postcss`) with CSS variables and custom classes defined in `src/app/globals.css`.
  - **Component / Form UI Libraries**: No third-party UI form component libraries (e.g. Shadcn UI, Radix UI, React Hook Form, Formik) are installed in `package.json`. Form elements use pure native HTML `<form>`, `<input>`, `<select>`, `<button>` tags styled with Tailwind CSS utility classes and CSS custom variables (`var(--canvas)`, `var(--ink)`, `var(--hairline)`, `var(--border-strong)`, `var(--primary)`, `var(--signature-coral)`).
  - **Animations**: `framer-motion` (`^12.27.1`) is installed and used extensively.
  - **Icons**: No `lucide-react` or external icon library is installed in `package.json`.

### Web3Forms / External Form Endpoints
- Grep search for `web3forms` across the codebase returned 0 matches in source files (matches exist only in `.agents` directory and `ORIGINAL_REQUEST.md`).
- Grep search for `<form` and external submission URLs confirmed no existing external form endpoints (e.g., Web3Forms, Formspree, Formkeep) are currently wired up anywhere in the codebase.

### Lead Capture Form Requirements Specification
- **Fields**:
  1. **Company Website**: `type="url"` (or `type="text"`), label: "Company Website", placeholder: `https://yourfirm.com`
  2. **Area of Practice**: Dropdown `<select>` with 16 legal options:
     - Corporate Law
     - Intellectual Property
     - Family Law
     - Criminal Defense
     - Real Estate Law
     - Tax Law
     - Employment & Labor Law
     - Commercial Litigation
     - Immigration Law
     - Environmental Law
     - Healthcare Law
     - Bankruptcy & Restructuring
     - Estate Planning & Probate
     - Personal Injury
     - Entertainment & Media Law
     - Cybersecurity & Data Privacy
  3. **Firm Size**: Dropdown `<select>` with 4 options:
     - Solo
     - Small
     - Mid-Sized
     - Enterprise
  4. **Roles**: Dropdown `<select>` with 7 options:
     - Associate Attorney
     - Billing Manager
     - IT Manager
     - Legal Administrator
     - Managing Partner
     - Paralegal
     - Solo Lawyer
  5. **Email**: `type="email"`, required: true, label: "Email", placeholder: `name@lawfirm.com`
  6. **Submit Button**: Label `"Get Customized Workflow"`, styled using LimeDock `.btn-primary` class (or signature styling), with submission state indicator (`loading`/`success`/`error`).
- **Submit Handler Configuration**:
  - Target URL: `https://api.web3forms.com/submit`
  - Method: `POST` with `Content-Type: application/json`
  - Destination Email: `limedockadmn@gmail.com`
  - Payload keys:
    - `access_key`: Web3Forms access key registered for `limedockadmn@gmail.com` (configurable via `process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY"`)
    - `to_email`: `limedockadmn@gmail.com`
    - `subject`: `New Lead Capture Submission - Law Firms Landing`
    - `from_name`: `LimeDock Lead Capture Form`
    - `website`, `practice_area`, `firm_size`, `role`, `email`

---

## 2. Logic Chain

1. **Observation**: `package.json` contains `framer-motion`, `@tailwindcss/postcss`, `clsx`, `tailwind-merge`, but no form libraries or icon packages.
2. **Inference**: Form components on `/law-firms` must be implemented using React state hooks (`useState`) and native HTML elements (`<form>`, `<input>`, `<select>`, `<button>`) styled via Tailwind CSS class names that match LimeDock's design system tokens in `src/app/globals.css`.
3. **Observation**: Codebase search yields no existing `web3forms` endpoint usages or form submission utilities.
4. **Inference**: Web3Forms integration is a new feature to be created directly in `LawFirmsLandingContent.tsx` (or a dedicated component `LawFirmsLeadForm.tsx`). Submissions should execute an `async` fetch call to `https://api.web3forms.com/submit` with `Content-Type: application/json`, handling success, error, and pending states cleanly.
5. **Observation**: Prompt requests 16 legal options for Area of Practice, 4 options for Firm Size, and 7 options for Roles.
6. **Inference**: These options should be defined as typed constants (e.g. `PRACTICE_AREAS`, `FIRM_SIZES`, `ROLES`) and mapped inside the `<select>` options.

---

## 3. Caveats

- **Web3Forms Access Key**: In production, Web3Forms requires an actual active access key issued by `web3forms.com` for `limedockadmn@gmail.com`. The implementation should support an environment variable `process.env.NEXT_PUBLIC_WEB3FORMS_KEY` with a fallback key string so that local build, dev, and CI environments do not fail.
- **Form Component Architecture**: The lead capture form can either be placed directly within `LawFirmsLandingContent.tsx` or modularized as `src/app/law-firms/LawFirmsLeadForm.tsx` for cleaner component separation and readability.

---

## 4. Conclusion

The lead capture form for `/law-firms` should be implemented as a client component (`"use client"`) integrated with LimeDock's design system. It requires:
1. Native HTML form controls (`<input>`, `<select>`, `<button>`) styled with LimeDock global CSS tokens (`bg-canvas`, `border-hairline`, `focus:ring-2`, `btn-primary`).
2. 5 input fields: Company Website, Area of Practice (16 options), Firm Size (4 options), Roles (7 options), Email.
3. Web3Forms submission logic posting JSON to `https://api.web3forms.com/submit` targeting `limedockadmn@gmail.com`.
4. Responsive design matching the minimal, modern aesthetic of the `/law-firms` redesign.

---

## 5. Verification Method

- **Files to Inspect**:
  - `src/app/law-firms/LawFirmsLandingContent.tsx`
  - `src/app/globals.css` (for design system tokens)
  - `package.json` (to verify dependencies)
- **Validation Commands**:
  - Run `npm run build` to verify zero TypeScript errors in form state typing and event handling.
