'use client';

import { Reveal } from "./motion-primitives";
import { HorizontalTrack } from "./HorizontalTrack";
import { SplitHeading } from "./ScrollText";
import { withEmphasis } from "@/lib/previewHighlight";
import { CAPABILITY_LABEL, type PreviewPayload } from "@/lib/previewTypes";

/**
 * Card treatments.
 *
 * A run of identical charcoal rectangles reads as a spreadsheet no matter how
 * good the copy is. The design system's answer is the gradient spot card —
 * an atmosphere device meant to break the rhythm of a grid — so every third card
 * takes one, and the rest carry a coloured edge drawn from the same family. The
 * accent blue is left alone; it belongs to links and focus only.
 */
const SPOTLIGHTS = ['violet', 'magenta', 'orange', 'coral'] as const;

/** Colour per capability, so a reader learns to recognise the type at a glance. */
const CAPABILITY_ACCENT: Record<string, string> = {
  sales: 'var(--gradient-violet)',
  marketing: 'var(--gradient-orange)',
  copilots: 'var(--gradient-magenta)',
  data: 'var(--gradient-coral)',
  aiops: 'var(--gradient-violet)',
  management: 'var(--gradient-orange)'
};

const AREA_ACCENT: Record<string, string> = {
  operations: 'var(--gradient-violet)',
  sales: 'var(--gradient-magenta)',
  marketing: 'var(--gradient-orange)',
  'digital presence': 'var(--gradient-coral)'
};

/**
 * Where the manual work is.
 *
 * Each card leads with an oversized index so the sequence is felt before it is
 * read, and the accent edge distinguishes one finding from the next.
 */
export function Findings({ payload }: { payload: PreviewPayload }) {
  const pains = payload.verdict.painPoints ?? [];
  if (!pains.length) return null;

  const header = (
    <>
      <Reveal>
        <div className="eyebrow">The real cost</div>
      </Reveal>
      <SplitHeading className="d-lg" lines={['Where the work is', 'still done by hand']} />
    </>
  );

  const cards = pains.map((p, i) => {
    const accent = AREA_ACCENT[String(p.area ?? '').toLowerCase()] ?? 'var(--gradient-violet)';
    const isSpotlight = i % 3 === 2;

    if (isSpotlight) {
      const tone = SPOTLIGHTS[i % SPOTLIGHTS.length];
      return (
        <article
          key={i}
          className={`spot spotlight-${tone}`}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <div
            className="d-xxl"
            style={{ fontSize: 'clamp(56px, 6vw, 88px)', lineHeight: 0.8, opacity: 0.35 }}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className="d-md" style={{ marginTop: 'var(--lg)', marginBottom: 'var(--md)' }}>
            {p.problem}
          </h3>
          {p.evidence && (
            <p className="body" style={{ color: 'rgba(255,255,255,.82)', marginBottom: 'var(--lg)' }}>
              {p.evidence}
            </p>
          )}
          {p.impact && (
            <p
              className="body-lg"
              style={{
                color: '#fff',
                marginTop: 'auto',
                paddingTop: 'var(--lg)',
                borderTop: '1px solid rgba(255,255,255,.25)',
                marginBottom: 0
              }}
            >
              {p.impact}
            </p>
          )}
        </article>
      );
    }

    return (
      <article
        key={i}
        className="card floating"
        style={{
          padding: 'var(--xl)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderTop: `2px solid ${accent}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--lg)' }}>
          <div
            className="d-xxl"
            style={{
              fontSize: 'clamp(44px, 5vw, 68px)',
              lineHeight: 0.8,
              color: accent,
              flex: '0 0 auto'
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          {p.area && (
            <span
              className="micro"
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: 6,
                color: accent
              }}
            >
              {p.area}
            </span>
          )}
        </div>

        <h3 className="d-md" style={{ marginTop: 'var(--lg)', marginBottom: 'var(--md)' }}>
          {p.problem}
        </h3>

        {p.evidence && (
          <p className="body" style={{ marginBottom: 'var(--lg)' }}>
            {withEmphasis(p.evidence)}
          </p>
        )}

        {p.impact && (
          <p
            className="body-lg ink rule"
            style={{ marginTop: 'auto', paddingTop: 'var(--lg)', marginBottom: 0 }}
          >
            {withEmphasis(p.impact)}
          </p>
        )}
      </article>
    );
  });

  return <HorizontalTrack items={cards} header={header} cardWidth={520} />;
}

