import type { MetadataRoute } from "next";
import { defaultDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bi Arq 1.0 — Diseño, arquitectura y remodelación en Bogotá",
    short_name: "Bi Arq 1.0",
    description: defaultDescription,
    lang: "es-CO",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#eeeae3",
    theme_color: "#2b1f18",
    icons: [
      {
        src: "/brand/icon.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
