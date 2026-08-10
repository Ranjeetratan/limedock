import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { BOOK_DEMO_URL, absoluteUrl } from "@/lib/site";

const title = "Works — Products We Ship and the Command Center We Run Them On";
const description =
  "The products LimeDock has built and operates — xLeadForge, Poised, Hireschema — plus the internal command center, browser extensions, and desktop tools we use to run them day to day.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/works" },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/works"),
    type: "website",
    siteName: "LimeDock",
  },
  twitter: { card: "summary_large_image", title, description },
};

type Product = {
  name: string;
  url: string;
  category: string;
  summary: string;
  detail: string;
  /** How we run this one internally — the part nobody else shows. */
  howWeRunIt: string;
  stack: string[];
  surface: string;
};

const PRODUCTS: Product[] = [
  {
    name: "xLeadForge",
    url: "https://www.xleadforge.com/",
    category: "Outbound & lead generation",
    summary:
      "Outbound lead generation and enrichment for revenue teams that need qualified prospects at scale.",
    detail:
      "xLeadForge finds, enriches, and scores prospects, then delivers them in batches a rep can actually work. The hard problem was never finding names — it was delivering a first useful batch fast enough that a new user does not churn during onboarding.",
    howWeRunIt:
      "Discovery runs on a schedule, but onboarding triggers an immediate first batch so a new account sees qualified leads in three to five minutes rather than waiting for the next cron window. Enrichment leans on our own local scrapers instead of per-lookup paid APIs, which is what keeps unit economics sane at volume.",
    stack: ["Next.js", "Supabase", "Scheduled discovery", "Local enrichment"],
    surface: "bg-signature-cream",
  },
  {
    name: "Poised",
    url: "https://poisedhq.com/",
    category: "Marketing & content",
    summary:
      "Generates five LinkedIn posts a week — with images and captions — in the founder's own voice.",
    detail:
      "Poised reads your profile and company positioning, then writes posts that sound like you rather than generic corporate filler. Drafts land in an approval calendar, so nothing publishes without a human saying yes. It supports native carousels, tracks performance, and learns from the edits you make.",
    howWeRunIt:
      "The approval calendar is the whole design philosophy: the automation does the work, a person keeps the judgement. Every edit a user makes is a training signal for the next batch, so voice accuracy improves without anyone writing a prompt.",
    stack: ["Voice modelling", "Approval calendar", "Carousel rendering", "Analytics loop"],
    surface: "bg-signature-mint",
  },
  {
    name: "Hireschema",
    url: "https://www.hireschema.com/",
    category: "Recruiting",
    summary:
      "An AI recruiting assistant built for candidates in India — CV matching, skill gaps, and approved outreach.",
    detail:
      "Hireschema reads a candidate's CV, matches it against live openings, and explains why each match is relevant instead of dumping a list. Candidates talk to it by text or voice to set role, location, and salary expectations. It also does free CV reviews and builds a personalised learning plan for the gaps it finds.",
    howWeRunIt:
      "Nothing sends without approval. Introduction emails go from the candidate's own Gmail only after they confirm, and every action the AI takes is logged and visible. A daily job bot keeps the openings index fresh so matches reflect what is actually hiring today.",
    stack: ["CV parsing", "Voice + text intake", "Gmail with approval gate", "Daily job bot"],
    surface: "bg-signature-peach",
  },
];

type InternalTool = {
  name: string;
  kind: string;
  what: string;
  why: string;
  stack: string[];
};

