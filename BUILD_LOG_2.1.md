# BUILD_LOG_2.1.md — Samui Home Clinic (SHC) Headless Build

## SOURCE OF TRUTH — Wix Headless Architecture (Next.js 15 + Vercel + Wix SDK)
### Format: Reverse-chronological. New entries go at the TOP.

---

## [2026-04-04T00:00:00+07:00] — SESSION 2.3: Samui Home Pharmacy Launch + CMS Architecture + i18n Deep Audit

### Session Mandate
Deploy the full Samui Home Pharmacy asynchronous e-commerce engine. Finalise CMS data architecture (TAGS field types for staff UX). Conduct exhaustive i18n extraction. Generate Wix-native translation CSVs. Build a Node.js translation importer. Wire the Teams section to Wix CMS dynamically.

---

### Part 1 — Wix Velo Backend Deployment (Manual Steps Completed)

The following files were manually deployed to the live Wix Editor by the client during this session:

**`backend/data.js` (APPENDED — existing PHI hooks preserved):**
Added `PharmacyOrders_afterUpdate` data hook that fires on the `Pending_Review → Approved_Awaiting_Payment` status transition. On trigger: calls `generatePaymentLink(orderId)` from `omise-stub.jsw`, writes the resulting URL back to `PharmacyOrders.Omise_Payment_Link` via `wixData.update()`, and logs the full WhatsApp handoff payload.

**`backend/omise-stub.jsw` (NEW file):**
Wix Web Module that reads `OMISE_SECRET_KEY` from Wix Secrets Manager. In stub mode (key = `sk_test_placeholder`), returns `https://mock.omise.co/pay/{orderId}`. Full Omise Charge Links API scaffolded as a TODO block for when the Omise account is provisioned.

**Wix Secrets Manager:**
Secret `OMISE_SECRET_KEY` added with value `sk_test_placeholder`. Ready to swap for a live key.

**Pre-existing bug fixed during deployment:**
`public/pdpa.js` line 31 contained a curly-quote apostrophe (`'`) inside a single-quoted string. Wix Velo parser rejected it. Character removed. Build status changed from `Error → Success`.

**Reference copies (local, read-only):**
- `_legacy_velo_reference/pharmacy-orders.events.js`
- `_legacy_velo_reference/omise-stub.jsw`

---

### Part 2 — Vercel Build Fix

**Error:** `Type error: Layout "app/[locale]/layout.tsx" does not match the required types of a Next.js Layout. "locales" is not a valid Layout export field.`

**Root cause:** `export const locales` and `export type Locale` were named exports in a Next.js layout file. Next.js 15 reserves all named exports in layout files for framework use (`generateStaticParams`, `generateMetadata`, `default`). Any unrecognised named export causes a type error at build time.

**Fix:** `export const` → `const`, `export type` → `type`. Both now unexported, scoped to file only. No downstream consumers.

**File:** `app/[locale]/layout.tsx`
**Commit:** `ef152c3`

---

### Part 3 — CMS Field Type Migration (Wix MCP API)

**Motivation:** Staff were required to type Status and Category values freehand in the Wix Content Manager — error-prone and poor UX. Changed to `ARRAY_STRING` (TAGS) type so staff click to select values as chips.

**Method:** `POST https://www.wixapis.com/wix-data/v2/collections/update-field` via Wix MCP server connection. Note: standard PATCH with field-mask is broken for type changes in the current Wix Data API — `update-field` endpoint was the correct route.

| Collection | Field | Old Type | New Type | Allowed Values |
|------------|-------|----------|----------|----------------|
| `PharmacyOrders` | `Status` | TEXT | ARRAY_STRING (TAGS) | `Pending_Review`, `Approved_Awaiting_Payment`, `Paid`, `Dispatched` |
| `PharmacyInventory` | `Category` | TEXT | ARRAY_STRING (TAGS) | `OTC`, `Rx` |
| `Services` | `category` | TEXT | ARRAY_STRING (TAGS) | `General`, `IV Therapy`, `Aesthetic`, `Dental`, `Emergency`, `Pharmacy` |

