import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog-data";
import { Calendar, Clock, MapPin, ChevronLeft, ArrowRight } from "lucide-react";

// ─── Static generation ───────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url: `https://samuihomeclinic.com/blog/${post.slug}`,
      images: [{ url: post.img, alt: post.title }],
      publishedTime: post.dateISO,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.img],
    },
  };
}

// ─── Heading ID injection (server-side, content is internally authored) ──────

function injectHeadingIds(html: string): string {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h2${attrs} id="${id}">${content}</h2>`;
  });
}

function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)];
  return matches.map((m) => {
    const text = m[1].replace(/<[^>]+>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { id, text };
  });
}

// ─── Category colour map ──────────────────────────────────────────────────────

const CATEGORY_COLOURS: Record<string, string> = {
  "Preventive Care": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Digital Health": "bg-blue-100 text-blue-800 border-blue-200",
  Wellness: "bg-violet-100 text-violet-800 border-violet-200",
  "Mental Health": "bg-rose-100 text-rose-800 border-rose-200",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const processedBody = injectHeadingIds(post.body);
  const headings = extractHeadings(post.body);
  const related = getRelatedPosts(post.slug, 3);
  const categoryColour =
    CATEGORY_COLOURS[post.category] ?? "bg-slate-100 text-slate-700 border-slate-200";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "Samui Home Clinic",
      url: "https://samuihomeclinic.com",
      logo: "https://samuihomeclinic.com/Assets/SHC_Logo.png",
    },
    image: post.img,
    url: `https://samuihomeclinic.com/blog/${post.slug}`,
    description: post.metaDescription,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://samuihomeclinic.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      {/* BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="min-h-screen bg-[#fbfbfb] font-sans">
        {/* ── Top nav bar ── */}
        <nav className="sticky top-0 z-50 w-full bg-[#fbfbfb]/90 backdrop-blur-md border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <Link
              href="/?catalogue=open#blog"
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#3eb5bd] transition-colors"
            >
              <ChevronLeft size={16} />
              All Articles
            </Link>
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-[140px] h-[46px]">
                <Image
                  src="/Assets/SHC_Logo.png"
                  alt="Samui Home Clinic"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <Link
              href="/#booking"
              className="bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-md"
            >
              Book Now
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <header className="relative w-full h-[55vh] min-h-[340px] max-h-[520px] overflow-hidden">
          <Image
            src={post.img}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080708]/85 via-[#080708]/40 to-transparent" />

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-8 lg:px-16 pb-10 max-w-5xl mx-auto w-full left-1/2 -translate-x-1/2">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${categoryColour}`}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight max-w-3xl">
              {post.title}
            </h1>
          </div>
        </header>

        {/* ── Content area ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-3 lg:gap-14">

            {/* ── Main column ── */}
            <main className="lg:col-span-2">

              {/* Trust bar */}
              <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#3eb5bd] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    SH
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#080708]">{post.author}</p>
                    <p className="text-xs text-slate-400">Samui Home Clinic</p>
                  </div>
                </div>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Medically Reviewed
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#edf9fa] border border-[#c9eff2] text-[#2d9aa2] text-xs font-bold">
                    <MapPin size={11} />
                    Koh Samui, Thailand
                  </span>
                </div>
              </div>

              {/* Key Stats callout grid */}
              {post.stats && post.stats.length > 0 && (
                <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-[#edf9fa] to-[#e8f4ff] border border-[#c9eff2]">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#2d9aa2] mb-4">Key Stats</p>
                  <div className={`grid gap-4 ${post.stats.length === 2 ? "grid-cols-2" : post.stats.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
                    {post.stats.map((stat, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
                        <p className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D84D7] leading-tight mb-1">
                          {stat.value}
                        </p>
                        <p className="text-xs text-slate-500 leading-snug">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Table of Contents — mobile inline */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-8 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">In this article</p>
                  <ol className="space-y-2">
                    {headings.map((h, i) => (
                      <li key={i}>
                        <a
                          href={`#${h.id}`}
                          className="flex items-start gap-2.5 text-sm text-slate-600 hover:text-[#3eb5bd] transition-colors"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#edf9fa] text-[#3eb5bd] text-xs font-bold flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Article body */}
              <article
                className="
                  prose prose-slate prose-lg max-w-none
                  prose-headings:font-heading prose-headings:font-bold prose-headings:text-[#080708]
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#1a6b72]
                  prose-p:text-slate-700 prose-p:leading-relaxed
                  prose-a:text-[#3eb5bd] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-strong:text-[#080708] prose-strong:font-bold
                  prose-ul:my-4 prose-li:text-slate-700 prose-li:marker:text-[#3eb5bd]
                  prose-ol:my-4 prose-ol:marker:text-[#3eb5bd] prose-ol:marker:font-bold
                  prose-blockquote:border-l-4 prose-blockquote:border-[#3eb5bd] prose-blockquote:bg-[#edf9fa] prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:px-6 prose-blockquote:py-4
                  prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-md prose-table:border-0
                  prose-thead:bg-[#080708]
                  prose-th:text-white prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-th:text-sm
                  prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-slate-100 prose-td:text-sm prose-td:text-slate-700
                  prose-tr:even:bg-slate-50/60
                  prose-hr:border-slate-200 prose-hr:my-8
                  prose-em:text-slate-600
                "
                dangerouslySetInnerHTML={{ __html: processedBody }}
              />

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium hover:bg-[#edf9fa] hover:text-[#2d9aa2] transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </main>

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-6">

                {/* Table of Contents — desktop */}
                {headings.length > 0 && (
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">In this article</p>
                    <ol className="space-y-2.5">
                      {headings.map((h, i) => (
                        <li key={i}>
                          <a
                            href={`#${h.id}`}
                            className="flex items-start gap-3 text-sm text-slate-600 hover:text-[#3eb5bd] transition-colors leading-snug"
                          >
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#edf9fa] text-[#3eb5bd] text-xs font-bold flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Book Appointment CTA */}
                <div className="p-6 rounded-2xl bg-[#3eb5bd] text-white">
                  <p className="font-heading font-bold text-lg mb-2">Need medical care?</p>
                  <p className="text-sm text-[#c9eff2] mb-5 leading-relaxed">
                    Walk in to any of our 3 Koh Samui locations — no appointment needed for most services.
                  </p>
                  <Link
                    href="/#booking"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#3eb5bd] px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#edf9fa] transition-colors"
                  >
                    Book an Appointment
                    <ArrowRight size={15} />
                  </Link>
                  <div className="mt-4 pt-4 border-t border-[#5ec4cb] space-y-2 text-xs text-[#c9eff2]">
                    <p>Mon–Fri: 9:00 AM – 7:00 PM</p>
                    <p>Sat–Sun: 9:00 AM – 5:00 PM</p>
                    <a href="tel:+660806696915" className="block hover:text-white transition-colors">
                      +66 080-669-6915
                    </a>
                  </div>
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Related Articles</p>
                    <div className="space-y-4">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/blog/${r.slug}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-16 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={r.img}
                              alt={r.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#3eb5bd] font-semibold mb-0.5">{r.category}</p>
                            <p className="text-sm font-semibold text-[#080708] group-hover:text-[#3eb5bd] transition-colors leading-snug line-clamp-2">
                              {r.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* ── Bottom CTA band ── */}
        <section className="bg-[#080708] text-white py-16 mt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3eb5bd] mb-4">Samui Home Clinic</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl mb-4 leading-tight">
              Need medical care on Koh Samui?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Walk in or book online 24/7. English-speaking doctors, 3 clinic locations, same-day appointments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#booking"
                className="inline-flex items-center justify-center gap-2 bg-[#3eb5bd] hover:bg-[#35a0a8] text-white px-8 py-4 rounded-full font-semibold text-base transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3eb5bd]/20"
              >
                Book an Appointment
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+660806696915"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-base transition-all border border-white/20"
              >
                +66 080-669-6915
              </a>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span>📍 Chaweng</span>
              <span>📍 Bangrak</span>
              <span>📍 Rajabhat University</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
