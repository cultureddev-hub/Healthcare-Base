"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import {
  ArrowRight,
  FileText,
  Send,
  Activity,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useBooking } from "./booking-context";
import { BookingCalendar } from "./booking-section";
import { CustomSelect } from "./custom-select";

const WORDS = ["Tourists", "Expats", "Residents"];

// ─────────────────────────────────────────────────────────────────
// Hero Section — centered, 21st.dev animated-hero pattern
// ─────────────────────────────────────────────────────────────────
export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => WORDS, []);
  const { scrollToBooking, setIsCatalogueOpen } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles, shouldReduceMotion]);

  return (
    <section className="relative pt-10 pb-14 sm:pt-20 sm:pb-24 lg:pt-32 lg:pb-36">

<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-8"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1D84D7]/10 border border-[#1D84D7]/30 text-[#1D84D7] text-xs sm:text-sm font-bold shadow-sm">
            <Star size={13} className="fill-[#1D84D7] text-[#1D84D7]" />
            5-Star · 500+ Reviews
          </div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#1e6b70] text-xs sm:text-sm font-bold shadow-sm">
            <ShieldCheck size={13} className="text-[#3eb5bd]" />
            2,000+ Patients Treated
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          aria-label="English-Speaking Doctors For Tourists, Expats & Residents in Koh Samui"
          className="text-[2.5rem] sm:text-[3.3rem] lg:text-[5rem] font-heading font-extrabold text-[#080708] leading-[1.1] tracking-tight mb-4"
        >
          English-Speaking <br />
          Doctors For{" "}
          <span className="relative flex w-full justify-center overflow-hidden text-center pb-4 pt-1 mt-2">
            {/* Static text for search crawlers — visually hidden, always in DOM */}
            <span className="sr-only">Tourists, Expats &amp; Residents in Koh Samui</span>
            &nbsp;
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute font-extrabold text-[#3eb5bd]"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 150 }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : shouldReduceMotion
                    ? { opacity: 0, y: 0 }
                    : {
                        y: titleNumber > index ? -150 : 150,
                        opacity: 0,
                      }
                }
              >
                {title}
                {/* Green scribble underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 9.5C45.5 3.5 115 -1.5 197.5 5.5"
                    stroke="#1D84D7"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-10 max-w-xl mx-auto leading-relaxed mt-3 sm:mt-6"
        >
          Access expert medical care for your family, anytime and anywhere.
          No need to wait 2+ hours for medical support.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-14"
        >
          <button
            onClick={scrollToBooking}
            className="bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all shadow-lg shadow-[#3eb5bd]/20 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Book an Appointment
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => setIsCatalogueOpen(true)}
            className="bg-white hover:bg-slate-50 text-[#080708] border border-slate-200 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-md"
          >
            View Services
          </button>
        </motion.div>

        {/* Location Badges + Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-slate-200"
        >
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Our Clinics</p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <a href="https://maps.app.goo.gl/hfATkg4Hj7XUEybQ7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#7fd3d7] hover:bg-[#edf9fa] transition-all group shadow-sm">
              <MapPin size={16} className="text-[#1D84D7] group-hover:text-[#1D84D7]" />
              <span className="text-sm font-semibold text-slate-700 group-hover:text-[#2d9aa2]">Chaweng</span>
            </a>
            <a href="https://maps.app.goo.gl/X4cxxB1y7bCsVPGe7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#7fd3d7] hover:bg-[#edf9fa] transition-all group shadow-sm">
              <MapPin size={16} className="text-[#1D84D7] group-hover:text-[#1D84D7]" />
              <span className="text-sm font-semibold text-slate-700 group-hover:text-[#2d9aa2]">Bangrak</span>
            </a>
            <a href="https://maps.app.goo.gl/2PzKU2FYWFWSp1D2A" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#7fd3d7] hover:bg-[#edf9fa] transition-all group shadow-sm">
              <MapPin size={16} className="text-[#1D84D7] group-hover:text-[#1D84D7]" />
              <span className="text-sm font-semibold text-slate-700 group-hover:text-[#2d9aa2]">Rajabhat University</span>
            </a>
          </div>

          {/* Operating Hours */}
          <div className="flex flex-wrap gap-3 justify-center text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5 bg-[#1D84D7]/10 px-3 py-1.5 rounded-lg text-[#1D84D7]">
              <Clock size={14} className="text-[#1D84D7]" /> Mon-Fri (9:00 AM – 7:00 PM)
            </div>
            <div className="flex items-center gap-1.5 bg-[#1D84D7]/10 px-3 py-1.5 rounded-lg text-[#1D84D7]">
              <Clock size={14} className="text-[#1D84D7]" /> Sat-Sun (9:00 AM – 5:00 PM)
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100">
              <Clock size={14} className="text-amber-500" /> Lunch Break (12:00 PM – 1:30 PM)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Patient Benefits Bento Grid
// Cards 1, 2, 5 → scrollToBooking
// Cards 3, 4, 6 → open booking modals
// ─────────────────────────────────────────────────────────────────
export function BentoFeatures() {
  const { scrollToBooking } = useBooking();
  const [isPickUpOpen, setIsPickUpOpen] = useState(false);
  const [isHomeVisitOpen, setIsHomeVisitOpen] = useState(false);
  const [isOnlineConsultOpen, setIsOnlineConsultOpen] = useState(false);

  return (
    <>
      <section className="py-16 lg:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#080708] uppercase tracking-tight leading-none">
              Patient <span className="text-[#3eb5bd]">Benefits</span>
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 no-scrollbar md:grid md:grid-cols-12 md:overflow-visible md:pb-0 md:mx-0 md:px-0 md:gap-6">
            {/* Card 1 — Walk-In Care: scrollToBooking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-[80vw] shrink-0 snap-start md:w-auto md:col-span-8 bg-[#e9edc9] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="relative z-10 w-full md:w-3/5 pr-4">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Activity className="text-slate-700" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-[#080708] mb-3 uppercase tracking-wide">
                  Walk-In Care Availability
                </h3>
                <p className="text-slate-700 text-base leading-relaxed mb-8">
                  No appointment? No problem. Our clinics are ready to provide immediate care for urgent medical needs.
                </p>
                <button
                  onClick={scrollToBooking}
                  className="inline-flex items-center gap-2 bg-[#080708] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Book Now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Card 2 — English Doctors: scrollToBooking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-[80vw] shrink-0 snap-start md:w-auto md:col-span-4 bg-[#ffb5a7] rounded-[2rem] p-8 flex flex-col justify-between relative group"
            >
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <FileText className="text-slate-700" size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#080708] mb-3 uppercase tracking-wide">
                  English & Thai-Speaking Doctors
                </h3>
                <p className="text-slate-800 text-sm leading-relaxed mb-8">
                  Clear communication is key to good healthcare. Our bilingual team ensures nothing is lost in translation.
                </p>
              </div>
              <button
                onClick={scrollToBooking}
                className="inline-flex items-center gap-2 bg-white text-[#080708] px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors w-fit"
              >
                Book Now <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Card 3 — Pick-Up: modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-[80vw] shrink-0 snap-start md:w-auto md:col-span-4 bg-[#c1fba4] rounded-[2rem] p-8 flex flex-col justify-between relative group"
            >
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Send className="text-slate-700" size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#080708] mb-3 uppercase tracking-wide">
                  Patient Drop-Off & Pick-Up
                </h3>
                <p className="text-slate-800 text-sm leading-relaxed mb-8">
                  We offer complimentary transport services to and from our clinics for your convenience.
                </p>
              </div>
              <button
                onClick={() => setIsPickUpOpen(true)}
                className="inline-flex items-center gap-2 bg-[#080708] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors w-fit"
              >
                Order Pick-Up <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Card 4 — Home Visit: modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-[80vw] shrink-0 snap-start md:w-auto md:col-span-8 bg-[#a0c4ff] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="relative z-10 w-full md:w-3/5 pr-4">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <ShieldCheck className="text-slate-700" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-[#080708] mb-3 uppercase tracking-wide">
                  Premium Home & Hotel Call-Out
                </h3>
                <p className="text-slate-800 text-base leading-relaxed mb-8">
                  Too sick to travel? Our expert doctors will come to your home, hotel, or villa for premium medical care.
                </p>
                <button
                  onClick={() => setIsHomeVisitOpen(true)}
                  className="inline-flex items-center gap-2 bg-white text-[#080708] px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors w-fit"
                >
                  Request a Visit <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Card 5 — Seamless Booking: scrollToBooking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-[80vw] shrink-0 snap-start md:w-auto md:col-span-6 bg-[#fdfd96] rounded-[2rem] p-8 flex flex-col justify-between relative group"
            >
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Star className="text-slate-700" size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#080708] mb-3 uppercase tracking-wide">
                  Seamless Booking Experience
                </h3>
                <p className="text-slate-800 text-sm leading-relaxed mb-8">
                  Book your appointment in seconds with our streamlined online booking engine.
                </p>
              </div>
              <button
                onClick={scrollToBooking}
                className="inline-flex items-center gap-2 bg-[#080708] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors w-fit"
              >
                Book Now <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Card 6 — Online Consultations: modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="w-[80vw] shrink-0 snap-start md:w-auto md:col-span-6 bg-[#ffd6a5] rounded-[2rem] p-8 flex flex-col justify-between relative group"
            >
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Activity className="text-slate-700" size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#080708] mb-3 uppercase tracking-wide">
                  Online Consultations
                </h3>
                <p className="text-slate-800 text-sm leading-relaxed mb-8">
                  Connect with our doctors virtually from anywhere in the world for expert medical advice.
                </p>
              </div>
              <button
                onClick={() => setIsOnlineConsultOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-[#080708] px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors w-fit"
              >
                Book Now <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Modals */}
      {isPickUpOpen && (
        <PickUpBookingModal onClose={() => setIsPickUpOpen(false)} />
      )}
      {isHomeVisitOpen && (
        <HomeVisitBookingModal onClose={() => setIsHomeVisitOpen(false)} />
      )}
      {isOnlineConsultOpen && (
        <OnlineConsultBookingModal onClose={() => setIsOnlineConsultOpen(false)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Multi-Step Booking Modals
// ─────────────────────────────────────────────────────────────────


function ModalWrapper({ title, subtitle, onClose, children }: { title: string, subtitle: string, onClose: () => void, children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#080708]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#080708] rounded-3xl p-6 md:p-8 max-w-md w-full text-white z-10 shadow-2xl border border-white/10 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-lg leading-none z-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          ×
        </button>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">{title}</h2>
          <p className="text-white/60 text-sm">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function PickUpBookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [formData, setFormData] = useState({ fullName: "", whatsapp: "", address: "" });

  const isStep1Valid = date && time;
  const isStep2Valid = formData.fullName && formData.whatsapp && formData.address;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          whatsapp: formData.whatsapp,
          address: formData.address,
          date: date ? date.toISOString() : null,
          time,
          type: "pickup",
          pdpaConsent: true,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper title={submitted ? "Request Received" : "Order Pick-Up"} subtitle={submitted ? "" : "Schedule transport to our clinic."} onClose={onClose}>
      {submitted ? (
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <div className="w-16 h-16 rounded-full bg-[#3eb5bd]/20 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-[#3eb5bd]" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Your request has been received!</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              One of our staff members will get in touch via WhatsApp shortly to confirm your booking.
            </p>
          </div>
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">You requested</p>
            <p className="text-white font-semibold flex items-center gap-2">
              <span className="text-[#3eb5bd]">🚗</span> A Patient Pick-Up
            </p>
          </div>
          <button onClick={onClose} className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-semibold transition-colors text-sm">
            Close
          </button>
        </div>
      ) : (
      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Date &amp; Time</label>
              <BookingCalendar selectedDate={date} onDateSelect={setDate} selectedTime={time} onTimeSelect={setTime} />
              {date && time && (
                <p className="mt-2 text-xs text-slate-400 text-center">
                  {date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })} at <span className="text-white font-semibold">{time}</span>
                </p>
              )}
            </div>
            <button onClick={() => setStep(2)} disabled={!isStep1Valid} className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] disabled:bg-slate-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4">
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setStep(1)} className="p-2 hover:bg-white/10 rounded-full"><ArrowLeft size={18} /></button>
              <span className="font-bold">Contact Details</span>
            </div>
            <div className="space-y-1">
              <label htmlFor="pickup-name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input id="pickup-name" type="text" placeholder="Full Name" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]"/>
            </div>
            <div className="space-y-1">
              <label htmlFor="pickup-whatsapp" className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Number</label>
              <input id="pickup-whatsapp" type="tel" placeholder="+66 000 000 0000" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]"/>
            </div>
            <div className="space-y-1">
              <label htmlFor="pickup-address" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pick-up Address</label>
              <input id="pickup-address" type="text" placeholder="Hotel / Villa name or address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]"/>
            </div>
            {/* PDPA Consent — COMP-01 */}
            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={pdpaConsent}
                onChange={e => setPdpaConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#3eb5bd] focus:ring-[#3eb5bd] shrink-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 leading-relaxed">
                I consent to Samui Home Clinic collecting my personal data for this transport request, per Thailand&apos;s <span className="text-[#7fd3d7]">PDPA (B.E. 2562)</span>.
              </span>
            </label>
            <button type="submit" disabled={!isStep2Valid || !pdpaConsent || isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 cursor-pointer">
              {isSubmitting ? (
                <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Submitting...</>
              ) : (
                <>Request Pick Up <CheckCircle2 size={18} /></>
              )}
            </button>
            {submitError && <p className="text-sm text-red-400 text-center">{submitError}</p>}
          </form>
        )}
      </div>
      )}
    </ModalWrapper>
  );
}

export function HomeVisitBookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [pharmacyRedirect, setPharmacyRedirect] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [formData, setFormData] = useState({ fullName: "", whatsapp: "", symptoms: "" });

  const isStep1Valid = address && date && time;
  const isStep2Valid = formData.fullName && formData.whatsapp;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          whatsapp: formData.whatsapp,
          symptoms: formData.symptoms,
          address,
          date: date ? date.toISOString() : null,
          time,
          type: "home-visit",
          pdpaConsent: true,
        }),
      });
      const json = await res.json();
      // COMP-02: Pharmacy keyword detected — route to confidential channel
      if (json.redirect === "pharmacy") {
        setPharmacyRedirect(json.whatsappUrl);
        return;
      }
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // COMP-02: Pharmacy intercept screen — no booking created, staff handles offline
  if (pharmacyRedirect) {
    return (
      <ModalWrapper title="Confidential Enquiry" subtitle="" onClose={onClose}>
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
            <ShieldCheck size={32} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Speak with a Pharmacist</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              For this type of request, our pharmacist is available for a private, confidential consultation. Please contact us directly.
            </p>
          </div>
          <div className="w-full space-y-3">
            <a href={pharmacyRedirect} target="_blank" rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              WhatsApp a Pharmacist
            </a>
            <a href="tel:+660806696915"
              className="w-full bg-white/10 hover:bg-white/15 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              Call Us Now
            </a>
          </div>
          <button onClick={onClose} className="text-xs text-slate-500 hover:text-slate-300 underline">Close</button>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper title={submitted ? "Request Received" : "Request a Home Visit"} subtitle={submitted ? "" : "Premium call-out to your location."} onClose={onClose}>
      {submitted ? (
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <div className="w-16 h-16 rounded-full bg-[#3eb5bd]/20 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-[#3eb5bd]" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Your request has been received!</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              One of our staff members will get in touch via WhatsApp shortly to confirm your booking.
            </p>
          </div>
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">You requested</p>
            <p className="text-white font-semibold flex items-center gap-2">
              <span className="text-[#3eb5bd]">🏠</span> A Home &amp; Hotel Call-Out
            </p>
          </div>
          <button onClick={onClose} className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-semibold transition-colors text-sm">
            Close
          </button>
        </div>
      ) : (
      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="homevisit-address" className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Where are you?</label>
              <input id="homevisit-address" type="text" placeholder="Hotel or Villa Name / Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Date &amp; Time</label>
              <BookingCalendar selectedDate={date} onDateSelect={setDate} selectedTime={time} onTimeSelect={setTime} />
              {date && time && (
                <p className="mt-2 text-xs text-slate-400 text-center">
                  {date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })} at <span className="text-white font-semibold">{time}</span>
                </p>
              )}
            </div>
            <button onClick={() => setStep(2)} disabled={!isStep1Valid} className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] disabled:bg-slate-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4">
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setStep(1)} className="p-2 hover:bg-white/10 rounded-full"><ArrowLeft size={18} /></button>
              <span className="font-bold">Patient Details</span>
            </div>
            <div className="space-y-1">
              <label htmlFor="homevisit-name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input id="homevisit-name" type="text" placeholder="Full Name" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]"/>
            </div>
            <div className="space-y-1">
              <label htmlFor="homevisit-whatsapp" className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Number</label>
              <input id="homevisit-whatsapp" type="tel" placeholder="+66 000 000 0000" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]"/>
            </div>
            <div className="space-y-1">
              <label htmlFor="homevisit-symptoms" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Symptoms <span className="normal-case font-normal">(optional)</span></label>
              <textarea id="homevisit-symptoms" placeholder="Briefly describe your symptoms" rows={3} value={formData.symptoms} onChange={e => setFormData({...formData, symptoms: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd] resize-none"/>
            </div>
            {/* PDPA Consent — COMP-01 */}
            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={pdpaConsent}
                onChange={e => setPdpaConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#3eb5bd] focus:ring-[#3eb5bd] shrink-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 leading-relaxed">
                I consent to Samui Home Clinic collecting and processing my personal data for this home visit request, per Thailand&apos;s <span className="text-[#7fd3d7]">PDPA (B.E. 2562)</span>.
              </span>
            </label>
            <button type="submit" disabled={!isStep2Valid || !pdpaConsent || isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 cursor-pointer">
              {isSubmitting ? (
                <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Submitting...</>
              ) : (
                <>Request a Visit <CheckCircle2 size={18} /></>
              )}
            </button>
            {submitError && <p className="text-sm text-red-400 text-center">{submitError}</p>}
          </form>
        )}
      </div>
      )}
    </ModalWrapper>
  );
}

