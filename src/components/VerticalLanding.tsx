import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BOOK_DEMO_URL } from "@/lib/site";

export type VerticalWorkflow = {
  title: string;
  detail: string;
};

export type VerticalLandingProps = {
  eyebrow: string;
  headline: string;
  support: string;
  heroAccent: "cream-mint" | "cream-peach";
  painTitle: string;
  painSupport: string;
  pains: string[];
  helpTitle: string;
  helpSupport: string;
  helps: { title: string; detail: string }[];
  workflowsTitle: string;
  workflowsSupport: string;
  workflows: VerticalWorkflow[];
  ctaTitle: string;
  ctaSupport: string;
  demoLocation: string;
};

const heroAccentClass: Record<VerticalLandingProps["heroAccent"], string> = {
  "cream-mint":
    "from-signature-cream via-canvas to-signature-mint/45",
  "cream-peach":
    "from-signature-cream via-canvas to-signature-peach/40",
};

export default function VerticalLanding({
  eyebrow,
  headline,
  support,
  heroAccent,
  painTitle,
  painSupport,
  pains,
  helpTitle,
  helpSupport,
  helps,
  workflowsTitle,
  workflowsSupport,
  workflows,
  ctaTitle,
  ctaSupport,
  demoLocation,
}: VerticalLandingProps) {
  return (
    <main className="min-h-screen bg-canvas text-body">
      <Navbar />

      {/* Hero — one composition, brand-first */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              heroAccent === "cream-mint"
                ? "radial-gradient(55% 55% at 78% 8%, rgba(168,216,196,0.38), transparent 62%), radial-gradient(45% 50% at 12% 18%, rgba(245,233,212,0.55), transparent 65%)"
                : "radial-gradient(55% 55% at 78% 8%, rgba(252,171,121,0.32), transparent 62%), radial-gradient(45% 50% at 12% 18%, rgba(245,233,212,0.55), transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(24,29,38,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,29,38,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 50% 0%, black 28%, transparent 74%)",
          }}
        />

        <div className="container-air relative">
          <div
            className={`relative overflow-hidden rounded-lg border border-hairline bg-gradient-to-br ${heroAccentClass[heroAccent]} p-8 md:p-12 lg:p-14`}
          >
            <div
              className={`absolute -right-20 top-0 h-full w-[40%] blur-3xl ${
                heroAccent === "cream-mint"
                  ? "bg-signature-mint/40"
                  : "bg-signature-peach/40"
              }`}
              aria-hidden
            />
            <div
              className="absolute bottom-0 left-1/4 h-36 w-36 rounded-full bg-signature-yellow/25 blur-2xl"
              aria-hidden
            />

            <div className="relative z-10 max-w-2xl">
              <p className="text-caption text-ink tracking-[0.04em]">
                LimeDock
              </p>
              <span className="eyebrow mt-4">
                <span className="dot !bg-signature-coral" />
                {eyebrow}
              </span>
              <h1 className="text-display-xl text-ink mt-6">{headline}</h1>
              <p className="text-label-md text-body mt-5 max-w-xl leading-[1.5]">
                {support}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={BOOK_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group"
                  data-demo-location={demoLocation}
                >
                  Book demo
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <Link
                  href="/"
                  className="text-body-md text-muted hover:text-ink transition-colors focus-ring rounded-sm"
                >
                  See how LimeDock works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="section-air pt-4 md:pt-8">
        <div className="container-air">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div>
              <span className="eyebrow">
                <span className="dot !bg-signature-coral" />
                The weekly drag
              </span>
              <h2 className="text-display-md text-ink mt-6">{painTitle}</h2>
              <p className="text-body-md text-body mt-4 max-w-md leading-[1.55]">
                {painSupport}
              </p>
            </div>
            <ol className="space-y-0 border-t border-hairline">
              {pains.map((pain, index) => (
                <li
                  key={pain}
                  className="flex gap-5 border-b border-hairline py-5"
                >
                  <span className="text-caption text-muted font-mono tabular-nums shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-title-sm text-ink leading-[1.4]">
                    {pain}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* How LimeDock helps */}
      <section className="section-air bg-surface-soft">
        <div className="container-air">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="dot !bg-signature-forest" />
              How LimeDock helps
            </span>
            <h2 className="text-display-md text-ink mt-6">{helpTitle}</h2>
            <p className="text-body-md text-body mt-4 leading-[1.55]">
              {helpSupport}
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-px bg-hairline rounded-lg overflow-hidden border border-hairline">
            {helps.map((item, index) => (
              <div
                key={item.title}
                className={`bg-canvas p-6 md:p-8 ${
                  index === 0
                    ? "bg-signature-cream/70"
                    : index === 1
                      ? "bg-signature-mint/35"
                      : "bg-canvas"
                }`}
              >
                <span className="text-caption text-muted font-mono tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-title-sm text-ink mt-4">{item.title}</h3>
                <p className="text-body-md text-body mt-3 leading-[1.55]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example workflows */}
      <section className="section-air">
        <div className="container-air">
          <div className="signature-card bg-signature-forest text-on-dark overflow-hidden">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14">
              <div>
                <span className="eyebrow !text-white/80">
                  <span className="dot !bg-white" />
                  Example workflows
                </span>
                <h2 className="text-display-md text-white mt-6">
                  {workflowsTitle}
                </h2>
                <p className="text-body-md text-white/78 mt-4 leading-[1.55] max-w-md">
                  {workflowsSupport}
                </p>
                <a
                  href={BOOK_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-on-dark mt-8 !inline-flex"
                  data-demo-location={`${demoLocation}-workflows`}
                >
                  Book a workflow call
                </a>
              </div>
              <ul className="space-y-3">
                {workflows.map((wf, index) => (
                  <li
                    key={wf.title}
                    className={`rounded-md p-5 text-ink ${
                      index % 3 === 0
                        ? "bg-signature-cream"
                        : index % 3 === 1
                          ? "bg-signature-mint"
                          : "bg-signature-peach/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-title-sm max-w-[28ch]">{wf.title}</h3>
                      <span className="text-caption text-muted shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-body-md text-body mt-3 leading-[1.55]">
                      {wf.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA strip before footer band */}
      <section className="pb-8 md:pb-4">
        <div className="container-air">
          <div className="rounded-lg border border-hairline bg-gradient-to-r from-signature-cream via-canvas to-signature-mint/30 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 justify-between">
            <div className="max-w-xl">
              <h2 className="text-display-md text-ink">{ctaTitle}</h2>
              <p className="text-body-md text-body mt-3 leading-[1.55]">
                {ctaSupport}
              </p>
            </div>
            <a
              href={BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group shrink-0"
              data-demo-location={`${demoLocation}-footer-strip`}
            >
              Book demo
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
