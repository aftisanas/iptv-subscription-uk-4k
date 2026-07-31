import type { MetadataRoute } from "next";
import { BLOG_POSTS, SITE_URL } from "@/lib/constants";

// Fixed lastmod per static route. Deliberately not `new Date()` — that moved
// every URL's lastmod forward on each rebuild regardless of whether anything
// changed, which trains crawlers to ignore the signal. Bump the relevant
// constant by hand when a route's content actually changes.
const FALLBACK_DATE = new Date("2026-07-31");
const STATIC_ROUTE_DATES: Record<string, string> = {
  "": "2026-07-31",
  "/blog": "2026-07-31",
  "/contact": "2026-07-17",
  "/editorial-policy": "2026-07-31",
  "/terms": "2026-07-17",
  "/privacy": "2026-07-17",
  "/dmca": "2026-07-17",
  "/refund": "2026-07-17",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const parseDateOrFallback = (value: string) => {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? FALLBACK_DATE : parsed;
  };
  const staticDate = (path: string) =>
    parseDateOrFallback(STATIC_ROUTE_DATES[path] ?? "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: staticDate(""), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: staticDate("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: staticDate("/contact"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: staticDate("/editorial-policy"), changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/terms`, lastModified: staticDate("/terms"), changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: staticDate("/privacy"), changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/dmca`, lastModified: staticDate("/dmca"), changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/refund`, lastModified: staticDate("/refund"), changeFrequency: "yearly", priority: 0.4 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.filter((post) =>
    Boolean(post.slug)
  ).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: parseDateOrFallback(post.updated),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
