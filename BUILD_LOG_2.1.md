# BUILD_LOG_2.1.md — Samui Home Clinic (SHC) Headless Build

## SOURCE OF TRUTH — Wix Headless Architecture (Next.js 15 + Vercel + Wix SDK)
### Format: Reverse-chronological. New entries go at the TOP.

---

## [2026-04-03T00:00:00+07:00] — SESSION 2.2: Full Backend Integration & PDPA Compliance Activation

### Session Mandate
Complete the Wix Headless backend wiring for all user-facing data-collection forms. Activate all PDPA compliance controls. Eliminate all dead-end form submissions. Log all architectural decisions in this file.

---

### Pre-Session Audit Findings (Critical)

Before any code was written, a full codebase audit identified the following violations:

| ID | Severity | Finding |
|----|----------|---------|
| V-01 | 🔴 Critical | No PDPA consent checkbox on any form. `lib/utils/pdpa.ts` defined consent text but it was imported nowhere. |
| V-02 | 🔴 Critical | `concerns` field (F-01 Main Booking Form) was submitted to `POST /api/bookings` but **not included in the fetch payload** — silently dropped. The route then wrote all other data to the `Bookings` CMS collection without PHI separation. |
| V-03 | 🔴 Critical | `isPrescriptionKeyword()` and `submitMedicalInquiry()` were fully implemented but called by zero forms. Pharmacy keyword guard was completely non-functional. |
| V-04 | 🟠 High | Three modals (F-02 Home Visit, F-03 Online Consult, F-04 Pick-Up) had `handleSubmit` functions that only called `setSubmitted(true)`. Zero data persistence. Patients received a "we'll contact you" confirmation with no record created. |
| V-05 | 🟡 Medium | `createLead()` server action (CRM) was implemented but never called from any form. CRM was never populated. |
| V-06 | 🟡 Medium | `adminWixClient` lacked `contacts` module. CRM writes were routed through `wixClient` (OAuthStrategy / visitor-level), which may lack `CONTACTS.MANAGE` permission scope on some Wix OAuth configurations. |

---

### Architectural Decisions Made This Session

#### AD-01: Unified API Route (`POST /api/bookings`)
**Decision:** All four form types (clinic, home-visit, online-consultation, pickup) route through a single `POST /api/bookings` endpoint differentiated by the `type` field.

**Rationale:** A unified route guarantees the 3-stage PDPA pipeline executes identically for all submission types. Duplicating the pipeline across 4 routes increases the surface area for compliance drift. The `type` field is already used in the `Bookings` collection schema.

**Rejected Alternative:** Separate API routes per form type. Rejected because any future change to the PDPA pipeline (e.g. adding a new consent field) would need to be replicated in 4 places.

---

#### AD-02: 3-Stage PDPA Pipeline in Route Handler
**Decision:** The route handler executes stages sequentially. A failure in Stage 3a (CRM) is **non-fatal** — the booking proceeds to Stage 4. A failure in Stage 3b (PHI write) is also **non-fatal** — logged and continued.

**Rationale:** For a healthcare clinic, losing a booking record due to a transient CRM error is worse than an incomplete CRM entry. Staff can always re-create the CRM contact from the booking record. PHI loss is also a concern, but a failed MedicalInquiries insert is less harmful than a lost appointment — staff can follow up via WhatsApp.

**Pipeline:**
```
STAGE 1 — PDPA Consent Gate:      pdpaConsent !== true → 400 rejection
STAGE 2 — Pharmacy Intercept:     isPrescriptionKeyword(concerns + symptoms) → WhatsApp redirect, NO DB write
STAGE 3a — CRM Contact:           createLead() → @wix/crm contacts.createContact() [non-fatal]
STAGE 3b — PHI Write:             submitMedicalInquiry() → @wix/data items.insert('MedicalInquiries') [non-fatal, only if concerns/symptoms present]
STAGE 4 — Booking Record:         adminWixClient.items.insert('Bookings') [fatal — returns 502 on failure]
```

---

#### AD-03: `contacts` Module Moved to `adminWixClient`
**Decision:** `contacts` module was moved from `wixClient` (OAuthStrategy) to `adminWixClient` (ApiKeyStrategy).

**Rationale:** The Wix CRM `contacts.createContact()` method requires the `CONTACTS.MANAGE` permission scope. With OAuthStrategy (visitor/anonymous), this permission is not guaranteed to be granted in all Wix Headless OAuth app configurations. API key authority guarantees CONTACTS.MANAGE is always available. The `wixClient` retains `contacts` for any future visitor-facing contact reads (e.g., member portal), but all server-side CRM writes now use `adminWixClient`.

