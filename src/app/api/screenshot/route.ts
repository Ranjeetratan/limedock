import type { NextRequest } from "next/server";

/**
 * Server-side screenshot proxy.
 *
 *   GET /api/screenshot?url=https%3A%2F%2Fexample.com
 *
 * Tries Microlink first (returns the real captured screenshot URL in
 * JSON; we then fetch that PNG and stream it back). If Microlink fails
 * for any reason we fall back to WordPress.com mshots which serves a
 * PNG directly. Either way the response is an image/png with a long
 * Cache-Control, so Vercel's edge caches the result and we only hit
 * the upstream service once every 24h per URL.
 *
 * Domains behind aggressive Cloudflare bot blocks are refused — mshots
 * would otherwise capture the "Sorry, you have been blocked" page and
 * we'd serve that as the hero image.
 */

// Cached on Vercel's edge via the Cache-Control response header; the
// query string makes this route dynamic so we don't force static.
export const runtime = "nodejs";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/** Hosts where screenshot bots only get Cloudflare challenge / block pages */
const BOT_BLOCKED_HOSTS = [
  /(^|\.)houlihanlawrence\.com$/i,
  /(^|\.)thenancykennedyteam\.com$/i,
  /(^|\.)reliancenetwork\.com$/i,
  /(^|\.)cloudflare\.com$/i,
];

function isValidUrl(input: string | null): input is string {
  if (!input) return false;
  try {
    const u = new URL(input);
    return ALLOWED_PROTOCOLS.has(u.protocol);
  } catch {
    return false;
  }
}

function isBotBlockedHost(input: string): boolean {
  try {
    const host = new URL(input).hostname.replace(/^www\./, "");
    return BOT_BLOCKED_HOSTS.some((re) => re.test(host) || re.test(`www.${host}`));
  } catch {
    return false;
  }
}

async function fromMicrolink(target: string): Promise<ArrayBuffer | null> {
  try {
    const api = `https://api.microlink.io/?url=${encodeURIComponent(target)}&screenshot=true&meta=false&viewport.width=1440&viewport.height=900&waitFor=1500`;
    const meta = await fetch(api, {
      headers: { Accept: "application/json" },
      // Microlink can take 5-10s for fresh captures
      signal: AbortSignal.timeout(20_000),
    });
    if (!meta.ok) return null;
    const json: {
      data?: { screenshot?: { url?: string } };
    } = await meta.json();
    const shotUrl = json?.data?.screenshot?.url;
    if (!shotUrl) return null;
    const img = await fetch(shotUrl, {
      signal: AbortSignal.timeout(20_000),
    });
    if (!img.ok) return null;
    return await img.arrayBuffer();
  } catch {
    return null;
  }
}

async function fromMshots(target: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(target)}?w=1440&h=900`;
    // mshots redirects to either the warming placeholder or the real
    // screenshot. We accept whatever we get on the first try since
    // this is a fallback; the edge cache will keep it for 24h.
    const res = await fetch(url, {
      signal: AbortSignal.timeout(20_000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");
  if (!isValidUrl(target)) {
    return new Response("Invalid url", { status: 400 });
  }
  if (isBotBlockedHost(target)) {
    return new Response("Screenshot unavailable for bot-protected sites", {
      status: 422,
      headers: {
        "Cache-Control": "public, max-age=3600",
        "X-Screenshot-Skip": "bot-protected",
      },
    });
  }

  let bytes = await fromMicrolink(target);
  if (!bytes) {
    bytes = await fromMshots(target);
  }
  if (!bytes) {
    return new Response("Upstream screenshot service unavailable", {
      status: 502,
    });
  }

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      // 24h on the CDN, 7d as stale-while-revalidate
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
