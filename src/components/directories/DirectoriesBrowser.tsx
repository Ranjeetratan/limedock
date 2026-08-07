"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  ENTRY_TYPE_LABELS,
  INDUSTRY_LABELS,
  countByType,
  filterEntries,
  type DirectoryEntry,
} from "@/lib/directories";
import DirectoryFilters, {
  type DirectoryFilterState,
} from "./DirectoryFilters";

type Props = {
  entries: DirectoryEntry[];
};

export default function DirectoriesBrowser({ entries }: Props) {
  const [filters, setFilters] = useState<DirectoryFilterState>({
    type: "all",
    category: "all",
    industry: "all",
    query: "",
  });

  const counts = useMemo(() => countByType(), []);

  const results = useMemo(
    () =>
      filterEntries({
        type: filters.type,
        category: filters.category,
        industry: filters.industry,
        query: filters.query,
      }),
    [filters]
  );

  // Keep client filter aligned with server-provided entries for hydration safety
  const visible = useMemo(() => {
    const allowed = new Set(entries.map((e) => e.slug));
    return results.filter((e) => allowed.has(e.slug));
  }, [entries, results]);

  return (
    <div className="space-y-12">
      <DirectoryFilters
        value={filters}
        onChange={setFilters}
        counts={counts}
        resultCount={visible.length}
      />

      {visible.length === 0 ? (
        <div className="border border-hairline bg-surface-soft px-8 py-16 text-center">
          <p className="text-label-md text-body">
            No matches. Try another type, category, or industry.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-hairline border-y border-hairline">
          {visible.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/directories/${entry.slug}`}
                className="group grid gap-4 py-7 md:grid-cols-[140px_1fr_auto] md:items-start focus-ring rounded-sm"
              >
                <div className="text-caption text-muted uppercase tracking-[0.08em] pt-1">
                  {ENTRY_TYPE_LABELS[entry.type]}
                </div>
                <div>
                  <h2 className="text-title-sm text-ink group-hover:text-link transition-colors">
                    {entry.name}
                  </h2>
                  <p className="text-body-md text-body mt-2 max-w-2xl leading-[1.55]">
                    {entry.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
                    <span>
                      {entry.categories
                        .map((c) => CATEGORY_LABELS[c])
                        .join(" · ")}
                    </span>
                    <span>
                      {entry.industries
                        .map((i) => INDUSTRY_LABELS[i])
                        .join(" · ")}
                    </span>
                  </div>
                </div>
                <span className="text-body-md text-link md:pt-1">View</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
