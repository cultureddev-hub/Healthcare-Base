"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Stethoscope,
  ShieldPlus,
  Heart,
  Microscope,
  Droplets,
  ClipboardList,
  Activity,
  AlertTriangle,
  FileText,
  Syringe,
  ArrowRight,
  Clock,
  Search,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useBooking } from "./booking-context";
import { BookingForm } from "./booking-section";
import type { WixTeamMember } from "@/lib/types/cms";

const SERVICES_DATA = [
  // ── GENERAL MEDICINE ──────────────────────────────────────────────────────
  {
    id: "doctor-appointment",
    title: "Doctor Appointment",
    desc: "All medical consultations and procedures performed by our qualified physicians.",
    longDesc: "Visit any of our branches for a face-to-face consultation with an English-speaking doctor. Our physicians handle a wide range of medical issues — from minor illnesses and infections to follow-up care and specialist referrals. Same-day appointments are usually available.",
    icon: <Stethoscope size={24} />,
    img: "https://static.wixstatic.com/media/fcb1209b19c34a08b3fecce3a0445b2a.jpg/v1/fit/w_1200,h_800,al_c,q_85/fcb1209b19c34a08b3fecce3a0445b2a.jpg",
    duration: "30 min",
    price: "฿350",
    category: "General Medicine",
    departmentId: "general-medicine",
    serviceId: "doctor-appointment",
    featured: true,
    benefits: ["English-speaking doctors", "Same-day appointments", "Prescription service", "Specialist referrals"]
  },
  {
    id: "hotel-home-visit",
    title: "Hotel / Home Visit",
    desc: "Doctor comes directly to your hotel room or home — no travel required.",
    longDesc: "Too unwell to travel? Our doctors make house calls across Koh Samui — hotels, villas, and private residences. Book via WhatsApp at least a few hours in advance. Rate varies by distance and time of day (฿1,500–3,000 THB).",
    icon: <Stethoscope size={24} />,
    img: "https://static.wixstatic.com/media/134f7566ce42427b94d3f5d286215d4d.jpg/v1/fit/w_981,h_380,al_c,q_85/134f7566ce42427b94d3f5d286215d4d.jpg",
    duration: "2 hr",
    price: "฿1,500–3,000",
    category: "General Medicine",
    departmentId: "general-medicine",
    serviceId: "hotel-home-visit",
    featured: false,
    benefits: ["Island-wide coverage", "Hotels & villas", "WhatsApp booking", "All ages welcome"]
  },
  {
    id: "wound-care",
    title: "Wound Care",
    desc: "Professional cleaning, suturing, and dressing of cuts, lacerations, and injuries.",
    longDesc: "Affordable wound care by expert clinical staff. We provide thorough irrigation, debridement, suturing where needed, and proper dressings to prevent infection and promote healing. Tetanus shots are available on-site.",
    icon: <Stethoscope size={24} />,
    img: "https://static.wixstatic.com/media/209d18_311cd92ff7c5445cad94f2170b232539~mv2.jpg/v1/fit/w_632,h_420,al_c,q_80/209d18_311cd92ff7c5445cad94f2170b232539~mv2.jpg",
    duration: "1 hr",
    price: "Prices Vary",
    category: "General Medicine",
    departmentId: "general-medicine",
    serviceId: "wound-care",
    featured: false,
    benefits: ["Professional cleaning", "Suturing if needed", "Infection prevention", "Tetanus shots available"]
  },
  {
    id: "remove-suture",
    title: "Remove Suture ตัดไหม",
    desc: "Removal of surgical sutures by physician using sterile technique.",
    longDesc: "Suture removal requires sterile instruments and a clean technique to avoid re-opening the wound. Our physicians check the healing progress before removing stitches and advise on ongoing care.",
    icon: <Stethoscope size={24} />,
    img: "https://static.wixstatic.com/media/05a5db601f184e52b7826d966123737f.jpg/v1/fit/w_4984,h_3498,al_c,q_90/05a5db601f184e52b7826d966123737f.jpg",
    duration: "30 min",
    price: "฿500",
    category: "General Medicine",
    departmentId: "general-medicine",
    serviceId: "remove-suture",
    featured: false,
    benefits: ["Sterile technique", "Healing assessment", "Doctor-performed", "Post-care advice"]
  },
  {
    id: "remove-staples",
    title: "Remove Staples",
    desc: "Removal of surgical staples using a sterile staple extractor.",
    longDesc: "Staple removal requires a specialised sterile extractor to avoid tissue trauma. Our physicians assess the wound site before and after removal to confirm full healing.",
    icon: <Stethoscope size={24} />,
    img: "https://static.wixstatic.com/media/11062b_ebed553b419a414fadd847af8f58f23f~mv2_d_8660_5773_s_4_2.jpg/v1/fit/w_800,h_600,al_c,q_85/11062b_ebed553b419a414fadd847af8f58f23f~mv2_d_8660_5773_s_4_2.jpg",
    duration: "15 min",
    price: "฿500",
    category: "General Medicine",
    departmentId: "general-medicine",
    serviceId: "remove-staples",
    featured: false,
    benefits: ["Sterile extractor", "Quick procedure", "Wound assessment", "Comfortable experience"]
  },
  {
    id: "nebulization",
    title: "Nebulization Therapy",
    desc: "Bronchodilator nebulization for respiratory relief — for adults and children.",
    longDesc: "พ่นยาเด็ก/ผู้ใหญ่ — Bronchodilator nebulization delivers medication directly to the airways for fast relief of asthma, bronchitis, and other respiratory conditions. Safe for all ages.",
    icon: <Stethoscope size={24} />,
    img: "https://static.wixstatic.com/media/209d18_1bcdf18063ac4686aedeb9307112c056~mv2.jpg/v1/fit/w_1280,h_720,al_c,q_85/209d18_1bcdf18063ac4686aedeb9307112c056~mv2.jpg",
    duration: "30 min",
    price: "฿300–500",
    category: "General Medicine",
    departmentId: "general-medicine",
    serviceId: "nebulization",
    featured: false,
    benefits: ["For all ages", "Fast respiratory relief", "Bronchodilator medication", "Monitored session"]
  },
  {
    id: "ear-cleaning",
    title: "Ear Cleaning ล้างหู",
    desc: "Professional ear wax removal by physician.",
    longDesc: "Ear wax build-up can cause discomfort, muffled hearing, and tinnitus. Our physicians safely remove excess wax using gentle irrigation or micro-suction, with a post-procedure ear check.",
    icon: <Stethoscope size={24} />,
    img: "https://static.wixstatic.com/media/ce875a63ddcd419b93d729f509bd9888.jpg/v1/fit/w_4081,h_2720,al_c,q_90/ce875a63ddcd419b93d729f509bd9888.jpg",
    duration: "30 min",
    price: "฿600–800 / ear",
    category: "General Medicine",
    departmentId: "general-medicine",
    serviceId: "ear-cleaning",
    featured: false,
    benefits: ["Safe technique", "Immediate relief", "Post-clean check", "Both ears treated"]
  },
  {
    id: "repeat-prescriptions",
    title: "Repeat Prescriptions",
    desc: "Repeat orders by WhatsApp, Line, email, or phone — no queuing required.",
    longDesc: "Existing patients can reorder medications without a full appointment. Contact us via WhatsApp, Line (samuiclinic), or email and we'll prepare your prescription. Delivery is available.",
    icon: <Stethoscope size={24} />,
    img: "https://static.wixstatic.com/media/39b83635b87e4f1e9bcf203b73104b81.jpg/v1/fit/w_1920,h_1346,al_c,q_90/39b83635b87e4f1e9bcf203b73104b81.jpg",
    duration: "5 min",
    price: "Prices Vary",
    category: "General Medicine",
    departmentId: "general-medicine",
    serviceId: "repeat-prescriptions",
    featured: false,
    benefits: ["No appointment needed", "WhatsApp / Line ordering", "Delivery available", "Existing patients only"]
  },

  // ── VACCINES ──────────────────────────────────────────────────────────────
  {
    id: "influenza-vaccine",
    title: "Influenza Vaccine",
    desc: "Annual flu protection against current strains — for all ages.",
    longDesc: "Our influenza vaccine covers the current recommended strains (H1N1, H3N2, B Yamagata, B Victoria). Protection develops within 2–3 weeks. Available for adults and children at all branches.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/209d18_28572cb881be4dd39dedd04841dc1cf9~mv2.jpg/v1/fit/w_653,h_436,al_c,q_80/209d18_28572cb881be4dd39dedd04841dc1cf9~mv2.jpg",
    duration: "15 min",
    price: "฿700",
    category: "Vaccines",
    departmentId: "vaccines",
    serviceId: "influenza-vaccine",
    featured: true,
    benefits: ["Current strains covered", "All ages", "Quick jab", "All branches"]
  },
  {
    id: "influenza-home",
    title: "Influenza Vaccine at Home",
    desc: "Get vaccinated at your hotel or home — skip the clinic queue.",
    longDesc: "Busy schedule or hate queuing? We bring the flu jab to you. Book at least 2 days in advance. Groups of 5 or more in one household incur no additional travel charge; smaller groups pay a ฿500 trip fee.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/209d18_7d8737ea408e43a78c14593da757ff23~mv2.jpg/v1/fit/w_6720,h_4480,al_c,q_90/209d18_7d8737ea408e43a78c14593da757ff23~mv2.jpg",
    duration: "1 hr",
    price: "฿790",
    category: "Vaccines",
    departmentId: "vaccines",
    serviceId: "influenza-home",
    featured: false,
    benefits: ["Home or hotel", "Group discount (5+)", "2-day advance booking", "Island-wide"]
  },
  {
    id: "efluelda",
    title: "Efluelda (Elderly Flu Vaccine)",
    desc: "High-dose influenza vaccine designed specifically for adults aged 65 and older.",
    longDesc: "Efluelda is a quadrivalent high-dose influenza vaccine formulated for adults 65+. The higher antigen dose produces a stronger immune response in older adults, providing better protection than standard-dose vaccines.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/5356223c433c799f8756c587b3f336fc.jpg/v1/fit/w_600,h_400,al_c,q_80/5356223c433c799f8756c587b3f336fc.jpg",
    duration: "15 min",
    price: "฿1,700",
    category: "Vaccines",
    departmentId: "vaccines",
    serviceId: "efluelda",
    featured: false,
    benefits: ["High-dose formulation", "For 65+ adults", "Enhanced immunity", "Doctor-administered"]
  },
  {
    id: "tetanus",
    title: "Tetanus Vaccination (dT)",
    desc: "Essential tetanus protection — especially after any wound or animal contact.",
    longDesc: "Tetanus (lockjaw) is a serious bacterial infection transmitted through wounds. The dT vaccine provides combined diphtheria and tetanus protection. Recommended after cuts, bites, or if your last booster was more than 5 years ago.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/b556d72b44654edb88ef5a1e04b44327.jpg/v1/fit/w_1920,h_1280,al_c,q_90/b556d72b44654edb88ef5a1e04b44327.jpg",
    duration: "10 min",
    price: "฿250",
    category: "Vaccines",
    departmentId: "vaccines",
    serviceId: "tetanus",
    featured: false,
    benefits: ["Post-wound essential", "Dual dT protection", "Quick injection", "Certificate available"]
  },
  {
    id: "typhoid",
    title: "Typhoid Vaccine",
    desc: "Single-dose travel protection against typhoid fever. Booster every 2 years.",
    longDesc: "Typhoid fever is caused by Salmonella typhi and spreads through contaminated food and water. A single dose protects adults and children over 2. Recommended for travellers and expats on Koh Samui.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/209d18_028763507d0543deb6599c3cc1f03b70~mv2.jpg/v1/fit/w_600,h_328,al_c,q_80/209d18_028763507d0543deb6599c3cc1f03b70~mv2.jpg",
    duration: "15 min",
    price: "฿800",
    category: "Vaccines",
    departmentId: "vaccines",
    serviceId: "typhoid",
    featured: false,
    benefits: ["Single dose", "Travel protection", "Lasts 2 years", "Children 2+ eligible"]
  },
  {
    id: "twinrix",
    title: "Twinrix Vaccine (Hepatitis A&B)",
    desc: "Combined hepatitis A and B protection in one injection.",
    longDesc: "วัคซีนป้องกันไวรัสตับอักเสบชนิด A&B — Twinrix provides dual protection against both hepatitis A and B in a 3-dose course. Highly recommended for long-term residents, healthcare workers, and frequent travellers.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/209d18_efcfcdb4db6745d1926d286d9be20133~mv2_d_2250_1500_s_2.jpg/v1/fit/w_2250,h_1500,al_c,q_90/209d18_efcfcdb4db6745d1926d286d9be20133~mv2_d_2250_1500_s_2.jpg",
    duration: "15 min",
    price: "฿1,300",
    category: "Vaccines",
    departmentId: "vaccines",
    serviceId: "twinrix",
    featured: false,
    benefits: ["Dual hepatitis cover", "3-dose course", "WHO-approved", "Expat-recommended"]
  },
  {
    id: "meningococcal",
    title: "MenQuadfi Vaccine (Meningococcal ACYW)",
    desc: "Meningococcal vaccine covering strains A, C, Y and W.",
    longDesc: "MenQuadfi is a quadrivalent meningococcal vaccine recommended for travellers, students, and immunocompromised individuals. Provides broad protection against four strains of bacterial meningitis.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/209d18_a64df0cbb22d4170ae25ea9d0af662fe~mv2.jpg/v1/fit/w_4781,h_3350,al_c,q_90/209d18_a64df0cbb22d4170ae25ea9d0af662fe~mv2.jpg",
    duration: "15 min",
    price: "฿3,300",
    category: "Vaccines",
    departmentId: "vaccines",
    serviceId: "meningococcal",
    featured: false,
    benefits: ["4-strain coverage", "Travel & students", "Single dose", "Doctor-administered"]
  },
  {
    id: "rabies",
    title: "Rabies Vaccination",
    desc: "Post-exposure protocol after dog, cat, or monkey bites — urgent care available.",
    longDesc: "Rabies is fatal without timely treatment. If you have been bitten or scratched by a dog, cat, monkey, or other mammal, visit us immediately. We administer the full post-exposure vaccination course (฿800/dose) and advise on wound care.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/b181e18a430c43afa6342d136860f0e8.jpg/v1/fit/w_4323,h_2882,al_c,q_90/b181e18a430c43afa6342d136860f0e8.jpg",
    duration: "15 min",
    price: "฿800 / dose",
    category: "Vaccines",
    departmentId: "vaccines",
    serviceId: "rabies",
    featured: false,
    benefits: ["Post-exposure urgent care", "Full course available", "Dog/cat/monkey bites", "WHO-approved protocol"]
  },

  // ── SEXUAL HEALTH ─────────────────────────────────────────────────────────
  {
    id: "sexual-health-check",
    title: "Sexual Health Check",
    desc: "Comprehensive STI screening — fully confidential, results same day.",
    longDesc: "Our sexual health check covers a full panel of sexually transmitted infections. Consultations are entirely confidential. Our doctors discuss risk factors, advise on prevention, and provide treatment where needed.",
    icon: <Heart size={24} />,
    img: "https://static.wixstatic.com/media/209d18_00b5d5b7a6cb458eb0eb118761320177~mv2.jpg/v1/fit/w_678,h_452,al_c,q_80/209d18_00b5d5b7a6cb458eb0eb118761320177~mv2.jpg",
    duration: "30 min",
    price: "Prices Vary",
    category: "Sexual Health",
    departmentId: "sexual-health",
    serviceId: "sexual-health-check",
    featured: true,
    benefits: ["Fully confidential", "Full STI panel", "Same-day results", "Treatment on-site"]
  },
  {
    id: "hiv-test",
    title: "4th Generation HIV Test",
    desc: "Results in 20 minutes — the most accurate rapid HIV test available.",
    longDesc: "Our 4th generation HIV test detects both HIV antigen and antibodies, giving accurate results in just 20 minutes. A doctor consultation is included to discuss results and next steps. PEP/PrEP enquiries must be made via WhatsApp.",
    icon: <Heart size={24} />,
    img: "https://static.wixstatic.com/media/209d18_e887df78668342c6b5a319431cb17eb7~mv2.jpg/v1/fit/w_640,h_426,al_c,q_80/209d18_e887df78668342c6b5a319431cb17eb7~mv2.jpg",
    duration: "30 min",
    price: "฿500",
    category: "Sexual Health",
    departmentId: "sexual-health",
    serviceId: "hiv-test",
    featured: false,
    benefits: ["20-min results", "4th generation accuracy", "Confidential", "Doctor consultation"]
  },
  {
    id: "sti-test",
    title: "Gonorrhea / Chlamydia / Ureaplasma",
    desc: "Rapid STI test — 97% sensitivity, results in 35 minutes.",
    longDesc: "Fast and accurate testing for gonorrhea, chlamydia, and ureaplasma using a single sample. Sensitivity 97.03%, specificity 97.89%. Results in 35 minutes with a doctor consultation.",
    icon: <Heart size={24} />,
    img: "https://static.wixstatic.com/media/11062b_94cb69ad7d1f44bd96fca10df28f1c80~mv2.jpg/v1/fit/w_2832,h_3595,al_c,q_90/11062b_94cb69ad7d1f44bd96fca10df28f1c80~mv2.jpg",
    duration: "30 min",
    price: "฿1,190",
    category: "Sexual Health",
    departmentId: "sexual-health",
    serviceId: "sti-test",
    featured: false,
    benefits: ["35-min results", "97% sensitivity", "3 infections in one test", "Treatment available"]
  },
  {
    id: "syphilis-test",
    title: "Syphilis Rapid Test",
    desc: "Fast, accurate syphilis screening with same-session results.",
    longDesc: "Syphilis can cause serious long-term problems if left untreated, and symptoms are not always obvious. Our rapid test gives results in the same session. Treatment is available on-site if needed.",
    icon: <Heart size={24} />,
    img: "https://static.wixstatic.com/media/209d18_39f31f68e886449ab94d0bfa4b68ff05~mv2.jpg/v1/fit/w_4800,h_2700,al_c,q_90/209d18_39f31f68e886449ab94d0bfa4b68ff05~mv2.jpg",
    duration: "15 min",
    price: "฿150",
    category: "Sexual Health",
    departmentId: "sexual-health",
    serviceId: "syphilis-test",
    featured: false,
    benefits: ["Rapid results", "Low cost", "Confidential", "Treatment on-site"]
  },
  {
    id: "hpv-test",
    title: "Urine HPV Test",
    desc: "Non-invasive cervical cancer risk screening — no smear required.",
    longDesc: "ตรวจคัดกรองความเสี่ยงมะเร็งปากมดลูกจากปัสสาวะ — This urine-based HPV test screens for high-risk strains associated with cervical cancer without the discomfort of a traditional smear.",
    icon: <Heart size={24} />,
    img: "https://static.wixstatic.com/media/209d18_09e03079e82b41c4a35af43739310b11~mv2.jpg/v1/fit/w_4996,h_3147,al_c,q_90/209d18_09e03079e82b41c4a35af43739310b11~mv2.jpg",
    duration: "15 min",
    price: "฿2,000",
    category: "Sexual Health",
    departmentId: "sexual-health",
    serviceId: "hpv-test",
    featured: false,
    benefits: ["Non-invasive", "No smear needed", "Cervical cancer screening", "Fast turnaround"]
  },
  {
    id: "contraceptive-injection",
    title: "Contraceptive Injection (Depo Gestin)",
    desc: "3-month contraceptive injection — convenient and highly effective.",
    longDesc: "Depo Gestin provides 3 months of contraceptive protection in a single injection. Administered by our doctors with a full consultation on suitability and side effects.",
    icon: <Heart size={24} />,
    img: "https://static.wixstatic.com/media/f2061ce5b8f3480b8cb048ac44faf1bd.jpg/v1/fit/w_3370,h_2247,al_c,q_90/f2061ce5b8f3480b8cb048ac44faf1bd.jpg",
    duration: "10 min",
    price: "฿250",
    category: "Sexual Health",
    departmentId: "sexual-health",
    serviceId: "contraceptive-injection",
    featured: false,
    benefits: ["3 months protection", "Quick procedure", "No daily pill", "Doctor consultation"]
  },
  {
    id: "beta-hcg",
    title: "Pregnancy Blood Test (Beta hCG)",
    desc: "Accurate blood test for early pregnancy confirmation.",
    longDesc: "Beta hCG is the most reliable way to confirm pregnancy early. Our blood test detects the hormone produced by the placenta, giving accurate results and a doctor consultation to discuss next steps.",
    icon: <Heart size={24} />,
    img: "https://static.wixstatic.com/media/50b90fb3dac547b58b92ffce7e9c2e6a.jpg/v1/fit/w_5472,h_3648,al_c,q_90/50b90fb3dac547b58b92ffce7e9c2e6a.jpg",
    duration: "15 min",
    price: "฿600",
    category: "Sexual Health",
    departmentId: "sexual-health",
    serviceId: "beta-hcg",
    featured: false,
    benefits: ["More accurate than home test", "Early detection", "Doctor consultation", "Fast results"]
  },
  {
    id: "pap-smear",
    title: "PAP SMEAR (Thin Prep)",
    desc: "Cervical cancer screening using Thin Prep liquid cytology.",
    longDesc: "Our PAP smear uses the Thin Prep liquid cytology method, which is more sensitive than the conventional smear. Results are reviewed by a certified laboratory and discussed with your doctor.",
    icon: <Heart size={24} />,
    img: "https://static.wixstatic.com/media/11062b_0faa04e54ab3499bb4ed365101af073f~mv2.jpeg/v1/fit/w_800,h_600,al_c,q_85/11062b_0faa04e54ab3499bb4ed365101af073f~mv2.jpeg",
    duration: "30 min",
    price: "฿1,500",
    category: "Sexual Health",
    departmentId: "sexual-health",
    serviceId: "pap-smear",
    featured: false,
    benefits: ["Thin Prep method", "Certified lab", "Female doctor available", "Routine screening"]
  },

  // ── LAB TESTS ─────────────────────────────────────────────────────────────
  {
    id: "lab-tests",
    title: "Blood & Laboratory Tests",
    desc: "Full range of blood, urine, stool, sputum, and specialist lab tests.",
    longDesc: "ตรวจเลือด ปัสสาวะ อุจจาระ เสมหะ และการตรวจอื่นๆ — All accurate laboratory tests available on-site. Results reviewed by a doctor and explained in plain English. Prices vary by test panel.",
    icon: <Microscope size={24} />,
    img: "https://static.wixstatic.com/media/86cb94_a091f8e150854f0e9098dd4da4de78c5~mv2_d_4720_3147_s_4_2.jpeg/v1/fit/w_4720,h_3147,al_c,q_90/86cb94_a091f8e150854f0e9098dd4da4de78c5~mv2_d_4720_3147_s_4_2.jpeg",
    duration: "30 min",
    price: "Prices Vary",
    category: "Lab Tests",
    departmentId: "lab-tests",
    serviceId: "lab-tests",
    featured: true,
    benefits: ["Full range of tests", "On-site collection", "Doctor review", "Fast turnaround"]
  },

  // ── IV DRIPS ──────────────────────────────────────────────────────────────
  {
    id: "immune-booster-iv",
    title: "Immune Booster",
    desc: "High-dose Vitamin C and antioxidants to strengthen immunity and fight infections.",
    longDesc: "Our Immune Booster IV delivers high-dose Vitamin C, antioxidants, and hydration directly into your bloodstream to strengthen your immune system, accelerate recovery, and fight off infections effectively.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_a419a1c659834eac84b0cb04e91d1684~mv2.png/v1/crop/x_79,y_0,w_1021,h_1199/fill/w_400,h_400,al_c,q_85/Immune%20booster.png",
    duration: "30 min",
    price: "฿590",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "immune-booster-iv",
    featured: true,
    benefits: ["High-dose Vitamin C", "Immunity support", "Antioxidant blend", "Fast delivery"]
  },
  {
    id: "essential-vitamins",
    title: "Essential Vitamins",
    desc: "Complete multivitamin IV — B vitamins, C, D, E, A, K, and Biotin.",
    longDesc: "Our Essential Multivitamin IV combines B vitamins, amino acids, and key nutrients including Biotin, Vitamins C, D, E, A, and K to boost energy, immunity, and overall health while supporting vision, skin, and cardiovascular health.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_41add2fb9a4c406f957a37279c522993~mv2.png/v1/fill/w_400,h_400,al_c,q_85/Essential%20Multi%20Vitamin.png",
    duration: "45 min",
    price: "฿1,590",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "essential-vitamins",
    featured: false,
    benefits: ["Full vitamin complex", "Energy boost", "Immunity support", "Skin & nail health"]
  },
  {
    id: "post-covid",
    title: "Post Covid Recovery",
    desc: "IV infusion to combat post-COVID fatigue, nausea, and immune suppression.",
    longDesc: "Specially formulated to help reduce fatigue, alleviate COVID-associated symptoms, boost energy, increase white blood cell count, support the immune system, and regulate the body's inflammatory response.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_08614e84968d479ea64a71f9be0e7a67~mv2.png/v1/crop/x_88,y_0,w_1019,h_1199/fill/w_400,h_400,al_c,q_85/post%20covid.png",
    duration: "30 min",
    price: "฿690",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "post-covid",
    featured: false,
    benefits: ["Post-COVID fatigue", "Immune support", "Anti-inflammatory", "Energy recovery"]
  },
  {
    id: "iron-infusion",
    title: "Iron Infusion",
    desc: "500mg iron infusion to combat anaemia and restore energy levels.",
    longDesc: "Recharge your energy and combat fatigue with 500mg Ferrous (iron), 1000mg Vitamin C, and a Vitamin B complex (B1, B2, B3, B6) delivered directly into your bloodstream. Ideal for iron deficiency and anaemia.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_a38079b05e814179963df6f0807099cd~mv2.png/v1/fill/w_400,h_400,al_c,q_85/whitening%20infusion.png",
    duration: "30 min",
    price: "฿6,500",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "iron-infusion",
    featured: false,
    benefits: ["500mg iron dose", "Vitamin C + B complex", "Anaemia treatment", "Fast energy restoration"]
  },
  {
    id: "myers-cocktail",
    title: "Myer's Cocktail",
    desc: "The classic IV therapy — Vitamin C, B vitamins, Magnesium, Calcium.",
    longDesc: "The Myers' Cocktail, introduced by Dr. John Myers, combines Vitamin C, B-Vitamins, Magnesium, Calcium, and trace minerals to boost immunity, increase energy, reduce inflammation, and support overall health.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_f7c609a261af438b9f636b63e45d0765~mv2.png/v1/crop/x_91,y_1,w_1017,h_1197/fill/w_400,h_400,al_c,q_85/myers%20cocktail.png",
    duration: "45 min",
    price: "฿3,500",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "myers-cocktail",
    featured: false,
    benefits: ["Classic formula", "Energy & immunity", "Anti-inflammation", "Magnesium & Calcium"]
  },
  {
    id: "power-recharge",
    title: "Power Recharge",
    desc: "IV fluids, electrolytes, vitamins, and antioxidants for fatigue and brain fog.",
    longDesc: "Our Power Recharge treatment combines IV fluids, electrolytes, vitamins, and antioxidants to combat fatigue, boost energy, and enhance mental clarity. Targets factors like low nutrient levels, anemia, sleep deprivation, and stress.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_8ccb075abf254b13b16a5130f39e90c9~mv2.png/v1/crop/x_91,y_1,w_1017,h_1197/fill/w_400,h_400,al_c,q_85/power%20recharge.png",
    duration: "40 min",
    price: "฿1,990",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "power-recharge",
    featured: false,
    benefits: ["Electrolyte replenishment", "Mental clarity", "Energy boost", "Antioxidant blend"]
  },
  {
    id: "pure-vitamin-c",
    title: "Pure Vitamin C Infusion",
    desc: "High-dose Vitamin C to boost immunity, healing, and energy.",
    longDesc: "Vitamin C infusions, supported by extensive research, boost immunity, fight infections, enhance healing, increase energy, and improve quality of life. Particularly beneficial for cancer patients and those with autoimmune conditions.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_41c9123edb0a4372b411683c9969a9c3~mv2.png/v1/crop/x_91,y_1,w_1017,h_1197/fill/w_400,h_400,al_c,q_85/pure%20vitamin%20c.png",
    duration: "30 min",
    price: "฿1,290",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "pure-vitamin-c",
    featured: false,
    benefits: ["High-dose Vitamin C", "Immunity boost", "Wound healing", "Anti-infection"]
  },
  {
    id: "whitening-infusion",
    title: "Whitening Infusion",
    desc: "Glutathione + Vitamin C blend for brighter skin and liver detox.",
    longDesc: "A powerful blend of glutathione, vitamins, minerals, and fluids that hydrates the skin and helps reduce melanin production for a brighter complexion. Glutathione is a potent antioxidant that supports liver detoxification and overall skin health.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_a38079b05e814179963df6f0807099cd~mv2.png/v1/fill/w_400,h_400,al_c,q_85/whitening%20infusion.png",
    duration: "30 min",
    price: "฿1,290",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "whitening-infusion",
    featured: false,
    benefits: ["Glutathione complex", "Skin brightening", "Liver detox support", "Vitamin C synergy"]
  },
  {
    id: "perfect-skin-iv",
    title: "Perfect Skin IV",
    desc: "Vitamin C, glutathione, and NAC to reduce pigmentation and clear skin.",
    longDesc: "Designed to improve skin tone, texture, and clarity. Combines Vitamin C, glutathione, and N-acetylcysteine — powerful antioxidants that reduce pigmentation, combat acne, eczema, and psoriasis, and protect against free radical damage.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_85d76b78ecb94f29ad44b8d3c92da58e~mv2.png/v1/crop/x_43,y_0,w_1113,h_1199/fill/w_400,h_400,al_c,q_85/perfect%20skin.png",
    duration: "45 min",
    price: "฿1,290",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "perfect-skin-iv",
    featured: false,
    benefits: ["Pigmentation reduction", "Acne & eczema support", "Antioxidant protection", "Glowing complexion"]
  },
  {
    id: "liver-detox-iv",
    title: "Liver Detox IV",
    desc: "Magnesium-based formula to cleanse and support liver function.",
    longDesc: "Our detox IV formula includes Magnesium for heart health, cleanses the liver, enhances its function, converts fat-soluble toxins into water-soluble forms for efficient excretion, and supports overall cardiovascular health.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_ec52708cf9c640e284f905c637921634~mv2.png/v1/fill/w_400,h_400,al_c,q_85/liver%20detox.png",
    duration: "60 min",
    price: "฿1,990",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "liver-detox-iv",
    featured: false,
    benefits: ["Liver cleanse", "Toxin elimination", "Magnesium for heart", "Cardiovascular support"]
  },
  {
    id: "travellers-diarrhea",
    title: "Traveller's Diarrhea Recovery",
    desc: "Rapid rehydration and nutrient replenishment after food poisoning.",
    longDesc: "Recover quickly from traveller's diarrhea or food poisoning with our specialised IV infusion. Rehydrates, replenishes lost nutrients, and soothes your stomach over 2 hours so you can get back to enjoying Koh Samui.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_901fa3252f35440c905340312ce53d88~mv2.png/v1/fill/w_400,h_400,al_c,q_85/digestive%20reset.png",
    duration: "2 hr",
    price: "฿3,500",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "travellers-diarrhea",
    featured: false,
    benefits: ["Full rehydration", "Nutrient replenishment", "Stomach soothing", "Holiday recovery"]
  },
  {
    id: "hangover-iv",
    title: "Hangover Infusion",
    desc: "Multi-vitamin rehydration to recover from a heavy night — fast.",
    longDesc: "This hangover infusion rehydrates, detoxifies, and restores vital nutrients lost from alcohol. Alleviates dehydration symptoms, nausea, and headaches for a quicker recovery so you don't waste your holiday.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_8c290fa9b0cd44d88d19a6dece3d4094~mv2.png/v1/crop/x_15,y_0,w_1167,h_1199/fill/w_400,h_400,al_c,q_85/hangover%20infusion.png",
    duration: "60 min",
    price: "฿1,990",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "hangover-iv",
    featured: false,
    benefits: ["Rehydration", "Nausea relief", "Headache relief", "Multi-vitamin restore"]
  },
  {
    id: "cellular-detox",
    title: "Cellular Detoxification",
    desc: "Deep cellular detox targeting organic acid balance and inflammation.",
    longDesc: "Our Cellular Detox IV enhances detoxification at the cellular level, helping to balance acid levels, reduce inflammation, and support metabolism, nervous function, intestinal health, and urinary excretion.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_d79dc80dfd5b4febaadf1dfdc32894f1~mv2.png/v1/crop/x_32,y_0,w_1167,h_1199/fill/w_400,h_400,al_c,q_85/cellular%20detox.png",
    duration: "60 min",
    price: "฿4,590",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "cellular-detox",
    featured: false,
    benefits: ["Cellular-level detox", "Acid balance", "Anti-inflammatory", "Multi-system support"]
  },
  {
    id: "nad-plus",
    title: "Anti-Aging: NAD+",
    desc: "NAD+ IV infusion for energy, brain clarity, and cellular regeneration.",
    longDesc: "NAD+ (Nicotinamide Adenine Dinucleotide) is a crucial coenzyme found in all living cells. IV infusion ensures 100% bioavailability to enhance energy transfer, support neurological function, boost mental clarity, aid brain repair, and improve metabolic function.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_4db94469fd7248feabcee1b801dc1026~mv2.png/v1/fill/w_400,h_400,al_c,q_85/human.png",
    duration: "60 min",
    price: "฿6,000",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "nad-plus",
    featured: false,
    benefits: ["Anti-aging formula", "Brain clarity", "Cellular repair", "Energy boost"]
  },
  {
    id: "nad-plus-up",
    title: "NAD+ UP",
    desc: "NAD+ enhanced with Resveratrol and Honokiol for superior anti-aging.",
    longDesc: "NAD+ UP combines NAD+ with Resveratrol and Honokiol — two powerful natural compounds — to supercharge your cells with enhanced anti-aging and neuroprotective benefits. Helps repair DNA, improve focus, and boost energy.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_199fa27e484946b2b09127311fff8828~mv2.png/v1/fill/w_400,h_400,al_c,q_85/NAD%20%2B%20UP.png",
    duration: "60 min",
    price: "฿6,000",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "nad-plus-up",
    featured: false,
    benefits: ["NAD+ + Resveratrol", "DNA repair", "Neuroprotection", "Focus & energy"]
  },
  {
    id: "expert-diabetes",
    title: "Expert Diabetes IV",
    desc: "Essential vitamins and minerals for blood sugar regulation and insulin support.",
    longDesc: "The Expert Diabetes Infusion is designed for individuals with diabetes. Delivers essential vitamins and minerals intravenously to support insulin production, regulate blood sugar levels, and improve cardiovascular and overall bodily functions.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_19c8c6fb6ff24fd6a4526f66f5c2ffd3~mv2.png/v1/fill/w_400,h_400,al_c,q_85/expert%20diabetes.png",
    duration: "60 min",
    price: "฿2,490",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "expert-diabetes",
    featured: false,
    benefits: ["Blood sugar support", "Insulin regulation", "Cardiovascular health", "Diabetic-formulated"]
  },
  {
    id: "fat-burner-iv",
    title: "Fat Burner IV",
    desc: "B vitamins and L-Carnitine to accelerate metabolism and fat burning.",
    longDesc: "Our Fat Burner IV infusion boosts liver function, accelerates metabolism, and eliminates excess fat deposits. The blend of B vitamins and L-Carnitine optimises fat transport to cells and enhances liver efficiency for up to a week.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_c3283a575bca4108ba0767ae4d35e5c9~mv2.png/v1/crop/x_43,y_0,w_1113,h_1199/fill/w_400,h_400,al_c,q_85/FAT%20BURN.png",
    duration: "60 min",
    price: "฿2,990",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "fat-burner-iv",
    featured: false,
    benefits: ["L-Carnitine formula", "Metabolism boost", "Liver support", "Fat transport optimiser"]
  },
  {
    id: "brain-enhancer",
    title: "Brain Enhancer",
    desc: "Vitamins, minerals, and amino acids to support memory and brain function.",
    longDesc: "The Brain Enhancer infusion delivers essential vitamins, minerals, and amino acids intravenously to enhance neurotransmitter function, support brain health, improve memory, and slow brain cell degeneration. Ideal for mental strain and dementia prevention.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_c56cb2704b6a41f8b21236618b4fc16c~mv2.png/v1/fill/w_400,h_400,al_c,q_85/BRAIN%20ENHANCER.png",
    duration: "30 min",
    price: "฿3,990",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "brain-enhancer",
    featured: false,
    benefits: ["Memory support", "Neurotransmitter boost", "Dementia prevention", "Mental clarity"]
  },
  {
    id: "insomnia-depression",
    title: "Insomnia & Depression IV",
    desc: "Resveratrol-based infusion to reduce inflammation, stress, and anxiety.",
    longDesc: "Resveratrol, a polyphenol with antioxidant, antitumor, and neuroprotective properties, can reduce inflammation, allergy symptoms, and oxidative stress while potentially enhancing memory and aiding weight loss.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_02af80617f214289a796c09d5313e991~mv2.png/v1/crop/x_43,y_0,w_1113,h_1199/fill/w_400,h_400,al_c,q_85/INSOMNIA%20DEPRESSION.png",
    duration: "40 min",
    price: "฿2,990",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "insomnia-depression",
    featured: false,
    benefits: ["Resveratrol formula", "Stress reduction", "Anti-inflammatory", "Neuroprotective"]
  },
  {
    id: "hormone-booster-iv",
    title: "Hormone Booster IV",
    desc: "Zinc, L-carnitine, and multivitamins to support hormonal balance.",
    longDesc: "Our Hormone Booster includes zinc, L-carnitine, and multivitamins to regulate hormone production and enhance metabolic and endocrine health. Lab tests to measure hormone levels are available alongside this infusion.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_9dcb345391064c33aec08c2e8542a0c4~mv2.png/v1/crop/x_43,y_0,w_1113,h_1199/fill/w_400,h_400,al_c,q_85/HORMONE%20BOOSTER.png",
    duration: "30 min",
    price: "฿1,990",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "hormone-booster-iv",
    featured: false,
    benefits: ["Zinc + L-carnitine", "Hormonal balance", "Endocrine support", "Pair with lab test"]
  },
  {
    id: "custom-infusion",
    title: "Custom Infusion",
    desc: "Bespoke IV formulation designed around your personal health goals.",
    longDesc: "Not sure which infusion is right for you? Our doctors will assess your health needs and design a custom IV formulation targeting your specific goals — whether recovery, performance, wellness, or a medical condition.",
    icon: <Droplets size={24} />,
    img: "https://static.wixstatic.com/media/209d18_8c290fa9b0cd44d88d19a6dece3d4094~mv2.png/v1/crop/x_15,y_0,w_1167,h_1199/fill/w_400,h_400,al_c,q_85/hangover%20infusion.png",
    duration: "Varies",
    price: "Price on Request",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "custom-infusion",
    featured: false,
    benefits: ["Doctor-designed formula", "Personalised to your goals", "Any health objective", "Consultation included"]
  },

  {
    id: "vitamin-b12-injection",
    title: "Vitamin B12 Injection",
    desc: "Quick intramuscular B12 shot to boost energy levels and support brain function.",
    longDesc: "Vitamin B12 (cyanocobalamin) injections bypass the digestive system for immediate absorption. Ideal for patients with B12 deficiency, fatigue, or those seeking a quick energy boost. Results are felt within 24–48 hours. Available at all branches.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/1ac6351f9bcf401d97a14e1ca36cea20.jpg/v1/fit/w_1400,h_1400,al_c,q_85/1ac6351f9bcf401d97a14e1ca36cea20.jpg",
    duration: "10 min",
    price: "฿250",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "vitamin-b12-injection",
    featured: false,
    benefits: ["Immediate absorption", "Energy & brain support", "B12 deficiency treatment", "Quick 10-minute visit"]
  },

  {
    id: "testosterone-injection",
    title: "Testosterone Injection (Testoviron)",
    desc: "Intramuscular testosterone (Testoviron 250mg) administered by a qualified physician.",
    longDesc: "Testoviron 250mg is an intramuscular testosterone injection used for testosterone replacement therapy and medically supervised hormone treatment. Administered by our doctors at the Bangrak branch. Prescription and medical assessment required.",
    icon: <Syringe size={24} />,
    img: "https://static.wixstatic.com/media/11062b_1ece9b1e3d7e48fbb363704f405339c6~mv2.jpg/v1/fit/w_2920,h_1610,al_c,q_90/11062b_1ece9b1e3d7e48fbb363704f405339c6~mv2.jpg",
    duration: "15 min",
    price: "฿350",
    category: "IV Drips",
    departmentId: "iv-drips",
    serviceId: "testosterone-injection",
    featured: false,
    benefits: ["Doctor-administered", "Prescription required", "250mg Testoviron", "Bangrak branch"]
  },

  // ── HEALTH CHECK-UPS ──────────────────────────────────────────────────────
  {
    id: "promo-health-check",
    title: "PROMOTION: Health Check Up",
    desc: "Affordable entry-level check-up covering all key health markers.",
    longDesc: "A basic, affordable check-up to assess key health markers. Tests Included: Physical Examination, Complete Blood Count, Fasting Sugar, Lipid Profile (Cholesterol, Triglyceride, HDL, LDL), Kidney Function Panel (Creatinine, BUN), Liver Function Panel (SGOT/AST, SGPT/ALT).",
    icon: <ClipboardList size={24} />,
    img: "https://static.wixstatic.com/media/0cdf50110adb40d0b0fc34078300e2d9.jpg/v1/fit/w_1920,h_1280,al_c,q_90/0cdf50110adb40d0b0fc34078300e2d9.jpg",
    duration: "30 min",
    price: "฿1,090",
    category: "Health Check-Ups",
    departmentId: "health-checkups",
    serviceId: "promo-health-check",
    featured: true,
    benefits: ["Physical exam", "CBC & blood sugar", "Lipid profile", "Kidney & liver panels"]
  },
  {
    id: "value-health-check",
    title: "Value Package Health Check Up",
    desc: "Basic health and wellness screening with urine and stool examination.",
    longDesc: "Basic health and wellness screening. Tests Included: Physical Examination, CBC, Fasting Blood Sugar, Lipid Profile, Kidney Function (Creatinine, GFR), Liver Function (SGOT, SGPT), Urine Examination, Stool Examination.",
    icon: <ClipboardList size={24} />,
    img: "https://static.wixstatic.com/media/e7cf6f86ca7541c39381bb60cee0716f.jpg/v1/fit/w_5760,h_3840,al_c,q_90/e7cf6f86ca7541c39381bb60cee0716f.jpg",
    duration: "20 min",
    price: "฿1,599",
    category: "Health Check-Ups",
    departmentId: "health-checkups",
    serviceId: "value-health-check",
    featured: false,
    benefits: ["8-panel test", "Urine & stool included", "GFR kidney test", "Affordable screening"]
  },
  {
    id: "drinkers-check",
    title: "Drinker's Health Check Up",
    desc: "Specialised liver, kidney, and metabolic panel for regular drinkers.",
    longDesc: "For people who consume alcohol regularly. Tests Included: Liver Function Test, GGT (Gamma-glutamyl transferase), Kidney Function, Lipid Profile, Vitamin B12, Diabetes Screening, Complete Blood Test.",
    icon: <ClipboardList size={24} />,
    img: "https://static.wixstatic.com/media/209d18_fb6225c863944819bd03e259e5ed1c40~mv2.jpg/v1/fit/w_1000,h_667,al_c,q_85/209d18_fb6225c863944819bd03e259e5ed1c40~mv2.jpg",
    duration: "15 min",
    price: "฿2,990",
    category: "Health Check-Ups",
    departmentId: "health-checkups",
    serviceId: "drinkers-check",
    featured: false,
    benefits: ["GGT liver marker", "B12 & diabetes screen", "Kidney & lipid panel", "Tailored for drinkers"]
  },
  {
    id: "fitness-check",
    title: "Fitness Health Check-Up",
    desc: "Comprehensive panel for active individuals monitoring health and performance.",
    longDesc: "For those who are active and want to monitor their health and performance. Tests: CBC, Liver Function, ESR, Fasting Blood Sugar, HbA1C, Lipid Profile, Calcium, Vitamin D Total, BUN, Creatinine, Electrolytes, and Cortisol.",
    icon: <ClipboardList size={24} />,
    img: "https://static.wixstatic.com/media/209d18_35a98cbcb8b0448383ef1055343cb3e3~mv2.jpg/v1/fit/w_1000,h_666,al_c,q_85/209d18_35a98cbcb8b0448383ef1055343cb3e3~mv2.jpg",
    duration: "30 min",
    price: "฿4,500",
    category: "Health Check-Ups",
    departmentId: "health-checkups",
    serviceId: "fitness-check",
    featured: false,
    benefits: ["Vitamin D & Calcium", "Cortisol & HbA1C", "Electrolytes panel", "Athlete-focused"]
  },
  {
    id: "happy-life-check",
    title: "Happy Life Program",
    desc: "Comprehensive 18-panel check including tumour markers, thyroid, and hepatitis.",
    longDesc: "฿5,199 for female | ฿5,999 for male. Tests: Physical Exam, CBC, Fasting Blood Sugar, HbA1C, Lipid Profile, Uric Acid, Kidney Panel, Liver Panel, Thyroid Panel (Free T4, TSH), Hepatitis Screening (HBsAg, HBsAb, Anti-HCV), Tumour Markers (CEA, AFP), PSA (Male), Urine & Stool Exam.",
    icon: <ClipboardList size={24} />,
    img: "https://static.wixstatic.com/media/32c0060d739ff25e09885ff621c39267.jpg/v1/fit/w_1280,h_866,al_c,q_85/32c0060d739ff25e09885ff621c39267.jpg",
    duration: "30 min",
    price: "฿5,199 / ฿5,999",
    category: "Health Check-Ups",
    departmentId: "health-checkups",
    serviceId: "happy-life-check",
    featured: false,
    benefits: ["Tumour markers", "Thyroid panel", "Hepatitis screening", "PSA for males"]
  },
  {
    id: "healthy-life-check",
    title: "Healthy Life Program",
    desc: "Premium full-body screening — our most comprehensive general check-up.",
    longDesc: "฿5,499 for female | ฿6,199 for male. All Happy Life tests plus Calcium, extended Kidney and Liver panels, Stool Occult Blood. The most thorough general health screening we offer.",
    icon: <ClipboardList size={24} />,
    img: "https://static.wixstatic.com/media/d66527c1e3124e97a85a197dc2964fbe.jpg/v1/fit/w_5618,h_3745,al_c,q_90/d66527c1e3124e97a85a197dc2964fbe.jpg",
    duration: "30 min",
    price: "฿5,499 / ฿6,199",
    category: "Health Check-Ups",
    departmentId: "health-checkups",
    serviceId: "healthy-life-check",
    featured: false,
    benefits: ["Full-body screening", "Calcium & occult blood", "Stool & urine exam", "Most comprehensive"]
  },

  // ── HORMONE PANELS ────────────────────────────────────────────────────────
  {
    id: "mid-age-hormone",
    title: "Mid-Age Women's Hormone Panel (20–35)",
    desc: "PCOS, fertility, acne, and menstrual issues — comprehensive hormone panel.",
    longDesc: "For PCOS, fertility concerns, acne, and menstrual issues. Tests: FSH, LH, Estradiol, Progesterone (Day 21), Prolactin, Testosterone (Total + Free), DHEA-S, TSH + Free T3/T4, AMH, Insulin, Fasting Glucose, Vitamin D, B12, Ferritin.",
    icon: <Activity size={24} />,
    img: "https://static.wixstatic.com/media/209d18_5082fb63bdaa4071ac29e1277a1b450d~mv2.jpg/v1/fit/w_1000,h_667,al_c,q_85/209d18_5082fb63bdaa4071ac29e1277a1b450d~mv2.jpg",
    duration: "30 min",
    price: "฿12,990",
    category: "Hormone Panels",
    departmentId: "hormone-panels",
    serviceId: "mid-age-hormone",
    featured: true,
    benefits: ["AMH fertility marker", "Full reproductive panel", "Vitamin D & B12", "PCOS & thyroid screen"]
  },
  {
    id: "teen-hormone",
    title: "Teen Hormone Balance (Ages 13–19)",
    desc: "Puberty-related hormone panel for irregular periods, acne, and mood swings.",
    longDesc: "For puberty-related hormone issues including irregular periods, acne, and mood swings. Tests: FSH, LH, Estradiol, Progesterone, Prolactin, Testosterone (Total + Free), DHEA-S, TSH + Free T3/T4, AMH, Insulin, Fasting Glucose.",
    icon: <Activity size={24} />,
    img: "https://static.wixstatic.com/media/209d18_34a32d078efb4796a5227c6eced6f749~mv2.jpg/v1/fit/w_1000,h_667,al_c,q_85/209d18_34a32d078efb4796a5227c6eced6f749~mv2.jpg",
    duration: "30 min",
    price: "฿10,990",
    category: "Hormone Panels",
    departmentId: "hormone-panels",
    serviceId: "teen-hormone",
    featured: false,
    benefits: ["Ages 13–19", "Puberty hormone panel", "Acne & mood assessment", "Thyroid included"]
  },
  {
    id: "perimenopause-panel",
    title: "Perimenopause Panel (Ages 35–50)",
    desc: "Cycle changes, hot flashes, and mood swings — full perimenopause screening.",
    longDesc: "For cycle changes, hot flashes, and mood swings. Tests: FSH, LH, Estradiol, Progesterone, Testosterone (Total + Free), DHEA-S, Cortisol (AM), TSH + Free T3/T4, HbA1c, Fasting Glucose, Insulin, Vitamin D, B12, Magnesium, Calcium, Lipid Profile.",
    icon: <Activity size={24} />,
    img: "https://static.wixstatic.com/media/209d18_7b1664c019924e88bfec1c1451c23fe4~mv2.jpg/v1/fit/w_1000,h_667,al_c,q_85/209d18_7b1664c019924e88bfec1c1451c23fe4~mv2.jpg",
    duration: "30 min",
    price: "฿14,990",
    category: "Hormone Panels",
    departmentId: "hormone-panels",
    serviceId: "perimenopause-panel",
    featured: false,
    benefits: ["Cortisol & HbA1c", "Magnesium & Calcium", "Lipid profile included", "Most comprehensive"]
  },
  {
    id: "perimenopause-value",
    title: "Perimenopause Hormone Check-Up (Value)",
    desc: "Budget-friendly option for women 35–50 with early symptoms.",
    longDesc: "Budget option for women aged 35–50 with early perimenopause symptoms. Tests Included: FSH, Estradiol, TSH, Free T4, Prolactin. A targeted starting point for hormonal assessment.",
    icon: <Activity size={24} />,
    img: "https://static.wixstatic.com/media/209d18_0a24c51ae24e44018f39f96fc2bf8b61~mv2.jpg/v1/fit/w_1000,h_667,al_c,q_85/209d18_0a24c51ae24e44018f39f96fc2bf8b61~mv2.jpg",
    duration: "30 min",
    price: "฿1,990",
    category: "Hormone Panels",
    departmentId: "hormone-panels",
    serviceId: "perimenopause-value",
    featured: false,
    benefits: ["5-marker panel", "Affordable entry point", "Ages 35–50", "FSH & TSH screen"]
  },
  {
    id: "postmenopause-panel",
    title: "Postmenopause Panel (Ages 50+)",
    desc: "Bone, heart, and metabolic health monitoring after menopause.",
    longDesc: "For bone, heart, and metabolic health after menopause. Tests: FSH, LH, Estradiol, Testosterone, DHEA-S, TSH + Free T3/T4, Vitamin D, Calcium, Phosphorus, B12, Folate, Ferritin, HbA1c, Fasting Glucose, Insulin, Lipid Profile, hs-CRP.",
    icon: <Activity size={24} />,
    img: "https://static.wixstatic.com/media/209d18_38302513285140f482988652610ec5b0~mv2.png/v1/fit/w_836,h_563,al_c/209d18_38302513285140f482988652610ec5b0~mv2.png",
    duration: "30 min",
    price: "฿12,990",
    category: "Hormone Panels",
    departmentId: "hormone-panels",
    serviceId: "postmenopause-panel",
    featured: false,
    benefits: ["hs-CRP inflammation", "Bone health markers", "Cardiovascular panel", "Ages 50+"]
  },
  {
    id: "female-hormone-balance",
    title: "Female Hormone Balance Check-Up",
    desc: "General female hormone and ovarian health screening.",
    longDesc: "For general female hormone and ovarian health. Tests Included: FSH, LH, Estradiol, TSH, Free T4, Prolactin, Vitamin D. A versatile panel suitable for women of any age seeking a hormonal overview.",
    icon: <Activity size={24} />,
    img: "https://static.wixstatic.com/media/209d18_b3f115d2fb89487fba46aaa47fa88269~mv2.jpg/v1/fit/w_1000,h_667,al_c,q_85/209d18_b3f115d2fb89487fba46aaa47fa88269~mv2.jpg",
    duration: "30 min",
    price: "฿3,990",
    category: "Hormone Panels",
    departmentId: "hormone-panels",
    serviceId: "female-hormone-balance",
    featured: false,
    benefits: ["Ovarian health", "Thyroid included", "Vitamin D", "All adult ages"]
  },

  // ── ALLERGY TESTS ─────────────────────────────────────────────────────────
  {
    id: "inhalation-allergy",
    title: "Inhalation Allergy Test (20 Allergens)",
    desc: "Test for 20 environmental allergens including dust mites, pets, and mould.",
    longDesc: "Tests IgE response to 20 inhalation allergens: tree mix, Australian pine, Acacia, oil palm, grass mix, house dust mite, cockroach, kapok, cat, dog, cage bird mix, guinea pig, mouse, rabbit, hamster, mould mix, candida albicans, and more.",
    icon: <AlertTriangle size={24} />,
    img: "https://static.wixstatic.com/media/11062b_c3448f92a4b54edc8aa06c723862902c~mv2.jpeg/v1/fit/w_800,h_600,al_c,q_85/11062b_c3448f92a4b54edc8aa06c723862902c~mv2.jpeg",
    duration: "15 min",
    price: "฿3,490",
    category: "Allergy Tests",
    departmentId: "allergy-tests",
    serviceId: "inhalation-allergy",
    featured: true,
    benefits: ["20 allergens", "Dust mites & pets", "Mould & pollen", "Same-day results"]
  },
  {
    id: "pediatric-allergens",
    title: "Pediatric Allergens (27 Tests)",
    desc: "27 IgE antibody tests covering the most common childhood allergens.",
    longDesc: "Tests IgE antibodies to 27 paediatric allergens covering the most common triggers in children — foods, environmental allergens, and pet danders. Suitable for infants and children with suspected allergic conditions.",
    icon: <AlertTriangle size={24} />,
    img: "https://static.wixstatic.com/media/2bcb4c625d5d4d9abb38404c12372e54.jpg/v1/fit/w_3842,h_2511,al_c,q_90/2bcb4c625d5d4d9abb38404c12372e54.jpg",
    duration: "15 min",
    price: "฿4,900",
    category: "Allergy Tests",
    departmentId: "allergy-tests",
    serviceId: "pediatric-allergens",
    featured: false,
    benefits: ["27 allergens", "Child-specific panel", "Food & environmental", "For infants & children"]
  },
  {
    id: "food-20-allergens",
    title: "Food Allergen Profile (20 Foods)",
    desc: "Specific IgE test for 20 common food allergens including nuts, shellfish, and dairy.",
    longDesc: "Food profile covering 20 specific IgE allergens: Egg white, Egg yolk, Cow's milk, Wheat flour, Rice, Sesame, Soybean, Peanut, Hazelnut, Beef, Pork, Chicken, Shellfish mix, Fish mix, Crab, Shrimp/prawn, Lobster, Blue crab, Chocolate, Glutamate.",
    icon: <AlertTriangle size={24} />,
    img: "https://static.wixstatic.com/media/11062b_e9154fa95f3c4cad903da1e1a823b55b~mv2.jpg/v1/fit/w_800,h_600,al_c,q_85/11062b_e9154fa95f3c4cad903da1e1a823b55b~mv2.jpg",
    duration: "15 min",
    price: "฿3,400",
    category: "Allergy Tests",
    departmentId: "allergy-tests",
    serviceId: "food-20-allergens",
    featured: false,
    benefits: ["20 food allergens", "Shellfish & nuts", "Dairy & gluten", "Blood test only"]
  },
  {
    id: "food-intolerance-222",
    title: "Food Intolerance (IgG — 222 Foods)",
    desc: "Comprehensive IgG food intolerance test covering 222 foods.",
    longDesc: "Measures specific IgG responses to 222 foods to identify food intolerances (distinct from allergies). IgG reactions can cause delayed symptoms including bloating, fatigue, skin issues, and digestive discomfort. Suitable for adults with chronic unexplained symptoms.",
    icon: <AlertTriangle size={24} />,
    img: "https://static.wixstatic.com/media/8ea70678ba8d4725b3ae79d832a5e7cd.jpg/v1/fit/w_6000,h_4000,al_c,q_90/8ea70678ba8d4725b3ae79d832a5e7cd.jpg",
    duration: "15 min",
    price: "฿15,000",
    category: "Allergy Tests",
    departmentId: "allergy-tests",
    serviceId: "food-intolerance-222",
    featured: false,
    benefits: ["222 foods tested", "IgG intolerance (not allergy)", "Chronic symptom investigation", "Detailed report"]
  },
  {
    id: "food-inhalation-ige",
    title: "Food & Inhalation IgE Profile",
    desc: "Combined food and environmental allergy panel — blood test for specific IgE.",
    longDesc: "Blood test for specific IgE antibodies to both food and inhalation allergens in a single panel. Ideal for patients with mixed or unclear allergy triggers affecting both diet and environment.",
    icon: <AlertTriangle size={24} />,
    img: "https://static.wixstatic.com/media/11062b_e9154fa95f3c4cad903da1e1a823b55b~mv2.jpg/v1/fit/w_800,h_600,al_c,q_85/11062b_e9154fa95f3c4cad903da1e1a823b55b~mv2.jpg",
    duration: "15 min",
    price: "฿5,500",
    category: "Allergy Tests",
    departmentId: "allergy-tests",
    serviceId: "food-inhalation-ige",
    featured: false,
    benefits: ["Food + inhalation combined", "Single blood draw", "Mixed triggers", "Full IgE report"]
  },

  // ── CERTIFICATES & MEDICAL EXAMS ──────────────────────────────────────────
  {
    id: "ekg",
    title: "Electrocardiogram (EKG 12 Leads)",
    desc: "Check your heart rhythm and electrical activity — results with the doctor.",
    longDesc: "A 12-lead ECG records the electrical activity of your heart from 12 different angles. Results are reviewed by our physician immediately. Online consultation with a cardiologist specialist is available on request (extra fee).",
    icon: <FileText size={24} />,
    img: "https://static.wixstatic.com/media/209d18_be2127380fd84fa1ac16ed716191030b~mv2.jpg/v1/fit/w_2000,h_2000,al_c,q_90/209d18_be2127380fd84fa1ac16ed716191030b~mv2.jpg",
    duration: "15 min",
    price: "฿250",
    category: "Certificates",
    departmentId: "certificates",
    serviceId: "ekg",
    featured: true,
    benefits: ["12-lead ECG", "Doctor review included", "Cardiologist consult available", "Fast results"]
  },
  {
    id: "cert-work-permit",
    title: "Medical Certificate — Work Permit",
    desc: "Certificate for the 6 specified work permit diseases. Same-day issue.",
    longDesc: "Medical certificate confirming the 6 diseases specified in the Thai work permit application form. Issued by our physician on the same day after a brief examination. Accepted by Thai immigration and labour authorities.",
    icon: <FileText size={24} />,
    img: "https://static.wixstatic.com/media/f264a74cf9b642f1b5a7ea472e322a44.jpg/v1/fit/w_5486,h_3835,al_c,q_90/f264a74cf9b642f1b5a7ea472e322a44.jpg",
    duration: "10 min",
    price: "฿150",
    category: "Certificates",
    departmentId: "certificates",
    serviceId: "cert-work-permit",
    featured: false,
    benefits: ["Same-day issue", "6-disease panel", "Thai authorities accepted", "English & Thai"]
  },
  {
    id: "cert-driving",
    title: "Medical Certificate — Driving Licence",
    desc: "Certificate for Thai driving licence, marine, or engineering applications.",
    longDesc: "ใบรับรองแพทย์เพื่อทำใบขับขี่ ใบนายท้าย ใบช่างเครื่อง — Medical certificate for obtaining a Thai driving licence, boat captain licence, or marine engineer licence. Issued same day.",
    icon: <FileText size={24} />,
    img: "https://static.wixstatic.com/media/61ed46c9211445269553bc195961eba5.jpg/v1/fit/w_1290,h_860,al_c,q_85/61ed46c9211445269553bc195961eba5.jpg",
    duration: "10 min",
    price: "฿100",
    category: "Certificates",
    departmentId: "certificates",
    serviceId: "cert-driving",
    featured: false,
    benefits: ["Driving licence", "Marine / boat licence", "Same-day issue", "Thai DLT accepted"]
  },
  {
    id: "cert-diving",
    title: "Medical Certificate — Diving (PADI)",
    desc: "Medical clearance certificate for PADI and scuba diving course enrolment.",
    longDesc: "ใบรับรองแพทย์เพื่อประกอบการขอใบอนุญาตดำน้ำ — Easy steps to get your medical certificate for PADI and other scuba diving courses. Our physician performs a fitness assessment and issues the required certificate on the same visit.",
    icon: <FileText size={24} />,
    img: "https://static.wixstatic.com/media/6a61aed3822b43b7bf08e9d97a1a1ab8.jpg/v1/fit/w_3920,h_3346,al_c,q_90/6a61aed3822b43b7bf08e9d97a1a1ab8.jpg",
    duration: "10 min",
    price: "฿150",
    category: "Certificates",
    departmentId: "certificates",
    serviceId: "cert-diving",
    featured: false,
    benefits: ["PADI accepted", "Same-day issue", "Fitness assessment", "All diving courses"]
  }
];

