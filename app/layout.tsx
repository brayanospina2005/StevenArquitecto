import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

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
  title: "Bi ARQ 1.0 | Estudio de arquitectura e interiorismo",
  description: "Casas, hoteles y lugares de trabajo serenos, hechos de luz, proporción y materiales que duran. Conoce el trabajo de Bi ARQ 1.0 y empieza el tuyo.",
  icons: { icon: "/brand/icon.png", apple: "/brand/icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${switzer.variable} ${switzer.className}`}>
      <body>
        <SmoothScroll />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
