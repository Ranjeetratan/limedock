import { getEntryBySlug } from "@/lib/directories";
import type { GenerateOptions, ProspectPerson } from "./prospects";
import type {
  CatalogItem,
  Opportunity,
  PitchBeat,
  Presentation,
  PresentationModule,
  ScrapedCompany,
  WorkflowChart,
} from "./types";
import { makeExpiry, newPresentationId } from "./types";

const ALL_MODULES: PresentationModule[] = [
  {
    id: "enquiry-personalize",
    title: "Enquiry replies that answer the question",
    blurb:
      "Someone asks about a 3-bed in Croton under $1.2M. They should get a reply about that — not “thanks, we’ll be in touch.”",
    bullets: [
      "Pulls beds, budget, town, and listing link out of the form",
      "Writes a first reply in your tone",
      "Logs it in CRM and pings whoever should own it",
      "Suggests a shortlist or a showing time",
    ],
    whyForThem: "Buyers can tell when nobody read the form.",
  },
  {
    id: "google-maps",
    title: "Google Maps replies",
    blurb:
      "Reviews and Maps messages get handled while you’re at a showing — not three days later.",
    bullets: [
      "Drafts review replies you can approve in one tap",
      "Answers simple Q&A (areas, hours, how to book)",
      "Turns “message us” into a CRM lead",
      "Flags anything angry or high-intent for you",
    ],
    whyForThem: "People Google you before they call. Empty replies look like you’re closed.",
  },
  {
    id: "lead-magnet",
    title: "Home valuation → real follow-up",
    blurb:
      "If someone asks what their house is worth, that can’t die in an email inbox.",
    bullets: [
      "Valuation / guide request hits CRM the same minute",
      "Hot / warm / cold score on the way in",
      "Same-day follow-up sequence starts",
      "You see who asked for a value and never got a call",
    ],
    whyForThem: "A valuation request is a listing conversation waiting to happen.",
  },
  {
    id: "listing-launch",
    title: "One listing → blog + LinkedIn + Instagram + X",
    blurb:
      "Listing goes live once. The system drafts the blog, LinkedIn post, Instagram carousel, and X thread — in your voice — ready to approve.",
    bullets: [
      "Pulls facts from MLS / site (price, beds, town, hooks)",
      "Blog draft for the team site or brokerage page",
      "LinkedIn post + optional carousel",
      "Instagram caption + slide outline + Stories beat",
      "X / Twitter short post or thread",
      "You approve once; Fair Housing check before anything public",
    ],
    whyForThem: "Marketing shouldn’t restart from a blank page every listing.",
  },
  {
    id: "social-inbox",
    title: "Instagram, LinkedIn & X DMs → CRM",
    blurb:
      "Someone DMs “is this still available?” at 9pm. That becomes a scored lead, not a forgotten notification.",
    bullets: [
      "Watches Instagram, LinkedIn, and X inboxes",
      "Drafts replies that match how you talk",
      "Qualifies budget / timing / town when it makes sense",
      "Hot DMs ping you; everything else lands in CRM",
    ],
    whyForThem: "Social is where buyers already hang out — treat it like a form.",
  },
  {
    id: "blog-engine",
    title: "Market blogs that don’t sound like robots",
    blurb:
      "Monthly Westchester / Putnam update, neighborhood notes, sold stories — drafted from real numbers, edited so it still sounds like your team.",
    bullets: [
      "Pulls comps / market stats you already track",
      "Draft → human polish pass (no filler SEO sludge)",
      "Internal links to live listings and valuation",
      "Ships as blog + LinkedIn + email snippet in one go",
    ],
    whyForThem: "Consistent publishing without a content agency on retainer.",
  },
  {
    id: "lead-command",
    title: "One inbox for every lead",
    blurb: "Website, Maps, Zillow, Instagram, LinkedIn, email — same queue, same rules.",
    bullets: [
      "See what’s hot without checking five apps",
      "Know which source each lead came from",
      "Hand off to the right person on the team",
      "Clear list: who needs a reply today",
    ],
    whyForThem: "Missed leads usually aren’t lazy — they’re buried.",
  },
  {
    id: "listing-outreach",
    title: "New listing → old buyers",
    blurb:
      "You take a listing live. The system finds who already asked for something like it — and drafts the note.",
    bullets: [
      "Matches price, beds, and town to your past inquiries",
      "Writes a short, specific message per person",
      "You approve or set auto-send rules",
      "Everything logged (Fair Housing–safe review)",
    ],
    whyForThem: "Your database shouldn’t sit idle while you pay for new leads.",
  },
  {
    id: "sphere-nurture",
    title: "Past clients & sphere — without the guilt",
    blurb:
      "Anniversary of closing, rate-change window, “thinking of selling?” — timed, personal, not a blast.",
    bullets: [
      "Pulls closed deals + key dates from CRM",
      "Drafts check-ins that reference their actual home / town",
      "Routes referrals into the same lead queue",
      "Keeps you top of mind without sounding needy",
    ],
    whyForThem: "Most listing inventory walks in from people who already trust you.",
  },
  {
    id: "seller-updates",
    title: "Seller updates on autopilot",
    blurb:
      "Weekly: showings, feedback, online views, next move. Seller stops asking “anything new?”",
    bullets: [
      "Pulls showing + portal activity",
      "Drafts a clean weekly note in your voice",
      "Flags soft feedback that needs a price talk",
      "You send or approve — five minutes, not an hour",
    ],
    whyForThem: "Calm sellers renew. Anxious sellers call your competitors.",
  },
  {
    id: "property-matcher",
    title: "Quick shortlists",
    blurb: "Buyer says Cortlandt, under $1.2M, 3 beds. You send three homes — not a link dump.",
    bullets: [
      "Matches against what you have / MLS",
      "Builds a short shortlist with talking points",
      "Ready to paste into email or text",
    ],
    whyForThem: "Saves the 20 minutes between showings.",
  },
  {
    id: "sms-assistant",
    title: "After-hours texts & WhatsApp",
    blurb: "Portal leads and WhatsApp pings at 10pm don’t wait until morning if you don’t want them to.",
    bullets: [
      "WhatsApp + SMS in the same queue as forms",
      "Answers basic listing questions",
      "Asks budget, timing, pre-approval",
      "Books a showing on the calendar",
      "Hands serious buyers to a human",
    ],
    whyForThem: "Overnight silence is how deals leave for the next agent.",
  },
  {
    id: "unified-inbox",
    title: "One place for every inbound",
    blurb:
      "WhatsApp, enquiry form, Instagram DM, LinkedIn DM, Maps message — one inbox. AI reads it, updates CRM, drafts the reply. You approve.",
    bullets: [
      "Every channel lands in the same queue",
      "AI scores intent and routes to the right person",
      "CRM updated without retyping",
      "Anyone on the team can pick up and approve",
    ],
    whyForThem: "Stop hunting six apps to find one lead.",
  },
  {
    id: "call-intel",
    title: "Calls that get smarter",
    blurb:
      "Before the call: brief on who they are. After: what went well, what to try next time, how to convert more — without a manager sitting in.",
    bullets: [
      "Pre-call briefing from CRM + past messages",
      "Optional recording / notes capture (with consent rules)",
      "Post-call summary into CRM",
      "Plain-English coaching: missed asks, next step, tone",
    ],
    whyForThem: "Every conversation teaches the next one.",
  },
  {
    id: "competitor-watch",
    title: "What competitors are doing",
    blurb:
      "Listings they just took, content they’re shipping, offers they’re running — a quiet feed so you’re not guessing.",
    bullets: [
      "Track peer teams / offices you care about",
      "Flag new listings and marketing moves",
      "Suggest what to match or ignore",
      "Optional: fold insights into your weekly market note",
    ],
    whyForThem: "You already watch them. This does it while you sell.",
  },
  {
    id: "team-playbook",
    title: "Systems the whole team can run",
    blurb:
      "Once a workflow exists, anyone can use it and approve it. Full transparency. When someone leaves, the next person inherits the playbook — not a blank Slack history.",
    bullets: [
      "Documented steps in tools you own",
      "Roles: who drafts, who approves, who owns the lead",
      "New hires learn the system, not tribal knowledge",
      "You see the pipeline anytime — nothing hidden",
    ],
    whyForThem: "The business shouldn’t walk out the door with one person.",
  },
  {
    id: "showing",
    title: "Showings without the chase",
    blurb: "Booked → reminded → feedback asked. You don’t hunt anyone down.",
    bullets: [
      "Calendar + buyer confirm + agent ping",
      "Reminders the day before and two hours out",
      "Quick feedback after",
      "Interested → next stage in CRM",
    ],
    whyForThem: "Fewer no-shows. Cleaner updates for sellers.",
  },
  {
    id: "follow-up",
    title: "Nobody falls off",
    blurb: "If someone hasn’t heard from you in six days, the system says so.",
    bullets: [
      "Surfaces cold threads before they’re dead",
      "Suggests what to say next, with context",
      "Nudge people who viewed a similar home",
      "Runs in tools you already use",
    ],
    whyForThem: "This is where most teams quietly lose money.",
  },
  {
    id: "deal-intel",
    title: "Monday without the scramble",
    blurb: "What’s in pipeline, what’s stuck, who’s closing — without a spreadsheet archaeology project.",
    bullets: [
      "Dollar pipeline and expected commission",
      "Deals likely to close vs stuck",
      "Lead → showing → offer → close",
      "Which sources actually produce (forms vs IG vs portals)",
    ],
    whyForThem: "You already know the answers — digging them up is the tax.",
  },
  {
    id: "fifteen-min-ops",
    title: "The 15-minute operating day",
    blurb:
      "If the systems are running, the desk work collapses into one short review — then you’re free for showings, listing appointments, and the human work that actually closes.",
    bullets: [
      "One morning queue: what’s hot, what’s stuck, what to approve",
      "Everything else already drafted or routed overnight",
      "You stay in control — approve, override, or hand off",
      "Transparent: every step visible in tools you own",
    ],
    whyForThem: "The goal isn’t more AI. It’s getting your day back.",
  },
  {
    id: "llm-geo",
    title: "Show up when someone asks ChatGPT / Claude / Gemini",
    blurb:
      "Buyers don’t only Google anymore. They ask AI: “Who’s the best realtor in Croton?” or “Best Westchester team for waterfront?” We help your pages and proof be what those models cite.",
    bullets: [
      "Clear, citable pages about your team, towns, and listings",
      "Structured facts models can trust (not fluff SEO)",
      "Consistent presence across site, Maps, and public profiles",
      "Ongoing: when the market moves, the public story updates with it",
    ],
    whyForThem: "If AI recommends the next agent, that agent shouldn’t be someone else.",
  },
  {
    id: "local-or-cli",
    title: "Run it your way — local app or from Slack / Claude / ChatGPT",
    blurb:
      "Privacy first: a local app on your Mac or PC that you download and run. Or a CLI / agent layer so the team manages workflows from Slack, Claude, Codex, ChatGPT, or Gemini. We help wire the APIs either way.",
    bullets: [
      "Local desktop app — data stays on your machine; you hold the keys",
      "We help integrate Gmail, CRM, WhatsApp, Maps, calendars",
      "Or operate from Slack / Claude / Codex / ChatGPT / Gemini",
      "Same workflows — pick the surface your team actually opens",
    ],
    whyForThem: "You shouldn’t have to live inside another SaaS tab.",
  },
  {
    id: "form-hub",
    title: "Every enquiry form → one spine",
    blurb:
      "Fifteen different inquiry forms — or two. Site, valuation, open-house, HL pages, portals. If you don’t have enough capture points, we help place or create them. All of it lands in one place and updates everywhere.",
    bullets: [
      "Map every existing form and channel",
      "Add capture where visitors already are (if you’re light on forms)",
      "One centralized queue — CRM, drafts, and follow-ups stay in sync",
      "Open Gmail and see drafts / scheduled follow-ups already waiting",
    ],
    whyForThem: "Capture shouldn’t be random. Neither should the follow-up.",
  },
];

