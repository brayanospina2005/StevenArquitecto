import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import { site } from "@/lib/data";
import { defaultDescription, jsonLd, ogImage, siteUrl } from "@/lib/seo";

const switzer = localFont({
  src: [
    { path: "../fonts/switzer-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-switzer",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bi Arq 1.0 | Diseño, arquitectura y remodelación en Bogotá",
    template: "%s | Bi Arq 1.0",
  },
  description: defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "Diseño de interiores",
  keywords: [
    "Bi Arq 1.0",
    "diseño de interiores Bogotá",
    "remodelación de apartamentos",
    "remodelación de casas",
    "diseño de cocinas",
    "diseño de baños",
    "iluminación arquitectónica",
    "renderizado 3D",
  ],
  alternates: {
    canonical: "/",
    languages: { "es-CO": "/", "x-default": "/" },
  },
  other: {
    "geo.region": "CO-DC",
    "geo.placename": "Bogotá, Colombia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: site.name,
    title: "Bi Arq 1.0 | Diseño, arquitectura y remodelación en Bogotá",
    description: defaultDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bi Arq 1.0 | Diseño, arquitectura y remodelación en Bogotá",
    description: defaultDescription,
    images: [ogImage.url],
  },
  icons: { icon: "/brand/icon.png", apple: "/brand/icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${switzer.variable} ${switzer.className}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
        <SmoothScroll />
        <SiteNav />
        <main><PageTransition>{children}</PageTransition></main>
        <SiteFooter />
      </body>
    </html>
  );
}
