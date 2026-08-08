import type { Metadata } from "next";
import VerticalLanding from "@/components/VerticalLanding";
import JsonLd from "@/components/JsonLd";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Law Firm Workflow Automation";
const description =
  "LimeDock automates intake, client updates, matter follow-ups, and referral tracking for law firms — live workflows in Slack and your CRM that partners and associates own.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/law-firms",
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/law-firms"),
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
  url: absoluteUrl("/law-firms"),
  isPartOf: {
    "@type": "WebSite",
    name: "LimeDock",
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "Service",
    name: "Law firm workflow automation",
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

export default function LawFirmsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <VerticalLanding
        eyebrow="For law firms"
        headline="Automate intake, client updates, and matter follow-ups — without another admin hire."
        support="LimeDock builds owned automations for law firm marketing, BD, and practice ops — wired into Slack, your CRM, and the tools partners and associates already live in."
        heroAccent="cream-mint"
        painTitle="Partners and associates are buried in manual admin."
        painSupport="Intake forms stall in inboxes. Client updates depend on whoever remembers. Referrals get lost between email threads. Marketing and BD still run on spreadsheets."
        pains={[
          "New-matter intake arrives as emails, PDFs, and voicemails — someone has to chase completeness by hand.",
          "Clients ask for status; associates dig through matters, calendars, and Slack before anyone replies.",
          "Follow-ups on open matters and outstanding documents slip until a deadline or a frustrated client forces them.",
          "Referral sources and BD touchpoints live in personal inboxes — the firm never sees the pipeline.",
          "Marketing and practice ops juggle CRM hygiene, event lists, and newsletter ops as side work.",
        ]}
        helpTitle="Live workflows your firm owns — in Slack and CRM."
        helpSupport="We map the handoffs your intake, BD, and practice teams run every week, then ship durable automations on your stack. You keep the code, prompts, and data."
        helps={[
          {
            title: "Intake that completes itself",
            detail:
              "Route new inquiries, chase missing fields, and open the matter in CRM with a Slack thread the right people already see.",
          },
          {
            title: "Client updates without the scavenger hunt",
            detail:
              "Pull matter status, next dates, and open asks into a digest or Slack nudge so associates answer in minutes, not hours.",
          },
          {
            title: "Referral & BD visibility",
            detail:
              "Log referrals, nudge thank-yous and follow-ups, and keep partners’ pipelines visible without another weekly spreadsheet.",
          },
        ]}
        workflowsTitle="Workflows firms ask us to ship first."
        workflowsSupport="Start with one high-friction loop. Expand once partners feel the time back."
        workflows={[
          {
            title: "Intake → CRM matter + Slack channel",
            detail:
              "Web form or email inquiry becomes a structured matter record, missing-field chase, and a dedicated Slack thread for the team.",
          },
          {
            title: "Matter follow-up sequences",
            detail:
              "Outstanding docs, conflict checks, and engagement-letter reminders fire on schedule with clear owners in Slack.",
          },
          {
            title: "Client status digests",
            detail:
              "Weekly or on-demand summaries from CRM/calendar so client updates don’t require a full matter archaeology session.",
          },
          {
            title: "Referral tracking loop",
            detail:
              "Capture source, thank the referrer, schedule BD follow-up, and report which relationships actually convert.",
          },
        ]}
        ctaTitle="Map one law-firm workflow on a short call."
        ctaSupport="Bring intake, client updates, or referral tracking. We’ll sketch the fastest path to a live automation your firm owns."
        demoLocation="law-firms"
      />
    </>
  );
}
