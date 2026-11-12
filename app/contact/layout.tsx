import { site } from "@/lib/data";
import { breadcrumbJsonLd, pageMeta, webPageJsonLd } from "@/lib/seo";

const description = `Cuéntanos tu proyecto. Bi Arq 1.0 en Bogotá: ${site.email} y +57 319 282 0726, también por WhatsApp, Instagram y TikTok.`;

export const metadata = pageMeta({
  title: "Contacto",
  description,
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: "Contacto | Bi Arq 1.0",
            description,
            path: "/contact",
            type: "ContactPage",
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Contacto", path: "/contact" },
          ])),
        }}
      />
      {children}
    </>
  );
}
