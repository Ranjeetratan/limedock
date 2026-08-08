import type { Metadata } from "next";
import VerticalLanding from "@/components/VerticalLanding";
import JsonLd from "@/components/JsonLd";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Real Estate Workflow Automation";
const description =
  "LimeDock automates lead response, listing follow-up, agent coordination, and nurture sequences for real estate teams — live workflows in Slack and CRM you own.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/real-estate",
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/real-estate"),
    type: "website",
    siteName: "LimeDock",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: absoluteUrl("/real-estate"),
  isPartOf: {
    "@type": "WebSite",
    name: "LimeDock",
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "Service",
    name: "Real estate workflow automation",
    provider: {
      "@type": "Organization",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
  },
  offers: {
    "@type": "Offer",
    name: "Book a LimeDock demo",
    url: BOOK_DEMO_URL,
  },
};

export default function RealEstatePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <VerticalLanding
        eyebrow="For real estate teams"
        headline="Respond to leads, follow listings, and coordinate agents — without living in the CRM."
        support="LimeDock builds owned automations for brokerages and real estate teams — lead response, nurture, showing feedback, and agent coordination plugged into Slack and your CRM."
        heroAccent="cream-peach"
        painTitle="Speed-to-lead and follow-up still run on hustle."
        painSupport="Portals dump leads into a shared inbox. Listing updates stall between agents. Showing feedback lives in texts. Nurture sequences die when someone gets busy on a closing."
        pains={[
          "New leads sit while someone manually assigns, qualifies, and first-touches across portals and forms.",
          "Listing follow-up (price changes, open houses, stale inquiries) depends on whoever remembers to check the board.",
          "Agents coordinate showings, feedback, and handoffs in scattered Slack DMs and SMS threads.",
          "Buyer and seller nurture sequences stop the moment the market gets loud or a deal goes into contract.",
          "Managers can’t see response times, abandoned leads, or which agents close the loop — until the weekly scramble.",
        ]}
        helpTitle="Automations that live where agents already work."
        helpSupport="We wire durable workflows into Slack, CRM, and your listing tools. Your team owns the code — not another rented bot seat that forgets your process."
        helps={[
          {
            title: "Lead response that doesn’t wait",
            detail:
              "Route portal and site leads, fire first-touch templates, and alert the right agent in Slack with CRM context attached.",
          },
          {
            title: "Listing & nurture loops",
            detail:
              "Keep buyers and sellers moving with sequenced follow-ups tied to listing stage — not a generic drip that ignores reality.",
          },
          {
            title: "Showing feedback that closes the loop",
            detail:
              "Capture post-showing notes, push summaries to sellers or listing agents, and flag hot interest before it cools.",
          },
        ]}
        workflowsTitle="Workflows brokerages ship with us first."
        workflowsSupport="Pick the loop losing the most deals. We’ll get it live in your stack, then expand."
        workflows={[
          {
            title: "Portal lead → Slack + CRM first touch",
            detail:
              "Inbound lead creates or updates the contact, assigns an owner, and posts a ready-to-send first reply in Slack.",
          },
          {
            title: "Listing interest nurture",
            detail:
              "Stage-aware sequences for new inquiries, open-house visitors, and price-drop alerts without manual list wrangling.",
          },
          {
            title: "Showing feedback loop",
            detail:
              "After each showing, nudge the agent for structured feedback; summarize for the listing side and update CRM.",
          },
          {
            title: "Agent coordination digests",
            detail:
              "Daily or deal-stage digests of open leads, stalled listings, and unanswered follow-ups for team leads.",
          },
        ]}
        ctaTitle="Map one real-estate workflow on a short call."
        ctaSupport="Bring lead response, listing follow-up, or showing feedback. We’ll sketch the fastest path to a live automation your team owns."
        demoLocation="real-estate"
      />
    </>
  );
}
