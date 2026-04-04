/**
 * app/actions/pharmacy-orders.ts
 * Server Action — Wix CMS PharmacyOrders Insert
 *
 * Writes to the `PharmacyOrders` collection (write: ADMIN, via API key client).
 * All inserts default to Status = 'Pending_Review'.
 *
 * The Velo backend hook (backend/data.js → PharmacyOrders_afterUpdate) watches
 * for Status transitions from Pending_Review → Approved_Awaiting_Payment and
 * triggers the Omise payment link stub.
 *
 * Note on Prescription_File: Wix Media Manager upload is deferred to a future
 * sprint. The prescription filename is stored as a note inside Cart_Payload.
 * The admin team follows up via WhatsApp to collect the physical prescription.
 *
 * Collection created via Wix MCP on 2026-04-04.
 */

'use server';

import { adminWixClient } from '@/lib/wix-client';
import type { PharmacyOrderInput, CartItem } from '@/lib/types/cms';

const COLLECTION = 'PharmacyOrders';

export interface SubmitOrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

/**
 * submitPharmacyOrder
 *
 * Packages the patient form + cart payload and inserts a new order record
 * into PharmacyOrders with Status = 'Pending_Review'.
 *
 * @param input — Validated form data + serialised cart items
 */
export async function submitPharmacyOrder(
  input: PharmacyOrderInput
): Promise<SubmitOrderResult> {
  const { patientName, whatsappNumber, deliveryAddress, cartItems, prescriptionFilename } = input;

  // Build the cart payload JSON — include prescription note if applicable
  const hasRxItems = cartItems.some((item: CartItem) => item.requiresPrescription);
  const cartWithMeta = {
    items: cartItems,
    prescriptionNote: prescriptionFilename
      ? `Prescription uploaded by patient: ${prescriptionFilename}`
      : hasRxItems
      ? 'AWAITING PRESCRIPTION — Rx items in cart, prescription not yet uploaded'
      : null,
    submittedAt: new Date().toISOString(),
  };

  try {
    const result = await adminWixClient.items.insert(COLLECTION, {
      Patient_Name: patientName,
      WhatsApp_Number: whatsappNumber,
      Delivery_Address: deliveryAddress,
      Cart_Payload: JSON.stringify(cartWithMeta),
      Status: 'Pending_Review',
      Submitted_At: new Date(),
      // Prescription_File: deferred — requires Wix Media Manager upload
    });

    console.log(
      `[PharmacyOrders] New order inserted: ${result._id} | Patient: ${patientName} | WhatsApp: ${whatsappNumber}`
    );

    return { success: true, orderId: result._id };
  } catch (err) {
    console.error('[PharmacyOrders] Failed to insert order:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Submission failed. Please try again.',
    };
  }
}