// ── Branch availability map (mirrors booking-section.tsx) ─────────────────
const _C = "Chaweng";
const _B = "Bangrak";
const _R = "Rajabhat University";
const _HV = "Home Visit";
const _ALL = [_C, _B, _R, _HV];
const _CBR = [_C, _B, _R];

const SERVICE_BRANCHES_MAP: Record<string, string[]> = {
  // General Medicine
  "doctor-appointment": _CBR,    "hotel-home-visit": [_C, _HV], "wound-care": _CBR,
  "remove-suture": _CBR,         "remove-staples": _CBR,        "nebulization": [_C],
  "ear-cleaning": [_C],          "repeat-prescriptions": [_C],
  // Vaccines
  "influenza-vaccine": _CBR,     "influenza-home": [_C, _R],    "efluelda": [_C],
  "tetanus": _CBR,               "typhoid": _CBR,               "twinrix": [_C, _B],
  "meningococcal": [_C],         "rabies": _CBR,
  // Sexual Health
  "sexual-health-check": [_C],   "hiv-test": [_C],              "sti-test": [_C],
  "syphilis-test": [_C],         "hpv-test": [_C],              "contraceptive-injection": [_C],
  "beta-hcg": [_C],              "pap-smear": [_C, _B],
  // Lab Tests
  "lab-tests": [_C],
  // IV Drips
  "immune-booster-iv": _ALL,     "essential-vitamins": _ALL,    "post-covid": _ALL,
  "iron-infusion": _ALL,         "myers-cocktail": _ALL,        "power-recharge": _ALL,
  "pure-vitamin-c": _ALL,        "whitening-infusion": _ALL,    "perfect-skin-iv": _ALL,
  "liver-detox-iv": _ALL,        "travellers-diarrhea": _ALL,   "hangover-iv": _ALL,
  "cellular-detox": _ALL,        "nad-plus": _ALL,              "nad-plus-up": _ALL,
  "expert-diabetes": _ALL,       "fat-burner-iv": _ALL,         "brain-enhancer": _ALL,
  "insomnia-depression": _ALL,   "hormone-booster-iv": _ALL,    "custom-infusion": _ALL,
  "vitamin-b12-injection": _CBR, "testosterone-injection": [_B],
  // Health Check-Ups
  "promo-health-check": _ALL,    "value-health-check": _ALL,    "drinkers-check": _ALL,
  "fitness-check": _ALL,         "happy-life-check": _ALL,      "healthy-life-check": _ALL,
  // Hormone Panels
  "mid-age-hormone": _ALL,       "teen-hormone": _ALL,          "perimenopause-panel": _ALL,
  "perimenopause-value": _ALL,   "postmenopause-panel": _ALL,   "female-hormone-balance": _ALL,
  // Allergy Tests
  "inhalation-allergy": _CBR,    "pediatric-allergens": [_C],   "food-20-allergens": [_C],
  "food-intolerance-222": [_C],  "food-inhalation-ige": [_C],
  // Certificates
  "ekg": [_C],  "cert-work-permit": [_C],  "cert-driving": [_C],  "cert-diving": [_C],
};

