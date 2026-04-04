/**
 * _legacy_velo_reference/pharmacy-orders.events.js
 *
 * REFERENCE COPY — Deploy this code to the LIVE WIX VELO EDITOR.
 * ─────────────────────────────────────────────────────────────────────────────
 * Location in Wix Dashboard:
 *   Developer Tools > Velo by Wix > Backend > data.js
 *
 * Architecture note:
 *   This is a BACKEND-ONLY CMS data hook. Zero frontend Velo UI code exists
 *   in this project — all UI is rendered by the Next.js headless frontend.
 *   This file uses ONLY the Velo backend Data Hooks API (data.js).
 *
 * Function: PharmacyOrders_afterUpdate
 *   Fires after any PharmacyOrders collection item is updated.
 *   Watches for the specific status transition:
 *     Pending_Review → Approved_Awaiting_Payment
 *   On that transition: generates a payment link (real or stub) and writes
 *   it back to the Omise_Payment_Link field of the same order record.
 *
 * Status lifecycle:
 *   Pending_Review → Approved_Awaiting_Payment → Paid → Dispatched
 *
 * Dependencies:
 *   - omise-stub.jsw  (backend web module — generate payment link)
 *   - wix-data        (built-in Velo module — update the order record)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO DEPLOY:
 * 1. Open Wix Dashboard → Dev Mode → Enable Dev Mode
 * 2. In the file tree, open or create: Backend > data.js
 * 3. Paste the export below into data.js
 * 4. Also create Backend > omise-stub.jsw (see omise-stub.jsw reference file)
 * 5. Click "Publish" in the Wix Editor
 * ─────────────────────────────────────────────────────────────────────────────
 */

import wixData from 'wix-data';
import { generatePaymentLink } from 'backend/omise-stub';

/**
 * PharmacyOrders_afterUpdate
 *
 * CMS Data Hook — fires after a PharmacyOrders item is updated.
 * The Wix platform calls this function automatically; no manual invocation needed.
 *
 * @param {object} event
 * @param {object} event.item         — The updated item (new values)
 * @param {object} event.previousItem — The item before the update (old values)
 * @returns {object} event.item       — Return the item unchanged (required by Velo)
 */
export async function PharmacyOrders_afterUpdate(event) {
  const { item, previousItem } = event;

  // Status is a TAGS field — Wix returns it as an array (e.g. ["Pending_Review"])
  const prevStatus = Array.isArray(previousItem.Status)
    ? previousItem.Status[0]
    : previousItem.Status;
  const newStatus = Array.isArray(item.Status) ? item.Status[0] : item.Status;

  // Only trigger on the specific Pending_Review → Approved_Awaiting_Payment transition
  if (
    prevStatus === 'Pending_Review' &&
    newStatus === 'Approved_Awaiting_Payment'
  ) {
    const orderId = item._id;
    const whatsappNumber = item.WhatsApp_Number;
    const patientName = item.Patient_Name;

    try {
      // Generate the payment link (real Omise or stub)
      const paymentLink = await generatePaymentLink(orderId);

      // Write the payment link back to the order record
      await wixData.update('PharmacyOrders', {
        ...item,
        Omise_Payment_Link: paymentLink,
      });

      // Log the full handoff payload for WhatsApp Business API integration
      console.log('═══════════════════════════════════════════════════');
      console.log('[PharmacyOrders] ✅ Payment link generated');
      console.log(`  Order ID    : ${orderId}`);
      console.log(`  Patient     : ${patientName}`);
      console.log(`  WhatsApp    : ${whatsappNumber}`);
      console.log(`  Payment URL : ${paymentLink}`);
      console.log('');
      console.log('  [TODO] Send this URL to patient via WhatsApp Business API:');
      console.log(`  POST https://api.whatsapp.com/send?phone=${whatsappNumber}`);
      console.log(`  Body: "Your Samui Home Pharmacy order is approved! Pay here: ${paymentLink}"`);
      console.log('═══════════════════════════════════════════════════');
    } catch (err) {
      console.error(`[PharmacyOrders] ❌ Failed to generate payment link for order ${orderId}:`, err);
    }
  }

  // Always return the item (required by Velo data hooks)
  return item;
}
