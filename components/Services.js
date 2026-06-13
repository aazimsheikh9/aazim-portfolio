"use client";

import RevealText from "./RevealText";

const services = [
  {
    n: "01",
    title: "Front-End Architecture",
    body: "Next.js App Router builds — routing, data, state, and rendering decisions made on purpose. SSR / SSG / ISR where they earn their keep.",
  },
  {
    n: "02",
    title: "Performance",
    body: "Real Core Web Vitals work — LCP under control, JS budgets respected, fonts and images served the right way per breakpoint.",
  },
  {
    n: "03",
    title: "Internationalization",
    body: "next-i18next, locale-aware routing, RTL-safe layouts, and content shapes that don't break when translators get to them.",
  },
  {
    n: "04",
    title: "REST + Firebase",
    body: "Auth flows, role-based access, REST API integration, and Firestore data models tuned for the access patterns the UI actually uses.",
  },
  {
    n: "05",
    title: "Responsive UI",
    body: "Tailwind-first systems with Material UI where it fits — composable, themable, and accessible by default.",
  },
  {
    n: "06",
    title: "AI-assisted Workflow",
    body: "I ship faster with Claude and friends in the loop — for refactors, scaffolds, and review — without outsourcing the design taste.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-6 sm:px-10 py-24 sm:py-32 lg:py-40 border-t border-line">
      <div className="flex items-baseline justify-between mb-10 sm:mb-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>(What I do)</span>
        <span>Services</span>
      </div>

      <RevealText
        as="h2"
        type="lines"
        className="font-display text-3xl sm:text-5xl lg:text-7xl leading-[1.05] mb-12 sm:mb-20 max-w-4xl tracking-tight"
      >
        Front-end engineering with a designer's pulse.
      </RevealText>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-line">
        {services.map((s) => (
          <div
            key={s.n}
            className="group relative p-6 sm:p-8 border-b border-line md:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 transition-colors hover:bg-white/[0.02]"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              ({s.n})
            </span>
            <h3 className="mt-4 font-display text-2xl sm:text-3xl">
              {s.title}
            </h3>
            <p className="mt-4 text-fg/70 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
