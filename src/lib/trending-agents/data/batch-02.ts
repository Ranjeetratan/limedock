import type { TrendingAgent } from "../types";

export const BATCH_02: TrendingAgent[] = [
  {
    slug: "hermes-agent",
    name: "Hermes Agent",
    repo: "NousResearch/hermes-agent",
    owner: "NousResearch",
    url: "https://github.com/NousResearch/hermes-agent",
    homepage: "https://hermes-agent.nousresearch.com",
    tagline:
      "A self-improving agent that writes its own skills from experience and reaches you on Telegram, Slack, or WhatsApp while it works.",
    whatItDoes: `Most agents forget everything the moment a session closes. Hermes is built around the opposite premise: a learning loop. It creates skills from things it has actually done, refines them during use, nudges itself to persist what it learned, searches its own past conversations, and builds a deepening model of who you are over time.

The second design decision is that it does not live on your laptop. Hermes runs on a $5 VPS, a GPU cluster, or serverless infrastructure that costs almost nothing when idle — and you talk to it from Telegram, Discord, Slack, WhatsApp, Signal, or the CLI through a single gateway process. Send a voice memo from your phone and it keeps working on a cloud VM.

Model choice is deliberately unopinionated. Nous Portal, OpenRouter, OpenAI, or your own endpoint — switch with \`hermes model\`, no code changes and no lock-in. The terminal interface is a real TUI with multiline editing, slash-command autocomplete, interrupt-and-redirect, and streaming tool output.

At around 228,000 stars it is one of the most starred agent projects on GitHub, which also means a large issue queue and a fast-moving surface.`,
    whoItIsFor: [
      "Founders who want an agent that is reachable from a phone, not tethered to an open laptop",
      "Small teams that need long-running work to continue after they close the lid",
      "Anyone tired of re-teaching an agent the same context every session",
      "Operators who want to switch model providers without rewriting their tooling",
    ],
    useCases: [
      "A persistent assistant that accumulates real knowledge of your business over months",
      "Long-running research or monitoring jobs that report in when something changes",
      "Running an agent from Telegram while travelling, with no laptop involved",
      "Consolidating several one-off scripts into one agent that learns which to use",
      "Avoiding provider lock-in while you evaluate which model actually performs for your work",
    ],
    whenToUse: [
      "You want continuity — an agent that is meaningfully better in month three than month one",
      "The work outlives a single session and needs somewhere to run",
      "Reaching the agent from chat apps matters more than a polished desktop UI",
      "You expect to change model providers and want that to be a config change",
    ],
    whenToAvoid: [
      "You need a stable, slow-moving dependency. A project this large and this fast-moving will churn",
      "Your compliance posture cannot accommodate an agent with persistent memory of business conversations",
      "You want a supported commercial product with an SLA rather than a self-hosted one",
      "Your use case is a single deterministic task — a cron job and a script will be cheaper and more predictable",
    ],
    automationIdeas: [
      {
        title: "Founder's morning briefing",
        detail:
          "Overnight, pull revenue, signups, support volume, and anything unusual, then send a single Telegram message before the first meeting.",
        audience: "founder",
      },
      {
        title: "Always-on competitor watch",
        detail:
          "Monitor competitor pricing, changelogs, and job postings continuously, and message you only when something material changes.",
        audience: "marketing",
      },
      {
        title: "Voice-memo task capture",
        detail:
          "Send a voice note between meetings; the agent transcribes it, works the task on its VM, and reports back when it is done.",
        audience: "founder",
      },
      {
        title: "Skill accumulation from repeated asks",
        detail:
          "When you ask for the same report three times, let it write itself a skill so the fourth request runs instantly.",
        audience: "operations",
      },
      {
        title: "Deal-desk escalation",
        detail:
          "Watch for deals that stall past a threshold and ping the rep on Slack with the specific next action from past conversation history.",
        audience: "sales",
      },
      {
        title: "Inbound lead qualification",
        detail:
          "Enrich each new signup, score fit against your ICP, and drop the qualified ones into a channel with the reasoning attached.",
        audience: "sales",
      },
      {
        title: "On-call summariser",
        detail:
          "During an incident, keep a running plain-English timeline and post the summary to WhatsApp for people not at a keyboard.",
        audience: "engineering",
      },
      {
        title: "Content repurposing loop",
        detail:
          "Turn each published post into channel-specific variants, learning from engagement which framings work for your audience.",
        audience: "marketing",
      },
      {
        title: "Model cost comparison",
        detail:
          "Run the same recurring job across two providers for a week and report which produced better output per dollar.",
        audience: "finance",
      },
      {
        title: "Customer memory across channels",
        detail:
          "Search its own conversation history so that when a customer name comes up, the full backstory arrives with it.",
        audience: "support",
      },
    ],
    categories: ["agent-framework", "memory-context"],
    audiences: ["founder", "operations", "engineering", "sales"],
    industries: ["saas", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 228046,
      forks: 44801,
      openIssues: 30253,
      language: "Python",
      license: "MIT",
      createdAt: "2025-07-22",
      pushedAt: "2026-08-10",
    },
    topics: [
      "ai-agent",
      "anthropic",
      "claude-code",
      "codex",
      "hermes",
      "llm",
      "nous-research",
      "openai",
    ],
    seoKeywords: [
      "hermes agent github",
      "Nous Research hermes agent",
      "self improving AI agent",
      "AI agent telegram slack whatsapp",
      "hermes agent setup",
    ],
    relatedSlugs: ["paperclip", "openwork", "tencentdb-agent-memory"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "paperclip",
    name: "Paperclip",
    repo: "paperclipai/paperclip",
    owner: "paperclipai",
    url: "https://github.com/paperclipai/paperclip",
    homepage: "https://paperclip.ing",
    tagline:
      "Org charts, budgets, and governance for a team of AI agents — if an agent is an employee, this is the company.",
    whatItDoes: `Once you have more than one agent doing real work, the problem stops being capability and starts being management. Who is working on what? What did it cost? Who approved it?

Paperclip is a Node.js server with a React UI that orchestrates a team of agents against business goals. You define a goal — the README's example is "build the #1 AI note-taking app to $1M MRR" — then assign roles (CEO, CTO, engineers, designers, marketers) using any bot from any provider, set budgets, review the strategy, and hit go.

It looks like a task manager. Underneath it is org charts, budget enforcement, governance, goal alignment, and coordination between agents. The framing the maintainers use is that you manage business goals, not pull requests.

At 76,000 stars and MIT licensed, it is one of the more serious attempts at the multi-agent management problem rather than another single-agent wrapper.`,
    whoItIsFor: [
      "Founders running several agents who have lost track of what each one is doing",
      "Ops leads who need a spend ceiling per workstream, not a surprise invoice",
      "Small teams trying to get leverage from agents without hiring a manager for them",
      "Anyone who needs an approval step between an agent's plan and its execution",
    ],
    useCases: [
      "Giving a marketing initiative its own agent team with a fixed monthly budget",
      "Reviewing an agent's proposed strategy before any money or API spend is committed",
      "Tracking cost per goal so you can tell which automations actually pay for themselves",
      "Coordinating handoffs between agents instead of running them as disconnected scripts",
      "Keeping an audit trail of what was decided, by which agent, under whose approval",
    ],
    whenToUse: [
      "You are running three or more agents and coordination has become the bottleneck",
      "Budget control matters — you want hard ceilings rather than after-the-fact reporting",
      "Someone needs to approve plans before agents act on them",
      "You want one dashboard across providers rather than one console per vendor",
    ],
    whenToAvoid: [
      "You have one agent doing one job. This is management overhead you do not need yet",
      "You want agents to run fully autonomously without approval gates — that is not the design",
      "Your workloads are deterministic pipelines; a scheduler is simpler and more reliable",
      "You need SOC 2 style assurances from a vendor rather than software you host yourself",
    ],
    automationIdeas: [
      {
        title: "Budget-capped campaign team",
        detail:
          "Spin up a marketing agent team with a hard monthly ceiling, so experiments cannot quietly run up an API bill.",
        audience: "marketing",
      },
      {
        title: "Cost per automation report",
        detail:
          "Weekly breakdown of spend by goal, so you can retire the automations that cost more than the work they replace.",
        audience: "finance",
      },
      {
        title: "Plan approval gate",
        detail:
          "Require a human sign-off on any agent plan that touches customer-facing systems, with the plan summarised in Slack.",
        audience: "operations",
      },
      {
        title: "Quarterly goal decomposition",
        detail:
          "Feed in the quarter's objective and have the agent team break it into workstreams, then track progress against it.",
        audience: "founder",
      },
      {
        title: "Content pipeline with roles",
        detail:
          "Researcher, writer, and editor agents in sequence, with the editor's output queued for a human before publishing.",
        audience: "marketing",
      },
      {
        title: "Sales research desk",
        detail:
          "A standing agent team that prepares an account brief before every discovery call, budgeted per deal size.",
        audience: "sales",
      },
      {
        title: "Support triage tier",
        detail:
          "First-line agents categorise and draft, escalating anything above a confidence threshold to a person.",
        audience: "support",
      },
      {
        title: "Provider bake-off",
        detail:
          "Assign the same goal to two agent teams on different providers and compare output quality against cost.",
        audience: "engineering",
      },
      {
        title: "Runaway detection",
        detail:
          "Alert when an agent exceeds expected spend or loops without progress, and pause it automatically.",
        audience: "operations",
      },
      {
        title: "Weekly org review",
        detail:
          "Generate a digest of what every agent shipped, what it cost, and what is blocked — the same review you would run with people.",
        audience: "founder",
      },
    ],
    categories: ["agent-framework", "workflow-automation", "observability-evals"],
    audiences: ["founder", "operations", "finance", "marketing"],
    industries: ["saas", "agency", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 76123,
      forks: 14169,
      openIssues: 5053,
      language: "TypeScript",
      license: "MIT",
      createdAt: "2026-03-02",
      pushedAt: "2026-08-10",
    },
    topics: ["agent-orchestration", "multi-agent", "governance", "budgets"],
    seoKeywords: [
      "paperclip github",
      "manage AI agents at work",
      "open source agent orchestration",
      "multi agent management dashboard",
      "AI agent budgets governance",
    ],
    relatedSlugs: ["hermes-agent", "openwork", "buzz"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "deepseek-reasonix",
    name: "DeepSeek-Reasonix",
    repo: "esengine/DeepSeek-Reasonix",
    owner: "esengine",
    url: "https://github.com/esengine/DeepSeek-Reasonix",
    homepage: "http://reasonix.io/",
    tagline:
      "A single-binary coding agent engineered around prefix-cache stability, so you can leave a long autonomous run going.",
    whatItDoes: `Most coding agents degrade over a long session — context churns, the cache invalidates, and cost climbs while quality drops. Reasonix is built specifically around prefix-cache stability so that leaving it running is a reasonable thing to do.

It ships as one Go binary with four ways in: terminal, desktop app, browser, or your editor over ACP. Plan mode, a permissions system, a workspace sandbox, and per-turn checkpoints keep a long autonomous run something you can still read and undo — which is the part that usually makes people nervous.

Configuration is declarative. Providers, agent behaviour, enabled tools, and plugins all live in \`reasonix.toml\`; DeepSeek ships as a preset but any OpenAI-compatible endpoint is a config entry rather than new code. You can optionally run two models together — an executor and a planner — in separate cache-stable sessions.

MCP servers contribute tools, prompts, and resources, and Extension Protocol v1 sidecars extend it further.`,
    whoItIsFor: [
      "Engineering teams that want autonomous runs they can audit and roll back",
      "Cost-conscious teams where prompt caching materially changes the monthly bill",
      "Anyone standardising on DeepSeek or another OpenAI-compatible endpoint",
      "Developers who want one engine reachable from terminal, editor, and browser",
    ],
    useCases: [
      "Long refactors that run for hours with checkpoints you can revert to",
      "Keeping model spend predictable on repetitive codebase-wide work",
      "Running a planner model and an executor model without them thrashing each other's cache",
      "Standardising agent config across a team in a single committed TOML file",
      "Sandboxed execution so an autonomous run cannot wander outside the workspace",
    ],
    whenToUse: [
      "You want autonomy but need per-turn checkpoints to make it reversible",
      "Prefix caching is a real line item and you want it engineered for, not incidental",
      "A single binary with no runtime to install fits your deployment story",
      "You need the same agent reachable from several surfaces",
    ],
    whenToAvoid: [
      "You are committed to a provider without OpenAI-compatible endpoints",
      "You want a GUI-first product; this is terminal-first with other surfaces layered on",
      "Your work is short, interactive, and conversational — cache stability buys you little there",
      "You need a mature ecosystem; the project is young and moving quickly",
    ],
    automationIdeas: [
      {
        title: "Overnight refactor runs",
        detail:
          "Queue a codebase-wide migration to run overnight with checkpoints, and review the diff as a single pull request in the morning.",
        audience: "engineering",
      },
      {
        title: "Cache-cost dashboard",
        detail:
          "Track token spend per run with and without prefix-cache stability, and report the monthly delta to finance.",
        audience: "finance",
      },
      {
        title: "Planner plus executor split",
        detail:
          "Use a stronger model to plan and a cheaper one to execute, keeping each in its own cache-stable session.",
        audience: "engineering",
      },
      {
        title: "Sandboxed dependency upgrades",
        detail:
          "Run upgrades inside the workspace sandbox, execute the test suite, and only surface the ones that pass green.",
        audience: "engineering",
      },
      {
        title: "Config as team standard",
        detail:
          "Commit reasonix.toml so every engineer's agent has identical tools, permissions, and providers.",
        audience: "operations",
      },
      {
        title: "Editor-triggered reviews",
        detail:
          "Over ACP, trigger a review of the current branch from inside the editor and get inline comments back.",
        audience: "engineering",
      },
      {
        title: "Documentation backfill",
        detail:
          "Point a long autonomous run at undocumented modules and let it produce docs, checkpointed so you can reject bad sections.",
        audience: "engineering",
      },
      {
        title: "Test coverage sweep",
        detail:
          "Identify untested paths and generate tests over a long run, with per-turn checkpoints keeping the diff reviewable.",
        audience: "engineering",
      },
      {
        title: "MCP tool consolidation",
        detail:
          "Register your internal MCP servers once in config so every developer's agent can reach the same internal tools.",
        audience: "operations",
      },
      {
        title: "Permission policy enforcement",
        detail:
          "Define which tools an agent may call without asking, and log every request that fell outside the policy.",
        audience: "operations",
      },
    ],
    categories: ["coding-agent", "agent-framework"],
    audiences: ["engineering", "operations"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 33544,
      forks: 2173,
      openIssues: 1002,
      language: "Go",
      license: "MIT",
      createdAt: "2026-04-21",
      pushedAt: "2026-08-10",
    },
    topics: [
      "agent-framework",
      "ai-coding",
      "cli",
      "coding-agent",
      "deepseek",
      "prompt-caching",
      "terminal",
      "tui",
    ],
    seoKeywords: [
      "deepseek reasonix github",
      "DeepSeek coding agent terminal",
      "prefix cache stable AI agent",
      "reasonix.toml config",
      "autonomous coding agent checkpoints",
    ],
    relatedSlugs: ["jcode", "open-code-review", "goose"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "open-code-review",
    name: "Open Code Review",
    repo: "alibaba/open-code-review",
    owner: "alibaba",
    url: "https://github.com/alibaba/open-code-review",
    homepage: "https://open-codereview.ai",
    tagline:
      "Alibaba's internal AI code reviewer, open sourced — deterministic pipelines plus an LLM agent, with line-level comments.",
    whatItDoes: `This started as Alibaba Group's internal AI code review assistant. Over two years it served tens of thousands of developers and identified millions of defects before being open sourced, which is a rather different provenance from most tools in this category.

The architecture is hybrid on purpose. Deterministic pipelines catch the things rules catch reliably — null pointer exceptions, thread-safety problems, XSS, SQL injection — across a built-in multi-language ruleset. An LLM agent with tool use handles everything that needs judgement: it reads full file contents, searches the codebase, and inspects other changed files for context rather than reviewing a diff in isolation.

Output is structured review comments with line-level precision. Beyond diff review, \`ocr scan\` reviews entire files, which is how you audit an unfamiliar codebase or a directory that has no meaningful diff.

It is a Go CLI, Apache 2.0, and works with any OpenAI or Anthropic compatible endpoint. Notably it has a low open-issue count relative to its size, which suggests active maintenance.`,
    whoItIsFor: [
      "Teams where review is the bottleneck and PRs sit for days",
      "Engineering leaders who want a consistent security baseline enforced on every change",
      "Anyone inheriting an unfamiliar codebase who needs a map of where the risk is",
      "Teams that want deterministic rules for known bug classes rather than an LLM guessing",
    ],
    useCases: [
      "Automated first-pass review on every pull request before a human looks",
      "Auditing a codebase you just acquired or inherited with a full-file scan",
      "Enforcing a security ruleset consistently rather than depending on who reviews",
      "Giving junior engineers fast feedback without occupying a senior reviewer",
      "Catching injection and thread-safety classes that reviewers routinely miss",
    ],
    whenToUse: [
      "Review latency is slowing your delivery more than review quality is",
      "You want deterministic checks and LLM judgement, not one or the other",
      "Multi-language repos need one consistent reviewer",
      "You need repository-level context, not isolated diff commentary",
    ],
    whenToAvoid: [
      "You expect it to replace human review entirely — it is a first pass, not a sign-off",
      "Your codebase is in a language outside its built-in ruleset, where value drops sharply",
      "You cannot send code to a model endpoint for policy reasons and have no local option",
      "Your team is two people who already review everything within the hour",
    ],
    automationIdeas: [
      {
        title: "Pre-human PR pass",
        detail:
          "Run on every pull request so the human reviewer starts from a triaged list instead of a raw diff.",
        audience: "engineering",
      },
      {
        title: "Inherited codebase audit",
        detail:
          "Run a full scan across an acquired repo and produce a prioritised risk register before anyone commits to a rewrite.",
        audience: "engineering",
      },
      {
        title: "Security regression gate",
        detail:
          "Fail CI when a change introduces an injection or thread-safety finding above your severity threshold.",
        audience: "engineering",
      },
      {
        title: "Reviewer load report",
        detail:
          "Track how many findings were caught automatically versus by humans, and rebalance who reviews what.",
        audience: "operations",
      },
      {
        title: "Onboarding feedback loop",
        detail:
          "Give new engineers immediate structured review on their first PRs without tying up a senior for a week.",
        audience: "operations",
      },
      {
        title: "Weekly code health digest",
        detail:
          "Summarise recurring defect classes across the week and turn the top pattern into a team-wide lint rule.",
        audience: "engineering",
      },
      {
        title: "Customer security evidence",
        detail:
          "Produce a summary of automated review coverage to attach to enterprise security questionnaires.",
        audience: "sales",
      },
      {
        title: "Legacy directory triage",
        detail:
          "Scan directories nobody has touched in a year to decide what to refactor, document, or delete.",
        audience: "engineering",
      },
      {
        title: "Release readiness check",
        detail:
          "Before a release branch is cut, scan the accumulated diff and post a go/no-go summary to the release channel.",
        audience: "operations",
      },
      {
        title: "Ruleset tuning loop",
        detail:
          "Track which findings engineers dismiss as false positives and tune the ruleset so signal stays high.",
        audience: "engineering",
      },
    ],
    categories: ["coding-agent", "observability-evals"],
    audiences: ["engineering", "operations"],
    industries: ["saas", "fintech", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 19856,
      forks: 1390,
      openIssues: 95,
      language: "Go",
      license: "Apache-2.0",
      createdAt: "2026-05-18",
      pushedAt: "2026-08-10",
    },
    topics: [
      "agent",
      "agent-skills",
      "code-review",
      "code-review-assistant",
      "repository-level-context",
    ],
    seoKeywords: [
      "open code review github",
      "alibaba open code review",
      "AI code review CLI",
      "automated pull request review tool",
      "LLM code review line level comments",
    ],
    relatedSlugs: ["tuicr", "deepseek-reasonix", "reverse-skill"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "ego-lite",
    name: "ego lite",
    repo: "citrolabs/ego-lite",
    owner: "citrolabs",
    url: "https://github.com/citrolabs/ego-lite",
    homepage: "https://lite.ego.app",
    tagline:
      "A browser where you and your agents work in parallel — the agent uses your real logins without stealing your tabs.",
    whatItDoes: `Browser automation for agents has a persistent, mundane problem: logins. Frameworks like browser-use drive a separate browser, so your authenticated sessions never carry cleanly, and when they do share a browser you end up fighting the agent for control of the same tabs.

ego lite is a browser designed from the start for both of you. Your agents run tasks in their own Spaces while your tabs stay yours. The agent reaches your real logins and tabs through the \`ego-browser\` skill, and the maintainers claim tasks complete faster on fewer tokens than framework-driven approaches.

Setup is deliberately minimal — installing the app adds the \`ego-browser\` skill to every agent's skills directory on the machine, so Codex, Claude Code, and others pick it up without configuration. It is MIT licensed and free to run.

The significant caveat is platform: macOS only today, with Windows and Linux on the roadmap.`,
    whoItIsFor: [
      "Anyone whose agent automation keeps breaking on login walls",
      "Sales and marketing teams doing research inside authenticated tools",
      "Ops people who want an agent to use an internal web app that has no API",
      "Solo operators who cannot dedicate a second machine to agent browsing",
    ],
    useCases: [
      "Letting an agent pull data from an internal dashboard that was never given an API",
      "Research across sites where you are already logged in, without re-authenticating",
      "Running several browser tasks in parallel while you keep working in your own tabs",
      "Automating a recurring extract from a SaaS tool whose export button does not exist",
      "Cutting token spend on browser tasks compared with framework-driven automation",
    ],
    whenToUse: [
      "The target site requires a logged-in session and API access is not an option",
      "You want the agent working in the background without hijacking your browser",
      "You are on macOS and want zero-config setup across multiple agent clients",
      "Browser task cost or latency has become a real constraint",
    ],
    whenToAvoid: [
      "You are on Windows or Linux — support is not there yet",
      "You need headless browser automation in CI; this is a desktop browser by design",
      "The site's terms prohibit automated access. Sharing your session does not change what you are permitted to do",
      "You need fine-grained programmatic control of the page — a framework gives you more surface",
    ],
    automationIdeas: [
      {
        title: "Internal dashboard extract",
        detail:
          "Pull weekly numbers out of an internal tool that has no API and drop them into a Slack digest every Monday.",
        audience: "operations",
      },
      {
        title: "Authenticated competitor research",
        detail:
          "Research inside tools that require a login and compile findings into a brief without you re-authenticating each time.",
        audience: "marketing",
      },
      {
        title: "CRM hygiene sweep",
        detail:
          "Have the agent walk your CRM in a background Space and flag records with missing owners or stale stages.",
        audience: "sales",
      },
      {
        title: "Parallel account checks",
        detail:
          "Run the same verification across several logged-in accounts simultaneously in separate Spaces.",
        audience: "operations",
      },
      {
        title: "Billing portal reconciliation",
        detail:
          "Log into vendor portals monthly, pull invoices, and reconcile them against your accounting records.",
        audience: "finance",
      },
      {
        title: "Support ticket enrichment",
        detail:
          "When a ticket arrives, look the customer up across your authenticated admin tools and attach the context.",
        audience: "support",
      },
      {
        title: "Job board monitoring",
        detail:
          "Track competitor hiring behind logged-in job boards to infer where they are investing next.",
        audience: "marketing",
      },
      {
        title: "Analytics screenshot digest",
        detail:
          "Capture the same dashboard views weekly and assemble them into a visual report for the leadership review.",
        audience: "founder",
      },
      {
        title: "Form-heavy workflow relief",
        detail:
          "Automate repetitive multi-step form submissions in internal tools, with a human confirming before the final submit.",
        audience: "operations",
      },
      {
        title: "Token cost comparison",
        detail:
          "Benchmark a recurring browser task here versus your existing framework and report the difference in spend.",
        audience: "engineering",
      },
    ],
    categories: ["browser-data", "agent-skills"],
    audiences: ["operations", "marketing", "sales", "engineering"],
    industries: ["saas", "agency", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 9443,
      forks: 459,
      openIssues: 88,
      language: "JavaScript",
      license: "MIT",
      createdAt: "2026-04-16",
      pushedAt: "2026-08-10",
    },
    topics: [
      "agent-skills",
      "ai-agent",
      "automation",
      "browser",
      "browser-automation",
      "claude-code",
      "codex",
    ],
    seoKeywords: [
      "ego lite github",
      "browser for AI agents",
      "share browser session with AI agent",
      "browser-use alternative",
      "ego-browser skill claude code",
    ],
    relatedSlugs: ["browser-use", "steel-browser", "scrapling"],
    trendingWeek: "2026-08-10",
    featured: true,
  },
  {
    slug: "buzz",
    name: "Buzz",
    repo: "block/buzz",
    owner: "block",
    url: "https://github.com/block/buzz",
    homepage: null,
    tagline:
      "A self-hostable workspace where humans and agents share the same rooms, on an event log you own.",
    whatItDoes: `Buzz is a workspace where people and AI agents occupy the same rooms — built by Block, in Rust, on a relay you host yourself.

The architectural choice that matters is that it is a Nostr relay underneath. Every message, reaction, workflow step, review approval, and git event is a signed event in one log, with the same shape and the same identity model whether the author is a person or a process. That gives you an audit trail by construction rather than as a feature bolted on afterwards.

A Buzz *community* is the workspace a user reaches by URL. In the single-relay setup that ships today, one relay URL means one community; a hosted operator can serve many communities across domains, but the URL always determines the workspace and all tenant-visible state stays community-local.

In daily use it feels like a team chat workspace. Underneath it is an append-only event log with a strong opinion about identity and provenance.`,
    whoItIsFor: [
      "Teams that need a verifiable record of which agent did what, and when",
      "Organisations with data residency or sovereignty requirements",
      "Engineering orgs that want git events and agent actions in one auditable stream",
      "Anyone uncomfortable putting agent coordination inside a third-party SaaS",
    ],
    useCases: [
      "Running agent and human collaboration on infrastructure you control end to end",
      "Producing a cryptographically signed audit trail of automated actions",
      "Keeping review approvals and the work they approved in the same log",
      "Hosting separate client communities behind separate domains from one operator",
      "Replacing a chat tool plus a separate audit system with one event stream",
    ],
    whenToUse: [
      "Provenance matters — you need to prove which identity produced an action",
      "Self-hosting is a requirement rather than a preference",
      "You want humans and agents in genuinely the same room, not agents piped into a channel",
      "An append-only log fits how you need to reason about history",
    ],
    whenToAvoid: [
      "You want a managed product; this is infrastructure you operate, in Rust",
      "Your team is happy in Slack and has no audit or sovereignty driver",
      "You need a mature integration ecosystem today — this is early and the issue count reflects it",
      "Nostr's identity model is a concept your team has no appetite to learn",
    ],
    automationIdeas: [
      {
        title: "Signed deployment log",
        detail:
          "Every deploy, whether triggered by a person or an agent, lands as a signed event you can audit months later.",
        audience: "engineering",
      },
      {
        title: "Agent action provenance",
        detail:
          "When an automation touches a customer record, the log proves which identity did it and under what approval.",
        audience: "operations",
      },
      {
        title: "Review approvals in-stream",
        detail:
          "Keep the approval and the approved change in the same log so compliance review stops being an archaeology exercise.",
        audience: "operations",
      },
      {
        title: "Per-client workspaces",
        detail:
          "For agencies: give each client their own community and domain, with state that cannot leak across tenants.",
        audience: "operations",
      },
      {
        title: "Git activity digest",
        detail:
          "Because git events are first-class, generate a weekly engineering digest straight from the log.",
        audience: "engineering",
      },
      {
        title: "Incident timeline reconstruction",
        detail:
          "Replay the event log to build an exact incident timeline including every agent action taken during it.",
        audience: "engineering",
      },
      {
        title: "Human-in-the-room escalation",
        detail:
          "Agents post into the same room they work in, so a person can intervene mid-task rather than after it.",
        audience: "support",
      },
      {
        title: "Compliance export",
        detail:
          "Produce a signed extract of all automated actions in a period for an auditor, with no manual assembly.",
        audience: "finance",
      },
      {
        title: "Onboarding replay",
        detail:
          "Let a new teammate read the log of how a project actually unfolded rather than a sanitised summary.",
        audience: "operations",
      },
      {
        title: "Workflow step tracking",
        detail:
          "Model multi-step approvals as events so any step's status is queryable without a separate workflow tool.",
        audience: "operations",
      },
    ],
    categories: ["workflow-automation", "agent-framework"],
    audiences: ["engineering", "operations", "founder"],
    industries: ["saas", "fintech", "agency", "any"],
    difficulty: "engineering-project",
    stats: {
      stars: 25758,
      forks: 3047,
      openIssues: 2365,
      language: "Rust",
      license: "Apache-2.0",
      createdAt: "2026-03-06",
      pushedAt: "2026-08-10",
    },
    topics: ["workspace", "nostr", "self-hosted", "audit-log", "collaboration"],
    seoKeywords: [
      "block buzz github",
      "buzz hive mind communication platform",
      "self hosted workspace for AI agents",
      "nostr relay team workspace",
      "auditable agent collaboration",
    ],
    relatedSlugs: ["paperclip", "openwork", "hermes-agent"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
];
