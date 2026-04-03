/**
 * bookings.web.js
 * Wix Velo Web Module — Booking Submissions
 *
 * Receives booking data from the frontend and persists it to the
 * `Bookings` CMS collection. Non-sensitive fields only — no PHI.
 *
 * Sensitive fields (concerns, symptoms) are handled separately in
 * medical-inquiries.web.js per PDPA compliance architecture.
 *
 * Frontend import:
 *   import { submitBooking } from 'backend/bookings.web';
 */

import { Permissions, webMethod } from 'wix-web-module';
import wixData from 'wix-data';

/**
 * submitBooking
 *
 * Persists a booking record to the `Bookings` CMS collection.
 * Accessible by any visitor (anonymous) — required for unauthenticated booking flow.
 *
 * @param {Object} bookingData
 * @param {string} bookingData.service     — Service name or ID selected by patient
 * @param {string} bookingData.branch      — Clinic branch (e.g. "Chaweng", "Lamai")
 * @param {string} bookingData.date        — Requested appointment date (ISO string)
 * @param {string} bookingData.time        — Requested appointment time slot
 * @param {string} bookingData.fullName    — Patient full name
 * @param {string} bookingData.whatsapp    — WhatsApp number (display/contact use only)
 * @param {string} bookingData.email       — Patient email address
 * @param {string} [bookingData.type]      — Booking type ("clinic" | "home-visit")
 *
 * @returns {{ success: boolean, bookingId: string }}
 */
export const submitBooking = webMethod(
  Permissions.Anyone,
  async ({ service, branch, date, time, fullName, whatsapp, email, type = 'clinic' }) => {
    if (!service || !fullName || !whatsapp || !email) {
      throw new Error('Missing required booking fields: service, fullName, whatsapp, email');
    }

    const record = {
      service,
      branch: branch || '',
      date: date ? new Date(date) : null,
      time: time || '',
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim().toLowerCase(),
      type,
      submittedAt: new Date(),
    };

    const result = await wixData.insert('Bookings', record);

    return { success: true, bookingId: result._id };
  }
);
