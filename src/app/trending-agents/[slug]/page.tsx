import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  AUDIENCE_LABELS,
  CATEGORY_LABELS,
  DIFFICULTY_BLURBS,
  DIFFICULTY_LABELS,
  INDUSTRY_LABELS,
  formatStars,
  getAgentBySlug,
  getAgentSlugs,
  getRelatedAgents,
  type TrendingAgent,
} from "@/lib/trending-agents";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAgentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) return { title: "Not found" };

  // Lead the title with the repo name — that's the query people actually type.
  const title = `${agent.name} (${agent.repo}) — What It Does & 10 Automation Ideas`;
  const description = `${agent.tagline} Plain-English breakdown of ${agent.name}: what it does, who it's for, when to use it, when to avoid it, and ten automations you can build with it.`;
  const url = absoluteUrl(`/trending-agents/${agent.slug}`);

  return {
    title,
    description,
    keywords: agent.seoKeywords,
    alternates: { canonical: `/trending-agents/${agent.slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "LimeDock",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TrendingAgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const related = getRelatedAgents(agent);
  const pageUrl = absoluteUrl(`/trending-agents/${agent.slug}`);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: agent.name,
    description: agent.tagline,
    url: pageUrl,
    codeRepository: agent.url,
    programmingLanguage: agent.stats.language ?? undefined,
    license: agent.stats.license ?? undefined,
    author: { "@type": "Organization", name: agent.owner },
    isPartOf: {
      "@type": "CollectionPage",
      name: "Trending AI Agent Repos",
      url: absoluteUrl("/trending-agents"),
    },
    publisher: {
      "@type": "Organization",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trending Agents",
        item: absoluteUrl("/trending-agents"),
      },
      { "@type": "ListItem", position: 3, name: agent.name, item: pageUrl },
    ],
  };

  // The when-to-use / when-to-avoid pairs map cleanly onto FAQ rich results.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${agent.name} do?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: agent.whatItDoes.split("\n\n")[0],
        },
      },
      {
        "@type": "Question",
        name: `Who is ${agent.name} for?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: agent.whoItIsFor.join(" "),
        },
      },
      {
        "@type": "Question",
        name: `When should you use ${agent.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: agent.whenToUse.join(" "),
        },
      },
      {
        "@type": "Question",
        name: `When should you avoid ${agent.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: agent.whenToAvoid.join(" "),
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-canvas">
      <JsonLd data={softwareJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Navbar />

      <article className="pt-28 md:pt-32 pb-24">
        {/* Hero */}
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg border border-hairline bg-gradient-to-br from-signature-cream via-canvas to-signature-mint/35 p-8 md:p-12">
            <Link
              href="/trending-agents"
              className="inline-flex items-center gap-2 text-caption text-muted focus-ring rounded-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M19 12H5M5 12L11 6M5 12L11 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All trending agents
            </Link>

            <div className="mt-8 flex flex-wrap gap-2">
              {agent.categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex min-h-8 items-center rounded-sm bg-signature-forest px-3 text-caption uppercase tracking-[0.08em] text-on-dark"
                >
                  {CATEGORY_LABELS[c]}
                </span>
              ))}
              <span className="inline-flex min-h-8 items-center rounded-sm border border-hairline bg-canvas/80 px-3 text-caption text-muted">
                {DIFFICULTY_LABELS[agent.difficulty]}
              </span>
            </div>

            <h1 className="text-display-xl text-ink mt-6 max-w-3xl">
              {agent.name}
            </h1>
            <p className="text-caption text-muted mt-3 font-mono">
              {agent.repo}
            </p>
            <p className="text-label-md text-body mt-5 max-w-2xl leading-[1.5]">
              {agent.tagline}
            </p>

            {/* Live repo stats */}
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Stat label="Stars" value={formatStars(agent.stats.stars)} />
              <Stat label="Forks" value={formatStars(agent.stats.forks)} />
              {agent.stats.language && (
                <Stat label="Language" value={agent.stats.language} />
              )}
              <Stat
                label="Licence"
                value={
                  agent.stats.license && agent.stats.license !== "NOASSERTION"
                    ? agent.stats.license
                    : "See repo"
                }
              />
              <Stat label="Last push" value={agent.stats.pushedAt} />
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={agent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex !min-h-11 !px-5"
              >
                View on GitHub
              </a>
              {agent.homepage && (
                <a
                  href={agent.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-sm border border-hairline bg-canvas px-5 text-body-md text-ink focus-ring"
                >
                  Project site
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="container-air max-w-[920px] mt-14 space-y-12">
          {/* What it does */}
          <section>
            <SectionHeading index="01" title="What it actually does" />
            <div className="mt-5 space-y-4">
              {agent.whatItDoes.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-body-md text-body leading-[1.7]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Who it's for */}
          <section className="border-t border-hairline pt-12">
            <SectionHeading index="02" title="Who it's for" />
            <ul className="mt-5 grid gap-3">
              {agent.whoItIsFor.map((who) => (
                <li
                  key={who}
                  className="border-l-2 border-signature-coral pl-4 text-body-md text-body leading-[1.55]"
                >
                  {who}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {agent.audiences.map((a) => (
                <span
                  key={a}
                  className="rounded-sm bg-signature-cream px-3 py-1.5 text-caption text-ink"
                >
                  {AUDIENCE_LABELS[a]}
                </span>
              ))}
              {agent.industries.map((i) => (
                <span
                  key={i}
                  className="rounded-sm border border-hairline px-3 py-1.5 text-caption text-muted"
                >
                  {INDUSTRY_LABELS[i]}
                </span>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section className="border-t border-hairline pt-12">
            <SectionHeading index="03" title="Where it earns its keep" />
            <ul className="mt-5 space-y-3">
              {agent.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="flex gap-3 text-body-md text-body leading-[1.55]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signature-forest" />
                  {useCase}
                </li>
              ))}
            </ul>
          </section>

          {/* When to use / avoid */}
          <section className="border-t border-hairline pt-12">
            <SectionHeading index="04" title="When to use it, when to skip it" />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-md border border-signature-forest/40 bg-signature-mint/20 p-5">
                <h3 className="text-title-sm text-ink flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-signature-forest" />
                  Reach for it when
                </h3>
                <ul className="mt-4 space-y-3">
                  {agent.whenToUse.map((item) => (
                    <li
                      key={item}
                      className="text-body-md text-body leading-[1.5]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md border border-signature-coral/40 bg-signature-peach/25 p-5">
                <h3 className="text-title-sm text-ink flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-signature-coral" />
                  Skip it when
                </h3>
                <ul className="mt-4 space-y-3">
                  {agent.whenToAvoid.map((item) => (
                    <li
                      key={item}
                      className="text-body-md text-body leading-[1.5]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-5 rounded-md border border-hairline bg-surface-soft px-4 py-3 text-body-md text-body">
              <strong className="text-ink">
                {DIFFICULTY_LABELS[agent.difficulty]}:
              </strong>{" "}
              {DIFFICULTY_BLURBS[agent.difficulty]}
            </p>
          </section>

          {/* Automation ideas — the differentiated content */}
          <section className="border-t border-hairline pt-12">
            <SectionHeading
              index="05"
              title={`10 automations you could build with ${agent.name}`}
            />
            <p className="mt-4 text-body-md text-muted leading-[1.55]">
              Ideas, not tutorials. Each one is a workflow a real team runs by
              hand today.
            </p>
            <ol className="mt-6 grid gap-3">
              {agent.automationIdeas.map((idea, index) => (
                <li
                  key={idea.title}
                  className="rounded-md border border-hairline bg-canvas p-5 transition-colors hover:border-border-strong"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-title-sm text-signature-coral tabular-nums leading-none pt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-title-sm text-ink">{idea.title}</h3>
                        <span className="rounded-sm bg-signature-cream px-2 py-0.5 text-caption text-ink">
                          {AUDIENCE_LABELS[idea.audience]}
                        </span>
                      </div>
                      <p className="mt-2 text-body-md text-body leading-[1.55]">
                        {idea.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Conversion */}
          <section className="border-t border-hairline pt-12">
            <div className="rounded-lg bg-surface-dark-elevated text-on-dark p-7 md:p-9 relative overflow-hidden">
              <div className="absolute inset-y-0 right-0 w-[40%] rainbow-stripes opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-elevated via-surface-dark-elevated/92 to-transparent" />
              <div className="relative z-10 max-w-xl">
                <h2 className="text-title-lg text-white">
                  Want one of these running by Friday?
                </h2>
                <p className="text-body-md text-white/75 mt-3 leading-[1.55]">
                  LimeDock builds these as real workflows inside your stack —
                  deployed to your cloud, wired into your Slack and CRM, with
                  the code in your repo. You pay a build fee and your own API
                  keys, nothing else.
                </p>
                <a
                  href={BOOK_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 inline-flex !bg-canvas !text-ink"
                >
                  Book a workflow call
                </a>
              </div>
            </div>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section className="border-t border-hairline pt-12">
              <SectionHeading index="06" title="Related repos worth a look" />
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {related.map((entry) => (
                  <li key={entry.slug}>
                    <RelatedCard agent={entry} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Source */}
          <section className="border-t border-hairline pt-12">
            <SectionHeading index="07" title="Source" />
            <p className="mt-5 text-body-md text-body leading-[1.6]">
              Repository stats were read from the GitHub API and reflect the
              last time we refreshed this entry. The editorial breakdown above
              is LimeDock&rsquo;s own analysis — we are not affiliated with{" "}
              {agent.owner}.
            </p>
            <a
              href={agent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-body-md text-link break-all focus-ring rounded-sm"
            >
              {agent.url}
            </a>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-caption uppercase tracking-[0.08em] text-muted">
        {label}
      </dt>
      <dd className="text-body-md text-ink tabular-nums mt-0.5">{value}</dd>
    </div>
  );
}

function RelatedCard({ agent }: { agent: TrendingAgent }) {
  return (
    <Link
      href={`/trending-agents/${agent.slug}`}
      className="group flex h-full flex-col rounded-md border border-hairline bg-canvas p-4 transition-colors hover:border-border-strong hover:bg-surface-soft focus-ring"
    >
      <span className="flex items-center justify-between gap-3">
        <span className="text-caption uppercase tracking-[0.08em] text-muted">
          {CATEGORY_LABELS[agent.categories[0]]}
        </span>
        <span className="text-caption text-muted tabular-nums">
          ★ {formatStars(agent.stats.stars)}
        </span>
      </span>
      <span className="mt-3 text-title-sm text-ink group-hover:underline decoration-1 underline-offset-4">
        {agent.name}
      </span>
      <span className="mt-2 text-body-md text-body line-clamp-2 leading-[1.45]">
        {agent.tagline}
      </span>
    </Link>
  );
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-caption uppercase tracking-[0.12em] text-signature-coral">
        {index}
      </span>
      <h2 className="text-title-md text-ink">{title}</h2>
    </div>
  );
}
