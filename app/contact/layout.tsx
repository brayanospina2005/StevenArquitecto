import { breadcrumbJsonLd, pageMeta, webPageJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contacto",
  description:
    "Cuéntanos tu proyecto. Bi Arq 1.0 en Bogotá: creacionesdeinterioresbiarq@gmail.com y +57 319 282 0726, también por WhatsApp, Instagram y TikTok.",
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
            description:
              "Cuéntanos tu proyecto. Bi Arq 1.0 en Bogotá: creacionesdeinterioresbiarq@gmail.com y +57 319 282 0726, también por WhatsApp, Instagram y TikTok.",
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
