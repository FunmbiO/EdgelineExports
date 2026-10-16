import type { Metadata } from "next";
import {
  Bebas_Neue,
  Barlow_Condensed,
  Plus_Jakarta_Sans,
  Fraunces,
  Permanent_Marker,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

// Stand-in for the licensed "Know" font — clean, modern, versatile sans
// serif, used for body copy. Replaced Barlow in that role.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
});

// Stand-in for the licensed "Salty Ages" font — bold retro serif, used
// sparingly for showcase headlines (not a blanket display-font swap).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
});

// Stand-in for the licensed "Lust" font — handwritten brush accent, used
// only for small decorative flourishes, never body copy or nav/labels.
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edgelineexports.com";
const SITE_DESCRIPTION =
  "Edgeline Exports is an online-only dealership that buys, sells, and sources vehicles nationwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Edgeline Exports | Driven by Value",
    template: "%s | Edgeline Exports",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Edgeline Exports",
    title: "Edgeline Exports | Driven by Value",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Edgeline Exports | Driven by Value",
    description: SITE_DESCRIPTION,
  },
};

// Mirrors exactly what's already shown in the footer — structured data
// should never say more than the visible page does.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Edgeline Exports",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "hello@edgelineexports.com",
  telephone: "(555) 010-9200",
  areaServed: "US",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${plusJakartaSans.variable} ${barlowCondensed.variable} ${fraunces.variable} ${permanentMarker.variable} font-body antialiased bg-edgeline-white text-edgeline-black`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
