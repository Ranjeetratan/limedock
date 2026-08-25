'use client';

import { Reveal, Stagger } from "./motion-primitives";
import { RollingNumber } from "./Kinetic";
import { ScrollWords, SplitHeading } from "./ScrollText";
import type { PreviewPayload } from "@/lib/previewTypes";
import { withEmphasis } from "@/lib/previewHighlight";

/**
 * Where the business stands.
 *
 * The scorecard keeps the report's three-state honesty: a feature we cannot
 * reliably detect reads "Not detected", never a confident "No". A prospect who
 * spots one wrong row stops trusting every other one.
 */
export function Standing({ payload }: { payload: PreviewPayload }) {
  const s = payload.audit.signals ?? {};
  const score = payload.audit.signalScore;

  const RELIABLE: Record<string, boolean> = {
    https: true,
    hasViewportMeta: true,
    hasTitle: true,
    metaDescription: true,
    ...(s.reliableNegatives ?? {})
  };

  const rows: { label: string; key: string; value: boolean }[] = [
    { label: 'Secure (HTTPS)', key: 'https', value: !!s.https },
    { label: 'Mobile-ready', key: 'hasViewportMeta', value: !!s.hasViewportMeta },
    { label: 'Page title', key: 'hasTitle', value: !!s.hasTitle },
    { label: 'Search description', key: 'metaDescription', value: !!s.metaDescription },
    { label: 'Structured data', key: 'hasSchemaOrg', value: !!s.hasSchemaOrg },
    { label: 'Contact form', key: 'hasContactForm', value: !!s.hasContactForm },
    { label: 'Live chat', key: 'hasChatWidget', value: !!s.hasChatWidget },
    { label: 'Click-to-call', key: 'hasPhoneLink', value: !!s.hasPhoneLink }
  ];

  const stateOf = (r: { key: string; value: boolean }) =>
    r.value ? 'yes' : RELIABLE[r.key] === true ? 'no' : 'unknown';

  const MARK = { yes: 'Yes', no: 'No', unknown: 'Not detected' } as const;
  const COLOR = { yes: 'var(--success)', no: '#ef4444', unknown: 'var(--ink-muted)' } as const;

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">Where you stand</div>
        </Reveal>
        <SplitHeading className="d-lg" lines={[`${payload.firm} today`]} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
            gap: 'var(--xxl)',
            marginTop: 'var(--xxl)',
            alignItems: 'start'
          }}
          className="standing-grid"
        >
          {typeof score === 'number' && (
            <Reveal delay={0.1}>
              <div className="spot spot-violet">
                <div
                  className="d-xxl"
                  style={{ fontSize: 'clamp(64px, 8vw, 110px)', lineHeight: 0.85 }}
                >
                  <RollingNumber value={score} />
                </div>
                <div className="body-sm" style={{ color: 'rgba(255,255,255,.75)', marginTop: 'var(--sm)' }}>
                  Health score out of 100
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.16}>
            {payload.verdict.summary && (
              <ScrollWords
                text={payload.verdict.summary}
                className="subhead"
                style={{ marginBottom: 'var(--lg)' }}
              />
            )}
            {payload.verdict.business?.positioning && (
              <p className="body-lg">{payload.verdict.business.positioning}</p>
            )}
          </Reveal>
        </div>

        <Stagger
          className="checks-grid"
          step={0.05}
        >
          {rows.map((r) => {
            const st = stateOf(r);
            return (
              <div
                key={r.key}
                className="card"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--sm)', padding: 'var(--md) var(--lg)' }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 'var(--r-full)',
                    background: COLOR[st],
                    flex: '0 0 auto'
                  }}
                />
                <span className="body-sm ink">{r.label}</span>
                <span className="micro" style={{ marginLeft: 'auto' }}>
                  {MARK[st]}
                </span>
              </div>
            );
          })}
        </Stagger>
      </div>

      <style>{`
        .checks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--sm);
          margin-top: var(--xxl);
        }
        @media (max-width: 810px) {
          .standing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
