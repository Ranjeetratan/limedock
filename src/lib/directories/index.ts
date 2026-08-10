import { DIRECTORY_ENTRIES } from "./data";
import type {
  Category,
  DirectoryEntry,
  DirectoryFilters,
  EntryType,
  Industry,
} from "./types";

export type {
  Category,
  DirectoryEntry,
  DirectoryFilters,
  EntryType,
  Industry,
} from "./types";

export {
  CATEGORIES,
  CATEGORY_LABELS,
  ENTRY_TYPE_LABELS,
  INDUSTRIES,
  INDUSTRY_LABELS,
} from "./taxonomy";

const SLUG_INDEX = new Map(
  DIRECTORY_ENTRIES.map((entry) => [entry.slug, entry] as const)
);

function resolveSkillSlugs(slugs: string[] | undefined): DirectoryEntry[] {
  if (!slugs?.length) return [];
  return slugs
    .map((slug) => SLUG_INDEX.get(slug))
    .filter((entry): entry is DirectoryEntry => Boolean(entry));
}

/** Drop skillSlugs that are not present in the catalog. */
export function validatedSkillSlugs(slugs: string[] | undefined): string[] {
  if (!slugs?.length) return [];
  return slugs.filter((slug) => SLUG_INDEX.has(slug));
}

export function getAllEntries(): DirectoryEntry[] {
  return [...DIRECTORY_ENTRIES].sort((a, b) => a.name.localeCompare(b.name));
}

export function getEntryBySlug(slug: string): DirectoryEntry | undefined {
  return SLUG_INDEX.get(slug);
}

export function getEntrySlugs(): string[] {
  return DIRECTORY_ENTRIES.map((entry) => entry.slug);
}

function entrySearchHaystack(entry: DirectoryEntry): string {
  const relatedNames =
    entry.type === "system"
      ? resolveSkillSlugs(entry.skillSlugs).flatMap((related) => [
          related.name,
          related.slug,
          related.summary,
        ])
      : [];

  return [
    entry.name,
    entry.slug,
    entry.summary,
    entry.overview,
    entry.howToUse,
    entry.installation,
    entry.githubRepo,
    entry.resourceUrl,
    ...entry.useCases,
    ...entry.examplePrompts,
    ...entry.tips,
    ...entry.categories,
    ...entry.industries,
    ...(entry.skillSlugs ?? []),
    ...relatedNames,
  ]
    .join(" ")
    .toLowerCase();
}

export function filterEntries(filters: DirectoryFilters = {}): DirectoryEntry[] {
  const type = filters.type ?? "all";
  const category = filters.category ?? "all";
  const industry = filters.industry ?? "all";
  const query = (filters.query ?? "").trim().toLowerCase();

  return getAllEntries().filter((entry) => {
    if (type !== "all" && entry.type !== type) return false;
    if (category !== "all" && !entry.categories.includes(category)) return false;
    if (industry !== "all" && !entry.industries.includes(industry)) return false;
    if (!query) return true;
    return entrySearchHaystack(entry).includes(query);
  });
}

export function countByType(): Record<EntryType | "all", number> {
  const skills = DIRECTORY_ENTRIES.filter((e) => e.type === "skill").length;
  const agents = DIRECTORY_ENTRIES.filter((e) => e.type === "agent").length;
  const systems = DIRECTORY_ENTRIES.filter((e) => e.type === "system").length;
  return {
    all: DIRECTORY_ENTRIES.length,
    skill: skills,
    agent: agents,
    system: systems,
  };
}

/**
 * Related catalog entries for cross-linking on detail pages.
 * - Systems → linked skills/agents from skillSlugs
 * - Skills/agents → systems that reference them
 */
export function getRelatedEntries(entry: DirectoryEntry): DirectoryEntry[] {
  if (entry.type === "system") {
    return resolveSkillSlugs(validatedSkillSlugs(entry.skillSlugs));
  }

  return getAllEntries().filter(
    (candidate) =>
      candidate.type === "system" &&
      (candidate.skillSlugs ?? []).includes(entry.slug)
  );
}
