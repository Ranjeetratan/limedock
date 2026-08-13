# Original User Request

## 2026-08-09T18:00:18Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Delegate to teamwork_preview

Refactor the `/real-estate-services` and `/law-firms` pages in a Next.js application to optimize image loading performance. All existing images must be kept, but load times must be significantly reduced by migrating to the Next.js `<Image>` component.

Working directory: /Users/ranjeetratan/Desktop/limedock-website
Integrity mode: development

## Requirements

### R1. Implement Next.js Image Optimization
Replace all standard HTML `<img>` tags on the `/real-estate-services` and `/law-firms` pages with the Next.js `<Image>` component to enable automatic format conversion and lazy loading. 

*(Note: The pages heavily use `absolute inset-0 w-full h-full object-cover` patterns for background images. Ensure the `<Image>` component is implemented correctly using the `fill` prop or equivalent to maintain the exact visual layout.)*

## Acceptance Criteria

### Performance Verification
- [ ] No standard `<img>` tags remain in `src/app/real-estate-services/RealEstateLandingContent.tsx` or `src/app/law-firms/LawFirmsLandingContent.tsx`.
- [ ] `npm run build` completes successfully with zero TypeScript or linting errors.
- [ ] The visual layout and aspect ratios of all images remain identical to the current design (no visual regressions).

## 2026-08-13T14:50:32Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Delegate to teamwork_preview

Redesign the `/law-firms` landing page using a modern, minimal aesthetic with distinct, premium scroll animations (framer-motion) for each section, incorporating the exact text from the provided wireframe and a complex lead capture form configured with an external form service.

Working directory: /Users/ranjeetratan/Desktop/limedock-website
Integrity mode: development

## Requirements

### R1. Content & Minimal Layout
Replace the current `/law-firms` content (`src/app/law-firms/LawFirmsLandingContent.tsx`) with the exact copy provided. The layout must be modern and minimal, strictly using the existing LimeDock design system (fonts, signature colors, etc.) but arranged in a spacious, premium way. 
Sections to include:
1. A Custom AI Infrastructure for your firm
2. That Helps you to Win More of the Right Business
3. Do your best legal work
4. Sync all your Employee Devices
5. Run the Firm Without the Busywork
6. And Much More

### R2. Premium Scroll Animations
Implement distinct, premium scroll animations using `framer-motion` for each section as the user scrolls down the page. The animations should feel highly polished and vary slightly per section (e.g., slide-ups, fades, subtle scaling, staggered children) to make the page feel dynamic and premium.

### R3. Lead Capture Form Integration
Implement a lead capture form at the bottom (or in a sticky sidebar) with the following fields:
- Company Website (Text)
- Area of Practice (Dropdown with 16 legal options provided)
- Firm Size (Dropdown: Solo, Small, Mid-Sized, Enterprise)
- Roles (Dropdown: Associate Attorney, Billing Manager, IT Manager, Legal Administrator, Managing Partner, Paralegal, Solo Lawyer)
- Email (Email)
- Submit button: "Get Customized Workflow"

The form must be configured using a free external service like Web3Forms or Formspree so submissions are sent to `limedockadmn@gmail.com`. You may use a placeholder form ID/key if necessary, but the UI and submission logic must be fully wired up.

## Acceptance Criteria

### Performance & Verification
- [ ] `npm run build` completes successfully with zero TypeScript or linting errors.
- [ ] The page features at least 3 distinct types of `framer-motion` scroll animations across the different sections.
- [ ] The lead form contains all 5 required fields and correctly structured dropdown options.
- [ ] The form contains a submit handler wired to an external submission service (e.g., Web3Forms `https://api.web3forms.com/submit`).