const COMMAND_CENTER: InternalTool[] = [
  {
    name: "Google Maps extractor",
    kind: "Chrome extension (MV3)",
    what: "Pulls business name and website out of Google Maps search results and exports a clean CSV.",
    why: "Local-market prospecting used to be an afternoon of copy-paste. This turns a search into a list in one click.",
    stack: ["Manifest V3", "DOM parser", "CSV export"],
  },
  {
    name: "LinkedIn business email extractor",
    kind: "Chrome extension (MV3)",
    what: "Reads name, title, and company from a profile, then generates and ranks likely business email permutations locally.",
    why: "No per-lookup enrichment API bill. The permutation logic runs on the machine, and saved leads export as CSV.",
    stack: ["Manifest V3", "Local permutation logic", "Lead store", "CSV export"],
  },
  {
    name: "LinkedIn auto messenger",
    kind: "Chrome extension (MV3)",
    what: "Sends personalised first messages to connections after they accept, on a schedule with idle detection.",
    why: "Follow-up is where outbound dies. This closes the gap between an accepted request and a first real conversation.",
    stack: ["Service worker", "Alarms + idle API", "Generative captions"],
  },
  {
    name: "Outreach manager",
    kind: "Native macOS app (SwiftUI)",
    what: "Universal CSV import with per-lead tagging, tag-based filtering, local persistence, and tagged CSV export.",
    why: "Lead lists arrive in a dozen shapes. Tagging makes them one workable pipeline without a CRM seat per person.",
    stack: ["SwiftUI", "Local persistence", "Tag filtering", "138 passing tests"],
  },
  {
    name: "Screen and time recorders",
    kind: "Native macOS (Swift)",
    what: "Screen capture and time tracking built in-house, tuned for recording product demos and measuring where hours go.",
    why: "Off-the-shelf recorders wanted a subscription for features we could ship in a weekend and own outright.",
    stack: ["Swift Package", "ScreenCaptureKit", "Local-first"],
  },
];

