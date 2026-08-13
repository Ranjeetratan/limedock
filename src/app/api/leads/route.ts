import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs/promises";
import path from "path";

// Define the shape of our Lead data
export type Lead = {
  id: string;
  createdAt: string;
  companyWebsite: string;
  areaOfPractice: string;
  firmSize: string;
  role: string;
  email: string;
};

// Check if we have KV credentials
const hasKV = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

// Local fallback file path (use /tmp for serverless environment compatibility)
const localFilePath = path.join("/tmp", ".leads-local.json");

/**
 * Retrieves all leads from the database or local file
 */
async function getLeads(): Promise<Lead[]> {
  if (hasKV) {
    const leads = await kv.get<Lead[]>("law_firm_leads");
    return leads || [];
  } else {
    try {
      const data = await fs.readFile(localFilePath, "utf8");
      return JSON.parse(data) as Lead[];
    } catch {
      return [];
    }
  }
}

/**
 * Saves a new lead to the database or local file
 */
async function saveLead(lead: Lead) {
  const currentLeads = await getLeads();
  const updatedLeads = [lead, ...currentLeads]; // Newest first

  if (hasKV) {
    await kv.set("law_firm_leads", updatedLeads);
  } else {
    await fs.writeFile(localFilePath, JSON.stringify(updatedLeads, null, 2), "utf8");
  }
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, data: leads, hasKV });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create new lead object with ID and timestamp
    const newLead: Lead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      companyWebsite: body["Company Website"] || "",
      areaOfPractice: body["Area of Practice"] || "",
      firmSize: body["Firm Size"] || "",
      role: body["Role"] || "",
      email: body["Email"] || "",
    };

    await saveLead(newLead);

    return NextResponse.json({ success: true, message: "Lead saved successfully" });
  } catch (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json({ success: false, error: "Failed to save lead" }, { status: 500 });
  }
}