**Downstream TypeScript changes required by TAGS → string[] type:**

| Interface | Field | Old Type | New Type |
|-----------|-------|----------|----------|
| `PharmacyOrder` | `Status` | `PharmacyOrderStatus` | `PharmacyOrderStatus \| PharmacyOrderStatus[]` |
| `PharmacyProduct` | `Category` | `'OTC' \| 'Rx' \| string` | `string[]` |
| `WixService` | `category` | `string` | `string[]` |
| `WixTeamMember` | `Category_Tag` | (new field) | `string[]` |

**Downstream SDK query changes:**
- `getServices()` in `app/actions/cms.ts`: `.eq('category', category)` → `.hasSome('category', [category])`
- `getTeam()` in `app/actions/cms.ts`: `.eq('role', role)` → `.hasSome('Category_Tag', [categoryTag])`

**Downstream frontend changes (array-safe rendering):**
- `components/pharmacy/product-card.tsx`: `product.Category` → `Array.isArray ? Category[0] : Category` for display; same for `addItem()` call
- `components/content-sections.tsx` Pharmacy section: `products.map(p => p.Category)` → `products.flatMap(p => Array.isArray ? p.Category : [p.Category])` for category list; filter uses `.includes()` not `===`
- `components/services-section.tsx` Team modal: `member.Category_Tag` rendered with `[0]` guard; filter uses `.includes(roleFilter)`

**Velo reference file updated:**
`_legacy_velo_reference/pharmacy-orders.events.js` — `item.Status` and `previousItem.Status` now read via `Array.isArray(x) ? x[0] : x` to handle the TAGS array type safely.

---

### Part 4 — Pharmacy UX Fixes

| Fix | File | Change |
|-----|------|--------|
| CartFAB hidden behind catalogue modal | `components/pharmacy/cart-fab.tsx:30` | `z-40` → `z-60` (modal uses `z-50`; FAB must sit above it) |
| Dispatch copy — missing islands | `components/pharmacy/patient-fulfillment-form.tsx` | `"...on Koh Samui."` → `"...on Koh Samui, Koh Phangan or Koh Tao."` |

---

### Part 5 — Date Field Fix (All CMS Collections)

**Problem:** All date/datetime fields were being passed as ISO 8601 strings via `.toISOString()`. Wix CMS `Date and Time` fields expect a JavaScript `Date` object from the SDK. Passing a string caused a yellow type-mismatch warning in the Wix Content Manager on every record.

**Fix:** Replaced `.toISOString()` with bare `new Date()` calls in all three server actions that write to date fields.

| File | Line(s) | Change |
|------|---------|--------|
| `app/actions/pharmacy-orders.ts` | 64 | `new Date().toISOString()` → `new Date()` |
| `app/actions/bookings.ts` | 56 | `new Date(date).toISOString()` → `new Date(date)` |
| `app/actions/bookings.ts` | 62 | `new Date().toISOString()` → `new Date()` |
| `app/actions/medical-inquiries.ts` | 99 | `new Date().toISOString()` → `new Date()` |
| `app/actions/medical-inquiries.ts` | 100 | `new Date().toISOString()` → `new Date()` |

> **Exception:** `cartWithMeta.submittedAt` (line 54, `pharmacy-orders.ts`) is inside `JSON.stringify()` destined for a TEXT field — left as `.toISOString()` intentionally.

---

### Part 6 — Teams CMS Dynamic Integration

**Previous state:** `Team` component used 8 hardcoded team members. `getTeam()` existed in `cms.ts` but was never called.

**New state:** `app/[locale]/page.tsx` calls `getTeam()` server-side and passes the result as `members` prop to `<Team>`. If the Wix `Team` CMS collection is empty, the component falls back to the hardcoded array (graceful degradation during CMS population period).

