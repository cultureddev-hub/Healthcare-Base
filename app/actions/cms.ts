/**
 * app/actions/cms.ts
 * Next.js Server Actions — Wix CMS Query Helpers
 *
 * Headless translation of _legacy_velo_reference/cms.js.
 * All six collection query helpers ported from wixData → @wix/data SDK.
 * The query() API is API-compatible with Velo's wixData.query() —
 * same chaining (.eq, .ge, .ascending, .descending, .limit, .find).
 *
 * These can be called from Server Components or other Server Actions.
 * They return plain arrays — same contract as the Velo public module.
 *
 * Collection IDs (unchanged from Velo schema — see BUILD_LOG_2.1.md):
 *   Services, Team, Testimonials, ClinicBlog
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

'use server';

import { wixClient } from '@/lib/wix-client';

// ── Collection ID constants ───────────────────────────────────────────────────

const COLLECTIONS = {
  services: 'Services',
  team: 'Team',
  testimonials: 'Testimonials',
  blog: 'ClinicBlog',
} as const;

// ── Public Collections ────────────────────────────────────────────────────────

/**
 * getServices
 *
 * Query the Services collection, sorted by title ascending.
 *
 * @param opts.category — Filter by category (e.g. "General", "Pharmacy")
 * @param opts.limit    — Max items to return (default: 50)
 */
export async function getServices({
  category,
  limit = 50,
}: { category?: string; limit?: number } = {}) {
  let q = wixClient.items.query(COLLECTIONS.services).ascending('title').limit(limit);
  if (category) q = q.eq('category', category);
  const { items } = await q.find();
  return items;
}

/**
 * getServiceByTitle
 *
 * Fetch a single service by exact title match.
 *
 * @param title — Exact service title
 */
export async function getServiceByTitle(title: string) {
  const { items } = await wixClient.items
    .query(COLLECTIONS.services)
    .eq('title', title)
    .limit(1)
    .find();
  return items[0] ?? null;
}

/**
 * getTeam
 *
 * Query the Team collection, sorted by name ascending.
 *
 * @param opts.role  — Filter by role (e.g. "Doctor", "Nurse")
 * @param opts.limit — Max items to return (default: 20)
 */
export async function getTeam({
  role,
  limit = 20,
}: { role?: string; limit?: number } = {}) {
  let q = wixClient.items.query(COLLECTIONS.team).ascending('name').limit(limit);
  if (role) q = q.eq('role', role);
  const { items } = await q.find();
  return items;
}

/**
 * getTestimonials
 *
 * Query the Testimonials collection, most recent first.
 *
 * @param opts.branch    — Filter by branch name
 * @param opts.minRating — Filter by minimum star rating (1–5)
 * @param opts.limit     — Max items to return (default: 10)
 */
export async function getTestimonials({
  branch,
  minRating,
  limit = 10,
}: { branch?: string; minRating?: number; limit?: number } = {}) {
  let q = wixClient.items.query(COLLECTIONS.testimonials).descending('date').limit(limit);
  if (branch) q = q.eq('branch', branch);
  if (minRating !== undefined) q = q.ge('rating', minRating);
  const { items } = await q.find();
  return items;
}

/**
 * getBlogPosts
 *
 * Query the ClinicBlog collection, most recent first.
 *
 * @param opts.tag   — Filter by tag (hasSome match)
 * @param opts.limit — Max items to return (default: 10)
 */
export async function getBlogPosts({
  tag,
  limit = 10,
}: { tag?: string; limit?: number } = {}) {
  let q = wixClient.items.query(COLLECTIONS.blog).descending('publishDate').limit(limit);
  if (tag) q = q.hasSome('tags', [tag]);
  const { items } = await q.find();
  return items;
}

/**
 * getBlogPostBySlug
 *
 * Fetch a single blog post by URL slug.
 *
 * @param slug — URL slug of the post
 */
export async function getBlogPostBySlug(slug: string) {
  const { items } = await wixClient.items
    .query(COLLECTIONS.blog)
    .eq('slug', slug)
    .limit(1)
    .find();
  return items[0] ?? null;
}
