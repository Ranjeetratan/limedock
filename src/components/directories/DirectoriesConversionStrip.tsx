"use client";

import BookDemoLink from "./BookDemoLink";

/**
 * Soft-sell strip between filters and catalog results.
 * One headline, one sentence, primary CTA — not a card grid.
 */
export default function DirectoriesConversionStrip() {
  return (
    <aside
      className="relative overflow-hidden rounded-md border border-hairline bg-gradient-to-r from-signature-cream via-canvas to-signature-mint/30 px-6 py-7 md:px-8 md:py-8"
      aria-label="LimeDock conversion"
    >
      <div
        className="pointer-events-none absolute -right-10 top-0 h-full w-1/3 bg-signature-coral/15 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-caption uppercase tracking-[0.1em] text-signature-coral">
            What LimeDock sells
          </p>
          <h2 className="text-title-md text-ink mt-2">
            From catalog inspiration to owned automation.
          </h2>
          <p className="text-body-md text-body mt-2 leading-[1.55]">
            Browse skills, agents, and GitHub resources here — then book a call
            and we&apos;ll implement durable marketing, sales, and ops workflows
            in your Slack, CRM, and stack. You own the code.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <BookDemoLink location="directories_listing_strip" />
        </div>
      </div>
    </aside>
  );
}
