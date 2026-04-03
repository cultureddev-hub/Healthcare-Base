/**
 * lib/wix-client.ts
 * Wix Headless SDK — Server-Only Singleton Clients
 *
 * Two clients are exported:
 *
 *   wixClient      — OAuthStrategy (visitor/anonymous)
 *                    Use for: public CMS reads (Services, Team, Blog, Testimonials),
 *                    Bookings service queries, eCommerce product queries.
 *
 *   adminWixClient — ApiKeyStrategy (server-side admin)
 *                    Use for: writes to admin-only collections (Bookings, MedicalInquiries),
 *                    CRM contact creation. Secret key never leaves the server —
 *                    NEXT_PUBLIC prefix intentionally NOT used for WIX_API_KEY or WIX_SITE_ID.
 *
 * Both clients are restricted to server-side execution only via the `server-only`
 * package. Importing either in a Client Component throws a build-time error.
 *
 * Lazy initialization: clients are created on first call, not at module load time.
 * This prevents Next.js static generation ("Collecting page data") from throwing
 * on missing env vars — validation only runs at request time.
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

import 'server-only';

import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { services } from '@wix/bookings';
import { products } from '@wix/stores';
import { contacts } from '@wix/crm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _wixClient: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _adminWixClient: any = null;

/**
 * getWixClient — anonymous/visitor OAuth client
 *
 * Modules: items, services, products, contacts
 * Auth: OAuthStrategy (public Client ID)
 */
function getWixClient() {
  if (_wixClient) return _wixClient;

  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  if (!clientId) {
    throw new Error(
      'Missing environment variable: NEXT_PUBLIC_WIX_CLIENT_ID — add to Vercel Environment Variables'
    );
  }

  _wixClient = createClient({
    modules: { items, services, products, contacts },
    auth: OAuthStrategy({ clientId }),
  });

  return _wixClient;
}

/**
 * getAdminWixClient — server-side API key client
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
function getAdminWixClient() {
  if (_adminWixClient) return _adminWixClient;

  const siteId = process.env.WIX_SITE_ID;
  const apiKey = process.env.WIX_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Missing environment variable: WIX_API_KEY — add to Vercel Environment Variables'
    );
  }
  if (!siteId) {
    throw new Error(
      'Missing environment variable: WIX_SITE_ID — add to Vercel Environment Variables'
    );
  }

  _adminWixClient = createClient({
    modules: { items, contacts },
    auth: ApiKeyStrategy({ siteId, apiKey }),
  });

  return _adminWixClient;
}

// Proxy re-exports — preserve the existing `wixClient.x` / `adminWixClient.x`
// call-site API so no other files need to change.
export const wixClient = new Proxy({} as ReturnType<typeof getWixClient>, {
  get(_, prop) {
    return getWixClient()[prop];
  },
});

export const adminWixClient = new Proxy({} as ReturnType<typeof getAdminWixClient>, {
  get(_, prop) {
    return getAdminWixClient()[prop];
  },
});
