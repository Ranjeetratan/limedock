"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function FadeInText({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LeadCaptureForm({ compact = false }: { compact?: boolean }) {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("submitting");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY_HERE"); 
    
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

  if (formStatus === "success") {
    return (
      <div className={`text-center ${compact ? 'py-4' : 'py-12'}`}>
        <div className={`inline-flex items-center justify-center rounded-full bg-signature-mint/20 text-signature-forest ${compact ? 'w-12 h-12 mb-4' : 'w-20 h-20 mb-6'}`}>
          <svg width={compact ? "24" : "40"} height={compact ? "24" : "40"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`${compact ? 'text-xl text-white' : 'text-2xl text-ink'} font-display`}>Request Submitted</h3>
        <p className={`${compact ? 'text-white/80' : 'text-body'} mt-2`}>We will be in touch shortly to discuss your custom workflow.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${compact ? 'text-left' : ''}`}>
      <input type="hidden" name="subject" value="New Law Firm Workflow Request" />
      <input type="hidden" name="to_email" value="limedockadmn@gmail.com" />
      
      <div className={compact ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-6'}>
        <div className={compact ? 'md:col-span-2' : ''}>
          <label htmlFor={`companyWebsite-${compact}`} className={`block text-xs font-semibold mb-2 uppercase tracking-widest ${compact ? 'text-white/80' : 'text-ink'}`}>Company Website</label>
          <input required type="text" id={`companyWebsite-${compact}`} name="Company Website" className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${compact ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-white/50 backdrop-blur-sm' : 'bg-surface-soft border-hairline text-ink focus:ring-ink/20'}`} placeholder="www.yourfirm.com" />
        </div>

        <div>
          <label htmlFor={`areaOfPractice-${compact}`} className={`block text-xs font-semibold mb-2 uppercase tracking-widest ${compact ? 'text-white/80' : 'text-ink'}`}>Area of Practice</label>
          <select required id={`areaOfPractice-${compact}`} name="Area of Practice" className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all appearance-none ${compact ? 'bg-white/10 border-white/20 text-white focus:ring-white/50 backdrop-blur-sm [&>option]:text-ink' : 'bg-surface-soft border-hairline text-ink focus:ring-ink/20'}`}>
            <option value="" disabled defaultValue="" className={compact ? 'text-ink' : ''}>Select your practice area...</option>
            {[
              "Administrative Law", "Bankruptcy Law", "Business & Compliance", 
              "Civil Litigation Law", "Criminal Law", "Elder Law", "Employment Law", 
              "Estate Planning Law", "Family Law", "General Practice", "Government Law", 
              "Immigration Law", "In-House Counsel", "Intellectual Property Law", 
              "Personal Injury Law", "Real Estate Law"
            ].map(opt => <option key={opt} value={opt} className={compact ? 'text-ink' : ''}>{opt}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor={`firmSize-${compact}`} className={`block text-xs font-semibold mb-2 uppercase tracking-widest ${compact ? 'text-white/80' : 'text-ink'}`}>Firm Size</label>
          <select required id={`firmSize-${compact}`} name="Firm Size" className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all appearance-none ${compact ? 'bg-white/10 border-white/20 text-white focus:ring-white/50 backdrop-blur-sm [&>option]:text-ink' : 'bg-surface-soft border-hairline text-ink focus:ring-ink/20'}`}>
            <option value="" disabled defaultValue="" className={compact ? 'text-ink' : ''}>Select firm size...</option>
            {["Solo", "Small", "Mid-Sized", "Enterprise"].map(opt => <option key={opt} value={opt} className={compact ? 'text-ink' : ''}>{opt}</option>)}
          </select>
        </div>

        <div className={compact ? 'md:col-span-2' : ''}>
          <label htmlFor={`role-${compact}`} className={`block text-xs font-semibold mb-2 uppercase tracking-widest ${compact ? 'text-white/80' : 'text-ink'}`}>Roles</label>
          <select required id={`role-${compact}`} name="Role" className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all appearance-none ${compact ? 'bg-white/10 border-white/20 text-white focus:ring-white/50 backdrop-blur-sm [&>option]:text-ink' : 'bg-surface-soft border-hairline text-ink focus:ring-ink/20'}`}>
            <option value="" disabled defaultValue="" className={compact ? 'text-ink' : ''}>Select your role...</option>
            {[
              "Associate Attorney", "Billing Manager", "IT Manager", 
              "Legal Administrator", "Managing Partner", "Paralegal", "Solo Lawyer"
            ].map(opt => <option key={opt} value={opt} className={compact ? 'text-ink' : ''}>{opt}</option>)}
          </select>
        </div>

        <div className={compact ? 'md:col-span-2' : ''}>
          <label htmlFor={`email-${compact}`} className={`block text-xs font-semibold mb-2 uppercase tracking-widest ${compact ? 'text-white/80' : 'text-ink'}`}>Email</label>
          <input required type="email" id={`email-${compact}`} name="Email" className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${compact ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-white/50 backdrop-blur-sm' : 'bg-surface-soft border-hairline text-ink focus:ring-ink/20'}`} placeholder="you@firm.com" />
        </div>
      </div>

      {formStatus === "error" && (
        <p className="text-signature-coral text-sm text-center font-medium mt-2">Something went wrong. Please try again.</p>
      )}

      <button 
        type="submit" 
        disabled={formStatus === "submitting"}
        className={`w-full py-4 rounded-xl font-medium tracking-wide transition-colors disabled:opacity-50 mt-6 ${compact ? 'bg-white text-black hover:bg-white/90' : 'bg-ink text-white hover:bg-black'}`}
      >
        {formStatus === "submitting" ? "Submitting..." : "Get Free Customized Workflow"}
      </button>
    </form>
  );
}

