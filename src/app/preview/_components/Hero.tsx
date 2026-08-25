'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from 'react';
import { LineReveal, Reveal } from "./motion-primitives";
import type { PreviewPayload } from "@/lib/previewTypes";

/**
 * Opening statement.
 *
 * One assertive line per band, per the brand's poster rhythm. The whole block
 * drifts and fades as it leaves rather than pinning — the page should feel like
 * it is being read, not scrubbed.
 */
export function Hero({ payload }: { payload: PreviewPayload }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const business = payload.verdict.business ?? {};
  const needsRebuild = payload.verdict.category === 'bad';

  return (
    <section
      ref={ref}
      style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', position: 'relative' }}
    >
      <motion.div className="container" style={{ y, opacity, scale, width: '100%' }}>
        <Reveal>
          <div className="eyebrow">Limedock · Prepared for {payload.firm}</div>
        </Reveal>

        <LineReveal
          className="d-xxl"
          delay={0.1}
          lines={[
            payload.firm,
            <span key="l2" className="muted">
              {needsRebuild ? 'Website & growth review' : 'Growth & automation review'}
            </span>
          ]}
        />

        <Reveal delay={0.45}>
          <div
            style={{
              display: 'flex',
              gap: 'var(--xxl)',
              flexWrap: 'wrap',
              marginTop: 'var(--xxl)',
              paddingTop: 'var(--lg)'
            }}
            className="rule"
          >
            {business.niche && <Fact label="Practice" value={business.niche} />}
            {business.serviceArea && <Fact label="Serving" value={business.serviceArea} />}
            {typeof payload.audit.signalScore === 'number' && (
              <Fact label="Health score" value={`${payload.audit.signalScore}/100`} />
            )}
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          bottom: 'var(--xxl)',
          left: '50%',
          x: '-50%',
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])
        }}
        className="micro"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="micro" style={{ marginBottom: 'var(--xxs)' }}>
        {label}
      </div>
      <div className="body-sm ink" style={{ fontWeight: 500 }}>
        {value}
      </div>
    </div>
  );
}
