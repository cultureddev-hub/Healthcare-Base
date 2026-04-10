/**
 * app/[locale]/cookies/page.tsx
 * Cookie Policy — Samui Home Clinic
 *
 * Explains what cookies are set on samuihomeclinic.com, their purpose,
 * and how patients can manage or opt out. English-first; Thai translation
 * to be provided by a certified legal translator before Thai launch.
 *
 * Layout: Minimal Single Column (max-w-3xl, 65-75 char line length)
 */

import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Cookie Policy | Samui Home Clinic',
  description:
    'Information about how Samui Home Clinic uses cookies on its website and how you can manage your cookie preferences.',
};

const LAST_UPDATED = '10 April 2026';

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              This Cookie Policy explains what cookies are, which cookies
              Samui Home Clinic sets on this website, and how you can control
              them. By continuing to use our website, you consent to our use of
              cookies as described in this Policy.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that a website stores on your device
              (computer, tablet, or mobile phone) when you visit. They allow the
              website to remember your actions and preferences over a period of
              time, so you don&apos;t have to re-enter them whenever you return
              or navigate between pages.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              2. Cookies We Use
            </h2>
            <p>We use the following categories of cookies:</p>

            <div className="mt-4 space-y-5">
              <div className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-1">
                  Essential Cookies
                </h3>
                <p className="text-sm">
                  These cookies are strictly necessary for the website to
                  function. They enable core features such as page navigation,
                  the booking form session, and the pharmacy cart. You cannot
                  opt out of essential cookies while using the site.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Legal basis: Legitimate interests (website operation)
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-1">
                  Preference Cookies
                </h3>
                <p className="text-sm">
                  We store your selected language (English or Thai) in a
                  preference cookie so it persists across visits. No personal
                  health data is stored in this cookie.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Legal basis: Consent
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-1">
                  Analytics Cookies
                </h3>
                <p className="text-sm">
                  We may use privacy-friendly, anonymised analytics to
                  understand how visitors use our website (e.g., which pages
                  are most visited). No personally identifiable information is
                  collected. IP addresses are anonymised before storage.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Legal basis: Consent — you can opt out at any time (see
                  Section 4 below)
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-1">
                  Third-Party Cookies
                </h3>
                <p className="text-sm">
                  Our payment partner Omise may set cookies during the checkout
                  process. These are governed by Omise&apos;s own privacy and cookie
                  policy. We do not control third-party cookies.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Legal basis: Contract performance (payment processing)
                </p>
              </div>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              3. Cookie Retention
            </h2>
            <p>
              Essential and preference cookies are retained for up to 12 months
              or until you clear your browser storage. Analytics cookies (if
              used) are retained for no longer than 13 months.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              4. Managing and Opting Out
            </h2>
            <p>
              You can control and delete cookies through your browser settings.
              Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>View all cookies stored on your device.</li>
              <li>Delete all or specific cookies.</li>
              <li>Block cookies from specific websites.</li>
              <li>Block all third-party cookies.</li>
            </ul>
            <p className="mt-3">
              Please note that disabling essential cookies will impair your
              ability to use the booking form and pharmacy cart.
            </p>
            <p className="mt-3">
              Browser-specific cookie management guides:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>
                <strong>Chrome:</strong> Settings → Privacy and security →
                Cookies and other site data
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy → Manage Website
                Data
              </li>
              <li>
                <strong>Firefox:</strong> Settings → Privacy &amp; Security →
                Cookies and Site Data
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              5. Changes to This Policy
            </h2>
            <p>
              We may update this Cookie Policy periodically. The &ldquo;Last
              updated&rdquo; date at the top reflects the most recent revision.
              We encourage you to review this Policy regularly.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              6. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies, please contact
              us:
            </p>
            <p className="mt-3">
              Samui Home Clinic
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
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
