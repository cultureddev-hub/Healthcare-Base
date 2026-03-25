"use client";

import React, { useState } from "react";
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
  const testimonials = [
    {
      text: "The convenience of switching between online and in-person care is amazing. The doctors are always attentive and knowledgeable.",
      author: "John D.",
      verified: true,
      img: "https://picsum.photos/seed/user1/100/100",
    },
    {
      text: "I love how I can consult with my doctor from home when I can't make it to the clinic. The service is excellent and the app is so easy to use.",
      author: "Sarah M.",
      verified: true,
      img: "https://picsum.photos/seed/user2/100/100",
    },
    {
      text: "Finally, a healthcare provider that understands modern families. Booking appointments for my kids has never been easier.",
      author: "Emily R.",
      verified: true,
      img: "https://picsum.photos/seed/user3/100/100",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Title & Controls */}
          <div className="lg:col-span-4">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              About Us
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-8 leading-tight">
              What people <br />
              are saying
            </h2>

            <div className="flex gap-4">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Right: Cards Slider */}
          <div className="lg:col-span-8 relative">
            <div className="flex gap-6 overflow-hidden py-4">
              <AnimatePresence mode="popLayout">
                {testimonials.map((t, i) => {
                  // Only show 2 cards on desktop, 1 on mobile
                  if (
                    i !== currentIndex &&
                    i !== (currentIndex + 1) % testimonials.length
                  )
                    return null;

                  const isPrimary = i === currentIndex;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                      className={`min-w-full md:min-w-[calc(50%-12px)] rounded-3xl p-8 flex flex-col justify-between ${
                        isPrimary
                          ? "bg-blue-500 text-white shadow-xl"
                          : "bg-slate-50 text-slate-900 border border-slate-100"
                      }`}
                    >
                      <div>
                        <div className="mb-6">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                              isPrimary ? "text-blue-300" : "text-slate-300"
                            }
                          >
                            <path
                              d="M16.6667 11.6667H10C8.15905 11.6667 6.66667 13.1591 6.66667 15V21.6667C6.66667 23.5076 8.15905 25 10 25H12.5C12.5 27.7614 10.2614 30 7.5 30C7.03976 30 6.66667 30.3731 6.66667 30.8333V33.3333C6.66667 33.7936 7.03976 34.1667 7.5 34.1667C12.5626 34.1667 16.6667 30.0626 16.6667 25V11.6667Z"
                              fill="currentColor"
                            />
                            <path
                              d="M33.3333 11.6667H26.6667C24.8257 11.6667 23.3333 13.1591 23.3333 15V21.6667C23.3333 23.5076 24.8257 25 26.6667 25H29.1667C29.1667 27.7614 26.9281 30 24.1667 30C23.7064 30 23.3333 30.3731 23.3333 30.8333V33.3333C23.3333 33.7936 23.7064 34.1667 24.1667 34.1667C29.2293 34.1667 33.3333 30.0626 33.3333 25V11.6667Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <p
                          className={`text-lg leading-relaxed mb-8 ${isPrimary ? "text-white" : "text-slate-700"}`}
                        >
                          &quot;{t.text}&quot;
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden relative">
                            <Image
                              src={t.img}
                              alt={t.author}
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="font-bold">{t.author}</span>
                        </div>
                        {t.verified && (
                          <div
                            className={`flex items-center gap-1 text-xs font-bold ${isPrimary ? "text-blue-200" : "text-blue-600"}`}
                          >
                            <CheckCircle2 size={14} />
                            Verified Customer
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
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
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === i ? "bg-white border-blue-200 shadow-sm" : "bg-transparent border-slate-200 hover:border-slate-300"}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              Resources
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">
              Latest Articles
            </h2>
          </div>
          <button 
            onClick={() => setIsCatalogueOpen(true)}
            className="text-blue-600 font-semibold flex items-center gap-2 hover:text-blue-700 transition-colors"
          >
            View All Posts <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-4 shrink-0">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <span className="text-blue-600">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                {post.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2 mt-auto">
                {post.content}
              </p>
            </motion.div>
          ))}
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
                  className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <Dialog.Close className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                      <X size={20} />
                    </Dialog.Close>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
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
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
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
                        <MapPin size={16} className="text-blue-600" />
                        <span className="text-xs font-medium">Koh Samui, Thailand</span>
                      </div>
                    </div>

                    <article className="prose prose-slate prose-blue max-w-none">
                      <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        {selectedPost.content}
                      </p>
                      {/* Placeholder for more rich content */}
                      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why This Matters</h3>
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
                      <Dialog.Title className="text-2xl md:text-3xl font-heading font-bold text-slate-900">
                        Health & Wellness Articles
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
                          placeholder="Search articles by title or keyword..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar shrink-0">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                              selectedCategory === cat
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
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                                {post.category}
                              </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-3">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
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
                          className="mt-4 text-blue-600 font-semibold hover:underline"
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
