'use client';

import { motion, useInView, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from 'react';

/**
 * Shared motion pieces.
 *
 * The brand is a poster: type is huge and tightly tracked, and motion should
 * feel like the page settling rather than sliding around. Everything here uses
 * a single expo-out curve and short travel — long slides read as a template.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts a block the first time it enters. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reveals display type one line at a time.
 * Each line is clipped and rises into place, which suits the poster-grade
 * headline cadence far better than fading the whole block at once.
 */
export function LineReveal({
  lines,
  className,
  delay = 0
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : undefined}
            transition={{ duration: 1.1, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/** Staggers children in sequence as the group enters. */
export function Stagger({
  children,
  className,
  step = 0.07
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: i * step, ease: EASE }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

/** Counts a number up once, on entry. */
export function CountUp({
  value,
  decimals = 0,
  className,
  suffix = ''
}: {
  value: number;
  decimals?: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  const spring = useSpring(0, { stiffness: 60, damping: 18, restDelta: 0.001 });
  const text = useTransform(spring, (v) => v.toFixed(decimals) + suffix);

  if (inView) spring.set(value);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

/**
 * Parallax offset tied to an element's own progress through the viewport.
 * Returns a MotionValue for the caller to bind to `y`.
 */
export function useParallax(ref: React.RefObject<HTMLElement | null>, distance = 60): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
}

export { EASE };
