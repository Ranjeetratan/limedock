import type { TrendingAgent } from "../types";

export const BATCH_03: TrendingAgent[] = [
  {
    slug: "ai-for-beginners",
    name: "AI for Beginners",
    repo: "microsoft/AI-For-Beginners",
    owner: "microsoft",
    url: "https://github.com/microsoft/AI-For-Beginners",
    homepage: null,
    tagline:
      "Microsoft's free 12-week, 24-lesson AI curriculum — the least glamorous and most reliable way to get a team fluent.",
    whatItDoes: `This is a curriculum, not a tool. Twelve weeks, twenty-four lessons, published by Microsoft under MIT and maintained since 2021 — which in this space makes it ancient and, more usefully, stable.

It covers the actual foundations: neural networks, computer vision, CNNs, RNNs, GANs, and natural language processing, delivered as Jupyter notebooks you run rather than slides you watch. It runs in Binder if you do not want to set anything up locally.

Its value in an agent-heavy world is not that it teaches you to build agents. It is that it teaches your team what is happening underneath one, which is what stops people either over-trusting a model or dismissing it. When someone on your team asks why the model hallucinated the customer's plan tier, this is the background that makes the answer land.

With 64,000 stars and only 27 open issues, it is about as well-maintained as free educational material gets.`,
    whoItIsFor: [
      "Non-engineering teams who keep making decisions about AI without understanding it",
      "Engineers moving into AI work who skipped the fundamentals",
      "Founders who need to evaluate technical claims from vendors and candidates",
      "Teams building a shared vocabulary before an AI project starts",
    ],
    useCases: [
      "A structured twelve-week ramp for a team that keeps saying 'the AI decided'",
      "Interview preparation and calibration when hiring for AI-adjacent roles",
      "Giving a product manager enough grounding to write realistic requirements",
      "Onboarding material for engineers joining an AI project from another domain",
      "Settling internal arguments about what models can and cannot do",
    ],
    whenToUse: [
      "Your team's AI decisions are being made on vibes rather than understanding",
      "You are hiring for AI work and need to evaluate candidates credibly",
      "You want free, vendor-neutral material rather than a course selling a platform",
      "People learn better by running notebooks than watching videos",
    ],
    whenToAvoid: [
      "You need agent-specific, current material — this covers foundations, not the 2026 agent stack",
      "Your team already has ML fundamentals; skip to something applied",
      "You need certification for compliance reasons; this is self-directed with no credential",
      "You want to ship something this week. This is a twelve-week investment",
    ],
    automationIdeas: [
      {
        title: "Structured team ramp",
        detail:
          "Assign two lessons a week with a Friday discussion, tracked as a checklist so it does not quietly die in week three.",
        audience: "operations",
      },
      {
        title: "Hiring calibration set",
        detail:
          "Build interview questions from the curriculum so every candidate is assessed against the same baseline.",
        audience: "operations",
      },
      {
        title: "Vendor claim checker",
        detail:
          "Use the fundamentals to write a standard evaluation rubric your team applies to every AI vendor pitch.",
        audience: "founder",
      },
      {
        title: "Glossary for the whole company",
        detail:
          "Distill the curriculum into an internal glossary so sales, support, and marketing use terms accurately with customers.",
        audience: "marketing",
      },
      {
        title: "Realistic requirement writing",
        detail:
          "Give product managers the grounding to specify AI features that are actually buildable, cutting rework.",
        audience: "founder",
      },
      {
        title: "Support escalation training",
        detail:
          "Teach the support team enough to explain model behaviour to customers instead of escalating every question.",
        audience: "support",
      },
      {
        title: "Notebook-based assessments",
        detail:
          "Turn lesson notebooks into short practical assessments new hires complete during their first month.",
        audience: "operations",
      },
      {
        title: "Weekly lesson digest",
        detail:
          "Post a summary of each week's lesson to Slack so people who fall behind can still follow the thread.",
        audience: "operations",
      },
      {
        title: "Executive briefing series",
        detail:
          "Compress the curriculum into four leadership sessions covering what to fund, what to defer, and what to distrust.",
        audience: "founder",
      },
      {
        title: "Documentation grounding",
        detail:
          "Use it as a source for accurate internal docs explaining how your own AI features work to customers.",
        audience: "marketing",
      },
    ],
    categories: ["learning"],
    audiences: ["engineering", "founder", "operations", "data"],
    industries: ["any"],
    difficulty: "plug-in",
    stats: {
      stars: 64169,
      forks: 12411,
      openIssues: 27,
      language: "Jupyter Notebook",
      license: "MIT",
      createdAt: "2021-03-03",
      pushedAt: "2026-07-21",
    },
    topics: [
      "ai",
      "artificial-intelligence",
      "computer-vision",
      "deep-learning",
      "machine-learning",
      "nlp",
    ],
    seoKeywords: [
      "AI for beginners github",
      "microsoft AI curriculum free",
      "learn AI 12 weeks",
      "AI fundamentals course open source",
      "AI-For-Beginners lessons",
    ],
    relatedSlugs: ["generative-ai-for-beginners", "prompt-engineering", "hello-agents"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "airllm",
    name: "AirLLM",
    repo: "lyogavin/airllm",
    owner: "lyogavin",
    url: "https://github.com/lyogavin/airllm",
    homepage: null,
    tagline:
      "Run a 70B model on a single 4GB GPU — no quantization, no distillation, no pruning.",
    whatItDoes: `AirLLM attacks the memory problem in inference by streaming layers rather than holding the whole model in GPU memory. The headline claim is a 70B model running on a single 4GB card without quantization, distillation, or pruning — meaning you are running the actual model, not a degraded copy.

The numbers scale further than that. 405B Llama 3.1 on 8GB. DeepSeek-V3 at 671B on roughly 12GB. Kimi K3 at 2.8 trillion parameters on under 4GB, because sparse mixture-of-experts models stream one expert at a time instead of a whole layer.

The trade-off is the obvious one and worth stating plainly: streaming weights costs you latency. This is a throughput-and-cost play, not a way to serve low-latency interactive traffic.

It is Apache 2.0, has been maintained since 2023, and supports macOS as well as Linux.`,
    whoItIsFor: [
      "Teams who want to run large open models without renting large GPUs",
      "Anyone doing batch inference where latency does not matter but cost does",
      "Companies with data residency rules that make hosted APIs a non-starter",
      "Researchers evaluating frontier open models on modest hardware",
    ],
    useCases: [
      "Batch-processing a document backlog overnight on hardware you already own",
      "Evaluating whether a large open model is good enough before committing to GPU spend",
      "Keeping sensitive data entirely on-premise while still using a capable model",
      "Running periodic classification or extraction jobs without a per-token API bill",
      "Prototyping against a frontier-size model on a developer workstation",
    ],
    whenToUse: [
      "Throughput matters and latency genuinely does not",
      "Data cannot leave your infrastructure",
      "GPU budget is the binding constraint, not wall-clock time",
      "You want the full model rather than a quantized approximation",
    ],
    whenToAvoid: [
      "You are serving interactive users. Layer streaming makes responses slow",
      "A quantized model would be good enough — it will be far faster",
      "Your volume is low. A hosted API will be cheaper than the engineering time",
      "You have no one to operate GPU infrastructure",
    ],
    automationIdeas: [
      {
        title: "Overnight document classification",
        detail:
          "Batch-process the day's uploaded documents on local hardware while nobody is waiting, with results ready by morning.",
        audience: "operations",
      },
      {
        title: "On-premise PII extraction",
        detail:
          "Extract structured fields from sensitive records without any data leaving your own network.",
        audience: "operations",
      },
      {
        title: "Model evaluation harness",
        detail:
          "Run your eval suite against several large open models locally before deciding which to pay to host.",
        audience: "engineering",
      },
      {
        title: "Support ticket backlog analysis",
        detail:
          "Process a year of tickets in batch to find recurring themes, without a five-figure API bill.",
        audience: "support",
      },
      {
        title: "Bulk content scoring",
        detail:
          "Score a large content library against quality or brand criteria overnight and rank what needs rewriting.",
        audience: "marketing",
      },
      {
        title: "CRM enrichment sweep",
        detail:
          "Enrich and normalise a full CRM export locally, rather than paying per record to an external service.",
        audience: "sales",
      },
      {
        title: "Compliance review pass",
        detail:
          "Run a first-pass review of contracts or policies on infrastructure your compliance team already approved.",
        audience: "finance",
      },
      {
        title: "Cost comparison model",
        detail:
          "Benchmark local batch inference against your current API spend to decide where the crossover point is.",
        audience: "finance",
      },
      {
        title: "Air-gapped inference",
        detail:
          "Serve a capable model inside a fully disconnected environment where hosted APIs are impossible.",
        audience: "engineering",
      },
      {
        title: "Nightly summarisation job",
        detail:
          "Summarise all internal documents changed that day and publish a digest before the team logs on.",
        audience: "operations",
      },
    ],
    categories: ["llm-gateway", "agent-framework"],
    audiences: ["engineering", "data", "finance"],
    industries: ["saas", "fintech", "healthtech", "any"],
    difficulty: "engineering-project",
    stats: {
      stars: 30420,
      forks: 3241,
      openIssues: 135,
      language: "Jupyter Notebook",
      license: "Apache-2.0",
      createdAt: "2023-06-12",
      pushedAt: "2026-08-09",
    },
    topics: [
      "finetune",
      "generative-ai",
      "llama",
      "llm",
      "lora",
      "open-models",
      "qlora",
    ],
    seoKeywords: [
      "airllm github",
      "run 70B model on 4GB GPU",
      "AirLLM inference memory",
      "run large LLM low VRAM",
      "local LLM without quantization",
    ],
    relatedSlugs: ["localai", "private-gpt", "litellm"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "jcode",
    name: "jcode",
    repo: "1jehuang/jcode",
    owner: "1jehuang",
    url: "https://github.com/1jehuang/jcode",
    homepage: "https://jcode.sh",
    tagline:
      "A Rust coding agent that optimises for RAM, for people whose laptop grinds under an Electron harness.",
    whatItDoes: `The pitch is narrow and honest: the most RAM-efficient agent harness. Written in Rust, distributed as a single binary, installed with one curl command on macOS and Linux or one PowerShell line on Windows.

If you have watched a JavaScript-based agent harness consume several gigabytes of memory while you also have a dev server, a browser, and Docker running, the appeal is immediate. Efficiency is not a marketing angle here, it is the entire product thesis.

It is a terminal TUI with MCP support, works across OpenAI and Anthropic-compatible providers, and ships an SDK and published benchmarks — the maintainers are willing to be measured, which is more than most.

At 16,600 stars and MIT licensed with active daily pushes, it is young but moving fast.`,
    whoItIsFor: [
      "Developers on memory-constrained machines who cannot spare four gigabytes for an agent",
      "Teams running several agent sessions in parallel on one machine",
      "People who want a single binary rather than a Node runtime and a dependency tree",
      "Anyone running agents on small cloud instances where RAM is the cost driver",
    ],
    useCases: [
      "Running multiple concurrent agent sessions without exhausting system memory",
      "Agent work on an older laptop that struggles with heavier harnesses",
      "Deploying an agent onto a small VPS where memory determines the bill",
      "CI environments where a lean binary beats a runtime install",
      "Comparing harness performance honestly against published benchmarks",
    ],
    whenToUse: [
      "Memory is your actual constraint, not model quality",
      "You want one binary with no runtime dependencies",
      "You run several agents at once on the same machine",
      "Small-instance hosting costs are driven by RAM",
    ],
    whenToAvoid: [
      "You need a mature plugin ecosystem — this is newer than the established harnesses",
      "You prefer a graphical interface; this is terminal-first",
      "Your machine has memory to spare and you would rather have breadth of features",
      "You need enterprise support rather than a Discord and a GitHub issue tracker",
    ],
    automationIdeas: [
      {
        title: "Parallel agent sessions",
        detail:
          "Run one agent per service in a monorepo simultaneously on a single developer machine without swapping.",
        audience: "engineering",
      },
      {
        title: "Cheap CI agent runner",
        detail:
          "Use the single binary in CI to run agent-driven checks without provisioning a Node runtime per job.",
        audience: "engineering",
      },
      {
        title: "Small-instance automation host",
        detail:
          "Host recurring agent jobs on the smallest viable VPS tier and report the monthly saving against your previous setup.",
        audience: "finance",
      },
      {
        title: "Standard team install",
        detail:
          "Ship one install command in your onboarding docs so every engineer has an identical agent setup on day one.",
        audience: "operations",
      },
      {
        title: "MCP tool hub",
        detail:
          "Register internal MCP servers once so the whole team's agents can reach the same internal tooling.",
        audience: "operations",
      },
      {
        title: "Benchmark-driven selection",
        detail:
          "Run the published benchmarks against your own workload to pick a harness on evidence rather than preference.",
        audience: "engineering",
      },
      {
        title: "Resource-usage alerting",
        detail:
          "Track agent memory footprint across the team and flag when a session behaves abnormally.",
        audience: "operations",
      },
      {
        title: "SDK-driven internal tooling",
        detail:
          "Build a thin internal CLI on the SDK so non-engineers can trigger approved agent tasks safely.",
        audience: "operations",
      },
      {
        title: "Legacy hardware revival",
        detail:
          "Give older machines a useful second life as agent runners rather than replacing them.",
        audience: "finance",
      },
      {
        title: "Provider failover",
        detail:
          "Configure multiple compatible providers so a rate limit on one does not stop the day's automated work.",
        audience: "engineering",
      },
    ],
    categories: ["coding-agent"],
    audiences: ["engineering", "operations"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 16657,
      forks: 1881,
      openIssues: 251,
      language: "Rust",
      license: "MIT",
      createdAt: "2026-01-05",
      pushedAt: "2026-08-10",
    },
    topics: [
      "ai-agent",
      "ai-coding-agent",
      "cli",
      "coding-agent",
      "llm",
      "mcp",
      "rust",
      "terminal",
      "tui",
    ],
    seoKeywords: [
      "jcode github",
      "RAM efficient coding agent",
      "rust AI coding agent terminal",
      "jcode.sh install",
      "lightweight agent harness",
    ],
    relatedSlugs: ["deepseek-reasonix", "t3code", "goose"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "t3code",
    name: "T3 Code",
    repo: "pingdotgg/t3code",
    owner: "pingdotgg",
    url: "https://github.com/pingdotgg/t3code",
    homepage: "https://t3.codes",
    tagline:
      "Drive the coding agents already installed on your machine from your phone.",
    whatItDoes: `T3 Code is not another agent. It is a control surface for the agents you already run — Claude Code, Codex, Cursor, Grok Build, OpenCode. If they are set up on your computer, T3 Code can drive them.

The interesting part is the client story: a native iOS app, a native Android app, a web app, and an Electron desktop app. You start a long task at your desk and check on it from your phone on the train, redirecting it if it has gone sideways.

It works with your existing subscriptions rather than reselling access, so there is no second bill. The maintainers are explicit in the README that they are not selling anything — it was built because existing options (the Codex desktop app, Conductor, Claude Desktop, Cursor Glass) did not meet their bar for something performant, remote-ready, and open.

MIT licensed, from the Ping/T3 team, with an active issue queue reflecting rapid development.`,
    whoItIsFor: [
      "Founders and engineers who want to supervise long agent runs away from the desk",
      "Anyone already paying for Claude Code or Codex who wants better ergonomics around it",
      "Teams that switch between agent tools and want one control surface",
      "People who start work at a laptop and want to check it from a phone",
    ],
    useCases: [
      "Kicking off a long refactor and monitoring progress from your phone",
      "Interrupting an agent that has taken a wrong turn without going back to your desk",
      "Managing several agent sessions across different tools from one interface",
      "Reviewing agent output during a commute rather than at end of day",
      "Getting a remote-capable setup without paying for another subscription",
    ],
    whenToUse: [
      "Your agent runs are long enough that you want to check them while away",
      "You already have agent subscriptions and want better control, not more capability",
      "You use more than one agent tool and switching interfaces is friction",
      "Mobile access is genuinely useful to how you work",
    ],
    whenToAvoid: [
      "All your agent work is short and interactive at a desk",
      "You only use one agent and its native interface is fine",
      "You would rather not expose control of your machine to a remote surface",
      "You need something stable; the issue count reflects how fast this is moving",
    ],
    automationIdeas: [
      {
        title: "Commute review window",
        detail:
          "Queue agent work before leaving and review or redirect it from the phone app on the way home.",
        audience: "engineering",
      },
      {
        title: "Long-run supervision",
        detail:
          "Start a multi-hour migration at the desk and get mobile notifications when it needs a decision.",
        audience: "engineering",
      },
      {
        title: "Cross-tool session board",
        detail:
          "See every running agent across Claude Code, Codex, and Cursor in one list rather than four windows.",
        audience: "operations",
      },
      {
        title: "Founder spot-checks",
        detail:
          "Let a non-engineering founder see what automated work is in flight without opening a terminal.",
        audience: "founder",
      },
      {
        title: "Incident redirect from anywhere",
        detail:
          "If an agent is heading the wrong way during an incident, interrupt and redirect it from a phone.",
        audience: "engineering",
      },
      {
        title: "Overnight batch monitoring",
        detail:
          "Schedule work overnight and check completion status from your phone before you open the laptop.",
        audience: "operations",
      },
      {
        title: "Pair-review on mobile",
        detail:
          "Share agent output with a teammate through the web app for a quick second opinion.",
        audience: "engineering",
      },
      {
        title: "Subscription consolidation review",
        detail:
          "Because it works across tools, compare which agent subscription you actually use and cut the rest.",
        audience: "finance",
      },
      {
        title: "Approval-from-phone workflow",
        detail:
          "Have agents pause at defined checkpoints and wait for a mobile approval before continuing.",
        audience: "operations",
      },
      {
        title: "Remote demo prep",
        detail:
          "Trigger a build or data refresh from the phone before walking into a customer demo.",
        audience: "sales",
      },
    ],
    categories: ["coding-agent", "workflow-automation"],
    audiences: ["engineering", "founder", "operations"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 17757,
      forks: 4023,
      openIssues: 1428,
      language: "TypeScript",
      license: "MIT",
      createdAt: "2026-02-08",
      pushedAt: "2026-08-10",
    },
    topics: ["agent-harness", "mobile", "remote-control", "claude-code", "codex"],
    seoKeywords: [
      "t3code github",
      "T3 Code remote claude",
      "control claude code from phone",
      "agent harness control surface",
      "t3.codes app",
    ],
    relatedSlugs: ["jcode", "deepseek-reasonix", "openwork"],
    trendingWeek: "2026-08-10",
    featured: false,
  },
  {
    slug: "tuicr",
    name: "tuicr",
    repo: "agavra/tuicr",
    owner: "agavra",
    url: "https://github.com/agavra/tuicr",
    homepage: "https://tuicr.dev/",
    tagline:
      "Code review in the terminal with vim keybindings, exporting real reviews to GitHub, GitLab, or Bitbucket.",
    whatItDoes: `Reviewing a large pull request in a browser is a bad experience: you lose your place, the diff paginates, and you cannot use the editor motions your hands already know.

tuicr (pronounced "tweaker") puts the whole review in the terminal. A GitHub-style continuous diff streams every changed file in one scroll. You leave PR-style comments at line, range, file, or review level. Review progress is tracked at file or hunk granularity and persists across sessions, so you can stop halfway through a 40-file review and come back without losing your place.

Crucially it exports somewhere real: push an actual review to GitHub, GitLab, or Bitbucket, copy structured markdown to the clipboard, or pipe to stdout. It is not a private notepad — the review lands where your team already works.

It also works with git, jj, and mercurial, and reviews uncommitted changes, commit ranges, or any remote PR. At 2,600 stars it is the smallest project in this list, and the most focused.`,
    whoItIsFor: [
      "Engineers who live in the terminal and resent switching to a browser to review",
      "Anyone who regularly reviews pull requests too large to hold in their head",
      "Teams on GitLab or Bitbucket underserved by GitHub-centric tooling",
      "People using jj or mercurial who find most tooling assumes git",
    ],
    useCases: [
      "Reviewing a large refactor across dozens of files without losing your place",
      "Reviewing your own uncommitted changes before opening a pull request",
      "Producing structured review markdown to paste into any system",
      "Keeping review in the same environment as the code you are reading",
      "Pausing and resuming a long review across several sessions",
    ],
    whenToUse: [
      "Pull requests are large enough that browser review genuinely hurts",
      "Your team uses GitLab or Bitbucket and tooling options are thin",
      "Vim keybindings are how your hands work and switching costs you",
      "You want review state to persist rather than restarting each time",
    ],
    whenToAvoid: [
      "Your reviews are small and the browser is perfectly adequate",
      "Your team relies on browser-only features like suggested changes or threaded UI conversations",
      "Nobody on the team uses vim motions — the learning curve is real",
      "You need review analytics or policy enforcement; this is a review interface, not a platform",
    ],
    automationIdeas: [
      {
        title: "Self-review before pushing",
        detail:
          "Review your own uncommitted diff in the terminal and catch the obvious problems before a teammate sees them.",
        audience: "engineering",
      },
      {
        title: "Large refactor review sessions",
        detail:
          "Track progress at hunk level across a multi-day review of a big migration, resuming exactly where you stopped.",
        audience: "engineering",
      },
      {
        title: "Agent diff review",
        detail:
          "Review the output of an autonomous agent run in the terminal before any of it reaches a pull request.",
        audience: "engineering",
      },
      {
        title: "Structured review export",
        detail:
          "Pipe markdown review output into your own tooling to track findings over time.",
        audience: "operations",
      },
      {
        title: "Cross-platform review standard",
        detail:
          "Use one review interface across GitHub, GitLab, and Bitbucket repos instead of three different UIs.",
        audience: "engineering",
      },
      {
        title: "Offline review",
        detail:
          "Review a commit range on a flight and push the completed review when you reconnect.",
        audience: "engineering",
      },
      {
        title: "Review-load balancing",
        detail:
          "Export review output to a shared log so leads can see who is carrying the review burden.",
        audience: "operations",
      },
      {
        title: "Onboarding code reading",
        detail:
          "Have new hires walk historic commit ranges as a structured way to learn the codebase.",
        audience: "operations",
      },
      {
        title: "Release diff walkthrough",
        detail:
          "Before cutting a release, scroll the accumulated diff in one stream and note anything risky.",
        audience: "engineering",
      },
      {
        title: "Pair-review over a terminal share",
        detail:
          "Run a shared terminal session so two people review the same continuous diff together.",
        audience: "engineering",
      },
    ],
    categories: ["coding-agent"],
    audiences: ["engineering"],
    industries: ["saas", "any"],
    difficulty: "plug-in",
    stats: {
      stars: 2608,
      forks: 197,
      openIssues: 118,
      language: "Rust",
      license: "MIT",
      createdAt: "2026-01-08",
      pushedAt: "2026-08-05",
    },
    topics: ["ai-tools", "code-review", "rust", "tui"],
    seoKeywords: [
      "tuicr github",
      "terminal code review TUI",
      "vim keybindings code review",
      "review pull requests in terminal",
      "tuicr install",
    ],
    relatedSlugs: ["open-code-review", "jcode", "deepseek-reasonix"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
  {
    slug: "pascal-editor",
    name: "Pascal Editor",
    repo: "pascalorg/editor",
    owner: "pascalorg",
    url: "https://github.com/pascalorg/editor",
    homepage: "https://editor.pascal.app",
    tagline:
      "A 3D architectural editor built on React Three Fiber and WebGPU, with an MCP service so agents can drive it.",
    whatItDoes: `Pascal is a browser-based 3D building editor — floorplans, BIM, parametric design — built with React Three Fiber and WebGPU. That alone would put it outside most agent directories.

What earns it a place is the MCP service. Running \`npx @pascal-app/cli editor\` starts the editor *and* an authenticated MCP service in the background, picking collision-free loopback ports and keeping projects in a local SQLite database. You point an agent at \`pascal mcp connect\` and it can now manipulate architectural models directly.

That combination is unusual and instructive. It is a concrete example of a domain application exposing itself to agents through MCP rather than expecting an agent to click through its interface — the pattern most vertical software will eventually need to adopt.

MIT licensed, 21,000 stars, published as npm packages (\`@pascal-app/core\`, \`viewer\`, \`cli\`) so pieces can be embedded elsewhere.`,
    whoItIsFor: [
      "Architecture, construction, and real-estate teams working with 3D building data",
      "Product teams looking for a working reference on exposing an app to agents over MCP",
      "Developers embedding a 3D viewer into their own property or design product",
      "Anyone generating or modifying floorplans programmatically",
    ],
    useCases: [
      "Letting an agent generate floorplan variants from a written brief",
      "Embedding the viewer into a listing or property management product",
      "Studying how a complex GUI application exposes safe operations to an agent",
      "Producing consistent 3D visuals for proposals without a designer for each one",
      "Keeping architectural project data local in SQLite rather than a vendor cloud",
    ],
    whenToUse: [
      "You work with building or spatial data and want agent access to it",
      "You need a self-hostable 3D editor rather than a subscription product",
      "You are designing your own MCP surface and want a real example to copy",
      "Embedding a viewer matters more than building one",
    ],
    whenToAvoid: [
      "You need certified structural or regulatory-grade CAD output",
      "Your users are on hardware without WebGPU support",
      "You have no 3D or spatial dimension to your product — this is genuinely domain-specific",
      "You need the ecosystem and file-format support of established CAD tooling",
    ],
    automationIdeas: [
      {
        title: "Brief to floorplan variants",
        detail:
          "An agent reads a client brief and generates several floorplan options for a human to react to in the first meeting.",
        audience: "operations",
      },
      {
        title: "Listing visualisation pipeline",
        detail:
          "Generate consistent 3D views for every property listing automatically instead of commissioning each one.",
        audience: "marketing",
      },
      {
        title: "Proposal asset generation",
        detail:
          "Produce branded 3D visuals for sales proposals on demand, so a designer is not in the critical path.",
        audience: "sales",
      },
      {
        title: "MCP surface reference",
        detail:
          "Use its authenticated MCP service as the pattern for exposing your own product's operations to agents safely.",
        audience: "engineering",
      },
      {
        title: "Spatial data validation",
        detail:
          "Have an agent check submitted plans against dimensional rules and flag violations before human review.",
        audience: "operations",
      },
      {
        title: "Client revision loop",
        detail:
          "Capture client feedback in plain language and have the agent apply the change, with a person approving the result.",
        audience: "operations",
      },
      {
        title: "Portfolio rendering batch",
        detail:
          "Re-render an entire project portfolio to a new visual standard overnight rather than one at a time.",
        audience: "marketing",
      },
      {
        title: "Embedded viewer in your product",
        detail:
          "Drop the viewer package into your own property or design app instead of building 3D rendering yourself.",
        audience: "engineering",
      },
      {
        title: "Local project archive",
        detail:
          "Keep all project data in the local SQLite store and back it up on your own schedule, with no vendor dependency.",
        audience: "operations",
      },
      {
        title: "Design brief digest",
        detail:
          "Summarise the geometric changes between two project versions into a plain-English changelog for the client.",
        audience: "operations",
      },
    ],
    categories: ["vertical-agent", "workflow-automation"],
    audiences: ["engineering", "operations", "marketing"],
    industries: ["real-estate", "agency", "any"],
    difficulty: "some-wiring",
    stats: {
      stars: 21250,
      forks: 2716,
      openIssues: 33,
      language: "TypeScript",
      license: "MIT",
      createdAt: "2025-10-16",
      pushedAt: "2026-08-09",
    },
    topics: [
      "3d",
      "architecture",
      "bim",
      "cad",
      "floorplan",
      "mcp",
      "parametric-design",
      "threejs",
    ],
    seoKeywords: [
      "pascal editor github",
      "3D architectural editor open source",
      "MCP 3D building editor",
      "react three fiber BIM editor",
      "pascal app editor local",
    ],
    relatedSlugs: ["open-design", "browser-use", "openwork"],
    trendingWeek: "2026-08-03",
    featured: false,
  },
];
