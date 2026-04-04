'use client';

import { usePathname, useRouter } from 'next/navigation';

type Variant = 'navbar' | 'footer';

interface LanguageToggleProps {
  variant?: Variant;
}

const LOCALES = ['en', 'th'] as const;

/**
 * LanguageToggle
 *
 * Switches between /en and /th locale prefixes while preserving
 * the user's current page path. Rendered in both the sticky Navbar
 * and the Footer.
 *
 * variant="navbar"  → pill-style toggle (light background)
 * variant="footer"  → minimal text toggle (dark background)
 */
export function LanguageToggle({ variant = 'navbar' }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith('/th') ? 'th' : 'en';

  const switchLocale = (locale: string) => {
    // Replace the leading /en or /th segment, preserve everything after
    const newPath = pathname.replace(/^\/(en|th)(\/|$)/, `/${locale}$2`);
    router.push(newPath);
  };

  if (variant === 'footer') {
    return (
      <div className="flex items-center gap-2" aria-label="Language selection">
        {LOCALES.map((locale, i) => (
          <span key={locale} className="flex items-center gap-2">
            <button
              onClick={() => switchLocale(locale)}
              aria-current={currentLocale === locale ? 'true' : undefined}
              className={`text-sm font-semibold transition-colors ${
                currentLocale === locale
                  ? 'text-[#3eb5bd]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {locale.toUpperCase()}
            </button>
            {i < LOCALES.length - 1 && (
              <span className="text-slate-600 text-sm select-none" aria-hidden="true">
                |
              </span>
            )}
          </span>
        ))}
      </div>
    );
  }

  // navbar variant — pill toggle
  return (
    <div
      className="flex items-center gap-0.5 bg-slate-100 rounded-full p-0.5"
      aria-label="Language selection"
    >
      {LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          aria-current={currentLocale === locale ? 'true' : undefined}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3eb5bd] focus-visible:ring-offset-1 ${
            currentLocale === locale
              ? 'bg-white text-[#3eb5bd] shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
