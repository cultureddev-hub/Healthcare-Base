/**
 * app/actions/medical-inquiries.ts
 * Next.js Server Action — Sensitive Medical Inquiry Routing
 *
 * Headless translation of _legacy_velo_reference/medical-inquiries.web.js.
 * Handles ONLY PHI-adjacent fields (concerns, symptoms). Routes to the
 * admin-restricted `MedicalInquiries` Wix CMS collection.
 *
 * PDPA Compliance (COMP-01, COMP-02):
 *   - isPrescriptionKeyword() is checked BEFORE any DB write.
 *   - If a prescription keyword is detected: return early with a WhatsApp
 *     redirect payload — no record is written anywhere.
 *   - If clean: insert to `MedicalInquiries` only (never to CRM or Bookings).
 *
 * Fields stored in MedicalInquiries:
 *   - concerns / symptoms     — PHI free-text (what the patient entered)
 *   - contactId               — FK to Wix CRM contact (links PHI to identity record)
 *   - service                 — service selected at booking (provides clinical context)
 *   - pdpaConsentGiven        — boolean consent flag (required by PDPA B.E. 2562)
 *   - pdpaConsentTimestamp    — ISO timestamp of when consent was given
 *   - bookingRef              — optional FK to Bookings collection item
 *   - submittedAt             — ISO timestamp of PHI submission
 *
 * NOTE: MedicalInquiries collection permissions must be set to "Admin" read/write
 * in Wix Dashboard → Content Manager → Collection Permissions. This prevents
 * any visitor- or member-level access to PHI records.
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

'use server';

import { adminWixClient } from '@/lib/wix-client';
import type { WixDataItem } from '@wix/wix-data-items-sdk';
import { isPrescriptionKeyword, PHARMACY_WHATSAPP_MESSAGES } from '@/lib/utils/pdpa';

export interface MedicalInquiryInput {
  bookingRef?: string;
  concerns?: string;
  symptoms?: string;
  // Linking fields — added in Session 2.2 to enable cross-collection traceability
  contactId?: string;
  service?: string;
  pdpaConsentGiven?: boolean;
}

export type MedicalInquiryResult =
  | { success: true; inquiryId: string }
  | { success: false; requiresWhatsApp: true; message: string };

/**
 * submitMedicalInquiry
 *
 * PDPA-compliant PHI routing action.
 *
 * Flow:
 *   1. Validate at least one PHI field is present.
 *   2. Run COMP-02 keyword guard across combined text.
 *   3. If keyword hit → return WhatsApp redirect, no write.
 *   4. If clean → insert to MedicalInquiries collection only.
 *
 * @param input — MedicalInquiryInput
 * @returns MedicalInquiryResult
 * @throws Error if Wix insert fails
 */
export async function submitMedicalInquiry(
  input: MedicalInquiryInput
): Promise<MedicalInquiryResult> {
  const {
    bookingRef = '',
    concerns = '',
    symptoms = '',
    contactId = '',
    service = '',
    pdpaConsentGiven = false,
  } = input;

  if (!concerns && !symptoms) {
    throw new Error('At least one of concerns or symptoms must be provided');
  }

  // COMP-02: Prescription keyword guard — must run before any DB write
  const combinedText = `${concerns} ${symptoms}`.trim();
  if (isPrescriptionKeyword(combinedText)) {
    return {
      success: false,
      requiresWhatsApp: true,
      message: PHARMACY_WHATSAPP_MESSAGES.pepPrep,
    };
  }

  const dataItem = {
    bookingRef,
    concerns: concerns.trim(),
    symptoms: symptoms.trim(),
    contactId,
    service,
    pdpaConsentGiven,
    pdpaConsentTimestamp: new Date(),
    submittedAt: new Date(),
  };

  const result = await adminWixClient.items.insert('MedicalInquiries', dataItem as Partial<WixDataItem>);

  return { success: true, inquiryId: result._id ?? '' };
}
