import type { ScrapedCompany } from "./types";

const UA =
  "Mozilla/5.0 (compatible; LimeDockPresentationBot/1.0; +https://www.limedock.com)";

function absolutize(base: string, href: string | null | undefined): string | null {
  if (!href) return null;
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html: string, keys: string[]): string | null {
  for (const key of keys) {
    const patterns = [
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
        "i",
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
        "i",
      ),
    ];
    for (const re of patterns) {
      const m = html.match(re);
      if (m?.[1]) return decodeHtml(m[1].trim());
    }
  }
  return null;
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function titleFromHtml(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? stripTags(m[1]).slice(0, 200) : "";
}

function extractEmails(text: string): string[] {
  const found = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  return [...new Set(found.map((e) => e.toLowerCase()))]
    .filter((e) => !e.includes("example.com") && !e.endsWith(".png") && !e.endsWith(".jpg"))
    .slice(0, 8);
}

function extractPhones(text: string): string[] {
  const found =
    text.match(
      /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)\d{3,4}[\s.-]?\d{3,4}/g,
    ) || [];
  return [...new Set(found.map((p) => p.trim()))]
    .filter((p) => p.replace(/\D/g, "").length >= 10)
    .slice(0, 6);
}

function extractSocial(html: string, base: string): { platform: string; url: string }[] {
  const platforms: { host: RegExp; platform: string }[] = [
    { host: /(^|\.)facebook\.com$/i, platform: "Facebook" },
    { host: /(^|\.)instagram\.com$/i, platform: "Instagram" },
    { host: /(^|\.)linkedin\.com$/i, platform: "LinkedIn" },
    { host: /(^|\.)twitter\.com$/i, platform: "Twitter/X" },
    { host: /(^|\.)x\.com$/i, platform: "Twitter/X" },
    { host: /(^|\.)youtube\.com$/i, platform: "YouTube" },
    { host: /(^|\.)wa\.me$/i, platform: "WhatsApp" },
    { host: /(^|\.)api\.whatsapp\.com$/i, platform: "WhatsApp" },
    { host: /(^|\.)t\.me$/i, platform: "Telegram" },
  ];
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const out: { platform: string; url: string }[] = [];
  const seen = new Set<string>();
  for (const href of hrefs) {
    const abs = absolutize(base, href);
    if (!abs) continue;
    let host = "";
    try {
      host = new URL(abs).hostname;
    } catch {
      continue;
    }
    for (const { host: re, platform } of platforms) {
      if (re.test(host) && !seen.has(platform)) {
        seen.add(platform);
        out.push({ platform, url: abs });
      }
    }
  }
  return out.slice(0, 10);
}

function extractNav(html: string): string[] {
  const labels = [
    ...html.matchAll(/>(About(?:\s+Us)?|Contact|Agents?|Listings?|Properties|Buy|Rent|Sell|Services|Careers|Owners?|Blog)<\/a>/gi),
  ].map((m) => m[1]);
  return [...new Set(labels.map((l) => l.trim()))].slice(0, 12);
}

function extractCtas(html: string): string[] {
  const texts = [
    ...html.matchAll(
      />(Contact\s*Us|Get\s*Started|Book\s*(?:a\s*)?(?:Call|Visit|Showing)|Schedule|Inquire|Request\s*(?:Info|a\s*Tour)|WhatsApp|Call\s*Now|List\s*With\s*Us)<\/(?:a|button)>/gi,
    ),
  ].map((m) => m[1].replace(/\s+/g, " ").trim());
  return [...new Set(texts)].slice(0, 8);
}

