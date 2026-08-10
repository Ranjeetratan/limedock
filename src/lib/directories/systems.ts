import type { DirectoryEntry } from "./types";

/**
 * Directory Systems — archived skill architectures.
 * Not exported into the live Directories catalog (Systems hub removed).
 * Kept for reference / possible restore. Live GitHub resources live in
 * `github-resources.ts`.
 */
export const DIRECTORY_SYSTEMS: DirectoryEntry[] = [
  {
    slug: "blogging-content-engine",
    name: "Blogging / Content Engine",
    type: "system",
    summary:
      "End-to-end blog and content system: strategy → draft → anti-slop edit → SEO/GEO → distribution carousels.",
    overview:
      "Architecture stages:\n1) Strategy & angle (content-strategy, product-marketing)\n2) Draft (copywriting, claude-content-writer, emails/social as needed)\n3) Anti-slop pass (stop-slop, no-ai-slop, anti-ai-slop-writing)\n4) SEO / GEO polish (ai-seo, seo-audit, programmatic-seo, schema)\n5) Package for distribution (branded-carousel-generator, social)\n\nSearch “blog” or “blogging tools” should surface this system plus its member skills.",
    categories: ["marketing", "growth", "product"],
    industries: ["saas", "agency", "ecommerce", "other"],
    link: "https://github.com/coreyhaines31/marketingskills",
    installation:
      "Install skills in order (see How to use). Minimum viable pack:\n\n```bash\nnpx skills add coreyhaines31/marketingskills --skill content-strategy\nnpx skills add coreyhaines31/marketingskills --skill copywriting\nnpx skills add hardikpandya/stop-slop\nnpx skills add petergyang/no-ai-slop --skill no-ai-slop --global --yes\nnpx skills add coreyhaines31/marketingskills --skill ai-seo\n```",
    howToUse:
      "**Install order**\n1. `content-strategy` + `product-marketing`\n2. `copywriting` + `claude-content-writer`\n3. `stop-slop` → `no-ai-slop` (or `anti-ai-slop-writing`)\n4. `ai-seo` + `seo-audit` + `schema`\n5. Optional: `programmatic-seo`, `branded-carousel-generator`, `social`, `copy-editing`\n\n**Pipeline:** brief → outline → draft → deslop → SEO pass → publish assets.",
    useCases: [
      "Weekly blog engine for a B2B SaaS",
      "Repurpose one pillar post into LinkedIn carousels",
      "Anti-slop editorial gate before every publish",
      "Programmatic blog/template pages with schema",
    ],
    examplePrompts: [
      "Run the Blogging Content Engine on this keyword cluster: blogging tools for founders.",
      "Draft a 1,500-word post, then stop-slop + no-ai-slop, then ai-seo.",
      "Turn this published blog into a 6-slide branded carousel.",
    ],
    prerequisites: [
      "Brand voice notes or product-marketing context file",
      "Keyword / ICP inputs",
      "CMS or repo path for publish",
    ],
    tips: [
      "Deslop before SEO keyword stuffing — voice first, then optimization.",
      "Keep one anti-slop skill as house style to avoid conflicting bans.",
      "programmatic-seo is for scaled pages; use sparingly on editorial blogs.",
    ],
    sources: [
      "https://github.com/coreyhaines31/marketingskills",
      "https://github.com/hardikpandya/stop-slop",
      "https://github.com/petergyang/no-ai-slop",
    ],
    skillSlugs: [
      "content-strategy",
      "product-marketing",
      "copywriting",
      "claude-content-writer",
      "copy-editing",
      "stop-slop",
      "no-ai-slop",
      "anti-ai-slop-writing",
      "preserve-my-voice",
      "ai-seo",
      "seo-audit",
      "schema",
      "programmatic-seo",
      "branded-carousel-generator",
      "social",
      "emails",
    ],
  },
  {
    slug: "growth-experimentation-system",
    name: "Growth Experimentation System",
    type: "system",
    summary:
      "Hypothesis → ICE backlog → flag/experiment → analyze → compound learnings — wired for GrowthBook + marketing experiment skills.",
    overview:
      "Pipeline stages:\n1) Ideation (growth-marketing-innovation, marketing-ideas, cro)\n2) Experiment design (ab-testing, analytics)\n3) Ship & measure (growthbook-skills, onboarding/signup/popups surfaces)\n4) Decide & document (analytics, marketing-loops)\n\nInspired by GrowthBook’s agent-native lifecycle and classic growth-loop compounding.",
    categories: ["growth", "marketing", "product", "engineering"],
    industries: ["saas", "ecommerce", "marketplace", "other"],
    link: "https://www.growthbook.io/platform/ai-native-development",
    installation:
      "```bash\nnpx skills add coreyhaines31/marketingskills --skill ab-testing\nnpx skills add coreyhaines31/marketingskills --skill cro\nnpx skills add coreyhaines31/marketingskills --skill analytics\nnpx skills add growthbook/skills\n# optional MCP\nnpx -y @growthbook/mcp@latest\n```",
    howToUse:
      "**Install order:** `analytics` → `ab-testing` → `cro` → `growthbook-skills` → surface skills (`onboarding`, `signup`, `popups`).\n\n1. Generate ICE backlog\n2. Lock hypothesis + sample size\n3. Create flag + experiment in GrowthBook from the editor\n4. Analyze; ship winner; archive stale flags\n5. Write the learning into a playbook entry",
    useCases: [
      "Weekly experimentation cadence for a growth team",
      "Agent-assisted flag + experiment creation",
      "CRO backlog with statistical guardrails",
      "Stale flag cleanup after rapid AI shipping",
    ],
    examplePrompts: [
      "Build a 20-hypothesis ICE backlog for trial-to-paid, then design the top test in GrowthBook.",
      "Create flag `checkout-simplify` and an A/B experiment with our metric defaults.",
      "Summarize last 5 experiments and propose the next three tests.",
    ],
    prerequisites: [
      "GrowthBook (or equivalent) + analytics baseline",
      "Ability to ship UI/flag changes",
      "Traffic reality check for sample size",
    ],
    tips: [
      "Design offline with ab-testing; execute with GrowthBook.",
      "One primary metric; peeking kills validity.",
      "Sources include GrowthBook MCP docs and AI-native development guides.",
    ],
    sources: [
      "https://www.growthbook.io/platform/mcp-server",
      "https://docs.growthbook.io/integrations/mcp",
      "https://www.growthbook.io/platform/ai-native-development",
      "https://github.com/growthbook/growthbook/blob/main/CLAUDE.md",
      "https://github.com/growthbook/skills",
    ],
    skillSlugs: [
      "ab-testing",
      "cro",
      "analytics",
      "growthbook-skills",
      "growth-marketing-innovation",
      "marketing-ideas",
      "marketing-loops",
      "onboarding",
      "signup",
      "popups",
      "free-tools",
    ],
  },
  {
    slug: "product-led-growth-system",
    name: "Product-Led Growth System",
    type: "system",
    summary:
      "PLG architecture: activation & aha moments, self-serve conversion, referrals/free tools, and nested product loops.",
    overview:
      "Stages:\n1) Define activation (plg-strategy, onboarding, product-marketing)\n2) Instrument (analytics, growthbook-skills)\n3) Self-serve surfaces (free-tools, signup, in-product upgrade UX)\n4) Loops (referrals, marketing-loops; Balfour-style nested loops as strategy input)\n5) Expand (business-growth-skills CS/expansion plays)\n\nUse when growth should come from the product, not only paid/sales.",
    categories: ["growth", "product", "marketing"],
    industries: ["saas", "marketplace", "other"],
    link: "https://mcpmarket.com/tools/skills/growth-strategy-product-led-growth",
    installation:
      "Install `plg-strategy`, `onboarding`, `analytics`, `free-tools`, `referrals`, then `growthbook-skills` for experiments on activation surfaces.",
    howToUse:
      "**Install order:** plg-strategy → product-marketing → onboarding → analytics → free-tools/referrals → growthbook-skills → business-growth-skills (expansion).\n\nMap signup → activated → paid → expanded; attach one experiment per leaky stage.",
    useCases: [
      "Design freemium activation for a new SaaS",
      "Nested loops inside user-created artifacts/apps",
      "Trial-to-paid product fixes before buying more ads",
      "Referral + free-tool loop design",
    ],
    examplePrompts: [
      "Design our PLG activation checklist and three experiments to improve time-to-value.",
      "Propose nested growth loops for an in-product AI app feature (Claude-style sharing constraints as analogy).",
      "Where should referrals and free tools attach to our current funnel?",
    ],
    prerequisites: [
      "Packaging model (free/trial/paid)",
      "Funnel metrics, even approximate",
      "Product engineering capacity for in-product changes",
    ],
    tips: [
      "Read Balfour’s Claude apps growth-loop essay as strategy context.",
      "Don’t confuse vibe-coded demos with durable PLG instrumentation.",
    ],
    sources: [
      "https://mcpmarket.com/tools/skills/growth-strategy-product-led-growth",
      "https://blog.brianbalfour.com/p/how-claude-is-building-a-unique-growth",
      "https://www.linkedin.com/pulse/quiet-giant-explosive-growth-claude-ai-mathialagan-p-gkcjc/",
      "https://github.com/anthropics/skills/issues/626",
    ],
    skillSlugs: [
      "plg-strategy",
      "onboarding",
      "product-marketing",
      "analytics",
      "free-tools",
      "referrals",
      "signup",
      "growthbook-skills",
      "ab-testing",
      "business-growth-skills",
      "marketing-loops",
      "churn-prevention",
    ],
  },
  {
    slug: "sales-outreach-system",
    name: "Sales Outreach System",
    type: "system",
    summary:
      "Research → personalization → cold email/sequences → ads assist → RevOps feedback loop.",
    overview:
      "Stages:\n1) Account/lead research (lead-research-assistant, competitor-profiling)\n2) Copy (cold-email, copywriting, stop-slop)\n3) Amplify (ads, social)\n4) Commercial ops (business-growth-skills sales-engineer / revops)",
    categories: ["sales", "marketing", "growth"],
    industries: ["saas", "agency", "fintech", "other"],
    link: "https://github.com/coreyhaines31/marketingskills",
    installation:
      "Install `lead-research-assistant`, `cold-email`, `copywriting`, `stop-slop`, then `ads` and `business-growth-skills`.",
    howToUse:
      "**Install order:** lead-research-assistant → competitor-profiling → cold-email → copywriting → stop-slop → ads → business-growth-skills.\n\nResearch each account before sequencing; deslop every outbound draft.",
    useCases: [
      "Outbound sequences for ICP accounts",
      "RFP / SE support with competitive matrices",
      "Paid + outbound message consistency",
    ],
    examplePrompts: [
      "Research these 10 accounts, then draft cold emails with stop-slop.",
      "Build a competitive matrix for this RFP using Business Growth Skills.",
    ],
    prerequisites: [
      "ICP definition and offer",
      "CRM / sequencing tool",
      "Compliance awareness for outbound",
    ],
    tips: [
      "Personalization > volume; research skill first.",
      "Keep anti-slop on outbound — buyers smell AI templates.",
    ],
    sources: [
      "https://www.claudedirectory.org/skills/claude-skills-business-growth-skills",
    ],
    skillSlugs: [
      "lead-research-assistant",
      "cold-email",
      "copywriting",
      "stop-slop",
      "no-ai-slop",
      "ads",
      "social",
      "competitor-profiling",
      "competitors",
      "business-growth-skills",
      "emails",
    ],
  },
  {
    slug: "brand-creative-system",
    name: "Brand & Creative System",
    type: "system",
    summary:
      "Brand rules → taste/anti-slop design → frontend implementation → content polish.",
    overview:
      "Stages:\n1) Brand foundation (brand-guidelines, brand-build-skills)\n2) Direction (taste-skill, hallmark, impeccable)\n3) Build (frontend-design, design-loop)\n4) Copy polish (stop-slop, anti-slop, preserve-my-voice)",
    categories: ["design", "marketing", "product"],
    industries: ["saas", "agency", "ecommerce", "other"],
    link: "https://github.com/nutlope/hallmark",
    installation:
      "```bash\nnpx skills add nutlope/hallmark\nnpx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend\nnpx skills add pbakaus/impeccable\nnpx skills add hardikpandya/stop-slop\n```",
    howToUse:
      "**Install order:** brand-guidelines → taste-skill → hallmark/impeccable → frontend-design → design-loop → stop-slop/anti-slop.\n\nLock brand, set taste dials, generate UI with Hallmark gates, implement, then deslop copy.",
    useCases: [
      "Marketing site that doesn’t look AI-generic",
      "Brand-consistent campaign pages",
      "Creative QA with 57 Hallmark slop gates",
    ],
    examplePrompts: [
      "Use Brand & Creative System: Hallmark a landing page, then stop-slop the hero copy.",
      "Set Taste Skill dials for a calm fintech brand, then frontend-design the pricing page.",
    ],
    prerequisites: [
      "Brand assets or guidelines",
      "Frontend repo access",
    ],
    tips: [
      "Hallmark/Taste for visuals; Stop Slop for words — both are “anti-slop.”",
      "taste-skill already in catalog — update install to Leonxlnx if upgrading to v2.",
    ],
    sources: [
      "https://github.com/nutlope/hallmark",
      "https://www.tasteskill.dev/",
      "https://impeccable.style/",
    ],
    skillSlugs: [
      "brand-guidelines",
      "brand-build-skills",
      "brand-applicator",
      "taste-skill",
      "hallmark",
      "impeccable",
      "frontend-design",
      "design-loop",
      "anti-slop",
      "anti-ai-slop",
      "stop-slop",
      "preserve-my-voice",
      "canvas-design",
    ],
  },
  {
    slug: "seo-geo-system",
    name: "SEO / GEO System",
    type: "system",
    summary:
      "Technical SEO + AI-search (GEO) system: audit → on-page → programmatic → schema → content.",
    overview:
      "Stages:\n1) Audit (seo-audit, claude-seo)\n2) AI search / GEO (ai-seo, geo-seo-claude, ultimate-seo-geo)\n3) Scale (programmatic-seo, directory-submissions)\n4) Structure (schema)\n5) Content engine handoff (copywriting, content-strategy)",
    categories: ["marketing", "growth", "product"],
    industries: ["saas", "ecommerce", "marketplace", "agency", "other"],
    link: "https://github.com/coreyhaines31/marketingskills",
    installation:
      "Install `seo-audit`, `ai-seo`, `schema`, `programmatic-seo`, plus one GEO pack (`geo-seo-claude` or `ultimate-seo-geo`).",
    howToUse:
      "**Install order:** seo-audit → ai-seo → schema → programmatic-seo → geo pack → content-strategy.\n\nAudit first; only then generate pages. GEO skills after classic SEO foundations.",
    useCases: [
      "Site-wide SEO audit with fix list",
      "GEO optimization for LLM citations",
      "Programmatic landing page systems",
    ],
    examplePrompts: [
      "Run SEO/GEO System on limedock.com/directories — audit, schema gaps, GEO opportunities.",
      "Design programmatic pages for skill categories with indexation guardrails.",
    ],
    prerequisites: [
      "Search Console / analytics access preferred",
      "Ability to ship metadata and content changes",
    ],
    tips: [
      "Don’t generate 1,000 pages before crawl budget sanity.",
      "Pair with Blogging Content Engine for editorial quality.",
    ],
    sources: [
      "https://github.com/coreyhaines31/marketingskills",
    ],
    skillSlugs: [
      "seo-audit",
      "ai-seo",
      "claude-seo",
      "schema",
      "programmatic-seo",
      "geo-seo-claude",
      "seo-geo-claude-skills",
      "ultimate-seo-geo",
      "directory-submissions",
      "content-strategy",
      "copywriting",
    ],
  },
  {
    slug: "design-production-system",
    name: "Design Production System",
    type: "system",
    summary:
      "Spec → IA/tokens → UI build → motion/a11y → review — production design ops with agent skills.",
    overview:
      "Stages:\n1) Process (design-process-pack, designer-skills)\n2) Systems (extract-design-system, web-design-guidelines)\n3) Build (frontend-design, implement-design, design-elevation)\n4) Quality (accesslint-refactor, impeccable, hallmark)",
    categories: ["design", "product", "engineering"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
    installation:
      "Install design-process-pack references, frontend-design, impeccable/hallmark, and accesslint-refactor for a11y passes.",
    howToUse:
      "**Install order:** design-process-pack → brand/taste → frontend-design → implement-design → accesslint-refactor → hallmark audit.\n\nGrill requirements before pixels; finish with Playwright/a11y when available.",
    useCases: [
      "Spec-first feature UI",
      "Design system extraction from code",
      "A11y + anti-slop visual QA",
    ],
    examplePrompts: [
      "Run Design Production System for a new settings IA → tokens → UI → a11y.",
      "hallmark audit the marketing page, then accesslint-refactor components.",
    ],
    prerequisites: [
      "Design or product brief",
      "Frontend codebase",
    ],
    tips: [
      "Process pack before Frontend Design prevents vibe-only UI.",
    ],
    sources: [
      "https://composio.dev/content/top-design-skills",
    ],
    skillSlugs: [
      "design-process-pack",
      "designer-skills",
      "frontend-design",
      "implement-design",
      "design-elevation",
      "web-design-guidelines",
      "impeccable",
      "hallmark",
      "taste-skill",
      "accesslint-refactor",
      "accesslint-reviewer",
      "motion-design",
    ],
  },
  {
    slug: "product-launch-system",
    name: "Product Launch System",
    type: "system",
    summary:
      "Launch architecture: narrative → assets → SEO/social → onboarding → experiment readout.",
    overview:
      "Stages:\n1) Story (launch, product-marketing, copywriting)\n2) Assets (pptx, branded-carousel, canvas-design)\n3) Distribution (social, emails, ads, directory-submissions)\n4) Activate (onboarding, signup)\n5) Learn (analytics, ab-testing)",
    categories: ["product", "marketing", "growth"],
    industries: ["saas", "marketplace", "other"],
    link: "https://github.com/coreyhaines31/marketingskills",
    installation:
      "Install `launch`, `product-marketing`, `copywriting`, `stop-slop`, `onboarding`, `analytics`.",
    howToUse:
      "**Install order:** product-marketing → launch → copywriting → stop-slop → social/emails → onboarding → analytics.\n\nFreeze messaging, deslop all public copy, ship onboarding experiments in week one.",
    useCases: [
      "Feature launch weeks",
      "GTM package for a new SKU",
      "Post-launch experiment plan",
    ],
    examplePrompts: [
      "Run Product Launch System for our Directories Systems feature.",
      "Draft launch email + LinkedIn + changelog; stop-slop everything.",
    ],
    prerequisites: [
      "Ship date and audience",
      "Product screenshots / demo",
    ],
    tips: [
      "Launch skill for narrative; analytics for the week-after plan.",
    ],
    sources: [
      "https://github.com/coreyhaines31/marketingskills",
    ],
    skillSlugs: [
      "launch",
      "product-marketing",
      "copywriting",
      "stop-slop",
      "no-ai-slop",
      "social",
      "emails",
      "ads",
      "pptx",
      "branded-carousel-generator",
      "onboarding",
      "analytics",
      "ab-testing",
      "directory-submissions",
    ],
  },
  {
    slug: "ops-internal-comms-system",
    name: "Ops / Internal Comms System",
    type: "system",
    summary:
      "Internal operations system: Notion/Obsidian/Asana/Atlassian workflows plus clear, de-slopped comms.",
    overview:
      "Stages:\n1) Knowledge home (notion-skills, obsidian-skills)\n2) Work tracking (asana-skills, atlassian-skills)\n3) Comms quality (stop-slop, no-ai-slop, preserve-my-voice)\n4) Optional connectors (composio-connect-apps)",
    categories: ["operations", "product", "other"],
    industries: ["saas", "agency", "other"],
    link: "https://www.notion.so",
    installation:
      "Enable Notion/Atlassian/Asana skills + connectors, then add one anti-slop writing skill for memos and updates.",
    howToUse:
      "**Install order:** notion-skills or obsidian-skills → asana/atlassian → stop-slop → composio-connect-apps.\n\nWrite updates in the wiki; deslop before company-wide send.",
    useCases: [
      "Weekly internal updates without AI tone",
      "Sprint/ticket workflows from chat",
      "Personal + team knowledge bases",
    ],
    examplePrompts: [
      "Draft the all-hands update in Notion, then stop-slop it.",
      "Create Jira tickets from this meeting notes dump.",
    ],
    prerequisites: [
      "Workspace connectors authorized",
      "Clear owner for each knowledge surface",
    ],
    tips: [
      "One source of truth — don’t dual-write Notion and Obsidian without a rule.",
    ],
    sources: [],
    skillSlugs: [
      "notion-skills",
      "obsidian-skills",
      "asana-skills",
      "atlassian-skills",
      "stop-slop",
      "no-ai-slop",
      "preserve-my-voice",
      "composio-connect-apps",
      "self-improving-knowledge-system",
    ],
  },
  {
    slug: "engineering-quality-system",
    name: "Engineering Quality System",
    type: "system",
    summary:
      "Plan → implement → simplify/deslop → review → verify — quality loop for agent-assisted coding.",
    overview:
      "Stages:\n1) Plan (superpowers, planning-with-files)\n2) Build (react-best-practices, batch/loop as needed)\n3) Simplify (code-simplifier, simplify, ai-slop-cleaner)\n4) Review (sentry-code-review, accesslint-reviewer)\n5) Safe execution (agent-sandbox)",
    categories: ["engineering", "product"],
    industries: ["saas", "fintech", "other"],
    link: "https://github.com/obra/superpowers",
    installation:
      "Install `superpowers` or `planning-with-files`, then `code-simplifier` / `ai-slop-cleaner`, plus review agents you already use.",
    howToUse:
      "**Install order:** planning-with-files/superpowers → implementation skills → ai-slop-cleaner/code-simplifier → sentry-code-review → agent-sandbox for risky runs.\n\nNever skip verification after deslop.",
    useCases: [
      "Agent-assisted feature work with cleanup gate",
      "PR review with Sentry context",
      "Deletion-first cleanup of AI-generated code",
    ],
    examplePrompts: [
      "Plan this feature with planning-with-files, implement, then ai-slop-cleaner on changed files.",
      "Simplify this module without behavior changes; show verification.",
    ],
    prerequisites: [
      "Test/lint commands for the repo",
      "CI or local verification habit",
    ],
    tips: [
      "ai-slop-cleaner is for code; stop-slop is for prose — don’t confuse them.",
      "Comparisons (Cursor vs Claude Code vs Codex) inform tool choice, not skill order.",
    ],
    sources: [
      "https://thenewstack.io/claude-code-vs-cursor-vs-codex-vs-antigravity-2026/",
      "https://buildwithclaude.com/skill/ai-slop-cleaner",
      "https://cheesecakelabs.com/blog/using-cursor-and-claude/",
      "https://codeaholicguy.com/2026/01/10/claude-code-vs-cursor/",
    ],
    skillSlugs: [
      "superpowers",
      "planning-with-files",
      "code-simplifier",
      "simplify",
      "ai-slop-cleaner",
      "react-best-practices",
      "sentry-code-review",
      "agent-sandbox",
      "batch",
      "loop",
      "anti-slop",
    ],
  },
  {
    slug: "engineering-memory-architecture-system",
    name: "Engineering Memory & Architecture System",
    type: "system",
    summary:
      "Persistent memory + file knowledge graph + harness config unification so agents compound instead of cold-starting.",
    overview:
      "Stages:\n1) Durable files (self-improving-knowledge-system, CLAUDE.md / rules)\n2) Automatic memory (claude-mem)\n3) Planning artifacts (planning-with-files, site-architecture)\n4) Cross-tool config (unified Cursor + Claude setups — see sources)\n\nAddresses the core lesson from 2026 memory-architecture essays: models are stateless; memory is an engineered layer.",
    categories: ["engineering", "product", "operations"],
    industries: ["saas", "other"],
    link: "https://docs.claude-mem.ai/cursor",
    installation:
      "```bash\n# Memory\ngit clone https://github.com/thedotmack/claude-mem.git\ncd claude-mem && bun install && bun run build && bun run cursor:setup\n\n# Knowledge graph: scaffold CLAUDE.md + knowledge/INDEX.md (Product Compass pattern)\n# Planning\nnpx skills add ... planning-with-files  # use catalog install for planning-with-files\n```",
    howToUse:
      "**Install order:** self-improving-knowledge-system scaffold → claude-mem → planning-with-files → site-architecture.\n\nCurated files = source of truth; claude-mem = capture layer. Don’t dump entire chats into prompts (Tier-1 memory).",
    useCases: [
      "Multi-week features without re-explaining decisions",
      "PM/eng shared knowledge graph",
      "Cursor + Claude Code dual-harness teams",
    ],
    examplePrompts: [
      "Scaffold a self-improving knowledge system for this repo, then connect claude-mem.",
      "What did we decide about auth last week? Check memory + knowledge/.",
    ],
    prerequisites: [
      "Bun for claude-mem worker",
      "Git repo for knowledge files",
      "Team agreement on what is curated vs auto-captured",
    ],
    tips: [
      "Progressive disclosure beats stuffing the context window.",
      "Unify .cursorrules / CLAUDE.md carefully — one brain, many surfaces.",
    ],
    sources: [
      "https://docs.claude-mem.ai/cursor",
      "https://www.productcompass.pm/p/self-improving-claude-system",
      "https://nexustrade.io/blog/cursor-vs-claude-code-memory-architecture-20260413",
      "https://dev.to/austin_starks/cursor-beats-claude-code-heres-the-memory-architecture-that-proves-it-e1",
      "https://getcandlekeep.com/marketplace/inside-claude-code-the-architecture-64zz28",
      "https://www.keboca.com/articles/cursorrules-ai-how-i-unified-my-cursor-and-claude-config-one-place",
      "https://www.fourzerothree.in/p/cursor-setup-workflow",
      "https://www.spacecake.ai/blog/cursor-claude-integration-guide",
      "https://www.datacamp.com/tutorial/claude-code-in-cursor",
      "https://rajsarkar.substack.com/p/part-4-cursor-vs-claude-code-two",
    ],
    skillSlugs: [
      "claude-mem",
      "self-improving-knowledge-system",
      "planning-with-files",
      "site-architecture",
      "superpowers",
      "developer-growth-analytics",
      "excalidraw-diagram",
    ],
  },
  {
    slug: "architecture-diagramming-system",
    name: "Architecture Diagramming System",
    type: "system",
    summary:
      "Choose the right diagram skill: Excalidraw for speed, Draw.io/AWS for production infra, PlantUML for git-native UML.",
    overview:
      "Stages:\n1) Whiteboard (excalidraw-diagram, ccc-excalidraw-pack)\n2) Cloud topology (aws-cloud-diagrams, drawio-diagrams)\n3) Sequences/UML (plantuml-diagrams)\n4) Optional site/system maps (site-architecture, excalidraw in memory system)\n\nMatches the “top 4 architecture skills” roundup pattern.",
    categories: ["engineering", "product", "design"],
    industries: ["saas", "fintech", "education", "other"],
    link: "https://medium.com/@shahsoumil519/top-4-claude-code-cursor-skills-for-architecture-diagrams-aws-designs-and-flowcharts-931509ad09c5",
    installation:
      "Install Excalidraw skill first; add AWS Cloud Diagrams + Graphviz for infra; PlantUML CLI for sequences; Draw.io skill when stakeholders need editable files.",
    howToUse:
      "**Install order:** excalidraw-diagram → aws-cloud-diagrams → plantuml-diagrams → drawio-diagrams.\n\nBrainstorm in Excalidraw → promote stable views to PlantUML/Draw.io/AWS diagrams.",
    useCases: [
      "Design review packs",
      "AWS pipeline documentation",
      "Sequence diagrams in PRs",
    ],
    examplePrompts: [
      "Whiteboard this feature in Excalidraw, then emit PlantUML sequences and an AWS diagram.",
      "Create a Draw.io context diagram for our multi-tenant SaaS.",
    ],
    prerequisites: [
      "Graphviz for AWS diagrams",
      "PlantUML toolchain for .puml render",
    ],
    tips: [
      "Don’t start in Draw.io for messy discovery — Excalidraw first.",
    ],
    sources: [
      "https://medium.com/@shahsoumil519/top-4-claude-code-cursor-skills-for-architecture-diagrams-aws-designs-and-flowcharts-931509ad09c5",
      "https://www.reddit.com/r/ClaudeCode/comments/1ox9k0a/how_i_design_software_architecture/",
    ],
    skillSlugs: [
      "excalidraw-diagram",
      "ccc-excalidraw-pack",
      "aws-cloud-diagrams",
      "plantuml-diagrams",
      "drawio-diagrams",
      "site-architecture",
    ],
  },
  {
    slug: "real-estate-listing-lead-engine",
    name: "Real Estate Listing & Lead Engine",
    type: "system",
    summary:
      "End-to-end agent stack: qualify leads → listing copy → Fair Housing gate → CMA/consult prep → follow-up → optional CRM/IDX wiring.",
    overview:
      "Architecture stages:\n1) Capture & qualify (lead-qualifier-agent, follow-up-boss / idx-broker / sierra-interactive)\n2) Listing engine (property-listing → fair-housing-overlay / re-compliance-qa)\n3) Win the appointment (comparative-market-analysis, neighborhood-guide-creator, buyer-consultation-prep)\n4) Relationship loop (client-follow-up-scheduler, monthly-market-update)\n5) Transaction support (contract-terms-analyzer, disclosure-review)\n6) Investor track (property-investment-analysis, real-assets, rentcast)\n\nInstall the NextAutomation or Prosperity pack first for fastest start, then add CRM skills.",
    categories: ["sales", "marketing", "operations"],
    industries: ["real-estate", "agency", "marketplace", "other"],
    link: "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
    installation:
      "Minimum viable pack:\n\n```bash\nnpx skills add mohitagw15856/pm-claude-skills --skill property-listing\nnpx skills add mohitagw15856/pm-claude-skills --skill comparative-market-analysis\n/plugin marketplace add TheProsperityAgent/prosperity-real-estate-skills\n/plugin install real-estate-skills@prosperity-real-estate-skills\n```\n\nPlus download NextAutomation Lead Qualifier + Follow-Up templates. Optional CRM:\n```bash\nnpx skills add membranedev/application-skills --skill follow-up-boss\n```",
    howToUse:
      "**Install order**\n1. fair-housing-overlay (gate)\n2. lead-qualifier-agent + property-listing\n3. comparative-market-analysis + buyer-consultation-prep\n4. client-follow-up-scheduler\n5. contract-terms-analyzer / disclosure-review\n6. CRM skills (follow-up-boss, idx-broker) when ready\n\n**Pipeline:** inbound lead → qualify → first reply → listing/CMA assets → compliance QA → nurture → contract triage.",
    useCases: [
      "Solo agent replacing VA listing + follow-up work",
      "Brokerage pilot: 5 agents, listing + Fair Housing gate first",
      "Investor-desk add-on with property-investment-analysis",
      "IDX/CRM connected speed-to-lead",
    ],
    examplePrompts: [
      "Run the Real Estate Listing & Lead Engine on this inbound lead and MLS sheet — qualify, draft listing variants, Fair Housing gate, then a 5-touch follow-up.",
      "Prep a listing appointment: CMA + neighborhood guide + consultation talking points.",
    ],
    prerequisites: [
      "Claude Skills / Claude Code",
      "Brokerage Fair Housing and advertising policy",
      "MLS facts / lead text for real inputs",
      "Human review before send/publish",
    ],
    tips: [
      "Ship Fair Housing Overlay before scaling marketing skills.",
      "Pick one listing skill (property-listing OR Prosperity listing-description) to avoid voice conflicts.",
      "CRM writes need dry-run reads first.",
      "Commercial teams should add pp-loopnet + real-assets / cre-underwriting-skills.",
    ],
    sources: [
      "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
      "https://nextautomation.us/blog/claude-skills-for-real-estate-complete-guide",
      "https://theprosperityagent.com/2026/06/15-claude-skills-for-real-estate-agents/",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
      "https://claudeskills.info/skills/category/real-estate/",
      "https://tristanahumada.substack.com/p/how-5-claude-skills-replaced-2000",
    ],
    skillSlugs: [
      "nextautomation-real-estate-skills",
      "prosperity-real-estate-skills",
      "lead-qualifier-agent",
      "property-listing",
      "fair-housing-overlay",
      "re-compliance-qa",
      "comparative-market-analysis",
      "neighborhood-guide-creator",
      "buyer-consultation-prep",
      "client-follow-up-scheduler",
      "monthly-market-update",
      "contract-terms-analyzer",
      "disclosure-review",
      "property-investment-analysis",
      "real-assets",
      "follow-up-boss",
      "idx-broker",
      "connect-mls-to-claude",
      "rentcast",
    ],
  },
];
