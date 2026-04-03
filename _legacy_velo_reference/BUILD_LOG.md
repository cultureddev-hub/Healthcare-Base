# BUILD_LOG.md — Samui Home Clinic (SHC)

## SOURCE OF TRUTH — Review this file at the start of every session before writing any code

### Format: Reverse-chronological. New entries go at the TOP

---

## [2026-03-31T00:00:00+07:00] — SESSION 01: Project Initialization & Audit

### Architectural Decision: Next.js → Wix Velo Port

- **Decision:** The existing `healthcare_base/` Next.js 15 app is designated as the **UI/UX design reference and logic blueprint only**. It will NOT be deployed directly.
- **Reason:** Wix GitHub sync pipeline requires a strict Wix Velo file structure. Next.js is an incompatible runtime. All component logic, styling intent, and data structures from `healthcare_base/` must be ported into Wix Velo's page-scoped event-driven model.
- **Impact:** No Next.js files should be pushed to the Wix-linked GitHub repository's `main` branch.

---

### Architectural Decision: Backend Split — CRM vs Medical Data

- **Decision:** Patient data collected across booking forms will be routed to two separate backends:
  1. **Wix Contacts (CRM):** Safe, non-sensitive fields only — `fullName`, `whatsapp`, `email`. Used for appointment communications.
  2. **`MedicalInquiries` CMS Collection (access-restricted):** Sensitive fields — `concerns`, `symptoms`. Never routed to the marketing CRM.
- **Reason:** PDPA (Thailand Personal Data Protection Act B.E. 2562) compliance. Merging PHI into a general-purpose CRM creates uncontrolled data exposure.

---

### Architectural Decision: Backend Function Structure (`src/backend/`)

- **Decision:** Three `.web.js` backend files planned:
  - `bookings.web.js` — receives and persists all booking form submissions → `Bookings` CMS collection
  - `leads.web.js` — creates/updates Wix Contacts from non-sensitive form data
  - `medical-inquiries.web.js` — handles sensitive fields → `MedicalInquiries` CMS collection (restricted)
- **Reason:** Separation of concerns, compliance isolation, and principle of least privilege for data access.

---

### Architectural Decision: CMS Collections Schema (Planned)

| Collection           | Key Fields                                                       | Access |
|----------------------|------------------------------------------------------------------|--------|
| `Services`           | title, desc, longDesc, category, duration, price, departmentId   | Public |
| `Team`               | name, specialisation, role, experience, imgUrl                   | Public |
| `Testimonials`       | patientName, rating, body, date, branch                          | Public |
| `Blog`               | title, body, author, publishDate, imgUrl, tags                   | Public |
| `Bookings`           | service, branch, date, time, fullName, whatsapp, email, type     | Admin  |
| `MedicalInquiries`   | bookingRef, concerns, symptoms, submittedAt                      | Admin  |

---

### Dependency Decision: Wix SDK Modules Required

To be installed via `velo.dependencies.json` once GitHub integration is active:

- `@wix/sdk` — core client initialization
- `@wix/data` — CMS queries and mutations
- `@wix/forms` — form submission handling
- `@wix/crm.contacts` — contact creation/update

---

### Compliance Flags Identified (Requires Fix Before Go-Live)

1. **COMP-01:** `concerns` / `symptoms` free-text fields must route to `MedicalInquiries` collection — NOT Wix CRM. PDPA consent checkbox required at point of collection.
2. **COMP-02:** Pharmacy order flow (PEP/PrEP) must route to direct WhatsApp/call only. No CRM record for prescription inquiries until consent framework is in place.
3. **COMP-03:** Replace `"HIPAA-compliant"` copy with `"PDPA-compliant"` — HIPAA is US law, inapplicable in Thailand.
4. **COMP-04:** Make `dob` field optional at booking stage. Add helper text: *"Required at check-in. Providing in advance speeds up your registration."*

---

### Element ID Mapping

*Populated from `.wix/types/` after first successful `wix dev` session (2026-03-31).*
*Always `git pull` before editing page files to pick up new Editor-generated IDs.*

#### Master Page — Global Elements (present on every page)

