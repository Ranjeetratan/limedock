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