function pickModules(company: ScrapedCompany): PresentationModule[] {
  const s = company.signals.join(" ").toLowerCase();
  const scored = ALL_MODULES.map((m) => {
    let score = 1;
    if (m.id === "enquiry-personalize") score += 5;
    if (m.id === "google-maps") score += 5;
    if (m.id === "listing-launch") score += 5;
    if (m.id === "social-inbox") score += 5;
    if (m.id === "fifteen-min-ops") score += 5;
    if (m.id === "llm-geo") score += 5;
    if (m.id === "unified-inbox") score += 5;
    if (m.id === "team-playbook") score += 4;
    if (m.id === "call-intel") score += 4;
    if (m.id === "local-or-cli") score += 5;
    if (m.id === "form-hub") score += 4;
    if (m.id === "competitor-watch") score += 3;
    if (m.id === "blog-engine") score += 4;
    if (m.id === "lead-magnet") score += 4;
    if (m.id === "listing-outreach" && /listings|inventory|properties|luxury/.test(s))
      score += 4;
    if (m.id === "listing-outreach") score += 2;
    if (m.id === "sphere-nurture") score += 3;
    if (m.id === "seller-updates" && /listings|inventory|luxury/.test(s)) score += 3;
    if (m.id === "lead-command" && /contact|lead|listings|portal|team/.test(s)) score += 3;
    if (m.id === "follow-up") score += 3;
    if (m.id === "property-matcher" && /listings|inventory|properties|luxury/.test(s))
      score += 2;
    if (m.id === "sms-assistant") score += 3;
    if (m.id === "showing") score += 1;
    if (m.id === "deal-intel") score += 1;
    return { m, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((x) => {
      if (
        x.m.id === "lead-magnet" &&
        /valuation|lead magnet present/i.test(company.signals.join(" "))
      ) {
        return {
          ...x.m,
          blurb:
            "You already collect home-value requests. We’ll make sure each one becomes a scored lead and a same-day follow-up — not a quiet inbox.",
          whyForThem: "Asking for a value is asking to talk about selling.",
        };
      }
      return x.m;
    });
}

function observationsFor(
  company: ScrapedCompany,
  person?: ProspectPerson,
): string[] {
  const out: string[] = [];

  if (person?.fullName && person?.teamName && person?.brokerage) {
    out.push(
      `${person.fullName} — ${person.title || "broker"} — ${person.teamName} at ${person.brokerage}.`,
    );
  }

  out.push(`Looked at ${company.domain}.`);

  if (person?.siteNotes?.length) {
    out.push(...person.siteNotes.slice(0, 3));
  } else if (/valuation|lead magnet present/i.test(company.signals.join(" "))) {
    out.push(
      "Home valuation is on the site. The gap is what happens after someone submits it.",
    );
  } else {
    out.push("There’s no clear offer that captures a visitor into follow-up.");
  }

  out.push(
    "Blog, LinkedIn, Instagram, Facebook — usually separate chores. They should fire from one listing event.",
  );

  if (person?.markets?.length) {
    out.push(`Towns that matter here: ${person.markets.slice(0, 5).join(", ")}.`);
  }

  if (company.signals.some((s) => /listings|inventory|luxury/i.test(s))) {
    out.push(
      "When a listing hits, past buyers who fit should hear that day — and the public posts should ship the same afternoon.",
    );
  }

  return [...new Set(out)].slice(0, 7);
}

function opportunitiesFor(
  _company: ScrapedCompany,
  person?: ProspectPerson,
): Opportunity[] {
  const who = person?.firstName || "you";
  const market = person?.markets?.[0] || "your town";

  return [
    {
      title: "Valuations go quiet",
      gap: "Someone asks what their home is worth. Then… silence, or a late thank-you.",
      fix: "Same-day scored CRM lead + a reply that starts the listing talk.",
      impact: "You stop paying for traffic that dies in the inbox.",
    },
    {
      title: "DMs never become pipeline",
      gap: "Instagram, LinkedIn, Facebook questions sit in the app. CRM never hears.",
      fix: "Every DM into one queue → draft → assign → log.",
      impact: "People who already reached out stop leaking to whoever answers first.",
    },
    {
      title: "Listing day is still a content scramble",
      gap: `${who} goes live on MLS. Blog and social wait for “when someone has time.”`,
      fix: "Listing event drafts the pack. Team approves once.",
      impact: "Marketing ships the same afternoon as the listing.",
    },
    {
      title: "Too many doors, no front desk",
      gap: "Forms, WhatsApp, Maps, portals — each with its own habit.",
      fix: "One front desk. AI drafts. Humans approve.",
      impact: "Nothing depends on who happened to check which app.",
    },
    {
      title: "AI search doesn’t know you",
      gap: `Buyers ask ChatGPT / Gemini “best realtor in ${market}.” Another name comes back.`,
      fix: "Pages and proof those models can actually cite.",
      impact: "Your offline reputation shows up in the new default search.",
    },
  ];
}

function advantages(person?: ProspectPerson): { title: string; body: string }[] {
  const name = person?.firstName || "You";
  return [
    {
      title: "Fix the leak, not the brand",
      body: `${name}'s team already wins on trust and listings. We wire what happens after someone raises a hand.`,
    },
    {
      title: "Start where it hurts",
      body: "Valuation follow-up, DMs, listing launches — pick one. Expand when it works.",
    },
    {
      title: "The team can run it",
      body: "Anyone can approve. New hires inherit the playbook. You see every step.",
    },
    {
      title: "Your machine or your chat apps",
      body: "Local Mac/PC app for privacy, or Slack / Claude / ChatGPT / Gemini. Same workflows.",
    },
  ];
}

function pitchBeatsFor(
  company: ScrapedCompany,
  person?: ProspectPerson,
): PitchBeat[] {
  const who = person?.firstName || "you";
  const team = person?.teamName || company.name;
  const market = person?.markets?.[0] || "your town";

  return [
    {
      id: "inbox",
      eyebrow: "Pain → fix",
      title: "Leads show up. Follow-up doesn’t.",
      body: `${team} gets hands raised on the site and social. The break is after that — who saw it, who replied, whether CRM knows. We put every inbound in one place and make the next step obvious.`,
      bullets: [
        "WhatsApp · forms · IG · LinkedIn · Maps",
        "AI drafts · CRM updates · human approve",
        "Gmail already has the draft waiting",
      ],
    },
    {
      id: "delivery",
      eyebrow: "How you run it",
      title: "No new “home” you have to live in",
      body: "Local app on Mac/PC if privacy matters. Or run the same work from Slack, Claude, ChatGPT, or Gemini. We help wire the APIs either way.",
      bullets: ["Local = your keys", "Chat apps = where the team already is", "You own the workflows"],
    },
    {
      id: "fifteen",
      eyebrow: "What “fixed” looks like",
      title: "Desk work collapses to a short review",
      body: "Once the pieces you chose are running, mornings are approve / assign / move on — not archaeology across five apps. Rest of the day is showings and people.",
      bullets: ["~15 minutes when it’s humming", "Transparent queue", "Extra activity optional"],
    },
    {
      id: "team",
      eyebrow: "Team reality",
      title: "It can’t live in one person’s head",
      body: `If ${who} or a coordinator leaves, the next person shouldn’t inherit a mystery. Systems mean anyone can run and approve — and learn without tribal Slack history.`,
      bullets: ["Roles clear", "Steps visible", "Handoffs survive turnover"],
    },
    {
      id: "geo",
      eyebrow: "New search",
      title: `When AI picks a realtor in ${market}`,
      body: "Models recommend what they can find and trust. We help your pages be that — without keyword sludge.",
      bullets: ["Citable team pages", "Local proof", "Consistent Maps + site story"],
    },
  ];
}

function stackFor(company: ScrapedCompany, person?: ProspectPerson): string[] {
  const siteLabel = person?.websiteUrl
    ? (() => {
        try {
          return new URL(person.websiteUrl!).hostname.replace(/^www\./, "");
        } catch {
          return company.domain;
        }
      })()
    : company.domain;

  const base = [
    `${siteLabel} — Home Search / Contact / Valuation`,
    "Home Valuation lead form",
    "Team blog / market updates",
    "Google Maps / Business Profile",
    "Instagram (@thenancykennedyteam)",
    "LinkedIn",
    "Facebook",
    "WhatsApp",
    "Email / Gmail / Outlook (drafts + scheduled follow-ups)",
    "CRM (Follow Up Boss / kvCORE / HL stack)",
    "Zillow / Realtor.com / portal leads",
    "MLS / IDX listings",
    "SMS",
    "Phone / call notes",
    "Google Calendar",
    "Slack (optional ops channel)",
    "Local Mac/PC app or Claude / ChatGPT / Gemini",
  ];
  if (person?.brokerage) base.push(`${person.brokerage} brokerage tools`);
  if (company.phones.length) base.push("Missed-call text-back");
  return [...new Set(base)].slice(0, 16);
}

function workflowCharts(
  company: ScrapedCompany,
  person?: ProspectPerson,
): WorkflowChart[] {
  const who = person?.firstName || "you";
  return [
    {
      id: "unified-inbox-flow",
      title: "Everything inbound → one queue",
      subtitle: "WhatsApp · every form · Instagram · LinkedIn · Maps. AI processes. You approve.",
      nodes: [
        { id: "in", label: "Any channel", detail: "WA · forms · DM · Maps" },
        { id: "ai", label: "AI reads", detail: "Intent · score" },
        { id: "crm", label: "CRM update", detail: "Owner assigned" },
        { id: "draft", label: "Draft reply", detail: `Sounds like ${who}` },
        { id: "gmail", label: "Gmail drafts", detail: "Follow-ups queued" },
        { id: "ok", label: "Team approves", detail: "App / Slack / Claude" },
        { id: "book", label: "Schedule call", detail: "Calendar" },
        { id: "coach", label: "After call", detail: "Notes + tips" },
      ],
      edges: [
        { from: "in", to: "ai" },
        { from: "ai", to: "crm" },
        { from: "crm", to: "draft" },
        { from: "draft", to: "gmail" },
        { from: "gmail", to: "ok" },
        { from: "ok", to: "book" },
        { from: "book", to: "coach" },
      ],
    },
    {
      id: "delivery-flow",
      title: "How the team runs it",
      subtitle: "Local Mac/PC app for privacy — or Slack / Claude / ChatGPT / Gemini.",
      nodes: [
        { id: "sys", label: "Your systems", detail: "Owned workflows" },
        { id: "api", label: "APIs wired", detail: "Gmail · CRM · WA" },
        { id: "local", label: "Local app", detail: "Mac / PC download" },
        { id: "cli", label: "Or Slack / AI apps", detail: "Claude · GPT · Gemini" },
        { id: "team", label: "Anyone approves", detail: "Transparent" },
      ],
      edges: [
        { from: "sys", to: "api" },
        { from: "api", to: "local" },
        { from: "api", to: "cli" },
        { from: "local", to: "team" },
        { from: "cli", to: "team" },
      ],
    },
    {
      id: "enquiry-personalize-flow",
      title: "When someone fills the enquiry form",
      subtitle: "Answer what they asked. Then log it.",
      nodes: [
        { id: "form", label: "Form submitted", detail: "Their question" },
        { id: "read", label: "Read it", detail: "Town · beds · budget" },
        { id: "draft", label: "Draft reply", detail: `Sounds like ${who}` },
        { id: "crm", label: "CRM + score", detail: "Who owns it" },
        { id: "alert", label: "Ping the team", detail: "Text / Slack" },
        { id: "send", label: "Send", detail: "Or approve first" },
        { id: "next", label: "Offer next step", detail: "Shortlist / showing" },
      ],
      edges: [
        { from: "form", to: "read" },
        { from: "read", to: "draft" },
        { from: "draft", to: "crm" },
        { from: "crm", to: "alert" },
        { from: "alert", to: "send" },
        { from: "send", to: "next" },
      ],
    },
    {
      id: "listing-launch-flow",
      title: "Listing goes live → every channel",
      subtitle: "Blog, LinkedIn, Instagram, X — drafted once, approved once.",
      nodes: [
        { id: "live", label: "Listing live", detail: "MLS / site" },
        { id: "facts", label: "Pull facts", detail: "Price · beds · hook" },
        { id: "blog", label: "Blog draft", detail: "Team voice" },
        { id: "li", label: "LinkedIn", detail: "Post / carousel" },
        { id: "ig", label: "Instagram", detail: "Caption + slides" },
        { id: "x", label: "X / Twitter", detail: "Short / thread" },
        { id: "ok", label: `${who} approves`, detail: "Fair Housing check" },
        { id: "ship", label: "Publish", detail: "All channels" },
      ],
      edges: [
        { from: "live", to: "facts" },
        { from: "facts", to: "blog" },
        { from: "facts", to: "li" },
        { from: "facts", to: "ig" },
        { from: "facts", to: "x" },
        { from: "blog", to: "ok" },
        { from: "li", to: "ok" },
        { from: "ig", to: "ok" },
        { from: "x", to: "ok" },
        { from: "ok", to: "ship" },
      ],
    },
    {
      id: "social-dm-flow",
      title: "Instagram / LinkedIn / X DM",
      subtitle: "“Still available?” becomes a lead — not a forgotten badge.",
      nodes: [
        { id: "dm", label: "DM arrives", detail: "IG · LI · X" },
        { id: "read", label: "Read intent", detail: "Curious · hot · spam" },
        { id: "draft", label: "Draft reply", detail: `Sounds like ${who}` },
        { id: "crm", label: "CRM + score", detail: "Source tagged" },
        { id: "ping", label: "If hot", detail: `${who} gets pinged` },
        { id: "book", label: "Next step", detail: "Showing / call" },
      ],
      edges: [
        { from: "dm", to: "read" },
        { from: "read", to: "draft" },
        { from: "draft", to: "crm" },
        { from: "crm", to: "ping" },
        { from: "crm", to: "book" },
      ],
    },
    {
      id: "google-maps-flow",
      title: "Google Maps",
      subtitle: "Reviews and messages don’t wait for you to get back to the office.",
      nodes: [
        { id: "maps", label: "Maps activity", detail: "Review / Q&A / message" },
        { id: "classify", label: "Sort it", detail: "Nice · question · lead" },
        { id: "reply", label: "Draft reply", detail: "Sounds local" },
        { id: "route", label: "If it’s a lead", detail: "Into CRM" },
        { id: "escalate", label: "If it’s urgent", detail: `${who} gets it` },
        { id: "log", label: "Logged", detail: "Shows up tomorrow AM" },
      ],
      edges: [
        { from: "maps", to: "classify" },
        { from: "classify", to: "reply" },
        { from: "classify", to: "route" },
        { from: "route", to: "escalate" },
        { from: "reply", to: "log" },
        { from: "escalate", to: "log" },
      ],
    },
    {
      id: "lead-magnet-flow",
      title: "Home valuation request",
      subtitle: "From “what’s my home worth?” to a real follow-up.",
      nodes: [
        { id: "visitor", label: "They ask", detail: "Valuation form" },
        { id: "capture", label: "Captured", detail: "Name · address · email" },
        { id: "score", label: "Scored", detail: "Hot / warm / cold" },
        { id: "crm", label: "In CRM", detail: "Source tagged" },
        { id: "alert", label: "You get pinged", detail: "Same day" },
        { id: "nurture", label: "Follow-up", detail: "Listing conversation" },
      ],
      edges: [
        { from: "visitor", to: "capture" },
        { from: "capture", to: "score" },
        { from: "score", to: "crm" },
        { from: "crm", to: "alert" },
        { from: "crm", to: "nurture" },
      ],
    },
    {
      id: "listing-outreach-flow",
      title: "New listing goes live",
      subtitle: "Who already asked for something like this? Tell them.",
      nodes: [
        { id: "listing", label: "Listing live", detail: "MLS / site" },
        { id: "parse", label: "Read the listing", detail: "Price · beds · town" },
        { id: "scan", label: "Scan your list", detail: "Past inquiries" },
        { id: "match", label: "Best fits", detail: "Ranked" },
        { id: "draft", label: "Draft notes", detail: `In ${who}'s voice` },
        { id: "approve", label: "You approve", detail: "Or auto-rules" },
        { id: "send", label: "Send + log", detail: "CRM updated" },
      ],
      edges: [
        { from: "listing", to: "parse" },
        { from: "parse", to: "scan" },
        { from: "scan", to: "match" },
        { from: "match", to: "draft" },
        { from: "draft", to: "approve" },
        { from: "approve", to: "send" },
      ],
    },
    {
      id: "command-center-flow",
      title: "How it all connects",
      subtitle: "Leads in. Content out. Same loop.",
      nodes: [
        { id: "src", label: "Any source", detail: "Form · Maps · DM · portal" },
        { id: "qualify", label: "Answer + score", detail: "Specific reply" },
        { id: "crm2", label: "CRM", detail: "Right owner" },
        { id: "content", label: "If listing", detail: "Blog · LI · IG · X" },
        { id: "match2", label: "Homes", detail: "Shortlist" },
        { id: "show", label: "Showing", detail: "Reminders" },
        { id: "mgr", label: "Morning view", detail: `What ${who} should do` },
      ],
      edges: [
        { from: "src", to: "qualify" },
        { from: "qualify", to: "crm2" },
        { from: "crm2", to: "content" },
        { from: "crm2", to: "match2" },
        { from: "match2", to: "show" },
        { from: "show", to: "mgr" },
        { from: "content", to: "mgr" },
      ],
    },
  ];
}

function catalogBySlugs(
  slugs: string[],
  type: CatalogItem["type"],
): CatalogItem[] {
  const items: CatalogItem[] = [];
  for (const slug of slugs) {
    const e = getEntryBySlug(slug);
    if (!e) continue;
    items.push({
      name: e.name,
      slug: e.slug,
      summary: e.summary,
      type: (e.type as CatalogItem["type"]) || type,
    });
  }
  return items;
}

function openingMessage(company: ScrapedCompany, person?: ProspectPerson): string {
  const first = person?.firstName || "there";
  const team = person?.teamName || "your team";
  const market = person?.markets?.[0] || "your area";

  return `Hi ${first} —

${team} doesn’t have a demand problem. People already find you on ${company.domain}.

The pain is quieter: valuation requests that cool off, DMs that never hit CRM, listing launches that wait for “someone to write the posts,” and a day spent stitching apps together.

We’re LimeDock. We build owned workflows for that — not another CRM. On a 30-minute call we learn how your team actually works, pick the first leak to close, and take it from there.

Could start with valuation follow-up. Or one inbox for forms + WhatsApp + social. Or listing → content pack. Local Mac/PC app if you want privacy, or Slack / Claude / ChatGPT if that’s where people live.

When someone asks AI for the best realtor in ${market}, we also care that your name is what comes back.

This page is a sketch. After the call: what we’d build, timeline, pricing.

— LimeDock`;
}

function callPlanFor(person?: ProspectPerson): NonNullable<Presentation["callPlan"]> {
  const who = person?.firstName || "you";
  const team = person?.teamName || "your team";
  return {
    ctaLabel: "Book 30 minutes",
    nextAction: "Next step: 30 minutes",
    callGoal: `We walk through ${who === "you" ? "your" : `${who}'s`} real day on ${team} — where leads enter, where they stall, what you wish just worked. No deck marathon. Then we agree what to fix first.`,
    afterCall: [
      "A short build plan for that first pain (not a 40-item wishlist)",
      "How you’d run it — local app or Slack / Claude / ChatGPT",
      "Timeline and pricing for that scope",
      "You choose. You keep what we ship.",
    ],
  };
}

export function generatePresentation(
  company: ScrapedCompany,
  options: GenerateOptions = {},
): Presentation {
  const person = options.person;
  const id = newPresentationId();
  const now = new Date().toISOString();
  const modules = pickModules(company);

  const skills = catalogBySlugs(
    [
      "lead-magnets",
      "property-listing",
      "cold-email",
      "emails",
      "copywriting",
      "content-strategy",
      "social",
      "branded-carousel-generator",
      "comparative-market-analysis",
      "neighborhood-guide-creator",
      "monthly-market-update",
      "buyer-consultation-prep",
      "client-follow-up-scheduler",
      "anti-slop",
      "fair-housing-overlay",
    ],
    "skill",
  );

  const agents = catalogBySlugs(
    [
      "lead-qualifier-agent",
      "lead-research-assistant",
      "contract-terms-analyzer",
      "disclosure-review",
      "property-investment-analysis",
    ],
    "agent",
  );

  const systems = catalogBySlugs(
    [
      "real-estate-listing-lead-engine",
      "sales-outreach-system",
      "blogging-content-engine",
      "growth-experimentation-system",
      "seo-geo-system",
      "ops-internal-comms-system",
    ],
    "system",
  );

  const crmExtras = catalogBySlugs(
    ["follow-up-boss", "idx-broker", "connect-mls-to-claude"],
    "skill",
  );

  const plan = callPlanFor(person);

  return {
    id,
    createdAt: now,
    expiresAt: makeExpiry(),
    company,
    market: "usa",
    recipientName: person?.fullName || person?.firstName,
    headline: person
      ? `${person.firstName} — you don’t have a lead problem`
      : `${company.name} — you don’t have a lead problem`,
    subhead: person
      ? `The Nancy Kennedy Team already draws the hands. Valuations, DMs, and listing follow-through still depend on someone remembering. Here’s where it breaks — and what we’d build so it doesn’t.`
      : `Demand isn’t the issue. Follow-through is. Here’s where it breaks — and what we’d build.`,
    observations: observationsFor(company, person),
    opportunities: opportunitiesFor(company, person),
    advantages: advantages(person),
    pitchBeats: pitchBeatsFor(company, person),
    stackConnected: stackFor(company, person),
    modules,
    workflowSteps: [
      "Map where hands are raised — forms, WhatsApp, DMs, Maps",
      "Close the first leak (usually valuation or DMs)",
      "Drafts land in Gmail / CRM; humans approve",
      "Expand only when that slice is boringly reliable",
    ],
    workflowCharts: workflowCharts(company, person).slice(0, 4),
    skills: [...skills, ...crmExtras].slice(0, 8),
    agents: agents.slice(0, 4),
    systems: systems.slice(0, 4),
    morningBrief: {
      activeLeads: 162,
      hotLeads: 28,
      siteVisitsToday: 9,
      dealsLikelyClose: 5,
      pipelineLabel: "Example morning after the leaks are closed",
      attention: [
        { level: "red", text: "3 valuation asks with no human reply yet" },
        { level: "orange", text: "2 Instagram DMs asking about Croton inventory" },
        {
          level: "green",
          text: "Listing pack ready to approve for today’s new exclusive",
        },
      ],
      recommendedAction:
        "Clear the three valuations first — those are listing conversations already in progress.",
    },
    nextSteps: [
      plan.nextAction,
      plan.callGoal,
      ...plan.afterCall,
      "This link expires in 24 hours.",
    ],
    callPlan: plan,
    openingMessage: openingMessage(company, person),
  };
}
