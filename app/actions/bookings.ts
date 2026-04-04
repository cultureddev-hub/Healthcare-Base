/**
 * app/actions/bookings.ts
 * Next.js Server Action — Booking Submission
 *
 * Headless translation of _legacy_velo_reference/bookings.web.js.
 * Receives non-PHI booking data from Next.js form components and
 * persists it to the `Bookings` Wix CMS collection via @wix/data.
 *
 * PDPA Boundary: PHI fields (concerns, symptoms) are explicitly excluded
 * from this action's input. They are handled exclusively by medical-inquiries.ts.
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

'use server';

import { adminWixClient } from '@/lib/wix-client';
import type { WixDataItem } from '@wix/wix-data-items-sdk';

export interface BookingInput {
  service: string;
  branch?: string;
  date?: string;
  time?: string;
  fullName: string;
  whatsapp: string;
  email: string;
  type?: 'clinic' | 'home-visit';
}

export interface BookingResult {
  success: true;
  bookingId: string;
}

/**
 * submitBooking
 *
 * Persists a booking record to the `Bookings` CMS collection.
 * Callable directly from Next.js form `action` props or via `startTransition`.
 *
 * @param input — BookingInput (no PHI fields)
 * @returns BookingResult
 * @throws Error if required fields are missing or Wix insert fails
 */
export async function submitBooking(input: BookingInput): Promise<BookingResult> {
  const { service, branch, date, time, fullName, whatsapp, email, type = 'clinic' } = input;

  if (!service || !fullName || !whatsapp || !email) {
    throw new Error('Missing required booking fields: service, fullName, whatsapp, email');
  }

  const dataItem = {
    service,
    branch: branch ?? '',
    date: date ? new Date(date) : null,
    time: time ?? '',
    fullName: fullName.trim(),
    whatsapp: whatsapp.trim(),
    email: email.trim().toLowerCase(),
    type,
    submittedAt: new Date(),
  };

  const result = await adminWixClient.items.insert('Bookings', dataItem as Partial<WixDataItem>);

  return { success: true, bookingId: result._id ?? '' };
}
