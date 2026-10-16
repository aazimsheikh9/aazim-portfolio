// Web App Manifest — served at /manifest.webmanifest. Lets the site be
// installable as a PWA and gives Android/Chrome the correct theme + icons
// for "Add to Home Screen".

export default function manifest() {
  return {
    name: "Mohammad Aazim — AI Full Stack Developer",
    short_name: "Aazim",
    description:
      "Editorial portfolio of Mohammad Aazim — AI Full Stack Developer (Next.js · Node.js · LLM Integration).",
    start_url: "/",
    display: "standalone",
    background_color: "#14100F",
    theme_color: "#14100F",
    orientation: "portrait",
    categories: ["portfolio", "design", "developer"],
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