| Element ID                  | Type                      | Purpose                           |
|-----------------------------|---------------------------|-----------------------------------|
| `#header1`                  | Header                    | Global site header                |
| `#footer1`                  | Footer                    | Global site footer                |
| `#wixChat1`                 | IFrame                    | Live chat widget                  |
| `#form2`                    | WixFormsV2                | Contact/inquiry form (footer)     |
| `#socialBar1`               | HiddenCollapsedElement    | Social media links bar            |
| `#hamburgerOpenButton1`     | HiddenCollapsedElement    | Mobile nav open button            |
| `#hamburgerMenuContainer1`  | HiddenCollapsedElement    | Mobile nav container              |
| `#hamburgerCloseButton1`    | HiddenCollapsedElement    | Mobile nav close button           |
| `#expandableMenu2`          | HiddenCollapsedElement    | Mobile nav expandable menu        |
| `#text44`–`#text49`         | Text                      | Header/footer copy elements       |
| `#columnStrip*` (4)         | ColumnStrip               | Header/footer layout strips       |

#### Home Page (`Home.uru83.js`) — Key Interactive Elements

| Element ID              | Type      | Purpose                                      |
|-------------------------|-----------|----------------------------------------------|
| `#button22`             | Button    | Primary CTA (likely "Book Now")              |
| `#button12`             | Button    | Secondary CTA                                |
| `#sliderGallery1`       | IFrame    | Image gallery/slider                         |
| `#serviceListWidget3`   | IFrame    | **Wix Bookings service list widget**         |
| `#text3`                | Text      | Hero/section heading                         |
| `#text5`                | Text      | Section sub-heading                          |
| `#text24`, `#text25`    | Text      | Content copy elements                        |
| `#text50`–`#text52`     | Text      | Additional content elements                  |
| `#section*` (4)         | Section   | Page layout sections                         |

#### Booking Pages — Element IDs

| Page                     | Element ID              | Type   | Purpose                      |
|--------------------------|-------------------------|--------|------------------------------|
| Book Online (o1blg)      | `#bookingsList1`        | IFrame | Wix Bookings service list    |
| Booking Calendar (solud) | `#bookingCalendar1`     | IFrame | Wix Bookings calendar        |
| Booking Form (im71x)     | `#bookingForm1`         | IFrame | Wix Bookings checkout form   |
| Service Page (bilbs)     | `#bookingServicePage1`  | IFrame | Wix Bookings service detail  |

#### Other Pages — Element IDs

| Page              | Key Elements                                                  |
|-------------------|---------------------------------------------------------------|
| Blog (ipcj0)      | `#blog1` (IFrame)                                             |
| Post (au0wk)      | `#post1` (IFrame)                                             |
| Cart (o9czt)      | `#shoppingCart1` (IFrame)                                     |
| Checkout (fup2g)  | `#checkout1` (IFrame)                                         |
| Side Cart (n5z8e) | `#sideCartLightboxController1`, `#lightbox1`, `#sideCart1`    |
| Product (tf0py)   | `#productPage1` (IFrame)                                      |
| Category (z6eph)  | `#categoryPage1` (IFrame)                                     |
| Thank You (g4m45) | `#thankYouPage1` (IFrame)                                     |

---

### Architectural Discovery: Site Already Uses Wix Bookings Natively

**Finding (2026-03-31):** The live Wix site has **Wix Bookings fully installed**. All booking-related pages are powered by native Wix Bookings widgets (`#serviceListWidget3`, `#bookingsList1`, `#bookingCalendar1`, `#bookingForm1`).

**Impact on Phase A strategy:**

- Do NOT rebuild a custom booking form. The Next.js multi-step booking form from `healthcare_base/` is a UI reference only.
- Phase A backend work must integrate WITH Wix Bookings (using `wix-bookings` APIs / hooks), not replace it.
- The `#form2` (`WixFormsV2`) on the Master Page is the contact/inquiry form — this is the primary integration point for the lead capture and medical inquiry routing.
- `src/backend/data.js` (CMS data hooks) is the correct place to intercept form submissions for PDPA-compliant routing.

---

### Security Flag: `src/backend/permissions.json`

Default Wix permissions grant `invoke: true` to **anonymous users** on ALL backend methods (`"*": { "*": { "anonymous": { "invoke": true } } }`).

