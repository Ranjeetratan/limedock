import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";
import LawFirmsLandingContent from "./LawFirmsLandingContent";

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
      <LawFirmsLandingContent />
    </>
  );
}
