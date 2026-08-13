# Handoff Report — Explorer 2: Framer-Motion Scroll Animation Architecture

## 1. Observation

- **Dependency & Environment Setup**:
  - `package.json` line 15 confirms `framer-motion` version `"^12.27.1"` is installed.
  - Framework context: Next.js `"16.1.2"` App Router with React `"19.2.3"`.

- **Existing Codebase Motion Components & Utilities**:
  - `src/components/motion/RevealWords.tsx`: Word-by-word reveal using staggered `motion.span` (`initial={{ y: "100%", opacity: 0 }}`, `animate={{ y: "0%", opacity: 1 }}`) and `ease: [0.2, 0.8, 0.2, 1]`.
  - `src/components/motion/TiltCard.tsx`: 3D card tilt with `useSpring` (`rotateX`, `rotateY`) and dynamic cursor spotlight background (`useMotionTemplate`).
  - `src/components/motion/Magnetic.tsx`: Magnetic pull physics on hover for CTA buttons.
  - `src/components/motion/ScrollProgress.tsx`: Sticky top scroll progress bar using `useScroll()` and `useSpring(scrollYProgress)`.
  - `src/components/HowWeWork.tsx` & `src/components/ProblemsWeSolve.tsx`: Use `whileInView`, `viewport={{ once: true, margin: "-80px" }}`, `initial={{ opacity: 0, y: 24 }}`, and cubic bezier ease `[0.2, 0.8, 0.2, 1]`.

- **Redesign Requirements (`ORIGINAL_REQUEST.md`)**:
  - Requires modern minimal layout for `/law-firms` (`src/app/law-firms/LawFirmsLandingContent.tsx`).
  - Must include at least 3 distinct types of `framer-motion` scroll animations across the 6 sections:
    1. "A Custom AI Infrastructure for your firm"
    2. "That Helps you to Win More of the Right Business"
    3. "Do your best legal work"
    4. "Sync all your Employee Devices"
    5. "Run the Firm Without the Busywork"
    6. "And Much More"

---

## 2. Logic Chain

1. **Compatibility**: `framer-motion` 12.27.1 is fully installed and working in Next.js App Router client components using `"use client"`.
2. **Reuse & Consistency**: Leveraging existing easing curves (`const EASE = [0.2, 0.8, 0.2, 1] as const`) and existing components (`RevealWords`, `TiltCard`, `Magnetic`) maintains visual unity with the LimeDock design system.
3. **Distinct Animation Architecture**: To satisfy Acceptance Criteria R2 (at least 3 distinct types of `framer-motion` scroll animations), we propose 6 distinct, section-tailored scroll animation patterns:

### Section 1: "A Custom AI Infrastructure for your firm" (Hero Header)
- **Animation Type**: **Staggered Container & Word Reveal**
- **Pattern**:
  - Container variants with `staggerChildren: 0.12`.
  - Headline powered by `<RevealWords text="A Custom AI Infrastructure for your firm" delay={0.1} />`.
  - Subtitle and CTA buttons enter with staggered fade-up (`opacity: 0, y: 28` → `opacity: 1, y: 0`).
  - Hover states on primary buttons use `<Magnetic strength={12}>` and `whileHover={{ scale: 1.02 }}`.
- **Key Code Snippet**:
```tsx
const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};
const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } }
};
```

---

### Section 2: "That Helps you to Win More of the Right Business" (Business Development / Intake)
- **Animation Type**: **Asymmetric Horizontal Split Slide-In**
- **Pattern**:
  - Two-column layout where Left Column (Text & Eyebrow) slides in from the left (`x: -40`, `opacity: 0` → `x: 0`, `opacity: 1`).
  - Right Column (Feature Grid / Intake Cards) slides in from the right (`x: 40`, `opacity: 0` → `x: 0`, `opacity: 1`).
  - Sub-cards inside the right grid stagger in with incremental delays (`delay: index * 0.08`).
- **Key Code Snippet**:
```tsx
const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
};

const slideInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
};
```