**This must be locked down before deploying `medical-inquiries.web.js`.** The `MedicalInquiries` backend function must restrict anonymous invocation. Priority 2 work will address this.

---

### Correction: `wix init` Does Not Exist in Current CLI

- **Finding (2026-03-31):** The installed `@wix/cli` v1.1.174 is the **Wix App Extensions CLI** — a different product. It has no `init` command.
- **Correct Process:** For Wix Editor/Velo GitHub integration, `wix.config.json` and `velo.dependencies.json` are **generated by the Wix Editor UI**, not the CLI.
- **Correct Workflow:**
  1. Client logs into Wix Dashboard → opens SHC site in Wix Editor
  2. Editor → Settings (top bar) → GitHub integration panel
  3. Connect a new or existing GitHub repo → Wix auto-generates `wix.config.json` and `velo.dependencies.json` and commits them
  4. Clone that GitHub repo locally → `git pull` to get Editor-generated stubs
- **CLI Role:** `wix login` authenticates the developer. `wix dev` (once inside the cloned Velo repo) launches the local tunnel.

---

### Phase A — Priority 1 Checklist

- [x] `BUILD_LOG.md` initialized (this file)
- [x] Wix CLI v1.1.174 installed (`~/.npm-global/bin/wix`)
- [x] GitHub integration enabled in Wix Editor — `wix.config.json` generated (siteId: `1e55775a-9555-47f0-b355-1e9cce9a34e7`)
- [x] Repo cloned: `Samui_Home_Clinic_2.0/` at `Healthcare_SHC/Samui_Home_Clinic_2.0/`
- [x] `npm install` complete — `node_modules` installed
- [x] `git pull` — 19 Wix Editor page stubs captured (see Page File Registry above)
- [x] **MANUAL STEP REQUIRED:** Run `wix login` in an interactive terminal, then `npm run dev`

---

## [2026-03-31T00:00:00+07:00] — SESSION 01: Phase A Priority 2 — Backend Infrastructure

### Files Created

| File | Purpose | Permission |
| ---- | ------- | ---------- |
| `src/backend/bookings.web.js` | Persists booking submissions → `Bookings` CMS collection | Anyone |
| `src/backend/leads.web.js` | Creates Wix Contact from safe fields only (name, email, phone) | Anyone |
| `src/backend/medical-inquiries.web.js` | Persists sensitive PHI → `MedicalInquiries` CMS collection | SiteMember |

### Wix Module Imports Used (built-in, no npm required)

- `wix-web-module` — `Permissions`, `webMethod` for inline permission declarations
- `wix-data` — CMS collection reads/writes (`bookings.web.js`, `medical-inquiries.web.js`)
- `wix-crm-backend` — Wix Contacts creation (`leads.web.js`)

**No `velo.dependencies.json` needed for Phase A.** The `@wix/sdk`, `@wix/data`, `@wix/crm.contacts` packages listed in the original plan are Wix App Extensions SDK packages — different product. Velo built-ins are imported by module name, not installed via npm.

### PDPA Architecture — Medical Inquiry Routing

The `medical-inquiries.web.js` module exports two entry points:

1. **`submitMedicalInquiry`** (web method, `Permissions.SiteMember`) — for authenticated frontend calls
2. **`_insertMedicalInquiry`** (regular export) — for backend-to-backend calls from `data.js` hooks

**Recommended flow for anonymous patient submissions:**

- `data.js` `beforeInsert` hook on `Bookings` collection intercepts form submission
- Extracts `concerns`/`symptoms` fields, calls `_insertMedicalInquiry()` server-side
- Strips PHI from the booking record before it is committed to `Bookings` collection

This ensures PHI never reaches the CRM even if a visitor submits as anonymous.

### Security: `permissions.json` Updated

`medical-inquiries.web.js` is now explicitly locked in `permissions.json`:

- `anonymous.invoke: false` — belt-and-suspenders on top of `webMethod(Permissions.SiteMember, ...)`
- All other backend methods retain the default `anonymous: true` (Wix Bookings widgets require this)

### CMS Collection Permissions — MANUAL STEP REQUIRED

The `MedicalInquiries` collection must be set to **Admin-only** read/write in the Wix Dashboard:

