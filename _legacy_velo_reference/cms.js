/**
 * cms.js
 * Wix Velo — CMS Query Helpers
 *
 * Reusable wixData query wrappers for all six SHC collections.
 * Import from page files or other public modules:
 *   import { getServices, getTestimonials } from 'public/cms';
 *
 * All functions return plain arrays of item objects (with Wix _id, _createdDate, etc.).
 * They suppress auth so they can be called from both frontend and backend contexts,
 * but the underlying collection permissions still apply — Admin-only collections
 * (Bookings, MedicalInquiries) will throw from unauthenticated frontend calls.
 */

import wixData from 'wix-data';
import { COLLECTIONS } from 'public/constants';

// ── Public Collections ────────────────────────────────────────────────────────

/**
 * getServices
 * Query the Services collection.
 *
 * @param {Object} [opts]
 * @param {string} [opts.category]  — Filter by category (e.g. "General", "Pharmacy")
 * @param {number} [opts.limit=50]  — Max items to return
 * @returns {Promise<Object[]>}
 */
export async function getServices({ category = null, limit = 50 } = {}) {
  let query = wixData.query(COLLECTIONS.services).ascending('title').limit(limit);
  if (category) query = query.eq('category', category);
  const { items } = await query.find();
  return items;
}

/**
 * getServiceByTitle
 * Fetch a single service by exact title match.
 *
 * @param {string} title
 * @returns {Promise<Object|null>}
 */
export async function getServiceByTitle(title) {
  const { items } = await wixData
    .query(COLLECTIONS.services)
    .eq('title', title)
    .limit(1)
    .find();
  return items[0] || null;
}

/**
 * getTeam
 * Query the Team collection.
 *
 * @param {Object} [opts]
 * @param {string} [opts.role]      — Filter by role (e.g. "Doctor", "Nurse")
 * @param {number} [opts.limit=20]
 * @returns {Promise<Object[]>}
 */
export async function getTeam({ role = null, limit = 20 } = {}) {
  let query = wixData.query(COLLECTIONS.team).ascending('name').limit(limit);
  if (role) query = query.eq('role', role);
  const { items } = await query.find();
  return items;
}

/**
 * getTestimonials
 * Query the Testimonials collection, most recent first.
 *
 * @param {Object} [opts]
 * @param {string} [opts.branch]    — Filter by branch name
 * @param {number} [opts.minRating] — Filter by minimum star rating (1–5)
 * @param {number} [opts.limit=10]
 * @returns {Promise<Object[]>}
 */
export async function getTestimonials({ branch = null, minRating = null, limit = 10 } = {}) {
  let query = wixData.query(COLLECTIONS.testimonials).descending('date').limit(limit);
  if (branch) query = query.eq('branch', branch);
  if (minRating !== null) query = query.ge('rating', minRating);
  const { items } = await query.find();
  return items;
}

/**
 * getBlogPosts
 * Query the ClinicBlog collection, most recent first.
 *
 * @param {Object} [opts]
 * @param {string} [opts.tag]       — Filter by tag text
 * @param {number} [opts.limit=10]
 * @returns {Promise<Object[]>}
 */
export async function getBlogPosts({ tag = null, limit = 10 } = {}) {
  let query = wixData.query(COLLECTIONS.blog).descending('publishDate').limit(limit);
  if (tag) query = query.contains('tags', tag);
  const { items } = await query.find();
  return items;
}

/**
 * getBlogPostBySlug
 * Fetch a single blog post by URL slug.
 *
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getBlogPostBySlug(slug) {
  const { items } = await wixData
    .query(COLLECTIONS.blog)
    .eq('slug', slug)
    .limit(1)
    .find();
  return items[0] || null;
}
