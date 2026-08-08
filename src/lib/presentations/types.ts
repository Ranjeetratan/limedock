import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type ScrapedCompany = {
  url: string;
  domain: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl: string | null;
  ogImageUrl: string | null;
  /** Curated hero when live screenshots aren't usable */
  heroImageUrl?: string | null;
  /** Prospect portrait */
  portraitUrl?: string | null;
  faviconUrl: string | null;
  themeColor: string | null;
  brandColors: string[];
  emails: string[];
  phones: string[];
  address: string | null;
  socialLinks: { platform: string; url: string }[];
  navLinks: string[];
  ctas: string[];
  signals: string[];
  technologies: string[];
  rawTitle: string;
};

export type PresentationModule = {
  id: string;
  title: string;
  blurb: string;
  bullets: string[];
  whyForThem: string;
};

export type WorkflowNode = {
  id: string;
  label: string;
  detail?: string;
};

export type WorkflowEdge = {
  from: string;
  to: string;
};

export type WorkflowChart = {
  id: string;
  title: string;
  subtitle: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};

export type Opportunity = {
  title: string;
  gap: string;
  fix: string;
  impact: string;
};

export type CatalogItem = {
  name: string;
  slug: string;
  summary: string;
  type: "skill" | "agent" | "system";
};

export type PitchBeat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type Presentation = {
  id: string;
  createdAt: string;
  expiresAt: string;
  company: ScrapedCompany;
  market: "usa";
  recipientName?: string;
  headline: string;
  subhead: string;
  observations: string[];
  opportunities: Opportunity[];
  advantages: { title: string; body: string }[];
  /** Expert-presenter narrative beats (outcomes, GEO, transparency) */
  pitchBeats?: PitchBeat[];
  stackConnected: string[];
  modules: PresentationModule[];
  workflowSteps: string[];
  workflowCharts: WorkflowChart[];
  skills: CatalogItem[];
  agents: CatalogItem[];
  systems: CatalogItem[];
  morningBrief: {
    activeLeads: number;
    hotLeads: number;
    siteVisitsToday: number;
    dealsLikelyClose: number;
    pipelineLabel: string;
    attention: { level: "red" | "orange" | "green"; text: string }[];
    recommendedAction: string;
  };
  nextSteps: string[];
  /** Explicit sales path shown near the book-call CTA */
  callPlan?: {
    ctaLabel: string;
    nextAction: string;
    callGoal: string;
    afterCall: string[];
  };
  openingMessage: string;
};

const DATA_DIR = path.join(process.cwd(), ".data", "presentations");
/** Committed / shipped decks (e.g. shared with a prospect) */
const PUBLISHED_DIR = path.join(process.cwd(), "content", "presentations");
const TTL_MS = 24 * 60 * 60 * 1000;
const PUBLISHED_TTL_MS = 24 * 60 * 60 * 1000; // 24h for shared links

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export function newPresentationId(): string {
  return randomBytes(6).toString("hex");
}

export async function savePresentation(p: Presentation): Promise<void> {
  await ensureDir();
  const file = path.join(DATA_DIR, `${p.id}.json`);
  await fs.writeFile(file, JSON.stringify(p, null, 2), "utf8");
}

/** Persist a deck into the repo so production can serve it */
export async function publishPresentation(p: Presentation): Promise<void> {
  await fs.mkdir(PUBLISHED_DIR, { recursive: true });
  const file = path.join(PUBLISHED_DIR, `${p.id}.json`);
  await fs.writeFile(file, JSON.stringify(p, null, 2), "utf8");
}

export async function getPresentation(
  id: string,
): Promise<Presentation | null> {
  const safe = id.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safe || safe !== id) return null;

  for (const dir of [DATA_DIR, PUBLISHED_DIR]) {
    try {
      const file = path.join(dir, `${safe}.json`);
      const raw = await fs.readFile(file, "utf8");
      return JSON.parse(raw) as Presentation;
    } catch {
      /* try next */
    }
  }
  return null;
}

export function isExpired(p: Presentation): boolean {
  return new Date(p.expiresAt).getTime() < Date.now();
}

export function makeExpiry(from = Date.now()): string {
  return new Date(from + TTL_MS).toISOString();
}

export function makePublishedExpiry(from = Date.now()): string {
  return new Date(from + PUBLISHED_TTL_MS).toISOString();
}
