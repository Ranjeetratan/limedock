"use client";

import type { DirectoryEntry } from "@/lib/directories";
import BookDemoLink from "./BookDemoLink";

type Props = {
  entry: DirectoryEntry;
};

function headlineFor(entry: DirectoryEntry): string {
  if (entry.type === "system") {
    return "Want this system live in your SaaS stack?";
  }
  return "Using this skill? LimeDock can wire it into a durable automation you own.";
}

function bodyFor(entry: DirectoryEntry): string {
  if (entry.type === "system") {
    const stackHint =
      entry.skillSlugs && entry.skillSlugs.length > 0
        ? " We'll implement this system's stack for your team."
        : " LimeDock implements owned workflows across Slack, CRM, and your internal tools.";
    return `Bring this architecture (or any stack you found here) and we'll ship the automation your team actually runs.${stackHint}`;
  }

  if (entry.type === "agent") {
    return "Agents are a starting point. LimeDock turns the workflow into production automation your SaaS team owns — not another prompt library.";
  }

  return "Skills show what's possible. LimeDock builds and runs the owned marketing, sales, and ops automations around them.";
}

function ctaLabelFor(entry: DirectoryEntry): string {
  if (entry.type === "system" && entry.skillSlugs && entry.skillSlugs.length > 0) {
    return "Implement this system's stack";
  }
  return "Book a workflow call";
}

export default function DirectoryDetailConversion({ entry }: Props) {
  return (
    <section
      className="relative overflow-hidden rounded-md border border-hairline bg-gradient-to-br from-signature-cream via-canvas to-signature-mint/35 px-6 py-8 md:px-8 md:py-10"
      aria-label="Work with LimeDock"
    >
      <div
        className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-signature-coral/20 blur-2xl"
        aria-hidden
      />
      <div className="relative z-10 max-w-2xl">
        <p className="text-caption uppercase tracking-[0.1em] text-signature-coral">
          Work with LimeDock
        </p>
        <h2 className="text-title-md text-ink mt-3">{headlineFor(entry)}</h2>
        <p className="text-body-md text-body mt-3 leading-[1.6]">
          {bodyFor(entry)}
        </p>
        <p className="text-body-md text-muted mt-3 leading-[1.55]">
          We sell owned automations for SaaS teams — live workflows that plug
          into Slack, CRM, and your internal platform — not just a skill list.
        </p>
        <div className="mt-6">
          <BookDemoLink
            location={`directories_detail_${entry.type}`}
            label={ctaLabelFor(entry)}
          />
        </div>
      </div>
    </section>
  );
}
