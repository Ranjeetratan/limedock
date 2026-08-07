import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstallationBlock from "@/components/directories/InstallationBlock";
import {
  CATEGORY_LABELS,
  ENTRY_TYPE_LABELS,
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

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />

      <article className="pt-32 md:pt-40 pb-24">
        <div className="container-air max-w-[920px]">
          <Link
            href="/directories"
            className="inline-flex items-center gap-2 text-caption text-muted focus-ring rounded-sm mb-8"
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

          <span className="eyebrow">
            <span className="dot" />
            {ENTRY_TYPE_LABELS[entry.type]}
          </span>

          <h1 className="text-display-xl text-ink mt-7 max-w-3xl">
            {entry.name}
          </h1>

          <p className="text-label-md text-body mt-5 max-w-2xl leading-[1.5]">
            {entry.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-caption text-muted">
            <span>
              {entry.categories.map((c) => CATEGORY_LABELS[c]).join(" · ")}
            </span>
            <span>
              {entry.industries.map((i) => INDUSTRY_LABELS[i]).join(" · ")}
            </span>
          </div>

          <div className="mt-10">
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex !min-h-11 !px-5"
            >
              Open link
            </a>
          </div>

          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className="text-title-md text-ink">Link</h2>
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-body-md text-link break-all focus-ring rounded-sm"
            >
              {entry.link}
            </a>
          </section>

          <section className="mt-12 border-t border-hairline pt-12">
            <h2 className="text-title-md text-ink">Installation guide</h2>
            <div className="mt-5">
              <InstallationBlock content={entry.installation} />
            </div>
          </section>

          <section className="mt-12 border-t border-hairline pt-12">
            <h2 className="text-title-md text-ink">How to use it</h2>
            <p className="mt-5 text-body-md text-body leading-[1.65] whitespace-pre-wrap">
              {entry.howToUse}
            </p>
          </section>

          <section className="mt-12 border-t border-hairline pt-12">
            <h2 className="text-title-md text-ink">Use cases and examples</h2>
            <ul className="mt-5 space-y-3">
              {entry.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="text-body-md text-body leading-[1.55] pl-4 border-l-2 border-hairline"
                >
                  {useCase}
                </li>
              ))}
            </ul>
          </section>

          {entry.sources.length > 0 && (
            <section className="mt-12 border-t border-hairline pt-12">
              <h2 className="text-title-md text-ink">Sources</h2>
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
