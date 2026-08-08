import type { DirectoryEntry } from "./types";

/**
 * Growth, PLG, memory, and architecture skills from 2026 roundups.
 * Deduped against existing catalog (ab-testing, cro, analytics, excalidraw, etc.).
 */
export const GROWTH_ARCHITECTURE_SKILLS: DirectoryEntry[] = [
  {
    slug: "growthbook-skills",
    name: "GrowthBook Skills + MCP",
    type: "skill",
    summary:
      "Official GrowthBook agent skills and MCP server — create flags, run experiments, conclude winners, and clean stale flags from Claude Code, Cursor, or VS Code.",
    overview:
      "GrowthBook’s agent-native surface lets coding agents operate the full feature-flag and experimentation lifecycle without leaving the editor. Install `growthbook/skills` for REST-backed playbooks (setup, flag revisions, review, publish, cleanup, experiments) or connect `@growthbook/mcp` for tool calling.\n\nSame permissions, approvals, and audit logs as the GrowthBook app. Pairs with A/B Testing Frameworks and Analytics skills for hypothesis design plus warehouse-native measurement.",
    categories: ["growth", "product", "engineering"],
    industries: ["saas", "ecommerce", "marketplace", "other"],
    link: "https://github.com/growthbook/skills",
    installation:
      "```bash\n# Agent skills (REST helper, no MCP required)\nnpx skills add growthbook/skills\n\n# MCP server (Cursor / VS Code / Claude Code)\nnpx -y @growthbook/mcp@latest\n```\n\nClaude Code MCP:\n```bash\nclaude mcp add growthbook --transport stdio \\\n  --env GB_API_KEY=YOUR_API_KEY \\\n  --env GB_EMAIL=YOUR_EMAIL \\\n  -- npx -y @growthbook/mcp@latest\n```\n\nRequires a GrowthBook API key (Settings → API Keys). Optional: `GB_API_URL` / `GB_APP_ORIGIN` for self-hosted.",
    howToUse:
      "1. Run `gb-setup` (or set env vars) so the agent can reach your instance.\n2. Ask to create a flag, wrap a UI surface, or draft an experiment from org defaults.\n3. Use revision skills for draft → review → publish.\n4. Query experiment summaries; ship winners; run stale-flag cleanup.\n5. Keep humans in the approval path for production environments.",
    useCases: [
      "Create a boolean flag and wrap a checkout CTA from the editor",
      "Spin up an A/B test linked to a feature flag with metric defaults",
      "Summarize last N experiment results without leaving Cursor",
      "Find and archive stale flags after a cleanup sprint",
      "Ramp a search-ranking flag from 1% → 100% over two weeks",
    ],
    examplePrompts: [
      "Create a boolean feature flag `new-checkout-flow` that defaults to false and wrap the pricing CTA.",
      "Create an A/B test on `new-checkout-flow` with control false and treatment true using our defaults.",
      "Summarize the results of my last 5 GrowthBook experiments.",
      "Show me which feature flags are stale right now and propose cleanup.",
    ],
    prerequisites: [
      "GrowthBook Cloud or self-hosted instance + API key",
      "Claude Code, Cursor, VS Code Copilot, or Codex with MCP/skills support",
      "Node.js for `npx` MCP install",
      "Permission model: use a PAT scoped to what the agent should touch",
    ],
    tips: [
      "Skills call the REST API via a bundled helper; MCP is optional but nicer for interactive tool use.",
      "Self-hosted: set GB_API_URL / GB_APP_ORIGIN; use GB_HTTP_HEADER_* behind Cloudflare Access.",
      "Pair with `ab-testing` for hypothesis/sample-size design before creating experiments.",
      "Agent actions inherit the same RBAC and approval workflows as humans.",
    ],
    sources: [
      "https://github.com/growthbook/skills",
      "https://github.com/growthbook/growthbook/blob/main/CLAUDE.md",
      "https://www.growthbook.io/platform/mcp-server",
      "https://docs.growthbook.io/integrations/mcp",
      "https://www.growthbook.io/platform/ai-native-development",
    ],
  },
  {
    slug: "business-growth-skills",
    name: "Business Growth Skills",
    type: "skill",
    summary:
      "Router pack (alirezarezvani) for customer success, sales engineering, revenue operations, and contract/proposal writing — four growth GTM skills with Python scorers.",
    overview:
      "Business Growth Skills is the `business-growth-skills` plugin from alirezarezvani/claude-skills. A router matches request signals to one of four skills: customer-success-manager (health scoring, churn risk, expansion), sales-engineer (RFP analysis, competitive matrices, PoC planning), revenue-operations (pipeline, forecast MAPE, GTM efficiency), and contract-and-proposal-writer (proposals, SOWs, DPAs).\n\nEach skill ships stdlib-only Python helpers (e.g. health_score_calculator). Deal/contract outputs are drafts for human legal/commercial review.",
    categories: ["growth", "sales", "operations", "product"],
    industries: ["saas", "agency", "fintech", "other"],
    link: "https://www.claudedirectory.org/skills/claude-skills-business-growth-skills",
    installation:
      "```bash\n/plugin marketplace add alirezarezvani/claude-skills\n/plugin install business-growth-skills@claude-code-skills\n```\n\nOr clone and copy `business-growth/skills/*` into `~/.claude/skills/`.\n\nCodex: `npx agent-skills-cli add alirezarezvani/claude-skills --agent codex`",
    howToUse:
      "Describe the GTM task; the router loads exactly one skill. Prefer the skill’s Python scorers over manual estimates. Escalate contracts to legal before send.",
    useCases: [
      "Score account health and churn risk for CS QBR prep",
      "Build an RFP coverage matrix and PoC plan",
      "Audit pipeline coverage and forecast accuracy",
      "Draft a SaaS MSA / SOW for commercial review",
      "Route mixed GTM asks without loading all four skills",
    ],
    examplePrompts: [
      "Use Business Growth Skills — score churn risk for these 12 accounts and propose expansion plays.",
      "Route to sales-engineer: analyze this RFP and draft a competitive PoC plan.",
      "RevOps: compute pipeline coverage and MAPE for our current forecast.",
      "Draft an SOW for a 90-day implementation; mark legal review required.",
    ],
    prerequisites: [
      "Claude Code plugin marketplace or manual skill install",
      "Python 3 for bundled scorers",
      "CRM / pipeline data for RevOps and CS workflows",
    ],
    tips: [
      "Router rule: exactly one skill per request — clarify if signals conflict.",
      "Also listed under Claude Directory as Business Growth Skills.",
      "Pairs with cold-email and lead-research-assistant for top-of-funnel.",
    ],
    sources: [
      "https://www.claudedirectory.org/skills/claude-skills-business-growth-skills",
      "https://github.com/alirezarezvani/claude-skills",
    ],
  },
  {
    slug: "plg-strategy",
    name: "PLG Strategy (Product-Led Growth)",
    type: "skill",
    summary:
      "Product-led growth strategy skill for activation, aha moments, self-serve conversion, expansion loops, and PLG metrics — listed on MCP Market as Growth Strategy / Product-Led Growth.",
    overview:
      "PLG Strategy focuses agent work on product-led motions: time-to-value, activation checklists, upgrade triggers, viral/content loops inside the product, and the metric stack (signup → activated → paid → expanded). Use it when designing onboarding, freemium/free-trial packaging, in-product upgrade UX, or PLG experiment backlogs.\n\nComplements GrowthBook for shipping experiments and Onboarding / Free Tools / Referrals skills for specific surfaces.",
    categories: ["growth", "product", "marketing"],
    industries: ["saas", "marketplace", "other"],
    link: "https://mcpmarket.com/tools/skills/growth-strategy-product-led-growth",
    installation:
      "Install from the MCP Market skill card (Growth Strategy / Product-Led Growth):\n\n```bash\n# Follow the card’s listed command, typically:\nnpx skills add <publisher/plg-or-growth-strategy-repo>\n```\n\nIf the card exposes a GitHub path, clone that skill folder into `~/.claude/skills/plg-strategy`.",
    howToUse:
      "Share ICP, current funnel metrics, packaging (free/trial/paid), and product surface. Ask for activation definition, aha-moment design, upgrade triggers, and an ICE-ranked PLG experiment backlog.",
    useCases: [
      "Define activation and aha-moment for a new PLG SaaS",
      "Design freemium → paid upgrade triggers in-product",
      "Build a PLG experiment backlog tied to North Star metrics",
      "Diagnose trial-to-paid drop-off with product fixes (not just ads)",
      "Map nested growth loops inside a user-created artifact/feature",
    ],
    examplePrompts: [
      "Design a PLG activation checklist for a B2B analytics tool with 14-day trial.",
      "Propose 10 in-product upgrade triggers ranked by ICE for our free tier.",
      "Map our signup → activated → paid funnel and where product-led loops can compound.",
      "Turn Brian Balfour-style nested loops into experiments we can ship this quarter.",
    ],
    prerequisites: [
      "Funnel metrics (even rough): signup, activation, trial-to-paid, expansion",
      "Clear packaging model (free, trial, usage-based, seat-based)",
      "Product surface access for in-product experiments",
    ],
    tips: [
      "Pair with `onboarding`, `free-tools`, `referrals`, and `ab-testing`.",
      "Claude AI-powered apps essay (Balfour) is a useful mental model for nested loops — cite as strategy input, not a skill install.",
      "Instrument before optimizing: Analytics + GrowthBook first.",
    ],
    sources: [
      "https://mcpmarket.com/tools/skills/growth-strategy-product-led-growth",
      "https://blog.brianbalfour.com/p/how-claude-is-building-a-unique-growth",
      "https://www.linkedin.com/pulse/quiet-giant-explosive-growth-claude-ai-mathialagan-p-gkcjc/",
      "https://github.com/anthropics/skills/issues/626",
    ],
  },
  {
    slug: "developer-growth-analytics",
    name: "Developer Growth Analytics",
    type: "skill",
    summary:
      "Mines local Claude Code chat history for recurring technical gaps, drafts a growth report, curates Hacker News reading, and can deliver the digest to Slack.",
    overview:
      "Developer Growth Analytics (MCP Market) acts as an automated mentor: it evaluates recent coding sessions — tech choices, debugging hurdles, architecture decisions — then produces a structured progress report with prioritized improvements and HN articles matched to your gaps.\n\nUse for self-directed professional development when peer review is sparse, or as a weekly engineering growth ritual.",
    categories: ["engineering", "growth", "operations"],
    industries: ["saas", "education", "other"],
    link: "https://mcpmarket.com/tools/skills/developer-growth-analytics",
    installation:
      "Install from the MCP Market Developer Growth Analytics card (follow the listed `npx skills add …` / marketplace command), then restart the agent session. Slack delivery needs a configured Slack connector/MCP if you want DMs.",
    howToUse:
      "Run after a week of sessions. Point it at Claude Code history (or export). Ask for strengths/gaps, a priority list, and reading links. Optionally pipe the report to Slack.",
    useCases: [
      "Weekly personal engineering growth report",
      "Identify recurring debugging bottlenecks on a new stack",
      "Get high-signal HN reading matched to real struggles",
      "Prep for 1:1s with evidence from recent agent sessions",
    ],
    examplePrompts: [
      "Run Developer Growth Analytics on my last 14 days of Claude Code sessions.",
      "What architecture mistakes do I keep repeating? Prioritize fixes.",
      "Send this week’s growth report to my Slack DM with 5 HN links.",
    ],
    prerequisites: [
      "Local Claude Code (or compatible) session history access",
      "Optional: Slack MCP/connector for DM delivery",
      "Comfort sharing chat logs with the skill’s scripts — audit first",
    ],
    tips: [
      "Treat outputs as coaching signals, not performance reviews.",
      "Pair with self-improving knowledge systems so lessons become durable files.",
    ],
    sources: [
      "https://mcpmarket.com/tools/skills/developer-growth-analytics",
    ],
  },
  {
    slug: "claude-mem",
    name: "Claude-Mem",
    type: "skill",
    summary:
      "Persistent AI memory for Cursor (and Claude Code) — session hooks capture tool use, AI compresses observations, and relevant history injects into every new chat.",
    overview:
      "Claude-Mem (thedotmack/claude-mem) fixes cold-start sessions. Hooks capture MCP tools, shell commands, and file edits; an extraction layer compresses observations into semantic summaries; context injection loads relevant history into new chats. A memory viewer shows the knowledge base.\n\nCursor-only users can run on Gemini’s free tier or OpenRouter — no Claude Code subscription required. Claude Code users install via plugin marketplace + `claude-mem cursor install`.",
    categories: ["engineering", "product", "operations"],
    industries: ["saas", "other"],
    link: "https://docs.claude-mem.ai/cursor",
    installation:
      "```bash\n# Cursor-only (Gemini / OpenRouter)\ngit clone https://github.com/thedotmack/claude-mem.git\ncd claude-mem && bun install && bun run build\nbun run cursor:setup\n\n# Claude Code users\n/plugin marketplace add thedotmack/claude-mem\n/plugin install claude-mem\nclaude-mem cursor install\n```\n\nPrereqs: Bun, Cursor IDE, jq + curl. Verify with `bun run worker:status` and `bun run cursor:status`.",
    howToUse:
      "Keep the worker running. Code normally — hooks capture silently. New chats should receive relevant prior context. Open the worker URL to browse memory. Restart Cursor after install.",
    useCases: [
      "Stop re-explaining project conventions every session",
      "Accumulate architecture decisions across weeks",
      "Cursor workflows without losing multi-day context",
      "Team demos of persistent agent memory vs file-dump approaches",
    ],
    examplePrompts: [
      "After install: continue yesterday’s auth refactor — what did we decide about session tokens?",
      "Show me what claude-mem has stored about our billing module.",
      "Summarize architecture decisions from the last five sessions.",
    ],
    prerequisites: [
      "Bun runtime + Cursor IDE",
      "AI provider: Gemini free tier, OpenRouter, or Claude SDK",
      "Disk + local worker port available",
    ],
    tips: [
      "Start with Gemini free tier (1500 req/day) for individuals.",
      "If hooks don’t fire: restart Cursor and check `.cursor/hooks.json`.",
      "Complement with file-based CLAUDE.md / knowledge graphs — memory tiers stack.",
      "Useful backdrop: NexusTrade / DEV.to pieces on Cursor vs Claude Code memory architecture.",
    ],
    sources: [
      "https://docs.claude-mem.ai/cursor",
      "https://github.com/thedotmack/claude-mem",
      "https://nexustrade.io/blog/cursor-vs-claude-code-memory-architecture-20260413",
      "https://dev.to/austin_starks/cursor-beats-claude-code-heres-the-memory-architecture-that-proves-it-e1",
      "https://www.datacamp.com/tutorial/claude-code-in-cursor",
      "https://www.spacecake.ai/blog/cursor-claude-integration-guide",
    ],
  },
  {
    slug: "self-improving-knowledge-system",
    name: "Self-Improving Knowledge System",
    type: "skill",
    summary:
      "File-based knowledge graph pattern (Product Compass) — CLAUDE.md brain, INDEX.md router, progressive disclosure domains, hypothesis tracking, and compounding agent workflows.",
    overview:
      "Paweł Huryn’s self-improving Claude system pattern: pull data → organize knowledge → let the system learn → compound. Architecture is a file-based knowledge graph with progressive disclosure — CLAUDE.md as operating brain, knowledge/INDEX.md as router, domain folders (craft/voice/platforms/hypotheses or PM equivalents like discovery/stakeholders/channels).\n\nWorks across Claude Code, Cowork, and web with shared context. Includes hypothesis tracking and “false beliefs” to keep the system honest. Adapt labels to customer research, competitive intel, or market analysis — not only content.",
    categories: ["product", "growth", "operations", "engineering"],
    industries: ["saas", "agency", "education", "other"],
    link: "https://www.productcompass.pm/p/self-improving-claude-system",
    installation:
      "There is no single npm package — scaffold the structure in your repo:\n\n```text\nCLAUDE.md\nknowledge/\n  INDEX.md\n  craft/          # or discovery/\n  voice/          # or stakeholders/\n  platforms/      # or channels/\n  posts/          # performance data\n  hypotheses/\n```\n\nPaste the Product Compass architecture into Claude and ask it to generate the starter files for your domain. Optionally add Python fetch scripts as the system proposes them.",
    howToUse:
      "1. Start messy (screenshots, raw notes).\n2. Let Claude propose hierarchy once patterns emerge.\n3. Keep INDEX.md as the only always-loaded router.\n4. Track hypotheses with kill criteria; log false beliefs.\n5. Reuse the same files from Code, Cowork, and web.",
    useCases: [
      "Compounding content / social system with real performance data",
      "Customer-interview knowledge base that improves after every call",
      "Competitive monitoring with weekly pattern synthesis",
      "PM operating system across Claude surfaces",
      "Replace cold-start chats with progressive disclosure",
    ],
    examplePrompts: [
      "Scaffold a Product Compass-style knowledge system for B2B customer interviews.",
      "Reorganize these notes into knowledge/ with INDEX.md progressive disclosure.",
      "Add hypothesis tracking and false-beliefs files; propose 5 tests for our onboarding copy.",
      "Summarize who decided what in this session and update CLAUDE.md learning rules.",
    ],
    prerequisites: [
      "Git repo where CLAUDE.md + knowledge/ can live",
      "Claude Code and/or Cowork access",
      "Willingness to own editorial/judgment calls — AI compresses execution, not taste",
    ],
    tips: [
      "Don’t load the whole graph every turn — router first.",
      "Cross-surface shared files beat per-tool prompt paste.",
      "Pair with claude-mem for automatic capture; keep the graph for curated truth.",
      "Related: Candlekeep / architecture explainers on Claude Code internals as inspiration, not required deps.",
    ],
    sources: [
      "https://www.productcompass.pm/p/self-improving-claude-system",
      "https://getcandlekeep.com/marketplace/inside-claude-code-the-architecture-64zz28",
      "https://rajsarkar.substack.com/p/part-4-cursor-vs-claude-code-two",
      "https://www.keboca.com/articles/cursorrules-ai-how-i-unified-my-cursor-and-claude-config-one-place",
      "https://www.fourzerothree.in/p/cursor-setup-workflow",
      "https://cheesecakelabs.com/blog/using-cursor-and-claude/",
      "https://codeaholicguy.com/2026/01/10/claude-code-vs-cursor/",
      "https://thenewstack.io/claude-code-vs-cursor-vs-codex-vs-antigravity-2026/",
    ],
  },
  {
    slug: "aws-cloud-diagrams",
    name: "AWS Cloud Diagrams",
    type: "skill",
    summary:
      "AWS-focused architecture diagram skill (mpuig/claude-cloud-diagrams) — generate infrastructure visuals and PNG exports from project descriptions.",
    overview:
      "AWS Cloud Diagrams is recommended in 2026 architecture-skill roundups for Claude Code and Cursor. It produces AWS-centric infrastructure diagrams (IaC-style visuals) suitable for design reviews and docs. Requires Graphviz on the host.",
    categories: ["engineering", "product"],
    industries: ["saas", "fintech", "other"],
    link: "https://github.com/mpuig/claude-cloud-diagrams",
    installation:
      "```bash\nbrew install graphviz   # or apt install graphviz\n/plugin marketplace add mpuig/claude-cloud-diagrams\n/plugin install aws-diagrams@mpuig/claude-cloud-diagrams\n```",
    howToUse:
      "Describe the AWS workflow or point at IaC/repo paths. Ask for an architecture diagram and PNG export. Iterate on boundaries and data flows.",
    useCases: [
      "Document a Step Functions → Lambda → S3 pipeline",
      "Visualize multi-account landing zones for reviews",
      "Generate onboarding diagrams for new engineers",
      "Export PNG assets for RFCs and Confluence",
    ],
    examplePrompts: [
      "Generate an AWS architecture diagram for this project and export it as PNG.",
      "Diagram Client → API Gateway → Lambda → DynamoDB → S3 with official-style layout.",
      "Update the diagram to show VPC, private subnets, and NAT for the worker fleet.",
    ],
    prerequisites: [
      "Graphviz installed",
      "Claude Code plugin support or manual skill copy",
      "Enough architecture context (services + trust boundaries)",
    ],
    tips: [
      "Use Excalidraw for whiteboard speed; AWS Cloud Diagrams for polished infra docs.",
      "Pair with PlantUML for sequence diagrams of the same system.",
    ],
    sources: [
      "https://medium.com/@shahsoumil519/top-4-claude-code-cursor-skills-for-architecture-diagrams-aws-designs-and-flowcharts-931509ad09c5",
      "https://github.com/mpuig/claude-cloud-diagrams",
      "https://www.reddit.com/r/ClaudeCode/comments/1ox9k0a/how_i_design_software_architecture/",
    ],
  },
  {
    slug: "plantuml-diagrams",
    name: "PlantUML Diagrams",
    type: "skill",
    summary:
      "Text-based UML/sequence/component diagram skill for version-controlled architecture docs in Claude Code and Cursor.",
    overview:
      "PlantUML skills turn natural-language system descriptions into sequence, component, and UML diagrams that live as text in git. Ideal for API interaction docs and design reviews where Draw.io binaries are heavy and Excalidraw is too informal.",
    categories: ["engineering", "product"],
    industries: ["saas", "fintech", "education", "other"],
    link: "https://medium.com/@shahsoumil519/top-4-claude-code-cursor-skills-for-architecture-diagrams-aws-designs-and-flowcharts-931509ad09c5",
    installation:
      "Install a PlantUML-compatible agent skill from your marketplace, or add a SKILL.md that instructs the agent to emit `.puml` files and render via the PlantUML CLI/docker:\n\n```bash\n# Example render toolchain\nbrew install plantuml   # or use docker plantuml/plantuml\n```\n\nStore diagrams under `docs/architecture/*.puml`.",
    howToUse:
      "Ask for a sequence or component diagram as PlantUML source. Commit the `.puml` file; render in CI or locally. Prefer text diffs in PRs.",
    useCases: [
      "API Gateway ↔ Lambda ↔ DynamoDB sequence diagrams",
      "Component diagrams for modular monolith boundaries",
      "Version-controlled design docs in PRs",
      "Teaching system design with editable text diagrams",
    ],
    examplePrompts: [
      "Create a PlantUML sequence diagram showing API Gateway, Lambda, DynamoDB, and S3.",
      "Emit a component diagram for our billing bounded context as docs/architecture/billing.puml.",
      "Update the auth sequence diagram to include refresh-token rotation.",
    ],
    prerequisites: [
      "PlantUML CLI or Docker image for rendering",
      "Agreement to keep diagrams as text in-repo",
    ],
    tips: [
      "Excalidraw for workshops; PlantUML for durable docs; AWS Cloud Diagrams for cloud topology.",
      "Cited alongside Draw.io / Excalidraw in architecture skill roundups.",
    ],
    sources: [
      "https://medium.com/@shahsoumil519/top-4-claude-code-cursor-skills-for-architecture-diagrams-aws-designs-and-flowcharts-931509ad09c5",
      "https://www.reddit.com/r/ClaudeCode/comments/1ox9k0a/how_i_design_software_architecture/",
    ],
  },
  {
    slug: "drawio-diagrams",
    name: "Draw.io Diagrams",
    type: "skill",
    summary:
      "Editable Draw.io architecture skill for AWS/system-design diagrams with official icon support — production docs from a prompt.",
    overview:
      "Draw.io (diagrams.net) skills generate editable architecture diagrams for AWS and general system design. Best when stakeholders need to tweak layouts in the Draw.io UI after the agent drafts the first version.",
    categories: ["engineering", "product", "design"],
    industries: ["saas", "agency", "other"],
    link: "https://medium.com/@shahsoumil519/top-4-claude-code-cursor-skills-for-architecture-diagrams-aws-designs-and-flowcharts-931509ad09c5",
    installation:
      "Install a Draw.io / diagrams.net agent skill from your marketplace (search “drawio” or “diagrams.net” in Claude Code plugins). Ensure the skill can write `.drawio` or `.drawio.svg` files into the repo.",
    howToUse:
      "Prompt with the workflow (Client → Step Functions → Lambda → S3). Ask for official AWS icons and PNG/SVG export. Open the `.drawio` file for manual polish.",
    useCases: [
      "Production architecture diagrams for design reviews",
      "AWS icon-accurate infrastructure documentation",
      "Hand off editable diagrams to non-engineers",
      "Export PNG for slide decks and RFCs",
    ],
    examplePrompts: [
      "Create an AWS architecture diagram for Client → Step Functions → Lambda → S3. Use official AWS icons and export as PNG.",
      "Draft a Draw.io system context diagram for our multi-tenant SaaS.",
      "Revise the diagram to add a dead-letter queue and event bus.",
    ],
    prerequisites: [
      "Draw.io desktop or diagrams.net for editing outputs",
      "Agent skill that emits Draw.io XML/SVG",
    ],
    tips: [
      "Roundup recommendation: Draw.io for production; Excalidraw for speed; PlantUML for git-native UML.",
      "Keep source `.drawio` in git when possible.",
    ],
    sources: [
      "https://medium.com/@shahsoumil519/top-4-claude-code-cursor-skills-for-architecture-diagrams-aws-designs-and-flowcharts-931509ad09c5",
    ],
  },
  {
    slug: "ccc-excalidraw-pack",
    name: "CCC Excalidraw Pack",
    type: "skill",
    summary:
      "ooiyeefei/ccc plugin pack with Excalidraw flowchart skills — fast whiteboard-style diagrams for brainstorming and design discussions.",
    overview:
      "The CCC skills pack (ooiyeefei/ccc) is commonly installed for quick Excalidraw workflow diagrams in Claude Code. Complements the standalone coleam00/excalidraw-diagram-skill already in the catalog when you want the marketplace plugin install path.",
    categories: ["engineering", "design", "product"],
    industries: ["saas", "agency", "education", "other"],
    link: "https://github.com/ooiyeefei/ccc",
    installation:
      "```text\n/plugin marketplace add ooiyeefei/ccc\n/plugin install ccc-skills@ccc\n```",
    howToUse:
      "Ask for a workflow flowchart (e.g. Step Functions pipeline) as Excalidraw. Iterate verbally; export when the shape stabilizes.",
    useCases: [
      "Brainstorming flowcharts in design reviews",
      "Quick pipeline diagrams before formal AWS docs",
      "Workshop whiteboards that stay editable",
    ],
    examplePrompts: [
      "Generate a workflow flowchart for a Step Functions pipeline as Excalidraw.",
      "Sketch our incident-response swimlane in Excalidraw via CCC skills.",
    ],
    prerequisites: [
      "Claude Code plugin marketplace access",
      "Excalidraw-compatible output handling in your workflow",
    ],
    tips: [
      "Prefer coleam00/excalidraw-diagram-skill (`excalidraw-diagram`) if you already use npx skills add.",
      "Promote stable diagrams to PlantUML/Draw.io for long-term docs.",
    ],
    sources: [
      "https://medium.com/@shahsoumil519/top-4-claude-code-cursor-skills-for-architecture-diagrams-aws-designs-and-flowcharts-931509ad09c5",
      "https://github.com/ooiyeefei/ccc",
    ],
  },
];
