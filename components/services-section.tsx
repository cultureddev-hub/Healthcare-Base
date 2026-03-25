"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  MonitorSmartphone,
  Stethoscope,
  Baby,
  ShieldPlus,
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

const SERVICES_DATA = [
  {
    id: "virtual-consult",
    title: "Virtual Consultations",
    desc: "Convenient and secure online appointments with our healthcare providers.",
    longDesc: "Our virtual consultations provide you with access to top-tier medical advice from the comfort of your home or hotel. Perfect for minor ailments, follow-up appointments, or initial assessments. Our secure platform ensures your privacy while delivering high-quality care.",
    icon: <MonitorSmartphone size={24} />,
    img: "https://picsum.photos/seed/virtual/600/800",
    duration: "15-30 mins",
    price: "฿800",
    category: "General",
    departmentId: "general",
    serviceId: "gen-1",
    benefits: ["No travel required", "Secure video link", "Digital prescriptions", "Flexible scheduling"]
  },
  {
    id: "in-person-visit",
    title: "In-Person Visits",
    desc: "Schedule face-to-face consultations at our state-of-the-art clinics.",
    longDesc: "Visit any of our modern, fully-equipped clinics across Koh Samui for comprehensive medical care. Our English-speaking doctors are ready to assist with a wide range of medical issues, ensuring you receive personalized and effective treatment.",
    icon: <Stethoscope size={24} />,
    img: "https://picsum.photos/seed/inperson/600/800",
    duration: "30-45 mins",
    price: "฿1,200",
    category: "General",
    departmentId: "general",
    serviceId: "gen-1",
    benefits: ["Comprehensive examination", "On-site diagnostics", "Immediate treatment", "Specialist referrals"]
  },
  {
    id: "pediatric-care",
    title: "Pediatric Care",
    desc: "Specialized care for children, available both online and offline.",
    longDesc: "We understand that your child's health is your top priority. Our pediatric services are designed to provide gentle, expert care for infants, children, and adolescents. From routine check-ups to managing illnesses, our team is here to support your child's well-being.",
    icon: <Baby size={24} />,
    img: "https://picsum.photos/seed/pediatric/600/800",
    duration: "30-60 mins",
    price: "฿1,500",
    category: "Specialist",
    departmentId: "general",
    serviceId: "gen-1",
    benefits: ["Child-friendly environment", "Experienced pediatricians", "Vaccination programs", "Developmental assessments"]
  },
  {
    id: "preventive-care",
    title: "Preventive Care",
    desc: "Routine screenings, vaccinations, and wellness check-ups.",
    longDesc: "Stay ahead of potential health issues with our comprehensive preventive care services. We offer tailored health screening packages, vaccinations, and lifestyle counseling to help you maintain optimal health and catch any concerns early.",
    icon: <ShieldPlus size={24} />,
    img: "https://picsum.photos/seed/preventive/600/800",
    duration: "45-60 mins",
    price: "From ฿2,500",
    category: "Wellness",
    departmentId: "general",
    serviceId: "gen-1",
    benefits: ["Comprehensive blood panels", "ECG & imaging", "Personalized health reports", "Lifestyle counseling"]
  },
  {
    id: "iv-therapy",
    title: "IV Drip Therapy",
    desc: "Rehydrate and recover quickly with our specialized IV treatments.",
    longDesc: "Whether you're recovering from a long flight, a night out, or simply need an immunity boost, our IV drip therapies deliver essential vitamins, minerals, and hydration directly into your bloodstream for fast and effective results.",
    icon: <ShieldPlus size={24} />,
    img: "https://picsum.photos/seed/ivdrip/600/800",
    duration: "45-60 mins",
    price: "From ฿1,800",
    category: "Wellness",
    departmentId: "iv-drip",
    serviceId: "iv-1",
    benefits: ["Fast hydration", "Vitamin boosts", "Hangover recovery", "Immunity support"]
  },
  {
    id: "wound-care",
    title: "Wound Care & Dressings",
    desc: "Professional cleaning, suturing, and dressing of minor wounds.",
    longDesc: "Accidents happen. Our clinics are equipped to handle minor injuries, cuts, and abrasions. We provide professional cleaning, suturing if necessary, and proper dressings to prevent infection and promote optimal healing.",
    icon: <Stethoscope size={24} />,
    img: "https://picsum.photos/seed/wound/600/800",
    duration: "15-45 mins",
    price: "From ฿1,000",
    category: "Urgent Care",
    departmentId: "general",
    serviceId: "gen-1",
    benefits: ["Infection prevention", "Professional suturing", "Tetanus shots available", "Follow-up care"]
  }
];

