export const projects = [
  {
    slug: "international-schooling",
    index: "01",
    title: "International Schooling",
    role: "Front-End Architect",
    year: "2023 — Present",
    summary:
      "Led the migration of a high-traffic education platform from WordPress to Next.js 14 — multilingual, SSR/SSG, role-based auth, zero downtime.",
    stack: ["Next.js 14", "React", "Tailwind", "next-i18next", "Firebase"],
    metrics: [
      { label: "Page performance", value: "+35%" },
      { label: "Engagement", value: "+20%" },
      { label: "Downtime", value: "0" },
    ],
    body: [
      "I led the front-end migration of internationalschooling.org from a slow, plugin-heavy WordPress build to a Next.js 14 App Router architecture. The redesign rebuilt the routing, data, and content layer end-to-end while keeping SEO and content parity intact.",
      "Localization was wired via next-i18next so every page renders in multiple languages with locale-aware routing and metadata. Role-based auth and protected dashboards are powered by Firebase, with REST APIs feeding course, lead, and admin views.",
      "Hydration was tuned for Core Web Vitals — large media is responsive, fonts are streamed via next/font, and interactivity is gated behind the fold so LCP stayed lean even as the design grew more expressive.",
    ],
    live: "https://internationalschooling.org",
  },
  {
    slug: "timezone-converter",
    index: "02",
    title: "Timezone Converter",
    role: "Full-stack",
    year: "2024",
    summary:
      "Real-time internal team tool to align meetings and handoffs across global timezones.",
    stack: ["Next.js", "Firebase Firestore", "Tailwind"],
    metrics: [
      { label: "Cities supported", value: "200+" },
      { label: "Sync latency", value: "<200ms" },
    ],
    body: [
      "An internal tool that lets a globally distributed team pick a moment in any city and instantly see it across every collaborator's local timezone. Built as a focused, single-purpose utility — minimal chrome, fast input, persistent presets.",
      "State syncs live through Firestore so a planner editing a meeting reflects to everyone else in real time without a refresh.",
    ],
  },
  {
    slug: "tinyurl",
    index: "03",
    title: "TinyURL System",
    role: "Full-stack",
    year: "2024",
    summary:
      "A URL shortener with authentication, custom slugs, and click analytics.",
    stack: ["Node.js", "Firebase Auth", "Firestore"],
    metrics: [
      { label: "Avg redirect", value: "<80ms" },
      { label: "Auth provider", value: "Firebase" },
    ],
    body: [
      "Personal project to explore link shortening end-to-end. Users sign in, mint short links with optional custom slugs, and see click counts and referrer breakdowns per link.",
      "Designed the schema so reads stay flat and fast — the hot path is a single Firestore lookup followed by a 302.",
    ],
  },
  {
    slug: "student-management",
    index: "04",
    title: "Student Management Modules",
    role: "Software Developer Intern",
    year: "2022",
    summary:
      "CRUD modules, validations, and SQL-backed reporting for a student records system.",
    stack: ["JavaScript", "jQuery", "SQL"],
    metrics: [
      { label: "Tables", value: "15+" },
      { label: "Reports", value: "Live SQL" },
    ],
    body: [
      "Built the student records side of an internal admin tool during my internship at Ackrolix — CRUD with validation, paginated tables, and SQL-driven reports for the operations team.",
      "It was where I first learned to think about real users editing real data: forgiving validation, undo paths, and reports that load even on a slow VPN.",
    ],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
