'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from 'react';

/**
 * Pinned horizontal track.
 *
 * Dense sections were arriving as a grid of near-identical cards, which reads as
 * a wall no matter how it is styled. Pinning the section and moving one card at
 * a time gives each item the whole viewport, so the reader finishes a thought
 * before the next arrives.
 *
 * The section reserves real vertical height (one viewport per card), so the page
 * never feels like it has stopped responding — scrolling always advances
 * something, and the browser scrollbar stays honest about progress.
 */
export function HorizontalTrack({
  items,
  header,
  cardWidth = 560
}: {
  items: ReactNode[];
  header: ReactNode;
  cardWidth?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Travel must be a plain number: useSpring only interpolates numerics, and a
  // string like "calc(-1560px - 60px)" silently yields nothing — the track stayed
  // put while the progress rail, which skips the spring, kept moving.
  const GAP = 20;
  const distance = Math.max(0, items.length - 1) * (cardWidth + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Smoothed so a trackpad flick glides rather than snapping.
  const smoothX = useSpring(x, { stiffness: 90, damping: 24, mass: 0.4 });

  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // A pinned section that moves content sideways is disorienting for anyone who
  // has asked for reduced motion, and it hides content behind a gesture they may
  // not expect. Fall back to an ordinary vertical stack: same content, no pin.
  if (reduced) {
    return (
      <section className="section">
        <div className="container">
          {header}
          <div className="track-fallback">
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
        </div>
        <style>{`
          .track-fallback {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: var(--md);
            margin-top: var(--xxl);
          }
        `}</style>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      style={{ height: `${Math.max(2, items.length) * 90}svh`, position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          display: 'flex',
          flexDirection: 'column',
          // Anchored to the top rather than centred: once the cards grew past the
          // remaining space, centring pushed the section heading off-screen and
          // overflow:hidden clipped it away entirely.
          justifyContent: 'flex-start',
          paddingTop: 'clamp(var(--xxl), 9vh, 110px)',
          paddingBottom: 'var(--lg)',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ width: '100%' }}>
          {header}
        </div>

        <motion.div
          style={{
            x: smoothX,
            display: 'flex',
            gap: `${GAP}px`,
            paddingLeft: 'max(var(--xl), calc((100vw - var(--container)) / 2 + var(--xl)))',
            marginTop: 'var(--xl)',
            flex: '1 1 auto',
            minHeight: 0
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{ width: cardWidth, flex: `0 0 ${cardWidth}px`, height: '100%' }}
            >
              {item}
            </div>
          ))}
        </motion.div>

        {/* Progress rail: makes the horizontal movement legible as a sequence. */}
        <div
          className="container"
          style={{ width: '100%', marginTop: 'var(--xl)' }}
        >
          <div style={{ height: 1, background: 'var(--hairline)', position: 'relative' }}>
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: 1,
                width: progress,
                background: 'var(--ink)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
