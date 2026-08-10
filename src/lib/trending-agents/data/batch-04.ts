import type { TrendingAgent } from "../types";

export const BATCH_04: TrendingAgent[] = [
  {
    slug: "superpowers",
    name: "Superpowers",
    repo: "obra/superpowers",
    owner: "obra",
    url: "https://github.com/obra/superpowers",
    homepage: null,
    tagline:
      "Stops your coding agent jumping straight to code — a full development methodology delivered as composable skills.",
    whatItDoes: `Most agent failures are not model failures. They are process failures: the agent starts writing code before anyone has established what is being built or why.

Superpowers intervenes at exactly that moment. From the moment your agent sees you are building something, it steps back and asks questions instead of generating. Underneath is a set of composable skills plus the initial instructions that make sure the agent actually uses them, covering brainstorming, planning, and subagent-driven development across the software lifecycle.

Installation targets almost every client in the ecosystem — Claude Code, Antigravity, Codex App and CLI, Cursor, Factory Droid, Gemini CLI, GitHub Copilot CLI, Kimi Code, OpenCode, and Pi.

At roughly 270,000 stars it is the most-starred project in this catalog, which tells you how widely the underlying problem is felt.`,
    whoItIsFor: [
      "Teams whose agents produce plausible code that solves the wrong problem",
      "Engineering leads who want a consistent process applied regardless of who is driving",
      "Anyone who has watched an agent confidently build something nobody asked for",
      "Teams using several different agent clients who want one shared methodology",
    ],
    useCases: [
      "Forcing a requirements conversation before any code is generated",
      "Standardising how every engineer's agent approaches a new feature",
      "Breaking large work into subagent-driven pieces with clear boundaries",
      "Reducing rework caused by agents optimising for output volume over correctness",
      "Onboarding a new engineer into your team's process through their agent",
    ],
    whenToUse: [
      "Rework, not throughput, is your bottleneck",
      "Different engineers get wildly different results from the same agent",
      "You are building something new where the requirements are genuinely unclear",
      "Your team spans multiple agent clients and consistency matters",
    ],
    whenToAvoid: [
      "The task is small and well defined — the process overhead outweighs the benefit",
      "You want raw speed on a throwaway prototype",
      "Your team already has a strong, enforced process and the agent follows it",
      "You dislike opinionated tooling; this is a methodology with real opinions",
    ],
    automationIdeas: [
      {
        title: "Requirements gate before code",
        detail:
          "Every new feature request triggers a structured clarification pass, with the resulting brief posted to the ticket.",
        audience: "engineering",
      },
      {
        title: "Consistent onboarding process",
        detail:
          "New engineers inherit the team's methodology through their agent on day one rather than absorbing it over months.",
        audience: "operations",
      },
      {
        title: "Subagent work decomposition",
        detail:
          "Break a large epic into scoped subagent tasks automatically, each with its own acceptance criteria.",
        audience: "engineering",
      },
      {
        title: "Rework measurement",
        detail:
          "Track how much code gets reverted or rewritten before and after adopting the methodology.",
        audience: "founder",
      },
      {
        title: "Brainstorm-to-spec pipeline",
        detail:
          "Turn a founder's loose idea into a structured spec through guided questioning, ready for estimation.",
        audience: "founder",
      },
      {
        title: "Cross-client standardisation",
        detail:
          "Install the same skills across every agent client your team uses so output quality does not depend on tool choice.",
        audience: "operations",
      },
      {
        title: "Design review preparation",
        detail:
          "Have the agent produce the alternatives it considered and rejected, so design review starts from real options.",
        audience: "engineering",
      },
      {
        title: "Estimation grounding",
        detail:
          "Use the structured plan output to produce estimates based on decomposed work rather than a gut number.",
        audience: "operations",
      },
      {
        title: "Scope-creep detection",
        detail:
          "Compare what shipped against the original brief and flag where scope expanded without a decision.",
        audience: "operations",
      },
      {
        title: "Post-mortem input",
        detail:
          "Because the reasoning is captured up front, feed it into retrospectives to see where the plan diverged from reality.",
        audience: "engineering",
      },
    ],
    categories: ["agent-skills", "coding-agent"],
    audiences: ["engineering", "operations", "founder"],
    industries: ["saas", "agency", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 269852,
      forks: 24122,
      openIssues: 326,
      language: "Shell",
      license: "MIT",
      createdAt: "2025-10-09",
      pushedAt: "2026-08-08",
    },
    topics: [
      "ai",
      "brainstorming",
      "coding",
      "sdlc",
      "skills",
      "subagent-driven-development",
    ],
    seoKeywords: [
      "superpowers github",
      "obra superpowers skills",
      "agentic skills framework",
      "claude code methodology skills",
      "subagent driven development",
    ],
    relatedSlugs: ["anthropic-skills", "ecc", "agent-skills"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "ecc",
    name: "ECC",
    repo: "affaan-m/ECC",
    owner: "affaan-m",
    url: "https://github.com/affaan-m/ECC",
    homepage: "https://ecc.tools",
    tagline:
      "A performance layer for agent harnesses — skills, instincts, memory, and security bundled into one system.",
    whatItDoes: `ECC positions itself as an optimisation system that sits on top of whatever harness you already use — Claude Code, Codex, OpenCode, Cursor. Rather than replacing the agent, it improves how it performs.

The bundle covers four areas: skills (reusable capability packs), instincts (default behaviours that fire without being asked), memory (context that survives sessions), and security. It also pushes research-first development, meaning the agent gathers information before acting rather than after being corrected.

It ships as npm packages (\`ecc-universal\`, \`ecc-agentshield\`), a GitHub App, and a plugin, and is translated into twelve languages.

One thing worth flagging because the maintainers flag it themselves: the README opens with a prominent warning to install only from official channels, because third-party mirrors of a popular agent tool are an obvious malware vector. Take that seriously — verify the source before installing anything that will hold your credentials and read your codebase.`,
    whoItIsFor: [
      "Teams already invested in an agent harness who want more out of it",
      "Anyone who wants memory and security handled as one system rather than three integrations",
      "Developers who keep correcting an agent that acted before it researched",
      "Non-English teams — the documentation is genuinely multilingual",
    ],
    useCases: [
      "Adding persistent memory to a harness that does not have it natively",
      "Applying a consistent security posture across every agent on the team",
      "Encoding team defaults as instincts so nobody has to prompt for them",
      "Getting research-before-action behaviour without writing the prompt yourself",
      "Standardising agent behaviour across a team using mixed tooling",
    ],
    whenToUse: [
      "Your harness works but its defaults are not your team's defaults",
      "You want memory, skills, and security from one source rather than assembled",
      "Agents on your team act too fast and research too little",
      "You need the setup documented in a language your team actually reads",
    ],
    whenToAvoid: [
      "You are cautious about layering third-party code into your agent's execution path — that is a reasonable position here",
      "Your harness already provides these capabilities natively",
      "You want minimal dependencies; this is an opinionated bundle",
      "You cannot verify the install source, in which case do not install it at all",
    ],
    automationIdeas: [
      {
        title: "Team-wide agent defaults",
        detail:
          "Encode your engineering standards as instincts so every agent applies them without anyone remembering to prompt.",
        audience: "operations",
      },
      {
        title: "Persistent project memory",
        detail:
          "Give agents recall of past decisions on a project so they stop proposing approaches that were already rejected.",
        audience: "engineering",
      },
      {
        title: "Security posture enforcement",
        detail:
          "Apply consistent guardrails on what agents may read or execute across every machine on the team.",
        audience: "operations",
      },
      {
        title: "Research-first requirement",
        detail:
          "Force the agent to gather context on unfamiliar code before proposing a change, cutting confidently wrong edits.",
        audience: "engineering",
      },
      {
        title: "Multilingual team rollout",
        detail:
          "Roll out identical agent capability to teams working in different languages using the translated documentation.",
        audience: "operations",
      },
      {
        title: "Skill library curation",
        detail:
          "Maintain an approved internal skill set and distribute it rather than each engineer installing ad hoc.",
        audience: "operations",
      },
      {
        title: "Supply-chain verification job",
        detail:
          "Automate a check that installed agent tooling came from the official package and matches expected hashes.",
        audience: "engineering",
      },
      {
        title: "Cross-harness consistency",
        detail:
          "Keep behaviour comparable whether an engineer uses Claude Code, Cursor, or Codex.",
        audience: "engineering",
      },
      {
        title: "Onboarding capability bundle",
        detail:
          "Install one package on a new hire's machine and have their agent match the team's on day one.",
        audience: "operations",
      },
      {
        title: "Behaviour regression checks",
        detail:
          "Run a standard task set after each update to confirm agent behaviour has not silently changed.",
        audience: "engineering",
      },
    ],
    categories: ["agent-skills", "memory-context"],
    audiences: ["engineering", "operations"],
    industries: ["saas", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 239061,
      forks: 36315,
      openIssues: 139,
      language: "JavaScript",
      license: "MIT",
      createdAt: "2026-01-18",
      pushedAt: "2026-08-10",
    },
    topics: [
      "ai-agents",
      "anthropic",
      "claude-code",
      "developer-tools",
      "llm",
      "mcp",
      "productivity",
    ],
    seoKeywords: [
      "ECC github",
      "ecc.tools agent harness",
      "agent performance optimization system",
      "claude code skills memory security",
      "ecc-universal npm",
    ],
    relatedSlugs: ["superpowers", "anthropic-skills", "cc-switch"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "n8n",
    name: "n8n",
    repo: "n8n-io/n8n",
    owner: "n8n-io",
    url: "https://github.com/n8n-io/n8n",
    homepage: "https://n8n.io",
    tagline:
      "The workflow automation platform most teams should try before building anything custom — 1500+ integrations, self-hostable.",
    whatItDoes: `n8n is a visual workflow builder where you drag nodes onto a canvas, connect them, and drop into custom code whenever the visual layer runs out. It has been around since 2019, which in this catalog makes it genuinely mature.

The AI capabilities are native rather than bolted on: multi-step agents, tool use, human approval steps, and your own data and models. It connects to OpenAI, Anthropic, Google, or open-source models, and switching providers does not mean rearchitecting. It is both an MCP client and an MCP server.

For most teams this is the honest first stop. If your automation is "when a form is submitted, enrich the lead, score it, write it to the CRM, and post to Slack", n8n does that today with no custom code and you can self-host it so the data never leaves your infrastructure.

The licence is fair-code rather than fully open source — worth reading if you plan to build a commercial product on top of it.`,
    whoItIsFor: [
      "Any team automating a workflow that touches more than two SaaS tools",
      "Ops leads who want to build automation without waiting for engineering",
      "Companies that need self-hosting for data residency or compliance",
      "Engineers who want a visual layer but refuse to be trapped in one",
    ],
    useCases: [
      "Lead routing: capture, enrich, score, write to CRM, notify the owner",
      "Scheduled reporting that pulls from several systems into one digest",
      "Human-in-the-loop approvals sitting between an AI step and a real action",
      "Syncing data between tools that have no native integration",
      "Prototyping an automation in an afternoon before deciding whether to build it properly",
    ],
    whenToUse: [
      "The workflow is integration-heavy and the logic is moderate",
      "Non-engineers need to see and modify the automation",
      "Self-hosting is required",
      "You want to validate an automation before investing in custom code",
    ],
    whenToAvoid: [
      "The logic is complex enough that a visual graph becomes harder to read than code",
      "You are building a commercial product on top of it — check the fair-code licence first",
      "Extreme throughput or latency requirements; this is orchestration, not a data pipeline engine",
      "Your workflow is one API call — a script is simpler",
    ],
    automationIdeas: [
      {
        title: "Inbound lead pipeline",
        detail:
          "Form submission triggers enrichment, ICP scoring, CRM write, and a Slack ping to the owning rep within a minute.",
        audience: "sales",
      },
      {
        title: "Weekly founder digest",
        detail:
          "Pull revenue, signups, churn, and support volume from four systems into one scheduled message every Monday.",
        audience: "founder",
      },
      {
        title: "Content publishing chain",
        detail:
          "Draft, route for human approval, then publish to blog, newsletter, and social on approval.",
        audience: "marketing",
      },
      {
        title: "Churn early warning",
        detail:
          "Watch usage drop-offs and support sentiment together, and open a task for success when both trend down.",
        audience: "operations",
      },
      {
        title: "Invoice reconciliation",
        detail:
          "Match incoming invoices against purchase orders and escalate only the mismatches to finance.",
        audience: "finance",
      },
      {
        title: "Support ticket triage",
        detail:
          "Classify incoming tickets, attach account context, and route to the right queue with a suggested reply.",
        audience: "support",
      },
      {
        title: "Competitor change alerts",
        detail:
          "Poll competitor pricing and changelog pages, diff them, and post material changes to a channel.",
        audience: "marketing",
      },
      {
        title: "Onboarding checklist automation",
        detail:
          "When a deal closes, create the accounts, send the welcome sequence, and schedule the kickoff automatically.",
        audience: "operations",
      },
      {
        title: "Approval-gated AI actions",
        detail:
          "Put a human approval node between any AI-generated output and the action that sends it to a customer.",
        audience: "operations",
      },
      {
        title: "Data sync between silos",
        detail:
          "Keep two systems with no native integration in sync on a schedule, with conflict reporting.",
        audience: "operations",
      },
    ],
    categories: ["workflow-automation", "agent-framework"],
    audiences: ["operations", "marketing", "sales", "founder"],
    industries: ["saas", "ecommerce", "agency", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 200029,
      forks: 60036,
      openIssues: 1427,
      language: "TypeScript",
      license: "NOASSERTION",
      createdAt: "2019-06-22",
      pushedAt: "2026-08-10",
    },
    topics: [
      "automation",
      "integration-framework",
      "ipaas",
      "low-code",
      "mcp",
      "no-code",
      "self-hosted",
      "workflow-automation",
    ],
    seoKeywords: [
      "n8n github",
      "n8n workflow automation self hosted",
      "open source zapier alternative",
      "n8n AI agent workflow",
      "n8n vs make",
    ],
    relatedSlugs: ["dify", "flowise", "n8n-skills"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "autogpt",
    name: "AutoGPT",
    repo: "Significant-Gravitas/AutoGPT",
    owner: "Significant-Gravitas",
    url: "https://github.com/Significant-Gravitas/AutoGPT",
    homepage: "https://agpt.co",
    tagline:
      "The project that started the autonomous agent wave, now a visual platform for building and scheduling agents.",
    whatItDoes: `AutoGPT is the project that made "autonomous AI agent" a phrase people outside engineering used. It has since matured from a viral experiment into a platform.

Today you describe an outcome in plain English and AutoGPT builds the agent, runs it, and reports back — or you shape every step yourself in the visual builder. Agents run on demand, on a schedule, or from a trigger, which is the part that makes them operationally useful rather than a demo.

It is worth being clear-eyed about the history. Early AutoGPT was famous for looping, burning tokens, and producing very little. The current platform is a different thing, with a visual builder and scheduling, but the reputation lingers and some of the caution behind it is still warranted for genuinely open-ended tasks.

186,000 stars, self-hostable, with a hosted offering alongside.`,
    whoItIsFor: [
      "Teams who want to describe an outcome rather than wire every step",
      "Non-engineers who need a visual builder with real scheduling",
      "Anyone evaluating the autonomous-agent category and wanting the reference implementation",
      "Operators who want agents triggered by events, not just run manually",
    ],
    useCases: [
      "Recurring research tasks that run on a schedule and report back",
      "Multi-step workflows described in plain English rather than built node by node",
      "Event-triggered agents that respond when something changes in your systems",
      "Prototyping an autonomous workflow before deciding whether it needs custom code",
      "Giving non-technical staff a way to build agents with guardrails",
    ],
    whenToUse: [
      "The task has a clear outcome even if the steps vary",
      "You want scheduling and triggers built in rather than added later",
      "A visual builder matters for who will maintain it",
      "You want the option to self-host",
    ],
    whenToAvoid: [
      "The task is genuinely open-ended — autonomous agents still loop and burn budget on those",
      "You need tight cost predictability; set hard limits before you let anything run unattended",
      "A deterministic pipeline would do the job more cheaply and more reliably",
      "You need mature enterprise support and governance out of the box",
    ],
    automationIdeas: [
      {
        title: "Scheduled market research",
        detail:
          "A weekly agent that researches a defined question and delivers a written brief every Monday morning.",
        audience: "marketing",
      },
      {
        title: "Trigger-based lead research",
        detail:
          "When a target account shows intent, an agent assembles a research brief before the rep reaches out.",
        audience: "sales",
      },
      {
        title: "Content gap analysis",
        detail:
          "Monthly agent that compares your content coverage against competitors and proposes the next five topics.",
        audience: "marketing",
      },
      {
        title: "Budget-capped experiments",
        detail:
          "Run open-ended agents only with a hard token ceiling, and report what each experiment cost against what it produced.",
        audience: "finance",
      },
      {
        title: "Vendor monitoring",
        detail:
          "Track your key vendors' status pages, pricing, and terms changes, alerting when something affects you.",
        audience: "operations",
      },
      {
        title: "Recruiting pipeline research",
        detail:
          "Given a role, research candidate pools and compile a sourcing brief on a recurring schedule.",
        audience: "operations",
      },
      {
        title: "Customer expansion signals",
        detail:
          "Watch account usage and public signals, flagging accounts that look ready for an upsell conversation.",
        audience: "sales",
      },
      {
        title: "Non-technical agent building",
        detail:
          "Let the ops team build their own agents in the visual builder within limits engineering defines.",
        audience: "operations",
      },
      {
        title: "Post-incident research",
        detail:
          "After an incident, an agent gathers related past incidents and external context for the retrospective.",
        audience: "engineering",
      },
      {
        title: "Loop detection guardrail",
        detail:
          "Monitor agent runs for repeated identical steps and kill them automatically before they consume the budget.",
        audience: "engineering",
      },
    ],
    categories: ["agent-framework", "workflow-automation"],
    audiences: ["operations", "founder", "marketing"],
    industries: ["saas", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 186473,
      forks: 46071,
      openIssues: 531,
      language: "Python",
      license: "NOASSERTION",
      createdAt: "2023-03-16",
      pushedAt: "2026-08-10",
    },
    topics: [
      "agentic-ai",
      "agents",
      "autonomous-agents",
      "gpt",
      "llm",
      "openai",
      "python",
    ],
    seoKeywords: [
      "autogpt github",
      "AutoGPT platform self host",
      "autonomous AI agent open source",
      "AutoGPT visual builder",
      "AutoGPT scheduled agents",
    ],
    relatedSlugs: ["crewai", "n8n", "dify"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "anthropic-skills",
    name: "Anthropic Skills",
    repo: "anthropics/skills",
    owner: "anthropics",
    url: "https://github.com/anthropics/skills",
    homepage: null,
    tagline:
      "Anthropic's own reference implementation of Agent Skills — the canonical example of the format.",
    whatItDoes: `Skills are folders of instructions, scripts, and resources that Claude loads dynamically to get better at a specialised task. This repository is Anthropic's own implementation of them.

The concept is simple and the implications are not. Instead of a giant system prompt covering every possible task, you write focused skills — creating documents to your company's brand guidelines, analysing data with your organisation's specific workflow, automating a recurring personal task — and the model loads the relevant one on demand.

For anyone writing skills, this is the reference. It shows the intended structure, how resources and scripts sit alongside instructions, and what a well-scoped skill actually looks like. The broader standard lives separately at agentskills.io.

167,000 stars, and note the licence field is empty — check the repository terms before redistributing anything from it commercially.`,
    whoItIsFor: [
      "Anyone writing their first skill and wanting to see it done properly",
      "Teams standardising how internal skills are structured and reviewed",
      "Engineers building tooling that produces or consumes skills",
      "Ops leads deciding what should be a skill versus a prompt versus code",
    ],
    useCases: [
      "Learning the skill format from the reference implementation before writing your own",
      "Adapting an official skill to your organisation's conventions",
      "Establishing internal review standards for what a good skill contains",
      "Understanding the boundary between skill instructions and executable scripts",
      "Building internal tooling that generates skills programmatically",
    ],
    whenToUse: [
      "You are about to write skills and want to start from the canonical shape",
      "Your team's skills are inconsistent and you need a standard to point at",
      "You are building on the Agent Skills format and need ground truth",
      "You want examples that are maintained rather than blog-post snapshots",
    ],
    whenToAvoid: [
      "You need a large catalog of ready-made skills — this is reference, not a marketplace",
      "Your agent client does not support the skills format",
      "You want to redistribute the content commercially without checking the licence first",
      "A simple prompt would do; not everything needs to be a skill",
    ],
    automationIdeas: [
      {
        title: "House style skill",
        detail:
          "Build a brand-guidelines skill from the reference structure so every generated document matches your standards.",
        audience: "marketing",
      },
      {
        title: "Internal skill review standard",
        detail:
          "Use the reference structure as the checklist any internal skill must satisfy before it is shared.",
        audience: "operations",
      },
      {
        title: "Reporting workflow skill",
        detail:
          "Encode your specific analysis workflow so results are computed the same way every time, by anyone.",
        audience: "data",
      },
      {
        title: "Skill generator tooling",
        detail:
          "Build an internal tool that scaffolds new skills in the correct format from a short description.",
        audience: "engineering",
      },
      {
        title: "Customer-facing document automation",
        detail:
          "Create skills for proposals, SOWs, and reports so output is consistent regardless of who requests it.",
        audience: "sales",
      },
      {
        title: "Onboarding skill pack",
        detail:
          "Bundle the skills a new hire's agent needs for their role and install them on day one.",
        audience: "operations",
      },
      {
        title: "Skill usage audit",
        detail:
          "Track which internal skills are actually invoked and retire the ones nobody uses.",
        audience: "operations",
      },
      {
        title: "Compliance-checked outputs",
        detail:
          "Encode required disclaimers and review steps into a skill so they cannot be forgotten.",
        audience: "finance",
      },
      {
        title: "Support response consistency",
        detail:
          "Build skills for common support scenarios so every draft follows the approved approach.",
        audience: "support",
      },
      {
        title: "Skill versioning process",
        detail:
          "Treat skills as versioned code with review and changelog, using the reference layout as the base.",
        audience: "engineering",
      },
    ],
    categories: ["agent-skills"],
    audiences: ["engineering", "operations", "marketing"],
    industries: ["any"],
    difficulty: "plug-in",
    stats: {
      stars: 167285,
      forks: 19956,
      openIssues: 1070,
      language: "Python",
      license: null,
      createdAt: "2025-09-22",
      pushedAt: "2026-08-07",
    },
    topics: ["agent-skills"],
    seoKeywords: [
      "anthropic skills github",
      "agent skills format",
      "claude skills examples",
      "how to write a claude skill",
      "agentskills.io standard",
    ],
    relatedSlugs: ["superpowers", "awesome-claude-skills", "agent-skills"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "dify",
    name: "Dify",
    repo: "langgenius/dify",
    owner: "langgenius",
    url: "https://github.com/langgenius/dify",
    homepage: "https://dify.ai",
    tagline:
      "Agentic workflows and RAG pipelines in one collaborative workspace, deployable to cloud, VPC, or your own servers.",
    whatItDoes: `Dify is an LLM application development platform that puts agentic workflows and RAG pipelines in the same workspace, so a team can move from prototype to production without rebuilding on a different stack.

That last point is the actual pitch. The common failure pattern is prototyping in one tool, discovering it will not hold production traffic or meet a compliance requirement, and starting again. Dify's answer is one workspace with cloud, VPC, and self-hosted deployment options.

It is collaborative by design — several people work in the same workspace rather than one engineer owning a notebook. It supports a wide range of models and tools, MCP, and both low-code and no-code building alongside custom Python.

152,000 stars and a fast release cadence. The licence is non-standard, so read it before embedding Dify in a commercial product.`,
    whoItIsFor: [
      "Teams building customer-facing LLM features who need a production path",
      "Companies with VPC or on-premise requirements that rule out hosted-only tools",
      "Mixed teams where a product person and an engineer build together",
      "Anyone combining retrieval over their own documents with agentic steps",
    ],
    useCases: [
      "Building a support assistant grounded in your own documentation",
      "Standing up a RAG pipeline without assembling five separate components",
      "Prototyping with a product manager then hardening the same artifact for production",
      "Deploying inside a VPC where data cannot reach a third-party service",
      "Swapping model providers without rewriting the application",
    ],
    whenToUse: [
      "You need both retrieval and agentic orchestration in one place",
      "Deployment flexibility is a hard requirement",
      "More than one person needs to work on the same LLM application",
      "You want to avoid the prototype-to-production rewrite",
    ],
    whenToAvoid: [
      "Your need is pure workflow integration without retrieval — n8n is simpler",
      "You are building deep custom agent logic; a framework gives you more control",
      "The licence terms conflict with how you intend to commercialise",
      "You have one developer and one use case; the platform is overhead",
    ],
    automationIdeas: [
      {
        title: "Docs-grounded support assistant",
        detail:
          "Answer customer questions from your live documentation, with citations, and escalate anything below a confidence threshold.",
        audience: "support",
      },
      {
        title: "Sales knowledge assistant",
        detail:
          "Let reps query product docs, pricing rules, and past deal notes mid-call and get a sourced answer.",
        audience: "sales",
      },
      {
        title: "Internal policy lookup",
        detail:
          "RAG over HR and finance policies so routine questions stop landing in someone's inbox.",
        audience: "operations",
      },
      {
        title: "Onboarding assistant per customer",
        detail:
          "Build an assistant grounded in a specific customer's configuration to guide their team through setup.",
        audience: "support",
      },
      {
        title: "VPC-deployed assistant",
        detail:
          "Run the same application inside a customer's VPC for enterprise deals that will not allow external processing.",
        audience: "sales",
      },
      {
        title: "Content research pipeline",
        detail:
          "Chain retrieval over your research library into a drafting step, with a human approving before publication.",
        audience: "marketing",
      },
      {
        title: "Model cost comparison",
        detail:
          "Run the same workflow against two providers and compare quality and cost before committing.",
        audience: "finance",
      },
      {
        title: "Structured data extraction",
        detail:
          "Extract consistent fields from inbound documents and write them into your systems automatically.",
        audience: "operations",
      },
      {
        title: "Prompt version control",
        detail:
          "Manage prompt iterations in the shared workspace so changes are reviewable rather than pasted around.",
        audience: "engineering",
      },
      {
        title: "Human-approval publishing",
        detail:
          "Insert an approval step before any AI-generated content reaches a customer-facing surface.",
        audience: "operations",
      },
    ],
    categories: ["workflow-automation", "rag-knowledge", "agent-framework"],
    audiences: ["engineering", "operations", "support", "marketing"],
    industries: ["saas", "fintech", "healthtech", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 151908,
      forks: 23977,
      openIssues: 932,
      language: "TypeScript",
      license: "NOASSERTION",
      createdAt: "2023-04-12",
      pushedAt: "2026-08-10",
    },
    topics: [
      "agentic-ai",
      "agentic-workflow",
      "automation",
      "genai",
      "llm",
      "low-code",
      "orchestration",
      "rag",
    ],
    seoKeywords: [
      "dify github",
      "dify AI open source",
      "agentic workflow RAG platform",
      "dify self hosted",
      "dify vs langchain",
    ],
    relatedSlugs: ["n8n", "flowise", "ragflow"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "open-webui",
    name: "Open WebUI",
    repo: "open-webui/open-webui",
    owner: "open-webui",
    url: "https://github.com/open-webui/open-webui",
    homepage: "https://openwebui.com",
    tagline:
      "A self-hosted chat interface that runs fully offline, in front of Ollama or any OpenAI-compatible API.",
    whatItDoes: `Open WebUI is the interface layer most self-hosting teams end up using. It is extensible, feature-rich, and designed to operate entirely offline.

It sits in front of LLM runners — Ollama, OpenAI-compatible APIs, and others — and adds a built-in inference engine for RAG, so you can point it at your own documents without assembling a separate retrieval stack. There is a plugin system for extending it further.

The reason it matters commercially: if your objection to giving staff an AI assistant is that conversations would leave your network, this removes that objection. Run it on your own hardware against a local model and nothing goes anywhere.

148,000 stars with a large plugin ecosystem. Licence is non-standard, and there is a paid enterprise tier alongside the open version.`,
    whoItIsFor: [
      "Companies that cannot let staff paste work into a hosted chat product",
      "Teams running local models who need a usable interface on top",
      "IT leads standardising one AI interface across an organisation",
      "Anyone wanting document chat without building retrieval themselves",
    ],
    useCases: [
      "Giving the whole company an AI assistant that never leaves your network",
      "Chatting over internal documents with built-in RAG",
      "Serving several models behind one interface so people pick the right one",
      "Running in an air-gapped environment where hosted tools are impossible",
      "Standardising access and permissions instead of everyone using personal accounts",
    ],
    whenToUse: [
      "Data residency or confidentiality rules out hosted chat products",
      "You already run Ollama or a local inference server and need a front end",
      "You want RAG over internal docs without building the pipeline",
      "Staff are using personal AI accounts and you need a sanctioned alternative",
    ],
    whenToAvoid: [
      "Nobody on your team can operate self-hosted infrastructure",
      "A hosted product would be cheaper once you account for maintenance time",
      "You need deep workflow automation — this is a chat interface, not an orchestrator",
      "Enterprise features you need sit behind the paid tier anyway",
    ],
    automationIdeas: [
      {
        title: "Sanctioned company assistant",
        detail:
          "Replace shadow personal AI accounts with one internal interface that IT can actually govern.",
        audience: "operations",
      },
      {
        title: "Internal document chat",
        detail:
          "Point the built-in RAG at your handbook and policies so routine questions self-serve.",
        audience: "operations",
      },
      {
        title: "Air-gapped deployment",
        detail:
          "Serve an assistant inside a disconnected environment for teams handling regulated data.",
        audience: "engineering",
      },
      {
        title: "Model routing by task",
        detail:
          "Expose a fast cheap model and a strong expensive one, and guide staff on which to use when.",
        audience: "finance",
      },
      {
        title: "Support knowledge front end",
        detail:
          "Give support agents a chat interface grounded in current product docs and known issues.",
        audience: "support",
      },
      {
        title: "Usage visibility",
        detail:
          "Track which teams use AI most and for what, to decide where to invest in real automation next.",
        audience: "founder",
      },
      {
        title: "Confidential drafting",
        detail:
          "Let legal and finance draft sensitive documents against a local model with nothing leaving the network.",
        audience: "finance",
      },
      {
        title: "Custom plugin for internal APIs",
        detail:
          "Build a plugin that lets staff query internal systems through the same chat interface.",
        audience: "engineering",
      },
      {
        title: "Onboarding Q&A",
        detail:
          "Load onboarding material so new hires can ask questions instead of interrupting their manager.",
        audience: "operations",
      },
      {
        title: "Local model evaluation",
        detail:
          "Give the team a way to compare local models side by side on real work before you standardise.",
        audience: "engineering",
      },
    ],
    categories: ["rag-knowledge", "llm-gateway"],
    audiences: ["operations", "engineering", "support"],
    industries: ["saas", "fintech", "healthtech", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 148348,
      forks: 21594,
      openIssues: 551,
      language: "Python",
      license: "NOASSERTION",
      createdAt: "2023-10-06",
      pushedAt: "2026-08-10",
    },
    topics: [
      "llm",
      "llm-ui",
      "mcp",
      "ollama",
      "openai",
      "rag",
      "self-hosted",
      "webui",
    ],
    seoKeywords: [
      "open webui github",
      "self hosted ChatGPT alternative",
      "ollama web interface",
      "offline AI chat interface",
      "open webui RAG",
    ],
    relatedSlugs: ["librechat", "localai", "private-gpt"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "langchain",
    name: "LangChain",
    repo: "langchain-ai/langchain",
    owner: "langchain-ai",
    url: "https://github.com/langchain-ai/langchain",
    homepage: "https://docs.langchain.com/langchain/",
    tagline:
      "The default framework for building agents in code, now centred on Deep Agents for planning and subagents.",
    whatItDoes: `LangChain is the framework most teams reach for when they are building agents in code rather than on a canvas. It chains interoperable components and third-party integrations so the application survives the underlying technology changing underneath it — which, given the pace, is a real concern.

The current entry point the maintainers push is Deep Agents, a higher-level package built on LangChain with planning, subagents, and file system usage already handled. That matters because the historical criticism of LangChain was abstraction overhead for simple tasks; Deep Agents targets the patterns people actually build repeatedly.

It spans Python and TypeScript, integrates with essentially every model provider, and LangGraph handles stateful multi-agent graphs when a simple chain is not enough.

144,000 stars, MIT licensed, and a genuinely large ecosystem — which cuts both ways: plenty of examples, plenty of churn.`,
    whoItIsFor: [
      "Engineering teams building agents as part of a product, not as internal tooling",
      "Developers who need provider flexibility designed in from the start",
      "Teams whose agent logic is too complex for a visual builder",
      "Anyone needing stateful multi-agent graphs via LangGraph",
    ],
    useCases: [
      "Building an agent feature inside your own product",
      "Orchestrating multi-step reasoning with planning and subagents",
      "Abstracting over providers so a model change is not a rewrite",
      "Implementing RAG as part of a larger application rather than as the whole thing",
      "Stateful workflows where the graph structure genuinely matters",
    ],
    whenToUse: [
      "Agent logic lives in your product and needs to be tested and versioned like code",
      "You need planning and subagents rather than a linear chain",
      "Provider independence is a design requirement",
      "Your team is comfortable with a large, fast-moving framework",
    ],
    whenToAvoid: [
      "The task is simple — a direct API call avoids a lot of abstraction",
      "You want stability over capability; the API surface moves quickly",
      "Nobody on the team will own keeping up with framework changes",
      "A visual tool would let the people who understand the process build it themselves",
    ],
    automationIdeas: [
      {
        title: "In-product agent feature",
        detail:
          "Ship an agent your customers use directly, with the logic versioned and tested alongside the rest of your code.",
        audience: "engineering",
      },
      {
        title: "Planning-then-execution pipeline",
        detail:
          "Use Deep Agents so complex requests get decomposed into a plan before any step executes.",
        audience: "engineering",
      },
      {
        title: "Provider abstraction layer",
        detail:
          "Build against the framework so switching model providers is a config change during a pricing negotiation.",
        audience: "finance",
      },
      {
        title: "Stateful onboarding agent",
        detail:
          "Model a multi-session onboarding flow as a graph that remembers where each customer left off.",
        audience: "support",
      },
      {
        title: "Document processing chain",
        detail:
          "Chain extraction, validation, and enrichment steps with retries and error handling at each stage.",
        audience: "operations",
      },
      {
        title: "Research subagent fan-out",
        detail:
          "Split a research question across subagents by source type, then synthesise into one brief.",
        audience: "marketing",
      },
      {
        title: "Tool-calling internal API layer",
        detail:
          "Expose your internal APIs as tools so agents act through reviewed interfaces rather than raw access.",
        audience: "engineering",
      },
      {
        title: "Evaluation harness",
        detail:
          "Build a repeatable eval suite so changes to prompts or models are measured rather than guessed at.",
        audience: "engineering",
      },
      {
        title: "Fallback chain for reliability",
        detail:
          "Configure provider fallbacks so a rate limit or outage degrades quality rather than breaking the feature.",
        audience: "engineering",
      },
      {
        title: "Customer-specific agent config",
        detail:
          "Parameterise one agent implementation per customer configuration instead of forking the code.",
        audience: "operations",
      },
    ],
    categories: ["agent-framework", "rag-knowledge"],
    audiences: ["engineering", "data"],
    industries: ["saas", "any"],
    difficulty: "engineering-project",
    stats: {
      stars: 143844,
      forks: 23964,
      openIssues: 428,
      language: "Python",
      license: "MIT",
      createdAt: "2022-10-17",
      pushedAt: "2026-08-09",
    },
    topics: [
      "agents",
      "ai-agents",
      "deepagents",
      "framework",
      "langgraph",
      "llm",
      "multiagent",
      "rag",
    ],
    seoKeywords: [
      "langchain github",
      "langchain deep agents",
      "langgraph multi agent",
      "AI agent framework python",
      "langchain vs llamaindex",
    ],
    relatedSlugs: ["llama-index", "crewai", "genkit"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "awesome-llm-apps",
    name: "Awesome LLM Apps",
    repo: "Shubhamsaboo/awesome-llm-apps",
    owner: "Shubhamsaboo",
    url: "https://github.com/Shubhamsaboo/awesome-llm-apps",
    homepage: "https://www.theunwindai.com",
    tagline:
      "100+ working agents, skills, and RAG apps you can clone, ship, or sell — Apache 2.0, tested end to end.",
    whatItDoes: `Most "awesome" lists are link collections. This one is a collection of working applications: over a hundred AI agents, agent skills, and RAG apps, hand-built and tested end to end, all Apache 2.0.

The licence choice is the point. Apache 2.0 means you can clone it, ship it, and sell it — the maintainers say so explicitly. These are starting points for real products, not read-only examples.

The catalog spans genuinely useful ground: insurance claim agent teams, fraud investigation agents, self-improving agent skills, home renovation agents, always-on briefing agents. Each has a step-by-step tutorial on the associated site. It works across Claude, Gemini, GPT, DeepSeek, Llama, and Qwen.

There is also a one-line install path (\`npx skills add …\`) to give a coding agent a new skill in seconds. 132,000 stars and, tellingly, only 9 open issues.`,
    whoItIsFor: [
      "Founders looking for a working starting point rather than a blank file",
      "Engineers who learn faster from a running application than from documentation",
      "Teams evaluating what is realistic before scoping their own build",
      "Anyone who wants a commercially usable licence on their starting code",
    ],
    useCases: [
      "Finding a working reference for the exact pattern you are about to build",
      "Shipping an internal tool this week by adapting a tested template",
      "Comparing implementations of the same idea across model providers",
      "Teaching your team by having them extend a working app rather than start from nothing",
      "Validating a product idea cheaply before committing engineering time",
    ],
    whenToUse: [
      "You are starting something and want a proven skeleton",
      "You need a commercially permissive licence on example code",
      "Your team learns by modifying working software",
      "You want to see the same pattern across several model providers",
    ],
    whenToAvoid: [
      "You need production-hardened code — these are well-built examples, not audited systems",
      "Your requirements are unusual enough that no template fits",
      "You would spend longer adapting a template than writing it cleanly yourself",
      "You need long-term support guarantees on the code you ship",
    ],
    automationIdeas: [
      {
        title: "Always-on briefing agent",
        detail:
          "Adapt the briefing template to watch your own sources and deliver a daily digest to Slack.",
        audience: "founder",
      },
      {
        title: "Claims-style document triage",
        detail:
          "Repurpose the insurance claim agent team pattern for any structured document intake process you run.",
        audience: "operations",
      },
      {
        title: "Fraud and anomaly review",
        detail:
          "Use the fraud investigation pattern to review transactions or signups and escalate the suspicious ones.",
        audience: "finance",
      },
      {
        title: "RAG prototype in a day",
        detail:
          "Clone a RAG app, point it at your documentation, and have a working prototype to demo the same day.",
        audience: "engineering",
      },
      {
        title: "Self-improving skill loop",
        detail:
          "Adapt the self-improving skills example so your internal skills get refined from real usage.",
        audience: "operations",
      },
      {
        title: "Provider comparison test",
        detail:
          "Run the same template on two providers to see which handles your data better before you commit.",
        audience: "engineering",
      },
      {
        title: "Team learning exercise",
        detail:
          "Have each engineer extend a different template and demo it, as a fast way to build shared fluency.",
        audience: "operations",
      },
      {
        title: "Customer-facing demo assets",
        detail:
          "Build quick working demos of what automation could look like for a prospect's specific workflow.",
        audience: "sales",
      },
      {
        title: "Internal tool bootstrapping",
        detail:
          "Ship small internal tools from templates instead of adding them to the engineering backlog.",
        audience: "operations",
      },
      {
        title: "Feasibility spike",
        detail:
          "Before scoping a build, adapt the closest template to confirm the approach actually works on your data.",
        audience: "founder",
      },
    ],
    categories: ["learning", "agent-framework", "rag-knowledge"],
    audiences: ["engineering", "founder", "operations"],
    industries: ["saas", "fintech", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 131807,
      forks: 19414,
      openIssues: 9,
      language: "Python",
      license: "Apache-2.0",
      createdAt: "2024-04-29",
      pushedAt: "2026-08-09",
    },
    topics: ["agents", "llms", "python", "rag"],
    seoKeywords: [
      "awesome llm apps github",
      "open source AI agent examples",
      "RAG app templates apache 2.0",
      "AI agent starter projects",
      "100 AI agents github",
    ],
    relatedSlugs: ["awesome-claude-skills", "ai-for-beginners", "dify"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "cc-switch",
    name: "CC Switch",
    repo: "farion1231/cc-switch",
    owner: "farion1231",
    url: "https://github.com/farion1231/cc-switch",
    homepage: "https://ccswitch.io",
    tagline:
      "One desktop app to manage providers, skills, and config across every coding agent you have installed.",
    whatItDoes: `If you use more than one agent client, you have more than one config file, more than one provider setup, and no single place to see what is installed where. CC Switch is the manager for that mess.

It handles Claude Code, Claude Desktop, Codex, Gemini CLI, Grok Build, OpenCode, OpenClaw, and Hermes Agent from one cross-platform desktop app built with Tauri and Rust. Provider management, skills management, and MCP configuration all live in one place, with WSL support for Windows users.

The practical value is switching. Moving a project from one provider to another, or trying a different agent on the same task, stops being a config-editing exercise.

126,000 stars. The README carries a pointed warning that ccswitch.io is the only official site — as with any tool that manages credentials, install from the source you verified.`,
    whoItIsFor: [
      "Anyone who uses two or more agent clients regularly",
      "Teams standardising provider and MCP configuration across machines",
      "People who switch providers based on cost or rate limits",
      "Windows users who need WSL-aware agent tooling",
    ],
    useCases: [
      "Switching an agent between providers without hand-editing config",
      "Seeing every skill and MCP server installed across all your clients at once",
      "Standardising a team's agent configuration from one interface",
      "Managing separate provider credentials for different clients or projects",
      "Recovering quickly when one provider hits a rate limit mid-task",
    ],
    whenToUse: [
      "Config drift across agent clients is costing you time",
      "You switch providers regularly and want it to be one click",
      "You want a visual inventory of installed skills and MCP servers",
      "You are on Windows and need WSL support handled properly",
    ],
    whenToAvoid: [
      "You use exactly one agent with one provider — there is nothing to manage",
      "You prefer config in version control over a GUI managing it",
      "You are cautious about a desktop app touching agent credentials, which is fair",
      "You cannot verify you are installing from the official source",
    ],
    automationIdeas: [
      {
        title: "Provider failover on rate limit",
        detail:
          "When one provider throttles, switch the whole team to a backup in one action instead of editing files.",
        audience: "engineering",
      },
      {
        title: "Config drift audit",
        detail:
          "Compare agent configuration across machines and flag where someone's setup diverges from the standard.",
        audience: "operations",
      },
      {
        title: "Skill inventory review",
        detail:
          "Quarterly review of every installed skill and MCP server, removing what is unused or unvetted.",
        audience: "operations",
      },
      {
        title: "Cost-driven provider routing",
        detail:
          "Route routine work to a cheaper provider and reserve the expensive one for hard tasks.",
        audience: "finance",
      },
      {
        title: "New machine setup",
        detail:
          "Bring a replacement laptop to full agent parity in minutes rather than an afternoon of config.",
        audience: "operations",
      },
      {
        title: "Client A/B comparison",
        detail:
          "Run the same task through two agent clients and compare results without reconfiguring anything.",
        audience: "engineering",
      },
      {
        title: "Credential rotation",
        detail:
          "Rotate provider keys in one place and have every client pick up the change.",
        audience: "engineering",
      },
      {
        title: "Onboarding config bundle",
        detail:
          "Ship a standard configuration to new hires so their agents match the team from day one.",
        audience: "operations",
      },
      {
        title: "MCP server rollout",
        detail:
          "Push a new internal MCP server to every engineer's clients from one interface.",
        audience: "operations",
      },
      {
        title: "Spend attribution",
        detail:
          "Keep separate credentials per project so model spend can be attributed rather than pooled.",
        audience: "finance",
      },
    ],
    categories: ["llm-gateway", "coding-agent"],
    audiences: ["engineering", "operations", "finance"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 126025,
      forks: 8576,
      openIssues: 2127,
      language: "Rust",
      license: "MIT",
      createdAt: "2025-08-04",
      pushedAt: "2026-08-10",
    },
    topics: [
      "ai-tools",
      "claude-code",
      "codex",
      "desktop-app",
      "mcp",
      "provider-management",
      "skills-management",
      "tauri",
    ],
    seoKeywords: [
      "cc switch github",
      "ccswitch.io claude code manager",
      "manage multiple AI coding agents",
      "claude code provider switcher",
      "MCP config manager desktop",
    ],
    relatedSlugs: ["ecc", "litellm", "openwork"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
];
