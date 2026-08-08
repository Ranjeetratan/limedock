"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPresentationPage() {
  const router = useRouter();
  const [url, setUrl] = useState("https://thenancykennedyteam.com/");
  const [contactName, setContactName] = useState("Nancy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/presentations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          contactName: contactName || undefined,
          preset: contactName || undefined,
        }),
      });
      const data = (await res.json()) as {
        path?: string;
        error?: string;
      };
      if (!res.ok || !data.path) {
        throw new Error(data.error || "Could not generate presentation");
      }
      router.push(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface-soft text-ink">
      <div className="mx-auto flex max-w-xl flex-col gap-8 px-6 py-16">
        <div>
          <p className="text-sm font-medium text-signature-coral">LimeDock · Internal</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            New Command Center presentation
          </h1>
          <p className="mt-3 text-body">
            Paste a company/team website and optional contact name for hyper-personalization.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-hairline bg-canvas p-6 shadow-sm"
        >
          <label className="text-sm font-medium text-muted" htmlFor="url">
            Company / team website
          </label>
          <input
            id="url"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="rounded-xl border border-border-strong bg-canvas px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-signature-coral"
          />
          <label className="text-sm font-medium text-muted" htmlFor="contact">
            Contact first name
          </label>
          <input
            id="contact"
            type="text"
            placeholder="Nancy"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="rounded-xl border border-border-strong bg-canvas px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-signature-coral"
          />
          <p className="text-xs text-muted">
            Houlihan Lawrence corporate site blocks bots — use the team site + “Nancy”.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-4 py-3 font-medium text-on-primary transition hover:bg-primary-active disabled:opacity-60"
          >
            {loading ? "Scraping site & generating…" : "Generate 24h presentation"}
          </button>
          {error ? <p className="text-sm text-signature-coral">{error}</p> : null}
        </form>
      </div>
    </main>
  );
}
