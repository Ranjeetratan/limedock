import { NextResponse } from 'next/server';
import { savePreview, isSafeSlug, PREVIEW_TTL_DAYS } from '@/lib/previewStore';
import type { PreviewPayload } from '@/lib/previewTypes';

/**
 * Publishes one lead's preview.
 *
 * This is why publishing does not require a deploy: the site is deployed once,
 * and each preview arrives as data through this endpoint. A git push per lead
 * would rebuild the whole site to change one JSON file.
 *
 * Auth is a shared bearer token. The endpoint writes publicly-readable pages
 * about real businesses, so it must not be open.
 */

export const runtime = 'nodejs';

/** Compares in constant time, so a wrong token cannot be guessed byte by byte. */
function tokenMatches(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < provided.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(request: Request) {
  const expected = process.env.PREVIEW_PUBLISH_TOKEN;
  if (!expected) {
    // Failing closed: without a configured token anyone could publish.
    return NextResponse.json(
      { error: 'PREVIEW_PUBLISH_TOKEN is not configured on the server' },
      { status: 503 }
    );
  }

  const auth = request.headers.get('authorization') ?? '';
  const provided = auth.replace(/^Bearer\s+/i, '');
  if (!provided || !tokenMatches(provided, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<PreviewPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body must be JSON' }, { status: 400 });
  }

  const missing = (['slug', 'firm', 'audit', 'verdict'] as const).filter((k) => !body[k]);
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 }
    );
  }

  if (!isSafeSlug(String(body.slug))) {
    return NextResponse.json(
      { error: 'slug must be lowercase letters, digits and hyphens' },
      { status: 400 }
    );
  }

  try {
    const saved = await savePreview({
      slug: String(body.slug),
      firm: String(body.firm),
      audit: body.audit!,
      verdict: body.verdict!
    });

    const origin = process.env.PREVIEW_PUBLIC_ORIGIN || new URL(request.url).origin;

    return NextResponse.json({
      published: true,
      url: `${origin}/preview/${saved.slug}`,
      expiresAt: saved.expiresAt,
      expiresInDays: PREVIEW_TTL_DAYS
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Publish failed' },
      { status: 500 }
    );
  }
}
