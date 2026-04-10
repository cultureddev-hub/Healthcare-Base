/**
 * app/actions/leads.ts
 * Next.js Server Action — CRM Lead Creation
 *
 * Headless translation of _legacy_velo_reference/leads.web.js.
 * Creates a Wix CRM Contact from non-sensitive booking/inquiry data.
 *
 * PDPA Boundary: Only safe fields are accepted — fullName, email, whatsapp.
 * Medical fields (concerns, symptoms) are NEVER passed to or stored by this action.
 *
 * Client: adminWixClient (ApiKeyStrategy) — guarantees CONTACTS.MANAGE permission
 * for server-side CRM writes. Using wixClient (OAuthStrategy) was replaced
 * because visitor-level OAuth tokens may lack the required permission scope.
 *
 * Deduplication: appendOrCreateContact() matches on email or phone. If the contact
 * already exists it appends the new source and returns the existing _id — no duplicate
 * CRM records for returning patients (annual check-ups, repeat tourists, etc.).
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

'use server';

import { adminWixClient } from '@/lib/wix-client';

export interface LeadInput {
  fullName: string;
  email: string;
  whatsapp?: string;
}

export interface LeadResult {
  success: true;
  contactId: string;
}

/**
 * createLead
 *
 * Creates a Wix CRM Contact from safe, non-sensitive patient fields.
 * Translates wixCrmBackend.createContact() → adminWixClient.contacts.createContact().
 *
 * @param input — LeadInput (safe fields only)
 * @returns LeadResult
 * @throws Error if required fields are missing or Wix CRM call fails
 */
export async function createLead(input: LeadInput): Promise<LeadResult> {
  const { fullName, email, whatsapp } = input;

  if (!fullName || !email) {
    throw new Error('Missing required lead fields: fullName, email');
  }

  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] ?? '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const contactInfo = {
    name: { first: firstName, last: lastName },
    emails: {
      items: [{ tag: 'MAIN' as const, email: email.trim().toLowerCase() }],
    },
    phones: whatsapp
      ? { items: [{ tag: 'MOBILE' as const, countryCode: '', phone: whatsapp.trim() }] }
      : undefined,
  };

  const result = await adminWixClient.contacts.appendOrCreateContact({ contactInfo });

  return { success: true, contactId: result.contact?._id ?? '' };
}
