"use client";

import { motion } from "framer-motion";

const problems = [
  [
    "Repeating work eating the week",
    "Follow-ups, content scheduling, ticket triage, weekly reporting — same jobs, every week, always by hand.",
  ],
  [
    "Great product, quiet market",
    "You shipped the thing. Marketing runs on tribal knowledge and sales runs on a generic CRM built for someone else.",
  ],
  [
    "Founder pulling the Sunday report",
    "You spend the weekend stitching numbers from six dashboards just to see how the business actually moved.",
  ],
  [
    "AI experiments live in browser tabs",
    "ChatGPT windows, prompt docs, Notion pages — none of it is stitched into the way your team actually works.",
  ],
  [
    "Tools were built for someone else's process",
    "Off-the-shelf workflow apps force your team to bend around a template you didn't design.",
  ],
  [
    "Roadmaps you can't move",
    "You're waiting on a vendor's Q3 release for the one automation that would unblock your growth this month.",
  ],
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
                What SaaS teams bring us
              </span>
              <h2 className="text-display-md text-white mt-7">
                You built a great product. Selling and marketing it still runs on duct tape.
              </h2>
              <p className="text-body-md text-white/78 mt-5 leading-[1.55] max-w-md">
                We look at what your marketing, sales, and management
                teams actually do every day — then build the workflows
                that run those jobs for them, plugged into the Slack,
                CRM, and internal platform they already use.
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
