"use client";

import {
  CATEGORIES,
  CATEGORY_LABELS,
  ENTRY_TYPE_LABELS,
  INDUSTRIES,
  INDUSTRY_LABELS,
  type Category,
  type EntryType,
  type Industry,
} from "@/lib/directories";

export type DirectoryFilterState = {
  type: EntryType | "all";
  category: Category | "all";
  industry: Industry | "all";
  query: string;
};

type Props = {
  value: DirectoryFilterState;
  onChange: (next: DirectoryFilterState) => void;
  counts: Record<EntryType | "all", number>;
  resultCount: number;
};

const TYPE_ORDER: Array<EntryType | "all"> = ["all", "skill", "agent"];

export default function DirectoryFilters({
  value,
  onChange,
  counts,
  resultCount,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {TYPE_ORDER.map((type) => {
          const active = value.type === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange({ ...value, type })}
              className={`min-h-10 px-4 text-body-md focus-ring rounded-sm border transition-colors ${
                active
                  ? "border-ink bg-ink text-on-primary"
                  : "border-hairline bg-canvas text-ink hover:border-border-strong"
              }`}
            >
              {ENTRY_TYPE_LABELS[type]}
              <span className={`ml-2 ${active ? "text-white/70" : "text-muted"}`}>
                {counts[type]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-end">
        <label className="block">
          <span className="text-caption text-muted uppercase tracking-[0.08em]">
            Search
          </span>
          <input
            type="search"
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            placeholder="Search skills and agents"
            className="mt-2 w-full min-h-12 rounded-md border border-hairline bg-canvas px-4 text-body-md text-ink outline-none focus:border-ink"
          />
        </label>

        <label className="block">
          <span className="text-caption text-muted uppercase tracking-[0.08em]">
            Industry
          </span>
          <select
            value={value.industry}
            onChange={(e) =>
              onChange({
                ...value,
                industry: e.target.value as Industry | "all",
              })
            }
            className="mt-2 w-full min-h-12 rounded-md border border-hairline bg-canvas px-4 text-body-md text-ink outline-none focus:border-ink"
          >
            <option value="all">All industries</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {INDUSTRY_LABELS[industry]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <span className="text-caption text-muted uppercase tracking-[0.08em]">
            Category
          </span>
          <span className="text-caption text-muted">
            {resultCount} result{resultCount === 1 ? "" : "s"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...value, category: "all" })}
            className={`min-h-9 px-3 text-body-md focus-ring rounded-sm border transition-colors ${
              value.category === "all"
                ? "border-ink bg-surface-soft text-ink"
                : "border-hairline text-muted hover:text-ink hover:border-border-strong"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => {
            const active = value.category === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onChange({ ...value, category })}
                className={`min-h-9 px-3 text-body-md focus-ring rounded-sm border transition-colors ${
                  active
                    ? "border-ink bg-surface-soft text-ink"
                    : "border-hairline text-muted hover:text-ink hover:border-border-strong"
                }`}
              >
                {CATEGORY_LABELS[category]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
