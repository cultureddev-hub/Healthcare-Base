/**
 * lib/i18n.ts
 * Dictionary loader for the "Empty Vessel" i18n strategy.
 *
 * Dictionaries live in /dictionaries/{locale}.json.
 * They are lazily imported per-request on the server side (Server Components).
 * Client components use useLocale() + getDictionary() or read via props.
 */

import type enDict from '@/dictionaries/en.json';

/** Inferred type of the full UI dictionary (mirrored from en.json shape) */
export type Dictionary = typeof enDict;

export type Locale = 'en' | 'th';

export const locales: Locale[] = ['en', 'th'];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/dictionaries/en.json').then((m) => m.default as Dictionary),
  th: () => import('@/dictionaries/th.json').then((m) => m.default as Dictionary),
};

/**
 * Load the UI dictionary for the given locale.
 * Falls back to English if the locale is not supported.
 *
 * Usage in Server Components / Server Actions:
 *   const dict = await getDictionary(locale);
 *   <p>{dict.nav.bookNow}</p>
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}

/**
 * Resolve a dictionary key that may be empty in the Thai dictionary.
 * Applies the same "Empty Vessel" fallback used for CMS fields:
 * if the Thai value is blank, return the English value.
 *
 * @param thaiValue   - Value from th.json (may be empty string)
 * @param englishValue - Corresponding value from en.json
 */
export function dictFallback(thaiValue: string, englishValue: string): string {
  return thaiValue && thaiValue.trim() !== '' ? thaiValue : englishValue;
}
