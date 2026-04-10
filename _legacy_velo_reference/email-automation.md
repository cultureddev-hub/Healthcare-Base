# Email Confirmation — Wix Triggered Email Setup

**Type:** Wix Dashboard Automation (no code required)
**Trigger:** New item created in `Bookings` CMS collection
**Action:** Send booking confirmation email to the patient

---

## Setup Steps

### 1. Open Wix Dashboard → Automations

`Wix Dashboard → Automations → + New Automation`

### 2. Configure the Trigger

| Field | Value |
|-------|-------|
| Trigger type | "Database item created" |
| Collection | `Bookings` |

### 3. Configure the Action

| Field | Value |
|-------|-------|
| Action type | "Send an email via Triggered Email" |
| Send to | Dynamic field: `{email}` (from the Bookings record) |
| Reply-to | `info@samuihomeclinic.com` |

### 4. Create the Email Template

In **Wix Dashboard → Email → Triggered Emails**, create a new template with these dynamic fields:

| Template Variable | Source Field | Example Value |
|-------------------|-------------|---------------|
| `{fullName}` | `fullName` | Dr. John Smith |
| `{service}` | `service` | Doctor Appointment |
| `{date}` | `date` | 15 April 2026 |
| `{time}` | `time` | 10:30 |
| `{branch}` | `branch` | Chaweng |

**Suggested subject line:**
```
Your appointment at Samui Home Clinic is confirmed
```

**Suggested body:**

```
Dear {fullName},

Thank you for booking with Samui Home Clinic.

Your appointment details:
  Service : {service}
  Date    : {date}
  Time    : {time}
  Branch  : {branch}

Please arrive 10 minutes before your appointment time.
If you need to cancel or reschedule, contact us at least 2 hours in advance:
  WhatsApp : +66 92-278-1988
  Email    : info@samuihomeclinic.com

We look forward to seeing you.

Samui Home Clinic Team
```

### 5. Test the Automation

1. Save and activate the automation.
2. Manually insert a test item into the `Bookings` collection via the Wix Content Manager.
3. Verify the confirmation email arrives at the test email address.
4. Check the email renders correctly on mobile.

---

## Notes

- The automation fires on every insert, including test inserts from Content Manager.
- If the patient email field is empty, Wix will skip sending rather than erroring.
- The `date` and `time` fields are stored as a Wix Date and plain text respectively — the template will display them in the format Wix applies to Date fields (typically `DD/MM/YYYY`). If a different format is needed, use a Velo automation (see below).

---

## Future Enhancement: Velo-based Automation (optional)

If richer email formatting or bilingual templates are needed, replace this automation with a Velo backend function:

```javascript
// backend/bookings-email.jsw
import { triggeredEmails } from 'wix-crm-backend';

export async function sendBookingConfirmation(bookingItem) {
  await triggeredEmails.emailContact('BOOKING_CONFIRMED', bookingItem.contactId, {
    variables: {
      fullName: bookingItem.fullName,
      service: bookingItem.service,
      date: new Date(bookingItem.date).toLocaleDateString('en-GB'),
      time: bookingItem.time,
      branch: bookingItem.branch,
    }
  });
}
```

This approach requires the Bookings record to include a `contactId` field (already present in the schema).
