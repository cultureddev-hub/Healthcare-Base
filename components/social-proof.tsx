"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Star,
  CheckCircle2,
  ArrowRight,
  Search,
  X,
  Calendar,
  User,
  Clock
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { BLOG_POSTS } from "@/lib/blog-data";

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const testimonials = [
    {
      text: "Excellent service and care from start to finish. A clean and professional environment with expert doctors who speak excellent English, meaning your case and treatment are explained in detail. Many different cases can be treated, so look no further than Samui Home Clinic for diagnosis or solutions.",
      author: "Dino Bryant",
      role: "Tourist, Koh Samui",
      verified: true,
      img: "https://picsum.photos/seed/dino/100/100",
      rating: 5,
    },
    {
      text: "Very clean and professional. My son was very ill during our time in Thailand, and this clinic was the only one that could solve all his problems. The clinic is kind, sincere, and takes excellent care of children. The doctors and staff speak good English. Highly recommend.",
      author: "Anne Grozdowski",
      role: "Tourist, Thailand",
      verified: true,
      img: "https://picsum.photos/seed/anne/100/100",
      rating: 5,
    },
    {
      text: "The doctor was excellent. She spoke English very well and was very friendly. I came to see her because of a stomach problem, which she treated the next day. Thank you so much.",
      author: "James McDonnell",
      role: "Tourist, Koh Samui",
      verified: true,
      img: "https://picsum.photos/seed/james/100/100",
      rating: 5,
    },
    {
      text: "I was suffering for multiple days from a heat rash that went only worse day by day. As soon as we arrived they helped us immediately. My symptoms were gone very fast. People were very friendly and took time to explain everything very clearly in English. Also the price was very decent. Definitely 5 stars for this place!!!",
      author: "Nadine Mulder",
      role: "Tourist, Koh Samui",
      verified: true,
      img: "https://picsum.photos/seed/nadine/100/100",
      rating: 5,
    },
    {
      text: "I had a nasty finger injury following an incident with an electric planer and needed sutures removing. 500 THB seemed very reasonable. A short wait before being seen by a nurse, checked by the doctor, then sutures removed very well — they did a great job. Good infection control measures in place, competent staff. I would recommend this clinic.",
      author: "Sir Mick of Nottingham",
      role: "Local Guide, UK",
      verified: true,
      img: "https://picsum.photos/seed/mick/100/100",
      rating: 5,
    },
    {
      text: "Great place, can't recommend enough if you are a tourist. I had bad diarrhoea and was worried so came here. They took my blood pressure, gave me a blood test and sent a stool sample away — was out within an hour with a bag of different meds. Only 1,800 baht seemed more than fair. The staff were all very friendly, understanding and professional.",
      author: "Alpha Seal",
      role: "Tourist, Koh Samui",
      verified: true,
      img: "https://picsum.photos/seed/alpha/100/100",
      rating: 5,
    },
    {
      text: "One of the most professional, clean, and efficient clinics I have been to. Doctors are very accessible, phlebotomists are all super professional, prices are great value. They also offer IV infusions based on different needs depending on goals: age, sports, targeted therapies.",
      author: "Alfred A",
      role: "Local Guide, Koh Samui",
      verified: true,
      img: "https://picsum.photos/seed/alfred/100/100",
      rating: 5,
    },
    {
      text: "I got an infection on my foot — it was so painful I finally decided to see a doctor. I went to Samui Home Clinic and they did a great job. I got daily appointments to clean my wounds. All the staff and the doctor made a really super good job. 5 star service, fair price. It would probably cost x10 in a private hospital. Highly recommend.",
      author: "Balmer Patrick",
      role: "Local Guide, Koh Samui",
      verified: true,
      img: "https://picsum.photos/seed/balmer/100/100",
      rating: 5,
    },
    {
      text: "Very good clinic. Did 10 blood tests and it was done in less than a minute. In my home country it would take more than 5 minutes. Here they did it all in 1 tube and it was done in under 1 minute. Very helpful staff and doctors.",
      author: "Dylan Jagersma",
      role: "Local Guide, Koh Samui",
      verified: true,
      img: "https://picsum.photos/seed/dylan/100/100",
      rating: 5,
    },
  ];

  // Duplicate for seamless loop (-50% = exact halfway point of doubled array)
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials, ...testimonials];

  const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
    <div className="w-[320px] shrink-0 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mx-3">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, s) => (
          <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-slate-700 leading-relaxed mb-4 text-sm line-clamp-3">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
          <Image src={t.img} alt={t.author} fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <p className="font-bold text-[#080708] text-xs">{t.author}</p>
          <p className="text-xs text-slate-400">{t.role}</p>
        </div>
        {t.verified && (
          <div className="ml-auto flex items-center gap-1 text-xs font-bold text-[#3eb5bd]">
            <CheckCircle2 size={11} /> Verified
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-[#fbfbfb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold uppercase tracking-wider mb-6">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#080708] mb-4">
            What People Are Saying
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Trusted by over 2,000 patients from around the world.
          </p>
        </div>
      </div>

      {/* Dual-row infinite marquee */}
      <div className="relative">
        {/* Edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fbfbfb] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fbfbfb] to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="flex mb-4 overflow-hidden">
          <motion.div
            className="flex"
            animate={shouldReduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 50, ease: "linear", repeat: Infinity }}
            whileHover={shouldReduceMotion ? undefined : { animationPlayState: "paused" }}
          >
            {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </motion.div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex"
            animate={shouldReduceMotion ? { x: "-50%" } : { x: ["-50%", "0%"] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 48, ease: "linear", repeat: Infinity }}
            onMouseEnter={e => { if (!shouldReduceMotion) (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
            onMouseLeave={e => { if (!shouldReduceMotion) (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
          >
            {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    {
      q: "Do you accept my insurance?",
      a: "We accept most major insurance plans. You can verify your specific coverage during the booking process or by contacting our support team.",
    },
    {
      q: "How do virtual consultations work?",
      a: "Virtual consultations are conducted via our secure, PDPA-compliant video platform. You'll receive a link via email and SMS before your appointment time.",
    },
    {
      q: "Can I get a prescription from a virtual visit?",
      a: "Yes, our doctors can prescribe medications during virtual visits when medically appropriate. Prescriptions are sent directly to your preferred pharmacy or our delivery service.",
    },
    {
      q: "What if I need to cancel my appointment?",
      a: "If you are unable to attend a booked appointment, please contact us as soon as possible. Email: info@samuihomeclinic.com Tel: +66-92-278-1988 or +66-77-937-288 Line ID: samuiclinic",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#fbfbfb]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold uppercase tracking-wider mb-6">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#080708]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === i ? "bg-white border-[#c9eff2] shadow-sm" : "bg-transparent border-slate-200 hover:border-slate-300"}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3eb5bd] rounded-2xl"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-[#080708] pr-4">{faq.q}</span>
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? "bg-[#c9eff2] text-[#3eb5bd]" : "bg-slate-100 text-slate-500"}`}
                >
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CatalogueAutoOpen({ onOpen }: { onOpen: () => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (searchParams.get("catalogue") === "open") {
      onOpen();
      router.replace("/#blog", { scroll: false });
    }
  }, [searchParams, onOpen, router]);
  return null;
}

export function Blog() {
  const posts = BLOG_POSTS;
  const categories = ["All", "Preventive Care", "Digital Health", "Wellness", "Mental Health"];

  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-20 bg-[#fbfbfb]">
      <Suspense fallback={null}>
        <CatalogueAutoOpen onOpen={() => setIsCatalogueOpen(true)} />
      </Suspense>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold uppercase tracking-wider mb-6">
            Resources
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#080708]">
            Latest Articles
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0 md:gap-8">
          {posts.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-[78vw] min-w-[78vw] shrink-0 snap-start md:w-auto md:min-w-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white rounded-3xl shadow-md hover:shadow-xl border border-slate-100/80 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[3/2] overflow-hidden shrink-0">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    <span className="text-[#3eb5bd]">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#080708] group-hover:text-[#3eb5bd] transition-colors line-clamp-2 mb-3 flex-grow">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-6">
                    {post.content}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#c9eff2] flex items-center justify-center text-[#3eb5bd] shrink-0">
                      <User size={14} />
                    </div>
                    <span className="font-semibold text-sm text-[#080708]">{post.author}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsCatalogueOpen(true)}
            className="text-[#3eb5bd] font-semibold inline-flex items-center gap-2 hover:text-[#2d9aa2] transition-colors"
          >
            View All Posts <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* All Posts Catalogue Modal */}
      <Dialog.Root open={isCatalogueOpen} onOpenChange={setIsCatalogueOpen}>
        <AnimatePresence>
          {isCatalogueOpen && (
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
                      <Dialog.Title className="text-2xl md:text-3xl font-heading font-bold text-[#080708]">
                        Health & Wellness Articles
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
                          placeholder="Search articles by title or keyword..."
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

                  {/* Posts Grid */}
                  <div className="flex-grow overflow-y-auto p-6 md:p-10 bg-slate-50">
                    {filteredPosts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {filteredPosts.map((post) => (
                          <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            onClick={() => setIsCatalogueOpen(false)}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col"
                          >
                            <div className="relative h-48 overflow-hidden shrink-0">
                              <Image
                                src={post.img}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#3eb5bd]">
                                {post.category}
                              </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-3">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                              </div>
                              <h3 className="text-lg font-bold text-[#080708] group-hover:text-[#3eb5bd] transition-colors line-clamp-2 mb-3">
                                {post.title}
                              </h3>
                              <p className="text-sm text-slate-600 line-clamp-2 mt-auto">
                                {post.content}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-500">
                        <Search size={48} className="mb-4 text-slate-300" />
                        <p className="text-lg font-medium">No articles found matching your criteria.</p>
                        <button 
                          onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
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
