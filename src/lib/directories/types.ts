export type EntryType = "skill" | "agent" | "system";

export type Category =
  | "sales"
  | "marketing"
  | "design"
  | "growth"
  | "operations"
  | "engineering"
  | "product"
  | "other";

export type Industry =
  | "saas"
  | "ecommerce"
  | "fintech"
  | "healthtech"
  | "agency"
  | "education"
  | "marketplace"
  | "real-estate"
  | "other";

export type DirectoryEntry = {
  slug: string;
  name: string;
  type: EntryType;
  summary: string;
  /** Longer editorial overview shown on the detail page */
  overview: string;
  categories: Category[];
  industries: Industry[];
  link: string;
  installation: string;
  howToUse: string;
  useCases: string[];
  /** Example prompts the user can copy */
  examplePrompts: string[];
  /** What you need before installing */
  prerequisites: string[];
  /** Practical tips / gotchas */
  tips: string[];
  sources: string[];
  /**
   * Related skill/agent slugs already in the catalog.
   * Used by systems to declare installable architecture members.
   * Only slugs that exist in the catalog should be listed.
   */
  skillSlugs?: string[];
};

export type DirectoryFilters = {
  type?: EntryType | "all";
  category?: Category | "all";
  industry?: Industry | "all";
  query?: string;
};
