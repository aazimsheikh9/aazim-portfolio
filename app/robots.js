export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://aazim.dev/sitemap.xml",
    host: "https://aazim.dev",
  };
}