1. Wix Dashboard → Content Manager → `MedicalInquiries` collection
2. Settings → Permissions → Set to "Admin" for both Read and Write
3. The backend uses `suppressAuth: true` in `wixData.insert()` to bypass collection-level auth for server-side writes

### Phase A — Priority 2 Checklist

- [x] `src/backend/bookings.web.js` created
- [x] `src/backend/leads.web.js` created
- [x] `src/backend/medical-inquiries.web.js` created
- [x] `permissions.json` updated — `medical-inquiries.web.js` anonymous access blocked
- [x] `leads.web.js` updated — `_createLead` internal export added for backend-to-backend calls
- [x] `MedicalInquiries` CMS collection created with `read=ADMIN, write=ADMIN` via API

---

## [2026-03-31T00:00:00+07:00] — SESSION 01: Phase A Priority 2+3 — Data Hooks, Events, Master Page

### Files Created / Updated

| File | Type | Purpose |
| ---- | ---- | ------- |
| `src/backend/events.js` | New | WixForms submission handler → PDPA field routing |
| `src/backend/data.js` | New | CMS data hooks — PHI safety net on Bookings collection |
| `src/pages/masterPage.js` | Updated | Mobile nav toggle + #form2 client-side wiring |
| `src/backend/leads.web.js` | Updated | Added `_createLead` internal export |

### events.js — WixForms Submission Flow

`wixForms_onFormSubmit` fires after Wix processes any form on the site. We filter by `CONTACT_FORM_ID` (see below) then split the payload:

- Safe fields (`name`, `email`, `phone`) → `_createLead()` → Wix Contacts CRM
- Sensitive field (`message`/concerns) → `_insertMedicalInquiry()` → `MedicalInquiries` CMS

**ACTION REQUIRED — Get the Form ID:**

1. Wix Dashboard → CRM → Forms & Submissions
2. Click the contact form (the one connected to `#form2`)
3. Copy the UUID from the browser URL
4. Open `src/backend/events.js` → replace `'REPLACE_WITH_FORM2_ID'` with the UUID

**ACTION REQUIRED — Verify field keys:**

In Wix Editor → Master Page → click `#form2` → Edit Form → click each field → Settings → note the "Field Key". Update `FIELD_KEYS` in `events.js` if they differ from the defaults (`name`, `email`, `phone`, `message`).

### data.js — CMS Data Hook Safety Net

Four hooks protect the `Bookings` and `MedicalInquiries` collections:

| Hook | Collection | Action |
| ---- | ---------- | ------ |
| `Bookings_beforeInsert` | Bookings | Strip PHI, route to MedicalInquiries |
| `Bookings_beforeUpdate` | Bookings | Strip PHI fields from patch operations |
| `MedicalInquiries_beforeGet` | MedicalInquiries | Block non-admin single-item reads |
| `MedicalInquiries_beforeQuery` | MedicalInquiries | Block non-admin collection queries |

### masterPage.js — Mobile Nav

Hamburger menu uses `.expand()` / `.collapse()` (not `.show()` / `.hide()`) because all four nav elements are `HiddenCollapsedElement` — collapse() reflows the layout correctly.

### Known Limitation: WixFormsV2 Built-in Storage (PDPA)

When `#form2` is submitted, Wix stores ALL field values in its own Forms & Submissions log BEFORE `wixForms_onFormSubmit` fires. This means the sensitive "message/concerns" field is briefly stored in Wix's internal CRM layer. For full PDPA compliance, this form should eventually be replaced with a custom frontend form that submits directly to `bookings.web.js` / `medical-inquiries.web.js`, bypassing WixFormsV2's built-in storage. **Flagged as Priority 5 item.**

---

## [2026-03-31T00:00:00+07:00] — SESSION 01: Phase A Priority 3 — CMS Collections Setup

### Overview

All six collections must be created manually in the Wix Dashboard → Content Manager.
The collection IDs (used in `wix-data` calls) must match **exactly** what is set here.

### Collection Setup — Step by Step

**To create each collection:**

1. Wix Dashboard → Content Manager → + New Collection
2. Set the Collection Name (this becomes the ID — use the exact names below)
3. Add fields using the field types listed
4. Set collection permissions (top-right gear icon → Permissions)
5. Save

---