const SERVICES_WITH_BRANCHES = SERVICES_DATA.map(s => ({
  ...s,
  branches: SERVICE_BRANCHES_MAP[s.id] ?? _ALL,
}));

const FEATURED_SERVICES = SERVICES_WITH_BRANCHES.filter(s => s.featured);

export function Services() {
  const { setSelectedService, isCatalogueOpen, setIsCatalogueOpen } = useBooking();
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<typeof SERVICES_WITH_BRANCHES[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDept, setActiveDept] = useState("All");
  const [activeBranch, setActiveBranch] = useState("All");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredServices = SERVICES_WITH_BRANCHES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept   = activeDept   === "All" || service.departmentId === activeDept;
    const matchesBranch = activeBranch === "All" || service.branches.includes(activeBranch);
    return matchesSearch && matchesDept && matchesBranch;
  });

  const handleBookNow = (service: typeof SERVICES_WITH_BRANCHES[0]) => {
    setSelectedService({ department: service.departmentId, service: service.serviceId });
    setIsOpen(false);
    setIsBookingModalOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openServiceDetail = (service: typeof SERVICES_WITH_BRANCHES[0]) => {
    setSelectedServiceDetail(service);
    setIsOpen(true);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white scroll-mt-20" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="inline-block px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold uppercase tracking-wider mb-6">
          Services
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#080708] mb-16">
          Our Comprehensive Services
        </h2>

        <div className="absolute right-4 sm:right-6 lg:right-8 top-0 mt-20 hidden md:flex gap-2">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-[#080708] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-[#3eb5bd] flex items-center justify-center text-white hover:bg-[#35a0a8] transition-colors shadow-lg shadow-[#3eb5bd]/20"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-6 snap-x snap-mandatory hide-scrollbar"
        >
          {FEATURED_SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-left flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#7fd3d7] hover:shadow-xl transition-all duration-300 w-[300px] md:w-[350px] snap-start shrink-0 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden shrink-0">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                  <Clock size={11} className="text-[#3eb5bd]" />
                  {service.duration}
                </div>
                <div className="absolute top-3 right-3 bg-[#1D84D7] text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                  {service.price}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-[#080708] leading-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-grow">
                  {service.desc}
                </p>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => openServiceDetail(service)}
                    className="flex-1 text-sm font-semibold text-slate-600 border border-slate-200 px-3 py-2.5 rounded-xl hover:border-[#3eb5bd] hover:text-[#3eb5bd] transition-all duration-200"
                  >
                    Show Details
                  </button>
                  <button
                    onClick={() => handleBookNow(service)}
                    className="flex-1 bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1 shadow-sm shadow-[#3eb5bd]/20"
                  >
                    Book Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <Dialog.Root open={isCatalogueOpen} onOpenChange={setIsCatalogueOpen}>
            <Dialog.Trigger asChild>
              <button className="bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-lg shadow-[#3eb5bd]/20 hover:-translate-y-1 inline-flex items-center gap-2">
                See All Services
                <ArrowRight size={18} />
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {isCatalogueOpen && (
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
                      initial={{ opacity: 0, y: "100%" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="fixed inset-0 z-50 bg-slate-50 overflow-hidden flex flex-col"
                    >
                      {/* Sticky Header */}
                      <div className="bg-white border-b border-slate-200 px-4 py-4 md:px-8 md:py-6 sticky top-0 z-10">
                        <div className="max-w-7xl mx-auto flex items-center justify-between mb-6">
                          <Dialog.Title className="text-2xl md:text-3xl font-heading font-bold text-[#080708]">Service Catalogue</Dialog.Title>
                          <Dialog.Close asChild>
                            <button className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors">
                              <X size={20} />
                            </button>
                          </Dialog.Close>
                        </div>

                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
                          <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                              type="text"
                              placeholder="Search services, symptoms, or treatments..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-transparent focus:bg-white focus:border-[#3eb5bd] focus:ring-2 focus:ring-[#c9eff2] rounded-xl transition-all outline-none"
                            />
                          </div>
                          <div className="flex gap-3 shrink-0">
                            <select
                              value={activeDept}
                              onChange={e => setActiveDept(e.target.value)}
                              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3eb5bd] cursor-pointer appearance-none pr-8 bg-[right_0.75rem_center] bg-no-repeat"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")` }}
                            >
                              <option value="All">All Departments</option>
                              <option value="general-medicine">General Medicine</option>
                              <option value="vaccines">Vaccines</option>
                              <option value="sexual-health">Sexual Health</option>
                              <option value="lab-tests">Lab Tests</option>
                              <option value="iv-drips">IV Drips</option>
                              <option value="health-checkups">Health Check-Ups</option>
                              <option value="hormone-panels">Hormone Panels</option>
                              <option value="allergy-tests">Allergy Tests</option>
                              <option value="certificates">Certificates &amp; Medical Exams</option>
                            </select>
                            <select
                              value={activeBranch}
                              onChange={e => setActiveBranch(e.target.value)}
                              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3eb5bd] cursor-pointer appearance-none pr-8 bg-[right_0.75rem_center] bg-no-repeat"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")` }}
                            >
                              <option value="All">All Branches</option>
                              <option value="Chaweng">Chaweng</option>
                              <option value="Bangrak">Bangrak</option>
                              <option value="Rajabhat University">Rajabhat University</option>
                              <option value="Home Visit">Home Visit</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Catalogue Content */}
                      <div className="flex-grow overflow-y-auto p-4 md:p-8">
                        <div className="max-w-7xl mx-auto">
                          {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {filteredServices.map((service) => (
                                <div key={service.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#7fd3d7] hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
                                  {/* Image with overlaid badges */}
                                  <div className="relative h-44 overflow-hidden shrink-0">
                                    <Image
                                      src={service.img}
                                      alt={service.title}
                                      fill
                                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                                      referrerPolicy="no-referrer"
                                    />
                                    {/* Duration badge — top left */}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                                      <Clock size={11} className="text-[#3eb5bd]" />
                                      {service.duration}
                                    </div>
                                    {/* Price badge — top right */}
                                    <div className="absolute top-3 right-3 bg-[#1D84D7] text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                                      {service.price}
                                    </div>
                                    {/* Category tag — bottom right of image */}
                                    <div className="absolute bottom-3 right-3 bg-[#080708]/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                                      {service.category}
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div className="p-5 flex flex-col flex-grow">
                                    {/* Icon + Title row */}
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="shrink-0 bg-[#edf9fa] p-2 rounded-xl text-[#3eb5bd]">
                                        {service.icon}
                                      </div>
                                      <h3 className="font-bold text-[#080708] text-base leading-snug">{service.title}</h3>
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed flex-grow mb-5">{service.desc}</p>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                      <button
                                        onClick={() => openServiceDetail(service)}
                                        className="flex-1 text-sm font-semibold text-slate-600 border border-slate-200 px-3 py-2.5 rounded-xl hover:border-[#3eb5bd] hover:text-[#3eb5bd] transition-all duration-200"
                                      >
                                        Show Details
                                      </button>
                                      <button
                                        onClick={() => handleBookNow(service)}
                                        className="flex-1 bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1 shadow-sm shadow-[#3eb5bd]/20"
                                      >
                                        Book Now <ArrowRight size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-20">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <Search className="text-slate-400" size={24} />
                              </div>
                              <h3 className="text-xl font-bold text-[#080708] mb-2">No services found</h3>
                              <p className="text-slate-500">Try adjusting your search or category filters.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <AnimatePresence>
          {isOpen && selectedServiceDetail && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#080708]/40 backdrop-blur-sm z-[60]"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed left-[50%] top-[50%] z-[60] w-full max-w-2xl -translate-x-[50%] -translate-y-[50%] bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                  <div className="relative h-48 md:h-64 w-full shrink-0">
                    <Image src={selectedServiceDetail.img} alt={selectedServiceDetail.title} fill className="object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080708]/80 to-transparent"></div>
                    <Dialog.Close asChild>
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 bg-[#3eb5bd] text-white text-xs font-bold rounded-full mb-3">
                          {selectedServiceDetail.category}
                        </span>
                        <Dialog.Title className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                          {selectedServiceDetail.title}
                        </Dialog.Title>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-right shrink-0">
                        <p className="text-xs font-medium opacity-80">Starting from</p>
                        <p className="text-lg font-bold">{selectedServiceDetail.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 overflow-y-auto flex-grow">
                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock size={18} className="text-[#3eb5bd]" />
                        <span className="font-medium">{selectedServiceDetail.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <ShieldPlus size={18} className="text-[#3eb5bd]" />
                        <span className="font-medium">Certified Specialists</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#080708] mb-4">Overview</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                      {selectedServiceDetail.longDesc}
                    </p>

                    <h3 className="text-lg font-bold text-[#080708] mb-4">Key Benefits</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {selectedServiceDetail.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                          <span className="text-slate-700 text-sm font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0">
                    <button
                      onClick={() => handleBookNow(selectedServiceDetail)}
                      className="w-full bg-[#3eb5bd] hover:bg-[#35a0a8] text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#3eb5bd]/20"
                    >
                      Book Now
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>

      {/* Booking Modal */}
      <Dialog.Root open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <AnimatePresence>
          {isBookingModalOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#080708]/40 backdrop-blur-sm z-[70]"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed left-[50%] top-[50%] z-[70] w-full max-w-2xl -translate-x-[50%] -translate-y-[50%] bg-[#080708] rounded-3xl shadow-2xl max-h-[90vh] flex flex-col"
                >
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <Dialog.Title className="text-2xl font-bold text-white">Fast Booking</Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className="overflow-y-auto overflow-x-visible">
                    <BookingForm isModal={true} />
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

// Hardcoded fallback — displayed when Wix CMS Team collection is empty
const FALLBACK_TEAM: WixTeamMember[] = [
  { _id: "f1", name: "Dr. Sarah Jenkins", role: "General Practitioner", Category_Tag: ["Doctor"], image: "https://picsum.photos/seed/doc1/400/400", experience: "15+ Years" },
  { _id: "f2", name: "Dr. Michael Chen", role: "Pediatrician", Category_Tag: ["Doctor"], image: "https://picsum.photos/seed/doc2/400/400", experience: "12+ Years" },
  { _id: "f3", name: "Dr. Emily Rodriguez", role: "Dermatologist", Category_Tag: ["Doctor"], image: "https://picsum.photos/seed/doc3/400/400", experience: "10+ Years" },
  { _id: "f4", name: "Dr. James Wilson", role: "Cardiologist", Category_Tag: ["Doctor"], image: "https://picsum.photos/seed/doc4/400/400", experience: "20+ Years" },
  { _id: "f5", name: "Alex Thompson", role: "Clinical Pharmacist", Category_Tag: ["Pharmacist"], image: "https://picsum.photos/seed/pharm1/400/400", experience: "8+ Years" },
  { _id: "f6", name: "Linda Park", role: "Senior Pharmacist", Category_Tag: ["Pharmacist"], image: "https://picsum.photos/seed/pharm2/400/400", experience: "14+ Years" },
  { _id: "f7", name: "Maria Santos", role: "Registered Nurse", Category_Tag: ["Nurse"], image: "https://picsum.photos/seed/nurse1/400/400", experience: "7+ Years" },
  { _id: "f8", name: "Tom Nakamura", role: "Senior Nurse", Category_Tag: ["Nurse"], image: "https://picsum.photos/seed/nurse2/400/400", experience: "11+ Years" },
];

export function Team({ members = [] }: { members?: WixTeamMember[] }) {
  const [isTeamCatalogueOpen, setIsTeamCatalogueOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Use CMS data if available, else show hardcoded fallback
  const allTeamMembers = members.length > 0 ? members : FALLBACK_TEAM;

  const featuredDoctors = allTeamMembers.filter(m =>
    Array.isArray(m.Category_Tag) ? m.Category_Tag.includes("Doctor") : m.Category_Tag === "Doctor"
  );

  const filteredMembers = allTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const memberTags = Array.isArray(member.Category_Tag) ? member.Category_Tag : [member.Category_Tag];
    const matchesRole = roleFilter === "All" || memberTags.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  return (
    <section className="py-20 bg-[#fbfbfb] scroll-mt-20" id="doctors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold uppercase tracking-wider mb-6">
            Our Team
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#080708]">
            Meet Our Specialists
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 lg:grid-cols-4 sm:gap-6">
          {featuredDoctors.map((doc, i) => (
            <motion.div
              key={doc._id ?? i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-[65vw] min-w-[65vw] shrink-0 snap-start sm:w-auto sm:min-w-0 bg-white rounded-3xl p-4 shadow-sm border border-slate-100 group hover:shadow-md transition-shadow relative cursor-default"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                {doc.image ? (
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-4xl font-bold">
                    {doc.name.charAt(0)}
                  </div>
                )}
                {doc.experience && (
                  <div className="absolute top-2 left-2 flex gap-2">
                    <span className="bg-[#3eb5bd] px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm">
                      {doc.experience}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-[#080708]">{doc.name}</h3>
              <p className="text-sm text-[#3eb5bd] font-medium">{doc.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsTeamCatalogueOpen(true)}
            className="text-[#3eb5bd] font-semibold inline-flex items-center gap-2 hover:text-[#2d9aa2] transition-colors"
          >
            View All Doctors <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Team Catalogue Modal */}
      <Dialog.Root open={isTeamCatalogueOpen} onOpenChange={setIsTeamCatalogueOpen}>
        <AnimatePresence>
          {isTeamCatalogueOpen && (
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
                  <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-6 md:px-10">
                    <div className="flex items-center justify-between mb-6">
                      <Dialog.Title className="text-2xl md:text-3xl font-heading font-bold text-[#080708]">
                        Our Team
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
                          placeholder="Search by name or specialisation..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#3eb5bd] focus:ring-2 focus:ring-[#c9eff2] outline-none transition-all"
                        />
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar shrink-0">
                        {["All", "Doctor", "Pharmacist", "Nurse"].map(role => (
                          <button
                            key={role}
                            onClick={() => setRoleFilter(role)}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                              roleFilter === role
                                ? "bg-[#080708] text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {role === "All" ? "All" : `${role}s`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto p-6 md:p-10 bg-slate-50">
                    {filteredMembers.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {filteredMembers.map((member, i) => (
                          <div
                            key={member._id ?? i}
                            className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-shadow"
                          >
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100">
                              {member.image ? (
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  fill
                                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-3xl font-bold">
                                  {member.name.charAt(0)}
                                </div>
                              )}
                              {member.experience && (
                                <div className="absolute top-2 left-2">
                                  <span className="bg-[#3eb5bd] px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm">
                                    {member.experience}
                                  </span>
                                </div>
                              )}
                            </div>
                            <p className="text-xs font-bold text-[#1D84D7] uppercase tracking-wider mb-1">
                              {Array.isArray(member.Category_Tag) ? member.Category_Tag[0] : member.Category_Tag}
                            </p>
                            <h3 className="text-sm font-bold text-[#080708] leading-tight">{member.name}</h3>
                            <p className="text-xs text-[#3eb5bd] font-medium mt-0.5">{member.role}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-500">
                        <Search size={48} className="mb-4 text-slate-300" />
                        <p className="text-lg font-medium">No team members found.</p>
                        <button
                          onClick={() => { setSearchQuery(""); setRoleFilter("All"); }}
                          className="mt-4 text-[#3eb5bd] font-semibold hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    )}
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
