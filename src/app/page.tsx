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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
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
