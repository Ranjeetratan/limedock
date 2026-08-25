import { notFound } from "next/navigation";
import { loadPreview } from "@/lib/previewStore";
import { Hero } from "../_components/Hero";
import { Standing } from "../_components/Standing";
import { Findings, Automations } from "../_components/Findings";
import { Showcase, PresenceSection, Impact, Plan, Close } from "../_components/Rest";
import { Statement } from "../_components/Kinetic";

/** Previews are per-lead and short-lived, so nothing is cached at build time. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await loadPreview(slug);
  if (!payload) return { title: "Preview unavailable" };

  return {
    title: `${payload.firm} — LimeDock review`,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await loadPreview(slug);
  if (!payload) notFound();

  return (
    <main>
      <Hero payload={payload} />
      <Standing payload={payload} />
      <Showcase payload={payload} />
      <PresenceSection payload={payload} />
      {/* Rhythm breaks: a single held thought between dense stretches. */}
      <Statement
        eyebrow="The pattern"
        accent="violet"
        text="Attention was never the problem. What happens after someone gets in touch is."
      />
      <Findings payload={payload} />
      <Statement
        eyebrow="What changes"
        accent="orange"
        text="Every one of those jobs can run itself, inside the tools you already use."
      />
      <Automations payload={payload} />
      <Impact payload={payload} />
      <Plan payload={payload} />
      <Close payload={payload} />
    </main>
  );
}
