/**
 * middleware.ts
 * Next.js Edge Middleware — Locale-based subpath routing
 *
 * Strategy: "Empty Vessel" i18n — routes /en and /th.
 * Default locale is English. Any path without a locale prefix
 * is permanently redirected (308) to /en/<path>.
 *
 * Supported locales: en, th
 * Default locale:    en
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const locales = ['en', 'th'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

function hasLocalePrefix(pathname: string): boolean {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through: Next.js internals, static assets, API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/Assets') ||
    /\.(ico|png|jpg|jpeg|svg|webp|gif|css|js|json|txt|xml|woff|woff2|ttf|otf|map)$/.test(
      pathname
    )
  ) {
    return NextResponse.next();
  }

  // Already localised — pass through
  if (hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }

  // Redirect bare path to default locale (308 Permanent for SEO)
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, { status: 308 });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|Assets).*)'],
};
