import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DirectoriesBrowser from "@/components/directories/DirectoriesBrowser";
import { countByType, getAllEntries } from "@/lib/directories";

export const metadata = {
  title: "Directories | LimeDock",
  description:
    "Browse Claude Skills and Agents separately — filtered by category and industry, with install guides, prompts, and use cases.",
};

export default function DirectoriesPage() {
  const entries = getAllEntries();
  const counts = countByType();

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-10">
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg border border-hairline bg-gradient-to-br from-signature-cream via-canvas to-signature-mint/40 min-h-[340px] p-8 md:p-12">
            <div className="absolute -right-16 top-0 h-full w-[42%] bg-signature-peach/35 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-signature-yellow/30 blur-2xl" />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow">
                <span className="dot !bg-signature-coral" />
                LimeDock Directories
              </span>
              <h1 className="text-display-xl text-ink mt-7">
                Skills and Agents, kept separate.
              </h1>
              <p className="text-label-md text-body mt-5 max-w-xl leading-[1.45]">
                Skills are reusable playbooks. Agents are multi-step workers.
                Filter by category and industry, then open any entry for install
                steps, prompts, and real use cases.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex min-h-10 items-center rounded-sm bg-signature-forest px-4 text-caption uppercase tracking-[0.08em] text-on-dark">
                  {counts.skill} Skills
                </span>
                <span className="inline-flex min-h-10 items-center rounded-sm bg-signature-coral px-4 text-caption uppercase tracking-[0.08em] text-on-dark">
                  {counts.agent} Agents
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-air pt-2 pb-24">
        <div className="container-air">
          <Suspense
            fallback={
              <div className="border border-hairline bg-surface-soft px-8 py-16 text-center text-body-md text-muted">
                Loading directories…
              </div>
            }
          >
            <DirectoriesBrowser entries={entries} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
