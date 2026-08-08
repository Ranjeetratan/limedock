"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CATEGORY_LABELS,
  INDUSTRY_LABELS,
  countByType,
  filterEntries,
  type DirectoryEntry,
  type EntryType,
} from "@/lib/directories";
import DirectoryFilters, {
  type DirectoryFilterState,
} from "./DirectoryFilters";
import DirectoriesConversionStrip from "./DirectoriesConversionStrip";

type Props = {
  entries: DirectoryEntry[];
  initialType?: EntryType | "all";
};

const PAGE_SIZE = 12;

const TYPE_STYLES: Record<
  EntryType,
  {
    sectionBorder: string;
    badge: string;
    chip: string;
    eyebrow: string;
  }
> = {
  skill: {
    sectionBorder: "border-signature-mint/80 bg-signature-mint/25",
    badge: "bg-signature-forest text-on-dark",
    chip: "bg-signature-forest/10 text-signature-forest",
    eyebrow: "Reusable capability packs",
  },
  agent: {
    sectionBorder: "border-signature-peach/90 bg-signature-peach/30",
    badge: "bg-signature-coral text-on-dark",
    chip: "bg-signature-coral/10 text-signature-coral",
    eyebrow: "Orchestrated workflows",
  },
  system: {
    sectionBorder: "border-signature-mustard/80 bg-signature-yellow/25",
    badge: "bg-signature-mustard text-ink",
    chip: "bg-signature-mustard/20 text-ink",
    eyebrow: "Composable skill architectures",
  },
};

export default function DirectoriesBrowser({
  entries,
  initialType = "all",
}: Props) {
  const [filters, setFilters] = useState<DirectoryFilterState>({
    type: initialType,
    category: "all",
    industry: "all",
    query: "",
  });

  const counts = useMemo(() => countByType(), []);

  const visible = useMemo(() => {
    const allowed = new Set(entries.map((e) => e.slug));
    return filterEntries({
      type: filters.type,
      category: filters.category,
      industry: filters.industry,
      query: filters.query,
    }).filter((e) => allowed.has(e.slug));
  }, [entries, filters]);

  const skills = useMemo(
    () => visible.filter((e) => e.type === "skill"),
    [visible]
  );
  const agents = useMemo(
    () => visible.filter((e) => e.type === "agent"),
    [visible]
  );
  const systems = useMemo(
    () => visible.filter((e) => e.type === "system"),
    [visible]
  );

  const showSkills = filters.type === "all" || filters.type === "skill";
  const showAgents = filters.type === "all" || filters.type === "agent";
  const showSystems = filters.type === "all" || filters.type === "system";
  const [pendingSystemsScroll, setPendingSystemsScroll] = useState(false);

  useEffect(() => {
    if (!pendingSystemsScroll || !showSystems) return;
    const timer = window.setTimeout(() => {
      document
        .getElementById("directory-systems")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingSystemsScroll(false);
    }, 50);
    return () => window.clearTimeout(timer);
  }, [pendingSystemsScroll, showSystems, systems.length]);

  return (
    <div className="space-y-12">
      <DirectoryFilters
        value={filters}
        onChange={setFilters}
        counts={counts}
        resultCount={visible.length}
      />

      <DirectoriesConversionStrip
        onBrowseSystems={() => {
          setFilters((prev) => ({ ...prev, type: "system" }));
          setPendingSystemsScroll(true);
        }}
      />

      {visible.length === 0 ? (
        <div className="border border-hairline bg-signature-cream/40 px-8 py-16 text-center">
          <p className="text-label-md text-body">
            No matches. Try another type, category, or industry.
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {showSystems && (
            <EntrySection
              key={`systems-${filters.category}-${filters.industry}-${filters.query}`}
              kind="system"
              title="Systems"
              description="Small architectures that combine skills and agents for Sales, Marketing, Growth, Design, Engineering, Ops, and Product."
              entries={systems}
              emptyLabel="No systems match these filters."
            />
          )}
          {showSkills && (
            <EntrySection
              key={`skills-${filters.category}-${filters.industry}-${filters.query}`}
              kind="skill"
              title="Skills"
              description="Focused playbooks Claude loads on demand — install once, reuse on every matching task."
              entries={skills}
              emptyLabel="No skills match these filters."
            />
          )}
          {showAgents && (
            <EntrySection
              key={`agents-${filters.category}-${filters.industry}-${filters.query}`}
              kind="agent"
              title="Agents"
              description="Multi-step workers that plan, review, or orchestrate work across tools and personas."
              entries={agents}
              emptyLabel="No agents match these filters."
            />
          )}
        </div>
      )}
    </div>
  );
}

