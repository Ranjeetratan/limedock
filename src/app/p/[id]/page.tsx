import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PresentationView } from "@/components/presentations/PresentationView";
import { BOOK_DEMO_URL } from "@/lib/site";
import {
  getPresentation,
  isExpired,
  type Presentation,
} from "@/lib/presentations/types";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await getPresentation(id);
  return {
    title: p ? `${p.company.name} · Command Center` : "Presentation",
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

function primaryColor(p: Presentation): string {
  return p.company.themeColor || p.company.brandColors[0] || "#aa2d00";
}

export default async function PresentationPage({ params }: Props) {
  const { id } = await params;
  const p = await getPresentation(id);
  if (!p) notFound();

  const expired = isExpired(p);
  const accent = primaryColor(p);
  const logo = p.company.logoUrl || p.company.faviconUrl || p.company.ogImageUrl;
  const expiresLocal = new Date(p.expiresAt).toLocaleString("en-US");

  if (expired) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-soft px-6">
        <div className="max-w-md rounded-2xl border border-hairline bg-canvas p-8 text-center">
          <p className="text-sm font-medium text-signature-coral">Link expired</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">
            This 24-hour presentation has ended
          </h1>
          <p className="mt-3 text-body">
            Ask your LimeDock contact for a fresh page — or{" "}
            <a className="text-link underline" href={BOOK_DEMO_URL}>
              book a workflow call
            </a>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <PresentationView
      presentation={p}
      accent={accent}
      logo={logo}
      expiresLocal={expiresLocal}
    />
  );
}
