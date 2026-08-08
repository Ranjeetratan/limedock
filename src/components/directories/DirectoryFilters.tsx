"use client";

import {
  CATEGORIES,
  CATEGORY_LABELS,
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

const TYPE_TABS: Array<{
  id: EntryType | "all";
  label: string;
  hint: string;
  activeClass: string;
}> = [
  {
    id: "all",
    label: "All",
    hint: "Skills + Agents + Systems",
    activeClass: "border-ink bg-ink text-on-primary",
  },
  {
    id: "skill",
    label: "Skills",
    hint: "Reusable playbooks",
    activeClass: "border-signature-forest bg-signature-forest text-on-dark",
  },
  {
    id: "agent",
    label: "Agents",
    hint: "Multi-step workers",
    activeClass: "border-signature-coral bg-signature-coral text-on-dark",
  },
  {
    id: "system",
    label: "Systems",
    hint: "Skill architectures",
    activeClass: "border-signature-mustard bg-signature-mustard text-ink",
  },
];

export default function DirectoryFilters({
  value,
  onChange,
  counts,
  resultCount,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TYPE_TABS.map((tab) => {
          const active = value.type === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange({ ...value, type: tab.id })}
              className={`rounded-md border px-5 py-4 text-left transition-colors focus-ring ${
                active
                  ? tab.activeClass
                  : "border-hairline bg-canvas text-ink hover:border-border-strong hover:bg-surface-soft"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-title-sm">{tab.label}</span>
                <span
                  className={`text-caption tabular-nums ${
                    active
                      ? tab.id === "system"
                        ? "text-ink/70"
                        : "text-white/75"
                      : "text-muted"
                  }`}
                >
                  {counts[tab.id]}
                </span>
              </div>
              <p
                className={`mt-1 text-caption ${
                  active
                    ? tab.id === "system"
                      ? "text-ink/65"
                      : "text-white/70"
                    : "text-muted"
                }`}
              >
                {tab.hint}
              </p>
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
            placeholder="Search by name, use case, system, or category"
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
            {resultCount} showing
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...value, category: "all" })}
            className={`min-h-9 px-3 text-body-md focus-ring rounded-sm border transition-colors ${
              value.category === "all"
                ? "border-ink bg-signature-cream text-ink"
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
                    ? "border-ink bg-signature-cream text-ink"
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
