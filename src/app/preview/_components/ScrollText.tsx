'use client';

import { motion, useScroll, useTransform, useReducedMotion, useInView, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from 'react';

/**
 * Scroll-scrubbed typography.
 *
 * The brand is a poster, so type is the main event and deserves to be the thing
 * that moves. These are driven by scroll POSITION rather than a one-shot entry
 * animation — the reader controls the reveal, which is what makes it feel
 * crafted rather than decorative.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** One word, lit as the paragraph passes its threshold. */
function Word({
  children,
  progress,
  start,
  end
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  // Muted → full ink, plus a small lift, so the line reads as it brightens.
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);

  return (
    // A real space is emitted as a sibling text node rather than inside the
    // span: margin alone spaced the words visually but ran them together in
    // textContent, so copying the paragraph produced "Attentionwasnever".
    <>
      <motion.span
        style={{ opacity, y, display: 'inline-block', willChange: 'opacity, transform' }}
      >
        {children}
      </motion.span>{' '}
    </>
  );
}

/**
 * Brightens a paragraph word by word as it crosses the viewport.
 *
 * Doubles as a readability device: the eye is pulled along the line instead of
 * meeting a finished block of grey.
 */
export function ScrollWords({
  text,
  className,
  style
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts as the paragraph enters the lower third, finishes near centre.
    offset: ['start 0.85', 'start 0.35']
  });

  const words = text.split(' ');

  if (reduced) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.8 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} start={start} end={end}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

/**
 * Display heading that assembles character by character from a clipped mask.
 *
 * Each line is its own overflow-hidden strip, so characters rise from nothing
 * rather than fading in place — the poster-grade cadence the brand asks for.
 */
export function SplitHeading({
  lines,
  className,
  delayPerChar = 0.016
}: {
  lines: string[];
  className?: string;
  delayPerChar?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0 });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {lines.map((l, i) => (
          <span key={i} style={{ display: 'block' }}>
            {l}
          </span>
        ))}
      </div>
    );
  }

  let charIndex = 0;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}>
          {Array.from(line).map((ch, ci) => {
            const delay = charIndex++ * delayPerChar;
            return (
              <motion.span
                key={ci}
                style={{ display: 'inline-block', willChange: 'transform' }}
                initial={{ y: '110%', rotateX: -55 }}
                // Driven by an explicit useInView rather than whileInView: inside a
                // pinned section the viewport check could settle before the sticky
                // layout did, leaving every character masked while the heading still
                // occupied its full height.
                animate={inView ? { y: '0%', rotateX: 0 } : undefined}
                transition={{ duration: 1.05, delay, ease: EASE }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

/**
 * Screenshot that scrolls through its own content inside a fixed frame.
 *
 * A static capture of a long page only ever shows the fold. Scrubbing the image
 * inside the frame lets the reader see the whole site as they pass — the most
 * relevant thing on the page moving under their own control.
 */
export function ScrollingShot({
  src,
  caption,
  frameHeight = 460
}: {
  src: string;
  caption: string;
  frameHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Travels most of the image's own height; the exact figure is unknown until
  // load, so a generous percentage keeps it moving without overshooting badly.
  const y = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-62%']);
  const frameY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <motion.figure
      ref={ref}
      className="card floating"
      style={{ margin: 0, y: reduced ? 0 : frameY, scale: reduced ? 1 : scale }}
    >
      <div
        style={{
          height: frameHeight,
          overflow: 'hidden',
          borderRadius: 'var(--r-lg)',
          background: 'var(--surface-2)',
          position: 'relative'
        }}
      >
        <motion.img
          src={src}
          alt={caption}
          style={{ width: '100%', display: 'block', y: reduced ? 0 : y, willChange: 'transform' }}
        />
      </div>
      <figcaption className="micro" style={{ marginTop: 'var(--sm)', textAlign: 'center' }}>
        {caption}
      </figcaption>
    </motion.figure>
  );
}