---

### Section 3: "Do your best legal work" (Legal Productivity & Case Management)
- **Animation Type**: **Spring Scale-Reveal Grid Cards with 3D Tilt**
- **Pattern**:
  - Cards scale up gently into view from `scale: 0.92`, `opacity: 0`, `y: 20` → `scale: 1`, `opacity: 1`, `y: 0` using spring physics (`type: "spring", stiffness: 260, damping: 20`).
  - Each card is wrapped in `<TiltCard max={6}>` for interactive cursor spotlighting and subtle 3D hover rotation.
- **Key Code Snippet**:
```tsx
const scaleSpringCard = {
  initial: { opacity: 0, scale: 0.92, y: 20 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { type: "spring", stiffness: 240, damping: 22 }
};
```

---

### Section 4: "Sync all your Employee Devices" (Multi-Device Integration)
- **Animation Type**: **Device Node Cascade & Animated SVG Beam Line**
- **Pattern**:
  - Center SVG sync beam animates path length (`pathLength: 0` → `pathLength: 1`) as section scrolls into view.
  - Device nodes (Desktop, Mobile, Tablet, Wearable) cascade into view with directional staggered pop-ins.
  - Active pulse beam loops infinitely (`animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1.02, 0.98] }}`).
- **Key Code Snippet**:
```tsx
const beamPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" }
  }
};
```

---

### Section 5: "Run the Firm Without the Busywork" (Workflow Automation Timeline)
- **Animation Type**: **Vertical Timeline Scroll-Driven Progress Tracker**
- **Pattern**:
  - A vertical connecting line tracks user scroll via `useScroll` and `useSpring` (`scaleY`).
  - Timeline step blocks enter with staggered slide-ups and badge counter springs (`initial={{ scale: 0.5, opacity: 0 }}` → `whileInView={{ scale: 1, opacity: 1 }}`).
- **Key Code Snippet**:
```tsx
const sectionRef = useRef<HTMLElement>(null);
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] });
const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
```

---

### Section 6: "And Much More" (Lead Capture Form CTA)
- **Animation Type**: **Luminous Pulse Glow & Staggered Form Reveal**
- **Pattern**:
  - Ambient luminous glow background gently pulses in loop (`animate={{ opacity: [0.25, 0.45, 0.25] }}`).
  - Form container enters with elevated spring-up (`initial={{ opacity: 0, y: 36 }}` → `whileInView={{ opacity: 1, y: 0 }}`).
  - Form input field rows stagger in sequentially (`delayChildren: 0.08`).
  - Form submit button uses `<Magnetic strength={10}>` with interactive loading feedback via `AnimatePresence`.

---

## 3. Caveats

- **Client Component Boundaries**: `src/app/law-firms/LawFirmsLandingContent.tsx` must keep `"use client";` at line 1.
- **Viewport Margin Consistency**: Use `viewport={{ once: true, margin: "-60px" }}` or `margin: "-80px"` so elements animate smoothly before reaching the center of the viewport and avoid re-triggering during reverse scroll.
- **Hardware Acceleration**: Include `willChange: "transform, opacity"` on animated container elements to ensure 60fps rendering on lower-power mobile devices.

---

## 4. Conclusion

- `framer-motion` 12.27.1 is already available in the project.
- We have specified 6 distinct, highly polished scroll animation patterns across the 6 landing page sections, comfortably exceeding the 3-distinct-types requirement.
- Reusing existing helper components (`RevealWords`, `TiltCard`, `Magnetic`) keeps the bundle size optimal and aligns with LimeDock's signature design language.

---

## 5. Verification Method

- **Build Verification**:
  ```bash
  npm run build
  ```
  Ensure 0 TypeScript errors and 0 lint warnings.

- **Animation Inspection**:
  ```bash
  npm run dev
  ```
  Navigate to `http://localhost:3000/law-firms` in browser and verify that each section triggers its distinct scroll reveal animation smoothly.
