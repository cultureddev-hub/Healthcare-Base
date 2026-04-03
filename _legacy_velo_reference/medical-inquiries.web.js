/**
 * medical-inquiries.web.js
 * Wix Velo Web Module — Sensitive Medical Inquiry Routing
 *
 * Handles ONLY the sensitive, PHI-adjacent fields collected during
 * the booking and consultation request flows. Routes exclusively to
 * the `MedicalInquiries` CMS collection — never to the Wix Contacts CRM.
 *
 * PDPA compliance (Thailand Personal Data Protection Act B.E. 2562):
 * - `concerns` and `symptoms` are health-related personal data
 * - They must be stored in an access-restricted collection (Admin-only read)
 * - They must NEVER be written to the Wix Contacts CRM or any public collection
 * - A `bookingRef` links this record back to the corresponding Bookings entry
 *
 * Permission: SiteMember only — prevents unauthenticated direct invocation.
 * For data.js hook-triggered calls (backend→backend), import the helper directly:
 *   import { _insertMedicalInquiry } from 'backend/medical-inquiries.web';
 *
 * SECURITY NOTE: Before deploying, ensure the `MedicalInquiries` CMS collection
 * permissions are set to "Admin" read/write in the Wix Dashboard (Content Manager
 * → Collection Permissions). The backend suppresses user filters to bypass
 * collection-level read restrictions during write.
 *
 * Frontend import (requires authenticated site member):
 *   import { submitMedicalInquiry } from 'backend/medical-inquiries.web';
 */

import { Permissions, webMethod } from 'wix-web-module';
import wixData from 'wix-data';

/**
 * _insertMedicalInquiry
 *
 * Internal helper — can be imported from other backend files (e.g., data.js hooks)
 * to insert a medical inquiry record without going through the web method layer.
 * This allows data.js hooks (which run server-side) to write PHI while the
 * web method enforces SiteMember permission for direct frontend calls.
 *
 * @param {Object} inquiryData
 * @param {string} [inquiryData.bookingRef]  — _id from corresponding Bookings record
 * @param {string} [inquiryData.concerns]    — Free-text patient concerns
 * @param {string} [inquiryData.symptoms]    — Free-text symptoms description
 *
 * @returns {Object} — Inserted WixData record
 */
export async function _insertMedicalInquiry({ bookingRef = '', concerns = '', symptoms = '' }) {
  const record = {
    bookingRef,
    concerns: concerns.trim(),
    symptoms: symptoms.trim(),
    submittedAt: new Date(),
  };

  // suppressAuth: true — allows backend writes to Admin-only collection
  return wixData.insert('MedicalInquiries', record, { suppressAuth: true });
}

/**
 * submitMedicalInquiry
 *
 * Exposed web method for frontend components to submit sensitive medical
 * inquiry data. Restricted to authenticated site members — anonymous users
 * cannot invoke this endpoint directly.
 *
 * If the booking flow requires anonymous PHI submission, route via a
 * data.js beforeInsert hook on the Bookings collection, calling
 * _insertMedicalInquiry() server-side and stripping PHI fields before
 * the Bookings record is committed.
 *
 * @param {Object} inquiryData
 * @param {string} [inquiryData.bookingRef]  — _id from corresponding Bookings record
 * @param {string} [inquiryData.concerns]    — Free-text patient concerns
 * @param {string} [inquiryData.symptoms]    — Free-text symptoms description
 *
 * @returns {{ success: boolean, inquiryId: string }}
 */
export const submitMedicalInquiry = webMethod(
  Permissions.SiteMember,
  async ({ bookingRef, concerns, symptoms }) => {
    if (!concerns && !symptoms) {
      throw new Error('At least one of concerns or symptoms must be provided');
    }

    const result = await _insertMedicalInquiry({ bookingRef, concerns, symptoms });

    return { success: true, inquiryId: result._id };
  }
);