export default function WorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl("/works"),
    isPartOf: {
      "@type": "WebSite",
      name: "LimeDock",
      url: absoluteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      name: "LimeDock products",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: product.url,
        description: product.summary,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-canvas">
      <JsonLd data={jsonLd} />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12">
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg border border-hairline bg-gradient-to-br from-signature-cream via-canvas to-signature-yellow/35 min-h-[320px] p-8 md:p-12">
            <div className="absolute -right-20 top-0 h-full w-[40%] bg-signature-peach/35 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow">
                <span className="dot !bg-signature-coral" />
                Works
              </span>
              <h1 className="text-display-xl text-ink mt-7">
                We build the thing, then we run it.
              </h1>
              <p className="text-label-md text-body mt-5 max-w-xl leading-[1.45]">
                These are products LimeDock built and operates — not case
                studies from a portfolio. Below them is the part most studios
                keep quiet: the internal command center and the extensions we
                wrote because paying a subscription for each one stopped making
                sense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="pb-16">
        <div className="container-air">
          <div className="flex items-baseline gap-4">
            <span className="text-caption uppercase tracking-[0.12em] text-signature-coral">
              01
            </span>
            <h2 className="text-title-lg text-ink">Products we ship</h2>
          </div>

          <div className="mt-8 space-y-5">
            {PRODUCTS.map((product) => (
              <article
                key={product.name}
                className="overflow-hidden rounded-lg border border-hairline bg-canvas"
              >
                <div className="grid lg:grid-cols-[1fr_1.35fr]">
                  <div className={`${product.surface} p-7 md:p-9`}>
                    <span className="text-caption uppercase tracking-[0.08em] text-ink/70">
                      {product.category}
                    </span>
                    <h3 className="text-display-md text-ink mt-4">
                      {product.name}
                    </h3>
                    <p className="text-body-md text-ink/80 mt-3 leading-[1.55]">
                      {product.summary}
                    </p>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-body-md text-ink focus-ring rounded-sm group"
                    >
                      <span className="border-b border-ink/40 group-hover:border-ink transition-colors">
                        {product.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

                  <div className="p-7 md:p-9">
                    <p className="text-body-md text-body leading-[1.65]">
                      {product.detail}
                    </p>

                    <div className="mt-6 rounded-md border border-hairline bg-surface-soft p-5">
                      <h4 className="text-caption uppercase tracking-[0.1em] text-muted">
                        How we run it
                      </h4>
                      <p className="text-body-md text-body mt-2.5 leading-[1.6]">
                        {product.howWeRunIt}
                      </p>
                    </div>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {product.stack.map((item) => (
                        <li
                          key={item}
                          className="rounded-sm border border-hairline px-2.5 py-1 text-caption text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Command Center */}
      <section className="pb-16">
        <div className="container-air">
          <div className="flex items-baseline gap-4">
            <span className="text-caption uppercase tracking-[0.12em] text-signature-coral">
              02
            </span>
            <h2 className="text-title-lg text-ink">
              LimeDock Command Center
            </h2>
          </div>

          <div className="mt-8 rounded-lg bg-surface-dark-elevated text-on-dark p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-[45%] rainbow-stripes opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-elevated via-surface-dark-elevated/93 to-transparent" />
            <div className="relative z-10">
              <div className="max-w-2xl">
                <h3 className="text-display-md text-white">
                  The local control room everything else plugs into.
                </h3>
                <p className="text-body-md text-white/75 mt-4 leading-[1.6]">
                  Command Center is a Manifest V3 Chrome extension talking to a
                  Node sidecar over a REST and WebSocket bridge, running on the
                  machine rather than in someone else&rsquo;s cloud. The sidecar
                  holds a local website scraper built on Cheerio and Puppeteer
                  that pulls business details, contacts, and metadata without a
                  single paid enrichment API. The extension clips profiles,
                  posts, leads, and pages straight into it.
                </p>
                <p className="text-body-md text-white/75 mt-4 leading-[1.6]">
                  This is the same architecture we build for clients: your data
                  moves between systems you already control, the automations run
                  on infrastructure you own, and the only recurring cost is the
                  API keys you choose to use.
                </p>
              </div>

              {/* Architecture strip */}
              <div className="mt-9 grid gap-3 md:grid-cols-4">
                {[
                  {
                    step: "Capture",
                    body: "MV3 extension clips profiles, posts, and pages from LinkedIn, X, and anywhere else you work.",
                  },
                  {
                    step: "Bridge",
                    body: "REST and WebSocket endpoint on localhost receives every clip with a typed payload.",
                  },
                  {
                    step: "Enrich",
                    body: "Local scraper resolves emails, phone numbers, and social links — no per-lookup billing.",
                  },
                  {
                    step: "Act",
                    body: "Enriched records flow into the outreach manager, the product, or a digest you actually read.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.step}
                    className="rounded-md border border-white/15 bg-white/5 p-4"
                  >
                    <span className="text-caption text-white/50 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-title-sm text-white mt-1.5">
                      {item.step}
                    </h4>
                    <p className="text-body-md text-white/65 mt-2 leading-[1.45]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal tools */}
      <section className="pb-16">
        <div className="container-air">
          <div className="flex items-baseline gap-4">
            <span className="text-caption uppercase tracking-[0.12em] text-signature-coral">
              03
            </span>
            <h2 className="text-title-lg text-ink">
              The tools we wrote instead of subscribing
            </h2>
          </div>
          <p className="text-body-md text-body mt-4 max-w-2xl leading-[1.6]">
            Each of these replaced a recurring bill or an afternoon of manual
            work. They are internal, they are unglamorous, and together they are
            the reason a two-person motion can run like a bigger one.
          </p>

          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COMMAND_CENTER.map((tool) => (
              <li
                key={tool.name}
                className="flex h-full flex-col rounded-md border border-hairline bg-canvas p-5"
              >
                <span className="text-caption uppercase tracking-[0.08em] text-muted">
                  {tool.kind}
                </span>
                <h3 className="text-title-sm text-ink mt-2">{tool.name}</h3>
                <p className="text-body-md text-body mt-2.5 leading-[1.55]">
                  {tool.what}
                </p>
                <p className="text-body-md text-muted mt-3 leading-[1.5] flex-1">
                  {tool.why}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {tool.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm bg-signature-cream px-2 py-1 text-caption text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-air">
          <div className="rounded-lg border border-hairline bg-surface-soft p-8 md:p-12">
            <h2 className="text-display-md text-ink max-w-2xl">
              We build for clients exactly the way we build for ourselves.
            </h2>
            <p className="text-body-md text-body mt-4 max-w-xl leading-[1.6]">
              Same architecture, same ownership model. The code lands in your
              repository, the automations run in your cloud, and the only thing
              you keep paying for is your own API keys.
            </p>
            <a
              href={BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 inline-flex"
            >
              Book a workflow call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
