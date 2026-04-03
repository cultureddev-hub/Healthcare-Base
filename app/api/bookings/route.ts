/**
 * app/api/bookings/route.ts
 * Unified Booking API Route — 3-Stage PDPA Pipeline
 *
 * Handles all booking types:
 *   type: 'clinic'               — Main booking form (F-01)
 *   type: 'home-visit'           — Home Visit Modal (F-02)
 *   type: 'online-consultation'  — Online Consult Modal (F-03)
 *   type: 'pickup'               — Pick-Up / Drop-Off Modal (F-04)
 *
 * Pipeline Stages (PDPA B.E. 2562 Compliance):
 *   STAGE 1 — PDPA consent gate: reject if pdpaConsent !== true
 *   STAGE 2 — Pharmacy keyword intercept (COMP-02): if PEP/PrEP/HIV/etc. detected,
 *             return WhatsApp redirect. NO DB write. No record created.
 *   STAGE 3a — CRM contact creation: safe fields (name, email, phone) → @wix/crm
 *   STAGE 3b — PHI write: concerns/symptoms → MedicalInquiries (admin-only collection)
 *   STAGE 4  — Booking record: non-PHI metadata → Bookings collection (no health text)
 *
 * Architecture: Wix Headless (Vercel/Next.js) — see BUILD_LOG_2.1.md
 */

import { NextRequest, NextResponse } from "next/server";
import { isPrescriptionKeyword, PHARMACY_WHATSAPP_MESSAGES } from "@/lib/utils/pdpa";
import { adminWixClient } from "@/lib/wix-client";
import { createLead } from "@/app/actions/leads";
import { submitMedicalInquiry } from "@/app/actions/medical-inquiries";

// Clinic WhatsApp number (main line — confirmed from structured-data.ts)
const CLINIC_WHATSAPP = "660806696915";

export async function POST(req: NextRequest) {
  const {
    service,
    department,
    branch,
    date,
    time,
    fullName,
    whatsapp,
    email,
    nationality,
    gender,
    dob,
    type,
    concerns,
    symptoms,
    address,
    provider,
    pdpaConsent,
  } = await req.json();

  // ── Basic Field Validation ──────────────────────────────────────────────────
  if (!fullName || !whatsapp) {
    return NextResponse.json(
      { error: "Missing required fields: fullName, whatsapp" },
      { status: 400 }
    );
  }
  // Service and email required for clinic/home-visit/online types
  const bookingType = type ?? "clinic";
  if (bookingType !== "pickup" && (!service || !email)) {
    return NextResponse.json(
      { error: "Missing required fields: service, email" },
      { status: 400 }
    );
  }

  // ── STAGE 1: PDPA Consent Gate ─────────────────────────────────────────────
  // COMP-01: No data collection without explicit patient consent.
  if (!pdpaConsent) {
    return NextResponse.json(
      { error: "PDPA consent is required to proceed with this booking." },
      { status: 400 }
    );
  }

  // ── STAGE 2: Pharmacy Keyword Intercept (COMP-02) ──────────────────────────
  // If any free-text field contains a prescription/controlled-substance keyword,
  // exit immediately with WhatsApp redirect. NO database write is performed.
  const freeTextInput = `${concerns ?? ""} ${symptoms ?? ""}`.trim();
  if (freeTextInput && isPrescriptionKeyword(freeTextInput)) {
    const encodedMessage = encodeURIComponent(PHARMACY_WHATSAPP_MESSAGES.pepPrep);
    return NextResponse.json({
      success: false,
      redirect: "pharmacy",
      whatsappUrl: `https://wa.me/${CLINIC_WHATSAPP}?text=${encodedMessage}`,
      message: PHARMACY_WHATSAPP_MESSAGES.pepPrep,
    });
  }

  // ── Dev Fallback ───────────────────────────────────────────────────────────
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!apiKey || !siteId) {
    console.warn("[bookings] WIX_API_KEY / WIX_SITE_ID not set — returning mock success");
    return NextResponse.json({ success: true, bookingId: `dev-${Date.now()}` });
  }

  // ── STAGE 3a: CRM Contact Creation (Safe Data — PDPA Boundary) ────────────
  // Only safe fields cross into the CRM: name, email, phone.
  // Medical data (concerns, symptoms) is NEVER passed to this function.
  let contactId = "";
  try {
    const leadResult = await createLead({ fullName, email: email ?? "", whatsapp });
    contactId = leadResult.contactId;
  } catch (err) {
    // Non-fatal: log and continue. Repeat-patient duplicate emails may cause
    // a benign createContact failure — booking proceeds regardless.
    console.error("[bookings] CRM createLead error:", err);
  }

  // ── STAGE 3b: PHI Write to MedicalInquiries (Admin-Only Collection) ────────
  // Only executed if the patient provided a concerns or symptoms field.
  // This data NEVER touches the Bookings collection or the CRM.
  let medicalInquiryRef = "";
  if (concerns || symptoms) {
    try {
      const phiResult = await submitMedicalInquiry({
        concerns: concerns ?? "",
        symptoms: symptoms ?? "",
        contactId,
        service: service ?? "",
        pdpaConsentGiven: true,
      });
      if (phiResult.success) {
        medicalInquiryRef = phiResult.inquiryId;
      }
    } catch (err) {
      // Non-fatal: log PHI write failure. The booking record will be created
      // without a medicalInquiryRef. Staff can follow up via WhatsApp.
      console.error("[bookings] MedicalInquiries write error:", err);
    }
  }

  // ── STAGE 4: Booking Record (Non-PHI Metadata Only) ───────────────────────
  // PDPA boundary: concerns and symptoms are NEVER written here.
  // Only appointment logistics + foreign key references are stored.
  try {
    const bookingData: Record<string, unknown> = {
      contactId,
      medicalInquiryRef: medicalInquiryRef || null,
      service: service ?? "",
      department: department ?? "",
      branch: branch ?? "",
      address: address ?? "",
      provider: provider ?? "",
      date: date ? new Date(date).toISOString() : null,
      time: time ?? "",
      nationality: nationality ?? "",
      gender: gender ?? "",
      dob: dob ?? "",
      type: bookingType,
      status: "pending",
      pdpaConsentGiven: true,
      pdpaConsentTimestamp: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    };

    const result = await adminWixClient.items.insert("Bookings", bookingData);

    return NextResponse.json({
      success: true,
      bookingId: result._id ?? null,
      contactId: contactId || undefined,
      medicalInquiryRef: medicalInquiryRef || undefined,
    });
  } catch (err) {
    console.error("[bookings] Bookings collection insert error:", err);
    return NextResponse.json({ error: "Failed to create booking record." }, { status: 502 });
  }
}
