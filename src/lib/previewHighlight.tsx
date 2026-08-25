import type { ReactNode } from 'react';

/**
 * Emphasis for body copy.
 *
 * On a dark canvas with binary hierarchy (ink / ink-muted), a paragraph of
 * muted grey has nothing for the eye to catch — it reads as a wall. The facts
 * people actually scan for are the quantities: "5.7 seconds", "391 reviews",
 * "6-8 hours". Lifting only those to full ink gives every paragraph an anchor
 * without introducing a third text colour, which the design system forbids.
 *
 * Matching is deliberately narrow. Highlighting anything that merely looks
 * important would produce noise, and noise is what we are removing.
 */

/** Quantities worth scanning for: durations, counts with units, money, ratings. */
const QUANTITY = new RegExp(
  [
    // 5.7 seconds · 5733ms · 6-8 hours · 3 second
    String.raw`\b\d[\d,.]*\s*[-–]\s*\d[\d,.]*\s*(?:hours?|hrs?|days?|weeks?|months?|minutes?|mins?|seconds?|secs?|cases?|leads?|reviews?)\b`,
    String.raw`\b\d[\d,.]*\s*(?:ms|s\b|hours?|hrs?|days?|weeks?|months?|minutes?|mins?|seconds?|secs?)\b`,
    // 391 reviews · 10 employees · 3 offices
    String.raw`\b\d[\d,.]*\s*(?:reviews?|employees?|offices?|cases?|leads?|enquiries|inquiries|clients?|followers?|pages?|states?)\b`,
    // $300 · 40% · 4.9
    String.raw`[$£€]\s?\d[\d,.]*(?:k|K|m|M)?\b`,
    String.raw`\b\d[\d,.]*\s?%`,
    String.raw`\b\d+\.\d\b`
  ].join('|'),
  'gi'
);

/**
 * Wraps scannable quantities in full-ink emphasis.
 *
 * @param text Body copy, already trusted as plain text.
 * @returns Nodes with quantities lifted out of the muted flow.
 */
export function withEmphasis(text?: string | null): ReactNode {
  if (!text) return null;

  const out: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of text.matchAll(QUANTITY)) {
    const start = match.index ?? 0;
    if (start > cursor) out.push(text.slice(cursor, start));
    out.push(
      <strong key={key++} style={{ color: 'var(--ink)', fontWeight: 500 }}>
        {match[0]}
      </strong>
    );
    cursor = start + match[0].length;
  }

  if (cursor < text.length) out.push(text.slice(cursor));
  return out.length ? out : text;
}

/**
 * Splits a sentence into its first clause and the remainder.
 * Lets a card lead with a short, full-ink statement and drop the qualifying
 * detail to muted, instead of presenting one undifferentiated block.
 */
export function leadAndRest(text?: string | null): { lead: string; rest: string } {
  if (!text) return { lead: '', rest: '' };
  const trimmed = text.trim();

  // Prefer a clause break; fall back to the first sentence.
  const breakAt = trimmed.search(/[—–;:]|\.\s/);
  if (breakAt < 12 || breakAt > 120) return { lead: trimmed, rest: '' };

  const lead = trimmed.slice(0, breakAt).replace(/[—–;:.]\s*$/, '').trim();
  const rest = trimmed.slice(breakAt).replace(/^[—–;:.]\s*/, '').trim();
  return { lead, rest };
}
