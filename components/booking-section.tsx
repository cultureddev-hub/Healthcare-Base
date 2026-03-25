"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  Search,
  ArrowLeft
} from "lucide-react";
import { useBooking } from "./booking-context";
import { CustomSelect } from "./custom-select";

export function BookingCalendar({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
}: {
  selectedDate: Date | null;
  onDateSelect: (d: Date) => void;
  selectedTime: string;
  onTimeSelect: (t: string) => void;
}) {
  const [viewDate, setViewDate] = useState(() => new Date());

  const MONTH_NAMES = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMins = i * 15;
    const h = Math.floor(totalMins / 60) + 9;
    const m = totalMins % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  });

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div className="flex flex-col md:flex-row rounded-2xl border border-white/10 overflow-hidden bg-white/5">
      {/* Calendar side */}
      <div className="flex-1 p-4">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            aria-label="Previous month"
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3eb5bd]"
          >
            <ChevronLeftIcon size={16} />
          </button>
          <span className="text-sm font-semibold text-white">
            {MONTH_NAMES[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            aria-label="Next month"
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3eb5bd]"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-xs font-bold text-slate-500 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const cellDate = new Date(year, month, day);
            cellDate.setHours(0, 0, 0, 0);
            const isPast = cellDate < today;
            const isSelected =
              selectedDate !== null &&
              cellDate.toDateString() === selectedDate.toDateString();
            const isToday = cellDate.toDateString() === today.toDateString();
            return (
              <button
                key={i}
                disabled={isPast}
                onClick={() => onDateSelect(cellDate)}
                className={`w-full aspect-square flex items-center justify-center rounded-lg text-sm transition-all
                  ${isPast ? "text-slate-700 cursor-not-allowed" : "hover:bg-white/10 cursor-pointer"}
                  ${isSelected ? "bg-[#3eb5bd] text-white font-bold hover:bg-[#3eb5bd]" : ""}
                  ${isToday && !isSelected ? "border border-[#3eb5bd]/50 text-[#7fd3d7]" : ""}
                  ${!isSelected && !isPast && !isToday ? "text-slate-300" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots side */}
      <div className="md:w-36 border-t md:border-t-0 md:border-l border-white/10 max-h-64 overflow-y-auto p-3 no-scrollbar">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Time</p>
        <div className="grid gap-1">
          {timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => onTimeSelect(t)}
              className={`text-xs min-h-[44px] px-2 rounded-lg border transition-all text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#3eb5bd] ${
                selectedTime === t
                  ? "bg-[#3eb5bd]/20 border-[#3eb5bd] text-[#7fd3d7] font-semibold"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BookingForm({ isModal = false }: { isModal?: boolean }) {
  const { selectedService } = useBooking();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Step 1 State
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [department, setDepartment] = useState("");
  const [service, setService] = useState("");

  // Step 2 State
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState<Date | null>(null);
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
    setIsSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Booking submitted successfully!");
      setStep(1);
      setSearchQuery("");
      setDepartment("");
      setService("");
      setBranch("");
      setDate(null);
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
    }, 1000);
  };

  return (
    <div className={`${isModal ? 'bg-[#080708]' : 'bg-white/5 border border-white/10 backdrop-blur-xl'} rounded-[2rem] p-6 md:p-8 shadow-2xl`}>
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#3eb5bd] rounded-full z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>

              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                    step >= num
                      ? "bg-[#3eb5bd] text-white"
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
                            className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:ring-2 focus:ring-[#3eb5bd] focus:border-transparent transition-all"
                            placeholder="Search..."
                          />
                          {!searchQuery && (
                            <div className="absolute inset-y-0 left-11 flex items-center pointer-events-none text-slate-400">
                              Search <span className="ml-1 text-[#5ec4cb] font-medium">{SEARCH_PLACEHOLDERS[placeholderIndex]}</span>
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
                        <CustomSelect
                          value={department}
                          onChange={(v) => { setDepartment(v); setService(""); }}
                          placeholder="Select Department"
                          options={DEPARTMENTS.map(d => ({ value: d.id, label: d.name }))}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Service
                        </label>
                        <CustomSelect
                          value={service}
                          onChange={setService}
                          disabled={!department}
                          placeholder="Select Service"
                          options={department ? (SERVICES[department] ?? []).map(s => ({ value: s.id, label: s.name })) : []}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!searchQuery && !service}
                      className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] disabled:bg-slate-700 disabled:text-slate-500 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-6"
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
                        <CustomSelect
                          value={branch}
                          onChange={setBranch}
                          placeholder="Select Branch"
                          options={BRANCHES.map(b => ({ value: b, label: b }))}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Date &amp; Time
                        </label>
                        <BookingCalendar
                          selectedDate={date}
                          onDateSelect={setDate}
                          selectedTime={time}
                          onTimeSelect={setTime}
                        />
                        {date && time && (
                          <p className="mt-3 text-xs text-slate-400 text-center">
                            Booked for{" "}
                            <span className="text-white font-semibold">
                              {date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })}
                            </span>{" "}
                            at <span className="text-white font-semibold">{time}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!branch || !date || !time}
                      className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] disabled:bg-slate-700 disabled:text-slate-500 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-6"
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
                      <div className="space-y-1">
                        <label htmlFor="booking-fullname" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                        <input
                          id="booking-fullname"
                          type="text"
                          placeholder="Full Name"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base placeholder-slate-500 focus:ring-2 focus:ring-[#3eb5bd] focus:border-transparent outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label htmlFor="booking-whatsapp" className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp</label>
                          <input
                            id="booking-whatsapp"
                            type="tel"
                            placeholder="+66 000 000 0000"
                            required
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base placeholder-slate-500 focus:ring-2 focus:ring-[#3eb5bd] focus:border-transparent outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="booking-email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
                          <input
                            id="booking-email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base placeholder-slate-500 focus:ring-2 focus:ring-[#3eb5bd] focus:border-transparent outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                          value={formData.nationality}
                          onChange={(v) => setFormData({...formData, nationality: v})}
                          placeholder="Nationality"
                          options={[
                            { value: "th", label: "Thailand" },
                            { value: "us", label: "United States" },
                            { value: "uk", label: "United Kingdom" },
                            { value: "au", label: "Australia" },
                            { value: "cn", label: "China" },
                            { value: "ru", label: "Russia" },
                            { value: "de", label: "Germany" },
                            { value: "fr", label: "France" },
                            { value: "it", label: "Italy" },
                            { value: "es", label: "Spain" },
                            { value: "se", label: "Sweden" },
                            { value: "no", label: "Norway" },
                            { value: "dk", label: "Denmark" },
                            { value: "fi", label: "Finland" },
                            { value: "nl", label: "Netherlands" },
                            { value: "be", label: "Belgium" },
                            { value: "ch", label: "Switzerland" },
                            { value: "at", label: "Austria" },
                            { value: "pl", label: "Poland" },
                            { value: "cz", label: "Czech Republic" },
                            { value: "ca", label: "Canada" },
                            { value: "nz", label: "New Zealand" },
                            { value: "za", label: "South Africa" },
                            { value: "in", label: "India" },
                            { value: "jp", label: "Japan" },
                            { value: "kr", label: "South Korea" },
                            { value: "sg", label: "Singapore" },
                            { value: "my", label: "Malaysia" },
                            { value: "id", label: "Indonesia" },
                            { value: "ph", label: "Philippines" },
                            { value: "vn", label: "Vietnam" },
                            { value: "hk", label: "Hong Kong" },
                            { value: "tw", label: "Taiwan" },
                            { value: "il", label: "Israel" },
                            { value: "ae", label: "United Arab Emirates" },
                            { value: "sa", label: "Saudi Arabia" },
                            { value: "br", label: "Brazil" },
                            { value: "ar", label: "Argentina" },
                            { value: "mx", label: "Mexico" },
                            { value: "pt", label: "Portugal" },
                            { value: "gr", label: "Greece" },
                            { value: "ie", label: "Ireland" },
                            { value: "ua", label: "Ukraine" },
                            { value: "other", label: "Other" },
                          ]}
                        />
                        <div className="space-y-1">
                          <label htmlFor="booking-dob" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date of Birth</label>
                          <input
                            id="booking-dob"
                            type="date"
                            required
                            value={formData.dob}
                            onChange={(e) => setFormData({...formData, dob: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base placeholder-slate-500 focus:ring-2 focus:ring-[#3eb5bd] focus:border-transparent outline-none"
                          />
                        </div>
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
                                className="text-[#3eb5bd] focus:ring-[#3eb5bd] bg-white/5 border-white/10"
                                required
                              />
                              <span className="text-sm text-slate-300">{g}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="booking-concerns" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medical Concerns <span className="normal-case font-normal">(optional)</span></label>
                        <textarea
                          id="booking-concerns"
                          placeholder="Describe your symptoms or reason for visit"
                          rows={3}
                          value={formData.concerns}
                          onChange={(e) => setFormData({...formData, concerns: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-base placeholder-slate-500 focus:ring-2 focus:ring-[#3eb5bd] focus:border-transparent outline-none resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] disabled:opacity-70 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                            Confirming...
                          </>
                        ) : (
                          <>Confirm Booking <CheckCircle2 size={18} /></>
                        )}
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
      className="py-20 bg-[#080708] text-white overflow-hidden relative"
      id="fast-booking"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#3eb5bd]/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500/20 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3eb5bd]/10 border border-[#3eb5bd]/20 text-[#5ec4cb] text-sm font-medium mb-6">
              <Calendar size={16} />
              <span>Fast Booking</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Book your visit in <span className="text-[#5ec4cb]">60 seconds</span>
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
                  <CheckCircle2 className="text-[#3eb5bd]" size={20} />
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
