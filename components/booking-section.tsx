"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  Search,
  ArrowLeft,
  ShieldCheck
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
  const [submitError, setSubmitError] = useState("");
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [pharmacyRedirect, setPharmacyRedirect] = useState<string | null>(null);

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
    { id: "general-medicine",  name: "General Medicine" },
    { id: "vaccines",          name: "Vaccines" },
    { id: "sexual-health",     name: "Sexual Health" },
    { id: "lab-tests",         name: "Lab Tests" },
    { id: "iv-drips",          name: "IV Drips" },
    { id: "health-checkups",   name: "Health Check-Ups" },
    { id: "hormone-panels",    name: "Hormone Panels" },
    { id: "allergy-tests",     name: "Allergy Tests" },
    { id: "certificates",      name: "Certificates & Medical Exams" },
  ];

  // Branch name constants
  const C = "Chaweng";
  const B = "Bangrak";
  const R = "Rajabhat University";
  const HV = "Home Visit";
  const ALL_BRANCHES = [C, B, R, HV];

  type ServiceEntry = { id: string; name: string; branches: string[] };
  const SERVICES: Record<string, ServiceEntry[]> = {
    "general-medicine": [
      { id: "doctor-appointment",    name: "Doctor Appointment",                  branches: [C, B, R]    },
      { id: "hotel-home-visit",      name: "Hotel / Home Visit",                  branches: [C, HV]      },
      { id: "wound-care",            name: "Wound Care",                          branches: [C, B, R]    },
      { id: "remove-suture",         name: "Remove Suture",                       branches: [C, B, R]    },
      { id: "remove-staples",        name: "Remove Staples",                      branches: [C, B, R]    },
      { id: "nebulization",          name: "Nebulization Therapy",                branches: [C]          },
      { id: "ear-cleaning",          name: "Ear Cleaning",                        branches: [C]          },
      { id: "repeat-prescriptions",  name: "Repeat Prescriptions",                branches: [C]          },
    ],
    "vaccines": [
      { id: "influenza-vaccine",  name: "Influenza Vaccine",                      branches: [C, B, R]    },
      { id: "influenza-home",     name: "Influenza Vaccine at Home",              branches: [C, R]       },
      { id: "efluelda",           name: "Efluelda (Elderly Flu Vaccine)",         branches: [C]          },
      { id: "tetanus",            name: "Tetanus Vaccination (dT)",               branches: [C, B, R]    },
      { id: "typhoid",            name: "Typhoid Vaccine",                        branches: [C, B, R]    },
      { id: "twinrix",            name: "Twinrix (Hepatitis A&B)",                branches: [C, B]       },
      { id: "meningococcal",      name: "MenQuadfi (Meningococcal ACYW)",         branches: [C]          },
      { id: "rabies",             name: "Rabies Vaccination",                     branches: [C, B, R]    },
    ],
    "sexual-health": [
      { id: "sexual-health-check",       name: "Sexual Health Check",                     branches: [C]     },
      { id: "hiv-test",                  name: "4th Generation HIV Test",                 branches: [C]     },
      { id: "sti-test",                  name: "Gonorrhea / Chlamydia / Ureaplasma",      branches: [C]     },
      { id: "syphilis-test",             name: "Syphilis Rapid Test",                     branches: [C]     },
      { id: "hpv-test",                  name: "Urine HPV Test",                          branches: [C]     },
      { id: "contraceptive-injection",   name: "Contraceptive Injection (Depo Gestin)",   branches: [C]     },
      { id: "beta-hcg",                  name: "Pregnancy Blood Test (Beta hCG)",         branches: [C]     },
      { id: "pap-smear",                 name: "PAP SMEAR (Thin Prep)",                   branches: [C, B]  },
    ],
    "lab-tests": [
      { id: "lab-tests", name: "Blood & Laboratory Tests",                        branches: [C]          },
    ],
    "iv-drips": [
      { id: "immune-booster-iv",          name: "Immune Booster",                          branches: ALL_BRANCHES },
      { id: "essential-vitamins",         name: "Essential Vitamins",                      branches: ALL_BRANCHES },
      { id: "post-covid",                 name: "Post Covid Recovery",                     branches: ALL_BRANCHES },
      { id: "iron-infusion",              name: "Iron Infusion",                           branches: ALL_BRANCHES },
      { id: "myers-cocktail",             name: "Myer's Cocktail",                         branches: ALL_BRANCHES },
      { id: "power-recharge",             name: "Power Recharge",                          branches: ALL_BRANCHES },
      { id: "pure-vitamin-c",             name: "Pure Vitamin C",                          branches: ALL_BRANCHES },
      { id: "whitening-infusion",         name: "Whitening Infusion",                      branches: ALL_BRANCHES },
      { id: "perfect-skin-iv",            name: "Perfect Skin IV",                         branches: ALL_BRANCHES },
      { id: "liver-detox-iv",             name: "Liver Detox",                             branches: ALL_BRANCHES },
      { id: "travellers-diarrhea",        name: "Traveller's Diarrhea Recovery",           branches: ALL_BRANCHES },
      { id: "hangover-iv",                name: "Hangover Infusion",                       branches: ALL_BRANCHES },
      { id: "cellular-detox",             name: "Cellular Detoxification",                 branches: ALL_BRANCHES },
      { id: "nad-plus",                   name: "Anti-Aging: NAD+",                        branches: ALL_BRANCHES },
      { id: "nad-plus-up",                name: "NAD+ UP",                                 branches: ALL_BRANCHES },
      { id: "expert-diabetes",            name: "Expert Diabetes IV",                      branches: ALL_BRANCHES },
      { id: "fat-burner-iv",              name: "Fat Burner IV",                           branches: ALL_BRANCHES },
      { id: "brain-enhancer",             name: "Brain Enhancer",                          branches: ALL_BRANCHES },
      { id: "insomnia-depression",        name: "Insomnia & Depression IV",                branches: ALL_BRANCHES },
      { id: "hormone-booster-iv",         name: "Hormone Booster IV",                      branches: ALL_BRANCHES },
      { id: "custom-infusion",            name: "Custom Infusion",                         branches: ALL_BRANCHES },
      { id: "vitamin-b12-injection",      name: "Vitamin B12 Injection",                   branches: [C, B, R]    },
      { id: "testosterone-injection",     name: "Testosterone Injection (Testoviron)",     branches: [B]          },
    ],
    "health-checkups": [
      { id: "promo-health-check",  name: "PROMOTION: Health Check Up",            branches: ALL_BRANCHES },
      { id: "value-health-check",  name: "Value Package Health Check Up",         branches: ALL_BRANCHES },
      { id: "drinkers-check",      name: "Drinker's Health Check Up",             branches: ALL_BRANCHES },
      { id: "fitness-check",       name: "Fitness Health Check-Up",               branches: ALL_BRANCHES },
      { id: "happy-life-check",    name: "Happy Life Program",                    branches: ALL_BRANCHES },
      { id: "healthy-life-check",  name: "Healthy Life Program",                  branches: ALL_BRANCHES },
    ],
    "hormone-panels": [
      { id: "mid-age-hormone",        name: "Mid-Age Women's Hormone Panel (20–35)",  branches: ALL_BRANCHES },
      { id: "teen-hormone",           name: "Teen Hormone Balance (13–19)",            branches: ALL_BRANCHES },
      { id: "perimenopause-panel",    name: "Perimenopause Panel (35–50)",             branches: ALL_BRANCHES },
      { id: "perimenopause-value",    name: "Perimenopause Value Check-Up",            branches: ALL_BRANCHES },
      { id: "postmenopause-panel",    name: "Postmenopause Panel (50+)",               branches: ALL_BRANCHES },
      { id: "female-hormone-balance", name: "Female Hormone Balance Check-Up",         branches: ALL_BRANCHES },
    ],
    "allergy-tests": [
      { id: "inhalation-allergy",    name: "Inhalation Allergy (20 Allergens)",    branches: [C, B, R] },
      { id: "pediatric-allergens",   name: "Pediatric Allergens (27 Tests)",       branches: [C]       },
      { id: "food-20-allergens",     name: "Food Allergen Profile (20 Foods)",     branches: [C]       },
      { id: "food-intolerance-222",  name: "Food Intolerance (IgG — 222 Foods)",  branches: [C]       },
      { id: "food-inhalation-ige",   name: "Food & Inhalation IgE Profile",        branches: [C]       },
    ],
    "certificates": [
      { id: "ekg",               name: "Electrocardiogram (EKG 12 Leads)",        branches: [C] },
      { id: "cert-work-permit",  name: "Medical Certificate — Work Permit",        branches: [C] },
      { id: "cert-driving",      name: "Medical Certificate — Driving Licence",    branches: [C] },
      { id: "cert-diving",       name: "Medical Certificate — Diving (PADI)",      branches: [C] },
    ],
  };

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

  // --- Derived: current service entry (has branches) ---
  const currentServiceData = useMemo<ServiceEntry | null>(() => {
    if (!department || !service) return null;
    return (SERVICES[department] ?? []).find(s => s.id === service) ?? null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department, service]);

  // Branches available for the selected service
  const availableBranches = currentServiceData?.branches ?? ALL_BRANCHES;

  // Auto-select branch when only 1 option, or clear if current branch is no longer valid
  useEffect(() => {
    if (availableBranches.length === 1) {
      setBranch(availableBranches[0]);
    } else if (branch && !availableBranches.includes(branch)) {
      setBranch("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentServiceData]);

  // Search ref for click-outside close
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Flat search across all departments + services
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results: { id: string; name: string; departmentId: string; departmentName: string; branches: string[] }[] = [];
    for (const dept of DEPARTMENTS) {
      for (const svc of SERVICES[dept.id] ?? []) {
        if (svc.name.toLowerCase().includes(q)) {
          results.push({ ...svc, departmentId: dept.id, departmentName: dept.name });
        }
      }
    }
    return results;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetForm = () => {
    setStep(1);
    setSearchQuery("");
    setDepartment("");
    setService("");
    setBranch("");
    setDate(null);
    setTime("");
    setSubmitError("");
    setPdpaConsent(false);
    setPharmacyRedirect(null);
    setFormData({ fullName: "", whatsapp: "", email: "", nationality: "", gender: "", dob: "", concerns: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          department,
          branch,
          date: date ? date.toISOString() : null,
          time,
          fullName: formData.fullName,
          whatsapp: formData.whatsapp,
          email: formData.email,
          nationality: formData.nationality,
          gender: formData.gender,
          dob: formData.dob,
          concerns: formData.concerns,
          type: branch === "Home Visit" ? "home-visit" : "clinic",
          pdpaConsent: true,
        }),
      });

      const json = await res.json();

      // COMP-02: Pharmacy keyword detected — show intercept UI, no booking created
      if (json.redirect === "pharmacy") {
        setPharmacyRedirect(json.whatsappUrl);
        return;
      }

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Booking failed");
      }

      // Advance to confirmation step
      setStep(4);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${isModal ? 'bg-[#080708]' : 'bg-white/5 border border-white/10 backdrop-blur-xl'} rounded-[2rem] p-6 md:p-8 shadow-2xl`}>
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#3eb5bd] rounded-full z-0 transition-all duration-500"
                style={{ width: `${((Math.min(step, 3) - 1) / 2) * 100}%` }}
              ></div>

              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                    Math.min(step, 3) >= num
                      ? "bg-[#3eb5bd] text-white"
                      : "bg-slate-800 text-slate-500 border border-white/10"
                  }`}
                >
                  {step === 4 && num === 3 ? <CheckCircle2 size={16} /> : num}
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
                        <div className="relative" ref={searchRef}>
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <Search className="h-5 w-5 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                            onFocus={() => setSearchOpen(true)}
                            className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:ring-2 focus:ring-[#3eb5bd] focus:border-transparent transition-all"
                            placeholder="Search..."
                            autoComplete="off"
                          />
                          {!searchQuery && (
                            <div className="absolute inset-y-0 left-11 flex items-center pointer-events-none text-slate-400">
                              Search <span className="ml-1 text-[#5ec4cb] font-medium">{SEARCH_PLACEHOLDERS[placeholderIndex]}</span>
                            </div>
                          )}
                          {/* Search results dropdown */}
                          {searchOpen && searchResults.length > 0 && (
                            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#111213] border border-white/15 rounded-xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto">
                              {searchResults.map((result) => (
                                <button
                                  key={`${result.departmentId}-${result.id}`}
                                  type="button"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    setDepartment(result.departmentId);
                                    setService(result.id);
                                    setSearchQuery(result.name);
                                    setSearchOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-3 hover:bg-white/8 transition-colors flex flex-col gap-0.5 border-b border-white/5 last:border-0"
                                >
                                  <span className="text-sm text-white font-medium">{result.name}</span>
                                  <span className="text-xs text-slate-500">{result.departmentName} · {result.branches.join(", ")}</span>
                                </button>
                              ))}
                            </div>
                          )}
                          {searchOpen && searchQuery.trim() && searchResults.length === 0 && (
                            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#111213] border border-white/15 rounded-xl px-4 py-3 shadow-2xl">
                              <p className="text-sm text-slate-500">No services found for &ldquo;{searchQuery}&rdquo;</p>
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
                      disabled={!service}
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
                          placeholder={availableBranches.length === 1 ? availableBranches[0] : "Select Branch"}
                          options={availableBranches.map(b => ({ value: b, label: b }))}
                          disabled={availableBranches.length === 1}
                        />
                        {availableBranches.length === 1 && (
                          <p className="text-xs text-[#5ec4cb]/80 mt-2 flex items-center gap-1.5">
                            <span>★</span> This service is only available at {availableBranches[0]}.
                          </p>
                        )}
                        {availableBranches.length > 1 && availableBranches.length < ALL_BRANCHES.length && (
                          <p className="text-xs text-slate-500 mt-2">
                            Available at: {availableBranches.join(" · ")}
                          </p>
                        )}
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
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Date of Birth <span className="normal-case font-normal">(optional)</span>
                          </label>
                          {(() => {
                            const [dobYear, dobMonth, dobDay] = formData.dob ? formData.dob.split('-') : ['', '', ''];
                            const updateDob = (year: string, month: string, day: string) => {
                              setFormData({ ...formData, dob: (year && month && day) ? `${year}-${month}-${day}` : '' });
                            };
                            const currentYear = new Date().getFullYear();
                            const nativeSelectClass = "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#3eb5bd] cursor-pointer appearance-none";
                            return (
                              <div className="grid grid-cols-3 gap-2">
                                <select
                                  value={dobDay ?? ''}
                                  onChange={e => updateDob(dobYear ?? '', dobMonth ?? '', e.target.value)}
                                  className={`${nativeSelectClass} ${dobDay ? 'text-white' : 'text-slate-500'}`}
                                >
                                  <option value="" disabled>Day</option>
                                  {Array.from({ length: 31 }, (_, i) => {
                                    const v = String(i + 1).padStart(2, '0');
                                    return <option key={v} value={v}>{i + 1}</option>;
                                  })}
                                </select>
                                <select
                                  value={dobMonth ?? ''}
                                  onChange={e => updateDob(dobYear ?? '', e.target.value, dobDay ?? '')}
                                  className={`${nativeSelectClass} ${dobMonth ? 'text-white' : 'text-slate-500'}`}
                                >
                                  <option value="" disabled>Month</option>
                                  {['January','February','March','April','May','June','July','August','September','October','November','December'].map((m, i) => (
                                    <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
                                  ))}
                                </select>
                                <select
                                  value={dobYear ?? ''}
                                  onChange={e => updateDob(e.target.value, dobMonth ?? '', dobDay ?? '')}
                                  className={`${nativeSelectClass} ${dobYear ? 'text-white' : 'text-slate-500'}`}
                                >
                                  <option value="" disabled>Year</option>
                                  {Array.from({ length: 100 }, (_, i) => {
                                    const y = String(currentYear - 16 - i);
                                    return <option key={y} value={y}>{y}</option>;
                                  })}
                                </select>
                              </div>
                            );
                          })()}
                          <p className="text-xs text-slate-500 mt-1">Required at check-in. Providing in advance speeds up your registration.</p>
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

                      {/* PDPA Consent — COMP-01 (required before any submission) */}
                      <label className="flex items-start gap-3 cursor-pointer group mt-2">
                        <input
                          type="checkbox"
                          checked={pdpaConsent}
                          onChange={(e) => setPdpaConsent(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#3eb5bd] focus:ring-[#3eb5bd] focus:ring-offset-0 shrink-0 cursor-pointer"
                        />
                        <span className="text-xs text-slate-400 leading-relaxed">
                          I consent to Samui Home Clinic collecting and processing my personal data for appointment and healthcare purposes, in accordance with Thailand&apos;s{" "}
                          <span className="text-[#7fd3d7]">PDPA (B.E. 2562)</span>.{" "}
                          <span className="text-slate-500">Your information is kept strictly confidential and used only to assist with your care.</span>
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={isSubmitting || !pdpaConsent}
                        className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
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

                      {submitError && (
                        <p className="text-sm text-red-400 text-center mt-3">{submitError}</p>
                      )}
                    </form>
                  </motion.div>
                )}
                {/* COMP-02: Pharmacy Intercept Screen — shown when a prescription
                    keyword was detected in concerns. No booking is created.
                    Patient is routed to a confidential pharmacist channel. */}
                {pharmacyRedirect && (
                  <motion.div
                    key="pharmacy-intercept"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <ShieldCheck size={32} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Confidential Pharmacy Enquiry</h3>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                        For this type of request, our pharmacist is available for a private, confidential consultation. Please contact us directly.
                      </p>
                    </div>
                    <div className="w-full space-y-3">
                      <a
                        href={pharmacyRedirect}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        WhatsApp a Pharmacist
                      </a>
                      <a
                        href="tel:+660806696915"
                        className="w-full bg-white/10 hover:bg-white/15 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        Call Us Now
                      </a>
                    </div>
                    <button
                      onClick={resetForm}
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline"
                    >
                      Back to booking
                    </button>
                  </motion.div>
                )}

                {step === 4 && !pharmacyRedirect && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#3eb5bd]/20 flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-[#3eb5bd]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                        We&apos;ve received your request. Our team will confirm your appointment via WhatsApp or email shortly.
                      </p>
                    </div>
                    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-left space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Service</span>
                        <span className="text-white font-medium capitalize">{service.replace(/-/g, " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Branch</span>
                        <span className="text-white font-medium">{branch}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Date</span>
                        <span className="text-white font-medium">
                          {date?.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time</span>
                        <span className="text-white font-medium">{time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Contact</span>
                        <span className="text-white font-medium">{formData.whatsapp}</span>
                      </div>
                    </div>
                    <button
                      onClick={resetForm}
                      className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-semibold transition-colors text-sm"
                    >
                      Book Another Appointment
                    </button>
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
                "Secure, PDPA-compliant platform",
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
