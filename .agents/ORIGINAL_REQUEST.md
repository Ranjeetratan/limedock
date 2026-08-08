# Original User Request

## 2026-08-08T09:39:21Z

Build a hyper-personalized, premium landing page at `/real-estate-services` for LimeDock's real estate vertical — a full-depth page (homepage quality, not template quality) that speaks directly to the exact operational, marketing, and growth pains that real estate founders and brokerage owners face, and shows how LimeDock's owned automation systems fix them.

Working directory: /Users/ranjeetratan/Desktop/limedock-website
Integrity mode: development

---

## Context (read before building)

**LimeDock** builds owned workflow automations — not rented bot seats. Code stays with the customer. Workflows plug into their Slack, CRM, and internal tools.

**Brand design system** (must match the existing site exactly):
- Font: Mona Sans (local font, `--font-mona-sans` variable)
- Color tokens: `bg-canvas`, `text-ink`, `text-body`, `text-muted`, `bg-signature-forest` (dark green), `bg-signature-cream`, `bg-signature-mint`, `bg-signature-peach`, `bg-signature-coral`, `bg-signature-yellow`, `border-hairline`
- CSS classes already defined: `btn-primary`, `btn-secondary`, `eyebrow`, `dot`, `signature-card`, `card-luminous`, `section-air`, `container-air`, `text-display-xl`, `text-display-lg`, `text-display-md`, `text-title-lg`, `text-title-sm`, `text-body-md`, `text-caption`, `focus-ring`
- Animations: framer-motion with `whileInView`, parallax scroll transforms, `AnimatePresence`
- Existing motion components available: `motion/Magnetic`, `motion/TiltCard`, `motion/RevealWords`, `motion/ScrollProgress`, `motion/CursorBlob`
- Existing icon components: `components/icons/Icons.tsx` (`IconClock`, `IconCalendar`, `IconSpark`, `IconLock`, etc.)
- Existing flow diagram components: `components/flow/FlowPrimitives.tsx` (`FlowCanvas`, `FlowNode`, `FlowEdge`, `FlowChip`, `FlowLabel`)
- Shared: `BOOK_DEMO_URL`, `absoluteUrl()` from `@/lib/site`
- Shared: `Navbar`, `Footer`, `JsonLd` components

**Real estate pains to address** (real, specific, not generic):
- Speed-to-lead: portal leads (Zillow, Realtor.com, website forms) sit in a shared inbox while the team manually qualifies and assigns — competitors respond in 5 minutes
- Listing follow-up runs on whoever remembers: price changes, open house alerts, stale inquiries all depend on agents checking a board
- Showing feedback lives in scattered SMS/Slack DMs — sellers don't hear back, listing agents miss hot interest signals
- Buyer and seller nurture dies when the market gets loud or a deal goes to contract
- Agent coordination (handoffs, digest of open leads, stalled listings) doesn't happen unless the team lead manually compiles it
- Marketing: no systematic way to turn closed deals into testimonials, referral follow-ups, or neighborhood marketing
- Zero visibility into response time, abandoned leads, or which agents actually close loops — until the weekly scramble

**What LimeDock builds for real estate teams:**
- Portal lead → Slack + CRM first touch (route, qualify, assign, draft reply — in minutes)
- Listing & nurture loops (stage-aware sequences for new inquiries, open-house visitors, price-drop alerts)
- Showing feedback automation (post-showing nudge → structured feedback → seller summary → CRM update)
- Agent coordination digests (daily/deal-stage digests of open leads, stalled listings, unanswered follow-ups)
- Referral & review capture (post-close sequences to capture Google reviews, referral intros)
- Marketing attribution (track which sources close, which agents convert — live in a dashboard)

**Existing `/real-estate` page** uses the generic `VerticalLanding` component (template layout). The new `/real-estate-services` page must be a **fully custom, premium page** — the same quality level as the homepage (`src/app/page.tsx`), not a VerticalLanding instance.

---

## Requirements

### R1. Create the page at `src/app/real-estate-services/page.tsx`

Build a Next.js App Router page at the route `/real-estate-services` with:
- Full SEO metadata (title, description, canonical, OG, Twitter)
- JSON-LD structured data (WebPage + Service schema)
- Import and use Navbar and Footer

### R2. Build a rich, multi-section custom page component

The page must have these distinct sections (each a visually differentiated block):

