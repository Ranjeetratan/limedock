import fs from 'node:fs/promises';
import path from 'node:path';
import type { PreviewPayload } from './previewTypes';

/**
 * Preview storage.
 *
 * Previews are DATA, not code. Publishing one must never mean redeploying the
 * site: a redeploy per lead would rebuild everything, invalidate the cache and
 * take minutes, when the only thing that changed is one JSON payload.
 *
 * Two backends, chosen by environment:
 *   • Vercel Blob in production — the serverless filesystem is read-only and
 *     ephemeral, so anything written during a request is gone by the next one.
 *   • The local filesystem in development, so the app runs with no token.
 *
 * A preview is deliberately short-lived. It is a sales artefact about someone
 * else's business, so it expires rather than sitting on a public URL forever.
 */

export const PREVIEW_TTL_DAYS = 7;

export const PREVIEW_DIR =
  process.env.PREVIEW_DATA_DIR || path.join(process.cwd(), 'data', 'previews');

/** Blob is used whenever a token is present; otherwise fall back to disk. */
function usingBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Rejects anything that could escape the data directory or collide oddly. */
export function isSafeSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]{1,80}$/.test(slug);
}

const blobKey = (slug: string) => `previews/${slug}.json`;

/**
 * Loads a preview.
 * @returns The payload, or null when missing, malformed or expired.
 */
export async function loadPreview(slug: string): Promise<PreviewPayload | null> {
  if (!isSafeSlug(slug)) return null;

  let raw: string | null = null;

  if (usingBlob()) {
    try {
      const { get } = await import('@vercel/blob');
      // Private access: the payload is a business's audit and its path is
      // predictable (previews/<slug>.json), so a public URL would let anyone
      // fetch the raw data by guessing the firm's name. Reads go through the
      // store token instead, server-side only.
      // get() resolves null when the blob is absent, so a missing preview is a
      // normal 404 rather than a thrown error.
      const found = await get(blobKey(slug), { access: 'private', useCache: false });
      if (!found) return null;
      raw = await new Response(found.stream).text();
    } catch {
      return null;
    }
  } else {
    try {
      raw = await fs.readFile(path.join(PREVIEW_DIR, `${slug}.json`), 'utf8');
    } catch {
      return null;
    }
  }

  if (!raw) return null;

  try {
    const payload = JSON.parse(raw) as PreviewPayload;
    // Enforced on read as well as by cleanup: a payload that outlives its window
    // must never render just because a purge has not run yet.
    if (payload.expiresAt && new Date(payload.expiresAt).getTime() < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Stores a preview and stamps its expiry.
 * @returns The stored payload, including the public URL path.
 */
export async function savePreview(
  input: Omit<PreviewPayload, 'publishedAt' | 'expiresAt'>
): Promise<PreviewPayload> {
  if (!isSafeSlug(input.slug)) {
    throw new Error(`Invalid slug: ${input.slug}`);
  }

  const now = new Date();
  const payload: PreviewPayload = {
    ...input,
    publishedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + PREVIEW_TTL_DAYS * 86400_000).toISOString()
  };

  const body = JSON.stringify(payload);

  if (usingBlob()) {
    const { put } = await import('@vercel/blob');
    await put(blobKey(input.slug), body, {
      access: 'private',
      contentType: 'application/json',
      // Republishing the same lead replaces its payload rather than piling up.
      allowOverwrite: true,
      addRandomSuffix: false
    });
  } else {
    await fs.mkdir(PREVIEW_DIR, { recursive: true });
    const target = path.join(PREVIEW_DIR, `${input.slug}.json`);
    const tmp = `${target}.tmp${process.pid}`;
    await fs.writeFile(tmp, body, 'utf8');
    await fs.rename(tmp, target);
  }

  return payload;
}

/**
 * Deletes previews whose window has closed.
 * @returns Slugs removed.
 */
export async function purgeExpired(): Promise<string[]> {
  const removed: string[] = [];

  if (usingBlob()) {
    const { list, del, get } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: 'previews/' });

    for (const blob of blobs) {
      try {
        const found = await get(blob.pathname, { access: 'private', useCache: false });
        if (!found) continue;
        const payload = JSON.parse(await new Response(found.stream).text()) as PreviewPayload;
        if (payload.expiresAt && new Date(payload.expiresAt).getTime() < Date.now()) {
          await del(blob.url);
          removed.push(payload.slug);
        }
      } catch {
        // A payload we cannot parse cannot be judged expired; leave it.
      }
    }
    return removed;
  }

  let files: string[] = [];
  try {
    files = await fs.readdir(PREVIEW_DIR);
  } catch {
    return [];
  }

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    try {
      const raw = await fs.readFile(path.join(PREVIEW_DIR, file), 'utf8');
      const payload = JSON.parse(raw) as PreviewPayload;
      if (payload.expiresAt && new Date(payload.expiresAt).getTime() < Date.now()) {
        await fs.rm(path.join(PREVIEW_DIR, file), { force: true });
        removed.push(file.replace(/\.json$/, ''));
      }
    } catch {
      // Same reasoning as above.
    }
  }
  return removed;
}
