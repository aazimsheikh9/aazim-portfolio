// Generates /robots.txt at build time. Three jobs:
//   1. Tell crawlers what's open (everything except /api).
//   2. Point them at the sitemap so they don't have to discover it.
//   3. Declare canonical host so mirrors / preview domains aren't preferred.
//
// We disallow /api/ because route handlers shouldn't be crawled — they're
// JSON endpoints, not pages. /work/* and other UI routes stay allowed.

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