/**
 * What we would automate.
 *
 * The hours reclaimed is the number that sells the workflow, so it becomes the
 * card's visual anchor at display scale rather than a chip in the corner.
 */
export function Automations({ payload }: { payload: PreviewPayload }) {
  const autos = payload.verdict.automationOpportunities ?? [];
  if (!autos.length) return null;

  const header = (
    <>
      <Reveal>
        <div className="eyebrow">What we&rsquo;d build</div>
      </Reveal>
      <SplitHeading className="d-lg" lines={['What we would', 'automate for you']} />
    </>
  );

  const cards = autos.map((o, i) => {
    const cap = String(o.capability ?? '').toLowerCase();
    const accent = CAPABILITY_ACCENT[cap] ?? 'var(--gradient-violet)';
    const isSpotlight = i % 3 === 1;

    const hours = o.hoursSavedPerWeek;

    return (
      <article
        key={i}
        className={isSpotlight ? `spot spotlight-${SPOTLIGHTS[i % SPOTLIGHTS.length]}` : 'card floating'}
        style={{
          padding: 'var(--xl)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ...(isSpotlight ? {} : { borderLeft: `2px solid ${accent}` })
        }}
      >
        <span
          className="micro"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: isSpotlight ? 'rgba(255,255,255,.75)' : accent
          }}
        >
          {CAPABILITY_LABEL[cap] ?? 'Workflow'}
        </span>

        {hours && (
          <div
            className="d-xl"
            style={{
              fontSize: 'clamp(38px, 4.4vw, 62px)',
              lineHeight: 0.95,
              marginTop: 'var(--md)',
              color: isSpotlight ? '#fff' : 'var(--ink)'
            }}
          >
            {hours}
            {/* Reset the inherited display tracking and leading: -0.05em at this
                size crushed the caption into a single unreadable run. */}
            <span
              className="body-sm"
              style={{
                display: 'block',
                marginTop: 'var(--xs)',
                opacity: 0.65,
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
                fontWeight: 500
              }}
            >
              reclaimed every week
            </span>
          </div>
        )}

        <h3
          className="headline"
          style={{ marginTop: 'var(--lg)', marginBottom: 'var(--lg)', fontSize: '1.35rem' }}
        >
          {o.title}
        </h3>

        <div style={{ display: 'grid', gap: 'var(--xs)' }}>
          <div
            style={{
              padding: 'var(--sm) var(--md)',
              background: isSpotlight ? 'rgba(0,0,0,.22)' : 'var(--canvas)',
              borderRadius: 'var(--r-md)'
            }}
          >
            <div className="micro" style={{ marginBottom: 2, opacity: 0.6 }}>
              Today, by hand
            </div>
            <p className="body" style={{ margin: 0, color: isSpotlight ? 'rgba(255,255,255,.8)' : undefined }}>
              {withEmphasis(o.manualToday)}
            </p>
          </div>

          <div
            style={{
              padding: 'var(--sm) var(--md)',
              background: isSpotlight ? 'rgba(255,255,255,.14)' : 'var(--surface-2)',
              borderRadius: 'var(--r-md)'
            }}
          >
            <div
              className="micro"
              style={{ marginBottom: 2, color: isSpotlight ? '#fff' : 'var(--success)' }}
            >
              Runs itself
            </div>
            <p className="body ink" style={{ margin: 0 }}>
              {withEmphasis(o.automated)}
            </p>
          </div>
        </div>

        {o.outcome && (
          <p
            className="body-lg ink"
            style={{
              marginTop: 'auto',
              paddingTop: 'var(--lg)',
              borderTop: `1px solid ${isSpotlight ? 'rgba(255,255,255,.25)' : 'var(--hairline-soft)'}`,
              marginBottom: 0
            }}
          >
            {withEmphasis(o.outcome)}
          </p>
        )}
      </article>
    );
  });

  return <HorizontalTrack items={cards} header={header} cardWidth={560} />;
}