#### Collection: `Services`

**Permissions:** Read: Anyone | Write: Admin only

| Field Name | Field Key | Type | Notes |
| ---------- | --------- | ---- | ----- |
| Title | `title` | Text | Service display name |
| Description | `desc` | Text | Short description (card copy) |
| Long Description | `longDesc` | Rich Text | Full service detail page copy |
| Category | `category` | Text | e.g. "General", "Specialist", "Pharmacy" |
| Duration | `duration` | Number | Minutes |
| Price | `price` | Number | THB |
| Department ID | `departmentId` | Text | Links to Wix Bookings department |
| Image | `imgUrl` | Image | Service hero image |

---

#### Collection: `Team`

**Permissions:** Read: Anyone | Write: Admin only

| Field Name | Field Key | Type | Notes |
| ---------- | --------- | ---- | ----- |
| Name | `name` | Text | Full name |
| Specialisation | `specialisation` | Text | e.g. "General Practitioner" |
| Role | `role` | Text | e.g. "Doctor", "Nurse", "Pharmacist" |
| Experience | `experience` | Text | e.g. "12 years" |
| Image URL | `imgUrl` | Image | Headshot |
| Bio | `bio` | Rich Text | Optional extended bio |

---

#### Collection: `Testimonials`

**Permissions:** Read: Anyone | Write: Admin only

| Field Name | Field Key | Type | Notes |
| ---------- | --------- | ---- | ----- |
| Patient Name | `patientName` | Text | First name or pseudonym only |
| Rating | `rating` | Number | 1–5 |
| Body | `body` | Text | Testimonial text |
| Date | `date` | Date | Date of testimonial |
| Branch | `branch` | Text | "Chaweng" / "Lamai" / etc. |

---

#### Collection: `Blog`

**Permissions:** Read: Anyone | Write: Admin only

| Field Name | Field Key | Type | Notes |
| ---------- | --------- | ---- | ----- |
| Title | `title` | Text | Article title |
| Body | `body` | Rich Text | Full article content |
| Author | `author` | Text | Author name |
| Publish Date | `publishDate` | Date | |
| Image URL | `imgUrl` | Image | Hero image |
| Tags | `tags` | Tags | Comma-separated topic tags |
| Slug | `slug` | Text | URL slug (auto or custom) |

---

#### Collection: `Bookings`

**Permissions:** Read: Admin only | Write: Anyone (backend only via suppressAuth)

| Field Name | Field Key | Type | Notes |
| ---------- | --------- | ---- | ----- |
| Service | `service` | Text | Service name or Wix Bookings service ID |
| Branch | `branch` | Text | Clinic branch name |
| Date | `date` | Date & Time | Requested appointment date |
| Time | `time` | Text | Time slot string (e.g. "10:00") |
| Full Name | `fullName` | Text | Patient name — non-PHI |
| WhatsApp | `whatsapp` | Text | Contact number — non-PHI |
| Email | `email` | Text | Contact email — non-PHI |
| Type | `type` | Text | "clinic" or "home-visit" |
| Submitted At | `submittedAt` | Date & Time | Auto-set by backend |

---

#### Collection: `MedicalInquiries`

**Permissions:** Read: Admin only | Write: Admin only

> CRITICAL: After creating this collection, set BOTH read and write to Admin only.
> The `suppressAuth: true` flag in `medical-inquiries.web.js` allows server-side writes to bypass this restriction. No frontend code should ever write directly to this collection.

| Field Name | Field Key | Type | Notes |
| ---------- | --------- | ---- | ----- |
| Booking Ref | `bookingRef` | Text | `_id` from Bookings record or Wix submission ID |
| Concerns | `concerns` | Long Text | Patient-reported concerns (PHI) |
| Symptoms | `symptoms` | Long Text | Patient-reported symptoms (PHI) |
| Submitted At | `submittedAt` | Date & Time | Auto-set by backend |

---

### Naming Note: `Blog` → `ClinicBlog`

The planned `Blog` collection ID was changed to `ClinicBlog` to avoid namespace confusion with the native Wix Blog app (which uses `Blog/Posts`, `Blog/Tags`, `Blog/Categories`). All `wixData` calls must use `'ClinicBlog'` as the collection ID.

