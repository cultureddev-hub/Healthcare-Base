/**
 * leads.web.js
 * Wix Velo Web Module — CRM Lead Creation
 *
 * Creates or updates a Wix Contact from non-sensitive booking/inquiry data.
 * Only safe fields are routed here: fullName, email, whatsapp.
 *
 * PDPA compliance boundary: medical fields (concerns, symptoms) are
 * NEVER passed to this function or the Wix Contacts CRM.
 *
 * Frontend import:
 *   import { createLead } from 'backend/leads.web';
 *
 * Backend import (events.js, data.js):
 *   import { _createLead } from 'backend/leads.web';
 */

import { Permissions, webMethod } from 'wix-web-module';
import wixCrmBackend from 'wix-crm-backend';

/**
 * _createLead
 *
 * Internal implementation — callable from other backend files (e.g. events.js)
 * without going through the webMethod permission layer.
 */
export async function _createLead({ fullName, email, whatsapp }) {
  if (!fullName || !email) {
    throw new Error('Missing required lead fields: fullName, email');
  }

  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const contactInfo = {
    name: { first: firstName, last: lastName },
    emails: [{ tag: 'MAIN', email: email.trim().toLowerCase() }],
    phones: whatsapp
      ? [{ tag: 'MOBILE', countryCode: '', phone: whatsapp.trim() }]
      : [],
  };

  const contact = await wixCrmBackend.createContact(contactInfo);
  return { success: true, contactId: contact._id };
}

/**
 * createLead
 *
 * Exposed web method — wraps _createLead with anonymous permission for
 * direct frontend calls from page code.
 *
 * @param {Object} leadData
 * @param {string} leadData.fullName   — Patient full name
 * @param {string} leadData.email      — Patient email address
 * @param {string} leadData.whatsapp   — WhatsApp / phone number
 *
 * @returns {{ success: boolean, contactId: string }}
 */
export const createLead = webMethod(Permissions.Anyone, _createLead);
