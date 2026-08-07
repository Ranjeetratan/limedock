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

export function getAllEntries(): DirectoryEntry[] {
  return [...DIRECTORY_ENTRIES].sort((a, b) => a.name.localeCompare(b.name));
}

export function getEntryBySlug(slug: string): DirectoryEntry | undefined {
  return DIRECTORY_ENTRIES.find((entry) => entry.slug === slug);
}

export function getEntrySlugs(): string[] {
  return DIRECTORY_ENTRIES.map((entry) => entry.slug);
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

    const haystack = [
      entry.name,
      entry.summary,
      entry.howToUse,
      ...entry.useCases,
      ...entry.categories,
      ...entry.industries,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function countByType(): Record<EntryType | "all", number> {
  const skills = DIRECTORY_ENTRIES.filter((e) => e.type === "skill").length;
  const agents = DIRECTORY_ENTRIES.filter((e) => e.type === "agent").length;
  return { all: DIRECTORY_ENTRIES.length, skill: skills, agent: agents };
}