### Phase A — Priority 3 Checklist

- [x] `Services` collection created — `read=ANYONE`, `write=ADMIN`
- [x] `Team` collection created — `read=ANYONE`, `write=ADMIN`
- [x] `Testimonials` collection created — `read=ANYONE`, `write=ADMIN`
- [x] `ClinicBlog` collection created — `read=ANYONE`, `write=ADMIN` (was planned as `Blog`)
- [x] `Bookings` collection created — `read=ADMIN`, `write=ADMIN`
- [x] `MedicalInquiries` collection created — `read=ADMIN`, `write=ADMIN`
- [x] `events.js:CONTACT_FORM_ID` set to `13d53d66-3595-41af-8e50-ea7b5b54bc5e`
- [x] `.env` created with `WIX_API_KEY` and `WIX_SITE_ID` — excluded from git
- [ ] **MANUAL:** Verify `#form2` field keys in Wix Editor → update `events.js:FIELD_KEYS` if they differ from defaults (`name`, `email`, `phone`, `message`)

---

## [2026-03-31T00:00:00+07:00] — SESSION 01: Phase A Priority 4 — Public Utilities + Page Code

### Priority 4 — Files Created / Updated

| File | Purpose |
| ---- | ------- |
| `src/public/constants.js` | Shared site constants — collections, pages, contact info |
| `src/public/cms.js` | Reusable CMS query helpers for all public collections |
| `src/pages/Home.uru83.js` | CTA button navigation wiring |

### constants.js — Key Values

- `SITE.phone` / `SITE.phoneDisplay`: `+660806696915` / `+66 080-669-6915` (from `healthcare_base/components/layout.tsx`)
- `SITE.whatsapp`: `660806696915` (wa.me format)
- `whatsappLink(message)`: generates `https://wa.me/...?text=...` URL
- `PAGES.bookOnline`: `'/book-online'` — verify slug in Wix Editor → Pages & Menu
- `COLLECTIONS.*`: all 6 collection IDs (including `blog: 'ClinicBlog'`)
- `BRANCHES`: `['Chaweng', 'Lamai', 'Bophut', 'Home Visit']`

**TODO:** Fill in `SITE.email`, `SITE.instagram`, `SITE.facebook` when available.

### cms.js — Available Query Functions

- `getServices({ category, limit })` — Services collection
- `getServiceByTitle(title)` — single service lookup
- `getTeam({ role, limit })` — Team collection
- `getTestimonials({ branch, minRating, limit })` — Testimonials
- `getBlogPosts({ tag, limit })` — ClinicBlog collection
- `getBlogPostBySlug(slug)` — single post lookup

### Home.uru83.js — What Was Wired

- `#button22` onClick → `wixLocation.to('/book-online')` (Wix Bookings page)
- `#button12` onClick → `wixLocation.to(whatsappLink('Hello...'))` (WhatsApp deep link)
- `#serviceListWidget3` (IFrame) — Wix Bookings native, no code needed
- `#sliderGallery1` (IFrame) — Wix native gallery, no code needed
- Static text elements (`#text3`, `#text5`, `#text24`, `#text25`, `#text50–52`) — set in Editor

### Architecture Note: Page Code Scope

The Home page has no dataset-connected elements or repeaters — all content is static (set in the Wix Editor). Velo page code on this page is limited to navigation wiring and event handling. To add dynamic CMS content (e.g. live testimonials slider, featured services grid), new Repeater elements must be added in the Wix Editor and connected to the relevant collections.

### Phase A — Priority 4 Checklist

- [x] `src/public/constants.js` created — SITE, PAGES, COLLECTIONS, whatsappLink
- [x] `src/public/cms.js` created — query helpers for Services, Team, Testimonials, ClinicBlog
- [x] `src/pages/Home.uru83.js` written — button navigation wired
- [ ] **MANUAL:** Verify `/book-online` slug in Wix Editor → Pages & Menu → Book Online page
- [ ] **NEXT PHASE:** Add Repeater elements in Editor for dynamic Services / Testimonials sections, then use `cms.js` to populate them

---

## [2026-03-31T00:00:00+07:00] — SESSION 01: Phase A Priority 5 — Compliance Fixes

### Priority 5 — Files Created / Updated

