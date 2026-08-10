import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import TrendingBrowser from "@/components/trending-agents/TrendingBrowser";
import CategoryIcon from "@/components/trending-agents/CategoryIcon";
import {
  CATEGORIES,
  CATEGORY_BLURBS,
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  catalogStats,
  formatStars,
  getAgentsForWeek,
  getAllAgents,
  getFeaturedAgents,
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
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
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
  const weekAgents = latestWeek ? getAgentsForWeek(latestWeek) : [];
  const featured = getFeaturedAgents(5);
  const [lead, ...supporting] = featured;
  const topByStars = [...agents]
    .sort((a, b) => b.stats.stars - a.stats.stars)
    .slice(0, 6);

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

      {/* ───────────────── Hero: split, with a live leaderboard panel ───────────────── */}
      <section className="pt-28 md:pt-32 pb-12">
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg border border-hairline bg-gradient-to-br from-signature-cream via-canvas to-signature-peach/35">
            <div className="absolute -right-24 -top-20 h-[420px] w-[420px] rounded-full bg-signature-mint/40 blur-3xl" />
            <div className="absolute -bottom-16 left-1/4 h-52 w-52 rounded-full bg-signature-yellow/35 blur-2xl" />

            <div className="relative z-10 grid lg:grid-cols-[1.15fr_1fr]">
              <div className="p-8 md:p-12 lg:pr-6">
                <span className="eyebrow">
                  <span className="dot !bg-signature-coral" />
                  Updated weekly
                </span>
                <h1 className="text-display-xl text-ink mt-7 max-w-xl">
                  Trending AI agent repos, explained properly.
                </h1>
                <p className="text-label-md text-body mt-5 max-w-lg leading-[1.45]">
                  Every week we track the repositories the internet is starring
                  — then write up what each one actually does, who it&rsquo;s
                  for, when to skip it, and ten automations a real team could
                  build with it.
                </p>

                <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-px bg-hairline rounded-md overflow-hidden border border-hairline">
                  <Stat value={String(stats.repos)} label="Repos" />
                  <Stat
                    value={formatStars(stats.totalStars)}
                    label="Combined stars"
                  />
                  <Stat value={String(stats.repos * 10)} label="Ideas" />
                  <Stat value={String(stats.languages)} label="Languages" />
                </div>
              </div>

              {/* Leaderboard panel */}
              <div className="p-8 md:p-12 lg:pl-6 lg:border-l border-hairline/70">
                <div className="rounded-md border border-hairline bg-canvas/85 backdrop-blur-sm overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-signature-coral animate-ping" />
                      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signature-coral" />
                    </span>
                    <span className="text-caption uppercase tracking-[0.1em] text-muted">
                      Most starred in the catalog
                    </span>
                  </div>
                  <ul className="divide-y divide-hairline">
                    {topByStars.map((agent, index) => (
                      <li key={agent.slug}>
                        <Link
                          href={`/trending-agents/${agent.slug}`}
                          className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-soft focus-ring"
                        >
                          <span className="text-caption text-muted tabular-nums w-5 shrink-0">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-body-md text-ink group-hover:underline decoration-1 underline-offset-4">
                            {agent.name}
                          </span>
                          <span className="shrink-0 text-caption text-muted tabular-nums">
                            ★ {formatStars(agent.stats.stars)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Editor's picks: asymmetric ───────────────── */}
      {lead && (
        <section className="pb-16">
          <div className="container-air">
            <SectionLabel index="01" title="Editor's picks" />

            <div className="mt-7 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
              {/* Lead card */}
              <Link
                href={`/trending-agents/${lead.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-lg bg-surface-dark-elevated text-on-dark p-8 md:p-10 min-h-[340px] focus-ring"
              >
                <div className="absolute inset-y-0 right-0 w-[45%] rainbow-stripes opacity-40 transition-opacity group-hover:opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-elevated via-surface-dark-elevated/94 to-transparent" />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 rounded-sm bg-white/12 px-3 py-1.5 text-caption uppercase tracking-[0.1em] text-white/85">
                    <CategoryIcon category={lead.categories[0]} size={14} />
                    {CATEGORY_LABELS[lead.categories[0]]}
                  </span>
                  <h3 className="text-display-md text-white mt-6 max-w-md">
                    {lead.name}
                  </h3>
                  <p className="text-body-md text-white/72 mt-4 max-w-md leading-[1.55]">
                    {lead.tagline}
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-caption text-white/60">
                  <span className="font-mono">{lead.repo}</span>
                  <span className="tabular-nums">
                    ★ {formatStars(lead.stats.stars)}
                  </span>
                  {lead.stats.language && <span>{lead.stats.language}</span>}
                  <span className="ml-auto inline-flex items-center gap-1.5 text-white/85">
                    Read the breakdown
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>

              {/* Supporting picks */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {supporting.map((agent, index) => (
                  <Link
                    key={agent.slug}
                    href={`/trending-agents/${agent.slug}`}
                    className={`group flex items-start gap-4 rounded-md border border-hairline p-5 transition-all hover:border-border-strong focus-ring ${
                      ["bg-signature-cream/60", "bg-signature-mint/30", "bg-signature-peach/30", "bg-signature-yellow/25"][
                        index % 4
                      ]
                    }`}
                  >
                    <span className="shrink-0 text-ink/70">
                      <CategoryIcon category={agent.categories[0]} size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-title-sm text-ink group-hover:underline decoration-1 underline-offset-4">
                        {agent.name}
                      </span>
                      <span className="mt-1.5 block text-body-md text-body leading-[1.45] line-clamp-2">
                        {agent.tagline}
                      </span>
                      <span className="mt-2.5 block text-caption text-muted tabular-nums">
                        ★ {formatStars(agent.stats.stars)} ·{" "}
                        {DIFFICULTY_LABELS[agent.difficulty]}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────── This week ───────────────── */}
      {weekAgents.length > 0 && (
        <section className="pb-16">
          <div className="container-air">
            <div className="rounded-lg border border-hairline bg-surface-soft p-7 md:p-9">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <SectionLabel
                  index="02"
                  title={`Week of ${formatWeek(latestWeek)}`}
                  flush
                />
                <span className="text-caption uppercase tracking-[0.1em] text-muted">
                  {weekAgents.length} repos added
                </span>
              </div>

              <ul className="mt-6 grid gap-x-8 gap-y-px sm:grid-cols-2">
                {weekAgents.slice(0, 12).map((agent, index) => (
                  <li key={agent.slug} className="border-b border-hairline">
                    <Link
                      href={`/trending-agents/${agent.slug}`}
                      className="group flex items-baseline gap-4 py-3.5 focus-ring"
                    >
                      <span className="text-caption text-signature-coral tabular-nums shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-body-md text-ink group-hover:underline decoration-1 underline-offset-4">
                          {agent.name}
                        </span>
                        <span className="mt-0.5 block text-caption text-muted line-clamp-1">
                          {agent.tagline}
                        </span>
                      </span>
                      <span className="shrink-0 text-caption text-muted tabular-nums">
                        ★ {formatStars(agent.stats.stars)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────── Category grid ───────────────── */}
      <section className="pb-16">
        <div className="container-air">
          <SectionLabel index="03" title="Browse by what it does" />
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => {
              const count = agents.filter((a) =>
                a.categories.includes(category)
              ).length;
              if (count === 0) return null;
              return (
                <li key={category}>
                  <Link
                    href={`/trending-agents?category=${category}`}
                    className="group flex h-full gap-4 rounded-md border border-hairline bg-canvas p-5 transition-all hover:border-border-strong hover:bg-surface-soft focus-ring"
                  >
                    <span className="mt-0.5 shrink-0 rounded-sm border border-hairline bg-signature-cream/70 p-2 text-ink transition-colors group-hover:bg-signature-mint/50">
                      <CategoryIcon category={category} size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-title-sm text-ink group-hover:underline decoration-1 underline-offset-4">
                          {CATEGORY_LABELS[category]}
                        </span>
                        <span className="text-caption text-muted tabular-nums shrink-0">
                          {count}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-body-md text-body leading-[1.5]">
                        {CATEGORY_BLURBS[category]}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────────────── Full browser ───────────────── */}
      <section id="browse" className="section-air pt-4 pb-16 scroll-mt-24">
        <div className="container-air">
          <SectionLabel index="04" title="The whole catalog" />
          <div className="mt-7">
            <TrendingBrowser agents={agents} initialCategory={initialCategory} />
          </div>
        </div>
      </section>

      {/* ───────────────── How to read these ───────────────── */}
      <section className="pb-16">
        <div className="container-air">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                n: "A",
                title: "What it actually does",
                body: "Plain English, no marketing voice. If a repo's README is three languages of badges, we read it so you don't have to.",
                tone: "bg-signature-mint/30 border-signature-forest/30",
              },
              {
                n: "B",
                title: "When to skip it",
                body: "Every entry says when the tool is wrong for you. That section is usually more useful than the one above it.",
                tone: "bg-signature-peach/30 border-signature-coral/30",
              },
              {
                n: "C",
                title: "Ten automation ideas",
                body: "Tied to workflows a real team runs by hand — marketing, sales, support, finance, ops. Ideas, not tutorials.",
                tone: "bg-signature-yellow/25 border-signature-mustard/40",
              },
            ].map((item) => (
              <div
                key={item.n}
                className={`rounded-md border p-6 ${item.tone}`}
              >
                <span className="text-caption uppercase tracking-[0.12em] text-ink/60">
                  {item.n}
                </span>
                <h3 className="text-title-sm text-ink mt-2">{item.title}</h3>
                <p className="text-body-md text-body mt-2.5 leading-[1.55]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Conversion ───────────────── */}
      <section className="pb-24">
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg bg-surface-dark-elevated text-on-dark p-8 md:p-12">
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-canvas/85 px-4 py-3.5">
      <div className="text-title-md text-ink tabular-nums leading-none">
        {value}
      </div>
      <div className="text-caption uppercase tracking-[0.08em] text-muted mt-1.5">
        {label}
      </div>
    </div>
  );
}

function SectionLabel({
  index,
  title,
  flush = false,
}: {
  index: string;
  title: string;
  flush?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline gap-4 ${
        flush ? "" : "border-b border-hairline pb-4"
      }`}
    >
      <span className="text-caption uppercase tracking-[0.12em] text-signature-coral">
        {index}
      </span>
      <h2 className="text-title-lg text-ink">{title}</h2>
    </div>
  );
}