**`WixTeamMember` interface updated** (`lib/types/cms.ts`):

```typescript
interface WixTeamMember {
  name: string;
  role: string;          // Specialty e.g. "General Practitioner"
  role_th?: string;      // Thai localised specialty
  Category_Tag: string[]; // TAGS field: ["Doctor"] | ["Nurse"] | ["Pharmacist"]
  bio?: string;
  bio_th?: string;
  image?: string;
  experience?: string;   // e.g. "15+ Years"
  experience_th?: string;
  branch?: string;
  qualifications?: string[];
  order?: number;
}
```

**`PharmacyProduct` interface updated** (`lib/types/cms.ts`):
Added `Item_Name_th?: string` and `Description_th?: string` for Thai localisation.

**Rendering changes** (`components/services-section.tsx`):
- Featured doctors grid: uses `doc.image` (not `doc.img`), `doc.role` (not `doc.spec`), experience badge conditionally rendered, initials fallback when no image
- Modal team grid: same field mapping + `Category_Tag[0]` for role chip display
- Filter logic: `Category_Tag.includes(roleFilter)` instead of `member.role === roleFilter`

**Files modified:**
- `lib/types/cms.ts` — interface updates
- `app/actions/cms.ts` — `getTeam()` param renamed `categoryTag`, uses `.hasSome()`
- `app/[locale]/page.tsx` — imports `getTeam`, fetches server-side, passes to `<Team>`
- `components/services-section.tsx` — `FALLBACK_TEAM` constant, `Team({ members })` prop, array-safe rendering

---

### Part 7 — Wix-Native Translation CSVs

Two CSV files generated at `/Users/asadkhan/Desktop/Cultured./Antigravity/Healthcare_SHC/data/` with headers matching **exact Wix CMS collection field keys** for native Dashboard import.

**`cms_translations_team.csv`**
Headers: `_id, name, role, role_th, Category_Tag, bio, bio_th, experience, experience_th, image`
Content: 8 seed rows matching the hardcoded fallback team. All `_th` columns blank for translator. `_id` blank — Wix auto-generates on import. `image` blank — admin uploads via Content Manager.

**`cms_translations_pharmacy.csv`**
Headers: `_id, Item_Name, Item_Name_th, Price, Category, Requires_Prescription, Description, Description_th`
Content: 8 products from previous sprint. `Price` is a bare integer — no ฿ symbol (Wix Number fields reject non-numeric characters). All `_th` columns blank for translator.

**Import instructions:** Wix Dashboard → Content Manager → select collection → `Import` button → upload CSV.

---

### Part 8 — Deep i18n Audit & en.json Expansion

**Previous state:** `en.json` covered `nav`, `footer`, `common`, `blog`, `language`, `pharmacy` — approximately 72 keys. All other sections (Hero, About, HowItWorks, Insurance, Team, FAQ, Testimonials) had 100% hardcoded English text in JSX.

**New state:** `en.json` expanded to 213 keys across 13 key groups.

**New key groups added:**

| Group | Keys | Source Component | Notes |
|-------|------|-----------------|-------|
| `hero` | 35 | `hero-section.tsx` | Includes modal titles, placeholders, rotating words, operating hours, stat badges |
| `about` | 30 | `content-sections.tsx` | Includes all modal content (story, why-choose-us cards, branch descriptions) |
| `howItWorks` | 9 | `content-sections.tsx` | 3 steps with title + desc each |
| `insurance` | 3 | `content-sections.tsx` | Badge, heading, description |
| `team` | 10 | `services-section.tsx` | Filter buttons, search placeholder, empty state, view-all link |
| `testimonials` | 3 | `social-proof.tsx` | Badge, heading, subtext |
| `faq` | 10 | `social-proof.tsx` | Badge, heading, 4 Q&A pairs as flat keys (q1/a1…q4/a4) |
| `blog` | 9 (restructured) | `social-proof.tsx` | Added badge, heading, category filter labels, noResults string |

