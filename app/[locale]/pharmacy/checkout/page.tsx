/**
 * app/[locale]/pharmacy/checkout/page.tsx
 * Patient Fulfillment Request — checkout page
 *
 * Server Component shell that loads the locale dictionary and renders the
 * client-side PatientFulfillmentForm. Cart state is read from the Zustand
 * store on the client (localStorage-persisted, SSR-safe via skipHydration).
 *
 * Route: /en/pharmacy/checkout | /th/pharmacy/checkout
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';
import { PatientFulfillmentForm } from '@/components/pharmacy/patient-fulfillment-form';
import { Pill, ArrowLeft } from 'lucide-react';

const locales = ['en', 'th'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PharmacyCheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#080708] text-white font-sans selection:bg-[#a8dfe2]/30"
    >
      <Navbar />

      {/* Ambient blobs — matching the booking section aesthetic */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[55%] h-[55%] rounded-full bg-[#5ec4cb]/8 blur-[140px]" />
          <div className="absolute top-[50%] -left-[10%] w-[45%] h-[45%] rounded-full bg-emerald-400/6 blur-[120px]" />
        </div>

        <section className="relative z-10 py-16 md:py-24 px-4">
          <div className="max-w-2xl mx-auto">

            {/* Back link */}
            <Link
              href={`/${locale}#pharmacy`}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-8 transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Pharmacy
            </Link>

            {/* Page header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#7fd3d7] text-xs font-bold uppercase tracking-wider mb-5">
                <Pill size={12} />
                Samui Home Pharmacy
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3 leading-tight">
                Patient Fulfillment
                <br />
                <span className="text-[#3eb5bd]">Request</span>
              </h1>
              <p className="text-white/60 text-base leading-relaxed">
                Complete your details below. Our pharmacist will review your
                order and send a payment link to your WhatsApp — no upfront
                credit card details required.
              </p>
            </div>

            {/* Form card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8">
              <PatientFulfillmentForm />
            </div>

          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
