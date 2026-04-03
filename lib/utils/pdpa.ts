/**
 * lib/utils/pdpa.ts
 * PDPA (Thailand Personal Data Protection Act B.E. 2562) Compliance Utilities
 *
 * TypeScript port of _legacy_velo_reference/pdpa.js.
 * Safe to import in both Server Components and Server Actions.
 * Does NOT import wix-client — pure logic, no side effects.
 *
 * Provides:
 *   - PDPA_CONSENT_TEXT       — Bilingual consent notice strings for forms
 *   - isPrescriptionKeyword() — COMP-02 guard: detects prescription/PHI keywords
 *   - PHARMACY_WHATSAPP_MESSAGES — Pre-filled WhatsApp CTA templates
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

// ── Consent Notice Text ───────────────────────────────────────────────────────

/**
 * PDPA_CONSENT_TEXT
 *
 * Short-form consent notice for display adjacent to any form collecting
 * health-related personal data (COMP-01).
 * Pair with an explicit consent checkbox bound to the `pdpaConsent` field.
 */
export const PDPA_CONSENT_TEXT = {
  en: {
    short:
      'By submitting this form, you consent to Samui Home Clinic collecting and processing your personal data for appointment and healthcare purposes, in accordance with Thailand\u2019s Personal Data Protection Act (PDPA) B.E. 2562.',
    checkboxLabel:
      'I consent to Samui Home Clinic processing my personal data per the PDPA (B.E. 2562).',
    fieldHelper:
      'Your information is kept strictly confidential and used only to assist with your care.',
    privacyLinkText: 'Read our Privacy Policy',
  },
  th: {
    short:
      '\u0e01\u0e32\u0e23\u0e2a\u0e48\u0e07\u0e41\u0e1a\u0e1a\u0e1f\u0e2d\u0e23\u0e4c\u0e21\u0e19\u0e35\u0e49\u0e16\u0e37\u0e2d\u0e27\u0e48\u0e32\u0e04\u0e38\u0e13\u0e22\u0e34\u0e19\u0e22\u0e2d\u0e21\u0e43\u0e2b\u0e49 Samui Home Clinic \u0e40\u0e01\u0e47\u0e1a\u0e23\u0e27\u0e1a\u0e23\u0e27\u0e21\u0e41\u0e25\u0e30\u0e1b\u0e23\u0e30\u0e21\u0e27\u0e25\u0e1c\u0e25\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e2a\u0e48\u0e27\u0e19\u0e1a\u0e38\u0e04\u0e04\u0e25\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e27\u0e31\u0e15\u0e16\u0e38\u0e1b\u0e23\u0e30\u0e2a\u0e07\u0e04\u0e4c\u0e14\u0e49\u0e32\u0e19\u0e01\u0e32\u0e23\u0e19\u0e31\u0e14\u0e2b\u0e21\u0e32\u0e22\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e14\u0e39\u0e41\u0e25\u0e2a\u0e38\u0e02\u0e20\u0e32\u0e1e \u0e15\u0e32\u0e21\u0e1e\u0e23\u0e30\u0e23\u0e32\u0e0a\u0e1a\u0e31\u0e0d\u0e0d\u0e31\u0e15\u0e34\u0e04\u0e38\u0e49\u0e21\u0e04\u0e23\u0e2d\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e2a\u0e48\u0e27\u0e19\u0e1a\u0e38\u0e04\u0e04\u0e25 \u0e1e.\u0e28. 2562',
    checkboxLabel:
      '\u0e09\u0e31\u0e19\u0e22\u0e34\u0e19\u0e22\u0e2d\u0e21\u0e43\u0e2b\u0e49 Samui Home Clinic \u0e1b\u0e23\u0e30\u0e21\u0e27\u0e25\u0e1c\u0e25\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e2a\u0e48\u0e27\u0e19\u0e1a\u0e38\u0e04\u0e04\u0e25\u0e02\u0e2d\u0e07\u0e09\u0e31\u0e19\u0e15\u0e32\u0e21 \u0e1e.\u0e23.\u0e1a. \u0e04\u0e38\u0e49\u0e21\u0e04\u0e23\u0e2d\u0e07\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e2a\u0e48\u0e27\u0e19\u0e1a\u0e38\u0e04\u0e04\u0e25 \u0e1e.\u0e28. 2562',
    fieldHelper:
      '\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e08\u0e30\u0e16\u0e39\u0e01\u0e40\u0e01\u0e47\u0e1a\u0e23\u0e31\u0e01\u0e29\u0e32\u0e40\u0e1b\u0e47\u0e19\u0e04\u0e27\u0e32\u0e21\u0e25\u0e31\u0e1a\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e40\u0e04\u0e23\u0e48\u0e07\u0e04\u0e23\u0e31\u0e14\u0e41\u0e25\u0e30\u0e43\u0e0a\u0e49\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e0a\u0e48\u0e27\u0e22\u0e43\u0e19\u0e01\u0e32\u0e23\u0e14\u0e39\u0e41\u0e25\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19',
    privacyLinkText: '\u0e2d\u0e48\u0e32\u0e19\u0e19\u0e42\u0e22\u0e1a\u0e32\u0e22\u0e04\u0e27\u0e32\u0e21\u0e40\u0e1b\u0e47\u0e19\u0e2a\u0e48\u0e27\u0e19\u0e15\u0e31\u0e27',
  },
} as const;

// ── Pharmacy / Prescription Keyword Guard (COMP-02) ───────────────────────────

/**
 * PRESCRIPTION_KEYWORDS
 *
 * Exact port from legacy pdpa.js — do not modify without updating the
 * compliance documentation in BUILD_LOG_2.1.md.
 *
 * Any free-text field match triggers COMP-02: submission must exit early
 * and return a WhatsApp redirect payload. No CMS write is permitted.
 */
const PRESCRIPTION_KEYWORDS = [
  'pep',
  'prep',
  'pre-exposure',
  'post-exposure',
  'hiv',
  'antiretroviral',
  'truvada',
  'descovy',
  'prescription',
  'controlled',
  'narcotic',
  'benzodiazepine',
] as const;

/**
 * isPrescriptionKeyword
 *
 * Returns true if the given text contains any prescription-controlled keyword.
 * Case-insensitive substring match — exact port of legacy Velo implementation.
 *
 * @param text — Free-text field value (concerns, symptoms, message)
 * @returns boolean
 */
export function isPrescriptionKeyword(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return PRESCRIPTION_KEYWORDS.some((kw) => lower.includes(kw));
}

// ── Pharmacy WhatsApp Message Templates ──────────────────────────────────────

/**
 * PHARMACY_WHATSAPP_MESSAGES
 *
 * Pre-filled WhatsApp message templates for pharmacy CTAs.
 * The `pepPrep` template is returned in the Server Action response payload
 * when isPrescriptionKeyword() fires (COMP-02 exit).
 */
export const PHARMACY_WHATSAPP_MESSAGES = {
  general: 'Hello, I would like to enquire about pharmacy products at Samui Home Clinic.',
  pepPrep:
    'Hello, I would like to speak with a pharmacist about PEP/PrEP availability at Samui Home Clinic.',
  prescription:
    'Hello, I have a prescription I would like to discuss with a Samui Home Clinic pharmacist.',
  delivery:
    'Hello, I would like to arrange pharmacy delivery from Samui Home Clinic.',
} as const;
