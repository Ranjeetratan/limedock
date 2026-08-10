"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AUDIENCE_LABELS,
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  formatStars,
  type AgentAudience,
  type AgentCategory,
  type AgentDifficulty,
  type TrendingAgent,
  type TrendingSort,
} from "@/lib/trending-agents";

type Props = {
  agents: TrendingAgent[];
  initialCategory?: AgentCategory | "all";
};

const SORT_OPTIONS: { value: TrendingSort; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "stars", label: "Most stars" },
  { value: "recent", label: "Recently updated" },
  { value: "name", label: "A–Z" },
];

/**
 * Client-side browser for the trending catalog. Filtering runs in the browser
 * against the full list — the catalog is small enough that shipping it beats
 * a round-trip per keystroke.
 */
export default function TrendingBrowser({
  agents,
  initialCategory = "all",
}: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AgentCategory | "all">(
    initialCategory
  );
  const [audience, setAudience] = useState<AgentAudience | "all">("all");
  const [difficulty, setDifficulty] = useState<AgentDifficulty | "all">("all");
  const [sort, setSort] = useState<TrendingSort>("trending");

  // Only offer facets that actually match something in the catalog.
  const availableCategories = useMemo(() => {
    const set = new Set<AgentCategory>();
    agents.forEach((a) => a.categories.forEach((c) => set.add(c)));
    return [...set].sort((a, b) =>
      CATEGORY_LABELS[a].localeCompare(CATEGORY_LABELS[b])
    );
  }, [agents]);

  const availableAudiences = useMemo(() => {
    const set = new Set<AgentAudience>();
    agents.forEach((a) => a.audiences.forEach((x) => set.add(x)));
    return [...set].sort((a, b) =>
      AUDIENCE_LABELS[a].localeCompare(AUDIENCE_LABELS[b])
    );
  }, [agents]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matched = agents.filter((agent) => {
      if (category !== "all" && !agent.categories.includes(category))
        return false;
      if (audience !== "all" && !agent.audiences.includes(audience))
        return false;
      if (difficulty !== "all" && agent.difficulty !== difficulty) return false;
      if (!q) return true;
      return [
        agent.name,
        agent.repo,
        agent.tagline,
        agent.whatItDoes,
        ...agent.topics,
        ...agent.seoKeywords,
        ...agent.automationIdeas.map((i) => `${i.title} ${i.detail}`),
        agent.stats.language ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    const sorted = [...matched];
    switch (sort) {
      case "stars":
        return sorted.sort((a, b) => b.stats.stars - a.stats.stars);
      case "recent":
        return sorted.sort((a, b) =>
          b.stats.pushedAt.localeCompare(a.stats.pushedAt)
        );
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted.sort(
          (a, b) =>
            b.trendingWeek.localeCompare(a.trendingWeek) ||
            b.stats.stars - a.stats.stars
        );
    }
  }, [agents, query, category, audience, difficulty, sort]);

  const hasFilters =
    query || category !== "all" || audience !== "all" || difficulty !== "all";

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M20 20l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repos, use cases, or automation ideas…"
            aria-label="Search trending agent repositories"
            className="w-full min-h-12 rounded-sm border border-hairline bg-canvas pl-11 pr-4 text-body-md text-ink placeholder:text-muted focus-ring"
          />
        </div>
        <label className="sr-only" htmlFor="trending-sort">
          Sort results
        </label>
        <select
          id="trending-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as TrendingSort)}
          className="min-h-12 rounded-sm border border-hairline bg-canvas px-4 text-body-md text-ink focus-ring md:w-52"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category facets */}
      <div className="mt-5 flex flex-wrap gap-2">
        <FacetChip
          active={category === "all"}
          onClick={() => setCategory("all")}
          label={`All (${agents.length})`}
        />
        {availableCategories.map((c) => (
          <FacetChip
            key={c}
            active={category === c}
            onClick={() => setCategory(category === c ? "all" : c)}
            label={CATEGORY_LABELS[c]}
          />
        ))}
      </div>

      {/* Audience + difficulty */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-caption uppercase tracking-[0.12em] text-muted mr-1">
          Team
        </span>
        {availableAudiences.map((a) => (
          <FacetChip
            key={a}
            small
            active={audience === a}
            onClick={() => setAudience(audience === a ? "all" : a)}
            label={AUDIENCE_LABELS[a]}
          />
        ))}
        <span className="text-caption uppercase tracking-[0.12em] text-muted ml-3 mr-1">
          Lift
        </span>
        {(
          ["plug-in", "some-wiring", "engineering-project"] as AgentDifficulty[]
        ).map((d) => (
          <FacetChip
            key={d}
            small
            active={difficulty === d}
            onClick={() => setDifficulty(difficulty === d ? "all" : d)}
            label={DIFFICULTY_LABELS[d]}
          />
        ))}
      </div>

      {/* Result count */}
      <div className="mt-6 flex items-center justify-between border-t border-hairline pt-5">
        <p className="text-body-md text-muted">
          {results.length} {results.length === 1 ? "repository" : "repositories"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setAudience("all");
              setDifficulty("all");
            }}
            className="text-body-md text-link focus-ring rounded-sm"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="mt-10 rounded-md border border-hairline bg-surface-soft p-10 text-center">
          <p className="text-title-sm text-ink">Nothing matched that.</p>
          <p className="text-body-md text-body mt-2">
            Try a broader term, or clear the filters to see the whole catalog.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((agent) => (
            <li key={agent.slug}>
              <AgentCard agent={agent} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FacetChip({
  label,
  active,
  onClick,
  small = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center rounded-sm border transition-colors focus-ring ${
        small ? "min-h-8 px-2.5 text-caption" : "min-h-10 px-3.5 text-body-md"
      } ${
        active
          ? "border-ink bg-ink text-canvas"
          : "border-hairline bg-canvas text-body hover:border-border-strong hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function AgentCard({ agent }: { agent: TrendingAgent }) {
  return (
    <Link
      href={`/trending-agents/${agent.slug}`}
      className="group flex h-full flex-col rounded-md border border-hairline bg-canvas p-5 transition-all hover:border-border-strong hover:bg-surface-soft focus-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-caption uppercase tracking-[0.08em] text-muted">
          {agent.owner}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-caption text-muted tabular-nums">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          {formatStars(agent.stats.stars)}
        </span>
      </div>

      <h3 className="mt-2 text-title-sm text-ink group-hover:underline decoration-1 underline-offset-4">
        {agent.name}
      </h3>

      <p className="mt-2 flex-1 text-body-md text-body leading-[1.5] line-clamp-3">
        {agent.tagline}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="rounded-sm bg-signature-cream px-2 py-1 text-caption text-ink">
          {CATEGORY_LABELS[agent.categories[0]]}
        </span>
        {agent.stats.language && (
          <span className="rounded-sm border border-hairline px-2 py-1 text-caption text-muted">
            {agent.stats.language}
          </span>
        )}
        <span className="rounded-sm border border-hairline px-2 py-1 text-caption text-muted">
          {DIFFICULTY_LABELS[agent.difficulty]}
        </span>
      </div>
    </Link>
  );
}
