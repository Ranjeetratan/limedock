import type { DirectoryEntry } from "./types";

/**
 * Curated GitHub / article resources shown in Directories
 * instead of the old Systems hub.
 *
 * Live outbound links via `link` + `resourceUrl`, with plain-language examples.
 */
export const GITHUB_RESOURCES: DirectoryEntry[] = [
  {
    slug: "reverse-skill",
    name: "Reverse Skill",
    type: "skill",
    githubRepo: "zhaoxuya520/reverse-skill",
    resourceUrl: "https://github.com/zhaoxuya520/reverse-skill",
    summary:
      "A router pack that points your coding agent at the right reverse-engineering or security workflow instead of guessing commands.",
    overview:
      "Think of this as a map for security research work.\n\nWhen you drop an APK, a binary, or a CTF challenge into Claude Code / Cursor, Reverse Skill routes the job to the matching playbook (APK reverse, IDA, JS signing, malware, and more) and checks which local tools you already have.\n\nRepo (copy/paste): https://github.com/zhaoxuya520/reverse-skill\n\nOnly use on systems you are authorized to test.",
    categories: ["engineering", "other"],
    industries: ["saas", "fintech", "other"],
    link: "https://github.com/zhaoxuya520/reverse-skill",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/zhaoxuya520/reverse-skill\n2. Clone the repo locally.\n3. Point your coding agent at RULES.md / README_AI.md so it loads the router.\n4. Confirm your local tools (jadx, IDA, Frida, etc.) before a real case.",
    howToUse:
      "**Simple example**\nYou have an Android APK you are allowed to analyze.\n\n1. Open the repo in your agent.\n2. Say: “Route this APK — unpack, decompile, find the login signing.”\n3. The router picks `apk-reverse` / related skills and walks a repeatable workflow.\n4. You get structured steps + a report instead of random shell guesses.",
    useCases: [
      "Authorized APK / mobile reverse work",
      "CTF challenge routing",
      "Binary analysis with a checklist, not vibes",
      "JS frontend signing / request replay research",
    ],
    examplePrompts: [
      "Read RULES.md, then route this authorized APK analysis end to end.",
      "Which reverse-skill module should I use for frontend JS signing?",
      "Start a case folder with scope, timeline, and tool checklist for this binary.",
    ],
    prerequisites: [
      "Coding agent that can read repo rules (Claude Code, Cursor, Cline, etc.)",
      "Local reverse / security tools for the modules you need",
      "Written authorization for any real target",
    ],
    tips: [
      "Treat this as a router + playbooks — not a one-click exploit kit.",
      "Start with MASTER-ROUTING.md when you are unsure which module fits.",
      "Keep scope and evidence notes before you ACT.",
    ],
    sources: [],
  },
  {
    slug: "ai-for-beginners",
    name: "AI For Beginners",
    type: "skill",
    githubRepo: "microsoft/AI-For-Beginners",
    resourceUrl: "https://github.com/microsoft/AI-For-Beginners",
    summary:
      "Microsoft’s free 12-week, 24-lesson curriculum for learning AI from scratch — lessons, quizzes, and labs.",
    overview:
      "A structured course, not a Claude skill install.\n\nIf your team keeps saying “we should learn AI properly,” this is the syllabus: TensorFlow / PyTorch basics, ethics, and hands-on labs over 12 weeks.\n\nRepo (copy/paste): https://github.com/microsoft/AI-For-Beginners",
    categories: ["engineering", "product", "other"],
    industries: ["education", "saas", "other"],
    link: "https://github.com/microsoft/AI-For-Beginners",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/microsoft/AI-For-Beginners\n2. Fork or clone the repo.\n3. Open the lesson folders in order (Week 1 → Week 12).\n4. Optional: run labs in Binder from the README badge.",
    howToUse:
      "**Simple example**\nA junior marketer wants AI literacy, not another random YouTube binge.\n\n1. Clone the curriculum.\n2. Block 2 lessons per week on the calendar.\n3. Do the quiz after each lesson before moving on.\n4. Share one lab notebook with the team as “proof of learning.”",
    useCases: [
      "Onboarding non-engineers to AI basics",
      "Team study group with a shared syllabus",
      "Interview prep for AI-adjacent roles",
      "Ethics + fundamentals before tool shopping",
    ],
    examplePrompts: [
      "Summarize Week 1 of AI-For-Beginners in plain English for our growth team.",
      "Turn lesson N into a 30-minute internal workshop agenda.",
      "Quiz me on neural network basics using the curriculum outline.",
    ],
    prerequisites: [
      "Curiosity and calendar time",
      "Python basics help for later labs (not required to start reading)",
      "GitHub account to fork/clone",
    ],
    tips: [
      "Don’t skim all 24 lessons in a weekend — the point is spaced practice.",
      "Pair a lesson with one real work question (“how does this apply to our product?”).",
    ],
    sources: [],
  },
  {
    slug: "airllm-small-gpu-guide",
    name: "AirLLM on Small GPUs",
    type: "skill",
    resourceUrl: "https://medium.com/@hirenkhatri83/inside-airllm-how-to-run-massive-models-on-small-gpus-fc7712784d88",
    summary:
      "Article walkthrough of AirLLM: run huge models (even ~70B) on small VRAM by loading one layer at a time.",
    overview:
      "This is a Medium explainer, not a LimeDock system.\n\nAirLLM keeps model layers on disk, loads one layer into VRAM, computes, drops it, loads the next — so a consumer GPU can run models that normally need a data-center card.\n\nArticle (copy/paste): https://medium.com/@hirenkhatri83/inside-airllm-how-to-run-massive-models-on-small-gpus-fc7712784d88",
    categories: ["engineering", "other"],
    industries: ["saas", "education", "other"],
    link: "https://medium.com/@hirenkhatri83/inside-airllm-how-to-run-massive-models-on-small-gpus-fc7712784d88",
    installation:
      "Not installed into LimeDock.\n\n1. Read the article: https://medium.com/@hirenkhatri83/inside-airllm-how-to-run-massive-models-on-small-gpus-fc7712784d88\n2. Create a clean Python venv as shown in the setup section.\n3. Install AirLLM per the article’s commands.\n4. Start with a smaller model before attempting 70B.",
    howToUse:
      "**Simple example**\nYou have a 4–8 GB GPU and want to try a large open model locally.\n\n1. Read how layer-wise inference + FlashAttention saves VRAM.\n2. Follow the article’s venv + install steps.\n3. Run a short prompt against a model you can legally download.\n4. Expect slower speed — you traded VRAM for time.",
    useCases: [
      "Local experiments without renting big GPUs",
      "Understanding why layer-wise loading works",
      "Prototype offline before cloud spend",
    ],
    examplePrompts: [
      "Explain AirLLM’s layer-wise inference like I’m non-technical.",
      "Given 6 GB VRAM, what should I try first with AirLLM?",
      "Compare AirLLM tradeoffs vs renting an A100 for one weekend.",
    ],
    prerequisites: [
      "NVIDIA GPU + working CUDA/Python setup",
      "Disk space for model weights",
      "Patience — layer streaming is slower than full-load inference",
    ],
    tips: [
      "Read the article before installing anything.",
      "Smaller models first; prove the pipeline before 70B.",
      "This is local research tooling — not a production serving plan.",
    ],
    sources: [],
  },
  {
    slug: "zapier-mcp",
    name: "Zapier MCP",
    type: "agent",
    githubRepo: "zapier/zapier-mcp",
    resourceUrl: "https://github.com/zapier/zapier-mcp",
    summary:
      "Official Zapier MCP plugin — let your AI client talk to thousands of apps (Gmail, Slack, Sheets, CRM) in plain English.",
    overview:
      "Connect your agent to Zapier’s hosted MCP server so it can pull data and trigger actions across ~9,000 apps — with Zapier’s governance, not custom glue code for every API.\n\nRepo (copy/paste): https://github.com/zapier/zapier-mcp",
    categories: ["operations", "growth", "sales"],
    industries: ["saas", "agency", "ecommerce", "other"],
    link: "https://github.com/zapier/zapier-mcp",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/zapier/zapier-mcp\n2. In Cursor / Claude / VS Code, add the Zapier MCP server URL from Zapier’s docs (mcp.zapier.com).\n3. Authenticate with your Zapier account.\n4. Optionally install the plugin from this repo for guided onboarding + role skills.",
    howToUse:
      "**Simple example**\nYou want Claude to draft a reply and log it without leaving chat.\n\n1. Connect Zapier MCP in your AI client.\n2. Ask: “Pull today’s unread support emails labeled VIP, summarize each, draft replies.”\n3. Approve the actions Zapier proposes.\n4. Later: “Create a Slack reminder for any VIP thread still open.”",
    useCases: [
      "Agent reads Gmail / Slack / Sheets safely through Zapier",
      "Trigger HubSpot or Salesforce updates from a chat",
      "Prototype automations before building owned LimeDock workflows",
    ],
    examplePrompts: [
      "List the Zapier apps I have connected, then pull last 10 HubSpot contacts created this week.",
      "Draft a Slack update from this meeting note and post it to #sales when I confirm.",
      "Walk me through a first Zapier MCP demo for a B2B SaaS ops role.",
    ],
    prerequisites: [
      "Zapier account with permission to connect the apps you need",
      "MCP-compatible AI client",
      "Clear rules for what the agent may write vs only read",
    ],
    tips: [
      "Start read-only. Turn on writes only after you trust the flow.",
      "Zapier MCP is inspiration / glue — LimeDock still owns durable Slack+CRM automations when you’re ready.",
    ],
    sources: [],
  },
  {
    slug: "block-buzz",
    name: "Buzz",
    type: "agent",
    githubRepo: "block/buzz",
    resourceUrl: "https://github.com/block/buzz",
    summary:
      "Self-hostable workspace where humans and AI agents share the same rooms — messages, reviews, and git events in one audit log.",
    overview:
      "Buzz (from Block) is a team room for people + agents. Under the hood it’s an event log (Nostr-style): every message, reaction, workflow step, and approval is signed and auditable.\n\nRepo (copy/paste): https://github.com/block/buzz",
    categories: ["operations", "engineering", "product"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/block/buzz",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/block/buzz\n2. Follow the repo’s self-host / relay setup.\n3. Create a community (workspace) URL for your team.\n4. Invite humans and connect agents into the same channels.",
    howToUse:
      "**Simple example**\nYour release channel is chaos — half Slack, half agent logs.\n\n1. Stand up a Buzz community for “Release.”\n2. Humans discuss the plan in-channel.\n3. An agent posts PR status and asks for review approval in the same thread.\n4. Approvals and git events stay on the shared event log.",
    useCases: [
      "Human + agent release coordination",
      "Audit trail for agent actions",
      "Self-hosted alternative to “agent somewhere, chat somewhere else”",
    ],
    examplePrompts: [
      "Explain Buzz in one paragraph for a non-crypto engineering manager.",
      "Outline a minimal Buzz community for our weekly launch checklist.",
      "How would we give an agent a room without giving it production credentials?",
    ],
    prerequisites: [
      "Willingness to self-host a relay / workspace",
      "Clear agent identity and permission model",
      "Team buy-in to live in one room for agent work",
    ],
    tips: [
      "Read VISION.md before installing — it’s a workspace philosophy, not a Chrome extension.",
      "Start with one project channel, not the whole company.",
    ],
    sources: [],
  },
  {
    slug: "tencentdb-agent-memory",
    name: "TencentDB Agent Memory",
    type: "agent",
    githubRepo: "TencentCloud/TencentDB-Agent-Memory",
    resourceUrl: "https://github.com/TencentCloud/TencentDB-Agent-Memory",
    summary:
      "Team-level memory hub for AI agents — turn chats, docs, and code into shared Chat Memory, Skills, Wiki, and Code-Graph assets.",
    overview:
      "Instead of each agent forgetting everything (or hoarding private notes), this project stores reusable team memory: conversations, skills, a wiki, and a code graph that multiple agents can share.\n\nRepo (copy/paste): https://github.com/TencentCloud/TencentDB-Agent-Memory",
    categories: ["engineering", "operations", "product"],
    industries: ["saas", "other"],
    link: "https://github.com/TencentCloud/TencentDB-Agent-Memory",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/TencentCloud/TencentDB-Agent-Memory\n2. Follow the README install (Node package / gateway notes).\n3. Connect the agents you already use so they read/write the shared memory store.\n4. Decide what is team-shared vs private.",
    howToUse:
      "**Simple example**\nTwo agents keep re-learning your API quirks every Monday.\n\n1. Install the memory hub for your team.\n2. After a hard debugging session, save the lesson as Chat Memory / Skill.\n3. Next week a different agent pulls the same skill instead of rediscovering it.\n4. Humans innovate; agents stop amnesia.",
    useCases: [
      "Shared memory across multiple coding agents",
      "Turning tribal Slack knowledge into reusable skills",
      "Code-graph context for larger repos",
    ],
    examplePrompts: [
      "What four memory asset types does TencentDB Agent Memory create?",
      "Design a rule: which conversations become team Skills vs stay private.",
      "How would we plug our support bot and coding agent into one memory hub?",
    ],
    prerequisites: [
      "Node / gateway requirements from the README",
      "Agreement on shared vs private memory",
      "Agents that can call the memory APIs / gateway",
    ],
    tips: [
      "Memory without governance becomes a junk drawer — set owners.",
      "Start with one squad before company-wide memory.",
    ],
    sources: [],
  },
  {
    slug: "book-to-skill",
    name: "Book to Skill",
    type: "skill",
    githubRepo: "virgiliojr94/book-to-skill",
    resourceUrl: "https://github.com/virgiliojr94/book-to-skill",
    summary:
      "Turn a technical book PDF (or docs folder) into a Claude / Copilot skill you can study and use while you work.",
    overview:
      "Stop highlighting PDFs you’ll never reopen. Book-to-skill converts books and document sets into an agent skill — so the book is searchable and usable inside your coding agent.\n\nRepo (copy/paste): https://github.com/virgiliojr94/book-to-skill",
    categories: ["engineering", "product", "other"],
    industries: ["education", "saas", "other"],
    link: "https://github.com/virgiliojr94/book-to-skill",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/virgiliojr94/book-to-skill\n2. Install via the repo’s release / README for your agent (Claude Code, Copilot CLI, Amp).\n3. Point it at a PDF, EPUB, DOCX, or docs folder you have rights to use.\n4. Load the generated skill in your agent.",
    howToUse:
      "**Simple example**\nYou’re implementing auth and own a PDF of an OAuth book.\n\n1. Run book-to-skill on that PDF.\n2. Enable the generated skill in Claude Code.\n3. Ask: “Using the book skill, explain PKCE for our SPA and list pitfalls.”\n4. Get answers grounded in the book while you code.",
    useCases: [
      "Company playbooks → agent skills",
      "Technical books as always-on references",
      "Training material that agents can cite while shipping",
    ],
    examplePrompts: [
      "Convert this internal runbook folder into a skill I can invoke as /runbook.",
      "Using the generated skill, quiz me on chapter 3 before I implement it.",
      "What formats does book-to-skill support?",
    ],
    prerequisites: [
      "Rights to the books/docs you convert",
      "Compatible coding agent",
      "Disk space for source files + generated skill",
    ],
    tips: [
      "One focused book beats dumping your whole Drive.",
      "Name the skill after the job (“oauth-pkce”), not the filename.",
    ],
    sources: [],
  },
  {
    slug: "openwork",
    name: "OpenWork",
    type: "agent",
    githubRepo: "different-ai/openwork",
    resourceUrl: "https://github.com/different-ai/openwork",
    summary:
      "Open-source alternative to Claude Cowork — share skills, MCPs, and workflows across agents and teammates.",
    overview:
      "OpenWork is a desktop + MCP layer for sharing AI workflows. Build a capability once, reuse it in Claude Code, Cursor, Codex, or the OpenWork app — and optionally publish it for teammates.\n\nRepo (copy/paste): https://github.com/different-ai/openwork",
    categories: ["operations", "engineering", "product"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/different-ai/openwork",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/different-ai/openwork\n2. Easiest path: paste the install prompt from openworklabs.com/start into your agent.\n3. Or download the desktop app from the project site.\n4. Add the OpenWork MCP so other agents can reuse the same workspace.",
    howToUse:
      "**Simple example**\nYou built a great “weekly KPI brief” skill in Cursor and want sales to use it in Claude.\n\n1. Install OpenWork / connect the MCP.\n2. Publish the skill into the shared workspace.\n3. Sales opens the same capability from their agent.\n4. One workflow, many clients — no zip-file sharing.",
    useCases: [
      "Share skills across Cursor + Claude + Codex",
      "Team workspace for reusable agent workflows",
      "Org admin for who can publish capabilities",
    ],
    examplePrompts: [
      "Install OpenWork and set up my first workspace following their start guide.",
      "How do I share one MCP + skill pack with three teammates?",
      "Compare OpenWork vs keeping skills only in ~/.claude/skills.",
    ],
    prerequisites: [
      "macOS, Windows, or Linux for the desktop app (optional)",
      "An agent that can install MCP / run setup commands",
      "Agreement on what gets shared org-wide",
    ],
    tips: [
      "Desktop app is optional — MCP sharing is the core idea.",
      "Start with one shared workflow before building an internal marketplace.",
    ],
    sources: [],
  },
  {
    slug: "i-have-adhd",
    name: "I Have ADHD",
    type: "skill",
    githubRepo: "ayghri/i-have-adhd",
    resourceUrl: "https://github.com/ayghri/i-have-adhd",
    summary:
      "A tiny skill that stops your coding agent from burying the answer — action first, numbered steps, no fluff.",
    overview:
      "ADHD-friendly output formatting for coding agents. Lead with the answer, number the steps, skip the essay and the “Hope this helps!”\n\nRepo (copy/paste): https://github.com/ayghri/i-have-adhd",
    categories: ["engineering", "product", "other"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/ayghri/i-have-adhd",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/ayghri/i-have-adhd\n2. Follow INSTALL.md for your agent.\n3. Enable the skill globally or per project.\n4. Ask a normal coding question and notice the format change.",
    howToUse:
      "**Simple example**\nClaude usually writes three paragraphs before the fix.\n\n1. Install the skill.\n2. Ask: “Auth middleware is rejecting valid tokens — fix it.”\n3. You get the answer first, then numbered steps, then optional detail.\n4. Less scrolling, faster shipping.",
    useCases: [
      "Personal coding agent house style",
      "Team default for clearer agent replies",
      "Pair with any technical skill pack",
    ],
    examplePrompts: [
      "With i-have-adhd enabled, tell me how to reset the local DB.",
      "Rewrite your last answer in ADHD-friendly format.",
      "Make this the default response style for this repo.",
    ],
    prerequisites: [
      "Agent Skills–compatible host",
      "Willingness to prefer terse answers",
    ],
    tips: [
      "You don’t need an ADHD diagnosis — it’s just a clarity skill.",
      "Great default alongside heavier domain skills.",
    ],
    sources: [],
  },
  {
    slug: "deepseek-reasonix",
    name: "DeepSeek Reasonix",
    type: "agent",
    githubRepo: "esengine/deepseek-reasonix",
    resourceUrl: "https://github.com/esengine/deepseek-reasonix",
    summary:
      "DeepSeek-native terminal coding agent — engineered around prefix-cache stability for long sessions.",
    overview:
      "A terminal coding agent tuned for DeepSeek models. The design focus is prefix-cache stability: long-running sessions stay efficient instead of thrashing context.\n\nRepo (copy/paste): https://github.com/esengine/deepseek-reasonix",
    categories: ["engineering"],
    industries: ["saas", "other"],
    link: "https://github.com/esengine/deepseek-reasonix",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/esengine/deepseek-reasonix\n2. Follow the README install for your OS.\n3. Configure DeepSeek API / endpoint credentials.\n4. Run it in a project folder and leave the session up for long tasks.",
    howToUse:
      "**Simple example**\nYou want a DeepSeek agent that can grind on a refactor overnight-ish without restarting from zero every time.\n\n1. Install Reasonix.\n2. Point it at your repo.\n3. Give a long task: “Migrate these modules to the new auth package; stop only for decisions.”\n4. Prefix-cache-friendly design keeps the session cheaper/stabler.",
    useCases: [
      "DeepSeek-first terminal coding",
      "Long multi-file refactors",
      "Teams standardizing on DeepSeek endpoints",
    ],
    examplePrompts: [
      "Explain why prefix-cache stability matters for a coding agent.",
      "Start Reasonix on this repo and outline a migration plan before editing.",
      "What config do I need for our self-hosted DeepSeek endpoint?",
    ],
    prerequisites: [
      "DeepSeek API access or compatible endpoint",
      "Comfortable with terminal workflows",
      "Git-clean working tree before long agent runs",
    ],
    tips: [
      "Commit or branch before long autonomous runs.",
      "Use for coding sessions — not as your CRM automation layer.",
    ],
    sources: [],
  },
  {
    slug: "tuicr",
    name: "tuicr",
    type: "skill",
    githubRepo: "agavra/tuicr",
    resourceUrl: "https://github.com/agavra/tuicr",
    summary:
      "Terminal UI for code review with vim keybindings — review PRs without leaving the keyboard.",
    overview:
      "A TUI code-review tool. If you live in the terminal and think browser PR UIs are slow, tuicr gives you vim-style navigation for reviews.\n\nRepo (copy/paste): https://github.com/agavra/tuicr",
    categories: ["engineering"],
    industries: ["saas", "other"],
    link: "https://github.com/agavra/tuicr",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/agavra/tuicr\n2. Install per the README (Go / release binary as documented).\n3. Authenticate with GitHub as required.\n4. Open a PR and review with vim keys.",
    howToUse:
      "**Simple example**\nFive PRs waiting; browser tabs are melting your brain.\n\n1. Install tuicr.\n2. Open the PR list in the TUI.\n3. Jump files/hunks with vim motions.\n4. Leave comments / approve without reaching for the mouse.",
    useCases: [
      "Keyboard-first PR review",
      "Fast triage of many small PRs",
      "Reviewing over SSH on a remote box",
    ],
    examplePrompts: [
      "How do I install tuicr and open my team’s open PRs?",
      "Give me a cheatsheet of tuicr vim keys for first-time use.",
      "When should I use tuicr vs GitHub’s web UI?",
    ],
    prerequisites: [
      "GitHub access to the repos you review",
      "Comfort with vim-style keys (or willingness to learn)",
    ],
    tips: [
      "Great companion to AI-generated PRs — humans still need a fast review surface.",
      "Start on a small PR to learn the keybindings.",
    ],
    sources: [],
  },
  {
    slug: "microsoft-jarvis",
    name: "JARVIS (HuggingGPT)",
    type: "agent",
    githubRepo: "microsoft/JARVIS",
    resourceUrl: "https://github.com/microsoft/JARVIS",
    summary:
      "Microsoft research system where an LLM plans a job and calls specialist Hugging Face models to execute multi-step AI tasks.",
    overview:
      "JARVIS / HuggingGPT is the classic “LLM as controller + expert models as workers” demo. ChatGPT (or another LLM) plans stages; models from Hugging Face do vision, speech, etc.\n\nRepo (copy/paste): https://github.com/microsoft/JARVIS",
    categories: ["engineering", "product"],
    industries: ["education", "saas", "other"],
    link: "https://github.com/microsoft/JARVIS",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/microsoft/JARVIS\n2. Read the README — start with lite / Hugging Face Space before full local deploy.\n3. Configure OpenAI/Azure + model endpoints as documented.\n4. Try CLI or Gradio demo modes.",
    howToUse:
      "**Simple example**\nYou ask: “Describe this image, then generate a captioned audio summary.”\n\n1. JARVIS plans: vision model → language model → speech model.\n2. Each expert model runs its stage.\n3. Results chain back into one answer.\n4. You learn the pattern: planner LLM + tool/model executors.",
    useCases: [
      "Learning multi-model agent architecture",
      "Research demos of task planning + model selection",
      "Inspiration before building your own tool-using agent",
    ],
    examplePrompts: [
      "Explain HuggingGPT’s four stages in plain English.",
      "What’s the lightest way to try JARVIS without deploying models locally?",
      "How is JARVIS different from a single-model chat assistant?",
    ],
    prerequisites: [
      "API keys for the LLM controller",
      "Hugging Face access for expert models (depending on mode)",
      "Python environment if running locally",
    ],
    tips: [
      "Treat it as research/education — not a turnkey SaaS ops stack.",
      "Lite config first; full local model deploy is heavy.",
    ],
    sources: [],
  },
  {
    slug: "paperclip",
    name: "Paperclip",
    type: "agent",
    githubRepo: "paperclipai/paperclip",
    resourceUrl: "https://github.com/paperclipai/paperclip",
    summary:
      "Open-source app for managing AI agents at work — assign work, track progress, keep agents organized like a real team.",
    overview:
      "Paperclip is the “manager UI” for agents: see what they’re doing, give them jobs, and run agent work like an ops board instead of a pile of terminal tabs.\n\nRepo (copy/paste): https://github.com/paperclipai/paperclip",
    categories: ["operations", "product", "engineering"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/paperclipai/paperclip",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/paperclipai/paperclip\n2. Follow docs.paperclip.ing / README quickstart.\n3. Connect the agents you already pay for.\n4. Create a board for one real workstream (support triage, content, eng chores).",
    howToUse:
      "**Simple example**\nThree agents are “busy” and nobody knows on what.\n\n1. Install Paperclip.\n2. Register each agent.\n3. Create tickets: “Draft 5 outbound emails,” “Summarize yesterday’s support,” etc.\n4. Watch status in one place; reassign when something stalls.",
    useCases: [
      "Ops board for multiple agents",
      "Founders running agent fleets without Slack chaos",
      "Delegating repeatable work with visibility",
    ],
    examplePrompts: [
      "Explain Paperclip like I’m used to Jira but for agents.",
      "What’s the quickest quickstart for a 2-person SaaS team?",
      "How should we name queues so humans and agents both understand them?",
    ],
    prerequisites: [
      "Agents or API keys you can connect",
      "A first workstream with clear done criteria",
      "Someone accountable for reviewing agent output",
    ],
    tips: [
      "Visibility without review is still chaos — keep a human in the loop.",
      "One board per function beats one mega-board.",
    ],
    sources: [],
  },
  {
    slug: "orca-ade",
    name: "Orca",
    type: "agent",
    githubRepo: "stablyai/orca",
    resourceUrl: "https://github.com/stablyai/orca",
    summary:
      "Desktop (and mobile) orchestrator for running many coding agents in parallel — each in its own worktree, tracked in one place.",
    overview:
      "Orca is an ADE (agent development environment) for fleets of coding agents. Run Codex, Claude Code, OpenCode, or Pi side by side on your own subscriptions, each in an isolated worktree, with mobile steering when you’re away from the desk.\n\nRepo (copy/paste): https://github.com/stablyai/orca",
    categories: ["engineering", "product"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/stablyai/orca",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/stablyai/orca\n2. Download the desktop app from onorca.dev / GitHub releases.\n3. Connect the coding agents you already subscribe to.\n4. Optional: install the mobile companion to monitor/steer.",
    howToUse:
      "**Simple example**\nYou want three agents working three bugs without stomping the same branch.\n\n1. Open Orca.\n2. Spawn Agent A/B/C each on its own worktree.\n3. Assign one bug per agent.\n4. Watch progress in one UI; nudge from your phone if needed.",
    useCases: [
      "Parallel coding agents without branch collisions",
      "Using existing Claude/Codex subscriptions in one cockpit",
      "Mobile check-ins on long agent runs",
    ],
    examplePrompts: [
      "How does Orca isolate agents with git worktrees?",
      "What’s the fastest path to run Claude Code and Codex side by side?",
      "When is Orca overkill vs one local Claude Code session?",
    ],
    prerequisites: [
      "Subscriptions/CLI tools for the agents you want to run",
      "Git repo that supports worktrees",
      "Desktop OS supported by Orca",
    ],
    tips: [
      "Name worktrees after tickets so humans can find them later.",
      "Parallel agents multiply review load — budget human QA time.",
    ],
    sources: [],
  },
  {
    slug: "hermes-agent",
    name: "Hermes Agent",
    type: "agent",
    githubRepo: "nousresearch/hermes-agent",
    resourceUrl: "https://github.com/nousresearch/hermes-agent",
    summary:
      "Self-improving agent from Nous Research — learns skills from experience, remembers you across sessions, runs on a VPS or serverless.",
    overview:
      "Hermes is an agent with a learning loop: it creates skills from hard tasks, improves them while using them, searches past chats, and can live on Telegram/Discord/Slack/WhatsApp — not only your laptop.\n\nRepo (copy/paste): https://github.com/nousresearch/hermes-agent",
    categories: ["engineering", "operations", "product"],
    industries: ["saas", "other"],
    link: "https://github.com/nousresearch/hermes-agent",
    installation:
      "Not installed into LimeDock.\n\n1. Copy: https://github.com/nousresearch/hermes-agent\n2. Install: curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash\n   (or follow docs for your OS)\n3. Run `hermes model` to pick Nous Portal / OpenRouter / OpenAI / your endpoint.\n4. Optional: connect chat platforms + cron automations from the docs.",
    howToUse:
      "**Simple example**\nYou want an agent that gets better at *your* workflows over a month.\n\n1. Install Hermes on a small VPS.\n2. Talk to it from Telegram while it works on the server.\n3. After a complex task, let it save a skill.\n4. Next time, it reuses that skill instead of starting from zero.",
    useCases: [
      "Personal agent with long-term memory + skills",
      "Cron-style reports delivered to Slack/Telegram",
      "Delegating parallel subagents for research or chores",
    ],
    examplePrompts: [
      "Install Hermes and configure OpenRouter as the model provider.",
      "Set a daily 9am cron: summarize my GitHub notifications to Telegram.",
      "After this migration, save a reusable skill for the steps that worked.",
    ],
    prerequisites: [
      "A place to run it (laptop, $5 VPS, or serverless backend)",
      "Model provider API key",
      "Clear boundaries for what it may automate unattended",
    ],
    tips: [
      "The learning loop is the point — review auto-created skills.",
      "Start with chat + one cron job before wiring every messenger.",
    ],
    sources: [],
  },
];
