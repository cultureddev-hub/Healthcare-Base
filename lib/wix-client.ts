/**
 * lib/wix-client.ts
 * Wix Headless SDK — Server-Only Singleton Clients
 *
 * Two clients are exported:
 *
 *   wixClient      — OAuthStrategy (visitor/anonymous)
 *                    Use for: public CMS reads (Services, Team, Blog, Testimonials),
 *                    Bookings service queries, eCommerce product queries, CRM contact creation.
 *
 *   adminWixClient — ApiKeyStrategy (server-side admin)
 *                    Use for: writes to admin-only collections (Bookings, MedicalInquiries).
 *                    Secret key never leaves the server — NEXT_PUBLIC prefix intentionally
 *                    NOT used for WIX_API_KEY or WIX_SITE_ID.
 *
 * Both clients are restricted to server-side execution only via the `server-only`
 * package. Importing either in a Client Component throws a build-time error.
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

import 'server-only';

import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { services } from '@wix/bookings';
import { products } from '@wix/stores';
import { contacts } from '@wix/crm';

if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) {
  throw new Error(
    'Missing environment variable: NEXT_PUBLIC_WIX_CLIENT_ID — add to .env.local'
  );
}
if (!process.env.WIX_API_KEY) {
  throw new Error(
    'Missing environment variable: WIX_API_KEY — add to .env.local'
  );
}
if (!process.env.WIX_SITE_ID) {
  throw new Error(
    'Missing environment variable: WIX_SITE_ID — add to .env.local'
  );
}

/**
 * wixClient — anonymous/visitor OAuth client
 *
 * Modules: items, services, products, contacts
 * Auth: OAuthStrategy (public Client ID)
 */
export const wixClient = createClient({
  modules: { items, services, products, contacts },
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID }),
});

/**
 * adminWixClient — server-side API key client
 *
 * Use exclusively in Server Actions that write to admin-only collections or CRM:
 *   - Bookings (insert)          — non-PHI appointment metadata
 *   - MedicalInquiries (insert)  — sensitive PHI (concerns, symptoms)
 *   - Wix CRM contacts (create)  — safe data only (name, email, phone)
 *
 * contacts is included here (rather than on wixClient) to guarantee that
 * CRM write operations execute with API-key authority, not visitor OAuth.
 * This ensures CONTACTS.MANAGE permission is always available server-side.
 *
 * Modules: items, contacts
 * Auth: ApiKeyStrategy (secret key + site ID — never exposed to browser)
 */
export const adminWixClient = createClient({
  modules: { items, contacts },
  auth: ApiKeyStrategy({
    siteId: process.env.WIX_SITE_ID,
    apiKey: process.env.WIX_API_KEY,
  }),
});
