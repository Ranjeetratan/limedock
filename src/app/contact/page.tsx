import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | LimeDock",
  description: "Get in touch with the LimeDock team to discuss custom AI workflow automations for your business.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-canvas text-body">
      <Script
        id="limedock-form-protect"
        src="https://www.kingdomofkumar.com/protect.js"
        strategy="afterInteractive"
        data-site="4f8e75edc35ef3ad456989e9d70b90d5"
        data-action="https://www.limedock.com/contact"
      />
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  );
}
