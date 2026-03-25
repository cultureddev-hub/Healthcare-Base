import { Navbar, Footer } from "@/components/layout";
import { Hero, BentoFeatures } from "@/components/hero-section";
import { BentoBooking } from "@/components/booking-section";
import {
  About,
  HowItWorks,
  InsuranceTrust,
  Pharmacy,
} from "@/components/content-sections";
import { Services, Team } from "@/components/services-section";
import { Testimonials, FAQ, Blog } from "@/components/social-proof";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfb] text-slate-900 font-sans selection:bg-blue-200">
      <Navbar />

      {/* Hero Section with Outcome-focused headline */}
      <Hero />

      {/* Bento-box style features (from screenshot 1) */}
      <BentoFeatures />

      {/* Bento-box style multi step form for booking */}
      <BentoBooking />

      {/* About us section */}
      <About />

      {/* A simple "How it Works" visual section */}
      <HowItWorks />

      {/* Patient Services Slider/Grid */}
      <Services />

      {/* Insurance Trust section */}
      <InsuranceTrust />

      {/* Pharmacy feature section */}
      <Pharmacy />

      {/* Dynamic auto-scroll Social Proof Slider */}
      <Testimonials />

      {/* Team feature section */}
      <Team />

      {/* accordion style FAQs */}
      <FAQ />

      {/* Blog posts section */}
      <Blog />

      <Footer />
    </main>
  );
}
