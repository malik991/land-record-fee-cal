import { getAllPosts } from "@/lib/mdx";
import type { MetadataRoute } from "next";
import fs from "fs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL
    ? `${process.env.NEXTAUTH_URL}`
    : "https://landtaxshare.com/";
  const posts = getAllPosts();

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}blog`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}Inheritance`,
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: `${baseUrl}signup`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}signin`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];

  const blogPosts = posts.map((post) => {
    const fileDate = post.filePath
      ? fs.statSync(post.filePath).mtime
      : new Date();

    return {
      url: `${baseUrl}blog/${post.slug}`,
      lastModified: fileDate,
      priority: 0.7,
    };
  });

  return [...staticPages, ...blogPosts];
}
