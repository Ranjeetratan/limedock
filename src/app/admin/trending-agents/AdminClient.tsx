"use client";

import { useState } from "react";
import {
  AUDIENCES,
  AUDIENCE_LABELS,
  CATEGORIES,
  CATEGORY_LABELS,
  DIFFICULTIES,
  DIFFICULTY_LABELS,
  INDUSTRIES,
  INDUSTRY_LABELS,
  type AgentAudience,
  type AgentCategory,
  type AgentDifficulty,
  type AgentIndustry,
} from "@/lib/trending-agents";

type LookupResult = {
  slug: string;
  name: string;
  repo: string;
  owner: string;
  url: string;
  homepage: string | null;
  tagline: string;
  topics: string[];
  stats: {
    stars: number;
    forks: number;
    openIssues: number;
    language: string | null;
    license: string | null;
    createdAt: string;
    pushedAt: string;
  };
};

type IdeaDraft = { title: string; detail: string; audience: AgentAudience };

const EMPTY_IDEA: IdeaDraft = { title: "", detail: "", audience: "operations" };

/** Turns the form state into a paste-ready TypeScript entry. */
function toSource(
  lookup: LookupResult,
  fields: {
    whatItDoes: string;
    whoItIsFor: string;
    useCases: string;
    whenToUse: string;
    whenToAvoid: string;
    seoKeywords: string;
    categories: AgentCategory[];
    audiences: AgentAudience[];
    industries: AgentIndustry[];
    difficulty: AgentDifficulty;
    trendingWeek: string;
    featured: boolean;
    ideas: IdeaDraft[];
  }
): string {
  const lines = (value: string) =>
    value
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

  const arr = (values: string[], indent = "      ") =>
    values.length
      ? `\n${values.map((v) => `${indent}${JSON.stringify(v)},`).join("\n")}\n    `
      : "";

  const ideas = fields.ideas
    .filter((idea) => idea.title.trim() && idea.detail.trim())
    .map(
      (idea) =>
        `      {\n        title: ${JSON.stringify(idea.title.trim())},\n        detail: ${JSON.stringify(
          idea.detail.trim()
        )},\n        audience: ${JSON.stringify(idea.audience)},\n      },`
    )
    .join("\n");

  return `  {
    slug: ${JSON.stringify(lookup.slug)},
    name: ${JSON.stringify(lookup.name)},
    repo: ${JSON.stringify(lookup.repo)},
    owner: ${JSON.stringify(lookup.owner)},
    url: ${JSON.stringify(lookup.url)},
    homepage: ${lookup.homepage ? JSON.stringify(lookup.homepage) : "null"},
    tagline: ${JSON.stringify(lookup.tagline)},
    whatItDoes: ${JSON.stringify(fields.whatItDoes.trim())},
    whoItIsFor: [${arr(lines(fields.whoItIsFor))}],
    useCases: [${arr(lines(fields.useCases))}],
    whenToUse: [${arr(lines(fields.whenToUse))}],
    whenToAvoid: [${arr(lines(fields.whenToAvoid))}],
    automationIdeas: [
${ideas}
    ],
    categories: ${JSON.stringify(fields.categories)},
    audiences: ${JSON.stringify(fields.audiences)},
    industries: ${JSON.stringify(fields.industries)},
    difficulty: ${JSON.stringify(fields.difficulty)},
    stats: {
      stars: ${lookup.stats.stars},
      forks: ${lookup.stats.forks},
      openIssues: ${lookup.stats.openIssues},
      language: ${lookup.stats.language ? JSON.stringify(lookup.stats.language) : "null"},
      license: ${lookup.stats.license ? JSON.stringify(lookup.stats.license) : "null"},
      createdAt: ${JSON.stringify(lookup.stats.createdAt)},
      pushedAt: ${JSON.stringify(lookup.stats.pushedAt)},
    },
    topics: ${JSON.stringify(lookup.topics)},
    seoKeywords: [${arr(lines(fields.seoKeywords))}],
    relatedSlugs: [],
    trendingWeek: ${JSON.stringify(fields.trendingWeek)},
    featured: ${fields.featured},
  },`;
}

