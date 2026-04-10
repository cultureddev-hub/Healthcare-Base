/**
 * app/[locale]/privacy/page.tsx
 * Privacy Policy — Samui Home Clinic
 *
 * PDPA-compliant privacy policy for a Thai-registered healthcare clinic
 * serving international patients. English-first; Thai translation to be
 * provided by a certified legal translator before Thai launch.
 *
 * Layout: Minimal Single Column (max-w-3xl, 65-75 char line length)
 * Accessibility: Semantic h1 → h2 hierarchy, sufficient contrast.
 */

import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Samui Home Clinic',
  description:
    'How Samui Home Clinic collects, uses, and protects your personal health information in accordance with the Thailand Personal Data Protection Act (PDPA).',
};

const LAST_UPDATED = '10 April 2026';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfb] text-[#080708] font-sans">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5ec4cb] mb-3">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              Samui Home Clinic (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your
              personal data in accordance with the Thailand Personal Data
              Protection Act B.E. 2562 (PDPA) and applicable health data
              regulations. This Privacy Policy explains what data we collect,
              why we collect it, how we use it, and your rights as a data
              subject.
            </p>
            <p className="mt-3">
              By using our website or booking our services, you agree to the
              practices described in this Policy.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              1. Data We Collect
            </h2>
            <p>We collect the following categories of personal data:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Identity data:</strong> full name, nationality, gender,
                date of birth.
              </li>
              <li>
                <strong>Contact data:</strong> email address, WhatsApp / mobile
                number, delivery address.
              </li>
              <li>
                <strong>Appointment data:</strong> requested service, preferred
                date, time, and branch.
              </li>
              <li>
                <strong>Health data (sensitive):</strong> chief complaints,
                symptoms, and medical concerns submitted through our booking
                inquiry form. Health data is treated as sensitive personal data
                under the PDPA and is stored in a separate, access-restricted
                collection accessible only to clinical staff.
              </li>
              <li>
                <strong>Pharmacy data:</strong> prescribed medications ordered,
                delivery instructions, and prescription documents uploaded for
                Rx items.
              </li>
              <li>
                <strong>Technical data:</strong> IP address, browser type, and
                pages visited, collected automatically via standard server logs.
              </li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              2. Legal Basis and Purpose of Processing
            </h2>
            <p>We process your data under the following legal bases:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Explicit consent (PDPA Art. 24, 26):</strong> you
                provide informed consent before we collect any health data.
                Consent may be withdrawn at any time.
              </li>
              <li>
                <strong>Contract performance:</strong> to fulfil your
                appointment or pharmacy order.
              </li>
              <li>
                <strong>Legitimate interests:</strong> to improve our services,
                prevent fraud, and ensure clinic safety.
              </li>
              <li>
                <strong>Legal obligation:</strong> to comply with Thai
                healthcare regulatory requirements and tax law.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              3. How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Schedule and fulfil medical appointments and home visits.</li>
              <li>Process and dispatch pharmacy orders.</li>
              <li>Send appointment confirmations and service reminders.</li>
              <li>Maintain clinical records as required by law.</li>
              <li>
                Respond to inquiries and provide customer support via WhatsApp
                or email.
              </li>
              <li>
                Improve our website and services through anonymised analytics.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell, rent, or trade your personal data
              to third parties for marketing purposes.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              4. Data Sharing
            </h2>
            <p>
              We share personal data only where strictly necessary:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Clinical staff:</strong> treating doctors, nurses, and
                pharmacists at the relevant branch.
              </li>
              <li>
                <strong>Technology partners:</strong> Wix (CMS and CRM
                platform), Vercel (hosting), and Omise (payment processing),
                each bound by data processing agreements.
              </li>
              <li>
                <strong>Regulatory authorities:</strong> where required by Thai
                law or court order.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              5. Data Retention
            </h2>
            <p>
              We retain personal data for as long as necessary to fulfil the
              purposes described above, typically:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Appointment and contact data:</strong> 3 years from your
                last interaction, or as required by Thai healthcare regulations.
              </li>
              <li>
                <strong>Health / medical data:</strong> 7 years from the date
                of service, in accordance with Thai medical record retention
                requirements.
              </li>
              <li>
                <strong>Payment records:</strong> 5 years for tax and accounting
                compliance.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              6. Your Rights Under the PDPA
            </h2>
            <p>As a data subject, you have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Access</strong> your personal data held by us.
              </li>
              <li>
                <strong>Rectify</strong> inaccurate or incomplete data.
              </li>
              <li>
                <strong>Erase</strong> your data (subject to legal retention
                obligations).
              </li>
              <li>
                <strong>Restrict</strong> processing of your data.
              </li>
              <li>
                <strong>Data portability</strong> in a commonly used format.
              </li>
              <li>
                <strong>Object</strong> to processing based on legitimate
                interests.
              </li>
              <li>
                <strong>Withdraw consent</strong> at any time without affecting
                the lawfulness of prior processing.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact our Data Protection
              Officer at{' '}
              <a
                href="mailto:info@samuihomeclinic.com"
                className="text-[#5ec4cb] underline hover:no-underline"
              >
                info@samuihomeclinic.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              7. Cookies
            </h2>
            <p>
              We use essential cookies to operate this website. For details, see
              our{' '}
              <a href="cookies" className="text-[#5ec4cb] underline hover:no-underline">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              8. Security
            </h2>
            <p>
              We implement appropriate technical and organisational measures to
              protect your data, including TLS encryption in transit, access
              controls on sensitive health data collections, and API key
              authentication for all administrative writes. In the event of a
              data breach likely to affect your rights, we will notify you and
              the PDPC within 72 hours of becoming aware.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last
              updated&rdquo; date at the top of this page reflects the most recent
              revision. Continued use of our services after an update constitutes
              acceptance of the revised Policy.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              10. Contact Us
            </h2>
            <p>
              Samui Home Clinic — Data Protection Officer
              <br />
              Email:{' '}
              <a
                href="mailto:info@samuihomeclinic.com"
                className="text-[#5ec4cb] underline hover:no-underline"
              >
                info@samuihomeclinic.com
              </a>
              <br />
              Phone: +66 92-278-1988
              <br />
              Address: Chaweng, Koh Samui, Surat Thani 84320, Thailand
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
