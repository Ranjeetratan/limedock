import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";
import {
  ADMIN_COOKIE,
  expectedToken,
  isAdminConfigured,
  isAuthenticated,
  verifyPassword,
} from "@/lib/trending-agents/admin-auth";
import { getAllAgents } from "@/lib/trending-agents";

export const metadata: Metadata = {
  title: "Trending Agents Admin",
  // Never let this surface in search results.
  robots: { index: false, follow: false, nocache: true },
};

// Session state lives in a cookie, so this page can't be statically rendered.
export const dynamic = "force-dynamic";

async function login(formData: FormData) {
  "use server";

  const submitted = String(formData.get("password") ?? "");
  if (!verifyPassword(submitted)) {
    redirect("/admin/trending-agents?error=1");
  }

  const token = expectedToken();
  if (!token) redirect("/admin/trending-agents?error=1");

  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin/trending-agents");
}

async function logout() {
  "use server";
  const store = await cookies();
  store.delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/trending-agents");
}

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function TrendingAgentsAdminPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const configured = isAdminConfigured();
  const authed = configured && (await isAuthenticated());

  if (!configured) {
    return (
      <Shell>
        <h1 className="text-display-md text-ink">Admin is not configured</h1>
        <p className="text-body-md text-body mt-4 leading-[1.6]">
          Set an <code className="font-mono text-ink">ADMIN_PASSWORD</code>{" "}
          environment variable (and optionally{" "}
          <code className="font-mono text-ink">ADMIN_SESSION_SECRET</code> and{" "}
          <code className="font-mono text-ink">GITHUB_TOKEN</code>) in your
          Vercel project settings, then redeploy. Until then this page stays
          locked.
        </p>
      </Shell>
    );
  }

  if (!authed) {
    return (
      <Shell>
        <h1 className="text-display-md text-ink">Trending Agents admin</h1>
        <p className="text-body-md text-body mt-3">
          Enter the admin password to continue.
        </p>
        <form action={login} className="mt-8 flex flex-col gap-3 max-w-sm">
          <label htmlFor="password" className="sr-only">
            Admin password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="min-h-12 rounded-sm border border-hairline bg-canvas px-4 text-body-md text-ink focus-ring"
            placeholder="Password"
          />
          <button type="submit" className="btn-primary justify-center">
            Sign in
          </button>
          {params.error && (
            <p className="text-body-md text-signature-coral">
              That password did not match.
            </p>
          )}
        </form>
      </Shell>
    );
  }

  return (
    <Shell wide>
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-display-md text-ink">Trending Agents admin</h1>
          <p className="text-body-md text-body mt-2">
            {getAllAgents().length} repos in the catalog.
          </p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="min-h-10 rounded-sm border border-hairline px-4 text-body-md text-ink focus-ring"
          >
            Sign out
          </button>
        </form>
      </div>

      <AdminClient existingSlugs={getAllAgents().map((a) => a.slug)} />
    </Shell>
  );
}

function Shell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <main className="min-h-screen bg-canvas py-16 md:py-24">
      <div
        className={`mx-auto px-6 ${wide ? "max-w-[1100px]" : "max-w-2xl"}`}
      >
        {children}
      </div>
    </main>
  );
}