**Key naming convention enforced:** No bracket-notation keys (e.g. `bullets[4]`) anywhere in the dictionary. All repeated items use flat named keys (`bullet1`, `step2Title`, `q3`, `a3`). This guarantees the dot-notation splitter in the importer script produces clean nested JSON with no array/string type ambiguity.

**`dictionaries/th.json`** updated to mirror all 213 keys as empty strings (full translation skeleton).

**`data/ui_translations.csv`** regenerated — 213 rows, headers: `UI_Key, English_Text, Thai_Translation_Here`. Three pre-populated rows: `language.en=EN`, `language.th=TH`, `language.label=ภาษา` (non-translatable / confirmed Thai).

---

### Part 9 — Translation Importer Script

**File:** `scripts/import-translations.js`

**Dependency added:** `papaparse ^5.5.3` — RFC 4180-compliant CSV parser. Required because long-form UI strings (e.g. FAQ answers, About body text) contain internal commas inside quoted fields. A naive `split(',')` would corrupt these values. `papaparse` handles all quoting edge cases correctly.

**Script logic:**
1. Reads `data/ui_translations.csv` (path relative to `scripts/`)
2. Parses with `Papa.parse(content, { header: true, skipEmptyLines: true })`
3. Loads `dictionaries/en.json` as the structural skeleton (ensures `th.json` always has the same key structure as `en.json`)
4. For each CSV row where `Thai_Translation_Here` is non-empty: calls `setNested(obj, dotKey, value)` — a local helper that splits dot-notation keys into nested JSON paths
5. Writes the result to `dictionaries/th.json` (full overwrite, idempotent)
6. Prints completion summary: total keys, translated count, empty count, percentage

**`package.json` additions:**
- Script: `"import-translations": "node scripts/import-translations.js"`
- Dependency: `"papaparse": "^5.5.3"`

**Usage:** After the translator returns the filled CSV → `npm run import-translations` → `th.json` is regenerated. Safe to run repeatedly as translations are filled in incrementally.

---

### Architectural Decisions Made This Session

#### AD-08: TAGS Fields for Constrained CMS Values
**Decision:** Wix CMS fields with a fixed set of allowed values (`Status`, `Category`, `category`, `Category_Tag`) changed from TEXT to ARRAY_STRING (TAGS) type.

**Rationale:** TEXT fields require staff to type values freehand, which causes data inconsistency (e.g. `pending_review` vs `Pending_Review`). TAGS fields render as a chip-selector UI in the Content Manager — click to select, no typing required. This is critical for `Status` because the Velo data hook fires only on an exact string match.

**Important caveat:** Wix's ARRAY_STRING field does not support predefined/constrained values at the API schema level. Allowed values are documented in each field's `description` property. Staff are responsible for selecting correct values from the documented list.

**Side effect:** All TypeScript interfaces, SDK queries, and frontend rendering logic updated to treat these fields as `string[]` rather than `string`. The Velo hook updated to read `Status[0]` via `Array.isArray` guard.

---

#### AD-09: Teams CMS — Graceful Degradation Pattern
**Decision:** The `Team` component accepts an optional `members?: WixTeamMember[]` prop. When the array is empty (CMS collection not yet populated), it falls back to `FALLBACK_TEAM` — the hardcoded array that was previously inline.

**Rationale:** The Wix `Team` CMS collection will be populated gradually as the client uploads real team photos and fills Thai translations. A hard dependency on CMS data would cause the team section to render empty during this transition. The fallback ensures the section always shows meaningful content. Staff are informed via the CSV that the hardcoded data is the seed dataset.

---

#### AD-10: Flat Key Naming in Translation Dictionaries
**Decision:** No bracket-notation array keys (e.g. `about.bullets[4]`) in `en.json` or `th.json`. All logically list-like items use flat named keys (`about.bullet1`, `howItWorks.step2Title`, `faq.q3`, `faq.a3`).

