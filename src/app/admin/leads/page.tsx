"use client";

import { useEffect, useState } from "react";
import type { Lead } from "@/app/api/leads/route";
import Navbar from "@/components/Navbar";

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasKV, setHasKV] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch("/api/leads");
        const json = await response.json();
        
        if (json.success) {
          setLeads(json.data);
          setHasKV(json.hasKV !== false);
        } else {
          setError(json.error || "Failed to load leads");
        }
      } catch (err) {
        setError("Error connecting to server");
      } finally {
        setLoading(false);
      }
    }
    
    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-body font-sans">
      <Navbar />
      
      <main className="container-air py-32">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-display text-ink tracking-tight">Leads Dashboard</h1>
            <p className="text-body-md text-muted mt-2">Manage incoming workflow requests.</p>
          </div>
          <div className="bg-surface-soft px-4 py-2 rounded-full border border-hairline text-sm font-medium">
            Total Leads: {leads.length}
          </div>
        </div>

        {!hasKV && (
          <div className="bg-signature-coral/10 border border-signature-coral/20 text-signature-coral p-4 rounded-xl mb-8 flex items-start gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-semibold text-lg">Vercel KV Database Not Connected</h3>
              <p className="mt-1 opacity-90">
                You are currently running without a database connection. Leads are being saved temporarily, but will be lost when the server restarts. 
                To fix this, go to your Vercel Dashboard, select your project, click the &quot;Storage&quot; tab, and create a free KV database.
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
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Company</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Practice Area</th>
                  <th className="px-6 py-4 text-xs font-semibold text-ink uppercase tracking-widest">Firm Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted">
                      Loading leads...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted">
                      No leads received yet.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 text-sm">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-ink">
                        {lead.companyWebsite}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-white/50 border border-hairline rounded-full text-xs">
                          {lead.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink">
                        <a href={`mailto:${lead.email}`} className="hover:underline text-signature-forest">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {lead.areaOfPractice}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {lead.firmSize}
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