export default function AdminClient({
  existingSlugs,
}: {
  existingSlugs: string[];
}) {
  const [repoInput, setRepoInput] = useState("");
  const [lookup, setLookup] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [whatItDoes, setWhatItDoes] = useState("");
  const [whoItIsFor, setWhoItIsFor] = useState("");
  const [useCases, setUseCases] = useState("");
  const [whenToUse, setWhenToUse] = useState("");
  const [whenToAvoid, setWhenToAvoid] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [categories, setCategories] = useState<AgentCategory[]>([]);
  const [audiences, setAudiences] = useState<AgentAudience[]>([]);
  const [industries, setIndustries] = useState<AgentIndustry[]>(["any"]);
  const [difficulty, setDifficulty] = useState<AgentDifficulty>("some-wiring");
  const [trendingWeek, setTrendingWeek] = useState("");
  const [featured, setFeatured] = useState(false);
  const [ideas, setIdeas] = useState<IdeaDraft[]>(
    Array.from({ length: 10 }, () => ({ ...EMPTY_IDEA }))
  );

  const duplicate = lookup ? existingSlugs.includes(lookup.slug) : false;

  async function runLookup() {
    setLoading(true);
    setError(null);
    setLookup(null);
    try {
      const response = await fetch(
        `/api/admin/github-lookup?repo=${encodeURIComponent(repoInput)}`
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Lookup failed.");
      } else {
        setLookup(data);
        if (!seoKeywords) {
          setSeoKeywords(
            [
              `${data.name} github`,
              `${data.name} tutorial`,
              `what is ${data.name}`,
              `${data.name} alternatives`,
            ].join("\n")
          );
        }
      }
    } catch {
      setError("Could not reach the lookup endpoint.");
    } finally {
      setLoading(false);
    }
  }

  function toggle<T>(list: T[], value: T, set: (next: T[]) => void) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const source = lookup
    ? toSource(lookup, {
        whatItDoes,
        whoItIsFor,
        useCases,
        whenToUse,
        whenToAvoid,
        seoKeywords,
        categories,
        audiences,
        industries,
        difficulty,
        trendingWeek,
        featured,
        ideas,
      })
    : "";

  return (
    <div className="mt-10 space-y-10">
      {/* Lookup */}
      <section className="rounded-md border border-hairline bg-surface-soft p-6">
        <h2 className="text-title-md text-ink">1 · Pull the repo from GitHub</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runLookup();
            }}
            placeholder="owner/name or https://github.com/owner/name"
            className="flex-1 min-h-12 rounded-sm border border-hairline bg-canvas px-4 text-body-md text-ink focus-ring"
          />
          <button
            type="button"
            onClick={runLookup}
            disabled={loading || !repoInput.trim()}
            className="btn-primary justify-center disabled:opacity-50"
          >
            {loading ? "Looking up…" : "Fetch"}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-body-md text-signature-coral">{error}</p>
        )}
        {lookup && (
          <div className="mt-5 rounded-sm border border-hairline bg-canvas p-4">
            <p className="text-title-sm text-ink">
              {lookup.repo}{" "}
              <span className="text-body-md text-muted tabular-nums">
                ★ {lookup.stats.stars.toLocaleString()}
              </span>
            </p>
            <p className="text-body-md text-body mt-1.5">{lookup.tagline}</p>
            <p className="text-caption text-muted mt-2 font-mono">
              slug: {lookup.slug} · {lookup.stats.language ?? "n/a"} ·{" "}
              {lookup.stats.license ?? "no licence"} · pushed{" "}
              {lookup.stats.pushedAt}
            </p>
            {duplicate && (
              <p className="mt-3 rounded-sm bg-signature-peach/50 px-3 py-2 text-body-md text-ink">
                Heads up: <strong>{lookup.slug}</strong> is already in the
                catalog. Editing it means replacing the existing entry.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Editorial */}
      {lookup && (
        <>
          <section className="rounded-md border border-hairline p-6">
            <h2 className="text-title-md text-ink">2 · Write the editorial</h2>
            <p className="text-body-md text-muted mt-1.5">
              One item per line for the list fields.
            </p>

            <div className="mt-6 space-y-5">
              <Field
                label="What it actually does"
                hint="2–4 paragraphs, blank line between them. Plain English."
                value={whatItDoes}
                onChange={setWhatItDoes}
                rows={8}
              />
              <Field
                label="Who it's for"
                hint="One persona per line."
                value={whoItIsFor}
                onChange={setWhoItIsFor}
                rows={5}
              />
              <Field
                label="Where it earns its keep"
                hint="One use case per line."
                value={useCases}
                onChange={setUseCases}
                rows={5}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Reach for it when"
                  value={whenToUse}
                  onChange={setWhenToUse}
                  rows={5}
                />
                <Field
                  label="Skip it when"
                  hint="Be honest — this is what builds trust."
                  value={whenToAvoid}
                  onChange={setWhenToAvoid}
                  rows={5}
                />
              </div>
              <Field
                label="SEO keywords"
                hint="One long-tail phrase per line."
                value={seoKeywords}
                onChange={setSeoKeywords}
                rows={5}
              />
            </div>
          </section>

          {/* Taxonomy */}
          <section className="rounded-md border border-hairline p-6">
            <h2 className="text-title-md text-ink">3 · Classify it</h2>

            <ChipGroup
              label="Categories"
              options={CATEGORIES}
              labels={CATEGORY_LABELS}
              selected={categories}
              onToggle={(v) => toggle(categories, v, setCategories)}
            />
            <ChipGroup
              label="Teams"
              options={AUDIENCES}
              labels={AUDIENCE_LABELS}
              selected={audiences}
              onToggle={(v) => toggle(audiences, v, setAudiences)}
            />
            <ChipGroup
              label="Industries"
              options={INDUSTRIES}
              labels={INDUSTRY_LABELS}
              selected={industries}
              onToggle={(v) => toggle(industries, v, setIndustries)}
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="text-caption uppercase tracking-[0.1em] text-muted">
                  Lift
                </span>
                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value as AgentDifficulty)
                  }
                  className="min-h-11 rounded-sm border border-hairline bg-canvas px-3 text-body-md text-ink focus-ring"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {DIFFICULTY_LABELS[d]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-caption uppercase tracking-[0.1em] text-muted">
                  Trending week (Monday)
                </span>
                <input
                  type="date"
                  value={trendingWeek}
                  onChange={(e) => setTrendingWeek(e.target.value)}
                  className="min-h-11 rounded-sm border border-hairline bg-canvas px-3 text-body-md text-ink focus-ring"
                />
              </label>

              <label className="flex items-end gap-2 pb-2">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-body-md text-ink">Feature on index</span>
              </label>
            </div>
          </section>

          {/* Ideas */}
          <section className="rounded-md border border-hairline p-6">
            <h2 className="text-title-md text-ink">
              4 · Ten automation ideas
            </h2>
            <p className="text-body-md text-muted mt-1.5">
              This is the section that makes the page worth ranking. Tie each
              one to a workflow a real team runs by hand.
            </p>
            <div className="mt-6 space-y-4">
              {ideas.map((idea, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-sm border border-hairline p-4 md:grid-cols-[auto_1fr_1fr_auto] md:items-start"
                >
                  <span className="text-title-sm text-signature-coral tabular-nums pt-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <input
                    value={idea.title}
                    onChange={(e) => {
                      const next = [...ideas];
                      next[index] = { ...idea, title: e.target.value };
                      setIdeas(next);
                    }}
                    placeholder="Title"
                    className="min-h-11 rounded-sm border border-hairline bg-canvas px-3 text-body-md text-ink focus-ring"
                  />
                  <textarea
                    value={idea.detail}
                    onChange={(e) => {
                      const next = [...ideas];
                      next[index] = { ...idea, detail: e.target.value };
                      setIdeas(next);
                    }}
                    placeholder="Trigger, the work, where the output lands."
                    rows={2}
                    className="rounded-sm border border-hairline bg-canvas px-3 py-2 text-body-md text-ink focus-ring"
                  />
                  <select
                    value={idea.audience}
                    onChange={(e) => {
                      const next = [...ideas];
                      next[index] = {
                        ...idea,
                        audience: e.target.value as AgentAudience,
                      };
                      setIdeas(next);
                    }}
                    className="min-h-11 rounded-sm border border-hairline bg-canvas px-2 text-body-md text-ink focus-ring"
                  >
                    {AUDIENCES.map((a) => (
                      <option key={a} value={a}>
                        {AUDIENCE_LABELS[a]}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </section>

          {/* Output */}
          <section className="rounded-md border border-hairline bg-surface-soft p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-title-md text-ink">5 · Copy into a batch</h2>
                <p className="text-body-md text-muted mt-1.5 max-w-xl">
                  Paste this into any{" "}
                  <code className="font-mono text-ink">
                    src/lib/trending-agents/data/batch-*.ts
                  </code>{" "}
                  array and deploy. The catalog is committed to git on purpose —
                  entries are reviewable and the site stays fully static.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(source);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="btn-primary shrink-0"
              >
                {copied ? "Copied" : "Copy entry"}
              </button>
            </div>
            <pre className="mt-5 max-h-[420px] overflow-auto rounded-sm border border-hairline bg-canvas p-4 text-caption leading-[1.55] font-mono text-body">
              {source}
            </pre>
          </section>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  rows,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-caption uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      {hint && <span className="text-body-md text-muted -mt-1">{hint}</span>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="rounded-sm border border-hairline bg-canvas px-3 py-2.5 text-body-md text-ink leading-[1.55] focus-ring"
      />
    </label>
  );
}

function ChipGroup<T extends string>({
  label,
  options,
  labels,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly T[];
  labels: Record<T, string>;
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div className="mt-5">
      <span className="text-caption uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            aria-pressed={selected.includes(option)}
            className={`min-h-9 rounded-sm border px-3 text-body-md transition-colors focus-ring ${
              selected.includes(option)
                ? "border-ink bg-ink text-canvas"
                : "border-hairline bg-canvas text-body hover:border-border-strong"
            }`}
          >
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
