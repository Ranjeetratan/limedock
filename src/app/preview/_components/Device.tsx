'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from 'react';

/**
 * Device mockups.
 *
 * Screenshots previously scrolled inside their frames as the PAGE scrolled,
 * which read as two things moving at once and left the frame half-empty at rest.
 * Here the frame is a real device and the content only moves when the reader
 * points at it — the interaction is theirs to start, so nothing drifts
 * unexpectedly.
 */

/** Shared inner screen: image scrubs from pointer position. */
function Screen({
  src,
  alt,
  radius,
  onScrubChange
}: {
  src: string;
  alt: string;
  radius: string;
  onScrubChange?: (active: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  const target = useMotionValue(0);
  const y = useSpring(target, { stiffness: 120, damping: 30, mass: 0.5 });

  const handleMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current || !imgRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    // Travel is the overflow of the image beyond the visible screen.
    const overflow = Math.max(0, imgRef.current.offsetHeight - rect.height);
    target.set(-ratio * overflow);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => onScrubChange?.(true)}
      onPointerLeave={() => {
        onScrubChange?.(false);
        target.set(0);
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: radius,
        background: '#fff',
        height: '100%',
        cursor: 'ns-resize'
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ width: '100%', display: 'block', y, willChange: 'transform' }}
      />
    </div>
  );
}

/** Hint shown until the reader discovers the frame is interactive. */
function ScrubHint({ visible }: { visible: boolean }) {
  return (
    <motion.div
      aria-hidden
      animate={{ opacity: visible ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        bottom: 14,
        left: '50%',
        translateX: '-50%',
        padding: '6px 14px',
        borderRadius: 'var(--r-pill)',
        background: 'rgba(9,9,9,.82)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--hairline)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap'
      }}
      className="micro"
    >
      Point to scroll
    </motion.div>
  );
}

/** MacBook-style frame. */
export function Laptop({ src, caption }: { src: string; caption?: string }) {
  const [scrubbing, setScrubbing] = useState(false);

  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: 'relative' }}>
        {/* Lid */}
        <div
          style={{
            background: 'linear-gradient(180deg, #2a2a2a, #1a1a1a)',
            borderRadius: '14px 14px 6px 6px',
            padding: '12px 12px 14px',
            boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,.12), 0 24px 60px rgba(0,0,0,.55)'
          }}
        >
          <div style={{ height: 'clamp(220px, 26vw, 340px)', position: 'relative' }}>
            <Screen src={src} alt={caption ?? 'Desktop view'} radius="4px" onScrubChange={setScrubbing} />
            <ScrubHint visible={scrubbing} />
          </div>
        </div>

        {/* Base and hinge */}
        <div
          style={{
            height: 11,
            background: 'linear-gradient(180deg, #3a3a3a, #202020)',
            borderRadius: '0 0 5px 5px',
            margin: '0 -18px',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              translate: '-50% 0',
              width: 92,
              height: 4,
              borderRadius: '0 0 5px 5px',
              background: '#151515'
            }}
          />
        </div>
      </div>

      {caption && (
        <figcaption className="micro" style={{ marginTop: 'var(--md)', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** iPhone-style frame. */
export function Phone({ src, caption }: { src: string; caption?: string }) {
  const [scrubbing, setScrubbing] = useState(false);

  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          background: 'linear-gradient(160deg, #2e2e2e, #141414)',
          borderRadius: 42,
          padding: 9,
          width: 'clamp(190px, 20vw, 240px)',
          margin: '0 auto',
          boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,.14), 0 24px 60px rgba(0,0,0,.55)',
          position: 'relative'
        }}
      >
        <div style={{ height: 'clamp(400px, 42vw, 500px)', position: 'relative' }}>
          <Screen src={src} alt={caption ?? 'Mobile view'} radius={34 + 'px'} onScrubChange={setScrubbing} />

          {/* Dynamic island sits above the screen content. */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 9,
              left: '50%',
              translate: '-50% 0',
              width: 74,
              height: 20,
              borderRadius: 'var(--r-pill)',
              background: '#000',
              zIndex: 2
            }}
          />
          <ScrubHint visible={scrubbing} />
        </div>
      </div>

      {caption && (
        <figcaption className="micro" style={{ marginTop: 'var(--md)', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Neutral framed panel for listings that are not a website. */
export function Panel({ src, caption }: { src: string; caption?: string }) {
  const [scrubbing, setScrubbing] = useState(false);

  return (
    <figure style={{ margin: 0 }}>
      <div
        className="floating"
        style={{
          background: 'var(--surface-1)',
          borderRadius: 'var(--r-xl)',
          padding: 10,
          position: 'relative'
        }}
      >
        <div style={{ height: 'clamp(220px, 24vw, 320px)', position: 'relative' }}>
          <Screen src={src} alt={caption ?? ''} radius="var(--r-md)" onScrubChange={setScrubbing} />
          <ScrubHint visible={scrubbing} />
        </div>
      </div>
      {caption && (
        <figcaption className="micro" style={{ marginTop: 'var(--md)', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
