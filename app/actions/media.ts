/**
 * app/actions/media.ts
 * Server Action — Wix Media Manager Upload URL
 *
 * Generates a presigned upload URL from the Wix Site Media REST API.
 * The client uses this URL to PUT the file directly to Wix's CDN —
 * no file bytes pass through the Next.js server.
 *
 * Flow:
 *   1. Client calls getPharmacyUploadUrl(filename, mimeType)
 *   2. Server POSTs to Wix Media API → returns { uploadUrl, uploadToken }
 *   3. Client PUTs the file to uploadUrl with Authorization: uploadToken
 *   4. PUT response returns { file: { url } } — the permanent Wix CDN URL
 *   5. Client passes the CDN URL to submitPharmacyOrder as prescriptionFile
 *
 * Auth: WIX_API_KEY + WIX_SITE_ID (server-only env vars — never exposed to browser)
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

'use server';

export interface UploadUrlResult {
  uploadUrl: string;
  uploadToken: string;
}

/**
 * getPharmacyUploadUrl
 *
 * Generates a Wix Media presigned upload URL for a prescription file.
 * Only called for Rx (prescription-required) items in the pharmacy cart.
 *
 * @param filename — Original filename (e.g. "prescription.pdf")
 * @param mimeType — MIME type (e.g. "application/pdf", "image/jpeg")
 * @returns UploadUrlResult — { uploadUrl, uploadToken } for client-side PUT
 */
export async function getPharmacyUploadUrl(
  filename: string,
  mimeType: string
): Promise<UploadUrlResult> {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;

  if (!apiKey || !siteId) {
    throw new Error('Missing Wix credentials: WIX_API_KEY or WIX_SITE_ID not set');
  }

  const res = await fetch(
    'https://www.wixapis.com/site-media/v1/files/generate-upload-url',
    {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'wix-site-id': siteId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: filename, mimeType }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'unknown error');
    throw new Error(`Wix Media upload URL request failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return {
    uploadUrl: data.uploadUrl,
    uploadToken: data.uploadToken,
  };
}
