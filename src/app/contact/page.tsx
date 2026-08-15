import type { Metadata } from "next";
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
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  );
}