export function Services() {
  const { setSelectedService, isCatalogueOpen, setIsCatalogueOpen } = useBooking();
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<typeof SERVICES_DATA[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const categories = ["All", ...Array.from(new Set(SERVICES_DATA.map(s => s.category)))];

  const filteredServices = SERVICES_DATA.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookNow = (service: typeof SERVICES_DATA[0]) => {
    setSelectedService({ department: service.departmentId, service: service.serviceId });
    setIsOpen(false); // Close detail modal if open
    // setIsCatalogueOpen(false); // Keep catalogue modal open in the background
    setIsBookingModalOpen(true); // Open the new booking modal
  };

  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openServiceDetail = (service: typeof SERVICES_DATA[0]) => {
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
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
          Services
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-16">
          Our Comprehensive Services
        </h2>

        <div className="absolute right-4 sm:right-6 lg:right-8 top-0 mt-20 hidden md:flex gap-2">
          <button 
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-6 snap-x snap-mandatory hide-scrollbar"
        >
          {SERVICES_DATA.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-left flex flex-col h-full bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 w-[300px] md:w-[350px] lg:w-[400px] aspect-square snap-start shrink-0"
            >
              <div className="relative h-[45%] overflow-hidden shrink-0">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                  <Clock size={12} className="text-blue-600" />
                  {service.duration}
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {service.price}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                  <button 
                    onClick={() => openServiceDetail(service)}
                    className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Show more
                  </button>
                  <button 
                    onClick={() => handleBookNow(service)}
                    className="bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <Dialog.Root open={isCatalogueOpen} onOpenChange={setIsCatalogueOpen}>
            <Dialog.Trigger asChild>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1 inline-flex items-center gap-2">
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
                      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
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
                          <Dialog.Title className="text-2xl md:text-3xl font-heading font-bold text-slate-900">Service Catalogue</Dialog.Title>
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
                              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all outline-none"
                            />
                          </div>
                          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                            {categories.map(cat => (
                              <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                                  activeCategory === cat 
                                    ? "bg-slate-900 text-white" 
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Catalogue Content */}
                      <div className="flex-grow overflow-y-auto p-4 md:p-8">
                        <div className="max-w-7xl mx-auto">
                          {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {filteredServices.map((service) => (
                                <div key={service.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                                  <div className="flex justify-between items-start mb-4">
                                    <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                                      {service.icon}
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                      {service.category}
                                    </span>
                                  </div>
                                  <h3 className="font-bold text-slate-900 text-lg mb-2">{service.title}</h3>
                                  <p className="text-sm text-slate-600 mb-6 flex-grow">{service.desc}</p>
                                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex flex-col">
                                      <span className="text-xs text-slate-500 font-medium">{service.duration}</span>
                                      <span className="text-sm font-bold text-blue-600">{service.price}</span>
                                    </div>
                                    <button 
                                      onClick={() => handleBookNow(service)}
                                      className="bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                                    >
                                      Book Now
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-20">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <Search className="text-slate-400" size={24} />
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 mb-2">No services found</h3>
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
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <Dialog.Close asChild>
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3">
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
                        <Clock size={18} className="text-blue-600" />
                        <span className="font-medium">{selectedServiceDetail.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <ShieldPlus size={18} className="text-blue-600" />
                        <span className="font-medium">Certified Specialists</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-4">Overview</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                      {selectedServiceDetail.longDesc}
                    </p>

                    <h3 className="text-lg font-bold text-slate-900 mb-4">Key Benefits</h3>
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
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
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70]"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed left-[50%] top-[50%] z-[70] w-full max-w-2xl -translate-x-[50%] -translate-y-[50%] bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <Dialog.Title className="text-2xl font-bold text-white">Fast Booking</Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className="overflow-y-auto">
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

export function Team() {
  const doctors = [
    {
      name: "Dr. Sarah Jenkins",
      spec: "General Practitioner",
      img: "https://picsum.photos/seed/doc1/400/400",
      expertise: "Family Medicine",
      experience: "15+ Years",
    },
    {
      name: "Dr. Michael Chen",
      spec: "Pediatrician",
      img: "https://picsum.photos/seed/doc2/400/400",
      expertise: "Child Development",
      experience: "12+ Years",
    },
    {
      name: "Dr. Emily Rodriguez",
      spec: "Dermatologist",
      img: "https://picsum.photos/seed/doc3/400/400",
      expertise: "Clinical Dermatology",
      experience: "10+ Years",
    },
    {
      name: "Dr. James Wilson",
      spec: "Cardiologist",
      img: "https://picsum.photos/seed/doc4/400/400",
      expertise: "Preventive Cardiology",
      experience: "20+ Years",
    },
  ];

  return (
    <section className="py-20 bg-[#fbfbfb]" id="doctors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              Our Team
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">
              Meet Our Specialists
            </h2>
          </div>
          <button className="text-blue-600 font-semibold flex items-center gap-2 hover:text-blue-700 transition-colors">
            View All Doctors <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 group hover:shadow-md transition-shadow relative"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <Image
                  src={doc.img}
                  alt={doc.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className="bg-blue-600/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm">
                    {doc.expertise} • {doc.experience}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{doc.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{doc.spec}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
