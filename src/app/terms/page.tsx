import LegalPage, { LegalNote, LegalSection } from "@/components/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern this website and any LimeDock workflow-automation engagement that isn't superseded by a signed MSA/SOW.",
};

const UPDATED = "22 July 2026";
const CONTACT_EMAIL = "ranjeet@limedock.com";

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of service"
      intro="Plain-English terms for using limedock.com and for engaging LimeDock to design and ship workflow automations for your team."
      updated={UPDATED}
    >
      <LegalNote>
        <strong className="text-ink">Short version.</strong> These terms
        cover the marketing site and the default rules of a LimeDock
        engagement. Anything you sign later — an SOW, MSA, or DPA —
        overrides these terms for that engagement. You keep the code and
        the data. We deliver the workflows.
      </LegalNote>

      <LegalSection number="1" title="Who these terms are with">
        <p>
          These terms are between you and LimeDock (&ldquo;
          <strong>LimeDock</strong>&rdquo;, &ldquo;
          <strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;), a studio that
          designs and ships custom workflow automations for SaaS teams.
          They apply when you use the LimeDock website and when you engage
          us to build, deliver, or operate workflow automations for your
          business.
        </p>
      </LegalSection>

      <LegalSection number="2" title="What LimeDock does">
        <p>
          We design and build internal workflow automations that plug into
          your existing Slack, CRM, and internal platform. Each engagement
          typically covers:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A workflow audit of your marketing, sales, or management operations.</li>
          <li>Design and delivery of one or more workflow automations, deployed into your own cloud account.</li>
          <li>Prompts, integrations, evals, and documentation, versioned in your Git organisation.</li>
          <li>Optional ongoing tuning and new-workflow releases on a lightweight retainer.</li>
        </ul>
      </LegalSection>

      <LegalSection number="3" title="Scope and deliverables">
        <p>
          The scope, milestones, and price of any specific engagement are
          set out in a written Statement of Work (SOW). Where no SOW
          exists, these terms describe our default expectations: fixed
          build fee, milestone payments, source code and prompts delivered
          into your repository, and a handover pack covering how to
          operate the workflow.
        </p>
        <p>
          If the SOW conflicts with these terms, the SOW wins for that
          engagement.
        </p>
      </LegalSection>

      <LegalSection number="4" title="Ownership of what we build">
        <p>
          On payment of the applicable fees, you own the workflow
          automations we build for you, including the source code,
          prompts, evals, integration configuration, and documentation.
          They are delivered into your Git organisation and deployed into
          your cloud account.
        </p>
        <p>
          Standard components — open-source dependencies, LimeDock&rsquo;s
          generic internal utilities, and boilerplate we reuse across
          engagements — remain governed by their existing licences or
          stay LimeDock&rsquo;s property, and are licensed to you for use in
          your engagement.
        </p>
        <p>
          LimeDock may keep the learnings, patterns, and non-confidential
          know-how from an engagement to use in future work. We do not
          reuse your confidential information, brand, or trade secrets.
        </p>
      </LegalSection>

      <LegalSection number="5" title="Third-party services and API keys">
        <p>
          The automations we build rely on services you procure and pay
          for directly, including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Model providers (OpenAI, Anthropic, or others you choose) via your own API keys.</li>
          <li>Cloud hosting and database services.</li>
          <li>Communication surfaces like Slack, plus any CRM or data-source APIs.</li>
        </ul>
        <p>
          LimeDock is not a reseller of these services. Their terms and
          pricing are between you and them. We help you configure them
          responsibly but do not control their availability or their
          model outputs.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Payment terms">
        <p>
          Unless the SOW says otherwise, invoices are payable within 14
          days of issue. Milestone payments are due when the milestone is
          delivered. Retainers are invoiced monthly in advance. Overdue
          amounts may pause active work until they&rsquo;re settled.
        </p>
      </LegalSection>

      <LegalSection number="7" title="What we promise, and what we do not">
        <p>
          We deliver professional, best-effort work built on modern tools
          and reasonable engineering practice. AI-driven components are
          probabilistic: their outputs depend on your data, the prompt
          design, and the underlying model. We help you set evals,
          guardrails, and monitoring, but we do not guarantee specific
          business outcomes, revenue lifts, or absolute accuracy of any
          AI-generated result.
        </p>
        <p>
          Except as expressly stated in a signed SOW or MSA, we disclaim
          implied warranties to the fullest extent allowed by law,
          including implied warranties of merchantability and fitness for
          a particular purpose.
        </p>
      </LegalSection>

      <LegalSection number="8" title="Limitation of liability">
        <p>
          To the fullest extent allowed by law, each party&rsquo;s aggregate
          liability arising out of an engagement is capped at the total
          fees paid to LimeDock under that engagement in the 12 months
          preceding the claim. Neither party is liable for indirect,
          incidental, consequential, special, or punitive damages, or for
          lost profits or revenues.
        </p>
        <p>
          Nothing in these terms limits liability for fraud, gross
          negligence, or anything else that cannot be excluded under
          applicable law.
        </p>
      </LegalSection>

      <LegalSection number="9" title="Confidentiality">
        <p>
          Both sides will keep the other side&rsquo;s non-public information
          confidential, use it only for the engagement, and protect it
          with reasonable care. Confidentiality obligations survive the
          end of the engagement for three years, or longer where the
          information is a trade secret.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Term and termination">
        <p>
          Either party may terminate an engagement for material breach if
          the other party fails to cure the breach within 30 days of
          written notice. Retainers may be cancelled by either side with
          30 days&rsquo; notice.
        </p>
        <p>
          On termination, you keep everything already delivered. You pay
          fees earned up to the date of termination. Sections that by
          their nature should survive (ownership, confidentiality,
          liability, governing law) do survive.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Acceptable use of the website">
        <p>
          You may browse, share, and quote from limedock.com for
          non-commercial purposes with attribution. You may not scrape the
          site at volume, attempt to disrupt it, reverse-engineer any of
          the interactive elements, or use it to train an AI model without
          our written permission.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Governing law">
        <p>
          Unless the SOW or MSA says otherwise, these terms are governed
          by the laws of India and the courts of Delhi have exclusive
          jurisdiction over any dispute. Where you and LimeDock have
          agreed a different governing law or seat in a signed agreement,
          that agreement controls.
        </p>
      </LegalSection>

      <LegalSection number="13" title="Changes to these terms">
        <p>
          When we make material changes to these terms, we&rsquo;ll update the
          &ldquo;last updated&rdquo; date and — for active clients —
          send a note over the shared Slack or email. Continuing to use
          the site or the services after that date means the updated
          terms apply.
        </p>
      </LegalSection>

      <LegalSection number="14" title="Contact">
        <p>
          Questions:{" "}
          <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          . The privacy policy lives at{" "}
          <Link className="text-link" href="/privacy">
            /privacy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
