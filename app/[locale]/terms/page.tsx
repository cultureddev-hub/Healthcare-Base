/**
 * app/[locale]/terms/page.tsx
 * Terms of Service — Samui Home Clinic
 *
 * Governing terms for patients using the clinic's booking platform,
 * home visit service, and online pharmacy. English-first; Thai translation
 * to be provided by a certified legal translator before Thai launch.
 *
 * Layout: Minimal Single Column (max-w-3xl, 65-75 char line length)
 */

import type { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Terms of Service | Samui Home Clinic',
  description:
    'Terms and conditions governing the use of Samui Home Clinic services, including online bookings, home visits, and the Samui Home Pharmacy.',
};

const LAST_UPDATED = '10 April 2026';

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before
              using the Samui Home Clinic website or services. By accessing our
              website or making a booking, you agree to be bound by these Terms.
              If you do not agree, please do not use our services.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              1. About Samui Home Clinic
            </h2>
            <p>
              Samui Home Clinic is a private medical clinic registered in
              Thailand, operating branches in Chaweng, Bangrak, and Rajabhat
              University on Koh Samui, as well as home visit services across
              Koh Samui, Koh Phangan, and Koh Tao. We provide general practice,
              specialist consultations, nursing services, and home pharmacy
              delivery.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              2. Medical Disclaimer
            </h2>
            <p>
              Our services are intended for non-emergency medical consultations
              and routine healthcare. We do{' '}
              <strong>not</strong> operate an emergency department.
            </p>
            <p className="mt-3 font-semibold text-slate-900">
              If you are experiencing a life-threatening emergency, call
              Thailand Emergency Services immediately: dial <strong>1669</strong>{' '}
              (ambulance) or <strong>191</strong> (police).
            </p>
            <p className="mt-3">
              Information provided on this website is for general informational
              purposes only and does not constitute medical advice, diagnosis, or
              treatment. Always seek the advice of a qualified healthcare
              professional.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              3. Booking and Appointments
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Appointments submitted via our website are requests only.
                Confirmation is subject to staff availability and clinic
                capacity.
              </li>
              <li>
                We will confirm your appointment via WhatsApp or email within
                our operating hours (Mon–Fri 08:30–20:00, Sat–Sun 09:00–18:00).
              </li>
              <li>
                Please arrive on time. We reserve the right to reschedule
                appointments where a patient arrives more than 15 minutes late
                without prior notice.
              </li>
              <li>
                Cancellations should be made at least 2 hours before the
                scheduled appointment time by contacting us via WhatsApp or
                email.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              4. Home Visit Services
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Home visit availability is subject to the location being within
                our service area on Koh Samui, Koh Phangan, or Koh Tao.
              </li>
              <li>
                Travel fees may apply depending on the distance from the nearest
                clinic branch. Our team will confirm any additional charges
                before dispatch.
              </li>
              <li>
                We reserve the right to decline a home visit where safety
                concerns for our staff exist.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              5. Samui Home Pharmacy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Prescription (Rx) medications require a valid prescription
                issued by a licensed physician. Submission of a false or altered
                prescription is unlawful under Thai law.
              </li>
              <li>
                Pharmacy orders are subject to stock availability and pharmacist
                approval before dispatch.
              </li>
              <li>
                Delivery is available across Koh Samui, Koh Phangan, and Koh
                Tao. Estimated delivery times are provided at the time of order
                confirmation.
              </li>
              <li>
                Payment is required before dispatch. We will provide a payment
                link via WhatsApp upon order approval.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              6. Payment and Pricing
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All prices are in Thai Baht (THB) and inclusive of VAT where
                applicable.
              </li>
              <li>
                We accept payment by credit/debit card and bank transfer via
                our secure payment partner, Omise.
              </li>
              <li>
                Service fees are confirmed prior to treatment or order dispatch.
                We do not charge without prior agreement.
              </li>
              <li>
                Insurance claims assistance is available for participating
                insurers. Patients are responsible for understanding their own
                policy coverage.
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by Thai law, Samui Home Clinic
              shall not be liable for any indirect, incidental, or consequential
              loss arising from the use of our services or website, including
              but not limited to loss of data, loss of revenue, or any harm
              resulting from reliance on information provided on this site.
            </p>
            <p className="mt-3">
              Our total liability to you for any claim arising from these Terms
              shall not exceed the amount you paid for the specific service
              giving rise to the claim.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              8. Intellectual Property
            </h2>
            <p>
              All content on this website — including text, images, logos, and
              design — is the property of Samui Home Clinic or its licensors and
              is protected by Thai and international copyright law. You may not
              reproduce, distribute, or create derivative works without our
              express written permission.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              9. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the Kingdom of Thailand.
              Any disputes shall be subject to the exclusive jurisdiction of the
              Thai courts in Surat Thani Province.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              10. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. The &ldquo;Last
              updated&rdquo; date at the top reflects the most recent revision.
              Continued use of our services after an update constitutes
              acceptance of the revised Terms.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              11. Contact Us
            </h2>
            <p>
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
