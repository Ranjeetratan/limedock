import type { Category, EntryType, Industry } from "./types";

export const ENTRY_TYPE_LABELS: Record<EntryType | "all", string> = {
  all: "All",
  skill: "Skills",
  agent: "Agents",
  system: "Systems",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  sales: "Sales",
  marketing: "Marketing",
  design: "Design",
  growth: "Growth",
  operations: "Operations",
  engineering: "Engineering",
  product: "Product",
  other: "Other",
};

export const INDUSTRY_LABELS: Record<Industry, string> = {
  saas: "SaaS",
  ecommerce: "E-commerce",
  fintech: "Fintech",
  healthtech: "Healthtech",
  agency: "Agency",
  education: "Education",
  marketplace: "Marketplace",
  "real-estate": "Real Estate",
  other: "Other",
};

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];
export const INDUSTRIES = Object.keys(INDUSTRY_LABELS) as Industry[];
