import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import CategoryIcon from "@/components/trending-agents/CategoryIcon";
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
  type AgentAudience,
  type TrendingAgent,
} from "@/lib/trending-agents";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Each team gets its own chip colour so the idea grid scans by audience. */
const AUDIENCE_TONE: Record<AgentAudience, string> = {
  founder: "bg-signature-yellow/40 text-ink",
  marketing: "bg-signature-peach/50 text-ink",
  sales: "bg-signature-coral/20 text-ink",
  operations: "bg-signature-mint/50 text-ink",
  engineering: "bg-signature-cream text-ink",
  data: "bg-signature-mustard/30 text-ink",
  support: "bg-signature-mint/30 text-ink",
  finance: "bg-signature-yellow/25 text-ink",
};

const SECTIONS = [
  { id: "what", label: "What it does" },
  { id: "who", label: "Who it's for" },
  { id: "where", label: "Where it fits" },
  { id: "verdict", label: "Use or skip" },
  { id: "ideas", label: "10 ideas" },
  { id: "related", label: "Related" },
];

export function generateStaticParams() {
  return getAgentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) return { title: "Not found" };

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
  const paragraphs = agent.whatItDoes.split("\n\n");

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
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trending Agents",
        item: absoluteUrl("/trending-agents"),
      },
      { "@type": "ListItem", position: 3, name: agent.name, item: pageUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${agent.name} do?`,
        acceptedAnswer: { "@type": "Answer", text: paragraphs[0] },
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
        acceptedAnswer: { "@type": "Answer", text: agent.whenToUse.join(" ") },
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

      {/* ───────────────── Hero: content + stats panel ───────────────── */}
      <section className="pt-28 md:pt-32 pb-10">
        <div className="container-air">
          <nav className="flex items-center gap-2 text-caption text-muted mb-5">
            <Link href="/trending-agents" className="focus-ring rounded-sm hover:text-ink transition-colors">
              Trending Agents
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink">{agent.name}</span>
          </nav>

          <div className="relative overflow-hidden rounded-lg border border-hairline bg-gradient-to-br from-signature-cream via-canvas to-signature-mint/30">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-signature-peach/35 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-[1.4fr_1fr]">
              <div className="p-8 md:p-11">
                <div className="flex flex-wrap gap-2">
                  {agent.categories.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 rounded-sm bg-signature-forest px-2.5 py-1.5 text-caption uppercase tracking-[0.08em] text-on-dark"
                    >
                      <CategoryIcon category={c} size={13} />
                      {CATEGORY_LABELS[c]}
                    </span>
                  ))}
                </div>

                <h1 className="text-display-xl text-ink mt-6">{agent.name}</h1>
                <p className="text-caption text-muted mt-3 font-mono break-all">
                  {agent.repo}
                </p>
                <p className="text-label-md text-body mt-5 max-w-xl leading-[1.5]">
                  {agent.tagline}
                </p>

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
                      className="inline-flex min-h-11 items-center rounded-sm border border-hairline bg-canvas px-5 text-body-md text-ink focus-ring hover:border-border-strong transition-colors"
                    >
                      Project site
                    </a>
                  )}
                </div>
              </div>

              {/* Stats panel */}
              <div className="border-t lg:border-t-0 lg:border-l border-hairline/70 p-8 md:p-11 lg:p-8">
                <div className="rounded-md border border-hairline bg-canvas/85 backdrop-blur-sm overflow-hidden">
                  <div className="border-b border-hairline px-4 py-2.5">
                    <span className="text-caption uppercase tracking-[0.1em] text-muted">
                      Repository
                    </span>
                  </div>
                  <dl className="divide-y divide-hairline">
                    <StatRow label="Stars" value={formatStars(agent.stats.stars)} />
                    <StatRow label="Forks" value={formatStars(agent.stats.forks)} />
                    <StatRow
                      label="Open issues"
                      value={formatStars(agent.stats.openIssues)}
                    />
                    {agent.stats.language && (
                      <StatRow label="Language" value={agent.stats.language} />
                    )}
                    <StatRow
                      label="Licence"
                      value={
                        agent.stats.license &&
                        agent.stats.license !== "NOASSERTION"
                          ? agent.stats.license
                          : "See repo"
                      }
                    />
                    <StatRow label="Created" value={agent.stats.createdAt} />
                    <StatRow label="Last push" value={agent.stats.pushedAt} />
                  </dl>
                </div>

                <div className="mt-3 rounded-md border border-hairline bg-canvas/85 px-4 py-3.5">
                  <span className="text-caption uppercase tracking-[0.1em] text-muted">
                    Effort to adopt
                  </span>
                  <p className="text-title-sm text-ink mt-1.5">
                    {DIFFICULTY_LABELS[agent.difficulty]}
                  </p>
                  <p className="text-body-md text-body mt-1 leading-[1.45]">
                    {DIFFICULTY_BLURBS[agent.difficulty]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Sticky section nav ───────────────── */}
      <div className="sticky top-16 z-30 border-y border-hairline bg-canvas/92 backdrop-blur-xl">
        <div className="container-air">
          <ul className="flex gap-1 overflow-x-auto py-2.5 -mx-1 px-1">
            {SECTIONS.map((section) => (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-9 items-center rounded-sm px-3 text-body-md text-muted transition-colors hover:bg-surface-soft hover:text-ink focus-ring"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <article className="pb-24">
        {/* ───────────────── What it does ───────────────── */}
        <section id="what" className="scroll-mt-32 pt-14">
          <div className="container-air">
            <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-12">
              <SideLabel index="01" title="What it actually does" />
              <div className="max-w-[68ch]">
                {/* Lead paragraph gets visual weight */}
                <p className="text-label-md text-ink leading-[1.5] border-l-2 border-signature-coral pl-5">
                  {paragraphs[0]}
                </p>
                <div className="mt-6 space-y-4">
                  {paragraphs.slice(1).map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-body-md text-body leading-[1.7]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── Who it's for ───────────────── */}
        <section id="who" className="scroll-mt-32 pt-16">
          <div className="container-air">
            <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-12">
              <SideLabel index="02" title="Who it's for" />
              <div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {agent.whoItIsFor.map((who, index) => (
                    <li
                      key={who}
                      className="rounded-md border border-hairline bg-surface-soft p-5"
                    >
                      <span className="text-caption text-signature-coral tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-body-md text-body mt-2 leading-[1.55]">
                        {who}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {agent.audiences.map((a) => (
                    <span
                      key={a}
                      className={`rounded-sm px-3 py-1.5 text-caption ${AUDIENCE_TONE[a]}`}
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
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── Where it fits ───────────────── */}
        <section id="where" className="scroll-mt-32 pt-16">
          <div className="container-air">
            <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-12">
              <SideLabel index="03" title="Where it earns its keep" />
              <ul className="max-w-[68ch] divide-y divide-hairline border-y border-hairline">
                {agent.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex gap-4 py-4 text-body-md text-body leading-[1.55]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signature-forest" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────────────── Use / skip ───────────────── */}
        <section id="verdict" className="scroll-mt-32 pt-16">
          <div className="container-air">
            <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-12">
              <SideLabel index="04" title="Use it, or skip it" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-signature-forest/40 bg-signature-mint/20 overflow-hidden">
                  <h3 className="flex items-center gap-2 border-b border-signature-forest/25 px-5 py-3.5 text-title-sm text-ink">
                    <span className="inline-block h-2 w-2 rounded-full bg-signature-forest" />
                    Reach for it when
                  </h3>
                  <ul className="divide-y divide-signature-forest/15">
                    {agent.whenToUse.map((item) => (
                      <li
                        key={item}
                        className="px-5 py-3.5 text-body-md text-body leading-[1.5]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md border border-signature-coral/40 bg-signature-peach/25 overflow-hidden">
                  <h3 className="flex items-center gap-2 border-b border-signature-coral/25 px-5 py-3.5 text-title-sm text-ink">
                    <span className="inline-block h-2 w-2 rounded-full bg-signature-coral" />
                    Skip it when
                  </h3>
                  <ul className="divide-y divide-signature-coral/15">
                    {agent.whenToAvoid.map((item) => (
                      <li
                        key={item}
                        className="px-5 py-3.5 text-body-md text-body leading-[1.5]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── Automation ideas ───────────────── */}
        <section id="ideas" className="scroll-mt-32 pt-16">
          <div className="container-air">
            <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-12">
              <SideLabel
                index="05"
                title="10 automations"
                note="Ideas, not tutorials. Each one is work a team does by hand today."
              />
              <ol className="grid gap-3 sm:grid-cols-2">
                {agent.automationIdeas.map((idea, index) => (
                  <li
                    key={idea.title}
                    className="group flex flex-col rounded-md border border-hairline bg-canvas p-5 transition-colors hover:border-border-strong hover:bg-surface-soft"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-title-md text-signature-coral/70 tabular-nums leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`shrink-0 rounded-sm px-2 py-1 text-caption ${AUDIENCE_TONE[idea.audience]}`}
                      >
                        {AUDIENCE_LABELS[idea.audience]}
                      </span>
                    </div>
                    <h3 className="text-title-sm text-ink mt-3">{idea.title}</h3>
                    <p className="text-body-md text-body mt-2 leading-[1.55]">
                      {idea.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ───────────────── Conversion ───────────────── */}
        <section className="pt-16">
          <div className="container-air">
            <div className="relative overflow-hidden rounded-lg bg-surface-dark-elevated text-on-dark p-8 md:p-11">
              <div className="absolute inset-y-0 right-0 w-[42%] rainbow-stripes opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-elevated via-surface-dark-elevated/92 to-transparent" />
              <div className="relative z-10 grid lg:grid-cols-[1.5fr_auto] gap-8 items-center">
                <div className="max-w-xl">
                  <h2 className="text-title-lg text-white">
                    Want one of these running by Friday?
                  </h2>
                  <p className="text-body-md text-white/75 mt-3 leading-[1.55]">
                    LimeDock builds these as real workflows inside your stack —
                    deployed to your cloud, wired into your Slack and CRM, with
                    the code in your repo. You pay a build fee and your own API
                    keys, nothing else.
                  </p>
                </div>
                <a
                  href={BOOK_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex shrink-0 !bg-canvas !text-ink"
                >
                  Book a workflow call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── Related ───────────────── */}
        {related.length > 0 && (
          <section id="related" className="scroll-mt-32 pt-16">
            <div className="container-air">
              <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-12">
                <SideLabel index="06" title="Related repos" />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {related.map((entry) => (
                    <li key={entry.slug}>
                      <RelatedCard agent={entry} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ───────────────── Source ───────────────── */}
        <section className="pt-16">
          <div className="container-air">
            <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-12">
              <SideLabel index="07" title="Source" />
              <div className="max-w-[68ch] rounded-md border border-hairline bg-surface-soft p-5">
                <p className="text-body-md text-body leading-[1.6]">
                  Repository stats were read from the GitHub API and reflect the
                  last time we refreshed this entry. The editorial breakdown
                  above is LimeDock&rsquo;s own analysis — we are not affiliated
                  with {agent.owner}.
                </p>
                <a
                  href={agent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-body-md text-link break-all focus-ring rounded-sm"
                >
                  {agent.url}
                </a>
              </div>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-2.5">
      <dt className="text-body-md text-muted">{label}</dt>
      <dd className="text-body-md text-ink tabular-nums text-right">{value}</dd>
    </div>
  );
}

function SideLabel({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="lg:sticky lg:top-32 lg:self-start">
      <div className="flex items-baseline gap-3 lg:block">
        <span className="text-caption uppercase tracking-[0.12em] text-signature-coral lg:block">
          {index}
        </span>
        <h2 className="text-title-md text-ink lg:mt-2">{title}</h2>
      </div>
      {note && (
        <p className="hidden lg:block text-body-md text-muted mt-3 leading-[1.5]">
          {note}
        </p>
      )}
    </div>
  );
}

function RelatedCard({ agent }: { agent: TrendingAgent }) {
  return (
    <Link
      href={`/trending-agents/${agent.slug}`}
      className="group flex h-full gap-4 rounded-md border border-hairline bg-canvas p-5 transition-all hover:border-border-strong hover:bg-surface-soft focus-ring"
    >
      <span className="mt-0.5 shrink-0 text-ink/60">
        <CategoryIcon category={agent.categories[0]} size={20} />
      </span>
      <span className="min-w-0">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-title-sm text-ink group-hover:underline decoration-1 underline-offset-4">
            {agent.name}
          </span>
          <span className="shrink-0 text-caption text-muted tabular-nums">
            ★ {formatStars(agent.stats.stars)}
          </span>
        </span>
        <span className="mt-1.5 block text-body-md text-body line-clamp-2 leading-[1.45]">
          {agent.tagline}
        </span>
      </span>
    </Link>
  );
}
