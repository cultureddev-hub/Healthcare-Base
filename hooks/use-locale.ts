'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n-fallback';

/**
 * useLocale
 *
 * Extract the active locale from the current URL pathname.
 * Reads the /[locale] segment injected by the App Router + middleware.ts.
 *
 * Returns 'th' only when the path explicitly starts with /th.
 * All other paths (including /en and any edge cases) return 'en'.
 *
 * Usage in client components:
 *   const locale = useLocale();
 *   const displayTitle = localise(item, 'title', locale);
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  return pathname.startsWith('/th') ? 'th' : 'en';
}
