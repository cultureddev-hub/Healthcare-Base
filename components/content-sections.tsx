"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, X, ShieldCheck, Star, MapPin, Search, ShoppingCart, Pill } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 bg-white scroll-mt-20" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side — clip-path reveal on image only; outer stays overflow-visible for badge */}
          <div className="relative mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(15% 15% 15% 15% round 2rem)", y: 0 }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              animate={{ y: [0, -10, 0] }}
              className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl"
            >
              <video
                src="/assets/Samui_home_clinic_hero_video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
            {/* Floating stats card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-4 -right-3 md:-bottom-6 md:-right-6 bg-[#3eb5bd] text-white p-3 md:p-5 rounded-2xl shadow-xl"
            >
              <p className="text-3xl md:text-4xl font-heading font-bold mb-1">15+</p>
              <p className="text-xs md:text-sm font-medium text-[#c9eff2]">Years of Experience</p>
            </motion.div>
          </div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="block w-fit mx-auto md:mx-0 px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold uppercase tracking-wider mb-6">
              About Us
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#080708] mb-6 leading-tight">
              Put Your Health in <br />
              <span className="text-[#3eb5bd]">Safe Hands</span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-prose">
              Welcome to Samui Home Clinic, your trusted healthcare partner on the island. We provide premium, English-speaking medical services tailored for tourists, expats, and residents. From urgent care to routine check-ups, our experienced team ensures you receive the highest standard of treatment in a comfortable and professional environment.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "State-of-the-art medical facilities",
                "Board-certified specialists",
                "Comprehensive care for all ages",
                "Patient-first approach",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-700 font-medium"
                >
                  <div className="bg-[#edf9fa] rounded-full p-1">
                    <CheckCircle2 className="text-[#3eb5bd]" size={18} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
              <Dialog.Trigger asChild>
                <button className="bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-lg shadow-[#3eb5bd]/20 hover:-translate-y-1 flex md:inline-flex items-center justify-center gap-2 w-full md:w-auto">
                  Learn More About Us
                  <ArrowRight size={18} />
                </button>
              </Dialog.Trigger>
              <AnimatePresence>
                {isOpen && (
                  <Dialog.Portal forceMount>
                    <Dialog.Overlay asChild>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#080708]/40 backdrop-blur-sm z-50"
                      />
                    </Dialog.Overlay>
                    <Dialog.Content asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-[50%] top-[50%] z-50 w-full max-w-4xl -translate-x-[50%] -translate-y-[50%] bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                      >
                        <div className="relative h-64 md:h-80 w-full">
                          <Image src="https://picsum.photos/seed/clinicexterior/1200/600" alt="Clinic Exterior" fill className="object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080708]/80 to-transparent"></div>
                          <div className="absolute bottom-8 left-8 right-8 text-white">
                            <Dialog.Title className="text-3xl md:text-4xl font-heading font-bold mb-2">Samui Home Clinic</Dialog.Title>
                            <p className="text-[#a8dfe2] text-lg">Premium Healthcare on Koh Samui</p>
                          </div>
                          <Dialog.Close asChild>
                            <button className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                              <X size={20} />
                            </button>
                          </Dialog.Close>
                        </div>
                        
                        <div className="p-8 md:p-12">
                          <div className="grid md:grid-cols-3 gap-12">
                            <div className="md:col-span-2 space-y-6">
                              <h3 className="text-2xl font-bold text-[#080708]">Our Story</h3>
                              <p className="text-slate-600 leading-relaxed">
                                Founded with a vision to elevate healthcare standards on Koh Samui, Samui Home Clinic has grown into a trusted network of premium medical facilities. We understand the unique needs of our diverse patient base, which is why we prioritize clear communication, international standards of care, and a patient-centric approach.
                              </p>
                              <p className="text-slate-600 leading-relaxed">
                                Our team comprises highly qualified, English-speaking doctors and specialists who are dedicated to providing compassionate and effective treatment. Whether you are visiting the island for a short holiday or call it home, we are here to ensure your health is always in safe hands.
                              </p>
                              
                              <h3 className="text-2xl font-bold text-[#080708] pt-6">Why Choose Us?</h3>
                              <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <ShieldCheck className="text-[#3eb5bd] mb-4" size={32} />
                                  <h4 className="font-bold text-[#080708] mb-2">International Standards</h4>
                                  <p className="text-sm text-slate-600">We adhere to strict medical protocols to ensure the highest quality of care.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <Star className="text-[#3eb5bd] mb-4" size={32} />
                                  <h4 className="font-bold text-[#080708] mb-2">5-Star Patient Care</h4>
                                  <p className="text-sm text-slate-600">Our focus is on your comfort, recovery, and overall well-being.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <CheckCircle2 className="text-[#3eb5bd] mb-4" size={32} />
                                  <h4 className="font-bold text-[#080708] mb-2">English-Speaking Team</h4>
                                  <p className="text-sm text-slate-600">Clear communication is key. Our medical professionals are fluent in English.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <ShieldCheck className="text-[#3eb5bd] mb-4" size={32} />
                                  <h4 className="font-bold text-[#080708] mb-2">Transparent Pricing</h4>
                                  <p className="text-sm text-slate-600">No hidden fees. We provide clear, upfront costs for all our treatments.</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-lg font-bold text-[#080708] mb-4 uppercase tracking-wider">Our Branches</h3>
                                <div className="space-y-3">
                                  <a href="https://maps.app.goo.gl/hfATkg4Hj7XUEybQ7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                                    <MapPin className="text-[#3eb5bd] shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                                    <div>
                                      <p className="font-bold text-[#080708] group-hover:text-[#2d9aa2] transition-colors">Chaweng Clinic</p>
                                      <p className="text-sm text-slate-500">Main branch, fully equipped for all emergencies.</p>
                                    </div>
                                  </a>
                                  <a href="https://maps.app.goo.gl/X4cxxB1y7bCsVPGe7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                                    <MapPin className="text-[#3eb5bd] shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                                    <div>
                                      <p className="font-bold text-[#080708] group-hover:text-[#2d9aa2] transition-colors">Bangrak Clinic</p>
                                      <p className="text-sm text-slate-500">Conveniently located for northern island residents.</p>
                                    </div>
                                  </a>
                                  <a href="https://maps.app.goo.gl/2PzKU2FYWFWSp1D2A" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                                    <MapPin className="text-[#3eb5bd] shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                                    <div>
                                      <p className="font-bold text-[#080708] group-hover:text-[#2d9aa2] transition-colors">Rajabhat University</p>
                                      <p className="text-sm text-slate-500">Serving the student and local community.</p>
                                    </div>
                                  </a>
                                </div>
                              </div>
                              
                              <div className="bg-[#edf9fa] p-6 rounded-2xl border border-[#c9eff2]">
                                <h3 className="font-bold text-[#0d4a4e] mb-2">Need immediate assistance?</h3>
                                <p className="text-sm text-[#2d9aa2] mb-4">Our emergency line is open 24/7.</p>
                                <a href="tel:+660806696915" className="block w-full text-center bg-[#3eb5bd] hover:bg-[#35a0a8] text-white py-3 rounded-xl font-bold transition-colors">
                                  Call +66 080-669-6915
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                )}
              </AnimatePresence>
            </Dialog.Root>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Icons for the process cards
const processStepIcons = [
  // Step 1: Book
  () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  // Step 2: Consult
  () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.71 12 19.79 19.79 0 0 1 1.63 3.36 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  // Step 3: Treatment
  () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
];

export function HowItWorks() {
  const steps = [
    {
      title: "Book Appointment",
      desc: "Schedule your visit online in under 60 seconds or call our 24/7 hotline. Choose your preferred clinic, time, and doctor.",
    },
    {
      title: "Expert Consultation",
      desc: "Meet with our board-certified, English-speaking healthcare providers in person, at your hotel, or online.",
    },
    {
      title: "Treatment & Care",
      desc: "Receive a personalised treatment plan, prescriptions, and ongoing support until you are fully recovered.",
    },
  ];

  return (
    <section className="py-24 bg-white scroll-mt-20" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold uppercase tracking-wider mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#080708] mb-6 leading-tight">
            How It Works
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
            We&apos;ve streamlined our entire healthcare process so you get the care you need — fast, without the wait, and always with expert hands.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* 3 cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
            {steps.map((step, i) => {
              const Icon = processStepIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative rounded-xl border border-slate-200 bg-white p-6 cursor-default hover:border-[#3eb5bd]/60 hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4 w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-[#3eb5bd] flex items-center justify-center text-slate-600 group-hover:text-white transition-all duration-300">
                    <Icon />
                  </div>
                  <h3 className="text-base font-bold text-[#080708] mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  {/* Step number */}
                  <span className="absolute top-4 right-4 text-xs font-bold text-slate-300 group-hover:text-[#7fd3d7] transition-colors duration-300">
                    0{i + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsuranceTrust() {
  const shouldReduceMotion = useReducedMotion();
  const logos = [
    { name: "Air Doctor", gradient: { from: "#3b82f6", via: "#6366f1", to: "#8b5cf6" } },
    { name: "Best Service Group", gradient: { from: "#10b981", via: "#14b8a6", to: "#06b6d4" } },
    { name: "Dr. Walter", gradient: { from: "#f59e0b", via: "#f97316", to: "#ef4444" } },
    { name: "Collinson", gradient: { from: "#8b5cf6", via: "#a855f7", to: "#ec4899" } },
    { name: "Post Office", gradient: { from: "#06b6d4", via: "#3b82f6", to: "#6366f1" } },
    { name: "Balt Assistance", gradient: { from: "#ec4899", via: "#f43f5e", to: "#f97316" } },
  ];

  return (
    <>
      <style>{`
        @keyframes insurance-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <section className="py-24 bg-[#080708] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Centered header */}
          <div className="text-center pb-10 mb-10 border-b border-white/10">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#7fd3d7] text-xs font-bold uppercase tracking-wider mb-5">
              Insurance & Billing
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight leading-tight mb-4">
              We Accept Your Insurance
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Samui Home Clinic accepts most international and travel insurance providers. Our team handles medical reports, claim documentation, and direct billing so you can focus on getting better.
            </p>
          </div>

          {/* Marquee */}
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="flex w-max items-center gap-4 py-2 pr-4"
              style={{ animation: shouldReduceMotion ? "none" : "insurance-marquee 40s linear infinite" }}
              onMouseEnter={e => { if (!shouldReduceMotion) e.currentTarget.style.animationPlayState = "paused"; }}
              onMouseLeave={e => { if (!shouldReduceMotion) e.currentTarget.style.animationPlayState = "running"; }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="group relative h-24 w-44 shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 overflow-hidden cursor-default"
                >
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${logo.gradient.from}, ${logo.gradient.via}, ${logo.gradient.to})`,
                    }}
                    className="absolute inset-0 opacity-0 scale-150 transition-all duration-700 ease-out group-hover:opacity-20 group-hover:scale-100"
                  />
                  <span className="relative text-sm font-bold text-slate-300 group-hover:text-white transition-colors duration-300 text-center px-3 leading-snug">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export function Pharmacy() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const categories = ["All", "Prescription", "Over-the-Counter", "Vitamins", "First Aid"];

  const products = [
    { id: 1, name: "Paracetamol 500mg", category: "Over-the-Counter", price: "฿50", desc: "Pain relief and fever reduction." },
    { id: 2, name: "Vitamin C 1000mg", category: "Vitamins", price: "฿350", desc: "Immune system support." },
    { id: 3, name: "First Aid Kit Basic", category: "First Aid", price: "฿450", desc: "Essential supplies for minor injuries." },
    { id: 4, name: "Antihistamine", category: "Over-the-Counter", price: "฿120", desc: "Allergy relief medication." },
    { id: 5, name: "Antibiotic Ointment", category: "First Aid", price: "฿180", desc: "Prevents infection in minor cuts." },
    { id: 6, name: "Multivitamin Complex", category: "Vitamins", price: "฿550", desc: "Daily essential nutrients." },
  ];

  const getQty = (id: number) => quantities[id] ?? 1;
  const updateQty = (id: number, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));
  };
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-16 border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold uppercase tracking-wider mb-4">
                Pharmacy
              </div>
              {/* Mobile-only image: between badge and heading */}
              <div className="block lg:hidden mb-6 relative h-48 w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/209d18_46c5c1b416b549718be1f89953b14c11~mv2.jpg/v1/fill/w_981,h_540,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pharmnacy-4.jpg"
                  alt="Pharmacy"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#080708] mb-6">
                Samui Home Pharmacy Is Here
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Discover affordable healthcare essentials, connect instantly with our clinical team via online consultation, and browse a comprehensive range of premium, high-quality medical products designed for your wellbeing.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-[#3eb5bd]" />English-Speaking Expert Pharmacists
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-[#3eb5bd]" />PEP & PrEP Available
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-[#3eb5bd]" />Island Delivery (Koh Samui, Koh Phangan, Koh Tao)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-[#3eb5bd]" />Nationwide Shipping (Thailand)
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {/* OTC products → open order modal */}
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="whitespace-nowrap bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-5 py-3 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3eb5bd]/20"
                >
                  <ShoppingCart size={18} />
                  Order Online
                </button>
                {/*
                  COMP-02 (PDPA): PEP/PrEP and prescription inquiries must NOT
                  go through the order modal or any CRM form. Route to WhatsApp only
                  until a full consent and prescription verification framework is live.
                */}
                <a
                  href={`https://wa.me/660806696915?text=${encodeURIComponent('Hello, I would like to speak with a pharmacist about PEP/PrEP availability at Samui Home Clinic.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-3 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Inquiry
                </a>
                <a href="https://maps.app.goo.gl/a9QLAsG7YieYjmDx9" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap bg-[#080708] hover:bg-slate-800 text-white px-5 py-3 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2">
                  <MapPin size={18} />
                  Get Directions
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <a href="https://wa.me/66806696915" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                  <div className="bg-[#edf9fa] text-[#3eb5bd] p-2 rounded-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">WhatsApp</p>
                    <p className="text-sm font-bold text-[#080708]">+66 80 669 6915</p>
                  </div>
                </a>
                <a href="tel:0936512888" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                  <div className="bg-[#c9eff2] text-[#3eb5bd] p-2 rounded-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Direct Call</p>
                    <p className="text-sm font-bold text-[#080708]">093-651-2888</p>
                  </div>
                </a>
                <a href="tel:+66936512888" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all sm:col-span-2">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">International Calls</p>
                    <p className="text-sm font-bold text-[#080708]">+66 93 651 2888</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:block relative h-80 md:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://static.wixstatic.com/media/209d18_46c5c1b416b549718be1f89953b14c11~mv2.jpg/v1/fill/w_981,h_540,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pharmnacy-4.jpg"
                alt="Pharmacy delivery"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <Dialog.Root open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <AnimatePresence>
          {isOrderModalOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-[#080708]/40 backdrop-blur-sm"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-x-0 bottom-0 z-50 h-[90vh] bg-white rounded-t-[2rem] shadow-2xl flex flex-col overflow-hidden"
                >
                  {/* Header & Search */}
                  <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-6 md:px-10">
                    <div className="flex items-center justify-between mb-6">
                      <Dialog.Title className="text-2xl md:text-3xl font-heading font-bold text-[#080708] flex items-center gap-3">
                        <Pill className="text-emerald-500" size={32} />
                        Pharmacy Catalogue
                      </Dialog.Title>
                      <Dialog.Close className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-[#080708] transition-colors">
                        <X size={20} />
                      </Dialog.Close>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="text"
                          placeholder="Search medications, vitamins, first aid..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#3eb5bd] focus:ring-2 focus:ring-[#c9eff2] outline-none transition-all"
                        />
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar shrink-0">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                              selectedCategory === cat
                                ? "bg-[#080708] text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-grow overflow-y-auto p-6 md:p-10 bg-slate-50">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                      {/* Left: Products Grid */}
                      <div className="lg:col-span-2">
                        {filteredProducts.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredProducts.map((product) => (
                              <div
                                key={product.id}
                                className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-[#c9eff2] hover:shadow-md transition-all flex flex-col"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-xs font-bold text-[#2d9aa2] bg-[#edf9fa] px-2 py-1 rounded-md">
                                    {product.category}
                                  </span>
                                  <span className="font-bold text-[#080708]">{product.price}</span>
                                </div>
                                <h3 className="text-lg font-bold text-[#080708] mb-1">{product.name}</h3>
                                <p className="text-sm text-slate-500 mb-4 flex-grow">{product.desc}</p>

                                {/* Quantity selector */}
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity</span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => updateQty(product.id, -1)}
                                      className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
                                    >−</button>
                                    <span className="w-6 text-center text-sm font-bold text-[#080708]">{getQty(product.id)}</span>
                                    <button
                                      onClick={() => updateQty(product.id, 1)}
                                      className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
                                    >+</button>
                                  </div>
                                </div>

                                <button className="w-full py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                  <ShoppingCart size={16} />
                                  Add to Request
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="h-48 flex flex-col items-center justify-center text-slate-500 bg-white rounded-2xl border border-slate-100">
                            <Search size={32} className="mb-3 text-slate-300" />
                            <p className="font-medium">No products found.</p>
                          </div>
                        )}
                      </div>

                      {/* Right: Contact Grid */}
                      <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 sticky top-0">
                          <h3 className="text-xl font-bold text-[#080708] mb-2">Need a Prescription?</h3>
                          <p className="text-sm text-slate-600 mb-6">Contact our pharmacists directly to order prescription medications or get expert advice.</p>
                          
                          <div className="flex flex-col gap-3">
                            <a href="https://wa.me/66806696915" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#edf9fa] border border-slate-100 hover:border-[#c9eff2] transition-all group">
                              <div className="bg-[#edf9fa] text-[#3eb5bd] p-2 rounded-lg group-hover:bg-[#c9eff2] transition-colors">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">WhatsApp Order</p>
                                <p className="text-sm font-bold text-[#080708]">+66 80 669 6915</p>
                              </div>
                            </a>
                            <a href="tel:0936512888" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#edf9fa] border border-slate-100 hover:border-[#c9eff2] transition-all group">
                              <div className="bg-[#c9eff2] text-[#3eb5bd] p-2 rounded-lg group-hover:bg-[#a8dfe2] transition-colors">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">Call Pharmacist</p>
                                <p className="text-sm font-bold text-[#080708]">093-651-2888</p>
                              </div>
                            </a>
                            <a href="tel:+66936512888" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">International</p>
                                <p className="text-sm font-bold text-[#080708]">+66 93 651 2888</p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
