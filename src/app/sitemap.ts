import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const BASE_URL = "https://spectrify.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryEntries = ["subsidy", "application", "saving"].map((cat) => ({
    url: `${BASE_URL}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticEntries = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return [...staticEntries, ...categoryEntries, ...postEntries];
}
