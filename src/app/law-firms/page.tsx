import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CursorBlob from "@/components/motion/CursorBlob";
import LawFirmsLandingContent from "./LawFirmsLandingContent";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Law Firm Workflow Automation & AI Systems | LimeDock";
const description =
  "Custom owned workflow automations and AI infrastructure for law firms. Automate intake, client updates, matter follow-ups, and referral tracking in Slack & CRM.";

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
    name: "Law Firm Workflow Automation",
    provider: {
      "@type": "Organization",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    description:
      "Owned workflow automations for law firms including intake processing, client updates, matter follow-ups, and referral tracking.",
  },
  offers: {
    "@type": "Offer",
    name: "Book a Law Firm Workflow Call",
    url: BOOK_DEMO_URL,
  },
};

export default function LawFirmsPage() {
  return (
    <main className="min-h-screen bg-canvas text-body">
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <CursorBlob />
      <Navbar />
      <LawFirmsLandingContent />
      <Footer />
    </main>
  );
}

