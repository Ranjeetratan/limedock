import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DirectoriesBrowser from "@/components/directories/DirectoriesBrowser";
import { getAllEntries } from "@/lib/directories";

export const metadata = {
  title: "Directories | LimeDock",
  description:
    "Browse Claude skills and agents by type, category, and industry — with install guides, how-to, and use cases.",
};

export default function DirectoriesPage() {
  const entries = getAllEntries();

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-12">
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg bg-surface-dark-elevated text-on-dark min-h-[320px] p-8 md:p-12">
            <div className="absolute inset-y-0 right-0 w-[58%] rainbow-stripes opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-elevated via-surface-dark-elevated/88 to-transparent" />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow !text-white/75">
                <span className="dot !bg-white" />
                Catalog
              </span>
              <h1 className="text-display-xl text-white mt-7">Directories</h1>
              <p className="text-label-md text-white/78 mt-5 max-w-lg leading-[1.45]">
                Skills and agents, sorted by category and industry — with links,
                install steps, and real use cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-air pt-4 pb-24">
        <div className="container-air">
          <DirectoriesBrowser entries={entries} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
