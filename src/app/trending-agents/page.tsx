import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import TrendingBrowser from "@/components/trending-agents/TrendingBrowser";
import {
  CATEGORIES,
  CATEGORY_BLURBS,
  CATEGORY_LABELS,
  catalogStats,
  formatStars,
  getAgentsForWeek,
  getAllAgents,
  getTrendingWeeks,
  type AgentCategory,
} from "@/lib/trending-agents";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Trending AI Agent Repos on GitHub — Weekly, Explained";
const description =
  "A curated directory of trending AI agent GitHub repositories, explained in plain English: what each one does, who it is for, when to use it, when to avoid it, and ten automation ideas you can actually build.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "trending AI agent repos",
    "github trending AI agents",
    "best AI agent repositories",
    "open source AI agent tools",
    "AI agent github this week",
    "AI automation github repos",
  ],
  alternates: { canonical: "/trending-agents" },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/trending-agents"),
    type: "website",
    siteName: "LimeDock",
  },
  twitter: { card: "summary_large_image", title, description },
};

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

function parseCategory(value?: string): AgentCategory | "all" {
  if (value && (CATEGORIES as string[]).includes(value)) {
    return value as AgentCategory;
  }
  return "all";
}

/** "2026-08-10" → "10 August 2026" */
function formatWeek(week: string): string {
  const [y, m, d] = week.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function TrendingAgentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const agents = getAllAgents();
  const stats = catalogStats();
  const initialCategory = parseCategory(params.category);
  const weeks = getTrendingWeeks();
  const latestWeek = weeks[0];
  const thisWeek = latestWeek ? getAgentsForWeek(latestWeek).slice(0, 6) : [];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl("/trending-agents"),
    isPartOf: {
      "@type": "WebSite",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Trending AI agent repositories",
      numberOfItems: agents.length,
      itemListElement: agents.slice(0, 50).map((agent, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: agent.name,
        url: absoluteUrl(`/trending-agents/${agent.slug}`),
        description: agent.tagline,
      })),
    },
    offers: {
      "@type": "Offer",
      name: "Book a LimeDock workflow call",
      url: BOOK_DEMO_URL,
      description:
        "LimeDock builds owned marketing, sales, and ops automations for SaaS teams.",
    },
  };

  return (
    <main className="min-h-screen bg-canvas">
      <JsonLd data={collectionJsonLd} />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-10">
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg border border-hairline bg-gradient-to-br from-signature-cream via-canvas to-signature-peach/40 min-h-[340px] p-8 md:p-12">
            <div className="absolute -right-16 top-0 h-full w-[42%] bg-signature-mint/40 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-signature-yellow/30 blur-2xl" />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow">
                <span className="dot !bg-signature-coral" />
                Updated weekly
              </span>
              <h1 className="text-display-xl text-ink mt-7">
                Trending AI agent repos, explained properly.
              </h1>
              <p className="text-label-md text-body mt-5 max-w-xl leading-[1.45]">
                Every week we track the AI agent repositories the internet is
                starring — then write up what each one actually does, who it is
                for, when to reach for it, when to skip it, and ten automations
                a real team could build with it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <StatPill value={String(stats.repos)} label="Repos tracked" />
                <StatPill
                  value={formatStars(stats.totalStars)}
                  label="Combined stars"
                />
                <StatPill
                  value={String(stats.languages)}
                  label="Languages"
                />
                <StatPill
                  value={String(stats.repos * 10)}
                  label="Automation ideas"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* This week's picks */}
      {thisWeek.length > 0 && (
        <section className="pb-4">
          <div className="container-air">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h2 className="text-title-lg text-ink">
                Trending week of {formatWeek(latestWeek)}
              </h2>
              <span className="text-caption uppercase tracking-[0.12em] text-muted">
                {getAgentsForWeek(latestWeek).length} repos
              </span>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {thisWeek.map((agent, index) => (
                <li key={agent.slug}>
                  <Link
                    href={`/trending-agents/${agent.slug}`}
                    className="group flex h-full gap-4 rounded-md border border-hairline bg-surface-soft p-4 transition-colors hover:border-border-strong hover:bg-canvas focus-ring"
                  >
                    <span className="text-title-md text-signature-coral tabular-nums leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-title-sm text-ink group-hover:underline decoration-1 underline-offset-4">
                        {agent.name}
                      </span>
                      <span className="mt-1 block text-body-md text-body leading-[1.45] line-clamp-2">
                        {agent.tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Browser */}
      <section className="section-air pt-10 pb-16">
        <div className="container-air">
          <TrendingBrowser agents={agents} initialCategory={initialCategory} />
        </div>
      </section>

      {/* Category explainer — internal linking + keyword surface */}
      <section className="pb-20">
        <div className="container-air">
          <h2 className="text-title-lg text-ink">Browse by what it does</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => {
              const count = agents.filter((a) =>
                a.categories.includes(category)
              ).length;
              if (count === 0) return null;
              return (
                <li key={category}>
                  <Link
                    href={`/trending-agents?category=${category}`}
                    className="group flex h-full flex-col rounded-md border border-hairline bg-canvas p-5 transition-colors hover:border-border-strong hover:bg-surface-soft focus-ring"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-title-sm text-ink group-hover:underline decoration-1 underline-offset-4">
                        {CATEGORY_LABELS[category]}
                      </span>
                      <span className="text-caption text-muted tabular-nums">
                        {count}
                      </span>
                    </span>
                    <span className="mt-2 text-body-md text-body leading-[1.5]">
                      {CATEGORY_BLURBS[category]}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Conversion band */}
      <section className="pb-24">
        <div className="container-air">
          <div className="rounded-lg bg-surface-dark-elevated text-on-dark p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-[45%] rainbow-stripes opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-elevated via-surface-dark-elevated/92 to-transparent" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-display-md text-white">
                Reading about automation is not the same as having it.
              </h2>
              <p className="text-body-md text-white/75 mt-4 max-w-lg leading-[1.55]">
                Every repo here is a building block. LimeDock assembles them
                into the workflows your marketing, sales, and ops teams run by
                hand every week — deployed into your own cloud, wired into your
                Slack and CRM, and owned by you.
              </p>
              <a
                href={BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 inline-flex !bg-canvas !text-ink"
              >
                Book a workflow call
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex flex-col rounded-sm border border-hairline bg-canvas/80 px-4 py-2">
      <span className="text-title-sm text-ink tabular-nums">{value}</span>
      <span className="text-caption uppercase tracking-[0.08em] text-muted">
        {label}
      </span>
    </span>
  );
}
