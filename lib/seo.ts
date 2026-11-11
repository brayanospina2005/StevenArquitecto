import type { Metadata } from "next";
import { site } from "@/lib/data";

export const siteUrl = "https://stevenarquitecto.vercel.app";

export const defaultDescription =
  "Bi Arq 1.0 diseña y remodela interiores en Bogotá. Cocinas, baños, salas, habitaciones y apartamentos con materiales de alta calidad.";

export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Casa de cal y travertino con cubierta plana y un olivo al atardecer, imagen principal de Bi Arq 1.0",
};

export type ShareImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export function pageMeta({
  title,
  description,
  path,
  image = ogImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: ShareImage;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "InteriorDesigner",
        "@id": `${siteUrl}/#estudio`,
        name: site.name,
        slogan: site.tagline,
        description: site.history,
        url: siteUrl,
        image: `${siteUrl}${ogImage.url}`,
        logo: `${siteUrl}/brand/icon.png`,
        telephone: "+573192820726",
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bogotá",
          addressCountry: "CO",
        },
        areaServed: { "@type": "City", name: "Bogotá" },
        sameAs: [site.instagram, site.tiktok],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#sitio`,
        url: siteUrl,
        name: site.name,
        inLanguage: "es-CO",
        description: defaultDescription,
        publisher: { "@id": `${siteUrl}/#estudio` },
      },
    ],
  };
}
