/**
 * lib/types/cms.ts
 * CMS TypeScript interfaces — Phase B i18n Schema Expansion
 *
 * All dynamic content collections now carry optional `_th` localised variants.
 * Components must resolve displayed text through localise() from
 * lib/i18n-fallback.ts to guarantee graceful English fallback while
 * the clinical team completes Thai translations.
 *
 * Wix collections:  Services | Team | Testimonials | ClinicBlog
 * Naming contract:  base field = English  |  base field + '_th' = Thai
 *
 * IMPORTANT: Medical text (_th variants for description, policy, body)
 * MUST be translated by a certified medical/clinical translator —
 * never auto-translated via LLM.
 */

// ── Base Wix record ───────────────────────────────────────────────────────────

interface WixBaseRecord {
  _id: string;
  _createdDate?: string;
  _updatedDate?: string;
  _owner?: string;
}

// ── Services Collection ───────────────────────────────────────────────────────

/**
 * Wix CMS: `Services` collection
 *
 * Localised fields   : title, description, policy
 * Non-translated fields: category, price, duration, image, branch, featured
 *
 * Schema update: add these fields to the Wix CMS collection before bulk import.
 * Field type for all _th variants: Plain Text (Long text for description/policy).
 */
export interface WixService extends WixBaseRecord {
  // English (base — always present)
  title: string;
  description?: string;
  policy?: string;

  // Thai (localised — populated by clinical team)
  title_th?: string;
  description_th?: string;
  policy_th?: string;

  // Non-translated metadata
  category?: string[]; // TAGS field — e.g. ["General"] or ["Pharmacy"]
  price?: string;
  duration?: string;
  image?: string;
  featured?: boolean;
  branch?: string;
  serviceId?: string;
  departmentId?: string;
}

// ── Departments Collection ────────────────────────────────────────────────────

/**
 * Wix CMS: `Departments` collection
 *
 * Localised fields   : name, description
 * Non-translated fields: slug, icon, order
 */
export interface WixDepartment extends WixBaseRecord {
  // English (base)
  name: string;
  description?: string;

  // Thai (localised)
  name_th?: string;
  description_th?: string;

  // Non-translated
  slug?: string;
  icon?: string;
  order?: number;
}

// ── Team Collection ───────────────────────────────────────────────────────────

/**
 * Wix CMS: `Team` collection
 *
 * Localised fields   : bio
 * NOT localised       : name (proper noun), role (standardised medical title)
 */
export interface WixTeamMember extends WixBaseRecord {
  // English (base)
  name: string;
  role: string;        // Specialty e.g. "General Practitioner", "Cardiologist"
  bio?: string;

  // Thai (localised)
  role_th?: string;
  bio_th?: string;

  // Category (TAGS field — e.g. ["Doctor"], ["Nurse"], ["Pharmacist"])
  Category_Tag: string[];

  // Non-translated
  image?: string;
  experience?: string;      // e.g. "15+ Years"
  experience_th?: string;
  branch?: string;
  qualifications?: string[];
  order?: number;
}

// ── Testimonials Collection ───────────────────────────────────────────────────

/**
 * Wix CMS: `Testimonials` collection
 * NOT localised — user-generated content stays in original language.
 */
export interface WixTestimonial extends WixBaseRecord {
  name: string;
  comment: string;
  rating: number;
  branch?: string;
  date?: string;
  verified?: boolean;
}

// ── ClinicBlog Collection ─────────────────────────────────────────────────────

/**
 * Wix CMS: `ClinicBlog` collection
 *
 * Localised fields   : title, excerpt, body
 * NOT localised       : slug, category, tags, author, image, metaDescription
 *
 * WARNING: Medical blog body (_th) MUST be translated by a
 * certified medical translator. Never use LLM auto-translation.
 */
export interface WixBlogPost extends WixBaseRecord {
  // English (base)
  title: string;
  excerpt?: string;
  body?: string;

  // Thai (localised — certified medical translation required)
  title_th?: string;
  excerpt_th?: string;
  body_th?: string;

  // Non-translated
  slug: string;
  category?: string;
  tags?: string[];
  publishDate?: string;
  author?: string;
  image?: string;
  metaDescription?: string;
}

// ── PharmacyInventory Collection ─────────────────────────────────────────────

/**
 * Wix CMS: `PharmacyInventory` collection
 * Read: ANYONE | Write: ADMIN
 *
 * Maps to fields created via Wix MCP API on 2026-04-04.
 */
export interface PharmacyProduct extends WixBaseRecord {
  Item_Name: string;
  Item_Name_th?: string;
  Price: number;
  Category: string[]; // TAGS field — e.g. ["OTC"] or ["Rx"]
  Image?: { url?: string; height?: number; width?: number } | string;
  Requires_Prescription: boolean;
  Description?: string;
  Description_th?: string;
}

// ── Cart Item (shared: store + server actions) ────────────────────────────────

/**
 * CartItem — serializable item stored in Zustand cart and sent to PharmacyOrders.
 * Defined here (not in cart-store.ts) so server actions can import it without
 * pulling in client-only Zustand code.
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  requiresPrescription: boolean;
  quantity: number;
}

// ── PharmacyOrders Collection ─────────────────────────────────────────────────

/**
 * Wix CMS: `PharmacyOrders` collection
 * Read: ADMIN | Write: ADMIN (server-side API key only)
 *
 * Status lifecycle: Pending_Review → Approved_Awaiting_Payment → Paid → Dispatched
 * Status transitions trigger the Velo data hook (backend/data.js) that generates
 * the Omise payment link stub.
 */
export type PharmacyOrderStatus =
  | 'Pending_Review'
  | 'Approved_Awaiting_Payment'
  | 'Paid'
  | 'Dispatched';

export interface PharmacyOrder extends WixBaseRecord {
  Patient_Name: string;
  WhatsApp_Number: string;
  Delivery_Address: string;
  Cart_Payload: string; // JSON string: CartItem[]
  Prescription_File?: string; // Wix Media document URL (future: upload via Media Manager)
  Omise_Payment_Link?: string;
  Status: PharmacyOrderStatus | PharmacyOrderStatus[]; // TAGS field returns string[]
  Submitted_At?: string;
}

// ── PharmacyOrder input (from form → server action) ──────────────────────────

export interface PharmacyOrderInput {
  patientName: string;
  whatsappNumber: string;
  deliveryAddress: string;
  cartItems: CartItem[];
  prescriptionFilename?: string; // filename only — actual file upload is future work
}

// ── Frontend ServiceItem (hardcoded SERVICES_DATA) ────────────────────────────

/**
 * Localised version of the hardcoded SERVICES_DATA items in services-section.tsx.
 * Add _th variants here once the clinical team provides translations.
 * Components render via localiseDesc() / localiseLongDesc() from i18n-fallback.ts.
 */
export interface LocalisedServiceItem {
  id: string;
  serviceId: string;
  departmentId: string;
  category: string;

  // English (base)
  title: string;
  desc: string;
  longDesc: string;

  // Thai (localised — blank until clinical team delivers)
  title_th?: string;
  desc_th?: string;
  longDesc_th?: string;

  // Non-translated
  price: string;
  duration: string;
  img: string;
  featured: boolean;
  benefits: string[];
}
