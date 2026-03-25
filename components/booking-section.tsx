"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ChevronRight,
  Search,
  ArrowLeft
} from "lucide-react";
import { useBooking } from "./booking-context";

export function BookingForm({ isModal = false }: { isModal?: boolean }) {
  const { selectedService } = useBooking();
  const [step, setStep] = useState(1);
  
  // Step 1 State
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [department, setDepartment] = useState("");
  const [service, setService] = useState("");

  // Step 2 State
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Step 3 State
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    nationality: "",
    gender: "",
    dob: "",
    concerns: ""
  });

  const SEARCH_PLACEHOLDERS = ["services", "treatment", "test", "vaccine", "IV Drip"];

  const DEPARTMENTS = [
    { id: "all", name: "All services" },
    { id: "general", name: "General Medical Care" },
    { id: "vaccines", name: "Vaccines" },
    { id: "sexual-health", name: "Sexual Health" },
    { id: "iv-drip", name: "IV Drip Therapy" },
    { id: "testing", name: "Medical Testing & Certificates" },
    { id: "mens-health", name: "Men's Health" },
    { id: "skin-care", name: "Skin Care" },
  ];

  const SERVICES: Record<string, { id: string; name: string }[]> = {
    all: [
      { id: "all-1", name: "Standard Consultation" },
      { id: "all-2", name: "Medical Certificate" },
      { id: "all-3", name: "Prescription Refill" },
    ],
    general: [
      { id: "gen-1", name: "Standard Consultation" },
      { id: "gen-2", name: "Medical Certificate" },
      { id: "gen-3", name: "Prescription Refill" },
    ],
    vaccines: [
      { id: "vac-1", name: "Flu Vaccine" },
      { id: "vac-2", name: "Travel Vaccines" },
    ],
    "sexual-health": [
      { id: "sh-1", name: "STD Testing" },
      { id: "sh-2", name: "Consultation" },
    ],
    "iv-drip": [
      { id: "iv-1", name: "Hydration Drip" },
      { id: "iv-2", name: "Vitamin C Drip" },
    ],
    testing: [
      { id: "test-1", name: "Blood Test" },
      { id: "test-2", name: "Fit to Fly Certificate" },
    ],
    "mens-health": [
      { id: "mh-1", name: "General Checkup" },
      { id: "mh-2", name: "Hormone Testing" },
    ],
    "skin-care": [
      { id: "sk-1", name: "Acne Treatment" },
      { id: "sk-2", name: "Skin Consultation" },
    ],
  };

  const BRANCHES = ["Chaweng", "Bangrak", "Rajabhat University"];
  const DATES = ["Today", "Tomorrow", "Wed, 25", "Thu, 26"];
  const TIMES = ["09:00 AM", "10:30 AM", "01:00 PM", "03:45 PM"];

  // Typewriter effect for search placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % 5); // Hardcoded length to avoid dependency warning
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Pre-fill service if selected from context
  useEffect(() => {
    if (selectedService && typeof selectedService === 'object') {
      // Use a timeout to avoid synchronous state update in effect warning
      const timer = setTimeout(() => {
        setDepartment(selectedService.department);
        setService(selectedService.service);
        // Do not auto-advance to step 2
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedService]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Booking submitted successfully!");
    setStep(1);
    setSearchQuery("");
    setDepartment("");
    setService("");
    setBranch("");
    setDate("");
    setTime("");
    setFormData({
      fullName: "",
      whatsapp: "",
      email: "",
      nationality: "",
      gender: "",
      dob: "",
      concerns: ""
    });
  };

  return (
    <div className={`${isModal ? 'bg-slate-900' : 'bg-white/5 border border-white/10 backdrop-blur-xl'} rounded-[2rem] p-6 md:p-8 shadow-2xl`}>
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>

              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                    step >= num
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800 text-slate-500 border border-white/10"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <div className="min-h-[380px] relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        What do you need help with?
                      </h3>
                      <p className="text-sm text-slate-400">
                        {isModal ? "Select a service to continue." : "Search or select a service to continue."}
                      </p>
                    </div>

                    {/* Search Bar */}
                    {!isModal && (
                      <>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Search..."
                          />
                          {!searchQuery && (
                            <div className="absolute inset-y-0 left-11 flex items-center pointer-events-none text-slate-400">
                              Search <span className="ml-1 text-blue-400 font-medium">{SEARCH_PLACEHOLDERS[placeholderIndex]}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="h-px bg-white/10 flex-1"></div>
                          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">or select manually</span>
                          <div className="h-px bg-white/10 flex-1"></div>
                        </div>
                      </>
                    )}

                    {/* Linked Dropdowns */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Department
                        </label>
                        <select
                          value={department}
                          onChange={(e) => {
                            setDepartment(e.target.value);
                            setService(""); // Reset service when department changes
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                        >
                          <option value="" className="text-slate-900">Select Department</option>
                          {DEPARTMENTS.map(dept => (
                            <option key={dept.id} value={dept.id} className="text-slate-900">{dept.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Service
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          disabled={!department}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="" className="text-slate-900">Select Service</option>
                          {department && SERVICES[department]?.map(srv => (
                            <option key={srv.id} value={srv.id} className="text-slate-900">{srv.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!searchQuery && !service}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-6"
                    >
                      Continue <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                      </button>
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          Where and when?
                        </h3>
                        <p className="text-sm text-slate-400">
                          Select logistics for your appointment.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Branch
                        </label>
                        <select
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                        >
                          <option value="" className="text-slate-900">Select Branch</option>
                          {BRANCHES.map(b => (
                            <option key={b} value={b} className="text-slate-900">{b}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Date
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {DATES.map((d) => (
                            <button
                              key={d}
                              onClick={() => setDate(d)}
                              className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                                date === d
                                  ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                  : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300"
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Time
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {TIMES.map((t) => (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                                time === t
                                  ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                  : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!branch || !date || !time}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-6"
                    >
                      Continue <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                      </button>
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          Patient Details
                        </h3>
                        <p className="text-sm text-slate-400">
                          Final step to confirm your booking.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="tel"
                          placeholder="WhatsApp Number"
                          required
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <select
                          required
                          value={formData.nationality}
                          onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                        >
                          <option value="" className="text-slate-900">Nationality</option>
                          <option value="us" className="text-slate-900">United States</option>
                          <option value="uk" className="text-slate-900">United Kingdom</option>
                          <option value="au" className="text-slate-900">Australia</option>
                          <option value="other" className="text-slate-900">Other</option>
                        </select>
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Gender
                        </label>
                        <div className="flex gap-4">
                          {["Male", "Female", "Other"].map((g) => (
                            <label key={g} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={formData.gender === g}
                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                className="text-blue-500 focus:ring-blue-500 bg-white/5 border-white/10"
                                required
                              />
                              <span className="text-sm text-slate-300">{g}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <textarea
                          placeholder="Medical concern or symptoms (optional)"
                          rows={3}
                          value={formData.concerns}
                          onChange={(e) => setFormData({...formData, concerns: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-6"
                      >
                        Confirm Booking <CheckCircle2 size={18} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
  );
}

export function BentoBooking() {
  return (
    <section
      className="py-20 bg-slate-900 text-white overflow-hidden relative"
      id="fast-booking"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500/20 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Calendar size={16} />
              <span>Fast Booking</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Book your visit in <span className="text-blue-400">under 2 minutes</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Our streamlined booking process gets you the care you need,
              exactly when you need it. Choose your service, pick a time, and
              you&apos;re set.
            </p>

            <ul className="space-y-4">
              {[
                "Same-day appointments available",
                "Secure, HIPAA-compliant platform",
                "Insurance verified instantly",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Bento Form */}
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