1. **Hero** — Two-column: left has eyebrow tag, bold headline speaking directly to the real estate founder's pain, support copy, dual CTAs (Book demo + secondary). Right has a live "workflow feed" — a mockup showing portal leads auto-routing to Slack with agent assignment (similar to `HeroSlack` but real-estate themed: property address, lead source, agent assigned, first-touch drafted). Uses framer-motion entrance animations.

2. **Pain section** — A numbered pain list (like `VerticalLanding`'s pain section) but with premium treatment: dark `bg-signature-forest` card, left side has the problem framing, right side has 6–7 specific real estate pains as numbered items. Each pain should be visceral and specific (not generic).

3. **"Manual vs. automated" flowchart** — Adapt the `FromChaosToClarity` flow diagram pattern for real estate: left column shows manual real-estate tasks (SDR manually assigns portal leads, agent texts feedback, team lead compiles digest, etc.), center hub is "LimeDock builds", right column shows the automated workflows (lead response loop, nurture sequence, showing feedback, agent digest).

4. **How it works** — Three-step process (Discovery → Architecture → Live in your stack). Uses the `card-luminous` card style with numbered steps.

5. **Workflows showcase** — The 5–6 specific real estate automations LimeDock ships, shown as a grid of cards (cream/mint/peach alternating backgrounds, title + detail). Include a prominent "Pick the workflow losing you the most leads" framing.

6. **Proof / metrics strip** — 4 TiltCard metric cards (same pattern as homepage Hero proof cards): speed-to-lead time saved, first workflow live in 48h, Friday weekly delivery cadence, 100% code ownership.

7. **Closing CTA** — Full-width gradient banner (cream → mint) with headline + "Book a workflow call" primary CTA button.

### R3. Match the existing site's design language exactly

- Use only the CSS classes and color tokens already defined in the project's global CSS
- Do NOT add new CSS files or Tailwind config
- All animations via framer-motion (same easing curves as existing components: `[0.2, 0.8, 0.2, 1]`)
- Use `whileInView` with `viewport={{ once: true, margin: "-80px" }}` for scroll reveals
- Reuse existing components: `Navbar`, `Footer`, `JsonLd`, icons from `Icons.tsx`, flow primitives from `FlowPrimitives.tsx`, motion utilities from the motion folder

### R4. Wire the route into the site

- Add `/real-estate-services` to the Navbar links (alongside existing Directories/Blog) OR as a sub-link under a "For teams" dropdown — whichever feels consistent with the current nav structure
- Add the route to `src/app/sitemap.ts`
- The page must be fully TypeScript-valid (no type errors, especially `strokeWidth` must be typed as `number | undefined`)

---

## Acceptance Criteria

### Page existence & routing
- [ ] Navigating to `/real-estate-services` renders the page without errors
- [ ] `npm run build` completes successfully with zero TypeScript errors
- [ ] The page has correct `<title>` and `<meta name="description">` tags
- [ ] JSON-LD is present in the page HTML

### Design quality
- [ ] The page has at least 6 visually distinct sections
- [ ] The hero section has a two-column layout with an animated right-side workflow/Slack mockup
- [ ] At least one section uses the `bg-signature-forest` dark card (matching existing brand pattern)
- [ ] At least one section uses the flow diagram pattern (FlowCanvas/FlowNode/FlowEdge)
- [ ] Metric cards use the TiltCard component with color backgrounds
- [ ] All framer-motion animations use `whileInView` (not just `animate`) for scroll reveal
- [ ] No raw hex colors in JSX — all colors use existing CSS token classes

### Content quality
- [ ] Pain points are real-estate-specific (mention portals, showings, listing follow-up, agents, nurture)
- [ ] Workflow names match LimeDock's real estate automation suite
- [ ] CTAs use `BOOK_DEMO_URL` from `@/lib/site`
- [ ] The page clearly differentiates from the existing `/real-estate` page (far more depth and sections)

### Technical
- [ ] No lint errors from `eslint`
- [ ] All new components are TypeScript-valid
- [ ] Sitemap includes `/real-estate-services`
- [ ] The page is responsive (mobile-first, no horizontal overflow)

---

## Verification

Run `npm run build` in `/Users/ranjeetratan/Desktop/limedock-website` — it must exit with code 0. Then run `npm run dev` and visually verify the page at `http://localhost:3000/real-estate-services`.
