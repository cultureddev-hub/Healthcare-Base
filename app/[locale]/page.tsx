/**
 * app/[locale]/page.tsx
 * Localised home page — /en and /th
 *
 * The locale param is available here for future use by server components
 * that need to pass locale down as a prop (e.g. to fetch localised CMS data).
 * Client components read locale via useLocale() hook from hooks/use-locale.ts.
 */

import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';
import { Hero, BentoFeatures } from '@/components/hero-section';
import { BentoBooking } from '@/components/booking-section';
import {
  About,
  HowItWorks,
  InsuranceTrust,
  Pharmacy,
} from '@/components/content-sections';
import { Services, Team } from '@/components/services-section';
import { Testimonials, FAQ, Blog } from '@/components/social-proof';
import { getPharmacyInventory } from '@/app/actions/pharmacy-inventory';
import { getTeam } from '@/app/actions/cms';

const locales = ['en', 'th'] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleHomeProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Fetch pharmacy inventory server-side — passed as prop to the Pharmacy
  // client component. Falls back to empty array on network error (non-fatal).
  const pharmacyProducts = await getPharmacyInventory();
  const teamMembers = await getTeam();

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#fbfbfb] text-[#080708] font-sans selection:bg-[#a8dfe2]"
    >
      <Navbar />

      {/* Shared blob background — spans Hero + Patient Benefits seamlessly */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob-a absolute -top-[15%] -right-[15%] w-[65%] h-[65%] rounded-full bg-[#5ec4cb]/10 blur-[130px]" />
          <div className="blob-b absolute top-[55%] -left-[10%] w-[55%] h-[55%] rounded-full bg-emerald-400/10 blur-[110px]" />
          <div className="blob-c absolute top-[25%] left-[25%] w-[45%] h-[45%] rounded-full bg-indigo-300/8 blur-[90px]" />
        </div>
        <Hero />
        <BentoFeatures />
      </div>

      <BentoBooking />
      <About />
      <HowItWorks />
      <Services />
      <InsuranceTrust />
      <Pharmacy products={pharmacyProducts} />
      <Testimonials />
      <Team members={teamMembers} />
      <FAQ />
      <Blog />

      <Footer />
    </main>
  );
}
