import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "../../../lib/projects";
import Reveal from "../../../components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `/work/${slug}`,
    },
  };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    author: { "@type": "Person", name: "Mohammad Aazim" },
    keywords: project.stack.join(", "),
    datePublished: project.year,
    ...(project.live ? { url: project.live } : {}),
  };

  return (
    <main className="subpage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="shell">
        <Link href="/#work" className="back">
          <span aria-hidden="true" className="glyph">
            ←
          </span>{" "}
          Back to work
        </Link>

        <header className="cs__head">
          <div>
            <p className="cs__kicker">
              ({project.index}) — {project.year}
            </p>
            <h1 className="cs__t">{project.title}</h1>
          </div>
          <div>
            <p className="aside__label">Role</p>
            <p className="cs__role">{project.role}</p>
          </div>
        </header>

        <div className="cs__grid">
          <div className="cs__body">
            {project.body.map((p, i) => (
              <Reveal key={i}>{p}</Reveal>
            ))}

            {project.live ? (
              <a
                className="btn"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live site{" "}
                <span aria-hidden="true" className="glyph">
                  ↗
                </span>
              </a>
            ) : (
              <p className="cs__kicker">
                Internal / case study only — code on request.
              </p>
            )}
          </div>

          <aside>
            <p className="aside__label">Stack</p>
            <ul className="chips">
              {project.stack.map((s) => (
                <li className="chip" key={s}>
                  {s}
                </li>
              ))}
            </ul>

            <p className="aside__label cs__gap">Results</p>
            <ul className="metrics">
              {project.metrics.map((m) => (
                <li key={m.label}>
                  <span>{m.label}</span>
                  <span>{m.value}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="cs__next">
          <div className="srow">
            <span>(Up next)</span>
            <span>More of the work</span>
          </div>

          {/* Same row treatment as the Work section, so the two read as one
              list rather than two different components. */}
          <div className="wlist">
            {others.map((p) => (
              <Link className="wrow" href={`/work/${p.slug}`} key={p.slug}>
                <span className="wrow__n">({p.index})</span>
                <h3 className="wrow__h">{p.title}</h3>
                <p className="wrow__stack">{p.stack.slice(0, 3).join(" · ")}</p>
                <p className="wrow__yr">{p.year}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
