/**
 * app/actions/pharmacy-inventory.ts
 * Server Action — Wix CMS PharmacyInventory Query
 *
 * Reads from the `PharmacyInventory` collection (read: ANYONE, via OAuth client).
 * Follows the exact same pattern as getServices() in actions/cms.ts.
 *
 * Collection created via Wix MCP on 2026-04-04.
 * Fields: Item_Name, Price, Category, Image, Requires_Prescription, Description
 */

'use server';

import { wixClient } from '@/lib/wix-client';
import type { PharmacyProduct } from '@/lib/types/cms';

const COLLECTION = 'PharmacyInventory';

/**
 * getPharmacyInventory
 *
 * Fetches all pharmacy products, sorted by name ascending.
 * Optionally filter by category ('OTC' or 'Rx').
 *
 * @param opts.category — Filter by category string
 * @param opts.limit    — Max items to return (default: 100)
 */
export async function getPharmacyInventory({
  category,
  limit = 100,
}: { category?: string; limit?: number } = {}): Promise<PharmacyProduct[]> {
  try {
    let q = wixClient.items
      .query(COLLECTION)
      .ascending('Item_Name')
      .limit(limit);

    if (category) q = q.eq('Category', category);

    const { items } = await q.find();
    return items as PharmacyProduct[];
  } catch (err) {
    console.error('[PharmacyInventory] Failed to fetch products:', err);
    return [];
  }
}
