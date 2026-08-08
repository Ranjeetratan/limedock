import { NextResponse } from "next/server";
import { generatePresentation } from "@/lib/presentations/generate";
import {
  NANCY_KENNEDY_HL,
  mergeCompanyForProspect,
  type ProspectPerson,
} from "@/lib/presentations/prospects";
import { scrapeCompany } from "@/lib/presentations/scrape";
import { savePresentation } from "@/lib/presentations/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const PRESETS: Record<string, ProspectPerson> = {
  nancy: NANCY_KENNEDY_HL,
  "nancy-kennedy": NANCY_KENNEDY_HL,
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      url?: string;
      contactName?: string;
      preset?: string;
      secondaryUrls?: string[];
    };
    const url = body.url?.trim();
    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }
    try {
      const withProto = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      // eslint-disable-next-line no-new
      new URL(withProto);
    } catch {
      return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }

    const presetKey = (body.preset || body.contactName || "")
      .toLowerCase()
      .replace(/\s+/g, "-");
    let person =
      PRESETS[presetKey] ||
      PRESETS[presetKey.split("-")[0]] ||
      undefined;

    // Soft match Nancy / team site / Houlihan Lawrence
    if (!person && /nancy/i.test(body.contactName || body.preset || "")) {
      person = NANCY_KENNEDY_HL;
    }
    if (!person && /thenancykennedyteam\.com/i.test(url)) {
      person = NANCY_KENNEDY_HL;
    }
    if (
      !person &&
      /houlihanlawrence\.com/i.test(url) &&
      /nancy/i.test(body.contactName || "")
    ) {
      person = NANCY_KENNEDY_HL;
    }

    // Nancy: always scrape + feature thenancykennedyteam.com (her real site).
    const isNancy = person === NANCY_KENNEDY_HL;
    const scrapeUrl = isNancy
      ? "https://thenancykennedyteam.com/"
      : url;
    const secondaryUrls = body.secondaryUrls?.length
      ? body.secondaryUrls
      : [];

    const [primary, ...secondary] = await Promise.all([
      scrapeCompany(scrapeUrl),
      ...secondaryUrls
        .filter((u) => u.replace(/\/$/, "") !== scrapeUrl.replace(/\/$/, ""))
        .slice(0, 2)
        .map((u) => scrapeCompany(u).catch(() => null)),
    ]);

    const secondaryOk = secondary.filter(Boolean) as Awaited<
      ReturnType<typeof scrapeCompany>
    >[];

    const company = mergeCompanyForProspect(primary, person, secondaryOk);
    // Always feature the prospect's stated website when provided
    if (person?.websiteUrl) {
      company.url = person.websiteUrl;
      try {
        company.domain = new URL(person.websiteUrl).hostname;
      } catch {
        /* keep */
      }
    }
    if (person?.logoUrl) {
      company.logoUrl = person.logoUrl;
    }
    if (person?.heroImageUrl) {
      company.heroImageUrl = person.heroImageUrl;
    }
    if (person?.portraitUrl) {
      company.portraitUrl = person.portraitUrl;
    }
    // Ensure phone from team site
    if (!company.phones.length) {
      const withPhone = secondaryOk.find((s) => s.phones.length);
      if (withPhone) company.phones = withPhone.phones;
    }

    const presentation = generatePresentation(company, { person, secondary: secondaryOk });
    await savePresentation(presentation);

    return NextResponse.json({
      id: presentation.id,
      path: `/p/${presentation.id}`,
      expiresAt: presentation.expiresAt,
      company: {
        name: company.name,
        domain: company.domain,
        logoUrl: company.logoUrl,
      },
      person: person
        ? { firstName: person.firstName, teamName: person.teamName, brokerage: person.brokerage }
        : null,
    });
  } catch (err) {
    console.error("[presentations]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create presentation" },
      { status: 500 },
    );
  }
}
