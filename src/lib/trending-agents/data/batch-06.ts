import type { TrendingAgent } from "../types";

export const BATCH_06: TrendingAgent[] = [
  {
    slug: "ragflow",
    name: "RAGFlow",
    repo: "infiniflow/ragflow",
    owner: "infiniflow",
    url: "https://github.com/infiniflow/ragflow",
    homepage: "https://ragflow.io",
    tagline:
      "A production RAG engine with agentic retrieval — deep document understanding rather than naive chunking.",
    whatItDoes: `Most RAG implementations fail in the same place: chunking. Split a document every 500 characters and you sever tables, orphan headings, and produce retrieval that returns fragments without the context that made them meaningful.

RAGFlow's differentiator is deep document understanding — it parses structure before chunking, so tables stay tables and sections stay coherent. On top of that sits agentic retrieval, where the system can reason about what to fetch and refetch rather than doing one similarity lookup and hoping.

The framing the maintainers use is a context layer for LLMs: the job is not just retrieval, it is compiling the right context for a given question. It is self-hostable via Docker, has a cloud option, and is Apache 2.0.

87,000 stars and maintained since 2023. If you tried RAG, got mediocre answers, and blamed the model, the problem was probably ingestion — and this is the category of tool that fixes it.`,
    whoItIsFor: [
      "Teams whose first RAG attempt produced disappointing answers",
      "Anyone doing retrieval over documents with tables, structure, or complex layout",
      "Companies needing self-hosted retrieval for compliance reasons",
      "Engineers who want agentic retrieval rather than single-shot similarity search",
    ],
    useCases: [
      "Building a support assistant over a large, structured documentation set",
      "Retrieval over contracts, reports, or filings where tables carry the meaning",
      "Replacing a naive chunking pipeline that returns fragments without context",
      "Serving retrieval inside a VPC where documents cannot leave",
      "Compiling context across many documents to answer a single hard question",
    ],
    whenToUse: [
      "Your documents have real structure that naive chunking destroys",
      "Answer quality matters more than getting something running this afternoon",
      "You need self-hosting",
      "One retrieval pass is not enough for the questions people actually ask",
    ],
    whenToAvoid: [
      "Your corpus is small and simple — a basic vector store will do",
      "You have no capacity to run and tune retrieval infrastructure",
      "You need it working today; deep parsing pipelines take setup",
      "A hosted retrieval service would meet your requirements more cheaply",
    ],
    automationIdeas: [
      {
        title: "Structured docs assistant",
        detail:
          "Serve answers from documentation where tables and specifications survive retrieval intact.",
        audience: "support",
      },
      {
        title: "Contract question answering",
        detail:
          "Query a contract archive for specific clauses and get the surrounding context, not a fragment.",
        audience: "finance",
      },
      {
        title: "Sales enablement retrieval",
        detail:
          "Let reps ask product questions mid-call and get answers grounded in current specs and pricing tables.",
        audience: "sales",
      },
      {
        title: "Internal policy lookup",
        detail:
          "Answer HR and finance policy questions from source documents so people stop asking a human.",
        audience: "operations",
      },
      {
        title: "Multi-document synthesis",
        detail:
          "Use agentic retrieval to answer questions that require pulling from several documents at once.",
        audience: "data",
      },
      {
        title: "Retrieval quality benchmark",
        detail:
          "Run your real questions against your old pipeline and this one, and measure which answers correctly.",
        audience: "engineering",
      },
      {
        title: "VPC-hosted knowledge base",
        detail:
          "Deploy inside a customer's environment for enterprise deals with strict data requirements.",
        audience: "sales",
      },
      {
        title: "Onboarding knowledge assistant",
        detail:
          "Point it at internal documentation so new hires self-serve answers accurately.",
        audience: "operations",
      },
      {
        title: "Report data extraction",
        detail:
          "Query financial or analytical reports where the answer lives inside a table.",
        audience: "finance",
      },
      {
        title: "Citation-backed answers",
        detail:
          "Require every answer to cite its source document and section, so people can verify.",
        audience: "operations",
      },
    ],
    categories: ["rag-knowledge", "vector-search"],
    audiences: ["engineering", "support", "data", "operations"],
    industries: ["saas", "fintech", "healthtech", "any"],
    difficulty: "engineering-project",
    stats: {
      stars: 87150,
      forks: 10249,
      openIssues: 1897,
      language: "Go",
      license: "Apache-2.0",
      createdAt: "2023-12-12",
      pushedAt: "2026-08-10",
    },
    topics: [
      "agentic-retrieval",
      "context-engineering",
      "llm-apps",
      "rag",
      "retrieval-augmented-generation",
    ],
    seoKeywords: [
      "ragflow github",
      "open source RAG engine",
      "agentic retrieval RAG",
      "ragflow self hosted docker",
      "deep document understanding RAG",
    ],
    relatedSlugs: ["dify", "llama-index", "paddleocr"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "agent-skills",
    name: "Agent Skills",
    repo: "addyosmani/agent-skills",
    owner: "addyosmani",
    url: "https://github.com/addyosmani/agent-skills",
    homepage: "https://skills.addy.ie",
    tagline:
      "Senior-engineer workflows and quality gates, packaged so agents follow them at every phase from spec to ship.",
    whatItDoes: `Addy Osmani's take on the same problem Superpowers addresses, from a different angle: encode what senior engineers actually do, as skills an agent applies consistently.

The structure follows the full development lifecycle — Define (refine the idea), Plan (write the spec and PRD), Build (implement), Verify (test and debug), Review (QA gate), Ship (go live). Each phase has skills that carry the quality gates a senior engineer would apply without being asked.

The value is consistency. A good engineer applies these habits automatically; an agent applies whatever the prompt suggested. This packages the habits so they fire every time regardless of who is driving or how well they phrased the request.

It works with Claude Code, Codex, Cursor, and Antigravity. MIT, 85,000 stars, and only 106 open issues — a well-tended repository.`,
    whoItIsFor: [
      "Teams where agent output quality depends too much on who wrote the prompt",
      "Engineering leads who want quality gates enforced rather than remembered",
      "Less experienced developers who want senior-level process without a senior watching",
      "Anyone shipping agent-written code to production",
    ],
    useCases: [
      "Enforcing a spec-before-code step on every feature",
      "Applying consistent test and QA gates before anything merges",
      "Giving junior engineers a scaffold that produces senior-quality process",
      "Standardising the definition of done across a team",
      "Reducing production defects from agent-generated code",
    ],
    whenToUse: [
      "Agent-generated code reaches production and quality is uneven",
      "You want lifecycle discipline without writing your own skill set",
      "Different engineers get different quality from the same tools",
      "You need quality gates that cannot be skipped by forgetting",
    ],
    whenToAvoid: [
      "You are prototyping something disposable — the gates are overhead",
      "Your team has its own well-established process the skills would conflict with",
      "The work is exploratory research rather than shipping software",
      "You want minimal process; this is deliberately structured",
    ],
    automationIdeas: [
      {
        title: "Spec-before-code enforcement",
        detail:
          "No implementation starts until a PRD exists, generated through the Define and Plan skills.",
        audience: "engineering",
      },
      {
        title: "Automated QA gate",
        detail:
          "Run the Verify and Review skills before any pull request is opened for human review.",
        audience: "engineering",
      },
      {
        title: "Definition-of-done automation",
        detail:
          "Encode your team's actual definition of done so an agent checks it rather than a person remembering.",
        audience: "operations",
      },
      {
        title: "Junior developer scaffold",
        detail:
          "Give less experienced engineers a process that produces senior-quality output while they learn why.",
        audience: "operations",
      },
      {
        title: "Defect trend tracking",
        detail:
          "Measure production defects from agent-written code before and after adopting the lifecycle skills.",
        audience: "engineering",
      },
      {
        title: "PRD generation from tickets",
        detail:
          "Turn a two-line ticket into a proper spec that surfaces the questions nobody asked.",
        audience: "founder",
      },
      {
        title: "Test coverage gate",
        detail:
          "Refuse to advance past Verify until tests exist for the paths the change touches.",
        audience: "engineering",
      },
      {
        title: "Release readiness checklist",
        detail:
          "Use the Ship phase skills to generate a consistent go-live checklist per release.",
        audience: "operations",
      },
      {
        title: "Cross-team consistency",
        detail:
          "Install the same skill set across every team so quality does not vary by squad.",
        audience: "operations",
      },
      {
        title: "Retro input generation",
        detail:
          "Compare what each phase produced against what shipped to find where the process broke down.",
        audience: "engineering",
      },
    ],
    categories: ["agent-skills", "coding-agent"],
    audiences: ["engineering", "operations"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 85309,
      forks: 9180,
      openIssues: 106,
      language: "JavaScript",
      license: "MIT",
      createdAt: "2026-02-15",
      pushedAt: "2026-08-08",
    },
    topics: ["agent-skills", "claude-code", "codex", "cursor", "skills"],
    seoKeywords: [
      "addyosmani agent-skills github",
      "production grade agent skills",
      "engineering skills for AI agents",
      "skills.addy.ie",
      "AI agent quality gates",
    ],
    relatedSlugs: ["superpowers", "anthropic-skills", "open-code-review"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "open-design",
    name: "Open Design",
    repo: "nexu-io/open-design",
    owner: "nexu-io",
    url: "https://github.com/nexu-io/open-design",
    homepage: "https://open-design.ai",
    tagline:
      "Turns your coding agent into a design engine that exports real files — HTML, PDF, PPTX, and MP4.",
    whatItDoes: `Open Design is a local-first desktop app that makes your existing coding agent the rendering engine for design work: prototypes, landing pages, dashboards, slide decks, images, and video.

The part that separates it from a chat interface that produces mockups is export. Output is real files in real formats — HTML, PDF, PPTX, MP4 — that you can hand to a client, present in a meeting, or ship. Not screenshots of an idea.

It is bring-your-own-key across Claude Code, Codex, Cursor, Gemini, OpenCode, Qwen, and twenty-plus other CLIs, so it uses the subscription you already pay for. There is also a paid cloud model service if you would rather not manage keys.

Apache 2.0, 85,000 stars, local-first, and positioned explicitly as the open alternative to Claude Design.`,
    whoItIsFor: [
      "Founders who need presentable design assets without a designer",
      "Agencies producing client deliverables in standard formats",
      "Sales teams building custom decks and prototypes per deal",
      "Anyone who wants generated design work to leave as a usable file",
    ],
    useCases: [
      "Producing a client-ready deck from a brief without opening presentation software",
      "Generating landing page variants as real HTML you can deploy",
      "Building an interactive prototype for a customer conversation",
      "Turning a report into a formatted PDF automatically",
      "Creating dashboard mockups to validate a design before engineering builds it",
    ],
    whenToUse: [
      "You need output in a specific file format, not an image of a design",
      "You already pay for a coding agent and want more value from it",
      "Local-first matters because the work is confidential",
      "Design is a bottleneck and the work is more routine than creative",
    ],
    whenToAvoid: [
      "You have a design team and an established system — this will produce parallel output",
      "Brand consistency is critical and nothing will review the generated work",
      "You need genuinely original creative direction",
      "Your team is not on any of the supported agent CLIs",
    ],
    automationIdeas: [
      {
        title: "Deal-specific pitch decks",
        detail:
          "Generate a tailored PPTX per prospect from their discovery notes, ready for a rep to refine.",
        audience: "sales",
      },
      {
        title: "Landing page variants",
        detail:
          "Produce several real HTML landing pages per campaign and deploy them straight into a test.",
        audience: "marketing",
      },
      {
        title: "Automated report formatting",
        detail:
          "Turn monthly numbers into a formatted PDF report without anyone touching a document template.",
        audience: "finance",
      },
      {
        title: "Client deliverable pipeline",
        detail:
          "For agencies: generate first-draft deliverables in the client's required format and edit from there.",
        audience: "operations",
      },
      {
        title: "Prototype before build",
        detail:
          "Create an interactive prototype for user feedback before committing engineering time.",
        audience: "founder",
      },
      {
        title: "Investor update deck",
        detail:
          "Assemble the monthly investor deck from your metrics automatically, with a human writing the narrative.",
        audience: "founder",
      },
      {
        title: "Onboarding material generation",
        detail:
          "Produce formatted onboarding guides and slides for each new customer segment.",
        audience: "support",
      },
      {
        title: "Video explainer export",
        detail:
          "Generate short MP4 explainers for features directly from the specification.",
        audience: "marketing",
      },
      {
        title: "Dashboard mockup review",
        detail:
          "Mock several dashboard layouts and get stakeholder agreement before writing any code.",
        audience: "engineering",
      },
      {
        title: "Conference collateral",
        detail:
          "Batch-produce event one-pagers and slides in consistent formats ahead of a conference.",
        audience: "marketing",
      },
    ],
    categories: ["vertical-agent", "agent-skills"],
    audiences: ["marketing", "sales", "founder", "operations"],
    industries: ["saas", "agency", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 84792,
      forks: 9906,
      openIssues: 805,
      language: "TypeScript",
      license: "Apache-2.0",
      createdAt: "2026-04-28",
      pushedAt: "2026-08-10",
    },
    topics: [
      "ai-design",
      "byok",
      "design-systems",
      "design-tools",
      "figma-alternative",
      "local-first",
      "prototyping",
      "ui-generator",
    ],
    seoKeywords: [
      "open design github",
      "open source Claude Design alternative",
      "AI design tool local first",
      "generate PPTX PDF with AI agent",
      "open-design.ai",
    ],
    relatedSlugs: ["ui-ux-pro-max-skill", "ppt-master", "taste-skill"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "lobehub",
    name: "LobeHub",
    repo: "lobehub/lobehub",
    owner: "lobehub",
    url: "https://github.com/lobehub/lobehub",
    homepage: "https://lobehub.com",
    tagline:
      "Runs your agents on a 24/7 schedule and reports back — hiring, scheduling, and managing an AI team you do not have to babysit.",
    whatItDoes: `LobeHub calls itself a Chief Agent Operator, and the framing is accurate: it organises agents into continuous operation, handling hiring (configuring agents for roles), scheduling (when each one runs), and reporting (what happened while you were away).

The line the maintainers use — you stay in charge without staying online — captures the actual value. Most agent tooling assumes you are present, watching a session. LobeHub assumes you are not, and is built around agents running on schedule and reporting results.

It grew out of what was a well-regarded chat interface, so the conversational side is mature: knowledge bases, MCP support, and a wide range of providers including OpenAI, Claude, Gemini, DeepSeek, and GLM.

81,000 stars, maintained since 2023. Licence is non-standard, so check it if you plan to build commercially on top.`,
    whoItIsFor: [
      "Founders who want work happening outside their working hours",
      "Ops leads coordinating several recurring automated processes",
      "Small teams trying to cover more ground than their headcount allows",
      "Anyone who wants scheduled agents plus a good chat interface in one tool",
    ],
    useCases: [
      "Running recurring agent jobs on a schedule with consolidated reporting",
      "Coordinating several agents with different responsibilities and cadences",
      "Getting a single morning report on everything that ran overnight",
      "Serving both scheduled automation and interactive chat from one platform",
      "Grounding scheduled agents in an internal knowledge base",
    ],
    whenToUse: [
      "Your automations should run whether or not you are at a keyboard",
      "You want scheduling and reporting built in rather than assembled",
      "A knowledge base and MCP support matter alongside scheduling",
      "One platform for chat and scheduled agents is preferable to two",
    ],
    whenToAvoid: [
      "Your needs are purely interactive — the operations layer is unnecessary",
      "You need fine-grained multi-agent orchestration with dependencies",
      "The non-standard licence conflicts with your commercial plans",
      "You would rather use a general scheduler you already run",
    ],
    automationIdeas: [
      {
        title: "Overnight operations report",
        detail:
          "Every agent that ran overnight reports into one consolidated brief waiting when you start the day.",
        audience: "founder",
      },
      {
        title: "Scheduled competitor monitoring",
        detail:
          "A standing agent checks competitor activity daily and only escalates material changes.",
        audience: "marketing",
      },
      {
        title: "Recurring pipeline hygiene",
        detail:
          "Nightly agent reviews the CRM for stale deals and missing fields, posting a fix list each morning.",
        audience: "sales",
      },
      {
        title: "Knowledge-grounded support drafts",
        detail:
          "Agents draft support replies grounded in the internal knowledge base, queued for human approval.",
        audience: "support",
      },
      {
        title: "Weekly metric assembly",
        detail:
          "Schedule an agent to pull metrics from every source and assemble the weekly review deck.",
        audience: "operations",
      },
      {
        title: "Content calendar execution",
        detail:
          "Agents draft scheduled content ahead of each publication slot for a human to approve.",
        audience: "marketing",
      },
      {
        title: "Role-based agent team",
        detail:
          "Configure distinct agents per function and let each run on the cadence its work requires.",
        audience: "operations",
      },
      {
        title: "Off-hours monitoring",
        detail:
          "Have agents watch critical signals outside working hours and alert only when thresholds break.",
        audience: "engineering",
      },
      {
        title: "Provider cost routing",
        detail:
          "Assign cheaper models to routine scheduled work and stronger ones to the jobs that need them.",
        audience: "finance",
      },
      {
        title: "Agent performance review",
        detail:
          "Review which scheduled agents produce acted-upon output and retire the ones that do not.",
        audience: "founder",
      },
    ],
    categories: ["agent-framework", "workflow-automation"],
    audiences: ["founder", "operations", "marketing"],
    industries: ["saas", "agency", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 81461,
      forks: 15782,
      openIssues: 683,
      language: "TypeScript",
      license: "NOASSERTION",
      createdAt: "2023-05-21",
      pushedAt: "2026-08-10",
    },
    topics: [
      "agent",
      "agent-collaboration",
      "chief-agent-operator",
      "knowledge-base",
      "mcp",
      "skills",
    ],
    seoKeywords: [
      "lobehub github",
      "lobechat agent operations",
      "schedule AI agents 24/7",
      "chief agent operator platform",
      "lobehub self hosted",
    ],
    relatedSlugs: ["paperclip", "hermes-agent", "cherry-studio"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "worldmonitor",
    name: "World Monitor",
    repo: "koala73/worldmonitor",
    owner: "koala73",
    url: "https://github.com/koala73/worldmonitor",
    homepage: "https://worldmonitor.app",
    tagline:
      "A situational awareness dashboard — AI news aggregation and monitoring, with an MCP server so agents can query it.",
    whatItDoes: `World Monitor aggregates news, geopolitical developments, and infrastructure status into one real-time dashboard. The category it borrows from is intelligence tooling, and the repository topics say so directly.

For most businesses the geopolitical framing is not the point. The useful part is the architecture: continuous ingestion from many sources, AI-driven filtering and summarisation, and — critically — an MCP server so your agents can query the monitoring layer rather than each one scraping news independently.

That makes it a reusable pattern. Whether you care about global events or your own market, the shape is the same: aggregate, filter with AI, expose over MCP, alert when something matters.

80,000 stars, AGPL-3.0 licensed — which is a genuine consideration. AGPL has network-use copyleft obligations, so if you build a hosted service on this, read the licence carefully before you ship.`,
    whoItIsFor: [
      "Companies with supply chain or operational exposure to world events",
      "Teams that want one monitoring layer their agents query rather than many scrapers",
      "Founders in markets where regulatory or political change moves fast",
      "Anyone wanting a reference architecture for AI-filtered monitoring",
    ],
    useCases: [
      "Watching for events that affect your supply chain or key markets",
      "Providing agents with a single monitoring source over MCP",
      "Filtering high-volume news down to what actually matters to you",
      "Tracking infrastructure and service status across dependencies",
      "Adapting the architecture to monitor your own industry instead",
    ],
    whenToUse: [
      "External events genuinely affect your operations",
      "Several agents need the same monitoring data and duplicating it is wasteful",
      "You want AI filtering rather than a raw firehose",
      "The MCP-server pattern fits how your agents are built",
    ],
    whenToAvoid: [
      "AGPL-3.0 conflicts with your commercial model — check before building on it",
      "Your business has no meaningful exposure to external events",
      "A few RSS feeds and an alert rule would cover your needs",
      "You cannot operate a continuously-running ingestion service",
    ],
    automationIdeas: [
      {
        title: "Supply chain exposure alerts",
        detail:
          "Monitor regions where your suppliers operate and alert operations when disruption becomes likely.",
        audience: "operations",
      },
      {
        title: "Agent-queryable news layer",
        detail:
          "Expose monitoring over MCP so every agent reads from one source instead of scraping separately.",
        audience: "engineering",
      },
      {
        title: "Regulatory change watch",
        detail:
          "Track regulatory developments in your markets and route relevant ones to the compliance owner.",
        audience: "finance",
      },
      {
        title: "Market entry research",
        detail:
          "Build a continuous picture of a target market before committing to expansion.",
        audience: "founder",
      },
      {
        title: "Customer risk monitoring",
        detail:
          "Watch for events affecting major accounts so your team hears about it before the customer calls.",
        audience: "sales",
      },
      {
        title: "Industry-specific fork",
        detail:
          "Adapt the architecture to monitor your own vertical rather than global events.",
        audience: "engineering",
      },
      {
        title: "Executive briefing feed",
        detail:
          "Generate a short daily briefing filtered to the handful of topics leadership actually tracks.",
        audience: "founder",
      },
      {
        title: "Dependency status tracking",
        detail:
          "Monitor the infrastructure providers you depend on and correlate outages with your own incidents.",
        audience: "engineering",
      },
      {
        title: "Content timing signals",
        detail:
          "Spot emerging topics in your space early enough to publish while attention is still building.",
        audience: "marketing",
      },
      {
        title: "Noise reduction tuning",
        detail:
          "Track which alerts led to action and tighten filters until the signal-to-noise ratio is worth reading.",
        audience: "operations",
      },
    ],
    categories: ["vertical-agent", "browser-data"],
    audiences: ["founder", "operations", "marketing"],
    industries: ["fintech", "marketplace", "saas", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 80285,
      forks: 11999,
      openIssues: 339,
      language: "TypeScript",
      license: "NOASSERTION",
      createdAt: "2026-01-08",
      pushedAt: "2026-08-10",
    },
    topics: [
      "dashboard",
      "geopolitics",
      "mcp",
      "mcp-server",
      "monitoring",
      "news",
      "osint",
    ],
    seoKeywords: [
      "worldmonitor github",
      "real time intelligence dashboard open source",
      "AI news aggregation MCP server",
      "geopolitical monitoring tool",
      "worldmonitor.app",
    ],
    relatedSlugs: ["trendradar", "agent-reach", "last30days-skill"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "deer-flow",
    name: "DeerFlow",
    repo: "bytedance/deer-flow",
    owner: "bytedance",
    url: "https://github.com/bytedance/deer-flow",
    homepage: "https://deerflow.tech",
    tagline:
      "ByteDance's long-horizon agent harness — sandboxes, memory, subagents, and skills for tasks that run for hours.",
    whatItDoes: `DeerFlow — Deep Exploration and Efficient Research Flow — is built for the tasks most agents fail at: work that takes hours rather than minutes, spanning research, code, and creation.

The architecture reflects that. Sub-agents split the work, memory carries state across the whole run, sandboxes contain execution, skills extend capability, and a message gateway handles communication. Each of those exists because long-horizon runs break without them: context is lost, execution escapes its boundaries, or the agent forgets what it already tried.

It builds on LangChain and LangGraph, spans Python and TypeScript, and hit number one on GitHub Trending when version 2 launched in February 2026.

Being from ByteDance means real engineering investment behind it. MIT licensed, 80,000 stars. The complexity is genuine — this is a harness to build on, not a tool you install and use in an afternoon.`,
    whoItIsFor: [
      "Teams building agent products where tasks run for hours",
      "Engineers who need sandboxed execution as a first-class concern",
      "Anyone whose agent loses the thread on long multi-stage work",
      "Companies already invested in LangChain and LangGraph",
    ],
    useCases: [
      "Deep research tasks that require dozens of steps and hold state throughout",
      "Long autonomous coding runs with sandboxed execution",
      "Multi-stage content production combining research, drafting, and revision",
      "Work that needs subagents specialising in different parts of one problem",
      "Building your own product on a harness rather than assembling one",
    ],
    whenToUse: [
      "Tasks genuinely take hours and simpler agents lose coherence",
      "Sandboxing is a requirement, not a nice-to-have",
      "You need subagents, memory, and skills as one coherent system",
      "Your team can invest in a substantial harness",
    ],
    whenToAvoid: [
      "Your tasks complete in minutes — this is heavy machinery for light work",
      "You have no engineering capacity to operate a complex harness",
      "You want something installable rather than buildable",
      "A simpler framework would meet the requirement with less to maintain",
    ],
    automationIdeas: [
      {
        title: "Multi-hour research reports",
        detail:
          "Commission a deep research report that runs for hours across many sources and returns a structured document.",
        audience: "marketing",
      },
      {
        title: "Sandboxed code execution",
        detail:
          "Let agents run generated code safely inside sandboxes as part of a long autonomous task.",
        audience: "engineering",
      },
      {
        title: "Competitive teardown",
        detail:
          "A long-running analysis of a competitor across product, pricing, hiring, and content, synthesised into one brief.",
        audience: "marketing",
      },
      {
        title: "Subagent specialisation",
        detail:
          "Split a complex problem across subagents by domain and have the harness coordinate their outputs.",
        audience: "engineering",
      },
      {
        title: "Long-horizon data analysis",
        detail:
          "Run analysis that requires many iterative steps without losing state between them.",
        audience: "data",
      },
      {
        title: "Due diligence pipeline",
        detail:
          "Automate the research half of due diligence, producing a sourced summary for humans to verify.",
        audience: "founder",
      },
      {
        title: "Content series production",
        detail:
          "Produce a coherent multi-part content series where later pieces build on earlier ones.",
        audience: "marketing",
      },
      {
        title: "Memory-backed continuation",
        detail:
          "Resume an interrupted long run from memory rather than restarting the whole task.",
        audience: "engineering",
      },
      {
        title: "Cost ceiling per run",
        detail:
          "Instrument long runs with hard budget limits, since hours-long tasks can accumulate real spend.",
        audience: "finance",
      },
      {
        title: "Skill library for the harness",
        detail:
          "Build reusable internal skills so each new long-horizon task starts from accumulated capability.",
        audience: "operations",
      },
    ],
    categories: ["agent-framework", "memory-context"],
    audiences: ["engineering", "data", "marketing"],
    industries: ["saas", "any"],
    difficulty: "engineering-project",
    stats: {
      stars: 79630,
      forks: 10890,
      openIssues: 977,
      language: "Python",
      license: "MIT",
      createdAt: "2025-05-07",
      pushedAt: "2026-08-10",
    },
    topics: [
      "agentic-framework",
      "deep-research",
      "harness",
      "langgraph",
      "multi-agent",
      "superagent",
    ],
    seoKeywords: [
      "deer-flow github",
      "bytedance deerflow agent",
      "long horizon agent harness",
      "deep research agent open source",
      "deerflow.tech",
    ],
    relatedSlugs: ["langchain", "ruflo", "crewai"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "understand-anything",
    name: "Understand Anything",
    repo: "Egonex-AI/Understand-Anything",
    owner: "Egonex-AI",
    url: "https://github.com/Egonex-AI/Understand-Anything",
    homepage: "https://understand-anything.com/",
    tagline:
      "You just joined a team with a 200,000-line codebase. This turns it into a graph you can explore and question.",
    whatItDoes: `The README opens with the problem exactly as people experience it: you just joined a new team, the codebase is 200,000 lines, where do you even start?

Understand Anything turns a codebase, knowledge base, or documentation set into an interactive knowledge graph you explore visually, search, and ask questions about. Its stated philosophy — graphs that teach beat graphs that impress — points at the difference between a visualisation that looks impressive in a screenshot and one that actually helps someone learn a system.

It works as a plugin across Claude Code, Codex, Cursor, Copilot, and Gemini CLI, and it is not limited to code: business knowledge bases and documentation work too.

Compared with Graphify, which emphasises deterministic AST parsing and structural query, this leans toward exploration and comprehension. If your problem is "help a human understand this", start here. MIT, 79,000 stars.`,
    whoItIsFor: [
      "New joiners facing a large unfamiliar codebase",
      "Teams whose onboarding depends on whoever has been there longest",
      "Consultants who need to understand a client system quickly",
      "Anyone documenting a system nobody has documented",
    ],
    useCases: [
      "Cutting the time from joining a team to making a safe first change",
      "Exploring an unfamiliar codebase visually before reading files",
      "Turning a sprawling knowledge base into something navigable",
      "Producing architecture documentation from what the code actually does",
      "Helping non-engineers understand how a system is structured",
    ],
    whenToUse: [
      "Comprehension by humans is the goal, not machine-queryable structure",
      "Onboarding time is a real cost you are trying to reduce",
      "The system is large enough that reading files sequentially fails",
      "You want exploration as well as search",
    ],
    whenToAvoid: [
      "You need deterministic structural guarantees for automated tooling",
      "The codebase is small enough to read directly",
      "Nobody will maintain the graph as the code changes and it will go stale",
      "Your priority is agent grounding rather than human understanding",
    ],
    automationIdeas: [
      {
        title: "Day-one onboarding graph",
        detail:
          "Generate a personalised exploration path for each new hire based on the area they will own.",
        audience: "operations",
      },
      {
        title: "Architecture documentation",
        detail:
          "Produce documentation from the actual structure rather than someone's memory of the design.",
        audience: "engineering",
      },
      {
        title: "Client system assessment",
        detail:
          "For consultants: build a working understanding of a client codebase in days rather than weeks.",
        audience: "operations",
      },
      {
        title: "Knowledge base navigation",
        detail:
          "Turn a sprawling internal wiki into a graph people can explore instead of searching blindly.",
        audience: "operations",
      },
      {
        title: "Cross-team explanation",
        detail:
          "Give product and support a visual model of how the system fits together, in terms they can follow.",
        audience: "support",
      },
      {
        title: "Legacy system mapping",
        detail:
          "Map a legacy system before a migration so the plan is based on structure rather than assumption.",
        audience: "engineering",
      },
      {
        title: "Bus-factor reduction",
        detail:
          "Identify areas only one person understands and prioritise knowledge transfer there.",
        audience: "operations",
      },
      {
        title: "Refactor scoping",
        detail:
          "Explore the neighbourhood around a proposed change to scope it honestly before committing.",
        audience: "engineering",
      },
      {
        title: "Interview preparation",
        detail:
          "Give candidates a graph of a sample system so technical interviews start from shared context.",
        audience: "operations",
      },
      {
        title: "Documentation gap review",
        detail:
          "Find heavily-connected areas with no explanation attached and write those docs first.",
        audience: "engineering",
      },
    ],
    categories: ["rag-knowledge", "memory-context", "learning"],
    audiences: ["engineering", "operations", "support"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 78637,
      forks: 6604,
      openIssues: 276,
      language: "TypeScript",
      license: "MIT",
      createdAt: "2026-03-15",
      pushedAt: "2026-07-30",
    },
    topics: [
      "claude-skills",
      "codebase-analysis",
      "knowledge-base",
      "knowledge-graph",
      "memory",
    ],
    seoKeywords: [
      "understand anything github",
      "codebase knowledge graph explorer",
      "onboard to large codebase AI",
      "understand-anything.com",
      "interactive code knowledge graph",
    ],
    relatedSlugs: ["graphify", "context7", "learn-claude-code"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "rtk",
    name: "RTK",
    repo: "rtk-ai/rtk",
    owner: "rtk-ai",
    url: "https://github.com/rtk-ai/rtk",
    homepage: "https://www.rtk-ai.app",
    tagline:
      "Sits between your agent and the shell, compressing command output by 60–90% before it reaches the context window.",
    whatItDoes: `Agents run shell commands and then read the output. Run \`ls\` in a large directory, or \`git log\`, or a verbose test suite, and thousands of tokens of low-information text land in the context window. You pay for all of it, and it crowds out things that matter.

RTK is a proxy that intercepts commands and compresses their output before the agent reads it. \`ls\` and \`tree\` become compact tree formats. Over a hundred commands are supported, with under 10ms of overhead, from a single Rust binary with no dependencies.

The claimed reduction is 60–90% on common development commands, which on a long agentic run is a material change to both cost and context pressure.

Apache 2.0, 75,000 stars. Note the open issue count is high relative to stars — worth checking whether your specific commands are well handled before relying on it.`,
    whoItIsFor: [
      "Anyone running long agentic sessions where context fills with command noise",
      "Teams where model spend on input tokens is material",
      "Developers whose agents work in large repositories with verbose tooling",
      "People hitting context limits mid-task rather than mid-project",
    ],
    useCases: [
      "Cutting input token cost across a team's agent usage",
      "Keeping more useful context available during long runs",
      "Working in large monorepos where directory listings are enormous",
      "Reducing the noise an agent has to reason through",
      "Extending how far a session can go before hitting a context limit",
    ],
    whenToUse: [
      "Your agents run many shell commands per session",
      "Input token cost is showing up meaningfully on the bill",
      "Context exhaustion is interrupting work",
      "Your repositories are large enough that command output is genuinely verbose",
    ],
    whenToAvoid: [
      "The agent needs exact raw output — compression is lossy by design",
      "Your workflows use commands the proxy does not handle well",
      "You are debugging something where every line of output matters",
      "Adding a proxy into your shell path is more risk than the saving justifies",
    ],
    automationIdeas: [
      {
        title: "Input token cost reduction",
        detail:
          "Deploy across the team and report the change in input token spend over a month.",
        audience: "finance",
      },
      {
        title: "Longer effective sessions",
        detail:
          "Measure how much further agent sessions get before hitting context limits after enabling it.",
        audience: "engineering",
      },
      {
        title: "Monorepo agent support",
        detail:
          "Make agents usable in very large repositories where raw directory output would flood context.",
        audience: "engineering",
      },
      {
        title: "CI log compression",
        detail:
          "Compress verbose CI output before an agent reads it for failure triage.",
        audience: "engineering",
      },
      {
        title: "Command coverage audit",
        detail:
          "Check which of your team's most-used commands are supported before rolling it out widely.",
        audience: "engineering",
      },
      {
        title: "Stacked token optimisation",
        detail:
          "Combine with an output-compression skill and measure the effect on both sides of the bill.",
        audience: "finance",
      },
      {
        title: "Context budget monitoring",
        detail:
          "Track what fraction of context is consumed by tool output versus actual work.",
        audience: "engineering",
      },
      {
        title: "Selective bypass rules",
        detail:
          "Configure exceptions so debugging sessions get raw output while routine work stays compressed.",
        audience: "engineering",
      },
      {
        title: "Rate limit relief",
        detail:
          "Fewer input tokens per turn means fewer throttling stalls on constrained plans.",
        audience: "engineering",
      },
      {
        title: "Before-and-after benchmark",
        detail:
          "Run an identical task with and without the proxy to verify the claimed reduction on your workload.",
        audience: "engineering",
      },
    ],
    categories: ["llm-gateway", "coding-agent"],
    audiences: ["engineering", "finance"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 75403,
      forks: 4745,
      openIssues: 1929,
      language: "Rust",
      license: "Apache-2.0",
      createdAt: "2026-01-22",
      pushedAt: "2026-08-07",
    },
    topics: [
      "agentic-coding",
      "claude-code",
      "cli",
      "cost-reduction",
      "developer-tools",
      "token-optimization",
    ],
    seoKeywords: [
      "rtk github",
      "rtk-ai token optimization",
      "reduce LLM token consumption CLI",
      "compress command output for AI agent",
      "rtk-ai.app",
    ],
    relatedSlugs: ["headroom", "caveman", "ponytail"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "taste-skill",
    name: "Taste Skill",
    repo: "Leonxlnx/taste-skill",
    owner: "Leonxlnx",
    url: "https://github.com/Leonxlnx/taste-skill",
    homepage: "https://tasteskill.dev",
    tagline:
      "The anti-slop frontend skill — stronger layout, typography, motion, and spacing instead of boilerplate-looking UI.",
    whatItDoes: `Agent-generated interfaces have a recognisable look: everything centred, default type scale, uniform spacing, no motion. Functional and forgettable.

Taste Skill targets exactly that. It is a portable Agent Skill that upgrades layout, typography, motion, and spacing so generated interfaces stop looking like boilerplate. The maintainers call it the anti-slop frontend framework, which is a fair description of the problem.

It also includes image-generation skills for reference boards — web, mobile, and brand kits. The intended workflow is to generate reference frames with an image model, then hand those frames to Codex, Cursor, or Claude Code as visual direction, so the agent is building toward something rather than improvising.

MIT, 75,000 stars, and notably only 53 open issues.

Compared with UI UX Pro Max, which generates a whole design system, this focuses on craft-level quality in the output itself. They address adjacent problems and can complement each other.`,
    whoItIsFor: [
      "Founders whose product looks like it was built by an agent, because it was",
      "Engineers who know their frontend work looks generic but cannot articulate why",
      "Teams competing in crowded markets where visual quality is a differentiator",
      "Anyone shipping customer-facing interfaces without design support",
    ],
    useCases: [
      "Raising the visual quality of agent-generated screens without a designer",
      "Establishing visual direction with reference boards before building",
      "Adding considered motion and spacing rather than framework defaults",
      "Making a landing page look like someone chose the type",
      "Improving perceived product quality ahead of a fundraise or launch",
    ],
    whenToUse: [
      "Your interfaces work but look unremarkable",
      "You have no designer and visual quality is affecting perception",
      "You want reference-driven building rather than improvisation",
      "Typography and spacing are where your output visibly falls short",
    ],
    whenToAvoid: [
      "You have a designer and a design system — this will introduce competing opinions",
      "Your product is internal tooling where function fully outweighs polish",
      "You need accessibility guarantees; visual craft and accessibility are not the same thing",
      "Strict brand guidelines leave no room for the skill's judgement",
    ],
    automationIdeas: [
      {
        title: "Reference board first",
        detail:
          "Generate visual reference frames before any code, then build toward them rather than improvising.",
        audience: "marketing",
      },
      {
        title: "Landing page quality pass",
        detail:
          "Run every campaign page through the skill before launch so paid traffic lands on something considered.",
        audience: "marketing",
      },
      {
        title: "Pre-launch polish",
        detail:
          "Apply across the product before a launch or fundraise where first impressions carry weight.",
        audience: "founder",
      },
      {
        title: "Motion consistency",
        detail:
          "Establish consistent transition and animation conventions rather than per-component improvisation.",
        audience: "engineering",
      },
      {
        title: "Brand kit generation",
        detail:
          "Use the image skills to produce a brand kit that then guides every generated interface.",
        audience: "marketing",
      },
      {
        title: "Demo environment upgrade",
        detail:
          "Make the demo environment visually strong, since that is what prospects actually judge.",
        audience: "sales",
      },
      {
        title: "Typography standardisation",
        detail:
          "Fix inconsistent type scales across screens built at different times by different people.",
        audience: "engineering",
      },
      {
        title: "Competitive visual audit",
        detail:
          "Compare your interface against competitors and use the skill to close the most visible gaps.",
        audience: "marketing",
      },
      {
        title: "Component refresh",
        detail:
          "Systematically upgrade your existing component library rather than rebuilding it.",
        audience: "engineering",
      },
      {
        title: "Conversion experiment",
        detail:
          "A/B test an upgraded page against the original to see whether visual quality moves conversion.",
        audience: "marketing",
      },
    ],
    categories: ["agent-skills"],
    audiences: ["engineering", "marketing", "founder"],
    industries: ["saas", "ecommerce", "agency", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 74704,
      forks: 5119,
      openIssues: 53,
      language: "JavaScript",
      license: "MIT",
      createdAt: "2026-02-19",
      pushedAt: "2026-07-23",
    },
    topics: [
      "claude-code",
      "codex",
      "design",
      "frontend",
      "skill",
      "vibecoding",
    ],
    seoKeywords: [
      "taste-skill github",
      "anti slop frontend AI",
      "tasteskill.dev",
      "improve AI generated UI design",
      "agent skill typography layout",
    ],
    relatedSlugs: ["ui-ux-pro-max-skill", "open-design", "ponytail"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "learn-claude-code",
    name: "Learn Claude Code",
    repo: "shareAI-lab/learn-claude-code",
    owner: "shareAI-lab",
    url: "https://github.com/shareAI-lab/learn-claude-code",
    homepage: "https://learn.shareai.run",
    tagline:
      "Builds a working agent harness from zero so you understand what these tools are actually doing.",
    whatItDoes: `This teaches harness engineering by building one. The framing in the README is the clearest statement of the idea I have seen: agency comes from model training, not from external code orchestration — but a working agent product needs both. The model is the driver; the harness is the vehicle. This repository teaches you to build the vehicle.

You construct a nano Claude Code from scratch, in Python, understanding each part: the agent loop, tool calling, context management, permissions. "Bash is all you need" is the subtitle, and it is making a point — a surprising amount of what feels like magic is a loop, a tool schema, and careful context handling.

The practical payoff is judgement. Once you have built one, you can evaluate agent tools on their actual architecture rather than their marketing, and you know which problems are hard and which are packaging.

MIT, 74,000 stars, English, Chinese, and Japanese, with only 68 open issues.`,
    whoItIsFor: [
      "Engineers who want to understand agent tooling rather than just use it",
      "Teams deciding whether to build or buy an agent harness",
      "Anyone evaluating agent products who wants to see past the marketing",
      "Developers moving into agent engineering as a specialism",
    ],
    useCases: [
      "Understanding what an agent harness actually does before choosing one",
      "Building internal tooling that needs a custom agent loop",
      "Training engineers into agent work with real depth",
      "Making a credible build-versus-buy decision",
      "Debugging agent behaviour by understanding the mechanism underneath",
    ],
    whenToUse: [
      "You are about to make a significant bet on agent infrastructure",
      "Your team uses these tools daily and understands none of the internals",
      "You need to build something custom rather than adopt a harness",
      "You want to evaluate vendors on architecture rather than claims",
    ],
    whenToAvoid: [
      "You need to ship something now — this is education, not a product",
      "Your team is happy using existing harnesses and has no build ambition",
      "You want current best practice rather than first principles",
      "Nobody has time to work through building a harness from scratch",
    ],
    automationIdeas: [
      {
        title: "Build-versus-buy assessment",
        detail:
          "Work through it before committing to a harness, then write a grounded recommendation.",
        audience: "founder",
      },
      {
        title: "Team depth training",
        detail:
          "Run it as an engineering learning track so agent tooling stops being a black box.",
        audience: "operations",
      },
      {
        title: "Custom internal harness",
        detail:
          "Use it as the foundation for a harness tailored to constraints no off-the-shelf tool meets.",
        audience: "engineering",
      },
      {
        title: "Vendor evaluation rubric",
        detail:
          "Build an architecture-based checklist for assessing agent products rather than trusting demos.",
        audience: "operations",
      },
      {
        title: "Debugging capability",
        detail:
          "Give your team enough understanding to diagnose agent misbehaviour instead of filing a ticket.",
        audience: "engineering",
      },
      {
        title: "Context management study",
        detail:
          "Understand how context is assembled so your team can reason about cost and quality together.",
        audience: "engineering",
      },
      {
        title: "Permission model design",
        detail:
          "Use the permissions material to design what your agents may and may not do in production.",
        audience: "operations",
      },
      {
        title: "Interview material",
        detail:
          "Base agent-engineering interview questions on real architecture rather than tool trivia.",
        audience: "operations",
      },
      {
        title: "Internal architecture talk",
        detail:
          "Have an engineer present what they built so the whole team gains the mental model.",
        audience: "operations",
      },
      {
        title: "Migration confidence",
        detail:
          "Understanding the harness layer makes switching between agent tools a smaller decision.",
        audience: "engineering",
      },
    ],
    categories: ["learning", "agent-framework"],
    audiences: ["engineering", "founder"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 73696,
      forks: 11952,
      openIssues: 68,
      language: "Python",
      license: "MIT",
      createdAt: "2025-06-29",
      pushedAt: "2026-07-28",
    },
    topics: [
      "agent-development",
      "ai-agent",
      "claude-code",
      "educational",
      "teaching",
      "tutorial",
    ],
    seoKeywords: [
      "learn claude code github",
      "build agent harness from scratch",
      "how claude code works internals",
      "nano claude code tutorial",
      "harness engineering agents",
    ],
    relatedSlugs: ["ai-for-beginners", "understand-anything", "langchain"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
];
