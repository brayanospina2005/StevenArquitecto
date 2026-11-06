import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Bi ARQ 1.0 | Estudio de arquitectura e interiorismo",
  description: "Casas, hoteles y lugares de trabajo serenos, hechos de luz, proporción y materiales que duran. Conoce el trabajo de Bi ARQ 1.0 y empieza el tuyo.",
  icons: { icon: "/datum/FYlF1OrzLlLFqu2uAFsmnhS86g4.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
