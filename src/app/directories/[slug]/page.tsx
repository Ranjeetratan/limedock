import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstallationBlock from "@/components/directories/InstallationBlock";
import {
  CATEGORY_LABELS,
  INDUSTRY_LABELS,
  getEntryBySlug,
  getEntrySlugs,
} from "@/lib/directories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getEntrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) {
    return { title: "Not found" };
  }

  return {
    title: `${entry.name} | Directories | LimeDock`,
    description: entry.summary,
  };
}

export default async function DirectoryEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const isSkill = entry.type === "skill";
  const backHref = isSkill
    ? "/directories?type=skill"
    : "/directories?type=agent";

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />

      <article className="pt-28 md:pt-32 pb-24">
        <div className="container-air">
          <div
            className={`relative overflow-hidden rounded-lg border min-h-[280px] p-8 md:p-12 ${
              isSkill
                ? "border-signature-mint/70 bg-gradient-to-br from-signature-mint/35 via-canvas to-signature-cream/80"
                : "border-signature-peach/80 bg-gradient-to-br from-signature-peach/40 via-canvas to-signature-cream/80"
            }`}
          >
            <Link
              href="/directories"
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
              All directories
            </Link>

            <div className="mt-8 flex flex-wrap gap-2">
              <span
                className={`inline-flex min-h-8 items-center rounded-sm px-3 text-caption uppercase tracking-[0.08em] text-on-dark ${
                  isSkill ? "bg-signature-forest" : "bg-signature-coral"
                }`}
              >
                {isSkill ? "Skill" : "Agent"}
              </span>
              {entry.categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex min-h-8 items-center rounded-sm border border-hairline bg-canvas/80 px-3 text-caption text-muted"
                >
                  {CATEGORY_LABELS[c]}
                </span>
              ))}
            </div>

            <h1 className="text-display-xl text-ink mt-6 max-w-3xl">
              {entry.name}
            </h1>
            <p className="text-label-md text-body mt-5 max-w-2xl leading-[1.5]">
              {entry.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex !min-h-11 !px-5"
              >
                Open source link
              </a>
              <Link
                href={backHref}
                className="inline-flex min-h-11 items-center rounded-sm border border-hairline bg-canvas px-5 text-body-md text-ink focus-ring"
              >
                Browse more {isSkill ? "skills" : "agents"}
              </Link>
            </div>
          </div>
        </div>

        <div className="container-air max-w-[920px] mt-14 space-y-12">
          <section>
            <SectionHeading index="01" title="Overview" />
            <p className="mt-5 text-body-md text-body leading-[1.7] whitespace-pre-wrap">
              {entry.overview}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {entry.industries.map((i) => (
                <span
                  key={i}
                  className="rounded-sm bg-signature-cream px-3 py-1.5 text-caption text-ink"
                >
                  {INDUSTRY_LABELS[i]}
                </span>
              ))}
            </div>
          </section>

          <section className="border-t border-hairline pt-12">
            <SectionHeading index="02" title="Link" />
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-body-md text-link break-all focus-ring rounded-sm"
            >
              {entry.link}
            </a>
          </section>

          <section className="border-t border-hairline pt-12">
            <SectionHeading index="03" title="Installation guide" />
            <div className="mt-5 rounded-md border border-hairline bg-surface-soft p-5 md:p-6">
              <InstallationBlock content={entry.installation} />
            </div>
          </section>

          <section className="border-t border-hairline pt-12">
            <SectionHeading index="04" title="How to use it" />
            <div className="mt-5 rounded-md border border-hairline bg-canvas p-5 md:p-6">
              <InstallationBlock content={entry.howToUse} />
            </div>
          </section>

          <section className="border-t border-hairline pt-12">
            <SectionHeading index="05" title="Example prompts" />
            <ul className="mt-5 space-y-3">
              {entry.examplePrompts.map((prompt) => (
                <li
                  key={prompt}
                  className="rounded-md border border-hairline bg-signature-cream/50 px-4 py-4 text-body-md text-body leading-[1.55]"
                >
                  “{prompt}”
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-hairline pt-12">
            <SectionHeading index="06" title="Use cases and examples" />
            <ul className="mt-5 grid gap-3">
              {entry.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className={`text-body-md text-body leading-[1.55] pl-4 border-l-2 ${
                    isSkill ? "border-signature-forest" : "border-signature-coral"
                  }`}
                >
                  {useCase}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-hairline pt-12">
            <SectionHeading index="07" title="Prerequisites" />
            <ul className="mt-5 space-y-3">
              {entry.prerequisites.map((item) => (
                <li key={item} className="flex gap-3 text-body-md text-body leading-[1.55]">
                  <span
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                      isSkill ? "bg-signature-forest" : "bg-signature-coral"
                    }`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-hairline pt-12">
            <SectionHeading index="08" title="Tips" />
            <ul className="mt-5 space-y-3">
              {entry.tips.map((tip) => (
                <li
                  key={tip}
                  className="rounded-md border border-hairline bg-surface-soft px-4 py-4 text-body-md text-body leading-[1.55]"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          {entry.sources.length > 0 && (
            <section className="border-t border-hairline pt-12">
              <SectionHeading index="09" title="Sources" />
              <ul className="mt-5 space-y-2">
                {entry.sources.map((source) => (
                  <li key={source}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-md text-link break-all focus-ring rounded-sm"
                    >
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <Footer />
    </main>
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