export default function LawFirmsLandingContent() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="bg-canvas text-body overflow-hidden">
      {/* ── SECTION 1: Hero ── */}
      <section ref={heroRef} className="relative min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full">
          <Image 
            src="/images/law-firms/hero.jpg" 
            alt="Law Firm Hero" 
            fill
            priority
            className="object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
        
        <motion.div style={{ opacity: opacityText }} className="container-air relative z-10 w-full pt-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <FadeInText>
                <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-sm uppercase tracking-[0.2em] mb-8">
                  Modern Legal Operations
                </span>
              </FadeInText>
              <FadeInText delay={0.1}>
                <h1 className="text-[3.5rem] md:text-[4.5rem] leading-[1.05] tracking-tight text-white font-display font-medium">
                  A Custom AI Infrastructure <br/>
                  <span className="text-white/60 font-serif italic">for your firm</span>
                </h1>
              </FadeInText>
              <FadeInText delay={0.2}>
                <p className="text-xl md:text-2xl text-white/70 mt-8 max-w-xl leading-relaxed font-light">
                  AI built around how your firm actually works. Connect your everyday tools, run AI across your employees&apos; devices, and give it the context of your people, cases, clients, and workflows.
                </p>
              </FadeInText>
            </div>
            
            <div className="w-full max-w-lg ml-auto relative">
              <FadeInText delay={0.3}>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-2xl text-white font-display mb-6">Request Your Workflow</h3>
                    <LeadCaptureForm compact={true} />
                  </div>
                </div>
              </FadeInText>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2: Win More Business ── */}
      <section className="py-32 bg-canvas relative">
        <div className="container-air">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeInText>
                <h2 className="text-4xl md:text-5xl text-ink font-display tracking-tight leading-[1.1]">
                  That Helps you to <br/>
                  <span className="text-signature-coral">Win More</span> of the Right Business
                </h2>
              </FadeInText>
              <FadeInText delay={0.1}>
                <p className="text-xl text-body mt-8 leading-[1.7]">
                  Find the right opportunities and move on them faster. Capture, qualify, research, and follow up with potential clients without relying on your team to chase every lead manually.
                </p>
              </FadeInText>
            </div>
            <div className="relative">
              <FadeInText delay={0.2}>
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image src="/images/law-firms/meeting.jpg" alt="Client Meeting" fill className="object-cover" />
                </div>
              </FadeInText>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Do Your Best Legal Work ── */}
      <section className="py-32 bg-surface-soft relative">
        <div className="container-air">
          <div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
            <div>
              <FadeInText>
                <h2 className="text-4xl md:text-5xl text-ink font-display tracking-tight leading-[1.1]">
                  Do your <span className="text-signature-mint">best</span> legal work
                </h2>
              </FadeInText>
              <FadeInText delay={0.1}>
                <p className="text-xl text-body mt-8 leading-[1.7]">
                  Spend less time searching and more time doing the work that matters. Research cases, review documents, draft faster, and work with AI that understands your firm&apos;s knowledge, previous work, and the matter you&apos;re working on.
                </p>
              </FadeInText>
            </div>
            <div className="relative">
              <FadeInText delay={0.2}>
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image src="/images/law-firms/library.jpg" alt="Modern Library" fill className="object-cover" />
                </div>
              </FadeInText>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Sync Employee Devices ── */}
      <section className="py-40 bg-surface-dark text-on-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none" />
        <div className="container-air relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInText>
              <h2 className="text-5xl md:text-7xl text-white font-display tracking-tight leading-[1.05]">
                Sync all your <br/>
                <span className="font-serif italic text-white/60">Employee Devices</span>
              </h2>
            </FadeInText>
            <FadeInText delay={0.1}>
              <p className="text-xl md:text-2xl text-white/70 mt-10 leading-relaxed font-light">
                Give every employee instant access to the company context they need — meetings, case research, documents, tasks, and deadlines — across their laptop and phone. Keep your entire team connected and organized from one centralized workspace, while giving admins complete visibility and control.
              </p>
            </FadeInText>
          </div>
          <FadeInText delay={0.2}>
            <div className="mt-24 relative aspect-video max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
              <Image src="/images/law-firms/partner.jpg" alt="Partner Desk" fill className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 hover:scale-105" />
            </div>
          </FadeInText>
        </div>
      </section>

      {/* ── SECTION 5 & 6: Run Firm Without Busywork & And Much More ── */}
      <section className="py-32 bg-canvas relative">
        <div className="container-air">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeInText>
              <div className="bg-surface-soft p-12 md:p-16 rounded-[2rem] h-full border border-hairline hover:border-ink/20 transition-colors duration-500">
                <h3 className="text-3xl font-display text-ink leading-tight">Run the Firm Without the Busywork</h3>
                <p className="mt-6 text-lg text-body leading-relaxed">
                  Keep matters, deadlines, bills, meetings, and follow-ups moving without someone having to remember everything. AI handles the routine work in the background, so your team can focus on clients and the work that needs human judgment.
                </p>
              </div>
            </FadeInText>
            <FadeInText delay={0.1}>
              <div className="bg-surface-soft p-12 md:p-16 rounded-[2rem] h-full border border-hairline hover:border-ink/20 transition-colors duration-500">
                <h3 className="text-3xl font-display text-ink leading-tight">And Much More</h3>
                <p className="mt-6 text-lg text-body leading-relaxed">
                  Your firm already has the tools, people, and knowledge it needs. We connect them into one intelligent system — with the setup, training, support, and security needed to make it work for your firm.
                </p>
              </div>
            </FadeInText>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Lead Capture Form ── */}
      <section id="lead-form" className="py-32 bg-surface-soft border-t border-hairline relative">
        <div className="container-air">
          <FadeInText>
            <div className="max-w-xl mx-auto bg-canvas p-10 md:p-14 rounded-[2rem] border border-hairline shadow-xl">
              <div className="text-center mb-10">
                <h2 className="text-4xl text-ink font-display tracking-tight">
                  Get Customized Workflow
                </h2>
                <p className="text-body-md text-muted mt-4">
                  See how LimeDock can transform your firm&apos;s operations.
                </p>
              </div>

              <LeadCaptureForm />
            </div>
          </FadeInText>
        </div>
      </section>
    </div>
  );
}
