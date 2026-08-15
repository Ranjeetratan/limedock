import { NextResponse } from "next/server";
import { createClient } from "@vercel/kv";
import fs from "fs/promises";
import path from "path";

// Define the shape of our Contact data
export type ContactMessage = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Check for either Vercel KV or Upstash Redis credentials
const kvUrl = process.env.LAWFIRMSLEADS_KV_REST_API_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.LAWFIRMSLEADS_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const hasKV = !!kvUrl && !!kvToken;

// Create the KV client manually so we can support Upstash
const kv = hasKV ? createClient({ url: kvUrl as string, token: kvToken as string }) : null;

// Local fallback file path (use /tmp for serverless environment compatibility)
const localFilePath = path.join("/tmp", ".contacts-local.json");

/**
 * Retrieves all contact messages from the database or local file
 */
async function getContacts(): Promise<ContactMessage[]> {
  if (hasKV && kv) {
    const contacts = await kv.get<ContactMessage[]>("contact_submissions");
    return contacts || [];
  } else {
    try {
      const data = await fs.readFile(localFilePath, "utf8");
      return JSON.parse(data) as ContactMessage[];
    } catch {
      return [];
    }
  }
}

/**
 * Saves a new contact message to the database or local file
 */
async function saveContact(contact: ContactMessage) {
  const currentContacts = await getContacts();
  const updatedContacts = [contact, ...currentContacts]; // Newest first

  if (hasKV && kv) {
    await kv.set("contact_submissions", updatedContacts);
  } else {
    await fs.writeFile(localFilePath, JSON.stringify(updatedContacts, null, 2), "utf8");
  }
}

export async function GET() {
  try {
    const contacts = await getContacts();
    return NextResponse.json({ success: true, data: contacts, hasKV });
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create new contact object with ID and timestamp
    const newContact: ContactMessage = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: body.name || "",
      email: body.email || "",
      subject: body.subject || "",
      message: body.message || "",
    };

    await saveContact(newContact);

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return NextResponse.json({ success: false, error: "Failed to save message" }, { status: 500 });
  }
}
