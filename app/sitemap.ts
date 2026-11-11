import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { ogImage, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-11");
  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1, images: [`${siteUrl}${ogImage.url}`] },
    { url: `${siteUrl}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8, images: projects.map((p) => `${siteUrl}${p.cover}`) },
    { url: `${siteUrl}/studio`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [p.cover, ...p.gallery.slice(0, 3)].map((src) => `${siteUrl}${src}`),
  }));
  return [...pages, ...projectPages];
}
