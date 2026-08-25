import { isSafeSlug } from '@/lib/previewStore';

/**
 * Streams one preview screenshot.
 *
 * The blobs are private, so images cannot be linked directly. This route reads
 * them with the store token and serves them under the preview's own path —
 * which also means an image is only reachable if you already know the slug.
 */

export const runtime = 'nodejs';

const ALLOWED_KEYS = new Set(['desktop', 'mobile', 'maps', 'linkedin']);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; key: string }> }
) {
  const { slug, key } = await params;

  if (!isSafeSlug(slug) || !ALLOWED_KEYS.has(key)) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const { get } = await import('@vercel/blob');
    const found = await get(`previews/${slug}/${key}`, { access: 'private' });
    if (!found) return new Response('Not found', { status: 404 });

    return new Response(found.stream, {
      headers: {
        'content-type': found.headers?.get('content-type') ?? 'image/png',
        // Immutable for a day: a published preview's images never change, but
        // the preview itself expires well inside a week.
        'cache-control': 'private, max-age=86400'
      }
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
