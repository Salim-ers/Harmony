import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { body, display } from "@/lib/fonts";
import { Providers } from "@/components/motion/Providers";
import { ViewCursor } from "@/components/motion/ViewCursor";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Harmony Solutions | Création de sites internet, applications et SaaS dans l’Oise",
    template: "%s | Harmony Solutions",
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title: "Harmony Solutions | Sites, applications et SaaS sur mesure",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmony Solutions | Sites, applications et SaaS sur mesure",
    description: site.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#07182E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organisation`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  email: site.email,
  telephone: site.phoneHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: "Hauts-de-France",
    addressCountry: site.address.country,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Oise" },
    { "@type": "Country", name: "France" },
  ],
  knowsAbout: [
    "Création de site internet",
    "Création de site e-commerce",
    "Développement d’application web",
    "Création de SaaS",
    "Création de CRM",
    "Référencement naturel (SEO)",
  ],
  ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les animations d’apparition uniquement si JS est disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main id="contenu">{children}</main>
          <Footer />
          <ViewCursor />
          <RevealObserver />
        </Providers>
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
