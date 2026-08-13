"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BOOK_DEMO_URL } from "@/lib/site";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function LawFirmsLandingContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("submitting");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY_HERE"); // Placeholder key
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="bg-canvas text-body overflow-hidden">
      {/* ── SECTION 1: Hero ── */}
      <section className="pt-32 pb-24 relative overflow-hidden bg-canvas">
        <div className="absolute inset-0 bg-gradient-to-b from-signature-cream/40 to-transparent pointer-events-none" />
        <div className="container-air relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={itemVariants} className="eyebrow">
              <span className="dot !bg-signature-forest" />
              Modern Legal Operations
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-display-xl text-ink mt-6 font-display">
              A Custom AI Infrastructure for your firm
            </motion.h1>
            <motion.p variants={itemVariants} className="text-body-md text-muted mt-6 text-lg max-w-xl leading-[1.65]">
              AI built around how your firm actually works. Connect your everyday tools, run AI across your employees&apos; devices, and give it the context of your people, cases, clients, and workflows. Your AI gets smarter as your firm works — and grows with you.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#lead-form" className="btn-primary">
                Get Customized Workflow
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: Win More Business ── */}
      <motion.section 
        className="section-air bg-surface-soft border-t border-hairline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container-air">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h2 className="text-display-lg text-ink font-display">
                That Helps you to Win More of the Right Business
              </h2>
              <p className="text-body-md text-body mt-6 leading-[1.65]">
                Find the right opportunities and move on them faster. Capture, qualify, research, and follow up with potential clients without relying on your team to chase every lead manually.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-signature-forest/10" />
              <img src="/images/law-firms/law_hero_boardroom_1786200758128.jpg" alt="Boardroom" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 3: Do Your Best Legal Work ── */}
      <motion.section 
        className="section-air bg-canvas border-t border-hairline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container-air">
          <div className="grid lg:grid-cols-2 gap-12 items-center flex-col-reverse lg:flex-row-reverse">
            <div className="max-w-xl">
              <h2 className="text-display-lg text-ink font-display">
                Do your best legal work
              </h2>
              <p className="text-body-md text-body mt-6 leading-[1.65]">
                Spend less time searching and more time doing the work that matters. Research cases, review documents, draft faster, and work with AI that understands your firm&apos;s knowledge, previous work, and the matter you&apos;re working on.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-signature-cream/20" />
              <img src="/images/law-firms/law_library_modern_1786200793996.jpg" alt="Modern Library" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 4: Sync Employee Devices ── */}
      <motion.section 
        className="section-air bg-surface-dark text-on-dark border-t border-hairline relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="container-air relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h2 className="text-display-lg text-white font-display">
                Sync all your Employee Devices
              </h2>
              <p className="text-white/70 text-body-md mt-6 leading-[1.65]">
                Give every employee instant access to the company context they need — meetings, case research, documents, tasks, and deadlines — across their laptop and phone. Keep your entire team connected and organized from one centralized workspace, while giving admins complete visibility and control.
              </p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-signature-mint/30 to-transparent mix-blend-overlay" />
              <img src="/images/law-firms/law_partner_desk_1786200770412.jpg" alt="Partner Desk" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 5: Run Firm Without Busywork ── */}
      <motion.section 
        className="section-air bg-surface-soft border-t border-hairline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container-air">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-lg text-ink font-display">
              Run the Firm Without the Busywork
            </h2>
            <p className="text-body-md text-body mt-6 leading-[1.65]">
              Keep matters, deadlines, bills, meetings, and follow-ups moving without someone having to remember everything. AI handles the routine work in the background, so your team can focus on clients and the work that needs human judgment.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 6: And Much More ── */}
      <motion.section 
        className="section-air bg-canvas border-t border-hairline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container-air">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src="/images/law-firms/law_client_meeting_1786200815407.jpg" alt="Client Meeting" className="object-cover w-full h-full" />
            </div>
            <div className="max-w-xl lg:pl-10">
              <h2 className="text-display-lg text-ink font-display">
                And Much More
              </h2>
              <p className="text-body-md text-body mt-6 leading-[1.65]">
                Your firm already has the tools, people, and knowledge it needs. We connect them into one intelligent system — with the setup, training, support, and security needed to make it work for your firm.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 7: Lead Capture Form ── */}
      <motion.section 
        id="lead-form" 
        className="section-air bg-surface-soft border-t border-hairline py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
      >
        <div className="container-air">
          <div className="max-w-xl mx-auto bg-canvas p-8 md:p-12 rounded-2xl border border-hairline shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-display-md text-ink font-display">
                Get Customized Workflow
              </h2>
              <p className="text-body-md text-muted mt-3">
                See how LimeDock can transform your firm&apos;s operations.
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-signature-mint/20 text-signature-forest mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-title-lg text-ink">Request Submitted</h3>
                <p className="text-body mt-2">We will be in touch shortly to discuss your custom workflow.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="subject" value="New Law Firm Workflow Request" />
                <input type="hidden" name="to_email" value="limedockadmn@gmail.com" />
                
                <div>
                  <label htmlFor="companyWebsite" className="block text-caption text-ink font-medium mb-1.5 uppercase tracking-wide">Company Website</label>
                  <input required type="text" id="companyWebsite" name="Company Website" className="w-full px-4 py-3 rounded-md border border-hairline bg-surface-soft focus:outline-none focus:border-ink/50 transition-colors" placeholder="www.yourfirm.com" />
                </div>

                <div>
                  <label htmlFor="areaOfPractice" className="block text-caption text-ink font-medium mb-1.5 uppercase tracking-wide">Area of Practice</label>
                  <select required id="areaOfPractice" name="Area of Practice" className="w-full px-4 py-3 rounded-md border border-hairline bg-surface-soft focus:outline-none focus:border-ink/50 transition-colors appearance-none">
                    <option value="" disabled defaultValue="">Select your practice area...</option>
                    {[
                      "Administrative Law", "Bankruptcy Law", "Business & Compliance", 
                      "Civil Litigation Law", "Criminal Law", "Elder Law", "Employment Law", 
                      "Estate Planning Law", "Family Law", "General Practice", "Government Law", 
                      "Immigration Law", "In-House Counsel", "Intellectual Property Law", 
                      "Personal Injury Law", "Real Estate Law"
                    ].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="firmSize" className="block text-caption text-ink font-medium mb-1.5 uppercase tracking-wide">Firm Size</label>
                  <select required id="firmSize" name="Firm Size" className="w-full px-4 py-3 rounded-md border border-hairline bg-surface-soft focus:outline-none focus:border-ink/50 transition-colors appearance-none">
                    <option value="" disabled defaultValue="">Select firm size...</option>
                    {["Solo", "Small", "Mid-Sized", "Enterprise"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="role" className="block text-caption text-ink font-medium mb-1.5 uppercase tracking-wide">Roles</label>
                  <select required id="role" name="Role" className="w-full px-4 py-3 rounded-md border border-hairline bg-surface-soft focus:outline-none focus:border-ink/50 transition-colors appearance-none">
                    <option value="" disabled defaultValue="">Select your role...</option>
                    {[
                      "Associate Attorney", "Billing Manager", "IT Manager", 
                      "Legal Administrator", "Managing Partner", "Paralegal", "Solo Lawyer"
                    ].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-caption text-ink font-medium mb-1.5 uppercase tracking-wide">Email</label>
                  <input required type="email" id="email" name="Email" className="w-full px-4 py-3 rounded-md border border-hairline bg-surface-soft focus:outline-none focus:border-ink/50 transition-colors" placeholder="you@firm.com" />
                </div>

                {formStatus === "error" && (
                  <p className="text-signature-coral text-sm">Something went wrong. Please try again.</p>
                )}

                <button 
                  type="submit" 
                  disabled={formStatus === "submitting"}
                  className="w-full btn-primary mt-2 disabled:opacity-50"
                >
                  {formStatus === "submitting" ? "Submitting..." : "Get Customized Workflow"}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
