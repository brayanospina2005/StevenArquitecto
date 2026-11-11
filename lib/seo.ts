import type { Metadata } from "next";
import { site, serviceNames, type Project } from "@/lib/data";

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

const studioRef = { "@id": `${siteUrl}/#estudio` };

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
        knowsAbout: serviceNames,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+573192820726",
          email: site.email,
          contactType: "customer service",
          areaServed: "CO",
          availableLanguage: ["es"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de diseño, arquitectura y remodelación de interiores",
          itemListElement: serviceNames.map((name) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              provider: studioRef,
              areaServed: { "@type": "City", name: "Bogotá" },
            },
          })),
        },
        sameAs: [site.instagram, site.tiktok],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#sitio`,
        url: siteUrl,
        name: site.name,
        inLanguage: "es-CO",
        description: defaultDescription,
        publisher: studioRef,
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? siteUrl : `${siteUrl}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es-CO",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Diseño, arquitectura y remodelación de interiores",
    description: defaultDescription,
    url: `${siteUrl}/services`,
    provider: studioRef,
    serviceType: serviceNames,
    areaServed: { "@type": "City", name: "Bogotá" },
    inLanguage: "es-CO",
  };
}

export function projectsListJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Proyectos de remodelación de interiores de Bi Arq 1.0",
    inLanguage: "es-CO",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.name} — ${p.typology} en ${p.location}`,
      url: `${siteUrl}/projects/${p.slug}`,
      image: `${siteUrl}${p.cover}`,
    })),
  };
}

export function projectJsonLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: `${p.name} — ${p.typology}`,
        headline: p.name,
        description: p.summary,
        url: `${siteUrl}/projects/${p.slug}`,
        inLanguage: "es-CO",
        image: [p.cover, ...p.gallery].map((src) => `${siteUrl}${src}`),
        creator: studioRef,
        locationCreated: { "@type": "City", name: "Bogotá" },
        about: p.services,
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Proyectos", path: "/projects" },
        { name: p.name, path: `/projects/${p.slug}` },
      ]),
    ],
  };
}

export function webPageJsonLd({ name, description, path, type = "WebPage" }: { name: string; description: string; path: string; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    inLanguage: "es-CO",
    image: `${siteUrl}${ogImage.url}`,
    about: studioRef,
    isPartOf: { "@id": `${siteUrl}/#sitio` },
  };
}
