import Reveal from "./Reveal";

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
    <section className="band band--alt" id="experience">
      <div className="shell">
        <div className="srow">
          <span>(Experience)</span>
          <span>2018 — Now</span>
        </div>

        <Reveal as="h2" className="stitle stitle--xl">
          Where I&apos;ve shipped.
        </Reveal>

        <div className="exp__grid">
          <div className="exp__list">
            {work.map((w) => (
              <article className="exp__item" key={w.company}>
                <div className="exp__period">{w.period}</div>
                <div>
                  <h3 className="exp__role">{w.role}</h3>
                  <p className="exp__co">
                    {w.company} — {w.location}
                  </p>
                  <ul className="exp__notes">
                    {w.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <aside className="exp__aside">
            <p className="aside__label">Education</p>
            {education.map((e) => (
              <div key={e.degree}>
                <h4 className="exp__h">{e.degree}</h4>
                <p className="exp__sub">{e.school}</p>
                <p className="exp__period" style={{ marginTop: "8px" }}>
                  {e.period}
                </p>
              </div>
            ))}

            <p className="aside__label" style={{ marginTop: "44px" }}>
              Recognition
            </p>
            <p className="exp__note" style={{ marginTop: 0 }}>
              Letter of Appreciation — Entire Techno Solutions, for leading the
              Next.js 14 migration of internationalschooling.org with measurable
              gains across performance and engagement.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
