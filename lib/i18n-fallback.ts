/**
 * lib/i18n-fallback.ts
 * The Fallback Engine — "Empty Vessel / Graceful Fallback" strategy.
 *
 * RULE: When locale is 'th', attempt to render the _th variant of a CMS field.
 *       If _th is null, undefined, or empty string → fall back to the base
 *       English field. The site NEVER renders blank cards while translations
 *       are pending with the clinical team.
 *
 * USAGE (in any component):
 *   import { localise } from '@/lib/i18n-fallback';
 *   const displayTitle = localise(serviceItem, 'title', locale);
 */

export type Locale = 'en' | 'th';

/**
 * Core fallback resolver.
 *
 * @param item   - Any object containing CMS fields (and optional _th variants)
 * @param field  - Base field name, e.g. 'title', 'description', 'policy'
 * @param locale - Active locale from the router
 * @returns      The localised string, or the English fallback if Thai is absent
 *
 * @example
 *   localise(service, 'title', 'th')
 *   // → service.title_th  if non-empty
 *   // → service.title     otherwise
 */
export function localise<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: Locale
): string {
  if (locale === 'th') {
    const thKey = `${field}_th` as keyof T;
    const thValue = item[thKey];
    if (typeof thValue === 'string' && thValue.trim() !== '') {
      return thValue;
    }
  }
  const baseValue = item[field as keyof T];
  return typeof baseValue === 'string' ? baseValue : '';
}

/**
 * Resolve `title` / `title_th` with graceful fallback.
 */
export function localiseTitle<T extends Record<string, unknown>>(
  item: T,
  locale: Locale
): string {
  return localise(item, 'title', locale);
}

/**
 * Resolve `description` / `description_th` with graceful fallback.
 */
export function localiseDescription<T extends Record<string, unknown>>(
  item: T,
  locale: Locale
): string {
  return localise(item, 'description', locale);
}

/**
 * Resolve `desc` / `desc_th` with graceful fallback.
 * (Used by the frontend SERVICES_DATA array which uses `desc` not `description`)
 */
export function localiseDesc<T extends Record<string, unknown>>(
  item: T,
  locale: Locale
): string {
  return localise(item, 'desc', locale);
}

/**
 * Resolve `longDesc` / `longDesc_th` with graceful fallback.
 */
export function localiseLongDesc<T extends Record<string, unknown>>(
  item: T,
  locale: Locale
): string {
  return localise(item, 'longDesc', locale);
}

/**
 * Resolve `policy` / `policy_th` with graceful fallback.
 * (Medical policy text — requires certified clinical translator)
 */
export function localisePolicy<T extends Record<string, unknown>>(
  item: T,
  locale: Locale
): string {
  return localise(item, 'policy', locale);
}

/**
 * Resolve `excerpt` / `excerpt_th` with graceful fallback.
 */
export function localiseExcerpt<T extends Record<string, unknown>>(
  item: T,
  locale: Locale
): string {
  return localise(item, 'excerpt', locale);
}

/**
 * Resolve `body` / `body_th` with graceful fallback.
 * (Medical blog body — requires certified clinical translator)
 */
export function localiseBody<T extends Record<string, unknown>>(
  item: T,
  locale: Locale
): string {
  return localise(item, 'body', locale);
}
