"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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

type Props = {
  entries: DirectoryEntry[];
  initialType?: EntryType | "all";
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

  const skills = visible.filter((e) => e.type === "skill");
  const agents = visible.filter((e) => e.type === "agent");
  const showSkills = filters.type === "all" || filters.type === "skill";
  const showAgents = filters.type === "all" || filters.type === "agent";

  return (
    <div className="space-y-12">
      <DirectoryFilters
        value={filters}
        onChange={setFilters}
        counts={counts}
        resultCount={visible.length}
      />

      {visible.length === 0 ? (
        <div className="border border-hairline bg-signature-cream/40 px-8 py-16 text-center">
          <p className="text-label-md text-body">
            No matches. Try another type, category, or industry.
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {showSkills && (
            <EntrySection
              kind="skill"
              title="Skills"
              description="Focused playbooks Claude loads on demand — install once, reuse on every matching task."
              entries={skills}
              emptyLabel="No skills match these filters."
            />
          )}
          {showAgents && (
            <EntrySection
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
  const isSkill = kind === "skill";

  return (
    <section>
      <div
        className={`rounded-md border px-5 py-5 md:px-7 md:py-6 ${
          isSkill
            ? "border-signature-mint/80 bg-signature-mint/25"
            : "border-signature-peach/90 bg-signature-peach/30"
        }`}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-caption uppercase tracking-[0.1em] text-muted">
              {isSkill ? "Reusable capability packs" : "Orchestrated workflows"}
            </p>
            <h2 className="text-display-md text-ink mt-2">{title}</h2>
            <p className="text-body-md text-body mt-2 max-w-2xl leading-[1.5]">
              {description}
            </p>
          </div>
          <span
            className={`inline-flex min-h-9 items-center rounded-sm px-3 text-caption uppercase tracking-[0.08em] text-on-dark ${
              isSkill ? "bg-signature-forest" : "bg-signature-coral"
            }`}
          >
            {entries.length} {title.toLowerCase()}
          </span>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="mt-6 text-body-md text-muted">{emptyLabel}</p>
      ) : (
        <ul className="mt-2 divide-y divide-hairline border-b border-hairline">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/directories/${entry.slug}`}
                className="group grid gap-4 py-8 md:grid-cols-[112px_1fr_auto] md:items-start focus-ring rounded-sm"
              >
                <div className="pt-1">
                  <span
                    className={`inline-flex min-h-8 items-center rounded-sm px-2.5 text-caption uppercase tracking-[0.08em] ${
                      isSkill
                        ? "bg-signature-forest/10 text-signature-forest"
                        : "bg-signature-coral/10 text-signature-coral"
                    }`}
                  >
                    {isSkill ? "Skill" : "Agent"}
                  </span>
                </div>
                <div>
                  <h3 className="text-title-sm text-ink group-hover:text-link transition-colors">
                    {entry.name}
                  </h3>
                  <p className="text-body-md text-body mt-2 max-w-3xl leading-[1.55]">
                    {entry.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-sm border border-hairline bg-surface-soft px-2 py-1 text-caption text-muted"
                      >
                        {CATEGORY_LABELS[c]}
                      </span>
                    ))}
                    {entry.industries.slice(0, 3).map((i) => (
                      <span
                        key={i}
                        className="rounded-sm border border-hairline px-2 py-1 text-caption text-muted"
                      >
                        {INDUSTRY_LABELS[i]}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-body-md text-link md:pt-1 whitespace-nowrap">
                  View details →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
