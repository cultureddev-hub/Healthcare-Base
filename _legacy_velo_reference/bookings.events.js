/**
 * _legacy_velo_reference/bookings.events.js
 *
 * REFERENCE COPY — Append this code to the LIVE WIX VELO EDITOR.
 * ─────────────────────────────────────────────────────────────────────────────
 * Location in Wix Dashboard:
 *   Developer Tools > Velo by Wix > Backend > data.js
 *
 * IMPORTANT: Append this export to backend/data.js alongside the existing
 * PharmacyOrders_afterUpdate export. Do NOT replace that export.
 *
 * Architecture note:
 *   This is a BACKEND-ONLY CMS data hook. All UI is rendered by the Next.js
 *   headless frontend. This file uses ONLY the Velo backend Data Hooks API.
 *
 * Function: Bookings_afterUpdate
 *   Fires after any Bookings collection item is updated by staff.
 *   Watches for two status transitions:
 *     Pending → Confirmed  — appointment confirmed by clinic
 *     Pending → Cancelled  — appointment cancelled by clinic or patient
 *
 * Status field: Status (TAGS/ARRAY_STRING)
 *   Allowed values: Pending | Confirmed | Cancelled | No_Show
 *   Field added via Wix Data API on 2026-04-10.
 *
 * Status lifecycle:
 *   Pending → Confirmed → (attended) → No_Show (if missed)
 *   Pending → Cancelled
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO DEPLOY:
 * 1. Open Wix Dashboard → Dev Mode → Enable Dev Mode
 * 2. In the file tree, open: Backend > data.js
 * 3. APPEND the export below at the bottom of data.js
 *    (do not replace PharmacyOrders_afterUpdate)
 * 4. Click "Publish" in the Wix Editor
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Bookings_afterUpdate
 *
 * CMS Data Hook — fires after a Bookings item is updated.
 * The Wix platform calls this function automatically.
 *
 * @param {object} event
 * @param {object} event.item         — The updated item (new values)
 * @param {object} event.previousItem — The item before the update (old values)
 * @returns {object} event.item       — Return the item unchanged (required by Velo)
 */
export async function Bookings_afterUpdate(event) {
  const { item, previousItem } = event;

  // Status is a TAGS field — Wix returns it as an array (e.g. ["Pending"])
  const prevStatus = Array.isArray(previousItem.Status)
    ? previousItem.Status[0]
    : previousItem.Status;
  const newStatus = Array.isArray(item.Status)
    ? item.Status[0]
    : item.Status;

  // Appointment confirmed by clinic
  if (prevStatus === 'Pending' && newStatus === 'Confirmed') {
    console.log('═══════════════════════════════════════════════════');
    console.log('[Bookings] ✅ Appointment Confirmed');
    console.log(`  Booking ID : ${item._id}`);
    console.log(`  Patient    : ${item.fullName}`);
    console.log(`  WhatsApp   : ${item.whatsapp}`);
    console.log(`  Service    : ${item.service}`);
    console.log(`  Branch     : ${item.branch}`);
    console.log(`  Date/Time  : ${item.date} @ ${item.time}`);
    console.log('');
    console.log('  [TODO] Send confirmation via WhatsApp Business API:');
    console.log(`  POST https://api.whatsapp.com/send?phone=${item.whatsapp}`);
    console.log(`  Body: "Your appointment at Samui Home Clinic is confirmed for ${item.date} at ${item.time} (${item.branch}). We look forward to seeing you."`);
    console.log('═══════════════════════════════════════════════════');
  }

  // Appointment cancelled by clinic or patient
  if (prevStatus === 'Pending' && newStatus === 'Cancelled') {
    console.log('═══════════════════════════════════════════════════');
    console.log('[Bookings] ❌ Appointment Cancelled');
    console.log(`  Booking ID : ${item._id}`);
    console.log(`  Patient    : ${item.fullName}`);
    console.log(`  WhatsApp   : ${item.whatsapp}`);
    console.log(`  Service    : ${item.service}`);
    console.log('');
    console.log('  [TODO] Send cancellation notice via WhatsApp Business API:');
    console.log(`  POST https://api.whatsapp.com/send?phone=${item.whatsapp}`);
    console.log(`  Body: "Your appointment at Samui Home Clinic has been cancelled. Please contact us at info@samuihomeclinic.com to reschedule."`);
    console.log('═══════════════════════════════════════════════════');
  }

  // Always return the item (required by Velo data hooks)
  return item;
}
