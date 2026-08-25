'use client';

import {
  motion, useScroll, useTransform, useSpring, useReducedMotion, useInView,
  type MotionValue
} from "framer-motion";
import { useRef, type ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A single odometer column.
 * The strip holds 0-9 stacked vertically and slides to the target digit, so the
 * number physically rolls into place instead of ticking through re-renders.
 */
function Digit({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduced = useReducedMotion();

  return (
    <span
      ref={ref}
      style={{ display: 'inline-block', overflow: 'hidden', height: '1em', lineHeight: 1, verticalAlign: 'bottom' }}
    >
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '0%' }}
        animate={inView || reduced ? { y: `-${value * 10}%` } : undefined}
        transition={reduced ? { duration: 0 } : { duration: 1.4, delay, ease: EASE }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} style={{ display: 'block', height: '1em', lineHeight: 1 }}>
            {i}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/**
 * Odometer-style number.
 *
 * Each digit rolls independently with a slight cascade. Far more arresting than
 * a counter that simply increments, and it makes the figure feel weighed rather
 * than calculated.
 */
export function RollingNumber({
  value,
  decimals = 0,
  className,
  style
}: {
  value: number;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const text = value.toFixed(decimals);

  return (
    <span className={className} style={{ display: 'inline-flex', ...style }}>
      {Array.from(text).map((ch, i) =>
        /\d/.test(ch) ? (
          <Digit key={i} value={Number(ch)} delay={i * 0.09} />
        ) : (
          <span key={i}>{ch}</span>
        )
      )}
    </span>
  );
}

/**
 * Full-viewport statement.
 *
 * A rhythm break: one sentence, oversized, brightening word by word as it is
 * scrolled through. Sections of stacked cards need somewhere for the eye to
 * rest, and a single held thought does that better than more whitespace.
 */
export function Statement({
  text,
  eyebrow,
  accent
}: {
  text: string;
  eyebrow?: string;
  accent?: 'violet' | 'magenta' | 'orange' | 'coral';
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });

  const words = text.split(' ');
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0.12]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '85svh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {accent && !reduced && (
        // Atmosphere, kept behind the type and never a section ground.
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            width: '52vw',
            height: '52vw',
            borderRadius: '50%',
            filter: 'blur(120px)',
            background: `var(--gradient-${accent})`,
            opacity: glowOpacity,
            left: '58%',
            top: '-10%',
            pointerEvents: 'none'
          }}
        />
      )}

      <div className="container" style={{ position: 'relative' }}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        {/* Wraps within the container: an 18ch measure at display size pushed
            the type past the right gutter and broke the page's left rhythm. */}
        <p
          className="d-xl"
          style={{ maxWidth: 'min(100%, 20ch)', margin: 0, overflowWrap: 'break-word' }}
        >
          {words.map((w, i) => {
            const start = i / words.length;
            const end = Math.min(1, start + 2 / words.length);
            return (
              <StatementWord key={i} progress={scrollYProgress} start={start} end={end} reduced={!!reduced}>
                {w}
              </StatementWord>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function StatementWord({
  children,
  progress,
  start,
  end,
  reduced
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduced: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const blur = useTransform(progress, [start, end], ['blur(7px)', 'blur(0px)']);

  if (reduced) return <span>{children} </span>;

  // The space is a sibling text node, not padding inside the span: spacing the
  // words with margin alone ran them together in textContent, so copying the
  // sentence produced "Attentionwasnever".
  return (
    <>
      <motion.span
        style={{ opacity, filter: blur, display: 'inline-block', willChange: 'opacity, filter' }}
      >
        {children}
      </motion.span>{' '}
    </>
  );
}

/**
 * Cards that stack as they are scrolled past.
 *
 * Each pins in turn and the one beneath scales back, so the reader builds a
 * physical pile rather than watching items scroll away. Used where the items are
 * a sequence that accumulates into an argument.
 */
export function StackedCards({
  items,
  header
}: {
  items: ReactNode[];
  header?: ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section className="section">
        <div className="container">
          {header}
          <div style={{ display: 'grid', gap: 'var(--md)', marginTop: 'var(--xxl)' }}>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">{header}</div>
      <div style={{ marginTop: 'var(--xxl)' }}>
        {items.map((item, i) => (
          <StackCard key={i} index={i} total={items.length}>
            {item}
          </StackCard>
        ))}
      </div>
    </section>
  );
}

function StackCard({
  children,
  index,
  total
}: {
  children: ReactNode;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.2', 'end 0.15'] });

  // Recede as the next card arrives on top.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const smoothScale = useSpring(scale, { stiffness: 120, damping: 26 });
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        // Each card parks slightly lower, so the stack is visible as a stack.
        top: `calc(12vh + ${index * 18}px)`,
        zIndex: index + 1,
        marginBottom: 'var(--xl)'
      }}
    >
      <motion.div
        className="container"
        style={{ scale: smoothScale, opacity, transformOrigin: 'top center' }}
      >
        {children}
        <div
          className="micro"
          style={{ marginTop: 'var(--sm)', textAlign: 'right', opacity: 0.4 }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </motion.div>
    </div>
  );
}
