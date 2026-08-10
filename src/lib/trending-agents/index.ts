import { TRENDING_AGENTS } from "./data";
import type {
  AgentAudience,
  AgentCategory,
  AgentDifficulty,
  AgentIndustry,
  TrendingAgent,
  TrendingFilters,
  TrendingSort,
} from "./types";

export type {
  AgentAudience,
  AgentCategory,
  AgentDifficulty,
  AgentIndustry,
  AutomationIdea,
  RepoStats,
  TrendingAgent,
  TrendingFilters,
  TrendingSort,
} from "./types";

export {
  AUDIENCE_LABELS,
  AUDIENCES,
  CATEGORIES,
  CATEGORY_BLURBS,
  CATEGORY_LABELS,
  DIFFICULTIES,
  DIFFICULTY_BLURBS,
  DIFFICULTY_LABELS,
  INDUSTRIES,
  INDUSTRY_LABELS,
} from "./taxonomy";

export { TRENDING_AGENTS } from "./data";

const SLUG_INDEX = new Map(
  TRENDING_AGENTS.map((agent) => [agent.slug, agent] as const)
);

export function getAllAgents(): TrendingAgent[] {
  return [...TRENDING_AGENTS];
}

export function getAgentBySlug(slug: string): TrendingAgent | undefined {
  return SLUG_INDEX.get(slug);
}

export function getAgentSlugs(): string[] {
  return TRENDING_AGENTS.map((agent) => agent.slug);
}

export function getFeaturedAgents(limit = 6): TrendingAgent[] {
  return getAllAgents()
    .filter((agent) => agent.featured)
    .sort((a, b) => b.stats.stars - a.stats.stars)
    .slice(0, limit);
}

/**
 * Everything the free-text search should match against. Includes automation
 * idea text so a search for "cold outreach" surfaces repos whose ideas mention
 * it even when the repo description never does.
 */
function haystack(agent: TrendingAgent): string {
  return [
    agent.name,
    agent.slug,
    agent.repo,
    agent.owner,
    agent.tagline,
    agent.whatItDoes,
    ...agent.whoItIsFor,
    ...agent.useCases,
    ...agent.whenToUse,
    ...agent.whenToAvoid,
    ...agent.automationIdeas.flatMap((idea) => [idea.title, idea.detail]),
    ...agent.categories,
    ...agent.audiences,
    ...agent.industries,
    ...agent.topics,
    ...agent.seoKeywords,
    agent.stats.language ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

function sortAgents(agents: TrendingAgent[], sort: TrendingSort) {
  const sorted = [...agents];
  switch (sort) {
    case "stars":
      return sorted.sort((a, b) => b.stats.stars - a.stats.stars);
    case "recent":
      return sorted.sort((a, b) =>
        b.stats.pushedAt.localeCompare(a.stats.pushedAt)
      );
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "trending":
    default:
      // Newest weekly cohort first, then by stars inside the cohort.
      return sorted.sort(
        (a, b) =>
          b.trendingWeek.localeCompare(a.trendingWeek) ||
          b.stats.stars - a.stats.stars
      );
  }
}

export function filterAgents(filters: TrendingFilters = {}): TrendingAgent[] {
  const category = filters.category ?? "all";
  const audience = filters.audience ?? "all";
  const industry = filters.industry ?? "all";
  const difficulty = filters.difficulty ?? "all";
  const query = (filters.query ?? "").trim().toLowerCase();

  const matched = getAllAgents().filter((agent) => {
    if (category !== "all" && !agent.categories.includes(category)) return false;
    if (audience !== "all" && !agent.audiences.includes(audience)) return false;
    if (
      industry !== "all" &&
      !agent.industries.includes(industry) &&
      !agent.industries.includes("any")
    ) {
      return false;
    }
    if (difficulty !== "all" && agent.difficulty !== difficulty) return false;
    if (!query) return true;
    return haystack(agent).includes(query);
  });

  return sortAgents(matched, filters.sort ?? "trending");
}

export function countByCategory(): Record<AgentCategory | "all", number> {
  const counts = { all: TRENDING_AGENTS.length } as Record<
    AgentCategory | "all",
    number
  >;
  for (const agent of TRENDING_AGENTS) {
    for (const category of agent.categories) {
      counts[category] = (counts[category] ?? 0) + 1;
    }
  }
  return counts;
}

export function countByAudience(): Record<AgentAudience | "all", number> {
  const counts = { all: TRENDING_AGENTS.length } as Record<
    AgentAudience | "all",
    number
  >;
  for (const agent of TRENDING_AGENTS) {
    for (const audience of agent.audiences) {
      counts[audience] = (counts[audience] ?? 0) + 1;
    }
  }
  return counts;
}

export function countByDifficulty(): Record<AgentDifficulty | "all", number> {
  const counts = { all: TRENDING_AGENTS.length } as Record<
    AgentDifficulty | "all",
    number
  >;
  for (const agent of TRENDING_AGENTS) {
    counts[agent.difficulty] = (counts[agent.difficulty] ?? 0) + 1;
  }
  return counts;
}

/** Distinct trending weeks, newest first. */
export function getTrendingWeeks(): string[] {
  return [...new Set(TRENDING_AGENTS.map((a) => a.trendingWeek))].sort((a, b) =>
    b.localeCompare(a)
  );
}

export function getAgentsForWeek(week: string): TrendingAgent[] {
  return sortAgents(
    getAllAgents().filter((agent) => agent.trendingWeek === week),
    "stars"
  );
}

/**
 * Related entries for cross-linking. Prefers explicit `relatedSlugs`, then
 * fills the remainder with the closest category/audience matches so every
 * detail page has somewhere to send the reader next.
 */
export function getRelatedAgents(
  agent: TrendingAgent,
  limit = 4
): TrendingAgent[] {
  const explicit = agent.relatedSlugs
    .map((slug) => SLUG_INDEX.get(slug))
    .filter((entry): entry is TrendingAgent => Boolean(entry));

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const taken = new Set([agent.slug, ...explicit.map((e) => e.slug)]);
  const scored = getAllAgents()
    .filter((candidate) => !taken.has(candidate.slug))
    .map((candidate) => {
      const sharedCategories = candidate.categories.filter((c) =>
        agent.categories.includes(c)
      ).length;
      const sharedAudiences = candidate.audiences.filter((a) =>
        agent.audiences.includes(a)
      ).length;
      return { candidate, score: sharedCategories * 2 + sharedAudiences };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || b.candidate.stats.stars - a.candidate.stats.stars
    )
    .map((entry) => entry.candidate);

  return [...explicit, ...scored].slice(0, limit);
}

/** Total stars across the catalog — used for the index stat strip. */
export function catalogStats() {
  const totalStars = TRENDING_AGENTS.reduce((sum, a) => sum + a.stats.stars, 0);
  const languages = new Set(
    TRENDING_AGENTS.map((a) => a.stats.language).filter(Boolean)
  );
  return {
    repos: TRENDING_AGENTS.length,
    totalStars,
    languages: languages.size,
    weeks: getTrendingWeeks().length,
  };
}

/** Formats 228045 as "228k" for card chrome. */
export function formatStars(stars: number): string {
  if (stars >= 1000) {
    const k = stars / 1000;
    return `${k >= 100 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(stars);
}
