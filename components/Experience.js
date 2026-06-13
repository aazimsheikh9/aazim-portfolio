"use client";

import RevealText from "./RevealText";

const work = [
  {
    role: "Web Developer",
    company: "Entire Techno Solutions Pvt. Ltd.",
    location: "Delhi",
    period: "Jun 2022 — Present",
    notes: [
      "Led WordPress → Next.js 14 migration of internationalschooling.org with zero downtime.",
      "+35% page performance, +20% engagement post-launch.",
      "Built role-based auth, multilingual routing, and REST integrations.",
      "Letter of Appreciation from management.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Ackrolix Innovations",
    location: "Remote",
    period: "Mar 2022 — May 2022",
    notes: [
      "Built student management modules in jQuery / JavaScript backed by SQL.",
      "Validations, CRUD flows, and live reporting for the operations team.",
    ],
  },
];

const education = [
  {
    degree: "B.Tech, Electronics & Communication",
    school: "Meerut Institute of Engineering & Technology (MIET)",
    period: "2018 — 2022",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 sm:px-10 py-24 sm:py-32 lg:py-40 border-t border-line">
      <div className="flex items-baseline justify-between mb-10 sm:mb-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>(Experience)</span>
        <span>2018 — Now</span>
      </div>

      <RevealText
        as="h2"
        type="lines"
        className="font-display text-3xl sm:text-5xl lg:text-7xl leading-[1.05] mb-12 sm:mb-20 max-w-3xl tracking-tight"
      >
        Where I've shipped.
      </RevealText>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 border-t border-line">
          {work.map((w) => (
            <article
              key={w.company}
              className="grid grid-cols-12 gap-4 py-8 border-b border-line"
            >
              <div className="col-span-12 sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {w.period}
              </div>
              <div className="col-span-12 sm:col-span-9">
                <h3 className="font-display text-2xl sm:text-3xl">{w.role}</h3>
                <p className="mt-1 text-fg/70 font-mono text-xs uppercase tracking-[0.15em]">
                  {w.company} — {w.location}
                </p>
                <ul className="mt-4 space-y-2 text-fg/75 text-sm leading-relaxed">
                  {w.notes.map((n) => (
                    <li key={n} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-fg/40" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <aside className="col-span-12 lg:col-span-4 lg:pl-8 lg:border-l border-line">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-6">
            Education
          </div>
          {education.map((e) => (
            <div key={e.degree} className="mb-6">
              <h4 className="font-display text-xl">{e.degree}</h4>
              <p className="mt-1 text-fg/70 text-sm">{e.school}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {e.period}
              </p>
            </div>
          ))}

          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4 mt-12">
            Recognition
          </div>
          <p className="text-fg/75 text-sm leading-relaxed">
            Letter of Appreciation — Entire Techno Solutions, for leading the
            Next.js 14 migration of internationalschooling.org with measurable
            gains across performance and engagement.
          </p>
        </aside>
      </div>
    </section>
  );
}
