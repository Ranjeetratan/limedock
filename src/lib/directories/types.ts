export type EntryType = "skill" | "agent";

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
  | "other";

export type DirectoryEntry = {
  slug: string;
  name: string;
  type: EntryType;
  summary: string;
  categories: Category[];
  industries: Industry[];
  link: string;
  installation: string;
  howToUse: string;
  useCases: string[];
  sources: string[];
};

export type DirectoryFilters = {
  type?: EntryType | "all";
  category?: Category | "all";
  industry?: Industry | "all";
  query?: string;
};
