import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/trending-agents/admin-auth";

/**
 * Looks up a GitHub repository and returns the fields the admin form needs to
 * prefill a catalog entry. Gated behind the admin session so this cannot be
 * used as an open GitHub proxy.
 */
export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const input = (searchParams.get("repo") ?? "").trim();

  if (!input) {
    return NextResponse.json(
      { error: "Pass a repo as owner/name or a github.com URL." },
      { status: 400 }
    );
  }

  // Accept either "owner/name" or a full github.com URL.
  const match = input.match(
    /^(?:https?:\/\/(?:www\.)?github\.com\/)?([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/
  );
  if (!match) {
    return NextResponse.json(
      { error: "Could not parse that as a repository." },
      { status: 400 }
    );
  }

  const [, owner, name] = match;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "limedock-trending-agents",
  };
  // Optional — lifts the rate limit from 60/hr to 5000/hr when present.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${name}`,
      { headers, next: { revalidate: 0 } }
    );

    if (response.status === 404) {
      return NextResponse.json(
        { error: `${owner}/${name} was not found on GitHub.` },
        { status: 404 }
      );
    }
    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub returned ${response.status}.` },
        { status: 502 }
      );
    }

    const repo = await response.json();

    return NextResponse.json({
      slug: String(repo.name).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: repo.name,
      repo: repo.full_name,
      owner: repo.owner?.login ?? owner,
      url: repo.html_url,
      homepage: repo.homepage || null,
      tagline: repo.description ?? "",
      topics: repo.topics ?? [],
      stats: {
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        openIssues: repo.open_issues_count ?? 0,
        language: repo.language ?? null,
        license: repo.license?.spdx_id ?? null,
        createdAt: (repo.created_at ?? "").slice(0, 10),
        pushedAt: (repo.pushed_at ?? "").slice(0, 10),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach GitHub." },
      { status: 502 }
    );
  }
}