**Rationale:** The translation importer script uses a dot-notation splitter (`key.split('.')`) to build nested JSON. Bracket notation would produce a literal key string (e.g. `"bullets[4]"`) rather than a JSON array, causing `.map()` calls on the frontend to crash with `Cannot read properties of string`. Flat named keys are unambiguous, produce clean nested JSON, and require the JSX to read each key individually — which is correct for translated content where each value may differ significantly in length between languages.

---

### Files Modified This Session

| File | Change Type | Summary |
|------|-------------|---------|
| `app/[locale]/layout.tsx` | Fix | Removed invalid `export const locales` and `export type Locale` — Next.js 15 rejects unrecognised named exports from layout files |
| `app/[locale]/page.tsx` | Update | Imports and calls `getTeam()` server-side; passes `teamMembers` as prop to `<Team>` |
| `app/actions/cms.ts` | Update | `getTeam()` renamed param to `categoryTag`, uses `.hasSome('Category_Tag', [categoryTag])`; `getServices()` uses `.hasSome('category', [category])` |
| `app/actions/pharmacy-orders.ts` | Fix | `Submitted_At: new Date().toISOString()` → `new Date()` |
| `app/actions/bookings.ts` | Fix | `date` and `submittedAt` fields pass `Date` objects, not ISO strings |
| `app/actions/medical-inquiries.ts` | Fix | `pdpaConsentTimestamp` and `submittedAt` pass `Date` objects, not ISO strings |
| `lib/types/cms.ts` | Update | `WixTeamMember`: added `Category_Tag: string[]`, `role_th`, `experience`, `experience_th`; `PharmacyProduct`: `Category: string[]`, `Item_Name_th`, `Description_th`; `PharmacyOrder.Status`: union with `string[]`; `WixService.category`: `string[]` |
| `components/pharmacy/cart-fab.tsx` | Fix | `z-40` → `z-60` |
| `components/pharmacy/patient-fulfillment-form.tsx` | Fix | Dispatch copy updated to include Koh Phangan and Koh Tao |
| `components/pharmacy/product-card.tsx` | Fix | `Category` display and `addItem()` call updated for `string[]` array type |
| `components/content-sections.tsx` | Fix | Pharmacy category list uses `flatMap`; filter uses `.includes()` |
| `components/services-section.tsx` | Update | `FALLBACK_TEAM` constant; `Team({ members })` prop; CMS field names (`role`, `image`, `experience`); array-safe `Category_Tag` rendering and filtering |
| `_legacy_velo_reference/pharmacy-orders.events.js` | Update | `Status` reads use `Array.isArray(x) ? x[0] : x` guard for TAGS array compatibility |
| `dictionaries/en.json` | Update | Expanded from 72 to 213 keys across 13 groups |
| `dictionaries/th.json` | Update | Full skeleton rebuilt to match all 213 en.json keys |
| `scripts/import-translations.js` | **New** | Node.js CSV → th.json importer using papaparse |
| `package.json` | Update | Added `papaparse ^5.5.3` dependency; added `import-translations` script |

---

### Files Created Outside `healthcare_base/` (Data Assets)

| File | Location | Purpose |
|------|----------|---------|
| `cms_translations_team.csv` | `data/` | Wix-native import CSV for Team collection — 8 seed rows, all `_th` columns blank |
| `cms_translations_pharmacy.csv` | `data/` | Wix-native import CSV for PharmacyInventory — 8 products, bare Price numbers |
| `ui_translations.csv` | `data/` | Complete 213-key UI translation file — English populated, Thai blank |

---

### CMS Collection Schema (Updated — Session 2.3)

**`PharmacyOrders` collection:**

