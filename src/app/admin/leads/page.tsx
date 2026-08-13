"use client";

import { useEffect, useState } from "react";
import type { Lead } from "@/app/api/leads/route";
import Navbar from "@/components/Navbar";

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch("/api/leads");
        const json = await response.json();
        
        if (json.success) {
          setLeads(json.data);
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