| File | Change | Flag |
| ---- | ------ | ---- |
| `src/public/pdpa.js` | New — PDPA consent text (EN+TH), `isPrescriptionKeyword()`, pharmacy templates | COMP-01, COMP-02 |
| `src/backend/events.js` | PDPA consent gate + prescription keyword intercept | COMP-01, COMP-02 |
| `src/public/constants.js` | `PHARMACY_WHATSAPP_MESSAGES` added | COMP-02 |
| `healthcare_base/components/booking-section.tsx` | "HIPAA-compliant" → "PDPA-compliant" | COMP-03 |
| `healthcare_base/components/booking-section.tsx` | `dob` field `required` removed; helper text added | COMP-04 |
| `healthcare_base/components/content-sections.tsx` | PEP/PrEP "Order Online" split — OTC modal retained; PEP/PrEP → WhatsApp button | COMP-02 |

### COMP-01 — PDPA Consent Checkbox (partially complete)

The backend consent gate (`REQUIRE_CONSENT` flag in `events.js`) is implemented but **disabled** until the consent checkbox is added to `#form2` in the Wix Editor.

**ACTION REQUIRED to activate:**

1. Wix Editor → Master Page → click `#form2` → Edit Form
2. Add a **Checkbox** field
3. Set field label: *"I consent to Samui Home Clinic processing my personal data per the PDPA (B.E. 2562)."*
4. Set field key to: `pdpa_consent`
5. Mark the field as required
6. In `src/backend/events.js`, set `REQUIRE_CONSENT = true`

Consent notice text in English and Thai is in `src/public/pdpa.js:PDPA_CONSENT_TEXT`.

### COMP-02 — Pharmacy / PEP/PrEP Routing (complete for Phase A)

Three-layer protection:

- `isPrescriptionKeyword()` in `pdpa.js` detects PEP, PrEP, HIV, antiretroviral, and 9 other terms
- `events.js` `wixForms_onFormSubmit`: exits early (no CRM, no MedicalInquiries write) if keyword detected
- `content-sections.tsx` (reference): PEP/PrEP CTA is now a dedicated WhatsApp deep-link button, separate from the OTC "Order Online" modal

**Remaining manual step for Wix:** In the Wix Store, mark PEP/PrEP products as "not available for online purchase" (Out of Stock or hide from store) and add a WhatsApp CTA to their product pages.

### COMP-03 — HIPAA → PDPA (complete)

- `healthcare_base/components/booking-section.tsx` line 676: fixed in reference code
- **MANUAL:** Search for "HIPAA" in the Wix Editor (check all text elements, banners, footer) and replace with "PDPA-compliant" or "Thailand PDPA-compliant"

### COMP-04 — DOB Field Optional (complete in reference)

- `healthcare_base/components/booking-section.tsx`: `required` removed, helper text added:
  *"Required at check-in. Providing in advance speeds up your registration."*
- **MANUAL:** In Wix Bookings → Services → [each service] → Booking Form settings → find Date of Birth field → uncheck "Required"

### Phase A — Priority 5 Checklist

- [x] `src/public/pdpa.js` created — consent text (EN+TH), `isPrescriptionKeyword`, pharmacy templates
- [x] `events.js` updated — `REQUIRE_CONSENT` gate + prescription keyword early-exit (COMP-01, COMP-02)
- [x] `constants.js` updated — `PHARMACY_WHATSAPP_MESSAGES` (COMP-02)
- [x] `booking-section.tsx` — "HIPAA" → "PDPA" (COMP-03)
- [x] `booking-section.tsx` — `dob` optional + helper text (COMP-04)
- [x] `content-sections.tsx` — PEP/PrEP → WhatsApp button (COMP-02)
- [ ] **MANUAL (COMP-01):** Add `pdpa_consent` checkbox to `#form2` in Wix Editor → set `REQUIRE_CONSENT = true`
- [ ] **MANUAL (COMP-02):** Hide PEP/PrEP products from Wix Store online purchase flow
- [ ] **MANUAL (COMP-03):** Replace "HIPAA" with "PDPA-compliant" in Wix Editor text elements
- [ ] **MANUAL (COMP-04):** Uncheck "Required" on DOB field in Wix Bookings → Services → Booking Form
