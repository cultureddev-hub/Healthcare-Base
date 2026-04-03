import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SITE_STRUCTURED_DATA } from "@/lib/structured-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL("https://samuihomeclinic.com"),
  title: {
    default: "Samui Home Clinic | English-Speaking Doctors in Koh Samui",
    template: "%s | Samui Home Clinic",
  },
  description:
    "English-speaking doctors on Koh Samui for tourists, expats & residents. Walk-in clinic at Chaweng, Bangrak & Rajabhat. Same-day appointments, IV drips, health screening, home visits.",
  keywords: [
    "Koh Samui doctor",
    "English speaking doctor Koh Samui",
    "expat doctor Thailand",
    "clinic Koh Samui",
    "Samui Home Clinic",
    "IV drip Koh Samui",
    "walk in clinic Koh Samui",
    "health screening Koh Samui",
    "doctor home visit Koh Samui",
  ],
  authors: [{ name: "Samui Home Clinic Medical Team" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samuihomeclinic.com",
    siteName: "Samui Home Clinic",
    title: "Samui Home Clinic | English-Speaking Doctors in Koh Samui",
    description:
      "English-speaking doctors on Koh Samui for tourists, expats & residents. Walk-in clinic at Chaweng, Bangrak & Rajabhat. Same-day appointments, IV drips, health screening, home visits.",
    images: [
      {
        url: "/Assets/SHC_Logo.png",
        width: 1200,
        height: 630,
        alt: "Samui Home Clinic — English-Speaking Doctors in Koh Samui",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samui Home Clinic | English-Speaking Doctors in Koh Samui",
    description:
      "English-speaking doctors on Koh Samui for tourists, expats & residents. Walk-in clinic at Chaweng, Bangrak & Rajabhat.",
    images: ["/Assets/SHC_Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body
        className="font-sans antialiased text-[#080708] bg-[#fbfbfb]"
        suppressHydrationWarning
      >
        {/* JSON-LD structured data — MedicalOrganization + FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SITE_STRUCTURED_DATA),
          }}
        />
        {/* Skip-to-main-content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#3eb5bd] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
