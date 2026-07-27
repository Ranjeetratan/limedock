import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Shared shell for the two legal pages (Privacy, Terms). Keeps the
 * dark hero + prose body pattern consistent so the two feel like
 * siblings, not two separate documents.
 */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-canvas text-body">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-12">
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg bg-surface-dark-elevated text-on-dark min-h-[280px] p-8 md:p-12">
            <div className="absolute inset-y-0 right-0 w-[58%] rainbow-stripes opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-elevated via-surface-dark-elevated/90 to-transparent" />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow !text-white/75">
                <span className="dot !bg-white" />
                {eyebrow}
              </span>
              <h1 className="text-display-lg text-white mt-6">{title}</h1>
              <p className="text-label-md text-white/78 mt-4 max-w-xl leading-[1.45]">
                {intro}
              </p>
              <p className="text-caption text-white/60 mt-6 font-mono tracking-wide">
                Last updated · {updated}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-air">
          <article className="mx-auto max-w-3xl space-y-10 text-body-md text-body leading-[1.65]">
            {children}
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/** One numbered section in the legal body. */
export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={`s-${number}`} className="scroll-mt-32">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-caption text-muted font-mono tabular-nums">
          {number.padStart(2, "0")}
        </span>
        <h2 className="text-title-lg text-ink">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/** Bordered call-out for the "the SOW / MSA overrides this" note. */
export function LegalNote({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-md border border-hairline bg-surface-soft p-5 text-body-md text-body leading-[1.55]">
      {children}
    </aside>
  );
}
