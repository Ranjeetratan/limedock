import type { TrendingAgent } from "../types";

export const BATCH_05: TrendingAgent[] = [
  {
    slug: "generative-ai-for-beginners",
    name: "Generative AI for Beginners",
    repo: "microsoft/generative-ai-for-beginners",
    owner: "microsoft",
    url: "https://github.com/microsoft/generative-ai-for-beginners",
    homepage: null,
    tagline:
      "Microsoft's 21-lesson course on actually building with generative AI — the applied companion to their fundamentals curriculum.",
    whatItDoes: `Where AI for Beginners covers the theory, this covers the building. Twenty-one lessons on prompt engineering, semantic search, working with language models, and shipping applications that use them.

It is the more directly useful of Microsoft's two curricula for anyone whose job is to deliver something rather than understand the mathematics. Lessons cover practical territory: how to structure prompts that hold up, how retrieval actually works, what breaks in production, and how to think about cost.

Notably it has 62,000 forks — an unusually high fork-to-star ratio that suggests people are genuinely working through it rather than bookmarking it.

MIT licensed, maintained by Microsoft with 21 open issues, and Azure-flavoured in places, though the concepts port cleanly to any provider.`,
    whoItIsFor: [
      "Engineers who need to ship an AI feature and have not built one before",
      "Product managers who want to write requirements that survive contact with reality",
      "Teams standardising on shared prompt-engineering practice",
      "Anyone who found pure-theory courses too far from the work",
    ],
    useCases: [
      "Getting a team from zero to a working RAG application with structure",
      "Establishing shared vocabulary and technique for prompt engineering",
      "Understanding where costs come from before designing a feature",
      "Onboarding engineers into AI work with a known-good sequence",
      "Answering 'why does it do that?' with something better than a guess",
    ],
    whenToUse: [
      "Your team is about to build its first serious AI feature",
      "Prompt quality varies wildly across your engineers",
      "You want vendor-neutral fundamentals plus practical patterns",
      "Structured progression suits your team better than scattered blog posts",
    ],
    whenToAvoid: [
      "Your team already ships AI features competently",
      "You need agent-specific and current material rather than foundational building",
      "The Azure framing in places will irritate a team committed elsewhere",
      "You need results this week, not a course",
    ],
    automationIdeas: [
      {
        title: "Team prompt standard",
        detail:
          "Turn the prompt-engineering lessons into an internal standard every engineer applies, reviewed like code.",
        audience: "engineering",
      },
      {
        title: "Structured AI ramp",
        detail:
          "Run the 21 lessons over a quarter with weekly demos so learning produces working artifacts.",
        audience: "operations",
      },
      {
        title: "Cost model education",
        detail:
          "Use the cost material to build an internal calculator so feature proposals include realistic spend estimates.",
        audience: "finance",
      },
      {
        title: "Product requirement templates",
        detail:
          "Give PMs enough grounding to write AI feature specs that engineers do not have to rewrite.",
        audience: "founder",
      },
      {
        title: "Retrieval design review",
        detail:
          "Use the semantic search lessons as the checklist for reviewing any new RAG design internally.",
        audience: "engineering",
      },
      {
        title: "Hiring assessment",
        detail:
          "Build a practical take-home from the course exercises to assess applied ability rather than trivia.",
        audience: "operations",
      },
      {
        title: "Customer education content",
        detail:
          "Adapt the explanations into customer-facing material about how your AI features actually work.",
        audience: "marketing",
      },
      {
        title: "Failure mode playbook",
        detail:
          "Document the failure modes the course covers as an internal troubleshooting guide for support.",
        audience: "support",
      },
      {
        title: "Weekly lesson digest",
        detail:
          "Summarise each lesson into Slack so people who miss a week can stay in the conversation.",
        audience: "operations",
      },
      {
        title: "Proof-of-concept sprint",
        detail:
          "End the course with a week where each engineer ships a small internal AI tool using what they learned.",
        audience: "engineering",
      },
    ],
    categories: ["learning"],
    audiences: ["engineering", "founder", "operations", "data"],
    industries: ["any"],
    difficulty: "plug-in",
    stats: {
      stars: 117214,
      forks: 61899,
      openIssues: 21,
      language: "Jupyter Notebook",
      license: "MIT",
      createdAt: "2023-06-19",
      pushedAt: "2026-08-06",
    },
    topics: [
      "generative-ai",
      "gpt",
      "llms",
      "openai",
      "prompt-engineering",
      "semantic-search",
      "transformers",
    ],
    seoKeywords: [
      "generative AI for beginners github",
      "microsoft generative AI course",
      "21 lessons generative AI",
      "learn prompt engineering free",
      "build generative AI applications course",
    ],
    relatedSlugs: ["ai-for-beginners", "prompt-engineering", "awesome-llm-apps"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "ui-ux-pro-max-skill",
    name: "UI UX Pro Max",
    repo: "nextlevelbuilder/ui-ux-pro-max-skill",
    owner: "nextlevelbuilder",
    url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    homepage: "https://www.uupm.cc/",
    tagline:
      "A design-intelligence skill that stops your coding agent shipping interfaces that look like a Bootstrap template from 2014.",
    whatItDoes: `Coding agents write functional interfaces and mediocre design. Spacing is arbitrary, type scales are inconsistent, colour choices are whatever came to mind first. The code works and looks generic.

UI UX Pro Max is a skill that adds design intelligence to that process. The flagship feature in v2 is a Design System Generator: an engine that reads your project requirements and produces a complete tailored design system — colour, type, spacing, component conventions — in seconds, rather than leaving the agent to improvise per component.

It covers multiple platforms and frameworks, including React, Tailwind, HTML5, mobile UI, and landing pages, and installs across Claude Code, Codex, Cursor, Copilot, Windsurf, Kiro, Antigravity, Trae, and Qoder.

115,000 stars, MIT licensed, with bilingual documentation.`,
    whoItIsFor: [
      "Founders shipping product without a designer on the team",
      "Engineers who can build anything but do not want to make design decisions",
      "Agencies producing client work that needs to look considered",
      "Teams whose agent-generated interfaces are visually inconsistent between screens",
    ],
    useCases: [
      "Generating a coherent design system at the start of a project instead of accreting one",
      "Keeping visual language consistent across screens built in different sessions",
      "Producing landing pages that look designed rather than assembled",
      "Giving a solo founder credible visual quality without hiring",
      "Standardising design tokens across a team's agent-generated work",
    ],
    whenToUse: [
      "You are building UI with an agent and no designer is involved",
      "Screens built at different times do not look like the same product",
      "You want a design system defined up front rather than retrofitted",
      "Visual quality is affecting how prospects perceive the product",
    ],
    whenToAvoid: [
      "You have a designer and an established design system — this will fight it",
      "Your product has strict brand guidelines that a generator will not respect",
      "You need accessibility compliance verified; generated systems still need auditing",
      "Your interface is genuinely novel and needs original thinking, not systematised defaults",
    ],
    automationIdeas: [
      {
        title: "Project kickoff design system",
        detail:
          "Generate the full design system before the first screen is built, so every later screen inherits it.",
        audience: "engineering",
      },
      {
        title: "Landing page factory",
        detail:
          "Produce campaign landing pages that match brand without a designer in the loop for each one.",
        audience: "marketing",
      },
      {
        title: "Client project templates",
        detail:
          "For agencies: generate a tailored system per client and reuse it across every deliverable in that engagement.",
        audience: "operations",
      },
      {
        title: "Design consistency audit",
        detail:
          "Check existing screens against the generated system and list where they drift.",
        audience: "engineering",
      },
      {
        title: "Demo polish pass",
        detail:
          "Before a customer demo, run the interface through the skill to fix the most obvious visual roughness.",
        audience: "sales",
      },
      {
        title: "Component library seeding",
        detail:
          "Generate the base component set once and have every engineer build from it rather than inventing.",
        audience: "engineering",
      },
      {
        title: "Mobile parity check",
        detail:
          "Use the multi-platform coverage to keep mobile and web visually aligned as both evolve.",
        audience: "engineering",
      },
      {
        title: "Design token export",
        detail:
          "Export the generated tokens into your codebase so design decisions live in version control.",
        audience: "engineering",
      },
      {
        title: "Prototype-to-pitch",
        detail:
          "Turn a rough internal prototype into something presentable for an investor or customer meeting.",
        audience: "founder",
      },
      {
        title: "Rebrand propagation",
        detail:
          "Regenerate the system with new brand inputs and apply it across screens rather than editing each one.",
        audience: "marketing",
      },
    ],
    categories: ["agent-skills"],
    audiences: ["engineering", "founder", "marketing"],
    industries: ["saas", "agency", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 115101,
      forks: 12334,
      openIssues: 118,
      language: "Python",
      license: "MIT",
      createdAt: "2025-11-30",
      pushedAt: "2026-08-06",
    },
    topics: [
      "ai-skills",
      "claude-code",
      "cursor-ai",
      "landing-page",
      "mobile-ui",
      "react",
      "tailwindcss",
      "ui-design",
    ],
    seoKeywords: [
      "ui ux pro max skill github",
      "AI design system generator skill",
      "claude code UI design skill",
      "uupm.cc design intelligence",
      "AI agent UI design quality",
    ],
    relatedSlugs: ["open-design", "taste-skill", "superpowers"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "browser-use",
    name: "Browser Use",
    repo: "browser-use/browser-use",
    owner: "browser-use",
    url: "https://github.com/browser-use/browser-use",
    homepage: "https://browser-use.com",
    tagline:
      "The standard way to let an AI agent drive a real browser — open pages, click, type, and fill forms.",
    whatItDoes: `Browser Use makes websites usable by agents. It opens pages, clicks buttons, types, and fills forms the way a person does. You describe the task and it completes it.

The examples in the repository are unusually concrete: filling in a job application from a résumé, extracting structured data about followers and exporting it as CSV, QA automation across a web app. That is the honest shape of the value — the tedious web work nobody wants to do manually.

It is built on Playwright, so the underlying automation is battle-tested, with the agent layer handling the "figure out which button" problem that makes traditional selectors brittle.

108,000 stars, MIT licensed, with a cloud offering alongside the open-source library. It is the reference implementation in this category, which also means it is what other tools benchmark themselves against.`,
    whoItIsFor: [
      "Growth and sales teams doing repetitive web research or data collection",
      "QA teams who want tests that do not break on every selector change",
      "Ops people automating a web workflow that has no API",
      "Engineers who need browser automation without maintaining brittle scripts",
    ],
    useCases: [
      "Extracting structured data from sites that offer no export",
      "Filling long repetitive forms across many records",
      "QA flows that survive UI changes better than selector-based tests",
      "Competitive research across many sites on a schedule",
      "Automating an internal tool that was never given an API",
    ],
    whenToUse: [
      "The target has no API and the work is genuinely repetitive",
      "Selector-based automation keeps breaking on UI changes",
      "You need headless automation running in CI or on a server",
      "The task is describable in a sentence but tedious to do by hand",
    ],
    whenToAvoid: [
      "An API exists — use it, it will be faster, cheaper, and more reliable",
      "The site's terms prohibit automated access; check before you build",
      "You need logged-in sessions to carry cleanly, where a shared-browser tool fits better",
      "Volume is high enough that per-page model cost becomes the dominant expense",
    ],
    automationIdeas: [
      {
        title: "Lead list enrichment",
        detail:
          "Visit each company site, pull the details your CRM is missing, and write them back as structured fields.",
        audience: "sales",
      },
      {
        title: "Competitor pricing watch",
        detail:
          "Check competitor pricing pages weekly, diff against last week, and post material changes to Slack.",
        audience: "marketing",
      },
      {
        title: "Directory submission",
        detail:
          "Submit your product to relevant directories by filling each form from one canonical record.",
        audience: "marketing",
      },
      {
        title: "Regression QA suite",
        detail:
          "Describe critical user journeys in plain language and run them nightly against staging.",
        audience: "engineering",
      },
      {
        title: "Supplier portal extraction",
        detail:
          "Pull invoices or order status from supplier portals that never built an API, on a schedule.",
        audience: "finance",
      },
      {
        title: "Review monitoring",
        detail:
          "Collect new reviews across platforms and route negative ones to support with the context attached.",
        audience: "support",
      },
      {
        title: "Event and conference research",
        detail:
          "Extract speaker and attendee lists from event sites to build a targeted outreach list.",
        audience: "sales",
      },
      {
        title: "Compliance evidence capture",
        detail:
          "Screenshot and archive specific pages on a schedule to evidence what was published when.",
        audience: "operations",
      },
      {
        title: "Job posting intelligence",
        detail:
          "Track competitor hiring pages to infer product direction and headcount investment.",
        audience: "marketing",
      },
      {
        title: "Bulk account maintenance",
        detail:
          "Apply the same settings change across many accounts in a tool with no bulk edit feature.",
        audience: "operations",
      },
    ],
    categories: ["browser-data"],
    audiences: ["sales", "marketing", "operations", "engineering"],
    industries: ["saas", "ecommerce", "agency", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 108528,
      forks: 11931,
      openIssues: 342,
      language: "Python",
      license: "MIT",
      createdAt: "2024-10-31",
      pushedAt: "2026-08-06",
    },
    topics: [
      "ai-agents",
      "ai-tools",
      "browser-automation",
      "llm",
      "playwright",
      "python",
    ],
    seoKeywords: [
      "browser-use github",
      "AI agent browser automation",
      "browser use playwright agent",
      "automate web tasks with LLM",
      "browser-use examples",
    ],
    relatedSlugs: ["ego-lite", "steel-browser", "workflow-use"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "graphify",
    name: "Graphify",
    repo: "Graphify-Labs/graphify",
    owner: "Graphify-Labs",
    url: "https://github.com/Graphify-Labs/graphify",
    homepage: "https://www.graphify.com",
    tagline:
      "Turns a codebase — plus its docs, SQL schemas, configs, and PDFs — into a queryable knowledge graph with no vector store.",
    whatItDoes: `Vector search over a codebase gives you fuzzy similarity. Graphify gives you structure: it parses your project deterministically with AST parsing and tree-sitter, and builds a knowledge graph where every edge is explained rather than inferred from an embedding.

That distinction matters when the question is "what breaks if I change this function?" A vector store returns things that look similar. A graph returns what actually calls it.

It ingests more than code — documentation, SQL schemas, configuration, PDFs, images, and video all become part of the same graph. You type \`/graphify\` in Claude Code, Cursor, Codex, or Gemini CLI and query the project instead of grepping it.

It is local and deterministic, uses Leiden community detection for clustering, and is documented in over thirty languages. Apache 2.0, 105,000 stars, with a hosted platform in early access.`,
    whoItIsFor: [
      "Engineers working in a large codebase nobody fully understands anymore",
      "Teams onboarding people into unfamiliar systems",
      "Anyone whose agent gives confidently wrong answers about how their code fits together",
      "Architects assessing blast radius before a significant change",
    ],
    useCases: [
      "Answering impact questions before a refactor with real call graphs",
      "Onboarding an engineer into a system with a queryable map instead of tribal knowledge",
      "Connecting code to the SQL schema and documentation that explain it",
      "Auditing an inherited or acquired codebase quickly",
      "Giving an agent structural grounding so it stops inventing relationships",
    ],
    whenToUse: [
      "The codebase is large enough that nobody holds it in their head",
      "You need deterministic answers about structure, not similarity matches",
      "Documentation, schemas, and code need to be queried together",
      "You want it local rather than uploading your codebase somewhere",
    ],
    whenToAvoid: [
      "Your codebase is small and everyone knows it",
      "Your languages are not well supported by the underlying parsers",
      "You genuinely need semantic similarity rather than structural relationships",
      "You have no time to maintain the graph as the codebase changes",
    ],
    automationIdeas: [
      {
        title: "Pre-refactor blast radius",
        detail:
          "Before any significant change, query what depends on the target and attach the impact list to the ticket.",
        audience: "engineering",
      },
      {
        title: "Onboarding map",
        detail:
          "Generate a personalised tour of the subsystems a new hire will own, grounded in real structure.",
        audience: "operations",
      },
      {
        title: "Schema-to-code tracing",
        detail:
          "Answer which code paths touch a given database column before you migrate it.",
        audience: "engineering",
      },
      {
        title: "Dead code identification",
        detail:
          "Find modules with no inbound edges and propose them for deletion with the evidence attached.",
        audience: "engineering",
      },
      {
        title: "Acquisition due diligence",
        detail:
          "Map an acquired codebase in days rather than months and produce a structured risk summary.",
        audience: "founder",
      },
      {
        title: "Documentation gap detection",
        detail:
          "Find heavily-connected modules with no documentation and prioritise writing it.",
        audience: "engineering",
      },
      {
        title: "Agent grounding layer",
        detail:
          "Give coding agents graph access so their answers about your architecture are checked rather than guessed.",
        audience: "engineering",
      },
      {
        title: "Ownership assignment",
        detail:
          "Use community detection clusters to propose sensible code ownership boundaries between teams.",
        audience: "operations",
      },
      {
        title: "Incident context assembly",
        detail:
          "During an incident, query everything connected to the failing component and assemble context fast.",
        audience: "engineering",
      },
      {
        title: "Architecture drift review",
        detail:
          "Compare the graph quarterly to see where the real structure has diverged from the intended design.",
        audience: "engineering",
      },
    ],
    categories: ["rag-knowledge", "memory-context", "agent-skills"],
    audiences: ["engineering", "data", "operations"],
    industries: ["saas", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 104706,
      forks: 10181,
      openIssues: 876,
      language: "Python",
      license: "Apache-2.0",
      createdAt: "2026-04-03",
      pushedAt: "2026-08-09",
    },
    topics: [
      "ast",
      "claude-code",
      "code-analysis",
      "code-search",
      "graphrag",
      "knowledge-graph",
      "mcp",
      "rag",
      "tree-sitter",
    ],
    seoKeywords: [
      "graphify github",
      "codebase knowledge graph",
      "graphrag code analysis",
      "query codebase without vector store",
      "graphify skill claude code",
    ],
    relatedSlugs: ["understand-anything", "context7", "tencentdb-agent-memory"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "moneyprinterturbo",
    name: "MoneyPrinterTurbo",
    repo: "harry0703/MoneyPrinterTurbo",
    owner: "harry0703",
    url: "https://github.com/harry0703/MoneyPrinterTurbo",
    homepage: null,
    tagline:
      "Give it a topic and it produces a finished short video — script, footage, subtitles, music, and all.",
    whatItDoes: `Provide a topic or keyword and MoneyPrinterTurbo generates the video script, matches stock footage to it, generates subtitles and background music, and composites a finished HD short video.

The output targets the vertical short format — TikTok, Reels, YouTube Shorts. It ships both a web UI and an API, so it works as a tool a person uses or as a step inside a larger pipeline.

The honest assessment: this produces competent, generic short-form video at essentially zero marginal cost. It will not produce something with a distinct creative voice. Where it earns its place is volume formats where consistency matters more than artistry — product explainers, listicles, FAQ videos — or as a first draft a human then improves.

MIT licensed, 102,000 stars, with only 17 open issues. Documentation is primarily Chinese with an English README available.`,
    whoItIsFor: [
      "Marketing teams who need short-form video volume without a video team",
      "Founders testing whether video channels work before investing properly",
      "Agencies producing routine social content across many client accounts",
      "E-commerce teams needing a video per product listing",
    ],
    useCases: [
      "Producing a short video for every blog post automatically",
      "Testing dozens of hooks cheaply to find which ones hold attention",
      "Generating product explainer videos across a large catalog",
      "Turning FAQ content into video for channels that reward it",
      "Creating first drafts a human editor then sharpens",
    ],
    whenToUse: [
      "You need volume and consistency more than creative distinction",
      "You are testing whether a video channel works at all before hiring",
      "The content is inherently formulaic — explainers, lists, FAQs",
      "Marginal cost per video is the binding constraint",
    ],
    whenToAvoid: [
      "Brand differentiation depends on a distinctive creative voice",
      "You need footage of your actual product or people, not stock",
      "Platform policies where you publish penalise low-effort generated content",
      "You do not have someone to review output before it goes out under your brand",
    ],
    automationIdeas: [
      {
        title: "Blog post to short video",
        detail:
          "Every published article automatically becomes a short video queued for review before posting.",
        audience: "marketing",
      },
      {
        title: "Hook testing at volume",
        detail:
          "Generate twenty variants of the same message with different openings and let engagement pick the winner.",
        audience: "marketing",
      },
      {
        title: "Product catalog videos",
        detail:
          "Produce a consistent short video for each product listing across a large e-commerce catalog.",
        audience: "marketing",
      },
      {
        title: "FAQ video library",
        detail:
          "Turn your top support questions into short videos and link them from help articles.",
        audience: "support",
      },
      {
        title: "Changelog highlights",
        detail:
          "Convert each release note into a short video for social so product updates get seen.",
        audience: "marketing",
      },
      {
        title: "Client content pipeline",
        detail:
          "For agencies: batch-generate a month of routine social video per client, with a human approving each set.",
        audience: "operations",
      },
      {
        title: "Localised variants",
        detail:
          "Generate the same video with subtitles and voice in several languages for different markets.",
        audience: "marketing",
      },
      {
        title: "Channel viability test",
        detail:
          "Run a cheap thirty-video experiment to decide whether the channel deserves a real budget.",
        audience: "founder",
      },
      {
        title: "Editor first drafts",
        detail:
          "Produce the structural first cut so your editor spends time on craft rather than assembly.",
        audience: "marketing",
      },
      {
        title: "Cost-per-video tracking",
        detail:
          "Track generated cost against engagement to work out the real return on the format.",
        audience: "finance",
      },
    ],
    categories: ["vertical-agent", "workflow-automation"],
    audiences: ["marketing", "founder", "operations"],
    industries: ["ecommerce", "agency", "saas", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 102378,
      forks: 15439,
      openIssues: 17,
      language: "Python",
      license: "MIT",
      createdAt: "2024-03-11",
      pushedAt: "2026-08-07",
    },
    topics: [
      "ai-video-generator",
      "content-creation",
      "instagram-reels",
      "short-video",
      "tiktok",
      "video-automation",
      "youtube-shorts",
    ],
    seoKeywords: [
      "MoneyPrinterTurbo github",
      "AI short video generator open source",
      "automate tiktok video creation",
      "generate youtube shorts with AI",
      "text to short video AI",
    ],
    relatedSlugs: ["ppt-master", "html-video", "autoclip"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "ponytail",
    name: "Ponytail",
    repo: "DietrichGebert/ponytail",
    owner: "DietrichGebert",
    url: "https://github.com/DietrichGebert/ponytail",
    homepage: "https://ponytail.dev",
    tagline:
      "Makes your agent write roughly 54% less code by thinking like a senior developer who resents typing.",
    whatItDoes: `Agents over-build. Ask for a date picker and you get a component library. The code works, and it is three times more than the problem required — which is three times more to review, maintain, and eventually delete.

Ponytail is a skill that enforces the opposite instinct: the best code is the code you never wrote. The maintainers report roughly 54% less code on average, about 20% cheaper and 27% faster, measured across twelve feature tasks on a real FastAPI and React repository against the same agent without the skill.

The benchmarking is unusually honest, which is worth noting. They state the mean rather than the ceiling, explain that it reaches 94% where an agent badly over-builds and near zero where the code was already minimal, and explicitly correct an earlier single-shot benchmark that reported a flatteringly high flat figure.

They also claim it keeps every safety guard, where a naive "write one-liners" prompt drops them. MIT, 99,000 stars.`,
    whoItIsFor: [
      "Teams drowning in agent-generated code that nobody has time to review",
      "Engineers who value deleting code more than adding it",
      "Anyone whose model spend is driven by output tokens",
      "Reviewers who keep asking why a simple change touched eleven files",
    ],
    useCases: [
      "Cutting review burden by reducing the volume of generated code",
      "Reducing output token spend across a team's agent usage",
      "Keeping a codebase small enough to remain comprehensible",
      "Stopping agents from inventing abstraction nobody asked for",
      "Making agent output realistic to review properly rather than skim",
    ],
    whenToUse: [
      "Review capacity is your bottleneck",
      "Your codebase is growing faster than your understanding of it",
      "Output token cost is material",
      "Agents keep over-engineering simple requests",
    ],
    whenToAvoid: [
      "You genuinely need comprehensive scaffolding — a new service, not a small change",
      "Your team values explicit verbose code over terse code as a readability choice",
      "The domain requires defensive handling that a minimalist instinct might trim",
      "You are building a reference implementation meant to demonstrate patterns",
    ],
    automationIdeas: [
      {
        title: "Review-load reduction",
        detail:
          "Apply across the team and measure the change in lines-per-pull-request and review turnaround time.",
        audience: "engineering",
      },
      {
        title: "Token spend cut",
        detail:
          "Track output token cost before and after adoption and report the monthly difference.",
        audience: "finance",
      },
      {
        title: "Over-engineering detector",
        detail:
          "Compare agent output with and without the skill on the same task to show where it over-builds.",
        audience: "engineering",
      },
      {
        title: "Codebase growth control",
        detail:
          "Track lines of code per feature shipped and hold the team to a downward trend.",
        audience: "engineering",
      },
      {
        title: "Prototype discipline",
        detail:
          "Use it on throwaway prototypes so experiments stay genuinely cheap to discard.",
        audience: "founder",
      },
      {
        title: "Legacy simplification",
        detail:
          "Point it at over-built modules and have it propose simpler equivalents for review.",
        audience: "engineering",
      },
      {
        title: "Onboarding readability",
        detail:
          "Keep new code small enough that a new hire can read a feature end to end in one sitting.",
        audience: "operations",
      },
      {
        title: "Benchmark your own repo",
        detail:
          "Run their methodology on your codebase to get a real number rather than trusting the published mean.",
        audience: "engineering",
      },
      {
        title: "Pair with a safety review",
        detail:
          "Combine with an automated review pass so the smaller diff is also verified for dropped guards.",
        audience: "engineering",
      },
      {
        title: "Scope-creep prevention",
        detail:
          "Flag when a change adds abstraction that no current requirement justifies.",
        audience: "operations",
      },
    ],
    categories: ["agent-skills"],
    audiences: ["engineering", "finance"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 99582,
      forks: 5478,
      openIssues: 124,
      language: "JavaScript",
      license: "MIT",
      createdAt: "2026-06-12",
      pushedAt: "2026-08-07",
    },
    topics: [
      "agent-skills",
      "claude-code",
      "cursor-rules",
      "developer-tools",
      "prompt-engineering",
      "yagni",
    ],
    seoKeywords: [
      "ponytail github",
      "ponytail.dev claude code skill",
      "reduce AI generated code",
      "YAGNI agent skill",
      "make AI agent write less code",
    ],
    relatedSlugs: ["caveman", "i-have-adhd", "headroom"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "caveman",
    name: "Caveman",
    repo: "JuliusBrussee/caveman",
    owner: "JuliusBrussee",
    url: "https://github.com/JuliusBrussee/caveman",
    homepage: "https://caveman.so/",
    tagline:
      "Cuts 65% of output tokens on prose by making your agent talk like a caveman — code and commands stay exact.",
    whatItDoes: `The premise is a joke that turns out to be a real optimisation. Your agent's prose is padding: transitions, hedges, pleasantries. The information density is low and you pay for every token.

Caveman strips it. The agent drops filler and answers in tight caveman-speak — 65% fewer output tokens on prose, 8.5% on long-horizon agentic coding runs. Crucially, code, commands, and error messages stay byte-for-byte exact. It compresses the talking, not the artifacts.

It installs across Claude Code, Codex, Gemini, Cursor, Windsurf, Cline, Copilot, and thirty-plus other agents, with configurable levels if full caveman is too much.

The distinction from a skill like Ponytail is worth being clear about: Ponytail reduces how much code gets written, Caveman reduces how much prose surrounds it. They address different lines on the same bill and can be used together. MIT, 97,000 stars.`,
    whoItIsFor: [
      "Anyone whose output token spend is a real line item",
      "Developers who want the answer without the essay",
      "Teams running high-volume agent workloads where percentages compound",
      "People who find agent politeness actively slows them down",
    ],
    useCases: [
      "Cutting output token cost across a team with a one-time install",
      "Making agent responses scannable during focused work",
      "Reducing spend on long agentic runs where prose accumulates",
      "Keeping code output exact while compressing everything around it",
      "Tuning verbosity per context using the level settings",
    ],
    whenToUse: [
      "Output tokens are a meaningful cost",
      "You want answers, not explanations, in day-to-day work",
      "Your agent workloads are high volume so small percentages matter",
      "You can accept unusual phrasing in exchange for density",
    ],
    whenToAvoid: [
      "Output is customer-facing — caveman-speak in a support reply is not the impression you want",
      "You are learning and the explanation is the point",
      "Your team would find it genuinely irritating rather than funny",
      "You need agent output to be copied directly into professional documents",
    ],
    automationIdeas: [
      {
        title: "Fleet-wide token reduction",
        detail:
          "Install across every agent in the team and report the aggregate monthly saving to finance.",
        audience: "finance",
      },
      {
        title: "Internal-only verbosity profile",
        detail:
          "Apply it to internal tooling while leaving customer-facing generation untouched.",
        audience: "operations",
      },
      {
        title: "Long-run cost control",
        detail:
          "Enable specifically for long autonomous runs where prose accumulates across hundreds of turns.",
        audience: "engineering",
      },
      {
        title: "Level tuning by context",
        detail:
          "Use a light level for design discussion and a heavy one for repetitive execution work.",
        audience: "engineering",
      },
      {
        title: "Stacked with code reduction",
        detail:
          "Combine with a code-minimising skill and measure the compounded effect on total spend.",
        audience: "finance",
      },
      {
        title: "Status update compression",
        detail:
          "Apply to automated status posts so channels stay readable and cheap to generate.",
        audience: "operations",
      },
      {
        title: "CI output slimming",
        detail:
          "Reduce the prose in automated CI commentary while keeping error output verbatim.",
        audience: "engineering",
      },
      {
        title: "Benchmark validation",
        detail:
          "Measure the claimed 65% against your own workload rather than assuming it transfers.",
        audience: "engineering",
      },
      {
        title: "Mobile-friendly output",
        detail:
          "Shorter responses are far easier to read when checking agent work from a phone.",
        audience: "founder",
      },
      {
        title: "Rate-limit relief",
        detail:
          "Fewer output tokens per turn means fewer rate-limit stalls on constrained plans.",
        audience: "engineering",
      },
    ],
    categories: ["agent-skills"],
    audiences: ["engineering", "finance", "operations"],
    industries: ["any"],
    difficulty: "plug-in",
    stats: {
      stars: 97117,
      forks: 5598,
      openIssues: 470,
      language: "JavaScript",
      license: "MIT",
      createdAt: "2026-04-04",
      pushedAt: "2026-08-08",
    },
    topics: [
      "anthropic",
      "claude-code",
      "llm",
      "prompt-engineering",
      "skill",
      "tokens",
    ],
    seoKeywords: [
      "caveman github",
      "caveman.so claude code skill",
      "reduce output tokens claude",
      "cut LLM token cost skill",
      "caveman speak AI agent",
    ],
    relatedSlugs: ["ponytail", "i-have-adhd", "headroom"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "awesome-mcp-servers",
    name: "Awesome MCP Servers",
    repo: "punkpeye/awesome-mcp-servers",
    owner: "punkpeye",
    url: "https://github.com/punkpeye/awesome-mcp-servers",
    homepage: "https://glama.ai/mcp/servers",
    tagline:
      "The index of MCP servers — check here before you build an integration that already exists.",
    whatItDoes: `MCP is how agents reach tools, and the ecosystem has grown faster than anyone can track informally. This is the community index of what exists.

Its practical use is negative: before you spend a week building an integration between your agent and some service, you check here and frequently find it already built. Databases, cloud providers, project trackers, communication tools, file systems, search — the coverage is broad.

It pairs with a browsable directory at glama.ai/mcp/servers if scrolling a long markdown file is not how you want to search.

92,000 stars and MIT licensed. The caveat that matters: a listing is not a security review. Every MCP server you connect gets access to whatever you grant it, and this index does not vet the code behind each entry. Read the source of anything that will touch production credentials.`,
    whoItIsFor: [
      "Anyone about to build an MCP integration from scratch",
      "Teams mapping what agent tooling is available for their stack",
      "Engineers evaluating whether MCP covers their needs before committing",
      "Ops leads assembling an approved internal list of vetted servers",
    ],
    useCases: [
      "Checking whether an integration exists before building it",
      "Discovering what agents could connect to across your existing tools",
      "Building an internal allowlist of reviewed, approved MCP servers",
      "Finding reference implementations before writing your own server",
      "Assessing ecosystem maturity for a tool you depend on",
    ],
    whenToUse: [
      "You are scoping agent integrations and want to avoid rebuilding",
      "You need a reference implementation to model your own server on",
      "You are deciding whether MCP is mature enough for your stack",
      "You want breadth of options before picking one",
    ],
    whenToAvoid: [
      "You need vetted, security-reviewed software — this is an index, not an audit",
      "Your integration is proprietary and nothing generic will fit",
      "You want curation over completeness; the list is long by design",
      "You would connect something to production without reading its source first",
    ],
    automationIdeas: [
      {
        title: "Build-versus-adopt check",
        detail:
          "Make searching this index a required step before any integration goes on the engineering backlog.",
        audience: "engineering",
      },
      {
        title: "Internal approved list",
        detail:
          "Review candidate servers, approve a subset, and publish that as the only list your team may install from.",
        audience: "operations",
      },
      {
        title: "Stack coverage map",
        detail:
          "Map every tool your company uses against available servers to see where agent access is already possible.",
        audience: "operations",
      },
      {
        title: "New-server monitoring",
        detail:
          "Watch the repository for additions relevant to your stack and evaluate them as they appear.",
        audience: "engineering",
      },
      {
        title: "Security review pipeline",
        detail:
          "Route every proposed server through a source review before it gets any production credential.",
        audience: "engineering",
      },
      {
        title: "Reference implementation study",
        detail:
          "Read well-built servers in the list before writing your own internal one.",
        audience: "engineering",
      },
      {
        title: "Vendor pressure",
        detail:
          "Where no server exists for a tool you pay for, use that as leverage in the renewal conversation.",
        audience: "finance",
      },
      {
        title: "Quarterly capability review",
        detail:
          "Re-check the index each quarter to find integrations that did not exist when you last looked.",
        audience: "operations",
      },
      {
        title: "Onboarding tool inventory",
        detail:
          "Give new engineers a mapped view of what their agent can already reach in your environment.",
        audience: "operations",
      },
      {
        title: "Duplicate detection",
        detail:
          "Audit internally-built integrations against the index and retire ones a maintained server now covers.",
        audience: "engineering",
      },
    ],
    categories: ["agent-framework", "learning"],
    audiences: ["engineering", "operations"],
    industries: ["any"],
    difficulty: "plug-in",
    stats: {
      stars: 92024,
      forks: 14244,
      openIssues: 2699,
      language: null,
      license: "MIT",
      createdAt: "2024-11-30",
      pushedAt: "2026-08-03",
    },
    topics: ["ai", "mcp"],
    seoKeywords: [
      "awesome mcp servers github",
      "list of MCP servers",
      "MCP server directory",
      "model context protocol integrations",
      "find MCP server for tool",
    ],
    relatedSlugs: ["chrome-devtools-mcp", "context7", "openwork"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "claude-mem",
    name: "claude-mem",
    repo: "thedotmack/claude-mem",
    owner: "thedotmack",
    url: "https://github.com/thedotmack/claude-mem",
    homepage: "https://claude-mem.ai",
    tagline:
      "Captures what your agent did, compresses it, and injects the relevant parts back into future sessions.",
    whatItDoes: `The daily friction of agent work is re-establishing context. You explained the architecture yesterday; today the agent has no idea.

claude-mem closes that loop mechanically. It captures everything the agent does during a session, compresses it with AI rather than storing raw transcripts, and injects the relevant parts into future sessions. The compression step is what makes it viable — raw session history would blow your context window within days.

It uses ChromaDB and SQLite underneath with embeddings for retrieval, and works across Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, and OpenCode.

Compared with a team memory hub, this is the individual-developer version: lighter to run, focused on session continuity rather than shared organisational knowledge. Apache 2.0, 90,000 stars, documented in over thirty languages.`,
    whoItIsFor: [
      "Individual developers tired of re-explaining the same project context",
      "Anyone working across several projects where context switching is expensive",
      "Teams wanting session continuity without running a memory platform",
      "People who use multiple agent clients and want memory to follow them",
    ],
    useCases: [
      "Resuming a project after two weeks without re-briefing the agent",
      "Keeping context across several concurrent projects",
      "Preserving decisions and their reasoning between sessions",
      "Carrying memory across different agent clients",
      "Avoiding repeated explanation of the same architecture",
    ],
    whenToUse: [
      "You lose meaningful time re-establishing context each session",
      "Your work spans weeks and picking it back up is painful",
      "You switch between agent clients and want continuity",
      "You want compressed memory rather than a growing transcript archive",
    ],
    whenToAvoid: [
      "You need governed team memory rather than individual continuity",
      "Your work is short, self-contained tasks with no continuity requirement",
      "You are uncomfortable with session content being stored and re-injected",
      "You do not want to run a local vector store",
    ],
    automationIdeas: [
      {
        title: "Project context restore",
        detail:
          "Resume a dormant project and have the agent briefed on prior decisions automatically.",
        audience: "engineering",
      },
      {
        title: "Cross-client continuity",
        detail:
          "Move between Claude Code and Codex on the same project without losing accumulated context.",
        audience: "engineering",
      },
      {
        title: "Decision archaeology",
        detail:
          "Ask why an approach was chosen months ago and get the original reasoning rather than a guess.",
        audience: "engineering",
      },
      {
        title: "Multi-project switching",
        detail:
          "Keep separate compressed memories per project so switching does not contaminate context.",
        audience: "operations",
      },
      {
        title: "Handoff briefing",
        detail:
          "Export a project's compressed memory as a written brief when handing work to someone else.",
        audience: "operations",
      },
      {
        title: "Session cost reduction",
        detail:
          "Measure how much context re-establishment cost before and after, in both tokens and minutes.",
        audience: "finance",
      },
      {
        title: "Weekly work summary",
        detail:
          "Generate an accurate summary of what you actually did from captured session history.",
        audience: "founder",
      },
      {
        title: "Memory hygiene review",
        detail:
          "Periodically review stored memories and correct anything that has since become wrong.",
        audience: "operations",
      },
      {
        title: "Onboarding from history",
        detail:
          "Give a new contributor the compressed project memory as a faster route in than reading commits.",
        audience: "operations",
      },
      {
        title: "Context window budgeting",
        detail:
          "Tune how much memory gets injected so continuity does not crowd out working context.",
        audience: "engineering",
      },
    ],
    categories: ["memory-context"],
    audiences: ["engineering", "operations"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 90241,
      forks: 7858,
      openIssues: 392,
      language: "JavaScript",
      license: "Apache-2.0",
      createdAt: "2025-08-31",
      pushedAt: "2026-08-10",
    },
    topics: [
      "ai-memory",
      "chromadb",
      "claude-code",
      "embeddings",
      "long-term-memory",
      "rag",
      "sqlite",
    ],
    seoKeywords: [
      "claude-mem github",
      "persistent memory claude code",
      "AI agent memory across sessions",
      "claude-mem.ai setup",
      "compress agent session context",
    ],
    relatedSlugs: ["mem0", "mempalace", "tencentdb-agent-memory"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "paddleocr",
    name: "PaddleOCR",
    repo: "PaddlePaddle/PaddleOCR",
    owner: "PaddlePaddle",
    url: "https://github.com/PaddlePaddle/PaddleOCR",
    homepage: "https://www.paddleocr.com",
    tagline:
      "Turns PDFs and images into structured JSON or Markdown an LLM can actually use — 100+ languages.",
    whatItDoes: `Every document automation project hits the same wall: the source is a PDF or a scan, and models need structured text. PaddleOCR is the bridge.

It converts PDFs and images into LLM-ready structured data as JSON or Markdown, with document parsing that preserves layout, tables, and key information extraction rather than producing a flat wall of text. That structural fidelity is what separates usable output from output that needs as much cleanup as manual entry would have.

It handles over a hundred languages, is lightweight enough to run without heavy infrastructure, and has been maintained since 2020 — genuinely mature by this catalog's standards.

Apache 2.0, 87,000 stars, and widely used as the ingestion layer underneath RAG pipelines. If you are building document automation, this is very often the first component.`,
    whoItIsFor: [
      "Anyone automating a process where documents arrive as PDFs or scans",
      "Teams building RAG over document archives rather than clean text",
      "Finance and operations teams processing invoices, contracts, or forms",
      "Companies working across languages where English-only OCR fails",
    ],
    useCases: [
      "Extracting structured fields from invoices and receipts at volume",
      "Making a scanned document archive searchable and queryable",
      "Feeding contracts into a review pipeline as structured text",
      "Converting technical PDFs to Markdown for a knowledge base",
      "Processing multilingual documents with one consistent pipeline",
    ],
    whenToUse: [
      "Your inputs are PDFs, scans, or images rather than clean text",
      "Layout and table structure matter to the downstream task",
      "You need coverage beyond English",
      "You want to run extraction locally rather than sending documents to a service",
    ],
    whenToAvoid: [
      "Your documents are already machine-readable text — skip the OCR step",
      "Accuracy requirements are legal-grade and every field needs human verification anyway",
      "Volume is tiny and a hosted API is cheaper than operating this",
      "Your document types are unusual enough that a specialised extractor would do better",
    ],
    automationIdeas: [
      {
        title: "Invoice field extraction",
        detail:
          "Pull vendor, amount, date, and line items from incoming invoices and write them straight into accounting.",
        audience: "finance",
      },
      {
        title: "Contract review intake",
        detail:
          "Convert signed contracts to structured text so a review agent can check terms against your standards.",
        audience: "finance",
      },
      {
        title: "Archive search",
        detail:
          "Make years of scanned documents searchable, turning a filing cabinet into a queryable index.",
        audience: "operations",
      },
      {
        title: "RAG ingestion layer",
        detail:
          "Use it as the front end of a RAG pipeline so PDF-heavy knowledge bases produce clean retrieval.",
        audience: "engineering",
      },
      {
        title: "Form processing",
        detail:
          "Extract submitted form data from scans and route it into the right system without manual entry.",
        audience: "operations",
      },
      {
        title: "Multilingual document pipeline",
        detail:
          "Process documents across markets with one pipeline rather than a different tool per language.",
        audience: "operations",
      },
      {
        title: "Compliance evidence indexing",
        detail:
          "Convert compliance documentation into structured text so auditor questions can be answered quickly.",
        audience: "finance",
      },
      {
        title: "Competitor material analysis",
        detail:
          "Extract text from competitor PDFs and whitepapers to feed a positioning analysis.",
        audience: "marketing",
      },
      {
        title: "Support attachment reading",
        detail:
          "When customers attach screenshots or PDFs, extract the content so triage does not require opening each one.",
        audience: "support",
      },
      {
        title: "Documentation migration",
        detail:
          "Convert a legacy PDF documentation set into Markdown as the first step of a proper docs platform.",
        audience: "operations",
      },
    ],
    categories: ["rag-knowledge", "browser-data"],
    audiences: ["operations", "finance", "engineering", "data"],
    industries: ["fintech", "healthtech", "saas", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 87316,
      forks: 11163,
      openIssues: 226,
      language: "Python",
      license: "Apache-2.0",
      createdAt: "2020-05-08",
      pushedAt: "2026-07-22",
    },
    topics: [
      "document-parsing",
      "kie",
      "ocr",
      "pdf-extractor-rag",
      "pdf-parser",
      "pdf2markdown",
      "rag",
    ],
    seoKeywords: [
      "paddleocr github",
      "PDF to structured data for LLM",
      "open source OCR toolkit",
      "pdf to markdown OCR",
      "document parsing for RAG",
    ],
    relatedSlugs: ["unstract", "ragflow", "book-to-skill"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
];
