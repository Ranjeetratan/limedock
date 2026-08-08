import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CursorBlob from "@/components/motion/CursorBlob";
import RealEstateLandingContent from "./RealEstateLandingContent";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Real Estate Workflow Automation & Systems | LimeDock";
const description =
  "Custom owned workflow automations for real estate brokerages and teams. Automate portal lead response, showing feedback, listing nurture, and agent coordination in Slack & CRM.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/real-estate-services",
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/real-estate-services"),
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
  url: absoluteUrl("/real-estate-services"),
  isPartOf: {
    "@type": "WebSite",
    name: "LimeDock",
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "Service",
    name: "Real Estate Workflow Automation",
    provider: {
      "@type": "Organization",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    description:
      "Owned workflow automations for real estate brokerages including portal lead routing, showing feedback loops, stage-aware listing nurture, and agent coordination digests.",
  },
  offers: {
    "@type": "Offer",
    name: "Book a Real Estate Workflow Call",
    url: BOOK_DEMO_URL,
  },
};

export default function RealEstateServicesPage() {
  return (
    <main className="min-h-screen bg-canvas text-body">
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <CursorBlob />
      <Navbar />
      <RealEstateLandingContent />
      <Footer />
    </main>
  );
}
