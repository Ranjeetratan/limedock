import { NextResponse } from 'next/server';
import { isSafeSlug } from '@/lib/previewStore';

/**
 * Uploads one screenshot for a preview.
 *
 * Assets travel separately from the payload because a serverless function only
 * accepts a 4.5MB body: a preview with four screenshots inlined as data URIs
 * ran to 6.4MB and was rejected outright. Each image is sent on its own and the
 * payload then references it by key.
 *
 * Stored privately and served back through an app route, so nothing about a
 * prospect is reachable by guessing a URL.
 */

export const runtime = 'nodejs';

const ALLOWED_KEYS = new Set(['desktop', 'mobile', 'maps', 'linkedin']);

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
    return NextResponse.json({ error: 'PREVIEW_PUBLISH_TOKEN is not configured' }, { status: 503 });
  }

  const provided = (request.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!provided || !tokenMatches(provided, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') ?? '';
  const key = searchParams.get('key') ?? '';

  if (!isSafeSlug(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }
  if (!ALLOWED_KEYS.has(key)) {
    return NextResponse.json(
      { error: `key must be one of: ${[...ALLOWED_KEYS].join(', ')}` },
      { status: 400 }
    );
  }

  const body = await request.arrayBuffer();
  if (!body.byteLength) {
    return NextResponse.json({ error: 'Empty body' }, { status: 400 });
  }

  try {
    const { put } = await import('@vercel/blob');
    const contentType = request.headers.get('content-type') || 'image/png';
    await put(`previews/${slug}/${key}`, Buffer.from(body), {
      access: 'private',
      contentType,
      allowOverwrite: true,
      addRandomSuffix: false
    });

    return NextResponse.json({
      stored: true,
      key,
      // What the payload should reference; the page turns it into an app route.
      path: `${slug}/${key}`,
      bytes: body.byteLength
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
