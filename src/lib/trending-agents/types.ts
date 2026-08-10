/**
 * Trending Agents directory — a separate catalog from `src/lib/directories`.
 *
 * `/directories` catalogs LimeDock's own skills/agents/systems. This catalog
 * covers third-party GitHub repositories we track weekly: what they do, who
 * they're for, and the automations a SaaS team can actually build with them.
 */

/** What kind of thing the repo is, functionally. */
export type AgentCategory =
  | "agent-framework"
  | "agent-skills"
  | "coding-agent"
  | "workflow-automation"
  | "memory-context"
  | "rag-knowledge"
  | "browser-data"
  | "llm-gateway"
  | "observability-evals"
  | "vector-search"
  | "vertical-agent"
  | "learning";

/** Who gets the most value out of it. */
export type AgentAudience =
  | "founder"
  | "marketing"
  | "sales"
  | "operations"
  | "engineering"
  | "data"
  | "support"
  | "finance";

/** Industries where we've seen this pattern land. */
export type AgentIndustry =
  | "saas"
  | "ecommerce"
  | "fintech"
  | "healthtech"
  | "agency"
  | "real-estate"
  | "recruiting"
  | "marketplace"
  | "any";

/** How much engineering lift before it earns its keep. */
export type AgentDifficulty = "plug-in" | "some-wiring" | "engineering-project";

/** A concrete automation a team could build with this repo. */
export type AutomationIdea = {
  /** Short imperative title, e.g. "Nightly competitor pricing digest". */
  title: string;
  /** 1–2 sentences: the trigger, the work, and where the output lands. */
  detail: string;
  /** Which team feels the benefit. */
  audience: AgentAudience;
};

/** Live repo stats, refreshed from the GitHub API. */
export type RepoStats = {
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  license: string | null;
  /** ISO date the repo was created. */
  createdAt: string;
  /** ISO date of the last push. */
  pushedAt: string;
};

export type TrendingAgent = {
  /** URL segment, e.g. "reverse-skill". Unique across the catalog. */
  slug: string;
  /** Display name, usually the repo name. */
  name: string;
  /** "owner/repo" exactly as GitHub canonicalises it. */
  repo: string;
  owner: string;
  /** Canonical GitHub URL. */
  url: string;
  /** Project site, if the repo declares one. */
  homepage: string | null;

  /** One line, plain English, no marketing voice. */
  tagline: string;
  /**
   * What it actually does, in language a non-engineer founder can follow.
   * 2–4 short paragraphs.
   */
  whatItDoes: string;
  /** Who should care, phrased as roles and situations. */
  whoItIsFor: string[];
  /** Real situations where reaching for this is the right call. */
  useCases: string[];
  /** Exactly the moments it pays off. */
  whenToUse: string[];
  /** Honest limits — when this is the wrong tool. */
  whenToAvoid: string[];
  /** Ten concrete automations, each tied to a business workflow. */
  automationIdeas: AutomationIdea[];

  categories: AgentCategory[];
  audiences: AgentAudience[];
  industries: AgentIndustry[];
  difficulty: AgentDifficulty;

  stats: RepoStats;
  topics: string[];

  /** Long-tail search phrases this page targets. */
  seoKeywords: string[];
  /** Slugs of related entries in this catalog. */
  relatedSlugs: string[];

  /**
   * ISO date (YYYY-MM-DD) of the Monday whose weekly list this entered on.
   * Drives the "Trending this week" grouping.
   */
  trendingWeek: string;
  /** Editor's pick — surfaced above the fold on the index. */
  featured?: boolean;
};

export type TrendingFilters = {
  category?: AgentCategory | "all";
  audience?: AgentAudience | "all";
  industry?: AgentIndustry | "all";
  difficulty?: AgentDifficulty | "all";
  query?: string;
  /** Sort order for the result set. */
  sort?: TrendingSort;
};

export type TrendingSort = "stars" | "recent" | "name" | "trending";
