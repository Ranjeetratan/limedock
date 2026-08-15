"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
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
    <section className="pt-32 pb-24 overflow-hidden relative">
      {/* Background effects matching law-firms */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-signature-forest/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-signature-moss/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-air relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-soft border border-hairline mb-8">
              <span className="w-2 h-2 rounded-full bg-signature-forest animate-pulse" />
              <span className="text-xs font-semibold text-ink uppercase tracking-wider">Get in Touch</span>
            </div>
            
            <h1 className="text-display-lg text-ink font-display tracking-tight leading-[1.05] mb-6">
              Let's map out your next automation.
            </h1>
            <p className="text-body-lg text-body max-w-xl leading-relaxed mb-10">
              Whether you have a specific workflow in mind or just want to explore how custom AI can save your team hours every week, we're here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-soft border border-hairline flex items-center justify-center text-ink">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink uppercase tracking-widest mb-1">Email Us</div>
                  <a href="mailto:hello@limedock.com" className="text-body hover:text-signature-forest transition-colors">
                    hello@limedock.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface-soft/50 backdrop-blur-xl border border-hairline p-8 md:p-10 rounded-[2rem] shadow-sm relative overflow-hidden"
          >
            {/* Subtle gradient overlay for premium feel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            {formStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto bg-signature-forest/10 text-signature-forest rounded-full flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display text-ink mb-3">Message Sent!</h3>
                <p className="text-body">We've received your inquiry and will get back to you shortly.</p>
                <button 
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 btn-secondary"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold mb-2 uppercase tracking-widest text-ink">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full bg-white/50 border border-hairline rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-signature-forest/20 transition-all placeholder:text-muted"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold mb-2 uppercase tracking-widest text-ink">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full bg-white/50 border border-hairline rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-signature-forest/20 transition-all placeholder:text-muted"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold mb-2 uppercase tracking-widest text-ink">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required 
                    className="w-full bg-white/50 border border-hairline rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-signature-forest/20 transition-all placeholder:text-muted"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold mb-2 uppercase tracking-widest text-ink">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={4}
                    className="w-full bg-white/50 border border-hairline rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-signature-forest/20 transition-all placeholder:text-muted resize-y"
                    placeholder="Tell us about your current workflows and what you're looking to automate..."
                  />
                </div>

                {formStatus === "error" && (
                  <p className="text-signature-coral text-sm font-medium">Something went wrong. Please try again or email us directly.</p>
                )}

                <button 
                  type="submit" 
                  disabled={formStatus === "submitting"}
                  className="w-full btn-primary flex items-center justify-center gap-2 group"
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  {formStatus !== "submitting" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
