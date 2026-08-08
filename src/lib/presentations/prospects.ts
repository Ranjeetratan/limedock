import type { ScrapedCompany } from "./types";

/** Optional hyper-personalization passed from the sales form / API */
export type ProspectPerson = {
  firstName: string;
  fullName?: string;
  title?: string;
  teamName?: string;
  brokerage?: string;
  markets?: string[];
  specialties?: string[];
  proofPoints?: string[];
  siteNotes?: string[];
  /** Canonical public website to feature (screenshot + cite) */
  websiteUrl?: string;
  /** Absolute or /public path to real brand logo */
  logoUrl?: string;
  /** Optional curated hero (used when live screenshots hit Cloudflare) */
  heroImageUrl?: string;
  /** Prospect portrait / headshot */
  portraitUrl?: string;
  /** Brand palette: [primary, accent, paper] */
  brandColors?: string[];
};

export type GenerateOptions = {
  person?: ProspectPerson;
  secondary?: ScrapedCompany[];
};

/** Known research for Nancy Kennedy @ Houlihan Lawrence (USA) */
export const NANCY_KENNEDY_HL: ProspectPerson = {
  firstName: "Nancy",
  fullName: "Nancy Kennedy",
  title: "Licensed Associate Broker",
  teamName: "The Nancy Kennedy Team",
  brokerage: "Houlihan Lawrence",
  websiteUrl: "https://thenancykennedyteam.com/",
  logoUrl: "/prospects/hl-parent-logo.png",
  heroImageUrl: "/prospects/hl-hero.svg",
  portraitUrl: "/prospects/nancy-kennedy.jpg",
  brandColors: ["#0C2838", "#C2A67C", "#F4EFE6"],
  markets: [
    "Croton-on-Hudson",
    "Cortlandt Manor",
    "Yorktown",
    "Ossining",
    "White Plains",
    "Westchester County",
    "Putnam County",
  ],
  specialties: [
    "Residential & luxury homes",
    "Hudson River / lake waterfront",
    "Townhomes & condos",
    "Mansions & multi-family",
    "First-time buyers & relocation",
    "Vacation homes",
  ],
  proofPoints: [
    "No. 1 team in Westchester and Putnam (team positioning)",
    "Decades of local market leadership",
    "Team model — Nancy, Paul Kennedy, and support — clients get bench strength",
    "Luxury inventory in the $1.6M–$4M range on the team site",
    "Brand promise: Muscle. Reach. Trust. Loyalty.",
    "Customer-for-life from first call through closing",
  ],
  siteNotes: [
    "thenancykennedyteam.com already does the hard part: traffic, valuation, listings, local trust.",
    "Pain: after someone fills Home Valuation or Contact, follow-up still depends on a person noticing.",
    "Pain: Instagram / LinkedIn / Facebook DMs live outside CRM.",
    "Pain: a new listing means reinventing the blog + social posts by hand.",
    "Fix direction: one queue, owned workflows, start with the noisiest leak first.",
  ],
};

export function mergeCompanyForProspect(
  primary: ScrapedCompany,
  person?: ProspectPerson,
  secondary: ScrapedCompany[] = [],
): ScrapedCompany {
  if (!person) return primary;

  const name = person.teamName || person.brokerage || primary.name;
  const markets = person.markets?.slice(0, 4).join(", ") || "";
  const tagline =
    person.teamName === "The Nancy Kennedy Team"
      ? "Croton-on-Hudson Real Estate Experts · Houlihan Lawrence"
      : person.proofPoints?.[0] || primary.tagline;

  const description = [
    `${person.fullName || person.firstName}${person.title ? `, ${person.title}` : ""}`,
    person.teamName ? `leads ${person.teamName}` : null,
    person.brokerage ? `at ${person.brokerage}` : null,
    markets ? `serving ${markets}` : null,
    person.specialties?.length
      ? `Specialties: ${person.specialties.slice(0, 4).join("; ")}.`
      : null,
  ]
    .filter(Boolean)
    .join(" — ")
    .slice(0, 700);

  const signals = [
    ...primary.signals,
    ...secondary.flatMap((s) => s.signals),
    "USA luxury / residential brokerage",
    "Team production model",
    "Home valuation / lead magnet present (needs CRM wiring)",
    "Listing inventory on team or brokerage sites",
    "Instagram / LinkedIn / Facebook present",
  ];

  const brandColors =
    person.brandColors?.length
      ? person.brandColors
      : primary.brandColors.length > 0
        ? primary.brandColors
        : ["#0C2838", "#C2A67C", "#F4EFE6"];

  const url = person.websiteUrl || primary.url;
  let domain = primary.domain;
  try {
    domain = new URL(url).hostname;
  } catch {
    /* keep */
  }

  return {
    ...primary,
    url,
    domain,
    name,
    tagline: tagline.slice(0, 180),
    description,
    brandColors,
    logoUrl: person.logoUrl || primary.logoUrl || secondary.find((s) => s.logoUrl)?.logoUrl || null,
    ogImageUrl:
      primary.ogImageUrl || secondary.find((s) => s.ogImageUrl)?.ogImageUrl || null,
    heroImageUrl: person.heroImageUrl || primary.heroImageUrl || null,
    portraitUrl: person.portraitUrl || primary.portraitUrl || null,
    signals: [...new Set(signals)].slice(0, 14),
  };
}
