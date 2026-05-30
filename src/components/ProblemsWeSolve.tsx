"use client";

import { motion } from "framer-motion";

const problems = [
  ["Positioning feels generic", "People land on the site and still cannot repeat what makes you different."],
  ["The website does not convert", "Traffic is real. The path to demo, sign-up, or sales is not doing enough work."],
  ["Design and dev drift apart", "The final build loses polish because handoffs turn into compromise."],
  ["The product feels hard to use", "Users can see the value but cannot reach it quickly enough to adopt."],
  ["Content lacks a system", "Social, decks, website, and product messaging sound like different companies."],
  ["The story takes too long", "If it needs a 20-minute walkthrough, the first screen is already losing people."],
];

export default function ProblemsWeSolve() {
  return (
    <section id="problems" className="section-air bg-canvas">
      <div className="container-air">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="signature-card bg-signature-forest text-on-dark overflow-hidden"
        >
          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-16">
            <div>
              <span className="eyebrow !text-white/80">
                <span className="dot !bg-white" />
                What founders bring us
              </span>
              <h2 className="text-display-md text-white mt-7">
                The symptoms are familiar. The fix is usually a better system.
              </h2>
              <p className="text-body-md text-white/78 mt-5 leading-[1.55] max-w-md">
                We look for the stuck point across story, interface, build quality,
                and distribution — then design the shortest path out.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map(([title, copy], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className={`card-luminous rounded-md p-5 text-ink relative ${
                    index % 3 === 0
                      ? "bg-signature-cream"
                      : index % 3 === 1
                        ? "bg-signature-mint"
                        : "bg-canvas"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-title-sm max-w-[15ch]">{title}</span>
                    <span className="text-caption text-muted">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-body-md text-body mt-5 leading-[1.55]">
                    {copy}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
