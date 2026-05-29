import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import Navbar from "@/components/Navbar";
import WhatWeDo from "@/components/WhatWeDo";
import ProblemsWeSolve from "@/components/ProblemsWeSolve";
import HowWeWork from "@/components/HowWeWork";
import FAQ from "@/components/FAQ";
import DesignedToScale from "@/components/DesignedToScale";
import Comparison from "@/components/Comparison";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import TrustStrip from "@/components/TrustStrip";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CursorBlob from "@/components/motion/CursorBlob";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-body">
      <ScrollProgress />
      <CursorBlob />
      <Navbar />
      <Hero />
      <TrustStrip />
      <ProjectShowcase />
      <WhatWeDo />
      <DesignedToScale />
      <ProblemsWeSolve />
      <HowWeWork />
      <Comparison />
      <FeaturedProducts />
      <FAQ />
      <Footer />
    </main>
  );
}
