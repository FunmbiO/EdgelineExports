import type { Metadata } from "next";
import {
  Abril_Fatface,
  Yeseva_One,
  Barlow_Condensed,
  Plus_Jakarta_Sans,
  Rock_Salt,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getTheme } from "@/lib/theme/server";
import { getLocale } from "@/lib/i18n/server";

// Primary display face — bold editorial headlines across the site.
const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril-fatface",
});

// Secondary heading face — page titles and section headers.
const yesevaOne = Yeseva_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yeseva-one",
});

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

// Decorative brush accent — used only for small flourishes, never body
// copy or anything that needs to stay legible small.
const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rock-salt",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edgelineexports.com";
const SITE_DESCRIPTION =
  "Edgeline Exports is an online-only dealership that buys, sells, and sources vehicles across Canada and the United States.";

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
  email: "edgelineexports@gmail.com",
  telephone: "(506) 232-4862",
  areaServed: ["US", "CA"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  const locale = await getLocale();

  return (
    <html lang={locale} className={theme === "dark" ? "dark" : undefined}>
      <body
        className={`${abrilFatface.variable} ${yesevaOne.variable} ${plusJakartaSans.variable} ${barlowCondensed.variable} ${rockSalt.variable} font-body antialiased bg-surface text-surface-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Nav theme={theme} locale={locale} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
