"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
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
  MapPin,
  ShieldCheck,
  Calendar,
  User,
  Clock
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const testimonials = [
    {
      text: "The convenience of switching between online and in-person care is amazing. The doctors are always attentive and knowledgeable.",
      author: "John D.",
      role: "Expat, Koh Samui",
      verified: true,
      img: "https://picsum.photos/seed/user1/100/100",
      rating: 5,
    },
    {
      text: "I love how I can consult with my doctor from home when I can't make it to the clinic. The service is excellent and so easy to use.",
      author: "Sarah M.",
      role: "Tourist, UK",
      verified: true,
      img: "https://picsum.photos/seed/user2/100/100",
      rating: 5,
    },
    {
      text: "Finally, a healthcare provider that understands modern families. Booking appointments for my kids has never been easier.",
      author: "Emily R.",
      role: "Resident, Thailand",
      verified: true,
      img: "https://picsum.photos/seed/user3/100/100",
      rating: 5,
    },
    {
      text: "Getting treatment at my hotel was painless. The doctor arrived within the hour and was incredibly professional.",
      author: "Marco L.",
      role: "Tourist, Italy",
      verified: true,
      img: "https://picsum.photos/seed/user4/100/100",
      rating: 5,
    },
    {
      text: "I needed a prescription fast. The pharmacist online consultation was quick, smooth, and I had my medication within hours.",
      author: "Priya S.",
      role: "Expat, India",
      verified: true,
      img: "https://picsum.photos/seed/user5/100/100",
      rating: 5,
    },
    {
      text: "After a beach accident I was worried about wound care. The team handled it brilliantly — clean, professional, and caring.",
      author: "Jake W.",
      role: "Tourist, Australia",
      verified: true,
      img: "https://picsum.photos/seed/user6/100/100",
      rating: 5,
    },
  ];

  // Duplicate for seamless loop
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)];

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
      a: "Virtual consultations are conducted via our secure, HIPAA-compliant video platform. You'll receive a link via email and SMS before your appointment time.",
    },
    {
      q: "Can I get a prescription from a virtual visit?",
      a: "Yes, our doctors can prescribe medications during virtual visits when medically appropriate. Prescriptions are sent directly to your preferred pharmacy or our delivery service.",
    },
    {
      q: "What if I need to cancel my appointment?",
      a: "You can cancel or reschedule your appointment up to 24 hours in advance without any fees through your patient portal.",
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

export function Blog() {
  const posts = [
    {
      id: 1,
      title: "10 Essential Health Screenings for Adults",
      category: "Preventive Care",
      date: "Oct 12, 2023",
      author: "Dr. Sarah Jenkins",
      readTime: "5 min read",
      img: "https://picsum.photos/seed/blog1/800/600",
      content: "Regular health screenings are vital for early detection of potential issues. In this article, we cover the top 10 screenings every adult should consider, from blood pressure checks to cholesterol panels. Early detection can significantly improve treatment outcomes and overall quality of life. Don't wait for symptoms to appear—be proactive about your health today.",
      tags: ["Screening", "Adult Health", "Wellness"]
    },
    {
      id: 2,
      title: "Understanding Telemedicine: What to Expect",
      category: "Digital Health",
      date: "Oct 05, 2023",
      author: "Dr. Michael Chen",
      readTime: "4 min read",
      img: "https://picsum.photos/seed/blog2/800/600",
      content: "Telemedicine has revolutionized how we access healthcare. Learn how to prepare for your first virtual consultation, what conditions can be treated online, and how our secure platform ensures your privacy. We'll walk you through the entire process so you can feel confident and comfortable receiving care from the comfort of your home.",
      tags: ["Telehealth", "Virtual Care", "Innovation"]
    },
    {
      id: 3,
      title: "Nutrition Tips for a Strong Immune System",
      category: "Wellness",
      date: "Sep 28, 2023",
      author: "Emily Roberts, RD",
      readTime: "6 min read",
      img: "https://picsum.photos/seed/blog3/800/600",
      content: "Your diet plays a crucial role in supporting your immune system. Discover the best foods to incorporate into your daily meals, including vitamin C-rich fruits, leafy greens, and probiotics. We also discuss the importance of hydration and how to create balanced, nutrient-dense plates that keep you feeling your best year-round.",
      tags: ["Nutrition", "Immunity", "Diet"]
    },
    {
      id: 4,
      title: "Managing Stress in a Fast-Paced World",
      category: "Mental Health",
      date: "Sep 15, 2023",
      author: "Dr. Amanda Lewis",
      readTime: "7 min read",
      img: "https://picsum.photos/seed/blog4/800/600",
      content: "Chronic stress can take a toll on both your physical and mental health. Explore effective stress management techniques, from mindfulness meditation to establishing healthy boundaries. Learn how to recognize the signs of burnout and when it's time to seek professional support.",
      tags: ["Stress", "Mental Wellness", "Self-Care"]
    },
    {
      id: 5,
      title: "The Importance of Sleep for Overall Health",
      category: "Wellness",
      date: "Sep 02, 2023",
      author: "Dr. Robert Patel",
      readTime: "5 min read",
      img: "https://picsum.photos/seed/blog5/800/600",
      content: "Quality sleep is just as important as diet and exercise. We delve into the science of sleep, explaining how it affects brain function, immune response, and emotional well-being. Get practical tips for improving your sleep hygiene and creating a restful bedtime routine.",
      tags: ["Sleep", "Recovery", "Health Tips"]
    }
  ];

  const categories = ["All", "Preventive Care", "Digital Health", "Wellness", "Mental Health"];

  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);
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
    <section className="py-20 bg-[#fbfbfb]">
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
              className="w-[78vw] min-w-[78vw] shrink-0 snap-start md:w-auto md:min-w-0 group cursor-pointer flex flex-col h-full bg-white rounded-3xl shadow-md hover:shadow-xl border border-slate-100/80 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedPost(post)}
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

      {/* Blog Detail Modal */}
      <Dialog.Root open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <AnimatePresence>
          {selectedPost && (
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
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl -translate-x-[50%] -translate-y-[50%] bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                  <div className="relative h-64 md:h-80 shrink-0">
                    <Image
                      src={selectedPost.img}
                      alt={selectedPost.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080708]/80 to-transparent" />
                    <Dialog.Close className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                      <X size={20} />
                    </Dialog.Close>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="bg-[#3eb5bd] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {selectedPost.category}
                        </span>
                        <span className="flex items-center gap-1 text-white/90 text-sm font-medium">
                          <Calendar size={14} />
                          {selectedPost.date}
                        </span>
                        <span className="flex items-center gap-1 text-white/90 text-sm font-medium">
                          <Clock size={14} />
                          {selectedPost.readTime}
                        </span>
                      </div>
                      <Dialog.Title className="text-2xl md:text-4xl font-heading font-bold text-white leading-tight">
                        {selectedPost.title}
                      </Dialog.Title>
                    </div>
                  </div>

                  <div className="p-6 md:p-10 overflow-y-auto">
                    {/* Trust & Geo Tags */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-slate-700">
                        <div className="w-10 h-10 rounded-full bg-[#c9eff2] flex items-center justify-center text-[#3eb5bd] shrink-0">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{selectedPost.author}</p>
                          <p className="text-xs text-slate-500">Medical Expert</p>
                        </div>
                      </div>
                      <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                      <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                        <ShieldCheck size={16} />
                        <span className="text-xs font-bold">Medically Reviewed</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <MapPin size={16} className="text-[#3eb5bd]" />
                        <span className="text-xs font-medium">Koh Samui, Thailand</span>
                      </div>
                    </div>

                    <article className="prose prose-slate prose-blue max-w-none">
                      <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        {selectedPost.content}
                      </p>
                      {/* Placeholder for more rich content */}
                      <h3 className="text-xl font-bold text-[#080708] mt-8 mb-4">Why This Matters</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        Taking proactive steps towards your health is the best investment you can make. Our team at Samui Home Clinic is dedicated to providing you with the most up-to-date information and personalized care to help you achieve your wellness goals.
                      </p>
                    </article>

                    <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                      {selectedPost.tags.map(tag => (
                        <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>

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
                          <div
                            key={post.id}
                            onClick={() => {
                              setSelectedPost(post);
                              setIsCatalogueOpen(false);
                            }}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
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
                          </div>
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