| Field | Type Change | Notes |
|-------|-------------|-------|
| `Status` | TEXT → ARRAY_STRING (TAGS) | Values: `Pending_Review`, `Approved_Awaiting_Payment`, `Paid`, `Dispatched` |

**`PharmacyInventory` collection:**

| Field | Type Change | Notes |
|-------|-------------|-------|
| `Category` | TEXT → ARRAY_STRING (TAGS) | Values: `OTC`, `Rx` |

**`Services` collection:**

| Field | Type Change | Notes |
|-------|-------------|-------|
| `category` | TEXT → ARRAY_STRING (TAGS) | Values: `General`, `IV Therapy`, `Aesthetic`, `Dental`, `Emergency`, `Pharmacy` |

**`Team` collection (schema required for CMS population):**

| Field | Type | Notes |
|-------|------|-------|
| `name` | Text | Staff member full name |
| `role` | Text | Specialty (e.g. "General Practitioner") |
| `role_th` | Text | Thai localised specialty |
| `Category_Tag` | ARRAY_STRING (TAGS) | `Doctor`, `Pharmacist`, or `Nurse` |
| `bio` | Text (Long) | English biography |
| `bio_th` | Text (Long) | Thai localised biography |
| `experience` | Text | e.g. "15+ Years" |
| `experience_th` | Text | Thai localised experience string |
| `image` | Image / Media | Staff photo |

---

### Wix Velo Files Deployed (Manual — Session 2.3)

| File | Action | Notes |
|------|--------|-------|
| `backend/data.js` | APPENDED | `PharmacyOrders_afterUpdate` hook added to bottom of file. Existing Bookings PHI hooks untouched. |
| `backend/omise-stub.jsw` | CREATED | New Wix Web Module. Reads `OMISE_SECRET_KEY` from Secrets Manager. |
| Wix Secrets Manager | Updated | `OMISE_SECRET_KEY = sk_test_placeholder` added |

> **Action Required (future):** When Omise account is provisioned, replace `OMISE_SECRET_KEY` value in Wix Secrets Manager with the live `sk_live_...` key. The stub auto-activates real Omise mode when the key changes. Uncomment the production code block in `omise-stub.jsw`.

---

### Commits This Session

| Commit | Hash | Summary |
|--------|------|---------|
| Layout named export fix | `ef152c3` | Fix invalid named exports from locale layout |
| Full pharmacy + i18n + CMS session | `9bca906` | Teams CMS, TAGS fields, i18n audit, CSVs, importer script |

---

### Known Limitations & Phase 3 Backlog (Updated)

| Item | Priority | Notes |
|------|----------|-------|
| Live slot availability | Medium | Hardcoded 9 AM–6 PM / 15-min slots. Phase 3: replace with `bookings.listTimeslots()` from `@wix/bookings`. |
| CRM deduplication | Low | `allowDuplicates: true` creates new CRM contact per booking. Phase 3: use `appendOrCreateContact()`. |
| Full Privacy Policy page | Medium | PDPA B.E. 2562 requires published privacy policy. Referenced in consent checkbox but page does not exist. |
| Email confirmation | Medium | No transactional email on booking. Phase 3: Wix Triggered Email or Resend.com. |
| Booking status webhook | Low | `status: 'pending'` never updated. Phase 3: Wix automation or webhook for `confirmed`/`cancelled`. |
| Wix Media Manager upload (Rx prescriptions) | Low | Prescription file upload stores filename only in `Cart_Payload`. Actual file upload via Wix Media Manager deferred. Admin follows up via WhatsApp. |
| Thai translations | Pending client | `th.json` skeleton complete (213 keys). `ui_translations.csv` sent to translator. Run `npm run import-translations` when returned. |
| Team CMS population | Pending client | `cms_translations_team.csv` ready for import. Admin must upload staff photos via Wix Content Manager after import. |
| Pharmacy CMS population | Pending client | `cms_translations_pharmacy.csv` ready for import. Thai product names/descriptions to be filled by translator. |

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
