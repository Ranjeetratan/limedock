/** Canonical production origin (www). */
export const SITE_URL = "https://www.limedock.com";

export const SITE_NAME = "LimeDock";

export const SITE_DESCRIPTION =
  "LimeDock automates the marketing, sales, and management workflows your SaaS team is still running by hand. Live automations that plug into your Slack, CRM, and internal platform — you own the code.";

export const BOOK_DEMO_URL =
  "https://cal.com/limedock-admin-nb05ck/30min";

export const CONTACT_EMAIL = "ranjeet@limedock.com";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
