"use client";

import { useEffect, useState } from "react";
import type { ContactMessage } from "@/app/api/contact/route";
import Navbar from "@/components/Navbar";

export default function ContactsAdminDashboard() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasKV, setHasKV] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("/api/contact");
        const json = await response.json();
        
        if (json.success) {
          setContacts(json.data);
          setHasKV(json.hasKV !== false);
        } else {
          setError(json.error || "Failed to load contacts");
        }
      } catch (err) {
        setError("Error connecting to server");
      } finally {
        setLoading(false);
      }
    }
    
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-body font-sans">
      <Navbar />
      
      <main className="container-air py-32">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-display text-ink tracking-tight">Contact Inquiries</h1>
            <p className="text-body-md text-muted mt-2">Manage incoming messages from the Contact Us page.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/leads" className="text-sm font-medium text-signature-forest hover:underline">
              &larr; Back to Leads
            </a>
            <div className="bg-surface-soft px-4 py-2 rounded-full border border-hairline text-sm font-medium">
              Total Messages: {contacts.length}
            </div>
          </div>
        </div>

        {!hasKV && (
          <div className="bg-signature-coral/10 border border-signature-coral/20 text-signature-coral p-4 rounded-xl mb-8 flex items-start gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-semibold text-lg">Serverless Database Not Connected</h3>
              <p className="mt-1 opacity-90">
                You are currently running without a database connection. Messages are being saved temporarily, but will be lost when the server restarts. 
                To fix this, go to your Vercel Dashboard, select your project, click the &quot;Storage&quot; tab, and click <strong>Create Database &rarr; Upstash (Serverless DB Redis)</strong>.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-signature-coral/10 border border-signature-coral/20 text-signature-coral p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        <div className="bg-surface-soft border border-hairline rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-canvas border-b border-hairline">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Subject</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted">
                      Loading messages...
                    </td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted">
                      No messages received yet.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-black/5 transition-colors align-top">
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-ink whitespace-nowrap">
                        {contact.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-ink whitespace-nowrap">
                        <a href={`mailto:${contact.email}`} className="hover:underline text-signature-forest">
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        {contact.subject}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-normal min-w-[300px] max-w-lg">
                        <div className="line-clamp-3 text-muted" title={contact.message}>
                          {contact.message}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
