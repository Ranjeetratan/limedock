/**
 * The preview payload.
 *
 * Deliberately the same shape the PDF report renders from, so a lead's site and
 * their document can never make different claims about the same business.
 */

export interface Signals {
  reachable?: boolean;
  https?: boolean;
  hasViewportMeta?: boolean;
  hasTitle?: boolean;
  metaDescription?: string | null;
  hasSchemaOrg?: boolean;
  hasContactForm?: boolean;
  hasChatWidget?: boolean;
  hasPhoneLink?: boolean;
  loadMs?: number | null;
  cms?: string | null;
  /** Which negatives we are entitled to assert; anything else reads "not detected". */
  reliableNegatives?: Record<string, boolean>;
}

export interface Audit {
  website?: string;
  signalScore?: number | null;
  hardFailures?: string[];
  signals?: Signals;
  /** Screenshots are served as URLs here rather than inlined as in the PDF. */
  screenshots?: { desktop?: string | null; mobile?: string | null };
  mapsScreenshot?: string | null;
  linkedinScreenshot?: string | null;
}

export interface PainPoint {
  area?: string;
  problem: string;
  evidence?: string;
  impact?: string;
}

export interface AutomationOpportunity {
  capability?: string;
  title: string;
  manualToday?: string;
  automated?: string;
  hoursSavedPerWeek?: string;
  outcome?: string;
}

export interface PlatformStatus {
  platform: string;
  status: string;
  url?: string;
  note?: string;
}

export interface Presence {
  googleMaps?: {
    rating?: number;
    reviewCount?: number;
    category?: string;
    assessment?: string;
  } | null;
  linkedin?: { url?: string; assessment?: string; activity?: string } | null;
  platforms?: PlatformStatus[];
  opportunities?: { service: string; why?: string; outcome?: string }[];
}

export interface Verdict {
  category?: 'good' | 'bad' | string;
  summary?: string;
  flaws?: string[];
  strengths?: string[];
  business?: {
    niche?: string;
    services?: string[];
    serviceArea?: string;
    audience?: string;
    positioning?: string;
    estimatedSize?: string;
    competitiveContext?: string;
  } | null;
  painPoints?: PainPoint[];
  automationOpportunities?: AutomationOpportunity[];
  presence?: Presence | null;
  revenueImpact?: {
    estimate?: string;
    reasoning?: string;
    hoursReclaimedPerWeek?: string;
    assumptions?: string[];
  } | null;
  threeMonthPlan?: {
    month?: string;
    focus?: string;
    deliverables?: string[];
    outcome?: string;
  }[];
  outreachEmail?: { subject?: string; body?: string } | null;
}

export interface PreviewPayload {
  slug: string;
  firm: string;
  audit: Audit;
  verdict: Verdict;
  publishedAt: string;
  /** ISO timestamp after which the preview stops resolving. */
  expiresAt: string;
}

/** Labels for platform keys, so the UI never prints a raw slug. */
export const PLATFORM_LABEL: Record<string, string> = {
  googleMaps: 'Google Maps',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'X / Twitter',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  yelp: 'Yelp',
  avvo: 'Avvo',
  justia: 'Justia'
};

export const CAPABILITY_LABEL: Record<string, string> = {
  sales: 'Sales workflows',
  marketing: 'Marketing workflows',
  copilots: 'Team copilots',
  data: 'Data & integrations',
  aiops: 'AI ops',
  management: 'Management workflows'
};
