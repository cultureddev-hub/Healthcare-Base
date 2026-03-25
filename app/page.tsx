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
    <main id="main-content" className="min-h-screen bg-[#fbfbfb] text-[#080708] font-sans selection:bg-[#a8dfe2]">
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