**Impact on `wix-client.ts`:** `adminWixClient` modules updated from `{ items }` to `{ items, contacts }`.

---

#### AD-04: `allowDuplicates: true` in CRM Contact Creation
**Decision:** `contacts.createContact()` is called with `allowDuplicates: true`.

**Rationale:** Samui Home Clinic serves repeat patients (tourists on annual trips, expats with recurring health needs). Without `allowDuplicates: true`, a second booking from the same patient email would silently fail the CRM stage. The clinic's CRM dashboard is responsible for deduplication — not the booking API. Each booking creates a traceable contact record tied to that specific visit.

---

#### AD-05: PHI Cross-Collection Traceability via Foreign Keys
**Decision:** Both the `Bookings` and `MedicalInquiries` collection records store `contactId` (FK to Wix CRM). `Bookings` additionally stores `medicalInquiryRef` (FK to `MedicalInquiries._id`).

**Rationale:** Under PDPA, a patient may request access to or deletion of their data. The cross-collection FK chain (CRM → Bookings → MedicalInquiries) allows staff to locate all records associated with a single patient identity and process erasure requests completely. Without this chain, PHI in `MedicalInquiries` would be an orphaned record with no patient identity linkage.

**New fields added to `MedicalInquiries` schema:**
- `contactId` (text) — FK to Wix CRM
- `service` (text) — service context for clinical staff
- `pdpaConsentGiven` (boolean)
- `pdpaConsentTimestamp` (datetime)

**New fields added to `Bookings` schema:**
- `contactId` (text) — FK to Wix CRM
- `medicalInquiryRef` (text) — FK to MedicalInquiries (null if no PHI submitted)
- `address` (text) — for home-visit and pickup types
- `provider` (text) — for online-consultation type
- `status` (text) — initially `'pending'`
- `pdpaConsentGiven` (boolean)
- `pdpaConsentTimestamp` (datetime)

> **Action Required:** Update both Wix CMS collection schemas in the Wix Dashboard → Content Manager to add these fields before deploying.

---

#### AD-06: Pharmacy Intercept UI — Rendered Client-Side, Triggered Server-Side
**Decision:** The pharmacy keyword check runs server-side (in `route.ts` and `medical-inquiries.ts`). The API returns `{ redirect: 'pharmacy', whatsappUrl }`. The client renders the intercept UI when this response is received.

**Rationale:** The keyword list (`PRESCRIPTION_KEYWORDS` in `pdpa.ts`) must never be exposed to the client bundle — a bad actor could enumerate the keywords to craft submissions that bypass detection. By running the check exclusively on the server, the keyword list stays server-side only.

**WhatsApp URL:** `https://wa.me/660806696915?text={encoded PHARMACY_WHATSAPP_MESSAGES.pepPrep}` — uses the clinic's main number confirmed from `lib/structured-data.ts`.

---

#### AD-07: PDPA Consent Checkbox — UI Design Decision
**Decision:** The PDPA consent checkbox is placed inline in each form's final step (just before the submit button), using the shortened bilingual-derived English text. The checkbox is required (submit button disabled until checked). The full bilingual notice from `PDPA_CONSENT_TEXT` in `lib/utils/pdpa.ts` is not rendered in full — only the short English summary.

**Rationale:** Displaying 2 full paragraphs of bilingual consent text inside a small modal would harm UX significantly. The short label (`"I consent to Samui Home Clinic collecting and processing my personal data..."`) satisfies the PDPA B.E. 2562 requirement for explicit, informed consent. A future Privacy Policy page can contain the full notice.

**PDPA Compliance Status:** COMP-01 is now fully active across all four forms.

---

### Files Modified This Session

| File | Change Type | Summary |
|------|-------------|---------|
| `app/api/bookings/route.ts` | **Rewrite** | Replaced raw-fetch Wix API call with 3-stage PDPA pipeline using SDK server actions |
| `lib/wix-client.ts` | **Update** | Added `contacts` module to `adminWixClient` (moved from `wixClient`) |
| `app/actions/leads.ts` | **Update** | Switched from `wixClient` to `adminWixClient`; added `allowDuplicates: true` |
| `app/actions/medical-inquiries.ts` | **Update** | Extended `MedicalInquiryInput` with `contactId`, `service`, `pdpaConsentGiven`; updated insert payload |
| `components/booking-section.tsx` | **Update** | Added `pdpaConsent` state, `pharmacyRedirect` state, PDPA checkbox, pharmacy intercept screen, `concerns` field in payload, `ShieldCheck` import |
| `components/hero-section.tsx` | **Update** | Wired F-02, F-03, F-04 modals: async `handleSubmit`, `fetch('/api/bookings')`, PDPA consent checkboxes, loading/error states, pharmacy intercept (F-02) |

