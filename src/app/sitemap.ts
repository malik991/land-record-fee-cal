import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL
    ? `${process.env.NEXTAUTH_URL}`
    : "https://landtaxshare.com/";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}Inheritance`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}signup`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}signin`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
