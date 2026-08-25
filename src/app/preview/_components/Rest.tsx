'use client';

import { Reveal, Stagger } from "./motion-primitives";
import { RollingNumber } from "./Kinetic";
import { ScrollWords, SplitHeading } from "./ScrollText";
import { Laptop, Phone, Panel } from "./Device";
import { PLATFORM_LABEL, type PreviewPayload } from "@/lib/previewTypes";
import { withEmphasis } from "@/lib/previewHighlight";

/** What visitors actually see. */
export function Showcase({ payload }: { payload: PreviewPayload }) {
  const shots = payload.audit.screenshots ?? {};
  if (!shots.desktop && !shots.mobile) return null;

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">Your site</div>
        </Reveal>
        <Reveal delay={0.06}>
          <SplitHeading className="d-lg" lines={['What visitors actually see']} />
        </Reveal>

        <div className="shots-grid">
          {shots.desktop && <Laptop src={shots.desktop} caption="Desktop" />}
          {shots.mobile && <Phone src={shots.mobile} caption="Mobile" />}
        </div>
      </div>

      <style>{`
        .shots-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr);
          gap: var(--xxl);
          margin-top: var(--xxl);
          align-items: center;
        }
        @media (max-width: 810px) { .shots-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/** Digital presence — Maps, LinkedIn, and the platform grid. */
export function PresenceSection({ payload }: { payload: PreviewPayload }) {
  const pres = payload.verdict.presence;
  const platforms = pres?.platforms ?? [];
  if (!pres || (!platforms.length && !pres.googleMaps)) return null;

  const gm = pres.googleMaps ?? {};

  const STATUS: Record<string, { label: string; color: string; dim?: boolean }> = {
    active: { label: 'Active', color: 'var(--success)' },
    dormant: { label: 'Dormant', color: 'var(--gradient-orange)' },
    missing: { label: 'Not found', color: '#ef4444' },
    notapplicable: { label: "Doesn't apply", color: 'var(--ink-muted)', dim: true }
  };

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">Digital presence</div>
        </Reveal>
        <Reveal delay={0.06}>
          <SplitHeading className="d-lg" lines={['Where you show up online']} />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="subhead" style={{ maxWidth: '54ch', marginTop: 'var(--lg)' }}>
            The listings people find before your website often decide whether they call at all.
            Platforms that don&rsquo;t suit your kind of work are marked as such.
          </p>
        </Reveal>

        {gm.rating != null && (
          <Reveal delay={0.16}>
            <div className="spot spot-orange" style={{ marginTop: 'var(--xxl)' }}>
              <div style={{ display: 'flex', gap: 'var(--xxl)', flexWrap: 'wrap', alignItems: 'baseline' }}>
                <div>
                  <div className="d-xl" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
                    <RollingNumber value={gm.rating} decimals={1} />
                  </div>
                  <div className="body-sm" style={{ color: 'rgba(255,255,255,.8)' }}>
                    Google rating
                  </div>
                </div>
                {gm.reviewCount != null && (
                  <div>
                    <div className="d-xl" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
                      <RollingNumber value={gm.reviewCount} />
                    </div>
                    <div className="body-sm" style={{ color: 'rgba(255,255,255,.8)' }}>
                      reviews
                    </div>
                  </div>
                )}
              </div>
              {gm.assessment && (
                <p className="body-lg" style={{ color: '#fff', marginTop: 'var(--lg)', marginBottom: 0 }}>
                  {withEmphasis(gm.assessment)}
                </p>
              )}
            </div>
          </Reveal>
        )}

        <Stagger className="tiles-grid" step={0.05}>
          {platforms.map((p, i) => {
            const st = STATUS[String(p.status ?? '').toLowerCase().replace(/[^a-z]/g, '')] ?? STATUS.missing;
            return (
              <div key={i} className="card" style={{ opacity: st.dim ? 0.5 : 1 }}>
                <div className="body-sm ink" style={{ marginBottom: 'var(--xxs)' }}>
                  {PLATFORM_LABEL[p.platform] ?? p.platform}
                </div>
                <div className="micro" style={{ color: st.color, marginBottom: 'var(--xs)' }}>
                  {st.label}
                </div>
                {p.note && <div className="micro">{p.note}</div>}
              </div>
            );
          })}
        </Stagger>

        {(payload.audit.mapsScreenshot || payload.audit.linkedinScreenshot) && (
          <div className="shots-grid" style={{ marginTop: 'var(--xxl)' }}>
            {payload.audit.mapsScreenshot && (
              <Panel src={payload.audit.mapsScreenshot} caption="Your Google Maps listing" />
            )}
            {payload.audit.linkedinScreenshot && (
              <Panel src={payload.audit.linkedinScreenshot} caption="Your LinkedIn page" />
            )}
          </div>
        )}

        {pres.linkedin?.assessment && (
          <Reveal>
            <p className="body-lg" style={{ marginTop: 'var(--xl)', maxWidth: '68ch' }}>
              {withEmphasis(pres.linkedin.assessment)}
            </p>
          </Reveal>
        )}
      </div>

      <style>{`
        .tiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--sm);
          margin-top: var(--xxl);
        }
        .shots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--lg);
          align-items: start;
        }
      `}</style>
    </section>
  );
}

/** What it could be worth. */
export function Impact({ payload }: { payload: PreviewPayload }) {
  const rev = payload.verdict.revenueImpact;
  if (!rev?.estimate && !rev?.reasoning) return null;

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">The upside</div>
        </Reveal>
        <Reveal delay={0.06}>
          <SplitHeading className="d-lg" lines={['What it could be worth']} />
        </Reveal>

        <div className="impact-grid">
          {rev.estimate && (
            <Reveal delay={0.1}>
              <div className="spot spot-magenta" style={{ height: '100%' }}>
                <div className="d-md" style={{ marginBottom: 'var(--sm)' }}>{rev.estimate}</div>
                <div className="body-sm" style={{ color: 'rgba(255,255,255,.8)' }}>expected effect</div>
              </div>
            </Reveal>
          )}
          {rev.hoursReclaimedPerWeek && (
            <Reveal delay={0.16}>
              <div className="card-2" style={{ height: '100%', padding: 'var(--xl)' }}>
                <div className="d-md" style={{ marginBottom: 'var(--sm)' }}>
                  {rev.hoursReclaimedPerWeek}
                </div>
                <div className="body-sm">reclaimed every week</div>
              </div>
            </Reveal>
          )}
        </div>

        {rev.reasoning && (
          <Reveal delay={0.2}>
            <p className="subhead" style={{ maxWidth: '62ch', marginTop: 'var(--xl)' }}>
              {withEmphasis(rev.reasoning)}
            </p>
          </Reveal>
        )}
        {rev.assumptions?.length ? (
          <Reveal delay={0.24}>
            <p className="micro" style={{ marginTop: 'var(--lg)', maxWidth: '68ch' }}>
              Based on: {rev.assumptions.join(' · ')}. These are estimates, not guarantees.
            </p>
          </Reveal>
        ) : null}
      </div>

      <style>{`
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--md);
          margin-top: var(--xxl);
        }
      `}</style>
    </section>
  );
}

/** The 90-day plan. */
export function Plan({ payload }: { payload: PreviewPayload }) {
  const plan = payload.verdict.threeMonthPlan ?? [];
  if (!plan.length) return null;

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">The path</div>
        </Reveal>
        <Reveal delay={0.06}>
          <SplitHeading className="d-lg" lines={['Your first three months']} />
        </Reveal>

        <Stagger className="plan-grid" step={0.09}>
          {plan.map((m, i) => (
            <div key={i} className="card" style={{ padding: 'var(--xl)', height: '100%' }}>
              <div className="micro" style={{ marginBottom: 'var(--sm)' }}>
                {m.month ?? `Month ${i + 1}`}
              </div>
              <h3 className="headline" style={{ marginBottom: 'var(--md)' }}>{m.focus}</h3>
              {m.deliverables?.length ? (
                <ul style={{ margin: 0, paddingLeft: 'var(--md)' }}>
                  {m.deliverables.map((d, j) => (
                    <li key={j} className="body" style={{ marginBottom: 'var(--xxs)' }}>{d}</li>
                  ))}
                </ul>
              ) : null}
              {m.outcome && (
                <p className="body-sm ink" style={{ marginTop: 'var(--md)', marginBottom: 0 }}>
                  {withEmphasis(m.outcome)}
                </p>
              )}
            </div>
          ))}
        </Stagger>
      </div>

      <style>{`
        .plan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: var(--md);
          margin-top: var(--xxl);
        }
      `}</style>
    </section>
  );
}

/** Closing offer — matches what is actually being sold. */
export function Close({ payload }: { payload: PreviewPayload }) {
  const needsRebuild = payload.verdict.category === 'bad';

  const copy = needsRebuild
    ? {
        title: 'Want the preview link?',
        body: `We've already built a modern version of the ${payload.firm} site. You can see it before deciding anything.`,
        cta: 'Send me the preview link'
      }
    : {
        title: 'Want to see it running?',
        body: `Your site is doing its job — the opportunity is the work happening around it. We'd map that first, then ship your first workflow within 48 hours.`,
        cta: 'Set up a workflow call'
      };

  return (
    <section className="section" style={{ paddingBottom: 'calc(var(--section) * 1.5)' }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">Next step</div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="d-xl" style={{ maxWidth: '14ch' }}>{copy.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="subhead" style={{ maxWidth: '52ch', marginTop: 'var(--lg)' }}>{copy.body}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <a
            className="btn"
            style={{ marginTop: 'var(--xl)' }}
            href={`mailto:ranjeet@limedock.com?subject=${encodeURIComponent(payload.firm + ' — review')}`}
          >
            {copy.cta}
          </a>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="rule" style={{ marginTop: 'var(--section)', paddingTop: 'var(--lg)' }}>
            <span className="caption">Ranjeet · limedock.com</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