function extractColors(html: string, themeColor: string | null): string[] {
  const colors = new Set<string>();
  if (themeColor && /^#?[0-9a-fA-F]{3,8}$/.test(themeColor.trim())) {
    colors.add(themeColor.startsWith("#") ? themeColor : `#${themeColor}`);
  }
  const hexes = html.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
  for (const h of hexes) {
    const norm = h.length === 4
      ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`
      : h;
    // skip near-white / near-black noise somewhat
    const n = norm.toLowerCase();
    if (n === "#ffffff" || n === "#000000" || n === "#fff" || n === "#000") continue;
    colors.add(norm.toLowerCase());
    if (colors.size >= 6) break;
  }
  return [...colors].slice(0, 5);
}

function companyNameFrom(title: string, ogSite: string | null, domain: string): string {
  const looksLikeDomain = (s: string) =>
    /^www\./i.test(s) || /\.(com|io|co|net|org|in|ai)\/?$/i.test(s.trim());

  if (ogSite && ogSite.length > 1 && !looksLikeDomain(ogSite)) {
    return ogSite.slice(0, 80);
  }

  const cleaned = title
    .split("|")[0]
    .split("·")[0]
    .split("•")[0]
    .split("—")[0]
    .split("–")[0]
    .split(" - ")[0]
    .replace(/\b(home|official\s+site|welcome)\b/gi, "")
    .trim();
  if (cleaned.length > 2 && !looksLikeDomain(cleaned)) return cleaned.slice(0, 80);
  if (cleaned.length > 2) return cleaned.slice(0, 80);
  return domain.replace(/^www\./, "");
}

function detectSignals(html: string, text: string, social: { platform: string }[]): string[] {
  const signals: string[] = [];
  const lower = (html + " " + text).toLowerCase();
  if (/whatsapp|wa\.me/.test(lower)) signals.push("WhatsApp CTA present");
  if (/instagram\.com/.test(lower) || social.some((s) => s.platform === "Instagram"))
    signals.push("Instagram connected");
  if (/facebook\.com/.test(lower)) signals.push("Facebook presence");
  if (/zillow|realtor\.com|99acres|magicbricks|housing\.com|nobroker/.test(lower))
    signals.push("Property portal mentions");
  if (/idx|mls|listings?|properties|rentals?|for\s*sale/.test(lower))
    signals.push("Listings / inventory on site");
  if (/home\s*valuation|what.?s\s*my\s*home\s*worth|home\s*value|seller\s*guide|buyer\s*guide|lead\s*magnet|download\s*(the\s*)?(guide|pdf)/.test(lower))
    signals.push("Home valuation / lead magnet present (needs CRM wiring)");
  if (/contact|inquiry|enquire|get in touch/.test(lower)) signals.push("Contact / inquiry path");
  if (/captcha|security code/.test(lower)) signals.push("Contact form uses captcha (friction risk)");
  if (/agent|broker|realtor/.test(lower)) signals.push("Agent / brokerage positioning");
  if (/crm|follow.?up|lead/.test(lower)) signals.push("Lead / CRM language on site");
  if (/luxury|waterfront|estate/.test(lower)) signals.push("Luxury / waterfront positioning");
  if (/index\.cfm|\.aspx|wordpress|wix|squarespace|webflow/.test(lower))
    signals.push("Legacy or template site stack");
  return [...new Set(signals)].slice(0, 12);
}

function detectTech(html: string): string[] {
  const tech: string[] = [];
  if (/wp-content|wordpress/i.test(html)) tech.push("WordPress");
  if (/index\.cfm/i.test(html)) tech.push("ColdFusion / IDX template");
  if (/squarespace/i.test(html)) tech.push("Squarespace");
  if (/wix\.com|wixstatic/i.test(html)) tech.push("Wix");
  if (/webflow/i.test(html)) tech.push("Webflow");
  if (/shopify/i.test(html)) tech.push("Shopify");
  if (/gtag|googletagmanager|google-analytics/i.test(html)) tech.push("Google Analytics");
  if (/facebook\.net|fbevents/i.test(html)) tech.push("Meta Pixel");
  if (/cloudflare/i.test(html)) tech.push("Cloudflare");
  return tech.slice(0, 8);
}

async function fetchMicrolink(url: string): Promise<{
  title?: string;
  description?: string;
  logo?: string;
  image?: string;
  publisher?: string;
} | null> {
  try {
    const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=true&palette=true`;
    const res = await fetch(api, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(18_000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        title?: string;
        description?: string;
        publisher?: string;
        logo?: { url?: string } | string;
        image?: { url?: string } | string;
      };
    };
    const d = json.data;
    if (!d) return null;
    const logo =
      typeof d.logo === "string" ? d.logo : d.logo?.url;
    const image =
      typeof d.image === "string" ? d.image : d.image?.url;
    return {
      title: d.title,
      description: d.description,
      publisher: d.publisher,
      logo,
      image,
    };
  } catch {
    return null;
  }
}

export async function scrapeCompany(inputUrl: string): Promise<ScrapedCompany> {
  let url = inputUrl.trim();
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  const parsed = new URL(url);
  const domain = parsed.hostname;

  const [htmlRes, micro] = await Promise.all([
    fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    }).catch(() => null),
    fetchMicrolink(url),
  ]);

  let html = "";
  if (htmlRes?.ok) {
    html = await htmlRes.text();
    // cap parse size
    if (html.length > 900_000) html = html.slice(0, 900_000);
  }

  const title = micro?.title || titleFromHtml(html) || domain;
  const description =
    micro?.description ||
    metaContent(html, ["description", "og:description", "twitter:description"]) ||
    "";
  const ogSite = micro?.publisher || metaContent(html, ["og:site_name"]);
  const themeColor = metaContent(html, ["theme-color"]);
  // Prefer logo from icons, then microlink, then og image as last resort for brand mark
  const iconHref =
    html.match(
      /<link[^>]+rel=["'](?:apple-touch-icon|icon|shortcut icon)["'][^>]+href=["']([^"']+)["']/i,
    )?.[1] ||
    html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:apple-touch-icon|icon|shortcut icon)["']/i,
    )?.[1] ||
    null;
  const logoUrl =
    absolutize(url, iconHref) ||
    micro?.logo ||
    null;
  const ogImageUrl =
    micro?.image ||
    absolutize(url, metaContent(html, ["og:image", "twitter:image"]));

  const text = stripTags(html).slice(0, 50_000);
  const emails = extractEmails(html + " " + text);
  const phones = extractPhones(text);
  const socialLinks = extractSocial(html, url);
  const navLinks = extractNav(html);
  const ctas = extractCtas(html);
  const brandColors = extractColors(html, themeColor);
  const signals = detectSignals(html, text, socialLinks);
  const technologies = detectTech(html);

  // crude address heuristic
  let address: string | null = null;
  const addrMatch = text.match(
    /\d{1,5}\s+[\w\s.]{3,40}(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Place|Pl|Suite|Floor)[^.]{0,40}/i,
  );
  if (addrMatch) address = addrMatch[0].trim().slice(0, 120);

  const name = companyNameFrom(title, ogSite, domain);
  const tagline = description.slice(0, 160) || `${name} — real estate`;

  // Prefer clearer logo: if logo looks like og image huge banner, still ok
  return {
    url,
    domain,
    name,
    tagline,
    description: description.slice(0, 600),
    logoUrl,
    ogImageUrl: ogImageUrl || null,
    faviconUrl: absolutize(url, "/favicon.ico"),
    themeColor,
    brandColors,
    emails,
    phones,
    address,
    socialLinks,
    navLinks,
    ctas,
    signals,
    technologies,
    rawTitle: title,
  };
}
