import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sathiyamoorthyk.vercel.app";
  const now = new Date();

  const routes = [
    { url: "/", priority: 1.0 },
    { url: "/about", priority: 0.8 },
    { url: "/services", priority: 0.9 },
    { url: "/portfolio", priority: 0.9 },
    { url: "/blog", priority: 0.8 },
    { url: "/contact", priority: 0.7 },
  ];

  return routes.map(({ url, priority }) => ({
    url: `${baseUrl}${url}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
