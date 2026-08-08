import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DirectoriesBrowser from "@/components/directories/DirectoriesBrowser";
import DirectoriesMobileCtaBar from "@/components/directories/DirectoriesMobileCtaBar";
import { countByType, getAllEntries, type EntryType } from "@/lib/directories";

export const metadata = {
  title: "Directories | LimeDock",
  description:
    "Browse Claude Skills, Agents, and Systems as inspiration — then book LimeDock to build owned marketing, sales, and ops automations for your SaaS team.",
};

type PageProps = {
  searchParams: Promise<{ type?: string }>;
};

function parseType(value?: string): EntryType | "all" {
  if (value === "skill" || value === "agent" || value === "system") return value;
  return "all";
}

export default async function DirectoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const entries = getAllEntries();
  const counts = countByType();
  const initialType = parseType(params.type);

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
                Skills, Agents, and Systems.
              </h1>
              <p className="text-label-md text-body mt-5 max-w-xl leading-[1.45]">
                A catalog of skills and systems to steal ideas from — and a
                path to owned automation. LimeDock designs and ships the
                marketing, sales, and ops workflows your SaaS team still runs
                by hand, plugged into Slack, CRM, and your stack.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex min-h-10 items-center rounded-sm bg-signature-forest px-4 text-caption uppercase tracking-[0.08em] text-on-dark">
                  {counts.skill} Skills
                </span>
                <span className="inline-flex min-h-10 items-center rounded-sm bg-signature-coral px-4 text-caption uppercase tracking-[0.08em] text-on-dark">
                  {counts.agent} Agents
                </span>
                <span className="inline-flex min-h-10 items-center rounded-sm bg-signature-mustard px-4 text-caption uppercase tracking-[0.08em] text-ink">
                  {counts.system} Systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-air pt-2 pb-24">
        <div className="container-air">
          <DirectoriesBrowser entries={entries} initialType={initialType} />
        </div>
      </section>

      <Footer />
      <DirectoriesMobileCtaBar />
    </main>
  );
}
