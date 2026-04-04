/**
 * app/[locale]/layout.tsx
 * Locale-segment layout — validates the locale param and injects
 * hreflang alternates into the page metadata.
 *
 * HTML structure: this layout renders only its children — the <html>
 * and <body> tags live in the root app/layout.tsx to satisfy Next.js
 * App Router constraints. The html[lang] attribute will be wired
 * dynamically once Thai content is live (TODO: Phase C).
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const locales = ['en', 'th'] as const;
export type Locale = (typeof locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://samuihomeclinic.com';

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        th: `${baseUrl}/th`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}
