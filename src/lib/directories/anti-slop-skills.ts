import type { DirectoryEntry } from "./types";

/**
 * Anti AI slop skills curated from public repos and roundups.
 * Deduped against existing catalog entries (taste-skill, impeccable, etc.).
 */
export const ANTI_SLOP_SKILLS: DirectoryEntry[] = [
  {
    slug: "hallmark",
    name: "Hallmark",
    type: "skill",
    summary:
      "Anti-AI-slop design skill for Claude Code, Cursor, and Codex — picks a macrostructure + theme, runs 57 slop-test gates, and refuses generic LLM UI defaults.",
    overview:
      "Hallmark (nutlope / Together AI) is a design skill that refuses to look AI-generated. It picks a page macrostructure for the brief, dresses it in one of twenty-one themes (or Custom), runs fifty-seven slop-test gates plus a pre-emit self-critique, and blocks the on-distribution defaults every LLM was trained into.\n\nFour verbs: default build, `hallmark audit` (punch list, no edits), `hallmark redesign` (new fingerprint, keep copy/IA/brand), and `hallmark study` (extract DNA from a screenshot or URL into a portable design.md).",
    categories: ["design", "marketing", "product"],
    industries: ["saas", "agency", "ecommerce", "other"],
    link: "https://github.com/nutlope/hallmark",
    installation:
      "```bash\nnpx skills add nutlope/hallmark\n```\n\nRe-run anytime to update. Or copy `skills/hallmark/SKILL.md` + `references/` into your agent skills directory.\n\nLive demos: https://www.usehallmark.com",
    howToUse:
      "1. Describe the brief (product, audience, mood).\n2. Let Hallmark pick macrostructure + theme, or ask for Custom when no catalog theme fits.\n3. Use `hallmark audit <target>` before redesigns.\n4. Use `hallmark study <screenshot|URL>` to steal DNA (not pixels) from a reference.\n5. Pair with Frontend Design / Taste Skill for implementation follow-through.",
    useCases: [
      "Ship a marketing landing page that does not look like every other AI site",
      "Audit an existing Next.js marketing page against anti-slop gates",
      "Redesign a SaaS homepage while keeping IA and copy",
      "Extract design DNA from a competitor screenshot into design.md",
      "Generate distinct page shapes for two different brand briefs",
    ],
    examplePrompts: [
      "Use Hallmark to design a landing page for a B2B analytics API — avoid purple gradients and card grids.",
      "hallmark audit src/app/page.tsx and give me a punch list of AI-slop patterns.",
      "hallmark redesign the pricing page: keep the copy and sections, change the visual fingerprint.",
      "hallmark study https://example.com and emit a portable design.md I can hand to another agent.",
    ],
    prerequisites: [
      "Claude Code, Cursor, Codex, or another Agent Skills–compatible host",
      "Permission to install third-party skills — audit SKILL.md first",
      "A concrete brief (audience, product, constraints) beats vague “make it pretty”",
    ],
    tips: [
      "Two pages by Hallmark for two briefs should feel like different sites — if they don’t, tighten the brief.",
      "Use audit before redesign so you know which slop patterns you’re killing.",
      "Custom theme is for briefs with real creative intent; vanilla SaaS briefs stay in catalog themes.",
      "Pair with stop-slop / no-ai-slop for hero copy after the visual system is locked.",
    ],
    sources: [
      "https://github.com/nutlope/hallmark",
      "https://www.usehallmark.com",
    ],
  },
  {
    slug: "stop-slop",
    name: "Stop Slop",
    type: "skill",
    summary:
      "Prose skill that removes predictable AI writing tells — filler phrases, binary contrasts, passive voice, em dashes, and metronomic rhythm — with a 5-dimension scoring pass.",
    overview:
      "Stop Slop (Hardik Pandya) teaches agents to catch and remove AI tells from prose. It is deliberately narrow: it does not invent voice; it subtracts the patterns that make drafts sound machine-written.\n\nCore rules cover banned phrases, formulaic structures, active voice, specificity, reader-in-the-room framing, rhythm variation, reader trust, and cutting pull-quote one-liners. A quick scoring rubric (directness, rhythm, trust, authenticity, density) sends anything under 35/50 back for revision.",
    categories: ["marketing", "product", "other"],
    industries: ["saas", "agency", "education", "other"],
    link: "https://github.com/hardikpandya/stop-slop",
    installation:
      "```bash\ngit clone https://github.com/hardikpandya/stop-slop.git ~/.claude/skills/stop-slop\n```\n\nOr copy `SKILL.md` + `references/` into your skills directory / Claude.ai project knowledge.\n\nAlso listed on SkillsLLM and MCP Market mirrors.",
    howToUse:
      "1. Draft or paste prose.\n2. Ask: “Use stop-slop on this draft.”\n3. Review the rewrite against the scoring dimensions.\n4. Keep intentional stylistic exceptions (a rare em dash, a deliberate adverb).\n5. Do a final human pass — the skill subtracts tells; you still add voice.",
    useCases: [
      "Clean AI-assisted blog drafts before publish",
      "De-slop product marketing pages and launch emails",
      "Edit newsletter drafts without flattening personality",
      "Score a draft 1–10 across the five Stop Slop dimensions",
      "Teach a team shared anti-slop editing standards",
    ],
    examplePrompts: [
      "Use the Stop Slop skill on this homepage hero and CTA copy.",
      "Score this draft on Stop Slop’s five dimensions and rewrite anything under 7.",
      "Remove binary contrasts and throat-clearing openers from this LinkedIn post.",
      "Rewrite this README intro so it doesn’t sound like AI wrote it.",
    ],
    prerequisites: [
      "Claude Code, Claude.ai Skills, Codex, or paste-as-system-prompt workflow",
      "A draft worth editing — garbage in still needs a human first pass",
    ],
    tips: [
      "Absolutist bans (zero adverbs, zero em dashes) are a floor; break them on purpose when rhythm needs it.",
      "Pair with no-ai-slop for overlapping pattern coverage, then pick one house style.",
      "Voice is addition — Stop Slop gets you to “not obviously AI,” not “sounds like you.”",
      "Keep references/phrases.md loaded when reviewing long-form.",
    ],
    sources: [
      "https://github.com/hardikpandya/stop-slop",
      "https://skillsllm.com/skill/stop-slop",
      "https://mcpmarket.com/tools/skills/stop-slop",
      "https://medium.com/@markchen69/you-cant-install-taste-29a829045bba",
    ],
  },
  {
    slug: "no-ai-slop",
    name: "No AI Slop",
    type: "skill",
    summary:
      "Peter Yang’s /no-ai-slop skill — removes 20+ AI writing patterns while preserving personal voice, with edit, detect, and satire modes.",
    overview:
      "No AI Slop (petergyang) is an editing skill for stripping more than twenty recognizable AI writing patterns without flattening the author’s voice. It targets binary contrasts, throat-clearing openers, faux-insight setups, colon reveals, dramatic fragments, importance puffery, weasel attribution, synonym cycling, and fake-profound endings.\n\nThree modes: edit (`/no-ai-slop text`), detect (`/no-ai-slop is this slop?`), and satire (“draft an AI slop post”). Yang’s recommended workflow is 25/50/25 — human draft, AI-assisted edit, human final pass.",
    categories: ["marketing", "product", "other"],
    industries: ["saas", "agency", "education", "other"],
    link: "https://github.com/petergyang/no-ai-slop",
    installation:
      "```bash\nnpx skills add petergyang/no-ai-slop --skill no-ai-slop --global --yes\n```\n\nOr paste into your agent:\n```text\nInstall the /no-ai-slop skill globally from https://github.com/petergyang/no-ai-slop\n```",
    howToUse:
      "1. Write a rough draft yourself (voice dictation is fine).\n2. Run `/no-ai-slop` on the draft and review the listed changes.\n3. Use detect mode when you only want a pattern report.\n4. Finish with a manual line-by-line pass.\n5. Do not use it to disguise fully automated content farms.",
    useCases: [
      "Edit newsletters, docs, and emails for AI tells",
      "Detect slop patterns in a teammate’s draft without rewriting",
      "Clean launch copy while keeping founder voice",
      "Teach writers the 20+ pattern checklist",
      "Satire / training: generate maximum-cringe slop on purpose",
    ],
    examplePrompts: [
      "/no-ai-slop (paste draft)",
      "/no-ai-slop is this slop? (paste tweet thread)",
      "Edit this product announcement with no-ai-slop and list every pattern you removed.",
      "Draft an AI slop LinkedIn post about AI agents for satire, then show the cleaned version.",
    ],
    prerequisites: [
      "Claude Code, Codex, ChatGPT skills, or compatible harness",
      "Willingness to keep a human first and last pass (25/50/25)",
    ],
    tips: [
      "This is an editor, not a ghostwriter — start with your own draft.",
      "Detector tools (e.g. Pangram) measure different signals than style cleanup.",
      "Preserve jokes, odd vocabulary, and imperfect cadence that sound like you.",
      "Companion write-up: creatoreconomy.so post from July 2026.",
    ],
    sources: [
      "https://github.com/petergyang/no-ai-slop",
      "https://creatoreconomy.so/p/use-my-no-ai-slop-skill-to-remove-20-ai-slop-patterns",
      "https://explainx.ai/blog/peter-yang-no-ai-slop-skill-open-source-july-2026",
    ],
  },
  {
    slug: "anti-slop",
    name: "Anti-Slop",
    type: "skill",
    summary:
      "Rand’s comprehensive anti-slop toolkit for text, code, and design — detect_slop / clean_slop scripts plus pattern libraries across natural language, programming, and UI.",
    overview:
      "Anti-Slop (rand/cc-polymath, also published on Smithery, LobeHub, AIMCP, and MCP Market) is a multi-domain quality skill. It detects generic AI patterns in natural language, code, and design, scores text slop 0–100, and offers automated cleanup for high-risk phrases with preview/backup safety.\n\nReference packs cover text-patterns, code-patterns, and design-patterns. Use it when you need one skill that can review a blog post, a PR full of `data`/`result` variables, and a purple-gradient landing page.",
    categories: ["marketing", "design", "engineering", "product"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/rand/cc-polymath",
    installation:
      "```bash\nnpx skills add rand/cc-polymath -a claude-code\n# or\nnpx -y @lobehub/market-cli skills install rand-cc-polymath-anti-slop --agent claude-code\n```\n\nSkill path in repo: `skills/anti-slop`. Scripts: `python scripts/detect_slop.py <file>` and `python scripts/clean_slop.py <file> [--save]`.",
    howToUse:
      "1. Detect: run detect_slop.py or ask the skill to score a file.\n2. Clean text with clean_slop.py in preview mode first.\n3. For code, follow code-patterns.md (rename generics, delete obvious comments).\n4. For design, audit against design-patterns.md (gradients, card spam, generic CTAs).\n5. Always manually review aggressive cleanups.",
    useCases: [
      "Score a documentation file for text slop before release",
      "Clean buzzwords and meta-commentary from AI-drafted docs",
      "Refactor generic AI code names and needless wrappers",
      "Design review for template-like SaaS UI patterns",
      "Establish team max slop-score thresholds in CI",
    ],
    examplePrompts: [
      "Use Anti-Slop to detect_slop on docs/launch.md --verbose and summarize findings.",
      "Clean this blog draft with anti-slop, then show a diff of removed phrases.",
      "Review this React page for design slop patterns and propose concrete alternatives.",
      "Help me set a team policy: reject docs with slop score > 40.",
    ],
    prerequisites: [
      "Python available if you want the detect/clean scripts",
      "Claude Code / Cursor / Codex with skills support",
      "Judgment — not every hedge or pattern is slop in legal/academic contexts",
    ],
    tips: [
      "Scripts handle text; code and design cleanup stay mostly manual with the reference guides.",
      "Preview before --save; backups are created when overwriting.",
      "Same skill appears under several marketplace IDs — install once from rand/cc-polymath.",
    ],
    sources: [
      "https://github.com/rand/cc-polymath",
      "https://smithery.ai/skills/rand/anti-slop",
      "https://lobehub.com/skills/rand-cc-polymath-anti-slop",
      "https://mcpmarket.com/tools/skills/anti-ai-slop",
      "https://mcpmarket.com/tools/skills/anti-slop-content-code-quality",
      "https://www.aimcp.info/en/skills/a26214e0-740d-4eb2-a566-937a5b4b70bb",
    ],
  },
  {
    slug: "anti-ai-slop-writing",
    name: "Anti AI Slop Writing",
    type: "skill",
    summary:
      "Jalaaldeen’s writing skill that eliminates detectable AI patterns — 50+ banned words, 35+ phrases, structural tells, punctuation leaks, and accuracy failures.",
    overview:
      "Anti AI Slop Writing (jalaalrd) forces agents to produce human-sounding text by constraining vocabulary, structure, punctuation, and formatting patterns that readers and detectors flag. It draws on Carnegie Mellon research, Wikipedia’s Signs of AI Writing, Buffer’s large-scale post analysis, and community detection patterns.\n\nBeyond style, it also flags accuracy failures — invented statistics, fabricated quotes, and fake anecdotes — so it doubles as a light hallucination check for marketing copy.",
    categories: ["marketing", "product", "other"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/jalaalrd/anti-ai-slop-writing",
    installation:
      "```bash\n# Plugin marketplace (founder-toolkit)\n/plugin marketplace add jalaalrd/founder-toolkit\n\n# Manual\ngit clone https://github.com/jalaalrd/anti-ai-slop-writing.git /tmp/anti-ai-slop-writing\ncp -R /tmp/anti-ai-slop-writing/skills/anti-ai-slop-writing ~/.claude/skills/\n```\n\nFor chat UIs: paste SKILL.md at the start of the conversation.",
    howToUse:
      "Invoke `/anti-ai-slop-writing` or ask the agent to write under anti-slop constraints. Use for tweets, emails, articles, bios, reports, and ads. Load `references/banned-words.md` when auditing long drafts.",
    useCases: [
      "Write founder tweets that do not trip AI detectors for style",
      "Produce launch emails without corporate pep-talk structure",
      "Rewrite bios and About pages with concrete detail",
      "Catch invented stats before they ship in a blog post",
      "Cross-agent writing constraints (Claude, Cursor, Gemini CLI, Codex)",
    ],
    examplePrompts: [
      "Use Anti AI Slop Writing to rewrite this tweet thread.",
      "/anti-ai-slop-writing — draft a product launch email for our new analytics export.",
      "Audit this blog post against banned words and structural patterns; list every hit.",
      "Write a founder bio that avoids testament/vibrant/delve and rule-of-three padding.",
    ],
    prerequisites: [
      "Agent Skills–compatible host or paste-into-chat workflow",
      "Source facts for any claims — the skill blocks fake anecdotes but cannot invent truth",
    ],
    tips: [
      "Keep the banned-words reference on demand to avoid context bloat.",
      "Works as a system-level constraint in ChatGPT/Claude.ai when pasted.",
      "Combine with stop-slop for a second editorial pass if needed.",
    ],
    sources: ["https://github.com/jalaalrd/anti-ai-slop-writing"],
  },
  {
    slug: "ai-slop-cleaner",
    name: "AI Slop Cleaner",
    type: "skill",
    summary:
      "Regression-safe, deletion-first code cleanup skill (oh-my-claudecode) — deslop modules without changing behavior, with optional reviewer-only mode.",
    overview:
      "AI Slop Cleaner lives in yeachan-heo/oh-my-claudecode. It is the bounded cleanup workflow for code that works but feels bloated, repetitive, weakly tested, or over-abstracted. Workflow: lock behavior with tests, write a cleanup plan, classify smells (duplication, dead code, needless abstraction, boundary violations, missing tests, UI defaults), then run smell-focused passes.\n\nSupports `--review` for writer/reviewer separation and Ralph integration for post-session cleanup on changed files only.",
    categories: ["engineering", "product"],
    industries: ["saas", "other"],
    link: "https://buildwithclaude.com/skill/ai-slop-cleaner",
    installation:
      "```bash\nnpx skills add yeachan-heo/oh-my-claudecode\n```\n\nInvoke as `/oh-my-claudecode:ai-slop-cleaner` (optional `--review`). Source skill folder: `skills/ai-slop-cleaner`.",
    howToUse:
      "1. Point at a module or changed-file list.\n2. Let it lock behavior / state a verification plan.\n3. Run deletion-first passes (dead code → duplicates → naming → tests).\n4. Use `--review` for a separate reviewer verdict.\n5. Do not use for feature builds or broad redesigns.",
    useCases: [
      "Deslop a module full of wrappers and duplicate helpers",
      "Post-Ralph cleanup on session-changed files only",
      "Reviewer-only anti-slop pass before merge",
      "Tighten boundaries without changing behavior",
      "Clean AI-generated React UI defaults that feel unreviewed",
    ],
    examplePrompts: [
      "deslop this module: too many wrappers, duplicate helpers, and dead code",
      "/oh-my-claudecode:ai-slop-cleaner src/auth -- keep behavior identical",
      "/oh-my-claudecode:ai-slop-cleaner --review on the cleanup plan for src/billing",
      "Clean AI slop in the files changed this session; do not expand scope.",
    ],
    prerequisites: [
      "Test runner or clear verification plan for the touched area",
      "Claude Code with oh-my-claudecode skills installed",
      "Explicit anti-slop / simplify intent (not a vague “refactor”)",
    ],
    tips: [
      "Prefer deletion over addition; reuse existing utilities first.",
      "Keep diffs small and reversible.",
      "UI checklist flags default blue/purple palettes and uniform 3-column grids when unjustified.",
      "Pair with code-simplifier / simplify for complementary cleanup styles.",
    ],
    sources: [
      "https://buildwithclaude.com/skill/ai-slop-cleaner",
      "https://github.com/yeachan-heo/oh-my-claudecode",
    ],
  },
  {
    slug: "deslopify",
    name: "Deslopify",
    type: "skill",
    summary:
      "Guillaume Laforge’s Gemini CLI skill (cross-compatible SKILL.md) that rewrites text against tropes.fyi-style AI writing anti-patterns.",
    overview:
      "Deslopify was built for Gemini CLI’s skill-creator using the tropes.fyi catalog of AI writing tics — overused adverbs, the delve family, “It’s not X, it’s Y,” and related crutches. The skill reads user text, cross-references a style_guide.md, and rewrites toward natural prose.\n\nBecause it is a standard SKILL.md + references pack, it works in any agent that supports the skills format, not only Gemini CLI.",
    categories: ["marketing", "other"],
    industries: ["saas", "agency", "education", "other"],
    link: "https://github.com/glaforge/deslopify",
    installation:
      "```bash\n# Gemini CLI\ngemini skills install https://github.com/glaforge/deslopify\n/skills reload\n\n# Other agents — clone into skills dir\ngit clone https://github.com/glaforge/deslopify.git ~/.claude/skills/deslopify\n```",
    howToUse:
      "Ask to deslopify / naturalize a draft, article URL, or README. The agent should load references/style_guide.md and rewrite away tropes.fyi anti-patterns.",
    useCases: [
      "Naturalize Gemini- or Claude-drafted blog posts",
      "Clean README and docs language before open-source launch",
      "Quick anti-slop pass when you already use Gemini CLI",
      "Cross-check Stop Slop / No AI Slop rewrites against tropes.fyi",
    ],
    examplePrompts: [
      "Deslopify this article: [URL]",
      "Naturalize this draft: [paste]",
      "Remove the AI slop from my README.md file.",
      "Rewrite this paragraph using the deslopify style guide.",
    ],
    prerequisites: [
      "Gemini CLI or any SKILL.md-compatible agent",
      "Network access if asking it to fetch a URL",
    ],
    tips: [
      "Still do a human edit pass — Laforge used the skill on its own announcement post.",
      "Lightweight alternative when you do not want a full multi-domain toolkit.",
    ],
    sources: [
      "https://glaforge.dev/posts/2026/03/08/fixing-ai-slop-with-a-skill-in-gemini-cli/",
      "https://github.com/glaforge/deslopify",
    ],
  },
  {
    slug: "anti-ai-slop",
    name: "Anti AI Slop (ch040602)",
    type: "skill",
    summary:
      "Purpose-built output review skill for writing, UI, slides, visuals, code, and reports — flags generic/template-like AI-smell patterns without claiming authorship.",
    overview:
      "Anti AI Slop from ch040602/anti-ai-slop is a review-and-remediation pack, not a forensic AI detector. It asks whether an artifact looks purpose-built or merely average-shaped: purpose, specificity, and design quality.\n\nIt routes by modality (writing, marketing/brand, web UI, decks, images, code, charts, localization, ops plans) and pairs every finding with a concrete fix. Optional Spec Kit / validator tooling supports repository-level guardrails.",
    categories: ["marketing", "design", "engineering", "product"],
    industries: ["saas", "agency", "other"],
    link: "https://github.com/ch040602/anti-ai-slop",
    installation:
      "```bash\nnpx skills add https://github.com/ch040602/anti-ai-slop --skill anti-ai-slop\n```\n\nAlso catalogued on SkillsMP.",
    howToUse:
      "1. Define the output contract (audience, purpose, success).\n2. Classify work purpose via the skill’s task matrix.\n3. Run the output design gate + relevant dimension file.\n4. Produce findings with evidence + fix + example revision.\n5. Never claim “this was written by AI” from style alone.",
    useCases: [
      "Review a landing page for generic value props",
      "QA a pitch deck for template-like AI smell",
      "Improve specificity of product marketing copy",
      "Code/PR review for generative boilerplate patterns",
      "Build acceptance criteria for AI-assisted deliverables",
    ],
    examplePrompts: [
      "Use Anti AI Slop to review this landing page hero — purpose, specificity, design quality.",
      "Audit this PR description and UI diff for template-like AI-smell patterns.",
      "Turn this generic SaaS homepage copy into purpose-built messaging with evidence-backed fixes.",
      "Create a reusable output-quality rubric for our content team using anti-ai-slop checklists.",
    ],
    prerequisites: [
      "Artifact to review (draft, URL, PR, deck, or code)",
      "Clear job-to-be-done for the output",
      "Agent Skills host with room for reference files",
    ],
    tips: [
      "Bullets and clean UI are not defects when they serve the task.",
      "Prioritize purpose over taste — justified Inter/blue can be correct.",
      "Pair with Hallmark or Taste Skill when the fix is a full redesign.",
    ],
    sources: [
      "https://github.com/ch040602/anti-ai-slop",
      "https://skillsmp.com/creators/ch040602/anti-ai-slop/skill",
    ],
  },
  {
    slug: "preserve-my-voice",
    name: "Preserve My Voice",
    type: "skill",
    summary:
      "Alexandra Foote’s anti-AI-slop writing skill — catches 13+ AI writing tells, adds voice calibration from your sample writing, and polishes dictation without erasing you.",
    overview:
      "Preserve My Voice (Bigger and Better / Alexandra Foote) encodes the thirteen prevalent AI writing signs from “I Miss the Em Dash,” plus bonus patterns: copula avoidance, false ranges, synonym cycling, and superficial -ing analyses.\n\nUnlike pure subtraction skills, it includes voice calibration: give it a sample of your writing and it matches style before producing output — especially useful with voice dictation workflows.",
    categories: ["marketing", "product", "other"],
    industries: ["saas", "agency", "education", "other"],
    link: "https://biggerandbetter.substack.com/p/the-anti-ai-slop-skill",
    installation:
      "Claude.ai: Settings → Capabilities → Skills → Create skill → paste the skill instructions from the article (name it Preserve My Voice or your preferred alias).\n\nChatGPT: Settings → Personalization → Custom Instructions → paste into response preferences.\n\nClaude Code / Cursor: save the instructions as `~/.claude/skills/preserve-my-voice/SKILL.md`.",
    howToUse:
      "1. Install and optionally paste 2–3 writing samples for calibration.\n2. Say “preserve my voice” or invoke the skill by name.\n3. Dictate or paste a rough draft.\n4. Review the polished output for remaining tells.\n5. Edit the skill text itself when your house style differs.",
    useCases: [
      "Polish voice-dictated drafts into publishable posts",
      "Keep founder voice across newsletter editions",
      "Catch the 13 AI writing signs before social publish",
      "Calibrate an agent to a brand writer’s samples",
      "Team shared skill with lightly customized bans",
    ],
    examplePrompts: [
      "Use Preserve My Voice on this dictated draft. Here are two sample posts for calibration: …",
      "preserve my voice — rewrite this launch email so it sounds like me, not LinkedIn AI.",
      "List which of the 13 AI writing tells appear in this paragraph, then fix them.",
      "Calibrate to the attached brand voice doc, then edit this blog intro.",
    ],
    prerequisites: [
      "Access to the skill text from the Substack post (paid article)",
      "Optional: writing samples for voice calibration",
    ],
    tips: [
      "Rename freely — skills are just instruction files.",
      "Voice calibration is the differentiator vs Stop Slop / No AI Slop.",
      "Still keep a final human pass on anything customer-facing.",
    ],
    sources: [
      "https://biggerandbetter.substack.com/p/the-anti-ai-slop-skill",
    ],
  },
  {
    slug: "anti-ai-slop-filter",
    name: "Anti-AI Slop Filter",
    type: "agent",
    summary:
      "OpenClaw / KiloClaw recipe that maintains a living AI-slop pattern filter from Wikipedia and screens every piece of generated content before publish.",
    overview:
      "Anti-AI Slop Filter is a community OpenClaw recipe (KiloClaw bytes) that turns an agent into a self-updating content quality gate. On a weekly schedule it visits Wikipedia’s AI slop article, extracts current patterns, updates a local Anti-AI Slop skill, and runs new content through that filter before you see it.\n\nBest as an always-on publishing gate alongside prose skills like Stop Slop or No AI Slop.",
    categories: ["marketing", "operations", "other"],
    industries: ["saas", "agency", "other"],
    link: "https://kilo.ai/kiloclaw/bytes/anti-ai-slop",
    installation:
      "In OpenClaw / KiloClaw, run the recipe prompt:\n\n```text\nCreate a skill called \"Anti-AI Claw Slop\". Weekly, visit https://en.wikipedia.org/wiki/AI_slop and find all of the patterns that are considered the latest in AI slop. Update your Anti-AI Slop skill with the latest patterns. Then any content you create should go through this filter to make sure we don't fall into any of these traps.\n```\n\nSchedule the skill weekly and require the filter on publish workflows.",
    howToUse:
      "1. Install the recipe / create the skill in your Claw.\n2. Set weekly refresh against the Wikipedia AI slop page.\n3. Route blog, docs, email, and social drafts through the filter before publish.\n4. Periodically review the living checklist for trending patterns.\n5. Pair with AI Smell Detector / De-Botinator bytes if available.",
    useCases: [
      "Always-on pre-publish filter for an OpenClaw content agent",
      "Weekly refresh of slop patterns as community definitions evolve",
      "Screen newsletters and social posts before scheduling",
      "Maintain a living team checklist sourced from Wikipedia",
    ],
    examplePrompts: [
      "Set up the Anti-AI Slop Filter skill and run the first Wikipedia sync.",
      "Run this blog draft through the Anti-AI Slop Filter before I publish.",
      "Show me the current living slop pattern checklist and what changed this week.",
      "Add the filter as a required step in my content publishing workflow.",
    ],
    prerequisites: [
      "OpenClaw, KiloClaw, or similar agent host with web access + scheduling",
      "Permission for the agent to create/update a local skill file",
      "Human review still required for facts and brand voice",
    ],
    tips: [
      "Wikipedia is community-maintained — treat patterns as signals, not law.",
      "Works on any content type once the filter skill exists.",
      "Combine with no-ai-slop for deterministic pattern removal.",
    ],
    sources: ["https://kilo.ai/kiloclaw/bytes/anti-ai-slop"],
  },
];