---

### PDPA Compliance Status After Session 2.2

| Compliance Flag | Status | Implementation |
|----------------|--------|----------------|
| COMP-01 | ✅ **Now Active in UI** | PDPA consent checkbox rendered on all four forms. Submit button gated — cannot proceed without consent. `pdpaConsent: true` sent in every API payload. |
| COMP-02 | ✅ **Now Active End-to-End** | `isPrescriptionKeyword()` called in `route.ts` (Stage 2) AND in `submitMedicalInquiry()` (defense-in-depth). Pharmacy intercept UI rendered on F-01 and F-02. |
| COMP-03 | ✅ Active | All copy uses "PDPA-compliant" (not HIPAA). |
| COMP-04 | ✅ Active | `dob` field optional in booking schema. |
| COMP-05 | ✅ **New** | Cross-collection FK traceability: CRM `contactId` → `Bookings.contactId` → `MedicalInquiries.contactId`. Enables complete patient data erasure on PDPA subject-access/deletion requests. |

---

### CMS Collection Schema (Updated — Session 2.2)

> **Action Required for next deployment:** Add the following fields to both collections in Wix Dashboard.

**`Bookings` collection (Admin access — previously had: service, branch, date, time, fullName, whatsapp, email, type, submittedAt):**

| New Field | Type | Notes |
|-----------|------|-------|
| `contactId` | Text | FK to Wix CRM contact |
| `medicalInquiryRef` | Text | FK to MedicalInquiries._id (nullable) |
| `address` | Text | For home-visit and pickup types |
| `provider` | Text | For online-consultation type (Doctor / Pharmacist) |
| `status` | Text | Initial value: `'pending'` |
| `pdpaConsentGiven` | Boolean | Always `true` — set at submission time |
| `pdpaConsentTimestamp` | Date and Time | ISO timestamp of consent |

**`MedicalInquiries` collection (Admin access — previously had: bookingRef, concerns, symptoms, submittedAt):**

| New Field | Type | Notes |
|-----------|------|-------|
| `contactId` | Text | FK to Wix CRM contact |
| `service` | Text | Service selected at booking (clinical context for admin) |
| `pdpaConsentGiven` | Boolean | Always `true` at write time |
| `pdpaConsentTimestamp` | Date and Time | ISO timestamp of consent |

---

### Wix SDK Methods Used (Confirmed via Wix MCP Server)

| Method | Package | Usage |
|--------|---------|-------|
| `contacts.createContact(contactInfo, { allowDuplicates: true })` | `@wix/crm` | Stage 3a — CRM contact creation in `createLead()` |
| `items.insert('MedicalInquiries', dataItem)` | `@wix/data` | Stage 3b — PHI write in `submitMedicalInquiry()` |
| `items.insert('Bookings', bookingData)` | `@wix/data` | Stage 4 — Booking record in `route.ts` |

---

### Known Limitations & Phase 3 Backlog

| Item | Priority | Notes |
|------|----------|-------|
| Live slot availability | Medium | Currently uses hardcoded 9 AM–6 PM / 15-min manual slots. Phase 3 should replace with `bookings.listTimeslots()` from `@wix/bookings` for real availability. |
| CRM deduplication | Low | `allowDuplicates: true` creates a new CRM contact per booking. Phase 3 should use `appendOrCreateContact()` to merge into an existing contact for repeat patients. |
| Full Privacy Policy page | Medium | PDPA B.E. 2562 requires a published privacy policy. Currently a checkbox references it but no page exists. |
| Email confirmation | Medium | No transactional email is sent on booking. Phase 3 should trigger a Wix Triggered Email or Resend.com via a webhook. |
| Booking status webhook | Low | `status: 'pending'` is set at insert time but never updated. A Wix automation or webhook should update to `'confirmed'` / `'cancelled'` when staff action occurs. |

---

## [2026-04-01T00:00:00+07:00] — SESSION 2.1: Architecture Pivot & Headless Initialization

### CRITICAL ARCHITECTURAL DECISION: Wix Velo Abandoned → Wix Headless Adopted

- **Previous Architecture (BUILD_LOG.md):** Next.js `healthcare_base/` was UI-only. All backend logic lived in Wix Velo `.web.js` files synced via GitHub to Wix Editor.
- **New Architecture:** `healthcare_base/` is the **full-stack application**, deployed on **Vercel**. Wix is consumed strictly as a **headless CMS, CRM, Bookings, and eCommerce engine** via `@wix/sdk`.
- **Reason for pivot:** Wix Velo GitHub Sync is an incompatible runtime for Next.js 15. The Headless SDK gives full control over the frontend while retaining Wix's CMS, CRM, and Bookings services.
- **Impact:** No `.web.js` files, no `$w()` selectors, no Wix Visual Editor dependency. All UI lives in Next.js React components. All backend logic runs as Next.js Server Actions.

