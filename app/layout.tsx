import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css"; // Global styles

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "PrimeFamily Healthcare | Expert Medical Care",
  description: "Your Complete Health Solution, Online and Offline.",
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
