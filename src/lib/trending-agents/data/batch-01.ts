import type { TrendingAgent } from "../types";

export const BATCH_01: TrendingAgent[] = [
  {
    slug: "reverse-skill",
    name: "reverse-skill",
    repo: "zhaoxuya520/reverse-skill",
    owner: "zhaoxuya520",
    url: "https://github.com/zhaoxuya520/reverse-skill",
    homepage: null,
    tagline:
      "A routing layer that tells your coding agent which security tool to reach for, and how to use it properly.",
    whatItDoes: `Coding agents are confident and frequently wrong about specialist tooling. Hand one an Android APK, a stripped binary, an obfuscated JavaScript bundle, or a packet capture and it will guess at commands — reaching for jadx when it needed Frida, or inventing flags that do not exist.

reverse-skill sits in front of that guessing. It is a router: 41 rules that read the task, decide which methodology applies, check whether the required tools are actually installed on the machine, bootstrap anything missing, and then run a repeatable playbook instead of improvising. It ships 42 tracked skill modules and a 163-case regression benchmark, and it runs on Windows and Ubuntu CI.

The second half is the part teams underestimate — a self-evolving knowledge base. Findings, evidence, and dead ends get written back into a field journal, so the same mistake is not repeated on the next engagement. It works with Claude Code, Kiro, Cursor, Cline, and other agent clients.

Important framing: this is built for authorized work. The workflow forces a scope file with explicit authorization and a network profile before any action is taken against a target.`,
    whoItIsFor: [
      "Security teams running authorized penetration tests who want consistent methodology instead of whatever the analyst remembered that day",
      "Application security engineers at SaaS companies reviewing their own mobile and web builds before release",
      "Engineering leaders who need security findings documented in a repeatable, auditable format",
      "CTF players and security researchers who want tool selection to stop being the bottleneck",
    ],
    useCases: [
      "Triaging your own mobile app build to see what an attacker would extract from it",
      "Standardising how a security team documents evidence, findings, and reproduction paths",
      "Onboarding a junior analyst who knows the theory but not which of forty tools to open first",
      "Running a repeatable pre-release check against a binary or bundle as part of CI",
      "Building an institutional memory of what worked, so engagement two is faster than engagement one",
    ],
    whenToUse: [
      "You have written authorization to test the target, and scope is defined",
      "Your team keeps re-deriving the same methodology because nothing is written down",
      "Tool sprawl is real — scripts and MCP servers scattered across different machines",
      "You want an agent to follow a playbook, not free-associate about security",
    ],
    whenToAvoid: [
      "You do not have explicit written authorization for the target. The tooling assumes you do; that is your responsibility, not the router's",
      "You need a compliance-grade audit with a signed report — this accelerates practitioners, it does not replace a qualified assessor",
      "Your team has no security background at all. This routes expertise, it does not create it, and misread findings are worse than none",
      "You want an off-the-shelf SaaS scanner with a dashboard — this is a practitioner's toolkit that lives in the terminal",
    ],
    automationIdeas: [
      {
        title: "Pre-release mobile build check",
        detail:
          "On every release-candidate build, run the APK playbook against your own artifact and post a findings summary into the release channel before the ship decision is made.",
        audience: "engineering",
      },
      {
        title: "Evidence-to-ticket pipeline",
        detail:
          "Convert each Evidence→Finding→Path record into a Jira or Linear ticket with severity, reproduction steps, and the affected file already filled in.",
        audience: "engineering",
      },
      {
        title: "Security posture digest for the founder",
        detail:
          "Weekly plain-English summary of what was tested, what was found, and what is still open — no jargon, delivered to Slack every Friday.",
        audience: "founder",
      },
      {
        title: "Dependency exposure sweep",
        detail:
          "When a new CVE lands for a library you ship, route an automated check across your own builds and report which artifacts actually contain the vulnerable path.",
        audience: "engineering",
      },
      {
        title: "Scope guard enforcement",
        detail:
          "Block any agent action until a signed scope file with authorization and network profile exists, and log every attempt that was refused.",
        audience: "operations",
      },
      {
        title: "Field journal to knowledge base",
        detail:
          "Sync the self-evolving journal into your internal wiki nightly so the security playbook becomes searchable by the whole engineering org.",
        audience: "operations",
      },
      {
        title: "Onboarding path for new analysts",
        detail:
          "Generate a personalised ramp plan from the 42 skill modules based on which ones a new hire has not yet used, tracked as a checklist.",
        audience: "operations",
      },
      {
        title: "Toolchain drift alerts",
        detail:
          "Nightly check that every machine in the team has the same tool versions bootstrapped, and open a ticket when one drifts.",
        audience: "engineering",
      },
      {
        title: "Customer security questionnaire assist",
        detail:
          "Pull real evidence from past authorized tests to pre-fill the security sections of enterprise procurement questionnaires, with a human approving each answer.",
        audience: "sales",
      },
      {
        title: "Regression benchmark gate",
        detail:
          "Run the 163-case benchmark on any change to your routing rules and refuse to merge when the pass rate drops.",
        audience: "engineering",
      },
    ],
    categories: ["agent-skills", "vertical-agent"],
    audiences: ["engineering", "operations", "founder"],
    industries: ["saas", "fintech", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 22790,
      forks: 2140,
      openIssues: 34,
      language: "PowerShell",
      license: "MIT",
      createdAt: "2026-05-13",
      pushedAt: "2026-08-09",
    },
    topics: [
      "reverse-engineering",
      "penetration-testing",
      "security-research",
      "claude-code",
      "skill-router",
    ],
    seoKeywords: [
      "reverse skill github",
      "reverse-skill claude code",
      "security skill router for AI agents",
      "AI agent reverse engineering toolkit",
      "authorized pentesting agent skill",
    ],
    relatedSlugs: ["open-code-review", "superpowers", "anthropic-skills"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "openwork",
    name: "OpenWork",
    repo: "different-ai/openwork",
    owner: "different-ai",
    url: "https://github.com/different-ai/openwork",
    homepage: "https://openworklabs.com",
    tagline:
      "Share one set of AI skills, MCP servers, and connected accounts across every agent and every teammate.",
    whatItDoes: `Most teams that adopt AI agents end up with the same mess: one person wires a useful skill into Claude Code, someone else rebuilds it in Cursor, a third does it again in Codex, and none of them can use each other's work. Credentials get pasted into three places. Nothing is governed.

OpenWork is a desktop app and, more importantly, a single MCP server that fixes the sharing problem. You define a capability once — a skill, a plugin, an MCP connection, a Google Workspace or Microsoft 365 integration — and then any compatible agent can reach it. The MCP exposes just two tools: \`search_capabilities\` to find what is available, and \`execute_capability\` to run it.

The desktop app is optional. If your team already lives in Claude Code or Cursor, you add the MCP and keep working where you are. For larger organisations there is an admin interface to publish capabilities, manage who can use what, and configure whether a connection is shared or per-user.

It is open source and positions itself as the alternative to Claude Cowork, built on opencode, running on macOS, Windows, and Linux.`,
    whoItIsFor: [
      "Teams where three different people have each wired up the same integration in three different agents",
      "Ops leads who need to control which agents can touch the CRM, and with whose credentials",
      "Founders who want one place to see every AI capability the company has built",
      "Agencies that need to reuse the same workflow across multiple client workspaces without copy-paste",
    ],
    useCases: [
      "Publishing an approved 'lookup a customer in the CRM' capability that everyone's agent can call",
      "Sharing Google Workspace and Microsoft 365 access with agents without handing out raw credentials",
      "Standardising a set of skills across a team that uses a mix of Claude Code, Cursor, and Codex",
      "Giving a new hire working agent capabilities on day one instead of week three",
      "Keeping per-user connections separate so each person's agent acts as them, not as a shared service account",
    ],
    whenToUse: [
      "More than two people are building agent workflows and the work is not being reused",
      "You need an audit trail of which capabilities exist and who can run them",
      "Your team is split across different agent clients and you refuse to standardise on one",
      "You want to keep credentials out of individual config files",
    ],
    whenToAvoid: [
      "You are one person with one agent — the coordination layer solves a problem you do not have yet",
      "You need a hosted, vendor-supported product with an SLA rather than something you run yourself",
      "Your compliance posture forbids a desktop app holding connection configuration for shared services",
      "You only need one integration and a plain MCP server would do the job with less moving parts",
    ],
    automationIdeas: [
      {
        title: "Company capability catalog",
        detail:
          "Publish every approved automation as a capability, so anyone can ask their agent what's available instead of asking in Slack.",
        audience: "operations",
      },
      {
        title: "Shared CRM lookup for the whole team",
        detail:
          "One governed capability that reads deal state from the CRM, callable from any agent, with per-user credentials so access rules still apply.",
        audience: "sales",
      },
      {
        title: "New-hire agent onboarding",
        detail:
          "Grant a role-based capability bundle on day one — marketing gets the content and analytics tools, sales gets CRM and outreach.",
        audience: "operations",
      },
      {
        title: "Client workspace templates",
        detail:
          "For agencies: define a standard capability set per client engagement and clone it, rather than rewiring integrations for every account.",
        audience: "operations",
      },
      {
        title: "Weekly capability usage report",
        detail:
          "Track which capabilities actually get executed and which were built and forgotten, then retire the dead ones.",
        audience: "founder",
      },
      {
        title: "Credential rotation without chaos",
        detail:
          "Rotate a shared integration's credentials in one place and have every teammate's agent keep working without touching a config file.",
        audience: "engineering",
      },
      {
        title: "Approval-gated capabilities",
        detail:
          "Mark destructive capabilities (send email, update a deal, post publicly) as requiring explicit human approval before execution.",
        audience: "operations",
      },
      {
        title: "Cross-tool content workflow",
        detail:
          "Draft in one agent, fact-check in another, publish through a shared capability — the same skill definitions apply throughout.",
        audience: "marketing",
      },
      {
        title: "Support macro library",
        detail:
          "Turn your best support responses into capabilities so every agent answers consistently, with the current docs as the source.",
        audience: "support",
      },
      {
        title: "Capability changelog to Slack",
        detail:
          "Post a message whenever someone publishes or changes a shared capability, so the team knows what their agents can suddenly do.",
        audience: "operations",
      },
    ],
    categories: ["agent-framework", "workflow-automation"],
    audiences: ["operations", "founder", "engineering", "marketing"],
    industries: ["saas", "agency", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 21729,
      forks: 1580,
      openIssues: 96,
      language: "TypeScript",
      license: "NOASSERTION",
      createdAt: "2026-01-14",
      pushedAt: "2026-08-09",
    },
    topics: ["mcp", "agent-workflows", "opencode", "desktop-app", "skills"],
    seoKeywords: [
      "openwork github",
      "open source Claude Cowork alternative",
      "share MCP servers across team",
      "team AI capability management",
      "openwork MCP setup",
    ],
    relatedSlugs: ["paperclip", "anthropic-skills", "lobehub"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "book-to-skill",
    name: "book-to-skill",
    repo: "virgiliojr94/book-to-skill",
    owner: "virgiliojr94",
    url: "https://github.com/virgiliojr94/book-to-skill",
    homepage: null,
    tagline:
      "Turn a technical book or document folder into a structured skill your agent loads on demand — 24×–51× cheaper than dumping the PDF into context.",
    whatItDoes: `You buy a good technical book. You read it once. Three months later you cannot remember chapter seven existed. Searching the PDF gives you page numbers, not answers. Asking an agent about the book gets you a hallucination or a shrug.

book-to-skill distills the source into structure rather than summary. Point it at a file, a folder, or a glob and it extracts the frameworks, decision rules, and anti-patterns, then writes per-chapter files. Your agent loads the right chapter on demand — you type \`/my-book replication\` and it answers from the actual content.

The economics are the interesting part. The README reports 24×–51× fewer tokens than putting the book in context to answer a single question, measured on real books. You are not paying to re-read a 400-page PDF every time someone asks a question.

It is not limited to books. Any document folder works — internal runbooks, a standards body's specifications, a collection of research papers. It runs with GitHub Copilot CLI, Amp, and Claude Code.`,
    whoItIsFor: [
      "Engineering teams with a shelf of reference books nobody re-reads",
      "Ops leads sitting on years of internal runbooks and process docs that never get opened",
      "Consultants who need to be credible on a methodology by Monday",
      "Anyone paying real money to stuff the same large document into context repeatedly",
    ],
    useCases: [
      "Turning your internal onboarding handbook into something a new hire's agent can answer from",
      "Making a dense standard (accessibility, security, accounting) queryable during actual work",
      "Distilling a sales methodology book into a skill your reps' agents apply to live deals",
      "Converting a compliance manual into per-section skills so answers cite the right clause",
      "Building a house style guide skill from the writing books your team actually agrees with",
    ],
    whenToUse: [
      "You have a large, stable reference document that gets consulted repeatedly",
      "Token cost from re-reading long PDFs is showing up on your bill",
      "You need answers grounded in a specific source rather than the model's general knowledge",
      "The material is structured — chapters, sections, clear headings",
    ],
    whenToAvoid: [
      "The source changes weekly. You would be regenerating the skill constantly; a live RAG index fits better",
      "You do not have the right to process the material. Check the licence on anything you did not write",
      "The document is short enough to just paste in — under a few thousand tokens, this is overhead",
      "You need exact verbatim retrieval for legal reasons; distillation is lossy by design",
    ],
    automationIdeas: [
      {
        title: "Onboarding handbook as a skill",
        detail:
          "Convert the company handbook into a skill so a new hire asks their agent 'how do we do expense approvals' and gets your actual answer, not a generic one.",
        audience: "operations",
      },
      {
        title: "Sales methodology coach",
        detail:
          "Distill the methodology your team sells on, then have it review call notes and flag which stage-gate criteria were never established.",
        audience: "sales",
      },
      {
        title: "Compliance clause lookup",
        detail:
          "Turn the regulation you operate under into per-section skills, so answers to auditor questions point at the specific clause.",
        audience: "operations",
      },
      {
        title: "Brand voice enforcement",
        detail:
          "Build a skill from your style guide and run every outbound draft through it before publishing.",
        audience: "marketing",
      },
      {
        title: "Architecture decision reference",
        detail:
          "Distill the systems books your team actually follows so design reviews cite consistent principles instead of whoever spoke loudest.",
        audience: "engineering",
      },
      {
        title: "Support macro grounding",
        detail:
          "Convert your product documentation into a skill so support drafts are grounded in current docs rather than remembered behaviour.",
        audience: "support",
      },
      {
        title: "Competitive teardown library",
        detail:
          "Feed in competitor whitepapers and docs to build a skill your reps query mid-call for accurate differentiation.",
        audience: "sales",
      },
      {
        title: "Financial policy assistant",
        detail:
          "Turn your finance controls manual into a skill that answers 'can I approve this' with the actual policy text.",
        audience: "finance",
      },
      {
        title: "Research paper digest",
        detail:
          "Point it at a folder of papers in your domain and generate a skill the product team queries when scoping features.",
        audience: "founder",
      },
      {
        title: "Runbook-on-call assistant",
        detail:
          "Distill incident runbooks into a skill so the on-call engineer gets the right procedure at 3am without scrolling a wiki.",
        audience: "engineering",
      },
    ],
    categories: ["agent-skills", "rag-knowledge"],
    audiences: ["operations", "engineering", "marketing", "sales"],
    industries: ["saas", "agency", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 19583,
      forks: 1290,
      openIssues: 21,
      language: "Python",
      license: "MIT",
      createdAt: "2026-05-01",
      pushedAt: "2026-08-07",
    },
    topics: ["claude-code", "skills", "pdf", "knowledge-distillation"],
    seoKeywords: [
      "book to skill github",
      "convert PDF to Claude Code skill",
      "turn book into AI agent skill",
      "reduce token cost PDF context",
      "book-to-skill install",
    ],
    relatedSlugs: ["context7", "graphify", "mempalace"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "tencentdb-agent-memory",
    name: "TencentDB Agent Memory",
    repo: "TencentCloud/TencentDB-Agent-Memory",
    owner: "TencentCloud",
    url: "https://github.com/TencentCloud/TencentDB-Agent-Memory",
    homepage: null,
    tagline:
      "A team-level memory hub that turns conversations, docs, and code into four governed, reusable memory assets.",
    whatItDoes: `Individual agent memory is a solved-ish problem. Team memory is not. When one person's agent learns something useful about your codebase or your customers, that knowledge dies in their session.

TencentDB Agent Memory is a memory hub built for teams. It converts raw material — conversations, documents, code — into four distinct asset types: Chat Memory (what was discussed), Skill (a repeatable capability), LLM-Wiki (structured knowledge), and Code-Graph (how the codebase actually fits together). Those assets are governed, shared, and equipped across different agents and frameworks rather than trapped in one tool.

It runs as three services — memory-core, memory-hub, and a proxy — started together with one script, with a panel on localhost. It is local-first, does vector search and embeddings, and works as an OpenClaw plugin and with Claude Code.

The pitch the README makes is a one-person company building a growing agent team, where each agent inherits what the others learned.`,
    whoItIsFor: [
      "Small teams where the same context gets re-explained to an agent every single session",
      "Engineering orgs that want a code-graph an agent can reason over, not just a vector blob",
      "Ops leads who need memory to be governed — reviewable, correctable, deletable",
      "Solo founders running several agents who want them to share a brain",
    ],
    useCases: [
      "Giving every agent the same accurate picture of how your codebase is structured",
      "Preserving decisions and their reasoning so next quarter's agent does not relitigate them",
      "Building a wiki that maintains itself from the work actually happening",
      "Sharing hard-won customer context between the sales agent and the support agent",
      "Onboarding a new agent (or teammate) into existing institutional knowledge quickly",
    ],
    whenToUse: [
      "You are re-pasting the same background context into agent sessions every week",
      "Multiple agents or frameworks are in play and none of them share what they learn",
      "You want memory you can inspect and correct, not an opaque embedding store",
      "Local-first matters to you — the data should stay on infrastructure you control",
    ],
    whenToAvoid: [
      "You need a managed cloud service with support; this is three services you run and operate",
      "Your use case is a single agent with a short task horizon — session memory is enough",
      "You have no appetite for running a vector store and embedding pipeline in production",
      "The team memory would contain regulated personal data you cannot store this way",
    ],
    automationIdeas: [
      {
        title: "Self-maintaining engineering wiki",
        detail:
          "Convert merged pull requests and design discussions into LLM-Wiki entries automatically, so documentation stops rotting.",
        audience: "engineering",
      },
      {
        title: "Customer context handoff",
        detail:
          "When a deal moves from sales to onboarding, package the accumulated chat memory about that account and equip the success agent with it.",
        audience: "sales",
      },
      {
        title: "Code-graph impact analysis",
        detail:
          "Before a refactor, ask which surfaces depend on the module in question and post the blast radius into the planning thread.",
        audience: "engineering",
      },
      {
        title: "Decision log with reasoning",
        detail:
          "Capture not just what was decided but why, then surface the original reasoning when someone proposes reversing it.",
        audience: "founder",
      },
      {
        title: "Support pattern detection",
        detail:
          "Mine chat memory across support conversations for recurring issues and open a product ticket when a pattern crosses a threshold.",
        audience: "support",
      },
      {
        title: "Skill extraction from repeated work",
        detail:
          "When the same manual sequence appears three times in agent history, propose it as a reusable Skill asset.",
        audience: "operations",
      },
      {
        title: "Onboarding brief generator",
        detail:
          "Generate a role-specific 'what you need to know' brief for a new hire straight from the team's accumulated memory.",
        audience: "operations",
      },
      {
        title: "Memory hygiene review",
        detail:
          "Monthly job that surfaces stale or contradicted memories for a human to confirm, correct, or delete.",
        audience: "operations",
      },
      {
        title: "Cross-agent briefing",
        detail:
          "Equip every agent starting a session with the current state of the project, so nobody opens with outdated assumptions.",
        audience: "founder",
      },
      {
        title: "Competitive intelligence store",
        detail:
          "Route competitor mentions from calls and tickets into a governed wiki asset the whole go-to-market team queries.",
        audience: "marketing",
      },
    ],
    categories: ["memory-context", "rag-knowledge", "vector-search"],
    audiences: ["engineering", "operations", "founder"],
    industries: ["saas", "any"],
    difficulty: "engineering-project",
    stats: {
      stars: 18972,
      forks: 1440,
      openIssues: 58,
      language: "TypeScript",
      license: "NOASSERTION",
      createdAt: "2026-04-07",
      pushedAt: "2026-08-06",
    },
    topics: [
      "agent",
      "ai-agent",
      "embedding",
      "llm",
      "local-first",
      "long-term-memory",
      "memory",
      "openclaw-plugin",
      "vector-search",
    ],
    seoKeywords: [
      "TencentDB agent memory github",
      "team memory hub for AI agents",
      "long term memory for LLM agents",
      "agent code graph memory",
      "local-first agent memory",
    ],
    relatedSlugs: ["mem0", "mempalace", "claude-mem"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "i-have-adhd",
    name: "i-have-adhd",
    repo: "ayghri/i-have-adhd",
    owner: "ayghri",
    url: "https://github.com/ayghri/i-have-adhd",
    homepage: null,
    tagline:
      "A ten-rule skill that stops your coding agent burying the answer under preamble.",
    whatItDoes: `Coding agents pad. You ask a direct question and get "Great question! Let me think about this..." followed by three paragraphs of context before the actual instruction appears, and a "Hope this helps!" at the end.

i-have-adhd is a skill that enforces ten rules on the output. Lead with the next action. Number multi-step tasks. End with one concrete next step. Suppress tangents. Restate state every turn. Give specific time estimates in minutes, not "a bit". Make wins visible. Report errors matter-of-factly. Cap lists at five items. No preamble.

The README's before-and-after is the clearest possible pitch: a rambling paragraph about your auth flow becomes "Run \`npm install jsonwebtoken@latest\`, then edit \`src/auth.ts:42\`" followed by three numbered steps.

Despite the name, no diagnosis is required or implied — it is an output-formatting skill, and it is translated into six languages.`,
    whoItIsFor: [
      "Anyone who reads agent output on a phone or between meetings and needs the answer first",
      "Teams standardising how agents report status so updates are scannable",
      "Engineering managers drowning in verbose agent-generated summaries",
      "People who find long preamble genuinely hard to parse, for whatever reason",
    ],
    useCases: [
      "Making agent status updates in Slack short enough that people actually read them",
      "Getting a straight answer during an incident instead of a lecture",
      "Standardising the shape of automated reports across a team",
      "Cutting output tokens — less padding is also less spend",
    ],
    whenToUse: [
      "Your agent's output is technically correct and practically unreadable",
      "Updates are consumed on mobile or in a busy channel",
      "You want consistent formatting across everyone's agent sessions",
      "You are paying for output tokens spent on pleasantries",
    ],
    whenToAvoid: [
      "You genuinely want the reasoning — this compresses explanation, and for teaching or design review that is a loss",
      "The audience is a customer, where terse can read as curt",
      "You are debugging something subtle and need to see the model's full chain of thought",
      "Your team's culture expects narrative context in written updates",
    ],
    automationIdeas: [
      {
        title: "Scannable Slack status updates",
        detail:
          "Apply the skill to every automated agent update posted to Slack so each one leads with the action and caps at five bullets.",
        audience: "operations",
      },
      {
        title: "Incident response formatting",
        detail:
          "During an incident, force agent output into numbered steps with time estimates so the responder can act without parsing prose.",
        audience: "engineering",
      },
      {
        title: "Executive-readable summaries",
        detail:
          "Run weekly project reports through the ruleset so the founder gets state, next action, and blockers in under ten lines.",
        audience: "founder",
      },
      {
        title: "Output token reduction",
        detail:
          "Measure token spend before and after applying the skill across your agent fleet and report the monthly saving.",
        audience: "finance",
      },
      {
        title: "Standardised code review comments",
        detail:
          "Make review bots state the required change first and drop the hedging, so authors know exactly what to fix.",
        audience: "engineering",
      },
      {
        title: "Sales call follow-up notes",
        detail:
          "Format post-call summaries as action-first bullets a rep can paste straight into the CRM without editing.",
        audience: "sales",
      },
      {
        title: "Support response drafts",
        detail:
          "Draft customer replies with the fix first, then the explanation — then have a human add warmth before sending.",
        audience: "support",
      },
      {
        title: "Daily standup digest",
        detail:
          "Compress overnight agent activity into a five-item maximum digest with a single concrete next step.",
        audience: "operations",
      },
      {
        title: "Marketing brief compression",
        detail:
          "Turn sprawling campaign briefs into numbered, time-estimated task lists the content team can execute against.",
        audience: "marketing",
      },
      {
        title: "Onboarding instructions",
        detail:
          "Generate setup guides that lead with the command to run, with realistic minute estimates per step.",
        audience: "operations",
      },
    ],
    categories: ["agent-skills"],
    audiences: ["engineering", "operations", "founder"],
    industries: ["any"],
    difficulty: "plug-in",
    stats: {
      stars: 18849,
      forks: 980,
      openIssues: 17,
      language: "Python",
      license: "MIT",
      createdAt: "2026-05-13",
      pushedAt: "2026-08-10",
    },
    topics: [
      "adhd",
      "claude-code-plugin",
      "claude-skills",
      "developer-tools",
      "productivity",
    ],
    seoKeywords: [
      "i-have-adhd github",
      "ADHD friendly AI agent output",
      "Claude Code skill concise output",
      "stop AI agent preamble",
      "agent output formatting skill",
    ],
    relatedSlugs: ["caveman", "ponytail", "taste-skill"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
];
