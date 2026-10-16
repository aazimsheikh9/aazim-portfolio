import Image from "next/image";
import Reveal from "./Reveal";

// The original six services, numbered as they were. This is the theme's dark
// break, with the portrait drifting behind it (see ScrollFX).
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
    title: "Full Stack + APIs",
    body: "Node.js services, REST and GraphQL APIs, role-based auth, and Firestore/SQL data models tuned for the access patterns the UI actually uses.",
  },
  {
    n: "05",
    title: "LLM / Generative AI Integration",
    body: "LLM-powered features shipped into real product flows — recommendation engines, content summarization, prompt engineering tuned for consistent, structured output.",
  },
  {
    n: "06",
    title: "Responsive UI",
    body: "Tailwind-first systems with Material UI where it fits — composable, themable, and accessible by default.",
  },
  {
    n: "07",
    title: "AI-assisted Workflow",
    body: "I ship faster with Claude and friends in the loop — for refactors, scaffolds, and review — without outsourcing the design taste.",
  },
];

export default function Services() {
  return (
    <section className="band band--night svc" id="services">
      <div className="svc__photo" data-parallax>
        <Image
          src="/aazim-pic-2-beige.png"
          alt=""
          fill
          sizes="(max-width: 640px) 130vw, 760px"
        />
      </div>
      <div className="svc__wash" />

      <div className="shell">
        <div className="srow">
          <span>(What I do)</span>
          <span>Services</span>
        </div>

        <Reveal as="h2" className="stitle stitle--xl">
          Full stack engineering with an AI edge and a designer&apos;s pulse.
        </Reveal>

        <div className="svc__grid">
          {services.map((s) => (
            <article className="svc__cell" key={s.n}>
              <p className="svc__n">({s.n})</p>
              <h3 className="svc__h">{s.title}</h3>
              <p className="svc__p">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
