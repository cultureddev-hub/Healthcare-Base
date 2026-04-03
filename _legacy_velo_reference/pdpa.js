/**
 * pdpa.js
 * Wix Velo — PDPA (Thailand Personal Data Protection Act B.E. 2562) Utilities
 *
 * Provides:
 *   - Consent notice text for use in forms and page copy (EN + TH)
 *   - Prescription/PHI routing guard logic
 *   - Pharmacy keyword list for flagging prescription inquiries (COMP-02)
 *
 * Import:
 *   import { PDPA_CONSENT_TEXT, isPrescriptionKeyword } from 'public/pdpa';
 */

// ── Consent Notice Text ───────────────────────────────────────────────────────

/**
 * PDPA_CONSENT_TEXT
 *
 * Short-form consent notice to display adjacent to any form that collects
 * health-related personal data. Use this text for:
 *   - The #form2 "Message / Concerns" field helper text in Wix Editor
 *   - Any future custom inquiry or medical history forms
 *   - Pop-up consent banners
 *
 * For full PDPA compliance, pair this notice with an explicit checkbox field.
 * The checkbox key in #form2 should be mapped as FIELD_KEYS.consent in events.js.
 */
export const PDPA_CONSENT_TEXT = {
  en: {
    short:
      'By submitting this form, you consent to Samui Home Clinic collecting and processing your personal data for appointment and healthcare purposes, in accordance with Thailand's Personal Data Protection Act (PDPA) B.E. 2562.',
    checkboxLabel:
      'I consent to Samui Home Clinic processing my personal data per the PDPA (B.E. 2562).',
    fieldHelper:
      'Your information is kept strictly confidential and used only to assist with your care.',
    privacyLinkText: 'Read our Privacy Policy',
  },
  th: {
    short:
      'การส่งแบบฟอร์มนี้ถือว่าคุณยินยอมให้ Samui Home Clinic เก็บรวบรวมและประมวลผลข้อมูลส่วนบุคคลของคุณเพื่อวัตถุประสงค์ด้านการนัดหมายและการดูแลสุขภาพ ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562',
    checkboxLabel:
      'ฉันยินยอมให้ Samui Home Clinic ประมวลผลข้อมูลส่วนบุคคลของฉันตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562',
    fieldHelper:
      'ข้อมูลของคุณจะถูกเก็บรักษาเป็นความลับอย่างเคร่งครัดและใช้เพื่อช่วยในการดูแลของคุณเท่านั้น',
    privacyLinkText: 'อ่านนโยบายความเป็นส่วนตัว',
  },
};

// ── Pharmacy / Prescription Keyword Guard (COMP-02) ───────────────────────────

/**
 * PRESCRIPTION_KEYWORDS
 *
 * Terms that indicate a pharmacy inquiry involves a prescription-controlled
 * substance. When any of these appear in a form submission's concerns/message
 * field, the submission must be routed to WhatsApp/phone only — NOT saved
 * to any CRM or CMS collection without a full consent framework in place.
 *
 * Governs COMP-02: PEP/PrEP and prescription item inquiries.
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
];

/**
 * isPrescriptionKeyword
 *
 * Returns true if the given text contains any prescription-controlled keyword.
 * Used in events.js to skip MedicalInquiries CMS write and flag for manual
 * WhatsApp follow-up.
 *
 * @param {string} text — Free-text field value (concerns, symptoms, message)
 * @returns {boolean}
 */
export function isPrescriptionKeyword(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return PRESCRIPTION_KEYWORDS.some((kw) => lower.includes(kw));
}

/**
 * PHARMACY_WHATSAPP_MESSAGES
 *
 * Pre-filled WhatsApp message templates for pharmacy CTAs.
 * Use with whatsappLink() from public/constants.
 */
export const PHARMACY_WHATSAPP_MESSAGES = {
  general: 'Hello, I would like to enquire about pharmacy products at Samui Home Clinic.',
  pepPrep:
    'Hello, I would like to speak with a pharmacist about PEP/PrEP availability at Samui Home Clinic.',
  prescription:
    'Hello, I have a prescription I would like to discuss with a Samui Home Clinic pharmacist.',
  delivery:
    'Hello, I would like to arrange pharmacy delivery from Samui Home Clinic.',
};