---

### Folder Structure Established

```
healthcare_base/
├── _legacy_velo_reference/       ← Raw copies of legacy Velo backend (READ-ONLY reference)
│   ├── BUILD_LOG.md              ← Copied from Healthcare_SHC/ parent root
│   ├── pdpa.js                   ← From Samui_Home_Clinic_2.0/src/public/
│   ├── bookings.web.js           ← From Samui_Home_Clinic_2.0/src/backend/
│   ├── leads.web.js              ← From Samui_Home_Clinic_2.0/src/backend/
│   ├── cms.js                    ← From Samui_Home_Clinic_2.0/src/public/
│   └── medical-inquiries.web.js  ← From Samui_Home_Clinic_2.0/src/backend/
│
├── lib/
│   ├── wix-client.ts             ← Server-only Wix Headless SDK singleton
│   └── utils/
│       └── pdpa.ts               ← TypeScript port of PDPA compliance utilities
│
├── app/
│   └── actions/
│       ├── bookings.ts           ← submitBooking() Server Action
│       ├── leads.ts              ← createLead() Server Action → Wix CRM
│       ├── medical-inquiries.ts  ← submitMedicalInquiry() + PDPA keyword guard
│       └── cms.ts                ← getServices(), getTeam(), getTestimonials(), etc.
│
└── BUILD_LOG_2.1.md              ← This file (source of truth for 2.1 build)
```

---

### Dependencies Added

| Package | Version | Purpose |
|---------|---------|---------|
| `@wix/sdk` | latest | Core Wix Headless client factory + OAuthStrategy |
| `@wix/data` | latest | CMS collection queries and mutations (`items` module) |
| `@wix/bookings` | latest | Wix Bookings service queries (`services` module) |
| `@wix/stores` | latest | Wix eCommerce product queries (`products` module) |
| `@wix/crm` | latest | Wix CRM contact creation (`contacts` module) |
| `server-only` | latest | Import guard — prevents `lib/wix-client.ts` from loading in client bundles |

---

### Environment Variables Required

Set in `.env.local` (never commit):

```
NEXT_PUBLIC_WIX_CLIENT_ID=        # OAuth App Client ID from Wix Dashboard > Headless Settings
```

To obtain: Wix Dashboard → Settings → Headless Settings → OAuth Apps → Create App.

---

### PDPA Compliance Architecture (Preserved from 2.0)

| Compliance Flag | Status | Implementation |
|----------------|--------|----------------|
| COMP-01 | Active | PDPA consent text exported from `lib/utils/pdpa.ts` for use in form components |
| COMP-02 | Active | `isPrescriptionKeyword()` called in `submitMedicalInquiry()` — exits early, no DB write, returns WhatsApp redirect payload |
| COMP-03 | Active | All copy uses "PDPA-compliant" (not HIPAA) |
| COMP-04 | Active | `dob` field optional in booking schema |

---

### CMS Collections (Unchanged from 2.0 — existing Wix collections)

| Collection ID | Fields | Access Level |
|--------------|--------|--------------|
| `Services` | title, desc, longDesc, category, duration, price, departmentId | Public |
| `Team` | name, specialisation, role, experience, imgUrl | Public |
| `Testimonials` | patientName, rating, body, date, branch | Public |
| `ClinicBlog` | title, body, author, publishDate, imgUrl, tags, slug | Public |
| `Bookings` | service, branch, date, time, fullName, whatsapp, email, type, submittedAt | Admin |
| `MedicalInquiries` | bookingRef, concerns, symptoms, submittedAt | Admin |

---

### Files Created This Session

1. `healthcare_base/_legacy_velo_reference/` — Context Merge complete (6 files)
2. `healthcare_base/BUILD_LOG_2.1.md` — This file
3. `healthcare_base/lib/wix-client.ts` — Wix Headless SDK singleton
4. `healthcare_base/lib/utils/pdpa.ts` — PDPA compliance utilities (TypeScript)
5. `healthcare_base/app/actions/bookings.ts` — Booking submission Server Action
6. `healthcare_base/app/actions/leads.ts` — CRM lead creation Server Action
7. `healthcare_base/app/actions/medical-inquiries.ts` — PHI routing Server Action
8. `healthcare_base/app/actions/cms.ts` — CMS query helper Server Actions
