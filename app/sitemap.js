import { projects } from "../lib/projects";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function sitemap() {
  const now = new Date().toISOString();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    })),
  ];
}
