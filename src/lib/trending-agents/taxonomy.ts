import type {
  AgentAudience,
  AgentCategory,
  AgentDifficulty,
  AgentIndustry,
} from "./types";

export const CATEGORY_LABELS: Record<AgentCategory, string> = {
  "agent-framework": "Agent frameworks",
  "agent-skills": "Agent skills",
  "coding-agent": "Coding agents",
  "workflow-automation": "Workflow automation",
  "memory-context": "Memory & context",
  "rag-knowledge": "RAG & knowledge",
  "browser-data": "Browser & data capture",
  "llm-gateway": "LLM gateways",
  "observability-evals": "Observability & evals",
  "vector-search": "Vector & search",
  "vertical-agent": "Vertical agents",
  learning: "Learning",
};

/** One-line explanation of each category, shown on the index filters. */
export const CATEGORY_BLURBS: Record<AgentCategory, string> = {
  "agent-framework":
    "Scaffolding for building agents that plan, call tools, and run multi-step work.",
  "agent-skills":
    "Reusable instruction packs that make a coding agent better at one specific job.",
  "coding-agent":
    "Terminal and desktop agents that read, write, and ship code for you.",
  "workflow-automation":
    "Visual or code-first platforms for wiring triggers, steps, and integrations.",
  "memory-context":
    "Storage layers that let an agent remember across sessions and teammates.",
  "rag-knowledge":
    "Turn your docs, code, and databases into something an agent can answer from.",
  "browser-data":
    "Drive a real browser or scrape structured data for lead-gen and research.",
  "llm-gateway":
    "One endpoint in front of many model providers — routing, fallback, cost control.",
  "observability-evals":
    "See what your agents did, what it cost, and whether the output was any good.",
  "vector-search":
    "Databases and engines that make semantic retrieval fast at production scale.",
  "vertical-agent":
    "Agents purpose-built for one business function — ads, finance, hiring, content.",
  learning:
    "Courses, curricula, and reference collections for getting your team fluent.",
};

export const AUDIENCE_LABELS: Record<AgentAudience, string> = {
  founder: "Founders",
  marketing: "Marketing",
  sales: "Sales",
  operations: "Operations",
  engineering: "Engineering",
  data: "Data",
  support: "Support",
  finance: "Finance",
};

export const INDUSTRY_LABELS: Record<AgentIndustry, string> = {
  saas: "SaaS",
  ecommerce: "E-commerce",
  fintech: "Fintech",
  healthtech: "Healthtech",
  agency: "Agency",
  "real-estate": "Real estate",
  recruiting: "Recruiting",
  marketplace: "Marketplace",
  any: "Any industry",
};

export const DIFFICULTY_LABELS: Record<AgentDifficulty, string> = {
  "plug-in": "Plug in",
  "some-wiring": "Some wiring",
  "engineering-project": "Engineering project",
};

/** What each difficulty tier actually means in hours of work. */
export const DIFFICULTY_BLURBS: Record<AgentDifficulty, string> = {
  "plug-in": "Install and use the same day. Little to no custom code.",
  "some-wiring":
    "A few days of integration work — credentials, data mapping, a deploy target.",
  "engineering-project":
    "Weeks, not days. Treat it as infrastructure with an owner and a budget.",
};

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as AgentCategory[];
export const AUDIENCES = Object.keys(AUDIENCE_LABELS) as AgentAudience[];
export const INDUSTRIES = Object.keys(INDUSTRY_LABELS) as AgentIndustry[];
export const DIFFICULTIES = Object.keys(
  DIFFICULTY_LABELS
) as AgentDifficulty[];
