import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/navigation/site-header";
import { TopUtilityBar } from "@/components/navigation/top-utility-bar";
import { TopMarquee } from "@/components/home/top-marquee";
import { SiteFooter } from "@/components/navigation/site-footer";
import { JsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zoya-gamma-seven.vercel.app"),
  title: {
    default: "Zoya Fashion — Abayas, Jewelry & Modest Wear, UAE",
    template: "%s — Zoya Fashion",
  },
  description:
    "Contemporary abayas, prayer wear and modest jewelry crafted for the modern UAE woman. Free UAE-wide delivery, Cash on Delivery.",
  openGraph: {
    title: "Zoya Fashion",
    description: "Contemporary abayas, prayer wear and modest jewelry — UAE-wide delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${cormorant.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-alabaster text-ink antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Zoya Fashion",
            description: "Contemporary abayas, prayer wear and modest jewelry crafted for the modern UAE woman.",
            url: "https://zoya-gamma-seven.vercel.app",
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <TopMarquee />
        <TopUtilityBar />
        <SiteHeader />
        <main id="main-content" className="flex-1 pt-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
