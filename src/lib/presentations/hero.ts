/**
 * Hero image selection for private presentations.
 * Cloudflare-protected brokerage sites (HL, Reliance Network IDX, etc.)
 * return block pages to screenshot bots — never use those as hero art.
 */

const BOT_BLOCKED_HOSTS = [
  /(^|\.)houlihanlawrence\.com$/i,
  /(^|\.)thenancykennedyteam\.com$/i,
  /(^|\.)reliancenetwork\.com$/i,
  /(^|\.)cloudflare\.com$/i,
];

function hostOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function isBotBlockedUrl(url: string | null | undefined): boolean {
  const host = hostOf(url);
  if (!host) return false;
  return BOT_BLOCKED_HOSTS.some(
    (re) => re.test(host) || re.test(`www.${host}`),
  );
}

/**
 * Prefer a safe remote image (og / curated). Fall back to live screenshot
 * only when the target site won't show a Cloudflare block page.
 * Returns null → CSS-only brand hero.
 */
export function resolveHeroImageSrc(opts: {
  companyUrl: string;
  ogImageUrl?: string | null;
  /** Optional local or absolute curated image */
  curatedHeroUrl?: string | null;
}): string | null {
  if (opts.curatedHeroUrl) return opts.curatedHeroUrl;

  // Known brand fallbacks when live capture is impossible
  if (
    /houlihanlawrence\.com|thenancykennedyteam\.com/i.test(opts.companyUrl)
  ) {
    return "/prospects/hl-hero.svg";
  }

  if (opts.ogImageUrl && !isBotBlockedUrl(opts.ogImageUrl)) {
    // Relative /public paths are fine; absolute http(s) ok if not bot-blocked host
    if (opts.ogImageUrl.startsWith("/")) return opts.ogImageUrl;
    if (/^https?:\/\//i.test(opts.ogImageUrl)) return opts.ogImageUrl;
  }

  if (!isBotBlockedUrl(opts.companyUrl)) {
    return `/api/screenshot?url=${encodeURIComponent(opts.companyUrl)}`;
  }

  return null;
}
