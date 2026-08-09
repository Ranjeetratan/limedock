## 2026-08-09T18:02:32Z
You are Worker 1 (teamwork_preview_worker).
Your working directory is: /Users/ranjeetratan/Desktop/limedock-website/.agents/teamwork_preview_worker_m2_1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Objective:
Migrate all standard HTML <img> tags in `src/app/real-estate-services/RealEstateLandingContent.tsx` and `src/app/law-firms/LawFirmsLandingContent.tsx` to Next.js <Image> component.

Tasks:
1. In `src/app/real-estate-services/RealEstateLandingContent.tsx`:
   - Import `Image` from `"next/image"`.
   - Replace all 5 standard `<img>` tags with Next.js `<Image>`:
     a) Hero background (around lines 116-120):
        `<Image src="/images/real-estate/hero.jpg" alt="Luxury property" fill priority sizes="100vw" className="object-cover object-center" />`
     b) Accent photo (around lines 239-243):
        `<Image src="/images/real-estate/agent-desk.jpg" alt="Real estate agent at work" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover object-center" />`
     c) Pain grid cards loop (around lines 285-289):
        `<Image src={pain.img} alt={pain.sub} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />`
     d) Workflow cards loop (around lines 407-411):
        `<Image src={wf.img} alt={wf.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />`
     e) Closing CTA background (around lines 425-429):
        `<Image src="/images/real-estate/interior.jpg" alt="Modern property interior" fill sizes="100vw" className="object-cover object-center" />`

2. In `src/app/law-firms/LawFirmsLandingContent.tsx`:
   - Import `Image` from `"next/image"`.
   - Replace all 5 standard `<img>` tags with Next.js `<Image>`:
     a) Hero background (around lines 100-104):
        `<Image src="/images/law-firms/hero.jpg" alt="Luxury modern law firm boardroom" fill priority sizes="100vw" className="object-cover object-center" />`
     b) Accent photo (around lines 218-222):
        `<Image src="/images/law-firms/partner.jpg" alt="Law partner at desk" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover object-center" />`
     c) Pain grid cards loop (around lines 264-268):
        `<Image src={pain.img} alt={pain.sub} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />`
     d) Workflow cards loop (around lines 385-389):
        `<Image src={wf.img} alt={wf.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />`
     e) Closing CTA background (around lines 404-408):
        `<Image src="/images/law-firms/team.jpg" alt="Law team walking" fill sizes="100vw" className="object-cover object-center" />`

3. Verify:
   - Run `npm run build` on `/Users/ranjeetratan/Desktop/limedock-website` and capture the exact terminal output.
   - Confirm zero standard `<img>` tags remain in either file.

4. Write handoff report:
   - Save report to `/Users/ranjeetratan/Desktop/limedock-website/.agents/teamwork_preview_worker_m2_1/handoff.md`.
   - Include modified files, verification commands, and full build output.
   - Send summary message back to orchestrator.
