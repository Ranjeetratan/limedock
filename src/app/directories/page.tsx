import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import DirectoriesBrowser from "@/components/directories/DirectoriesBrowser";
import DirectoriesMobileCtaBar from "@/components/directories/DirectoriesMobileCtaBar";
import { countByType, getAllEntries, type EntryType } from "@/lib/directories";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Directories — SaaS Automation Skills & Agents";
const description =
  "Browse Claude Skills, Agents, and curated GitHub resources as inspiration — then book LimeDock to build owned marketing, sales, and ops automations for your SaaS team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/directories",
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/directories"),
    type: "website",
    siteName: "LimeDock",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

type PageProps = {
  searchParams: Promise<{ type?: string }>;
};

function parseType(value?: string): EntryType | "all" | "github" {
  if (value === "skill" || value === "agent" || value === "github") return value;
  return "all";
}

export default async function DirectoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const entries = getAllEntries();
  const counts = countByType();
  const initialType = parseType(params.type);

  const itemListElements = entries.slice(0, 40).map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.name,
    url: absoluteUrl(`/directories/${entry.slug}`),
    description: entry.summary,
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl("/directories"),
    isPartOf: {
      "@type": "WebSite",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    about: {
      "@type": "Organization",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      name: "LimeDock Directories catalog",
      numberOfItems: entries.length,
      itemListElement: itemListElements,
    },
    offers: {
      "@type": "Offer",
      name: "Book a LimeDock workflow call",
      url: BOOK_DEMO_URL,
      description:
        "LimeDock implements owned marketing, sales, and ops automations for SaaS teams.",
    },
  };

  return (
    <main className="min-h-screen bg-canvas">
      <JsonLd data={collectionJsonLd} />
      <Navbar />

      <section className="pt-24 md:pt-28 pb-6">
        <div className="container-air">
          <div className="max-w-2xl">
            <h1 className="text-display-md text-ink">Directories</h1>
            <p className="text-body-md text-body mt-3 max-w-xl leading-[1.5]">
              Skills, agents, and GitHub resources — with plain-language
              examples.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex min-h-8 items-center rounded-sm bg-signature-forest px-3 text-caption uppercase tracking-[0.08em] text-on-dark">
                {counts.skill} Skills
              </span>
              <span className="inline-flex min-h-8 items-center rounded-sm bg-signature-coral px-3 text-caption uppercase tracking-[0.08em] text-on-dark">
                {counts.agent} Agents
              </span>
              <span className="inline-flex min-h-8 items-center rounded-sm bg-ink px-3 text-caption uppercase tracking-[0.08em] text-on-primary">
                {counts.github} GitHub
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-air pt-2 pb-28 md:pb-24">
        <div className="container-air">
          <DirectoriesBrowser entries={entries} initialType={initialType} />
        </div>
      </section>

      <Footer />
      <DirectoriesMobileCtaBar />
    </main>
  );
}
