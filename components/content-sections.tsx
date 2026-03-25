"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, X, ShieldCheck, Star, MapPin, Search, ShoppingCart, Pill, Activity } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="https://picsum.photos/seed/aboutclinic/800/600"
                alt="Clinic interior"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating stats card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-6 rounded-2xl shadow-xl hidden md:block"
            >
              <p className="text-4xl font-heading font-bold mb-1">15+</p>
              <p className="text-sm font-medium text-blue-100">
                Years of Experience
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              About Us
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
              Put Your Health in <br />
              <span className="text-blue-600">Safe Hands</span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
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
                  <div className="bg-emerald-100 rounded-full p-1">
                    <CheckCircle2 className="text-emerald-600" size={18} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
              <Dialog.Trigger asChild>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1 inline-flex items-center gap-2">
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
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
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
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                          <div className="absolute bottom-8 left-8 right-8 text-white">
                            <Dialog.Title className="text-3xl md:text-4xl font-heading font-bold mb-2">Samui Home Clinic</Dialog.Title>
                            <p className="text-blue-200 text-lg">Premium Healthcare on Koh Samui</p>
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
                              <h3 className="text-2xl font-bold text-slate-900">Our Story</h3>
                              <p className="text-slate-600 leading-relaxed">
                                Founded with a vision to elevate healthcare standards on Koh Samui, Samui Home Clinic has grown into a trusted network of premium medical facilities. We understand the unique needs of our diverse patient base, which is why we prioritize clear communication, international standards of care, and a patient-centric approach.
                              </p>
                              <p className="text-slate-600 leading-relaxed">
                                Our team comprises highly qualified, English-speaking doctors and specialists who are dedicated to providing compassionate and effective treatment. Whether you are visiting the island for a short holiday or call it home, we are here to ensure your health is always in safe hands.
                              </p>
                              
                              <h3 className="text-2xl font-bold text-slate-900 pt-6">Why Choose Us?</h3>
                              <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <ShieldCheck className="text-blue-600 mb-4" size={32} />
                                  <h4 className="font-bold text-slate-900 mb-2">International Standards</h4>
                                  <p className="text-sm text-slate-600">We adhere to strict medical protocols to ensure the highest quality of care.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <Star className="text-blue-600 mb-4" size={32} />
                                  <h4 className="font-bold text-slate-900 mb-2">5-Star Patient Care</h4>
                                  <p className="text-sm text-slate-600">Our focus is on your comfort, recovery, and overall well-being.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <CheckCircle2 className="text-blue-600 mb-4" size={32} />
                                  <h4 className="font-bold text-slate-900 mb-2">English-Speaking Team</h4>
                                  <p className="text-sm text-slate-600">Clear communication is key. Our medical professionals are fluent in English.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <ShieldCheck className="text-blue-600 mb-4" size={32} />
                                  <h4 className="font-bold text-slate-900 mb-2">Transparent Pricing</h4>
                                  <p className="text-sm text-slate-600">No hidden fees. We provide clear, upfront costs for all our treatments.</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wider">Our Branches</h3>
                                <div className="space-y-3">
                                  <a href="https://maps.app.goo.gl/hfATkg4Hj7XUEybQ7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                                    <MapPin className="text-blue-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                                    <div>
                                      <p className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Chaweng Clinic</p>
                                      <p className="text-sm text-slate-500">Main branch, fully equipped for all emergencies.</p>
                                    </div>
                                  </a>
                                  <a href="https://maps.app.goo.gl/X4cxxB1y7bCsVPGe7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                                    <MapPin className="text-blue-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                                    <div>
                                      <p className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Bangrak Clinic</p>
                                      <p className="text-sm text-slate-500">Conveniently located for northern island residents.</p>
                                    </div>
                                  </a>
                                  <a href="https://maps.app.goo.gl/2PzKU2FYWFWSp1D2A" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                                    <MapPin className="text-blue-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                                    <div>
                                      <p className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Rajabhat University</p>
                                      <p className="text-sm text-slate-500">Serving the student and local community.</p>
                                    </div>
                                  </a>
                                </div>
                              </div>
                              
                              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-2">Need immediate assistance?</h3>
                                <p className="text-sm text-blue-700 mb-4">Our emergency line is open 24/7.</p>
                                <a href="tel:+660806696915" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors">
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

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Book Appointment",
      desc: "Schedule your visit online in under 60 seconds or call our 24/7 hotline.",
      img: "https://picsum.photos/seed/step1/600/400",
    },
    {
      num: "02",
      title: "Expert Consultation",
      desc: "Meet with our board-certified, English-speaking healthcare providers.",
      img: "https://picsum.photos/seed/step2/600/400",
    },
    {
      num: "03",
      title: "Treatment & Care",
      desc: "Receive a personalized treatment plan and ongoing support for your recovery.",
      img: "https://picsum.photos/seed/step4/600/400",
    },
  ];

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Your Journey to Better Health
          </h2>
          <p className="text-lg text-slate-600">
            We&apos;ve streamlined our healthcare process to ensure you get the care you need without the wait.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent z-0"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col group"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Floating Number Badge */}
                <div className="absolute -bottom-6 left-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 group-hover:-translate-y-2 transition-transform duration-500">
                  <span className="text-2xl font-heading font-bold text-blue-600">{step.num}</span>
                </div>
              </div>
              
              <div className="pt-4 px-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InsuranceTrust() {
  const logos = [
    "Air doctor",
    "Best Service Group",
    "Dr Walter",
    "Collinson",
    "Post Office",
    "Balt Assistance Ltd"
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
          Insurance & Billing
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 max-w-3xl mx-auto leading-tight">
          We Accept Your Insurance
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-16">
          Samui Home Clinic accepts most international and travel insurance providers to ensure your treatment is as simple as possible.
          Our team handles the logistics by assisting with medical reports, claim documentation, and direct billing whenever available. We manage the administration so you can focus on getting better. Not sure if your provider is covered? Contact us today for a quick verification.
        </p>

        {/* Auto-scrolling Marquee */}
        <div className="relative w-full overflow-hidden flex bg-white/5 py-8 rounded-3xl border border-white/10">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
          
          <motion.div
            className="flex gap-16 items-center whitespace-nowrap px-8"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div key={i} className="text-xl md:text-2xl font-bold text-slate-400 opacity-70 hover:opacity-100 transition-opacity">
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Pharmacy() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Prescription", "Over-the-Counter", "Vitamins", "First Aid"];
  
  const products = [
    { id: 1, name: "Paracetamol 500mg", category: "Over-the-Counter", price: "฿50", desc: "Pain relief and fever reduction." },
    { id: 2, name: "Vitamin C 1000mg", category: "Vitamins", price: "฿350", desc: "Immune system support." },
    { id: 3, name: "First Aid Kit Basic", category: "First Aid", price: "฿450", desc: "Essential supplies for minor injuries." },
    { id: 4, name: "Antihistamine", category: "Over-the-Counter", price: "฿120", desc: "Allergy relief medication." },
    { id: 5, name: "Antibiotic Ointment", category: "First Aid", price: "฿180", desc: "Prevents infection in minor cuts." },
    { id: 6, name: "Multivitamin Complex", category: "Vitamins", price: "฿550", desc: "Daily essential nutrients." },
  ];

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
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                Pharmacy
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
                Samui Home Pharmacy Is Here
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Discover affordable healthcare essentials, connect instantly with our clinical team via online consultation, and browse a comprehensive range of premium, high-quality medical products designed for your wellbeing.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500" /> English-Speaking Expert Pharmacists
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500" /> PEP & PrEP Available
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Island Delivery (Koh Samui, Koh Phangan, Koh Tao)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Nationwide Shipping (Thailand)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => setIsOrderModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <ShoppingCart size={18} />
                  Order Online
                </button>
                <a href="https://maps.app.goo.gl/a9QLAsG7YieYjmDx9" target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2">
                  <MapPin size={18} />
                  Get Directions
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                <a href="https://wa.me/66806696915" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">WhatsApp</p>
                    <p className="text-sm font-bold text-slate-900">+66 80 669 6915</p>
                  </div>
                </a>
                <a href="tel:0936512888" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Direct Call</p>
                    <p className="text-sm font-bold text-slate-900">093-651-2888</p>
                  </div>
                </a>
                <a href="tel:+66936512888" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all sm:col-span-2">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">International Calls</p>
                    <p className="text-sm font-bold text-slate-900">+66 93 651 2888</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-80 md:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://picsum.photos/seed/pharmacy/800/800"
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
                  className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
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
                      <Dialog.Title className="text-2xl md:text-3xl font-heading font-bold text-slate-900 flex items-center gap-3">
                        <Pill className="text-emerald-500" size={32} />
                        Pharmacy Catalogue
                      </Dialog.Title>
                      <Dialog.Close className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
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
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar shrink-0">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                              selectedCategory === cat
                                ? "bg-emerald-600 text-white"
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
                                className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all flex flex-col"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                    {product.category}
                                  </span>
                                  <span className="font-bold text-slate-900">{product.price}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{product.name}</h3>
                                <p className="text-sm text-slate-500 mb-4 flex-grow">{product.desc}</p>
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
                          <h3 className="text-xl font-bold text-slate-900 mb-2">Need a Prescription?</h3>
                          <p className="text-sm text-slate-600 mb-6">Contact our pharmacists directly to order prescription medications or get expert advice.</p>
                          
                          <div className="flex flex-col gap-3">
                            <a href="https://wa.me/66806696915" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition-all group">
                              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">WhatsApp Order</p>
                                <p className="text-sm font-bold text-slate-900">+66 80 669 6915</p>
                              </div>
                            </a>
                            <a href="tel:0936512888" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all group">
                              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">Call Pharmacist</p>
                                <p className="text-sm font-bold text-slate-900">093-651-2888</p>
                              </div>
                            </a>
                            <a href="tel:+66936512888" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">International</p>
                                <p className="text-sm font-bold text-slate-900">+66 93 651 2888</p>
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
