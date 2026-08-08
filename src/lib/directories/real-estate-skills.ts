import type { DirectoryEntry } from "./types";

/**
 * Real-estate Claude skills/agents curated from 2026 roundups.
 * Deduped against the full catalog (no prior RE vertical entries).
 * Near-duplicates across sources were merged into the strongest installable entry.
 */
export const REAL_ESTATE_SKILLS: DirectoryEntry[] = [
  {
    slug: "nextautomation-real-estate-skills",
    name: "NextAutomation Real Estate Skills Pack",
    type: "skill",
    summary:
      "Free 7-skill real estate pack: lead qualification, listing copy, CMA/market reports, follow-up, contract review, neighborhood guides, and investment math.",
    overview:
      "NextAutomation’s free template pack ships seven Claude Skills covering the residential/broker transaction cycle. Skills are instruction files you upload in Claude.ai (Customize → Skills) or paste into a Project — no code required.\n\nMember skills (also catalogued individually where distinct): Lead Qualifier Agent, Property Description Generator, Market Analysis Reporter, Client Follow-Up Scheduler, Contract Terms Analyzer, Neighborhood Guide Creator, Investment Property Calculator.",
    categories: ["sales", "marketing", "operations"],
    industries: ["real-estate", "agency", "other"],
    link: "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
    installation:
      "1. Download the free pack from NextAutomation.\n2. In Claude.ai: Settings → enable code execution/file creation → Customize → Skills → upload each skill folder/ZIP → toggle on.\n3. Fallback: paste a skill’s instruction file into a chat or Claude Project custom instructions.\n\nNo `npx` install — these are downloadable SKILL templates.",
    howToUse:
      "Start with Lead Qualifier + Property Description on live inbound work. Paste raw inputs (lead inquiry, MLS facts, comps, contract PDF text). Review every output for Fair Housing and brokerage compliance before send/publish.",
    useCases: [
      "Qualify 100+ portal leads into scored cards",
      "Ship MLS-ready listing copy in under a minute",
      "Draft CMA narratives for listing appointments",
      "Keep past-client follow-up sequences warm",
      "Flag purchase-agreement red flags before attorney review",
    ],
    examplePrompts: [
      "Use the Lead Qualifier Agent on this inbound inquiry — score budget, timeline, and intent, then draft my first reply.",
      "Generate three Fair Housing–safe listing descriptions from this MLS field dump.",
      "Turn these comps into a client-ready market summary with a list-price band.",
    ],
    prerequisites: [
      "Claude.ai (Pro/Max recommended for Skills) or Agent Skills–compatible host",
      "Brokerage compliance rules for AI-generated marketing",
      "Raw inputs: lead text, MLS facts, comps, or contract excerpts",
    ],
    tips: [
      "Claude works on data you paste — it is not a live MLS feed.",
      "Contract/investment outputs are decision support, not legal or appraisal advice.",
      "Pair with Fair Housing Overlay before publishing any listing or ad copy.",
    ],
    sources: [
      "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
      "https://nextautomation.us/blog/claude-skills-for-real-estate-agents",
      "https://nextautomation.us/blog/claude-skills-for-real-estate-complete-guide",
    ],
  },
  {
    slug: "lead-qualifier-agent",
    name: "Lead Qualifier Agent",
    type: "agent",
    summary:
      "Screens and scores inbound real estate leads on budget, timeline, and buying intent — then drafts a personalized first response for speed-to-lead.",
    overview:
      "Lead Qualifier Agent (NextAutomation pack) turns raw portal/CRM inquiries into scored lead cards with a recommended next action. Built for agents and brokers who lose deals to slow first replies, not to competitors.\n\nIt does not replace judgment on who to chase; it removes lag between inquiry and human outreach. Production teams often graduate this skill into CRM-connected automation.",
    categories: ["sales", "operations", "growth"],
    industries: ["real-estate", "agency", "marketplace", "other"],
    link: "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
    installation:
      "Install via the NextAutomation 7-skill pack (upload Lead Qualifier Agent skill folder in Claude.ai Skills), or recreate as a SKILL.md with your scoring rubric (budget bands, timeline, financing, geography).",
    howToUse:
      "Paste the raw lead (form dump, Zillow/Realtor inquiry, or CRM note). Ask for score + reasons + first SMS/email in your voice. Route hot leads immediately; park tire-kickers in nurture.",
    useCases: [
      "Morning queue triage for 50+ overnight portal leads",
      "Draft first response while driving between showings",
      "Standardize ISA qualification criteria across a team",
      "Hand hot-lead cards to listing agents with context",
    ],
    examplePrompts: [
      "Score this lead 1–10 on budget fit, timeline, and intent. Draft a text I’d send in the next 5 minutes.",
      "Separate these 40 inquiries into hot / warm / nurture with one-line reasons.",
    ],
    prerequisites: [
      "Clear ICP scoring rules (price band, areas, pre-approval)",
      "Claude Skills enabled",
      "CRM or inbox access for the raw lead text",
    ],
    tips: [
      "Speed-to-lead wins — keep the first draft short and human.",
      "Never auto-send; review Fair Housing and do-not-call constraints.",
      "Pair with Client Follow-Up Scheduler for multi-touch sequences.",
    ],
    sources: [
      "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
      "https://nextautomation.us/blog/claude-skills-for-real-estate-agents",
      "https://theprosperityagent.com/2026/06/15-claude-skills-for-real-estate-agents/",
    ],
  },
  {
    slug: "property-listing",
    name: "Property Listing",
    type: "skill",
    summary:
      "Writes Fair Housing–aware MLS/Zillow listing copy: hook headline, lifestyle description, highlights, and neighborhood notes from property facts.",
    overview:
      "Property Listing (mohitagw15856/pm-claude-skills) produces accurate, appealing listing descriptions without protected-class steering language. Roundups also call this Property Description Generator / MLS listing description writer / Listing Description Writer — same job: turn beds/baths/sqft/features into publishable copy.\n\nMerged sources: NextAutomation Property Description Generator, Prosperity Agent listing-description, Tristan Ahumada Listing Description Writer, and Layer3Labs MLS listing generator patterns.",
    categories: ["marketing", "sales", "operations"],
    industries: ["real-estate", "marketplace", "agency", "other"],
    link: "https://github.com/mohitagw15856/pm-claude-skills/tree/main/skills/property-listing",
    installation:
      "```bash\nnpx skills add mohitagw15856/pm-claude-skills --skill property-listing\n```\n\nAlso available in Prosperity’s pack as `listing-description`:\n```bash\n/plugin marketplace add TheProsperityAgent/prosperity-real-estate-skills\n/plugin install real-estate-skills@prosperity-real-estate-skills\n```\n\nOr download NextAutomation’s Property Description Generator template.",
    howToUse:
      "Provide MLS field dump, target channel (MLS short / Zillow long / social), and brand voice samples. Request multiple variants. Run a Fair Housing pass before publish.",
    useCases: [
      "MLS character-limited description",
      "Zillow/Realtor.com long-form listing",
      "Instagram/Facebook listing caption from the same facts",
      "Rewrite generic AI listing copy into brokerage voice",
    ],
    examplePrompts: [
      "Write an MLS-safe 400-character description and a long-form Zillow version from these fields. Flag any Fair Housing risk phrases.",
      "Use my last five sold listings as voice samples and describe 123 Oak St for luxury buyers.",
    ],
    prerequisites: [
      "Property facts (beds, baths, sqft, features, condition)",
      "Optional: 3–5 approved past listings for voice",
      "Brokerage advertising / Fair Housing policy",
    ],
    tips: [
      "Avoid coded phrases (family-friendly, safe neighborhood, walkable-as-proxy) — describe amenities and facts.",
      "Train on your sold listings so output doesn’t sound like every other agent.",
      "Pair with Fair Housing Overlay as a mandatory pre-publish gate.",
    ],
    sources: [
      "https://claudeskills.info/skills/mohitagw15856/pm-claude-skills/property-listing/",
      "https://github.com/mohitagw15856/pm-claude-skills",
      "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
      "https://github.com/TheProsperityAgent/prosperity-real-estate-skills",
      "https://tristanahumada.substack.com/p/how-5-claude-skills-replaced-2000",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
      "https://coffeecontracts.com/blog/claude-ai-for-real-estate-agents-a-beginner-s-guide-2026",
    ],
  },
  {
    slug: "comparative-market-analysis",
    name: "Comparative Market Analysis",
    type: "skill",
    summary:
      "Builds a structured CMA — subject property, adjusted comps, value range, market context, and pricing recommendation (not a formal appraisal).",
    overview:
      "Comparative Market Analysis (pm-claude-skills) turns comps into a broker-ready pricing narrative. NextAutomation’s Market Analysis Reporter and Layer3Labs’ CMA narrative skill cover the same workflow: paste comps → get a readable story + list-price band.\n\nOutputs are for licensed agent review — not USPAP appraisals.",
    categories: ["sales", "operations", "marketing"],
    industries: ["real-estate", "agency", "other"],
    link: "https://github.com/mohitagw15856/pm-claude-skills/tree/main/skills/comparative-market-analysis",
    installation:
      "```bash\nnpx skills add mohitagw15856/pm-claude-skills --skill comparative-market-analysis\n```\n\nTemplate alternative: NextAutomation Market Analysis Reporter in the free RE pack.",
    howToUse:
      "Paste subject property details + comparable sales/listings with dates, prices, and adjustments. Ask for narrative + price band + talking points for a listing appointment.",
    useCases: [
      "Overnight CMA draft before a listing presentation",
      "Plain-English market story sellers will actually read",
      "Price-reduction recommendation with comp rationale",
      "Buyer-side offer strategy from recent solds",
    ],
    examplePrompts: [
      "Build a CMA for this subject using these 8 comps. Give adjusted value range and a list-price recommendation with rationale.",
      "Turn this MLS export into a two-page seller narrative plus objection handles.",
    ],
    prerequisites: [
      "Recent comps from MLS or public records",
      "Subject property facts and condition notes",
      "Local market context (DOM trends, inventory)",
    ],
    tips: [
      "Date-stamp every data source — stale comps poison pricing.",
      "Keep firm comp-weighting rules in the skill folder when deploying brokerage-wide.",
      "Pair with Buyer Consultation Prep for appointment packets.",
    ],
    sources: [
      "https://claudeskills.info/skills/mohitagw15856/pm-claude-skills/comparative-market-analysis/",
      "https://nextautomation.us/blog/claude-skills-for-real-estate-complete-guide",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
      "https://theprosperityagent.com/2026/06/15-claude-skills-for-real-estate-agents/",
    ],
  },
  {
    slug: "client-follow-up-scheduler",
    name: "Client Follow-Up Scheduler",
    type: "skill",
    summary:
      "Drafts personalized, timed follow-up sequences for leads, past clients, and post-showing touches so relationships don’t go cold.",
    overview:
      "Client Follow-Up Scheduler (NextAutomation) covers multi-touch nurture. Tristan Ahumada’s Past Client Follow-up and Layer3Labs’ showing follow-up skill are the same operational pattern: short notes in → warm, on-brand outreach out.\n\nDoes not auto-send; you approve each message. Pairs with Follow Up Boss CRM skill when you want live CRM records.",
    categories: ["sales", "marketing", "operations"],
    industries: ["real-estate", "agency", "other"],
    link: "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
    installation:
      "Upload from the NextAutomation RE pack, or build a SKILL.md with your cadence (day 0 / 3 / 7 / 30), voice samples, and CRM field names.\n\nFor CRM-connected follow-up, also install Follow Up Boss:\n```bash\nnpx skills add membranedev/application-skills --skill follow-up-boss\n```",
    howToUse:
      "Paste lead/client context (deal history, showing notes, timeline). Ask for a sequence with send windows and channel (SMS/email). Edit and send from your CRM.",
    useCases: [
      "Same-day showing thank-you + next-step email",
      "Past-client anniversary / equity check-in batch",
      "Sphere nurture calendar for a month",
      "ISA speed-to-lead second and third touches",
    ],
    examplePrompts: [
      "From these showing notes, draft a follow-up email and a day-3 check-in SMS in my voice.",
      "Build a 5-touch sequence for this past buyer who closed 18 months ago — reference their street and HOA complaint.",
    ],
    prerequisites: [
      "Client/deal context (Claude does not remember clients between chats unless you provide it)",
      "CRM or contact list for batch work",
      "Brokerage rules on AI outreach",
    ],
    tips: [
      "Specificity beats polish — one real detail outperforms generic “just checking in.”",
      "Never invent personal facts; only use notes you paste.",
      "Pair with Lead Qualifier Agent for the first reply, this skill for the rest.",
    ],
    sources: [
      "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
      "https://tristanahumada.substack.com/p/how-5-claude-skills-replaced-2000",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
      "https://coffeecontracts.com/blog/claude-ai-for-real-estate-agents-a-beginner-s-guide-2026",
    ],
  },
  {
    slug: "contract-terms-analyzer",
    name: "Contract Terms Analyzer",
    type: "skill",
    summary:
      "Reviews purchase agreements and leases for key terms, dates, obligations, missing clauses, and negotiation flags — decision support, not legal advice.",
    overview:
      "Contract Terms Analyzer (NextAutomation) is real-estate-specific contract triage: price, contingencies, earnest money, close date, unusual clauses. Distinct from the generic Contract Reviewer skill already in the catalog — this one is tuned for residential/CRE purchase and lease workflows.\n\nLayer3Labs’ offer-summary email and transaction-document summary skills extend the same pattern for client-facing plain-English briefs.",
    categories: ["operations", "sales", "other"],
    industries: ["real-estate", "fintech", "other"],
    link: "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
    installation:
      "Upload from the NextAutomation free RE pack, or encode your state’s checklist into a SKILL.md. Always route flagged items to a licensed broker/attorney.",
    howToUse:
      "Paste or attach the agreement. Ask for: key terms table, unusual clauses, open dates, and questions to ask counsel. Append a “not legal advice” disclaimer on client-facing summaries.",
    useCases: [
      "Same-day offer summary for a buyer client",
      "Flag as-is / escalation / kick-out clauses",
      "Lease abstract for investor underwriting",
      "Pre-attorney triage under deadline pressure",
    ],
    examplePrompts: [
      "Summarize this purchase agreement: price, contingencies, EM, close date, and anything unusual. List questions for my attorney.",
      "Compare this counteroffer to the original — what changed and what risk did we take on?",
    ],
    prerequisites: [
      "Full contract text or PDF extract",
      "Licensed professional for final review",
      "State-specific form knowledge when available",
    ],
    tips: [
      "Never treat output as legal advice or a substitute for counsel.",
      "Pair with Disclosure Review for seller-disclosure gap analysis.",
      "Log drafts for E&O audit trails when deploying firm-wide.",
    ],
    sources: [
      "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
      "https://nextautomation.us/blog/claude-skills-for-real-estate-agents",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
    ],
  },
  {
    slug: "neighborhood-guide-creator",
    name: "Neighborhood Guide Creator",
    type: "skill",
    summary:
      "Generates buyer-facing area guides — schools, amenities, commute, lifestyle — from the location inputs you provide, without demographic steering.",
    overview:
      "Neighborhood Guide Creator (NextAutomation) packages local expertise into shareable buyer guides. Fair Housing note: suggestions must be criteria-based (commute, price, amenities), never demographic. Layer3Labs’ buyer consultation prep skill uses the same constraint.",
    categories: ["marketing", "sales", "operations"],
    industries: ["real-estate", "agency", "other"],
    link: "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
    installation:
      "Upload from the NextAutomation 7-skill pack. Enrich the skill folder with your approved neighborhood fact sheets and brokerage disclaimers.",
    howToUse:
      "Give city/neighborhood, buyer criteria (budget, commute, must-haves), and any local facts you want included. Ask for a 1–2 page guide plus three listing-search angles.",
    useCases: [
      "Listing appointment leave-behind",
      "Relocation buyer onboarding packet",
      "Hyperlocal SEO landing page draft",
      "Consultation prep neighborhood options",
    ],
    examplePrompts: [
      "Create a Fair Housing–safe neighborhood guide for a buyer who needs ≤30 min to downtown, good parks, and under $800k.",
      "Turn these notes about East Nashville into a client PDF outline with amenities and commute facts only.",
    ],
    prerequisites: [
      "Verified local facts (don’t invent school ratings or crime stats)",
      "Buyer criteria without protected-class proxies",
      "Brokerage content review process",
    ],
    tips: [
      "Cite or date-stamp any stats you include.",
      "Block demographic “fit” language in the skill instructions.",
      "Great for SEO market pages when paired with self-updating content workflows.",
    ],
    sources: [
      "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
      "https://nextautomation.us/blog/claude-skills-for-real-estate-complete-guide",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
    ],
  },
  {
    slug: "property-investment-analysis",
    name: "Property Investment Analysis",
    type: "skill",
    summary:
      "Evaluates rental and investment properties with cash flow, cap rate, cash-on-cash, and scenario math for agent–investor conversations.",
    overview:
      "Property Investment Analysis (pm-claude-skills) covers deal screening math agents run with investor clients. NextAutomation’s Investment Property Calculator is the same job in template form. For REIT/infrastructure valuation (NOI, FFO, AFFO, LTV, DSCR), use the separate Real Assets skill.",
    categories: ["sales", "operations", "other"],
    industries: ["real-estate", "fintech", "other"],
    link: "https://github.com/mohitagw15856/pm-claude-skills/tree/main/skills/property-investment-analysis",
    installation:
      "```bash\nnpx skills add mohitagw15856/pm-claude-skills --skill property-investment-analysis\n```\n\nTemplate alternative: Investment Property Calculator in the NextAutomation pack.",
    howToUse:
      "Provide purchase price, rents, vacancy, expenses, financing terms. Ask for cap rate, cash-on-cash, sensitivity cases, and a go/no-go summary for the investor.",
    useCases: [
      "On-the-spot rental deal screen during a showing",
      "Compare two BRRRR candidates",
      "Stress-test vacancy and rate bumps",
      "Investor-client follow-up with clear numbers",
    ],
    examplePrompts: [
      "Analyze this duplex: price, rents, taxes, insurance, 20% down at 6.5%. Give cap rate, CoC, and break-even occupancy.",
      "Which of these three rentals has the best risk-adjusted cash-on-cash?",
    ],
    prerequisites: [
      "Accurate rent/expense assumptions",
      "Financing terms if levered returns matter",
      "Disclaimer: not financial advice",
    ],
    tips: [
      "Separate unlevered (cap rate) from levered (cash-on-cash) clearly.",
      "For REIT/infra portfolios use Real Assets instead.",
      "Pair with RentCast skill when you need rent comps via API.",
    ],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/mohitagw15856/pm-claude-skills",
      "https://nextautomation.us/resources/free-templates/claude-skills-for-real-estate",
      "https://theprosperityagent.com/2026/06/15-claude-skills-for-real-estate-agents/",
    ],
  },
  {
    slug: "real-assets",
    name: "Real Assets (REIT & Infrastructure Analysis)",
    type: "skill",
    summary:
      "JoelLewis finance skill for real estate and infrastructure investing — NOI, cap rates, FFO/AFFO, LTV/DSCR, and direct ownership vs REIT tradeoffs.",
    overview:
      "Listed on MCP Market as “Real Estate & Infrastructure Investment Analysis.” The installable skill name is `real-assets` inside JoelLewis/finance_skills. It prevents common pitfalls like applying equity P/E thinking to REITs and walks leverage/coverage math for commercial property and infrastructure assets (toll roads, towers, utilities).",
    categories: ["operations", "other", "product"],
    industries: ["real-estate", "fintech", "other"],
    link: "https://mcpmarket.com/tools/skills/real-estate-infrastructure-investment-analysis",
    installation:
      "```bash\nnpx skills add JoelLewis/finance_skills --skill real-assets\n```\n\nGitHub: https://github.com/JoelLewis/finance_skills (skill path: `plugins/wealth-management/skills/real-assets`).",
    howToUse:
      "Ask about property valuation, REIT dividend sustainability, or infrastructure cash flows. Provide NOI, price, debt terms, or REIT financials. Request a decision checklist (direct vs REIT) when relevant.",
    useCases: [
      "Cap-rate valuation of a commercial property",
      "REIT AFFO / dividend coverage review",
      "LTV and DSCR leverage stress test",
      "Compare direct rental ownership vs REIT exposure",
    ],
    examplePrompts: [
      "Value this warehouse using NOI and a 6.2% market cap rate; show sensitivity ±50 bps.",
      "Evaluate this REIT’s dividend using FFO and AFFO — is it covered after maintenance capex?",
    ],
    prerequisites: [
      "Financial inputs (NOI, debt schedule, or REIT filings)",
      "Claude Code / skills-compatible host",
      "Human investment judgment — skill is analytical support",
    ],
    tips: [
      "Use P/FFO within sector, not P/E, for REIT comps.",
      "Infrastructure revenue is often contracted/regulated — model that explicitly.",
      "For simple SFH rental screens prefer Property Investment Analysis.",
    ],
    sources: [
      "https://mcpmarket.com/tools/skills/real-estate-infrastructure-investment-analysis",
      "https://github.com/JoelLewis/finance_skills",
    ],
  },
  {
    slug: "prosperity-real-estate-skills",
    name: "Prosperity Real Estate Skills",
    type: "skill",
    summary:
      "Open-source Claude Code plugin pack for agents: listing descriptions, MLS→Claude connection, Fair Housing overlay, and a 15-minute quick-start — MIT licensed.",
    overview:
      "The Prosperity Agent (Al & Victoria Pinder) publish four free skills on GitHub that install as a Claude Code marketplace plugin. Their broader “15 skills” article also maps tool workflows (Metricool, HeyGen, Rank Math, etc.); this catalog entry covers the installable open-source pack.",
    categories: ["marketing", "sales", "operations"],
    industries: ["real-estate", "agency", "other"],
    link: "https://github.com/TheProsperityAgent/prosperity-real-estate-skills",
    installation:
      "```text\n/plugin marketplace add TheProsperityAgent/prosperity-real-estate-skills\n/plugin install real-estate-skills@prosperity-real-estate-skills\n```\n\nOr clone and copy `skills/*` into `~/.claude/skills/`.",
    howToUse:
      "Install the plugin, then invoke listing-description, connect-mls-to-claude, fair-housing-overlay, or quick-start-3-wins by describing the matching task. Skills load when the request matches.",
    useCases: [
      "First-week Claude Code setup for a realty team",
      "Fair Housing–default listing copy",
      "MLS data connection experiments",
      "Three quick productivity wins for new AI adopters",
    ],
    examplePrompts: [
      "Use listing-description on this MLS sheet and run fair-housing-overlay before I post.",
      "Walk me through quick-start-3-wins for my solo agent business this week.",
    ],
    prerequisites: [
      "Claude Code with plugin marketplace support",
      "MLS access credentials only where your board allows automation",
      "Human compliance review",
    ],
    tips: [
      "Start with the four free skills before buying tool stacks.",
      "Fair Housing Overlay should gate every marketing skill.",
      "Commercial users should adapt templates — pack is residential-first.",
    ],
    sources: [
      "https://github.com/TheProsperityAgent/prosperity-real-estate-skills",
      "https://theprosperityagent.com/2026/06/15-claude-skills-for-real-estate-agents/",
    ],
  },
  {
    slug: "fair-housing-overlay",
    name: "Fair Housing Overlay",
    type: "skill",
    summary:
      "Scans listing and marketing copy for Fair Housing risk language and suggests compliant rewrites before you publish.",
    overview:
      "Prosperity’s fair-housing-overlay skill plus Layer3Labs’ compliance QA pattern: a mandatory pre-publish gate for AI-generated ads, listings, and emails. HUD 2024 guidance treats AI advertising like any other ad — the broker owns the outcome.\n\nBake blocklists and coded-phrase screens into every marketing skill; this overlay is the last check.",
    categories: ["marketing", "operations", "other"],
    industries: ["real-estate", "agency", "other"],
    link: "https://github.com/TheProsperityAgent/prosperity-real-estate-skills/tree/main/skills/fair-housing-overlay",
    installation:
      "```text\n/plugin marketplace add TheProsperityAgent/prosperity-real-estate-skills\n/plugin install real-estate-skills@prosperity-real-estate-skills\n```\n\nOr copy `skills/fair-housing-overlay` into `~/.claude/skills/`. For brokerage rollouts, Layer3Labs recommends logging draft → edit → approval for audit.",
    howToUse:
      "Paste any listing, email, or social draft. Ask for risk flags, coded phrases, and safer rewrites. Require human broker sign-off on flagged items.",
    useCases: [
      "Pre-publish gate for every listing description",
      "Social ad copy compliance check",
      "Train new agents on coded-language pitfalls",
      "Firm-wide QA before MLS live",
    ],
    examplePrompts: [
      "Run Fair Housing Overlay on this listing — flag risks and rewrite safely.",
      "Audit this buyer consultation neighborhood suggestion for demographic steering.",
    ],
    prerequisites: [
      "Draft marketing copy",
      "Brokerage Fair Housing policy",
      "Licensed reviewer for escalations",
    ],
    tips: [
      "Words like family-friendly, safe, exclusive, walkable can be risk triggers depending on context.",
      "Accessibility-first substitutes beat exclusionary phrasing.",
      "Make this skill mandatory in any brokerage Skill stack.",
    ],
    sources: [
      "https://github.com/TheProsperityAgent/prosperity-real-estate-skills",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
      "https://theprosperityagent.com/2026/06/15-claude-skills-for-real-estate-agents/",
    ],
  },
  {
    slug: "connect-mls-to-claude",
    name: "Connect MLS to Claude",
    type: "skill",
    summary:
      "Prosperity skill for wiring local MLS / county data into Claude Code workflows so market and listing automation can use real inputs.",
    overview:
      "Connect MLS to Claude is the data-connection skill in the Prosperity free pack. Skills alone are static; live MLS usually needs board-approved APIs, exports, or MCP. This skill documents the connection pattern agents use before CMA, listing, and market-page automation.",
    categories: ["operations", "engineering", "sales"],
    industries: ["real-estate", "other"],
    link: "https://github.com/TheProsperityAgent/prosperity-real-estate-skills/tree/main/skills/connect-mls-to-claude",
    installation:
      "Install Prosperity Real Estate Skills plugin (see prosperity-real-estate-skills entry), then open the `connect-mls-to-claude` skill and follow its connection checklist for your board.",
    howToUse:
      "Confirm MLS vendor/board rules first. Use exports or approved APIs only. Point CMA and listing skills at the connected data path — never scrape against TOS.",
    useCases: [
      "Daily MLS → social content pipeline",
      "Comp pulls for overnight CMAs",
      "Self-updating market pages",
    ],
    examplePrompts: [
      "Help me connect my MLS export folder to Claude Code safely under my board rules.",
      "Given this MLS CSV, prepare inputs for comparative-market-analysis.",
    ],
    prerequisites: [
      "MLS membership and board automation policy",
      "Claude Code",
      "Export or API credentials you are allowed to use",
    ],
    tips: [
      "If the board forbids automation, stick to manual paste into CMA/listing skills.",
      "Pair with IDX Broker skill for public-site lead/IDX workflows.",
    ],
    sources: [
      "https://github.com/TheProsperityAgent/prosperity-real-estate-skills",
      "https://theprosperityagent.com/2026/06/15-claude-skills-for-real-estate-agents/",
    ],
  },
  {
    slug: "quick-start-3-wins",
    name: "Quick Start: 3 Wins",
    type: "skill",
    summary:
      "Prosperity onboarding skill that walks agents through three high-ROI Claude wins in the first week — built for non-technical adopters.",
    overview:
      "The fourth free Prosperity skill. Use when an agent is new to Claude Skills and needs immediate time-back before building a full stack.",
    categories: ["operations", "growth", "marketing"],
    industries: ["real-estate", "agency", "other"],
    link: "https://github.com/TheProsperityAgent/prosperity-real-estate-skills/tree/main/skills/quick-start-3-wins",
    installation:
      "Part of Prosperity Real Estate Skills plugin marketplace install.",
    howToUse:
      "Invoke when setting up a new agent workspace. Complete the three suggested wins, then graduate to listing-description + fair-housing-overlay daily.",
    useCases: [
      "Team AI onboarding",
      "Solo agent first weekend with Claude Code",
      "Brokerage lunch-and-learn demo",
    ],
    examplePrompts: [
      "Run quick-start-3-wins for a busy buyer’s agent with no VA.",
    ],
    prerequisites: ["Prosperity plugin or skill folder installed"],
    tips: ["Don’t skip Fair Housing Overlay even during quick wins."],
    sources: [
      "https://github.com/TheProsperityAgent/prosperity-real-estate-skills",
      "https://theprosperityagent.com/2026/06/15-claude-skills-for-real-estate-agents/",
    ],
  },
  {
    slug: "buyer-consultation-prep",
    name: "Buyer Consultation Prep",
    type: "skill",
    summary:
      "Builds a one-page first-meeting brief: talking points, criteria-based neighborhood options, and market overview for buyer consultations.",
    overview:
      "Documented by Tristan Ahumada (Consultation Prep) and Layer3Labs (buyer consultation prep). Encode your consultation checklist into a SKILL.md — there isn’t a single canonical public repo, but the workflow is one of the highest-ROI agent skills.",
    categories: ["sales", "operations"],
    industries: ["real-estate", "agency", "other"],
    link: "https://tristanahumada.substack.com/p/how-5-claude-skills-replaced-2000",
    installation:
      "Build as a custom Skill: ask Claude to “Create a Skill for buyer consultation prep” with your market, voice, and checklist. Upload the resulting SKILL.md in Claude.ai or copy into `~/.claude/skills/buyer-consultation-prep/`.\n\nLayer3Labs deploys firm-standard versions for brokerages.",
    howToUse:
      "Paste buyer criteria, budget, timeline, and any CRM notes. Get talking points + three area options (criteria-based only) + market snapshot.",
    useCases: [
      "Night-before listing/buyer appointment prep",
      "ISA → agent handoff brief",
      "Relocation consultation packets",
    ],
    examplePrompts: [
      "Prep my buyer consult: $650–700k, needs home office, ≤25 min to airport. Fair Housing–safe neighborhood options only.",
    ],
    prerequisites: [
      "Buyer intake notes",
      "Current market stats you trust",
      "Custom SKILL.md with your process",
    ],
    tips: [
      "Never frame neighborhoods demographically.",
      "Chain into Comparative Market Analysis when pricing a specific home.",
    ],
    sources: [
      "https://tristanahumada.substack.com/p/how-5-claude-skills-replaced-2000",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
    ],
  },
  {
    slug: "monthly-market-update",
    name: "Monthly Market Update",
    type: "skill",
    summary:
      "Turns the latest local market numbers into a buyer/seller-ready monthly update email or newsletter in your voice.",
    overview:
      "Tristan Ahumada’s Monthly Market Update skill pattern: paste stats → get a framed update for both buyers and sellers in your template. Coffee & Contracts’ beginner guide similarly recommends scheduled marketing tasks once Skills exist.",
    categories: ["marketing", "sales", "growth"],
    industries: ["real-estate", "agency", "other"],
    link: "https://tristanahumada.substack.com/p/how-5-claude-skills-replaced-2000",
    installation:
      "Create a custom Skill from your last 3 market emails + preferred stats block. Save as `monthly-market-update/SKILL.md` in Claude Skills or `~/.claude/skills/`.",
    howToUse:
      "Each month paste median price, inventory, DOM, rates. Ask for email + social blurb. Schedule send via your ESP/CRM.",
    useCases: [
      "Sphere newsletter",
      "Past-client equity update",
      "Listing appointment leave-behind stats page",
    ],
    examplePrompts: [
      "Draft this month’s market update for Austin using these stats — buyer section and seller section, my voice.",
    ],
    prerequisites: ["Trusted monthly stats source", "Voice samples from past emails"],
    tips: ["Date every number.", "Pair with Social Content skill for channel variants — don’t invent a second social skill."],
    sources: [
      "https://tristanahumada.substack.com/p/how-5-claude-skills-replaced-2000",
      "https://coffeecontracts.com/blog/claude-ai-for-real-estate-agents-a-beginner-s-guide-2026",
    ],
  },
  {
    slug: "disclosure-review",
    name: "Disclosure Review",
    type: "skill",
    summary:
      "Gap-analyzes seller disclosures, inspections, and title docs against your state’s required disclosure checklist — flags for licensed follow-up.",
    overview:
      "Layer3Labs Skill #7 for brokerages. High E&O value: missed disclosures are a top claim category. The skill surfaces gaps and inconsistencies; it does not give legal advice.",
    categories: ["operations", "other"],
    industries: ["real-estate", "other"],
    link: "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
    installation:
      "Encode your state disclosure checklist into a SKILL.md (or engage a brokerage implementer). Store sample redacted disclosure packs in the skill’s `references/` folder.",
    howToUse:
      "Provide seller disclosure, inspection, and title excerpts plus your state checklist. Ask for missing items, inconsistencies, and licensed follow-ups.",
    useCases: [
      "Pre-listing disclosure completeness check",
      "Buyer-side risk brief before removing contingencies",
      "Transaction coordinator QA",
    ],
    examplePrompts: [
      "Compare this seller disclosure + inspection to our state checklist. List gaps and contradictions.",
    ],
    prerequisites: [
      "State-specific required disclosure list",
      "Document text/PDFs",
      "Broker/attorney escalation path",
    ],
    tips: [
      "Keep checklists versioned per state when you operate multi-state.",
      "Pair with Contract Terms Analyzer on the purchase agreement.",
    ],
    sources: [
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
    ],
  },
  {
    slug: "re-compliance-qa",
    name: "Real Estate Compliance QA",
    type: "skill",
    summary:
      "Pre-publish compliance gate for listing copy, emails, and social — Fair Housing, state advertising rules, and NAR Code of Ethics Article 12.",
    overview:
      "Layer3Labs Skill #8. Broader than Fair Housing Overlay alone: includes state advertising rules and NAR ethics. Deploy as a mandatory gate after every marketing draft.",
    categories: ["marketing", "operations", "other"],
    industries: ["real-estate", "agency", "other"],
    link: "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
    installation:
      "Build or commission a firm SKILL.md with your state rules + Fair Housing blocklist + NAR Article 12 checks. Can wrap Prosperity’s fair-housing-overlay as the core engine.",
    howToUse:
      "Paste any outbound marketing asset. Require pass/fail + rewrite suggestions + human approval checkbox.",
    useCases: [
      "MLS description final gate",
      "Team social calendar compliance",
      "Franchise brand/legal review assist",
    ],
    examplePrompts: [
      "Compliance QA this email blast for Fair Housing and NAR Article 12 issues.",
    ],
    prerequisites: ["Firm policy docs", "State advertising rules summary"],
    tips: [
      "Pilot listing + follow-up skills first, then make this gate mandatory in week 2.",
      "Log approvals for six years where counsel recommends.",
    ],
    sources: [
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
      "https://github.com/TheProsperityAgent/prosperity-real-estate-skills",
    ],
  },
  {
    slug: "real-estate-search",
    name: "Real Estate Search (Korea MOLIT)",
    type: "skill",
    summary:
      "Korean apartment/officetel/villa/house transaction-price and rent lookups via k-skill-proxy and MOLIT public data APIs.",
    overview:
      "Top-installed real-estate skill on Claude Skills Hub (nomadamas/k-skill). Built on tae0y’s real-estate-mcp patterns and Korea MOLIT open data — not a US MLS tool.",
    categories: ["operations", "other"],
    industries: ["real-estate", "other"],
    link: "https://claudeskills.info/skills/nomadamas/k-skill/real-estate-search/",
    installation:
      "```bash\nnpx skills add nomadamas/k-skill --skill real-estate-search\n```",
    howToUse:
      "Ask for transaction prices or rents for Korean property types/regions the skill supports. Confirm API/proxy setup in the skill docs.",
    useCases: [
      "Korea apartment sale comps",
      "Officetel rent checks",
      "Local market research for KR properties",
    ],
    examplePrompts: [
      "Look up recent apartment transaction prices in this district for 84㎡ units.",
    ],
    prerequisites: ["Network access for MOLIT/proxy APIs", "Understanding of Korean housing types"],
    tips: ["Wrong geography tool for US/EU MLS work — use local MLS skills instead."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://claudeskills.info/skills/nomadamas/k-skill/real-estate-search/",
    ],
  },
  {
    slug: "real-estate-expert",
    name: "Real Estate Expert",
    type: "skill",
    summary:
      "Broad real-estate systems skill: property management, MLS concepts, CRM, virtual tours, and market analysis workflows.",
    overview:
      "personamanagmentlayer/pcl domain skill for expert-level real estate systems conversations — useful for proptech builders and ops leads mapping an agent stack.",
    categories: ["operations", "product", "sales"],
    industries: ["real-estate", "saas", "marketplace", "other"],
    link: "https://claudeskills.info/skills/personamanagmentlayer/pcl/real-estate-expert/",
    installation:
      "```bash\nnpx skills add personamanagmentlayer/pcl --skill real-estate-expert\n```\n\nPath: `stdlib/domains/real-estate-expert`.",
    howToUse:
      "Describe the system or workflow you’re designing (CRM + MLS + tours). Ask for architecture and process recommendations.",
    useCases: [
      "Proptech product scoping",
      "Brokerage tech-stack design",
      "Property management process map",
    ],
    examplePrompts: [
      "Design an MLS + CRM + virtual-tour stack for a 40-agent brokerage.",
    ],
    prerequisites: ["Claude skills host", "Audit the pcl repo before install"],
    tips: ["Pair with Proptech Advisor for founder/strategy questions."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/personamanagmentlayer/pcl",
    ],
  },
  {
    slug: "real-estate-analyzer",
    name: "Real Estate Analyzer",
    type: "skill",
    summary:
      "Property valuation helpers: market analysis, investment ROI, comps, and rental yield assessment for investment evaluation.",
    overview:
      "travisjneuman/.claude skill. Use when evaluating investments, analyzing markets, or calculating returns — complementary to Property Investment Analysis and Real Assets.",
    categories: ["operations", "sales", "other"],
    industries: ["real-estate", "fintech", "other"],
    link: "https://claudeskills.info/skills/travisjneuman/.claude/real-estate-analyzer/",
    installation:
      "```bash\nnpx skills add travisjneuman/.claude --skill real-estate-analyzer\n```",
    howToUse:
      "Provide property and market inputs; ask for valuation framing, ROI, and rental yield. Cross-check with local comps.",
    useCases: [
      "Investment memo first draft",
      "Rental yield screen",
      "Comp-supported value opinion for discussion",
    ],
    examplePrompts: [
      "Analyze ROI and rental yield for this property given price, rent, and expenses.",
    ],
    prerequisites: ["Deal inputs", "Not a formal appraisal"],
    tips: ["Prefer Real Assets for REIT/FFO work; this skill for property-level analysis."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/travisjneuman/.claude",
    ],
  },
  {
    slug: "proptech-advisor",
    name: "Proptech Advisor",
    type: "skill",
    summary:
      "Strategic advisory for proptech founders — segments, MLS/brokerage models, licensing, RESPA, iBuyer, and business-model design.",
    overview:
      "borghei/Claude-Skills vertical advisor. Triggers on proptech, MLS, brokerage, iBuyer, or RESPA discussions. Ships segment assessment assets and MLS/brokerage reference docs.",
    categories: ["product", "sales", "other"],
    industries: ["real-estate", "saas", "marketplace", "other"],
    link: "https://github.com/borghei/Claude-Skills/tree/main/vertical-advisors/proptech-advisor",
    installation:
      "```bash\nnpx skills add borghei/Claude-Skills --skill proptech-advisor\n```\n\nPath: `vertical-advisors/proptech-advisor`.",
    howToUse:
      "Describe the proptech idea, target segment, and constraints. Ask for segment fit, licensing risks, and MLS/brokerage model implications.",
    useCases: [
      "Proptech idea validation",
      "MLS partnership strategy",
      "RESPA-aware go-to-market review",
    ],
    examplePrompts: [
      "Advise on an iBuyer-adjacent SaaS for listing agents — MLS and RESPA risks?",
    ],
    prerequisites: ["Clear product hypothesis", "Willingness to involve real-estate counsel"],
    tips: ["Not a substitute for regulated legal advice on RESPA/licensing."],
    sources: [
      "https://claudeskills.info/skills/borghei/Claude-Skills/proptech-advisor/",
      "https://github.com/borghei/Claude-Skills",
    ],
  },
  {
    slug: "rental-application",
    name: "Rental Application",
    type: "skill",
    summary:
      "Writes a standout rental application / landlord cover letter — renter profile, reliability evidence, and a clear ask.",
    overview:
      "pm-claude-skills life-admin/real-estate skill for competitive rental markets. Tenant-side, not landlord screening (see Tenant Screening Guide).",
    categories: ["other", "operations"],
    industries: ["real-estate", "other"],
    link: "https://github.com/mohitagw15856/pm-claude-skills/tree/main/skills/rental-application",
    installation:
      "```bash\nnpx skills add mohitagw15856/pm-claude-skills --skill rental-application\n```",
    howToUse:
      "Provide employment, income, references, pets, move-in date, and why you want the unit. Ask for a concise cover letter.",
    useCases: [
      "Competitive urban rental markets",
      "Relocation applications",
      "Strengthen thin credit stories with context",
    ],
    examplePrompts: [
      "Write a rental application letter for this 2BR — here’s my income, references, and move-in date.",
    ],
    prerequisites: ["Honest applicant facts", "Landlord application requirements"],
    tips: ["Don’t fabricate income or references.", "Pair with Israeli Apartment Hunting if relocating to Israel."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/mohitagw15856/pm-claude-skills",
    ],
  },
  {
    slug: "tenant-screening-guide",
    name: "Tenant Screening Guide",
    type: "skill",
    summary:
      "Designs a fair, consistent, Fair Housing–aware tenant screening process — criteria, checks, evaluation method, and applicant communication.",
    overview:
      "Landlord/PM skill from pm-claude-skills. Emphasizes objective written criteria and consistent evaluation. Not legal advice; HUD AI guidance applies to screening tools.",
    categories: ["operations", "other"],
    industries: ["real-estate", "other"],
    link: "https://github.com/mohitagw15856/pm-claude-skills/tree/main/skills/tenant-screening-guide",
    installation:
      "```bash\nnpx skills add mohitagw15856/pm-claude-skills --skill tenant-screening-guide\n```",
    howToUse:
      "Describe property type and constraints. Ask for written criteria, application steps, evaluation rubric, and adverse-action communication templates.",
    useCases: [
      "Small landlord screening SOP",
      "PM company process standardization",
      "Fair Housing training aid",
    ],
    examplePrompts: [
      "Design a Fair Housing–compliant screening process for a 12-unit multifamily — income multiple, pets, criminal check policy.",
    ],
    prerequisites: ["Local landlord-tenant law awareness", "Counsel review for policy"],
    tips: [
      "Never use protected traits or proxies in criteria.",
      "Document consistent application of the rubric.",
    ],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://www.layer3labs.io/guides/claude-skills-for-real-estate-agencies",
    ],
  },
  {
    slug: "property-offer-letter",
    name: "Property Offer Letter",
    type: "skill",
    summary:
      "Drafts structured real-estate offer letters from price, contingencies, dates, and buyer terms for agent or buyer review.",
    overview:
      "Companion pm-realestate skill alongside Property Listing and CMA. Produces a draft offer letter — not a binding contract form set.",
    categories: ["sales", "operations"],
    industries: ["real-estate", "other"],
    link: "https://github.com/mohitagw15856/pm-claude-skills/tree/main/skills/property-offer-letter",
    installation:
      "```bash\nnpx skills add mohitagw15856/pm-claude-skills --skill property-offer-letter\n```",
    howToUse:
      "Provide target price, EM, contingencies, close date, and special terms. Ask for a client-facing letter plus a term sheet bullet list.",
    useCases: [
      "Buyer offer cover letter",
      "Term summary before filling state forms",
      "Investor LOI first draft",
    ],
    examplePrompts: [
      "Draft an offer letter at $615k with inspection and financing contingencies, close in 30 days.",
    ],
    prerequisites: ["Deal terms", "State form set still required for binding offers"],
    tips: ["Always execute on official state/board forms.", "Pair with Contract Terms Analyzer on counters."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/mohitagw15856/pm-claude-skills",
    ],
  },
  {
    slug: "follow-up-boss",
    name: "Follow Up Boss",
    type: "skill",
    summary:
      "Membrane application skill for Follow Up Boss — persons, organizations, leads, deals, pipelines, and activities.",
    overview:
      "CRM integration skill for one of the most common real-estate CRMs. Use when Claude should read/write Follow Up Boss records via the Membrane application-skills pack.",
    categories: ["sales", "operations", "growth"],
    industries: ["real-estate", "agency", "other"],
    link: "https://claudeskills.info/skills/membranedev/application-skills/follow-up-boss/",
    installation:
      "```bash\nnpx skills add membranedev/application-skills --skill follow-up-boss\n```\n\nRequires Membrane/Follow Up Boss credentials configured per skill docs.",
    howToUse:
      "Ask to list hot leads, log activities, or update pipeline stages. Combine with Lead Qualifier Agent for scoring before CRM writes.",
    useCases: [
      "Pull today’s new leads into a call list",
      "Log showing follow-ups",
      "Pipeline hygiene for ISAs",
    ],
    examplePrompts: [
      "List Follow Up Boss leads created in the last 24 hours with stage and source.",
    ],
    prerequisites: ["Follow Up Boss account", "Membrane skill auth", "Permission to modify CRM data"],
    tips: ["Dry-run reads before enabling writes.", "Pair with Client Follow-Up Scheduler for message drafts."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/membranedev/application-skills",
    ],
  },
  {
    slug: "idx-broker",
    name: "IDX Broker",
    type: "skill",
    summary:
      "Membrane skill for IDX Broker — manage leads, users, and roles when working with IDX site data.",
    overview:
      "Use for agent websites powered by IDX Broker. Complements Connect MLS to Claude for board data vs public IDX lead capture.",
    categories: ["marketing", "sales", "engineering"],
    industries: ["real-estate", "marketplace", "other"],
    link: "https://claudeskills.info/skills/membranedev/application-skills/idx-broker/",
    installation:
      "```bash\nnpx skills add membranedev/application-skills --skill idx-broker\n```",
    howToUse:
      "Ask Claude to manage IDX Broker leads/users per the skill’s tools. Keep PII handling inside brokerage policy.",
    useCases: [
      "IDX lead triage",
      "User/role administration assists",
      "Website lead ops automation",
    ],
    examplePrompts: [
      "Show new IDX Broker leads from this week and draft first-touch emails.",
    ],
    prerequisites: ["IDX Broker account", "Membrane auth"],
    tips: ["IDX ≠ full MLS — respect data redistribution rules."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/membranedev/application-skills",
    ],
  },
  {
    slug: "sierra-interactive",
    name: "Sierra Interactive",
    type: "skill",
    summary:
      "Membrane skill for Sierra Interactive — leads, persons, organizations, deals, projects, and activities.",
    overview:
      "Brokerage website/CRM platform integration via membranedev/application-skills.",
    categories: ["sales", "marketing", "operations"],
    industries: ["real-estate", "agency", "other"],
    link: "https://claudeskills.info/skills/membranedev/application-skills/sierra-interactive/",
    installation:
      "```bash\nnpx skills add membranedev/application-skills --skill sierra-interactive\n```",
    howToUse:
      "Connect credentials, then ask for lead/deal operations in natural language.",
    useCases: ["Lead routing", "Deal activity logging", "Website CRM hygiene"],
    examplePrompts: [
      "Pull Sierra Interactive leads without activity in 7 days for a re-engagement batch.",
    ],
    prerequisites: ["Sierra Interactive account", "Membrane auth"],
    tips: ["Combine with Fair Housing Overlay before bulk email copy ships."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/membranedev/application-skills",
    ],
  },
  {
    slug: "rentcast",
    name: "RentCast",
    type: "skill",
    summary:
      "Membrane skill for RentCast — properties, contacts, and leads for rent estimates and property data workflows.",
    overview:
      "Useful alongside Property Investment Analysis when you need rent comps/AVM-style inputs from RentCast rather than manual guesses.",
    categories: ["operations", "sales", "other"],
    industries: ["real-estate", "fintech", "other"],
    link: "https://claudeskills.info/skills/membranedev/application-skills/rentcast/",
    installation:
      "```bash\nnpx skills add membranedev/application-skills --skill rentcast\n```",
    howToUse:
      "Ask for property/rent data for an address your RentCast plan supports; feed results into investment analysis.",
    useCases: [
      "Rent estimate for investor screen",
      "Property record lookup",
      "Lead enrichment",
    ],
    examplePrompts: [
      "Get RentCast rent estimate and property facts for 456 Pine St and summarize for a cash-flow model.",
    ],
    prerequisites: ["RentCast API/account", "Membrane auth"],
    tips: ["Treat estimates as inputs, not guarantees."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/membranedev/application-skills",
    ],
  },
  {
    slug: "matterport",
    name: "Matterport",
    type: "skill",
    summary:
      "Membrane skill for Matterport — manage 3D spaces/virtual tour assets from Claude.",
    overview:
      "Helps teams operate Matterport spaces alongside listing marketing workflows.",
    categories: ["marketing", "operations", "design"],
    industries: ["real-estate", "other"],
    link: "https://claudeskills.info/skills/membranedev/application-skills/matterport/",
    installation:
      "```bash\nnpx skills add membranedev/application-skills --skill matterport\n```",
    howToUse:
      "Ask to list or manage Matterport spaces tied to active listings; pair with Property Listing for copy.",
    useCases: ["Virtual tour inventory", "Listing media ops", "Space metadata cleanup"],
    examplePrompts: [
      "List Matterport spaces for our active listings and note any missing from the website.",
    ],
    prerequisites: ["Matterport account", "Membrane auth"],
    tips: ["Keep tour links in sync with MLS media rules."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/membranedev/application-skills",
    ],
  },
  {
    slug: "reapit",
    name: "Reapit",
    type: "skill",
    summary:
      "Membrane skill for Reapit — UK/international agency CRM and property data workflows.",
    overview:
      "For brokerages on Reapit. Same Membrane application-skills install pattern as other RE CRM skills.",
    categories: ["operations", "sales"],
    industries: ["real-estate", "agency", "other"],
    link: "https://claudeskills.info/skills/membranedev/application-skills/reapit/",
    installation:
      "```bash\nnpx skills add membranedev/application-skills --skill reapit\n```",
    howToUse:
      "Authenticate, then request record/workflow automation in natural language.",
    useCases: ["Agency CRM ops", "Listing/record updates", "Workflow automation assists"],
    examplePrompts: [
      "Summarize open Reapit sales listings without a description and draft Property Listing copy inputs.",
    ],
    prerequisites: ["Reapit account", "Membrane auth"],
    tips: ["Confirm regional compliance (UK advertising standards) separately from US Fair Housing skills."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/membranedev/application-skills",
    ],
  },
  {
    slug: "pp-loopnet",
    name: "LoopNet Printing Press (pp-loopnet)",
    type: "skill",
    summary:
      "CLI-backed LoopNet commercial search skill — price cuts, DOM, supply trends, cap-rate screens, and distressed CRE discovery.",
    overview:
      "mvanhorn/printing-press-library skill `pp-loopnet`. Unlike a one-shot scrape, it remembers trends (price cuts, days on market, supply). Trigger phrases include commercial searches, industrial for-sale queries, and cap-rate distribution questions.",
    categories: ["sales", "operations", "growth"],
    industries: ["real-estate", "marketplace", "other"],
    link: "https://claudeskills.info/skills/mvanhorn/printing-press-library/pp-loopnet/",
    installation:
      "```bash\nnpx skills add mvanhorn/printing-press-library --skill pp-loopnet\n```\n\nRequires the printing-press LoopNet CLI (`loopnet-pp-cli`) per repo docs.",
    howToUse:
      "Ask to search LoopNet for asset types/markets, track price cuts, or screen distressed commercial inventory. Review TOS/compliance for your use case.",
    useCases: [
      "Industrial/cre acquisition sourcing",
      "Cap-rate distribution snapshots",
      "Price-cut / DOM trend monitoring",
    ],
    examplePrompts: [
      "Search LoopNet for industrial properties for sale in Dallas and summarize price cuts and DOM.",
      "What is the cap rate distribution for multifamily listings in this market?",
    ],
    prerequisites: ["printing-press CLI setup", "Network access", "Compliance review for scraping/automation"],
    tips: ["Commercial focus — not a residential Zillow replacement.", "Pair with Real Assets for underwriting math."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/mvanhorn/printing-press-library",
    ],
  },
  {
    slug: "israeli-apartment-hunting",
    name: "Israeli Apartment Hunting",
    type: "skill",
    summary:
      "Rental apartment hunting in Israel via Yad2, Madlan, Facebook groups, and agents — Hebrew terminology, 2026 city prices, viewing checklists.",
    overview:
      "skills-il/localization skill for relocators and renters. Explicitly not for purchasing property or commercial RE. Includes Hebrew glossary and budget calculator scripts.",
    categories: ["operations", "other"],
    industries: ["real-estate", "other"],
    link: "https://github.com/skills-il/localization/tree/master/israeli-apartment-hunting",
    installation:
      "```bash\nnpx skills add skills-il/localization --skill israeli-apartment-hunting\n```",
    howToUse:
      "Describe city, budget, and constraints. Use for listing terminology, viewing checklists, broker-fee norms, and application prep.",
    useCases: [
      "Aliyah / relocation rental search",
      "Hebrew listing decode",
      "Negotiate with landlords using local norms",
    ],
    examplePrompts: [
      "Help me hunt a 3-room rental in Tel Aviv under this budget — checklist, Hebrew terms, and red flags.",
    ],
    prerequisites: ["Hebrew optional but helpful", "Local visit capacity"],
    tips: ["Do NOT use for purchase or commercial deals per skill scope.", "Pair with Rental Application for cover letters."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/skills-il/localization",
    ],
  },
  {
    slug: "panic-room-finder",
    name: "Panic Room Finder",
    type: "skill",
    summary:
      "Niche residential skill for hollow-space detection, hidden-room discovery, and safe-room planning from house dimensions and anomalies.",
    overview:
      "curiositech/some_claude_skills novelty/specialty skill in the Claude Skills Hub real-estate category. Not a brokerage ops skill — use for architectural curiosity / safe-room planning discussions.",
    categories: ["other", "design"],
    industries: ["real-estate", "other"],
    link: "https://claudeskills.info/skills/curiositech/some_claude_skills/panic-room-finder/",
    installation:
      "```bash\nnpx skills add curiositech/some_claude_skills --skill panic-room-finder\n```",
    howToUse:
      "Provide floor plans/dimensions; ask about anomalies and safe-room feasibility. Safety-critical work needs licensed professionals.",
    useCases: [
      "Safe-room feasibility brainstorm",
      "Historic-home hollow-space hypotheses",
    ],
    examplePrompts: [
      "Given this floor plan, where might hollow spaces exist and what would a safe-room conversion require?",
    ],
    prerequisites: ["Floor plans or measurements", "Professional verification for any construction"],
    tips: ["Entertainment/architecture assist — not structural engineering advice."],
    sources: [
      "https://claudeskills.info/skills/category/real-estate/",
      "https://github.com/curiositech/some_claude_skills",
    ],
  },
  {
    slug: "cre-underwriting-skills",
    name: "CRE Underwriting Skills (A.CRE patterns)",
    type: "skill",
    summary:
      "Practical CRE skill patterns from Adventures in CRE — multifamily underwriting with Excel models, OM slide systems, NDA redlines, estoppel/CAM checks.",
    overview:
      "Adventures in CRE’s practical guide explains how Agent Skills encode analyst-grade CRE work: populate acquisition models from T-12/rent roll/OM, redline NDAs, produce OM slides, reconcile estoppels and CAM. Many A.CRE/AI.Edge skills are member downloads; this entry documents the pattern and public guide so teams can build equivalent SKILL.md packs.",
    categories: ["operations", "other", "product"],
    industries: ["real-estate", "fintech", "other"],
    link: "https://www.adventuresincre.com/claude-skills-practical-guide/",
    installation:
      "Follow the A.CRE guide to promote a working underwriting chat into a Skill, or download member skills (e.g. Apartment Acquisition Model) from AI.Edge when available.\n\nMinimal DIY:\n1. Run your underwriting workflow once in Claude.\n2. Ask: “Turn this into a Skill.”\n3. Save `SKILL.md` + model templates into `~/.claude/skills/cre-underwriting/`.",
    howToUse:
      "Attach T-12, rent roll, or OM. Ask the skill to populate your model format, flag estoppel/lease mismatches, or draft OM slides to your template standards.",
    useCases: [
      "Multifamily acquisition model population",
      "NDA redline at scale",
      "OM slide production",
      "Estoppel vs lease discrepancy check",
    ],
    examplePrompts: [
      "Underwrite this 150-unit deal into my standard multifamily format from the attached T-12 and rent roll.",
      "Redline this NDA using our standard positions and fallback language.",
    ],
    prerequisites: [
      "Your Excel/Google underwriting model or A.CRE model license",
      "Deal documents",
      "Human IC approval process",
    ],
    tips: [
      "Description specificity determines activation — write CRE triggers into SKILL.md frontmatter.",
      "Pair with Real Assets for REIT-level metrics vs asset-level models.",
      "Skills are portable across Claude, Cursor, Codex, and other Agent Skills hosts.",
    ],
    sources: [
      "https://www.adventuresincre.com/claude-skills-practical-guide/",
      "https://www.adventuresincre.com/ai-skill-apartment-acquisition-model/",
      "https://www.adventuresincre.com/artificial-intelligence/ai-skills/",
    ],
  },
];
