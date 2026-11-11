import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contacto",
  description:
    "Cuéntanos tu proyecto. Bi Arq 1.0 en Bogotá: creacionesdeinterioresbiarq@gmail.com y +57 319 282 0726, también por WhatsApp, Instagram y TikTok.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