function EntrySection({
  kind,
  title,
  description,
  entries,
  emptyLabel,
}: {
  kind: EntryType;
  title: string;
  description: string;
  entries: DirectoryEntry[];
  emptyLabel: string;
}) {
  const styles = TYPE_STYLES[kind];
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const page = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [entries]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (observed) => {
        if (observed.some((entry) => entry.isIntersecting)) {
          setVisibleCount((count) =>
            Math.min(count + PAGE_SIZE, entries.length)
          );
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, entries.length]);

  return (
    <section
      id={kind === "system" ? "directory-systems" : undefined}
      className={kind === "system" ? "scroll-mt-28" : undefined}
    >
      <div
        className={`rounded-md border px-5 py-5 md:px-7 md:py-6 ${styles.sectionBorder}`}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-caption uppercase tracking-[0.1em] text-muted">
              {styles.eyebrow}
            </p>
            <h2 className="text-display-md text-ink mt-2">{title}</h2>
            <p className="text-body-md text-body mt-2 max-w-2xl leading-[1.5]">
              {description}
            </p>
          </div>
          <span
            className={`inline-flex min-h-9 items-center rounded-sm px-3 text-caption uppercase tracking-[0.08em] ${styles.badge}`}
          >
            {entries.length} {title.toLowerCase()}
          </span>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="mt-6 text-body-md text-muted">{emptyLabel}</p>
      ) : (
        <>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.map((entry) => (
              <li key={entry.slug} className="h-full">
                <DirectoryCard entry={entry} />
              </li>
            ))}
          </ul>

          <div ref={sentinelRef} className="h-10" aria-hidden />

          <p className="mt-2 text-center text-caption text-muted">
            Showing {page.length} of {entries.length} {title.toLowerCase()}
            {hasMore ? " · Keep scrolling" : " · All loaded"}
          </p>
        </>
      )}
    </section>
  );
}

function DirectoryCard({ entry }: { entry: DirectoryEntry }) {
  const styles = TYPE_STYLES[entry.type];
  const label =
    entry.type === "skill"
      ? "Skill"
      : entry.type === "agent"
        ? "Agent"
        : "System";

  return (
    <Link
      href={`/directories/${entry.slug}`}
      className="group flex h-full flex-col rounded-md border border-hairline bg-canvas p-5 transition-colors hover:border-border-strong hover:bg-surface-soft focus-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex min-h-7 items-center rounded-sm px-2.5 text-caption uppercase tracking-[0.08em] ${styles.chip}`}
        >
          {label}
        </span>
        <span className="text-caption text-link opacity-0 transition-opacity group-hover:opacity-100">
          View →
        </span>
      </div>

      <h3 className="text-title-sm text-ink mt-4 line-clamp-2 transition-colors group-hover:text-link">
        {entry.name}
      </h3>

      <p className="mt-3 flex-1 text-body-md leading-[1.55] text-body line-clamp-4">
        {entry.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-hairline pt-4">
        {entry.categories.slice(0, 2).map((c) => (
          <span
            key={c}
            className="rounded-sm bg-signature-cream px-2 py-1 text-caption text-ink"
          >
            {CATEGORY_LABELS[c]}
          </span>
        ))}
        {entry.industries.slice(0, 1).map((i) => (
          <span
            key={i}
            className="rounded-sm border border-hairline px-2 py-1 text-caption text-muted"
          >
            {INDUSTRY_LABELS[i]}
          </span>
        ))}
        {entry.type === "system" && entry.skillSlugs?.length ? (
          <span className="rounded-sm border border-signature-mustard/50 px-2 py-1 text-caption text-ink">
            {entry.skillSlugs.length} skills
          </span>
        ) : null}
      </div>
    </Link>
  );
}
