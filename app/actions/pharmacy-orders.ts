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
 * Note on Prescription_File: Uploaded client-side via getPharmacyUploadUrl()
 * in app/actions/media.ts. The Wix Media CDN URL is passed in as prescriptionFile
 * and stored directly in the Prescription_File field.
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
  const { patientName, whatsappNumber, deliveryAddress, cartItems, prescriptionFile } = input;

  // Build the cart payload JSON
  const cartWithMeta = {
    items: cartItems,
    submittedAt: new Date().toISOString(),
  };

  try {
    const result = await adminWixClient.items.insert(COLLECTION, {
      Patient_Name: patientName,
      WhatsApp_Number: whatsappNumber,
      Delivery_Address: deliveryAddress,
      Cart_Payload: JSON.stringify(cartWithMeta),
      Prescription_File: prescriptionFile ?? null,
      Status: 'Pending_Review',
      Submitted_At: new Date(),
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