export function OnlineConsultBookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [provider, setProvider] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [formData, setFormData] = useState({ fullName: "", whatsapp: "", email: "" });

  const isStep1Valid = provider && department;
  const isStep2Valid = date && time;
  const isStep3Valid = formData.fullName && formData.whatsapp && formData.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          whatsapp: formData.whatsapp,
          email: formData.email,
          provider,
          department,
          date: date ? date.toISOString() : null,
          time,
          service: `Online Consultation — ${department}`,
          type: "online-consultation",
          pdpaConsent: true,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper title={submitted ? "Request Received" : "Book Online Consultation"} subtitle={submitted ? "" : "Expert medical advice from anywhere."} onClose={onClose}>
      {submitted ? (
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <div className="w-16 h-16 rounded-full bg-[#3eb5bd]/20 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-[#3eb5bd]" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Your request has been received!</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              One of our staff members will get in touch via WhatsApp shortly to confirm your booking.
            </p>
          </div>
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">You requested</p>
            <p className="text-white font-semibold flex items-center gap-2">
              <span className="text-[#3eb5bd]">💻</span> An Online Consultation
            </p>
          </div>
          <button onClick={onClose} className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-semibold transition-colors text-sm">
            Close
          </button>
        </div>
      ) : (
      <div className="space-y-6">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 rounded-full transition-all ${step === i ? 'w-8 bg-[#3eb5bd]' : 'w-2 bg-white/20'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Consult With</label>
              <CustomSelect
                value={provider}
                onChange={setProvider}
                placeholder="Select Provider"
                options={[
                  { value: "doctor", label: "Doctor" },
                  { value: "pharmacist", label: "Pharmacist" },
                ]}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Department</label>
              <CustomSelect
                value={department}
                onChange={setDepartment}
                placeholder="Select Department"
                options={[
                  { value: "general", label: "General Medicine" },
                  { value: "pediatrics", label: "Pediatrics" },
                  { value: "skin", label: "Dermatology & Skin" },
                  { value: "mens-health", label: "Men's Health" },
                ]}
              />
            </div>
            <button onClick={() => setStep(2)} disabled={!isStep1Valid} className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] disabled:bg-slate-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4">
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setStep(1)} className="p-2 hover:bg-white/10 rounded-full"><ArrowLeft size={18} /></button>
              <span className="font-bold">Select Date &amp; Time</span>
            </div>
            <div>
              <BookingCalendar selectedDate={date} onDateSelect={setDate} selectedTime={time} onTimeSelect={setTime} />
              {date && time && (
                <p className="mt-2 text-xs text-slate-400 text-center">
                  {date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })} at <span className="text-white font-semibold">{time}</span>
                </p>
              )}
            </div>
            <button onClick={() => setStep(3)} disabled={!isStep2Valid} className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] disabled:bg-slate-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4">
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setStep(2)} className="p-2 hover:bg-white/10 rounded-full"><ArrowLeft size={18} /></button>
              <span className="font-bold">Patient Details</span>
            </div>
            <div className="space-y-1">
              <label htmlFor="consult-name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input id="consult-name" type="text" placeholder="Full Name" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]"/>
            </div>
            <div className="space-y-1">
              <label htmlFor="consult-email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address <span className="normal-case font-normal">(for Zoom link)</span></label>
              <input id="consult-email" type="email" placeholder="you@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]"/>
            </div>
            <div className="space-y-1">
              <label htmlFor="consult-whatsapp" className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Number</label>
              <input id="consult-whatsapp" type="tel" placeholder="+66 000 000 0000" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base outline-none focus:ring-2 focus:ring-[#3eb5bd]"/>
            </div>
            {/* PDPA Consent — COMP-01 */}
            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={pdpaConsent}
                onChange={e => setPdpaConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#3eb5bd] focus:ring-[#3eb5bd] shrink-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 leading-relaxed">
                I consent to Samui Home Clinic collecting my personal data for this consultation request, per Thailand&apos;s <span className="text-[#7fd3d7]">PDPA (B.E. 2562)</span>.
              </span>
            </label>
            <button type="submit" disabled={!isStep3Valid || !pdpaConsent || isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 cursor-pointer">
              {isSubmitting ? (
                <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Submitting...</>
              ) : (
                <>Request a Consultation <CheckCircle2 size={18} /></>
              )}
            </button>
            {submitError && <p className="text-sm text-red-400 text-center">{submitError}</p>}
          </form>
        )}
      </div>
      )}
    </ModalWrapper>
  );
}
