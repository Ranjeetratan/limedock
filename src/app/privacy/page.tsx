import LegalPage, { LegalNote, LegalSection } from "@/components/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How LimeDock handles the data on this website and during workflow-automation engagements — plain language, no dark patterns.",
};

const UPDATED = "22 July 2026";
const CONTACT_EMAIL = "ranjeet@limedock.com";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy policy"
      intro="How we handle the data on this website and the data your team shares with us while we build workflow automations for you."
      updated={UPDATED}
    >
      <LegalNote>
        <strong className="text-ink">Short version.</strong> The
        automations we build for you run on your own infrastructure. Your
        customer data, call recordings, CRM records, and business content
        stay inside your walls. This page covers the visitor data we
        collect on limedock.com and the small amount of business data your
        team shares with us while we scope and ship a workflow.
      </LegalNote>

      <LegalSection number="1" title="Who this policy is from">
        <p>
          LimeDock (&ldquo;<strong>LimeDock</strong>&rdquo;,
          &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;) is a
          studio that designs and ships custom workflow automations for
          SaaS teams. This privacy policy applies to visitors of{" "}
          <strong>limedock.com</strong> and to the business contacts we
          work with during an engagement.
        </p>
        <p>
          Client end-user data (your customers, your users, your prospects)
          never reaches LimeDock in production — that data is processed by
          the automations we build, which run inside your own cloud
          account. The privacy notice your customers rely on is yours to
          write and publish.
        </p>
      </LegalSection>

      <LegalSection number="2" title="What we collect on limedock.com">
        <p>The marketing site collects a small, standard set of data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-ink">Analytics.</strong> We use Google
            Analytics to understand what pages people read and where they
            arrive from. It captures page views, referrers, approximate
            location by IP, device type, and browser. IP addresses are
            processed by Google&rsquo;s standard controls.
          </li>
          <li>
            <strong className="text-ink">Booking.</strong> When you book a
            workflow call, Cal.com collects your name, email address, and
            selected time. That information is used to hold the meeting
            and follow up.
          </li>
          <li>
            <strong className="text-ink">Email.</strong> When you email us
            at{" "}
            <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            , we keep the thread in Google Workspace for as long as we&rsquo;re
            still in touch.
          </li>
          <li>
            <strong className="text-ink">Cookies.</strong> Essential
            cookies for the site to work, plus Google Analytics&rsquo; own
            cookies. You can block them with your browser or use an ad
            blocker.
          </li>
        </ul>
        <p>
          We do not sell visitor data. We do not run advertising retargeting
          off this site.
        </p>
      </LegalSection>

      <LegalSection number="3" title="What we collect during an engagement">
        <p>
          When we scope and build a workflow automation for you, we
          collect only what we need to do the job:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Business context — your workflow map, team structure, tool
            inventory, and success criteria, gathered in interviews and
            shared docs.
          </li>
          <li>
            Sample data — anonymised or masked CRM exports, ticket
            samples, or product data used to test a workflow before it
            goes live. We ask you to strip real personal data before it
            reaches us wherever possible.
          </li>
          <li>
            Temporary access — where a build requires it, short-lived
            credentials or a sandbox environment inside your systems. We
            do not store your production credentials on our machines and
            we work through your password manager or an SSO invite where
            you have one.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="4" title="Where the automations run">
        <p>
          This is the core of how LimeDock treats data differently. The
          workflow automations we build are deployed into{" "}
          <strong>your</strong> cloud account or on-prem environment.
          Prompts, integrations, and configuration ship into your Git
          organisation as versioned code.
        </p>
        <p>
          As a result, your day-to-day customer and business data flows
          between the systems you already control (Slack, CRM, product
          database, internal platform) — not through servers operated by
          LimeDock. LimeDock has no continuous access to production data
          after handover, and any ongoing access during an operate
          retainer is scoped and logged.
        </p>
      </LegalSection>

      <LegalSection number="5" title="AI providers and your API keys">
        <p>
          The automations call model providers such as OpenAI, Anthropic,
          or others you choose. Those calls are made with{" "}
          <strong>your</strong> API keys, from your infrastructure,
          against the provider&rsquo;s endpoints directly. LimeDock does not
          proxy your model traffic.
        </p>
        <p>
          Each provider has its own privacy and data-retention policy that
          applies to the requests you make. We help you configure zero
          data-retention, enterprise agreements, or private deployments
          where the provider supports them.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Sub-processors we use">
        <p>
          For the marketing site and internal delivery, we rely on a small
          set of tools:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Vercel — marketing-site hosting and analytics.</li>
          <li>Google Analytics — traffic measurement.</li>
          <li>Cal.com — meeting booking.</li>
          <li>
            Google Workspace — email, docs, and shared drives for
            engagement materials.
          </li>
          <li>GitHub — source control and code review.</li>
          <li>
            Slack — shared channels invited by clients for engagement
            communication.
          </li>
        </ul>
        <p>
          We do not appoint additional sub-processors to touch your
          engagement data without telling you first.
        </p>
      </LegalSection>

      <LegalSection number="7" title="How long we keep things">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-ink">Website analytics.</strong>{" "}
            Rolled up after 26 months following Google Analytics defaults.
          </li>
          <li>
            <strong className="text-ink">Booking + email.</strong> Kept
            for as long as we&rsquo;re in active conversation, then archived
            for 24 months so we can pick up threads.
          </li>
          <li>
            <strong className="text-ink">Engagement materials.</strong>{" "}
            Kept for the duration of the engagement plus 12 months, or as
            required by the SOW. Sample data we asked you to share is
            deleted within 30 days of a workflow going live unless we&rsquo;ve
            agreed otherwise for eval reasons.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="8" title="Your rights">
        <p>
          If you&rsquo;re a visitor or a client contact, you can ask us to see,
          correct, export, or delete the personal information we hold about
          you. If you&rsquo;re in the EEA, the UK, or a jurisdiction with
          comparable rules, you also have the right to object to
          processing and to lodge a complaint with your local data
          protection authority.
        </p>
        <p>
          Email{" "}
          <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{" "}
          with the request. We respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection number="9" title="Security">
        <p>
          Engagement materials sit in Google Workspace and GitHub with
          two-factor authentication required. Client credentials are never
          committed to code, and secrets are stored in the client&rsquo;s own
          secret manager rather than on our laptops. Devices used for
          engagements have full-disk encryption and auto-locking.
        </p>
      </LegalSection>

      <LegalSection number="10" title="International transfers">
        <p>
          The tools listed in section 6 may process data in the United
          States, the European Union, or India. Where personal data of EEA
          or UK residents is transferred, we rely on the standard
          contractual clauses those providers publish and on your prior
          agreement in the SOW.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Children">
        <p>
          LimeDock&rsquo;s services are aimed at businesses. The marketing site
          is not directed at anyone under 16 and we do not knowingly
          collect information from children.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Changes to this policy">
        <p>
          When we make a material change, we&rsquo;ll update the &ldquo;last
          updated&rdquo; date at the top of this page and — for existing
          clients — send a note over the shared Slack or email.
        </p>
      </LegalSection>

      <LegalSection number="13" title="Contact">
        <p>
          Questions or requests:{" "}
          <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          . If you&rsquo;d rather see our terms of service, they live at{" "}
          <Link className="text-link" href="/terms">
            /terms
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
