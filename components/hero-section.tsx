"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  ShieldCheck,
  Star,
  ArrowRight,
  FileText,
  Send,
  Activity,
  MapPin,
  Clock
} from "lucide-react";
import { useBooking } from "./booking-context";

const WORDS = ["Tourists", "Expats", "Residents"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const { scrollToBooking, setIsCatalogueOpen } = useBooking();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-bold mb-6 shadow-sm">
              ⭐ 5-Star Trusted by 2,000+ Patients
            </div>

            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              English-Speaking <br />
              Doctors For{" "}
              <span className="relative inline-block text-blue-600 min-w-[280px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    {WORDS[index]}
                  </motion.span>
                </AnimatePresence>
                {/* Green Scribble Underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  width="200"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 9.5C45.5 3.5 115 -1.5 197.5 5.5"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Access expert medical care for your family, anytime and anywhere.
              No need to wait 2+ hours for medical support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={scrollToBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Book an Appointment
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setIsCatalogueOpen(true)}
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-md"
              >
                View Services
              </button>
            </div>

            {/* Location Badges */}
            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Our Clinics</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <a href="https://maps.app.goo.gl/hfATkg4Hj7XUEybQ7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <MapPin size={16} className="text-blue-500 group-hover:text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Chaweng</span>
                </a>
                <a href="https://maps.app.goo.gl/X4cxxB1y7bCsVPGe7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <MapPin size={16} className="text-blue-500 group-hover:text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Bangrak</span>
                </a>
                <a href="https://maps.app.goo.gl/2PzKU2FYWFWSp1D2A" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <MapPin size={16} className="text-blue-500 group-hover:text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Rajabhat University</span>
                </a>
              </div>
              
              {/* Operating Hours */}
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Clock size={14} className="text-slate-500" /> Mon-Fri (9:00 AM – 7:00 PM)
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Clock size={14} className="text-slate-500" /> Sat-Sun (9:00 AM – 5:00 PM)
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100">
                  <Clock size={14} className="text-amber-500" /> Lunch Break (12:00 PM – 1:30 PM)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image/Bento Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] lg:aspect-square shadow-2xl">
              <Image
                src="https://picsum.photos/seed/doctorfamily/800/800"
                alt="Doctor with family"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>

              {/* Floating Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Certified
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    Top Rated Doctors
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function BentoFeatures() {
  const { scrollToBooking } = useBooking();

  return (
    <section className="py-16 lg:py-24 bg-[#fbfbfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big Typography Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 uppercase tracking-tight leading-none">
            Patient <span className="text-blue-600">Benefits</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-[#e9edc9] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="relative z-10 w-full md:w-3/5 pr-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Activity className="text-slate-700" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 uppercase tracking-wide">
                Walk-In Care Availability
              </h3>
              <p className="text-slate-700 text-base leading-relaxed mb-8">
                No appointment? No problem. Our clinics are ready to provide immediate care for urgent medical needs.
              </p>
              <button 
                onClick={scrollToBooking}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
              >
                Book Now <ArrowRight size={16} />
              </button>
            </div>
            {/* Background Graphic/Image */}
            <div className="hidden md:block absolute right-0 bottom-0 top-0 w-2/5 opacity-20 group-hover:opacity-30 transition-opacity">
              <Image src="https://picsum.photos/seed/walkin/400/600" alt="Walk-in care" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-[#ffb5a7] rounded-[2rem] p-8 flex flex-col justify-between relative group"
          >
            <div>
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <FileText className="text-slate-700" size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">
                English & Thai-Speaking Doctors
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed mb-8">
                Clear communication is key to good healthcare. Our bilingual team ensures nothing is lost in translation.
              </p>
            </div>
            <button 
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors w-fit"
            >
              Book Now <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-[#c1fba4] rounded-[2rem] p-8 flex flex-col justify-between relative group"
          >
            <div>
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Send className="text-slate-700" size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">
                Patient Drop-Off & Pick-Up
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed mb-8">
                We offer complimentary transport services to and from our clinics for your convenience.
              </p>
            </div>
            <button 
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors w-fit"
            >
              Order Pick-Up <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-8 bg-[#a0c4ff] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="relative z-10 w-full md:w-3/5 pr-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="text-slate-700" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 uppercase tracking-wide">
                Premium Home & Hotel Call-Out
              </h3>
              <p className="text-slate-800 text-base leading-relaxed mb-8">
                Too sick to travel? Our expert doctors will come to your home, hotel, or villa for premium medical care.
              </p>
              <button 
                onClick={scrollToBooking}
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors w-fit"
              >
                Request a Visit <ArrowRight size={16} />
              </button>
            </div>
            {/* Background Graphic/Image */}
            <div className="hidden md:block absolute right-0 bottom-0 top-0 w-2/5 opacity-20 group-hover:opacity-30 transition-opacity">
              <Image src="https://picsum.photos/seed/hotelvisit/400/600" alt="Home visit" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-6 bg-[#fdfd96] rounded-[2rem] p-8 flex flex-col justify-between relative group"
          >
            <div>
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Star className="text-slate-700" size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">
                Seamless Booking Experience
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed mb-8">
                Book your appointment in seconds with our streamlined online booking engine.
              </p>
            </div>
            <button 
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors w-fit"
            >
              Book Now <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-6 bg-[#ffd6a5] rounded-[2rem] p-8 flex flex-col justify-between relative group"
          >
            <div>
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Activity className="text-slate-700" size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">
                Online Consultations
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed mb-8">
                Connect with our doctors virtually from anywhere in the world for expert medical advice.
              </p>
            </div>
            <button 
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors w-fit"
            >
              Book Now <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
