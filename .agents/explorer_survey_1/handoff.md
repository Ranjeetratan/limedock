# Explorer 1 Survey & Investigation Report: Law Firms Landing Page & LimeDock Design System

## 1. Observation

### File & Directory Findings
- **Original Request Path**: `/Users/ranjeetratan/Desktop/limedock-website/.agents/ORIGINAL_REQUEST.md` (lines 31-74):
  - Request details: Redesign `/law-firms` landing page with modern, minimal aesthetic, 6 specific sections, premium `framer-motion` scroll animations, and a lead capture form sending submissions to `limedockadmn@gmail.com` via Web3Forms (`https://api.web3forms.com/submit`).
- **Target Page**: `src/app/law-firms/page.tsx` (lines 1-65):
  - Currently renders `<JsonLd data={jsonLd} />` and `<LawFirmsLandingContent />`.
  - Missing standard layout wrappers present in peer landing pages like `src/app/real-estate-services/page.tsx` (namely: `<main className="min-h-screen bg-canvas text-body">`, `<ScrollProgress />`, `<CursorBlob />`, `<Navbar />`, and `<Footer />`).
- **Target Content Component**: `src/app/law-firms/LawFirmsLandingContent.tsx` (lines 1-430):
  - Client component (`"use client"`).
  - Currently uses standard `Image` components from `next/image` with static JPEG images (`/images/law-firms/hero.jpg`, `partner.jpg`, `courthouse.jpg`, etc.).
  - Implements basic scroll fade (`fadeUp` using `initial: { opacity: 0, y: 28 }`, `whileInView: { opacity: 1, y: 0 }`).
- **Global Design System & Styles**: `src/app/globals.css` (lines 8-84, 148-371):
  - `:root` and Tailwind v4 `@theme inline` variables:
    - Primary / Ink: `--primary` (`#181d26`), `--ink` (`#181d26`), `--body` (`#333840`), `--muted` (`#41454d`), `--hairline` (`#dddddd`).
    - Canvas & Surfaces: `--canvas` (`#ffffff`), `--surface-soft` (`#f8fafc`), `--surface-strong` (`#e0e2e6`), `--surface-dark` (`#181d26`).
    - Signature Colors: `--signature-coral` (`#aa2d00`), `--signature-forest` (`#0a2e0e`), `--signature-cream` (`#f5e9d4`), `--signature-peach` (`#fcab79`), `--signature-mint` (`#a8d8c4`), `--signature-yellow` (`#f4d35e`), `--signature-mustard` (`#d9a441`).
    - Typography: `--font-sans` (`Inter`), `--font-display` (`Mona-Sans` via `src/app/layout.tsx`), `--font-mono` (`SFMono-Regular`, `Consolas`, `Menlo`).
    - Utility Classes: `.container-air` (`max-width: 1280px`, `padding-x: 24px/16px`), `.section-air` (`py-24/18`), `.btn-primary` (48px h, 12px rounded, dark bg), `.btn-secondary`, `.eyebrow`, `.dot`, `.card-luminous`, `.ui-window`.
- **Global Layout Components**:
  - `Navbar` (`src/components/Navbar.tsx`): Fixed top header with backdrop blur, scroll border toggle, nav links, and "Book demo" CTA button.
  - `Footer` (`src/components/Footer.tsx`): Full footer with CTA banner (`PlatformStack`), brand marquee, 4-column links including `/law-firms`, and legal links.

## 2. Logic Chain

1. **Requirement Comparison**:
   - `ORIGINAL_REQUEST.md` calls for replacing existing `/law-firms` content with 6 specific wireframe sections, implementing complex `framer-motion` scroll animations across sections, and inserting a 5-field lead capture form (Company Website, Area of Practice, Firm Size, Roles, Email) submitting to `limedockadmn@gmail.com` via Web3Forms.
   - The current `LawFirmsLandingContent.tsx` contains 6 older sections based on static marketing copy ("We build the automation layer your law firm is missing", "A Partner's Tuesday", "The 6 moments", etc.), which need complete structural replacement.

2. **Integration & Layout Consistency**:
   - In `src/app/real-estate-services/page.tsx`, `page.tsx` wraps the content with `<Navbar />` at top and `<Footer />` at bottom inside `<main className="min-h-screen bg-canvas text-body">`.
   - In `src/app/law-firms/page.tsx`, currently `<Navbar />` and `<Footer />` are missing. Integrating `<Navbar />` and `<Footer />` in `page.tsx` (or within the redesign structure) ensures visual and navigational parity across the LimeDock website.

3. **Design System Alignment**:
   - The redesign must strictly use LimeDock's existing Tailwind CSS variables and global components:
     - Container: `container-air` (1280px max width).
     - Headings: `text-display-xl`, `text-display-lg`, `text-display-md` using Mona-Sans font (`font-display`).
     - Eyebrow labels: `eyebrow` with `<span className="dot" />`.
     - Buttons: `btn-primary`, `btn-secondary` with 12px border radius.
     - Dark cards/sections: `bg-surface-dark` (`#181d26`) or `bg-surface-soft` (`#f8fafc`).
     - Form controls: Should match `.focus-ring`, 12px border radius (`rounded-lg` / `rounded-xl`), hairline border (`border-hairline`), and ink typography.

## 3. Caveats

- **Wireframe Text Content Details**: The specific verbatim text copy for all 6 sections (headings, subheadings, body paragraphs) is outlined in `ORIGINAL_REQUEST.md`. Explorer 2 / Implementers must ensure exact text fidelity.
- **Form Key**: `https://api.web3forms.com/submit` requires an `access_key` form field. A placeholder key or configurable env var can be used while setting `limedockadmn@gmail.com` as recipient.
- **Image Assets**: Existing images in `/public/images/law-firms/` can be reused or replaced with next/image `<Image fill />` components maintaining layout ratio.

## 4. Conclusion

- `src/app/law-firms/page.tsx` should be updated to include `<Navbar />`, `<Footer />`, `<ScrollProgress />`, and `<CursorBlob />` around `<LawFirmsLandingContent />`.
- `src/app/law-firms/LawFirmsLandingContent.tsx` should be refactored to implement:
  1. The 6 requested wireframe sections using `.container-air`, signature LimeDock colors, and typography.
  2. Distinct `framer-motion` scroll animations (e.g. staggered text fades, slide-in cards, scale-in features, sticky/in-view reveals).
  3. Interactive lead capture form with 5 inputs/dropdowns (Company Website, Area of Practice [16 options], Firm Size [4 options], Roles [7 options], Email) wired to Web3Forms.

## 5. Verification Method

- **Files to Inspect**:
  - `src/app/law-firms/page.tsx`
  - `src/app/law-firms/LawFirmsLandingContent.tsx`
  - `src/app/globals.css`
- **Build Verification Command**:
  - `npm run build`
- **Invalidation Conditions**:
  - Usage of hardcoded custom font families outside `--font-mona-sans` / `--font-inter`.
  - Non-standard container widths (deviating from `container-air`).
  - Standard `<img>` tags instead of Next.js `<Image>`.
  - Unhandled form submission state or missing form fields.
