import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "../../../lib/projects";
import RevealText from "../../../components/RevealText";
import MagneticButton from "../../../components/MagneticButton";

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

  const others = projects.filter((p) => p.slug !== slug).slice(0, 2);

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
    <main className="relative px-6 sm:px-10 pt-28 sm:pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/#work"
        data-cursor="Back"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-fg transition-colors"
      >
        <span aria-hidden>←</span> Back to work
      </Link>

      <header className="mt-12 sm:mt-16 grid grid-cols-12 gap-6 items-end border-b border-line pb-10 sm:pb-12">
        <div className="col-span-12 lg:col-span-9">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-5 sm:mb-6">
            ({project.index}) — {project.year}
          </div>
          <RevealText
            as="h1"
            type="lines"
            className="font-display text-[14vw] sm:text-6xl lg:text-[8vw] leading-[0.95] tracking-tight"
          >
            {project.title}
          </RevealText>
        </div>
        <div className="col-span-12 lg:col-span-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted space-y-1">
          <div className="text-fg/50">Role</div>
          <div className="text-fg">{project.role}</div>
        </div>
      </header>

      <section className="mt-12 sm:mt-16 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 space-y-5 text-fg/80 text-base sm:text-lg leading-relaxed">
          {project.body.map((p, i) => (
            <RevealText key={i} as="p" type="lines">
              {p}
            </RevealText>
          ))}
          {project.live && (
            <div className="pt-4">
              <MagneticButton
                as="a"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                data-cursor="Visit ↗"
              >
                Visit live site ↗
              </MagneticButton>
            </div>
          )}
          {!project.live && (
            <p className="pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Internal / case study only — code on request.
            </p>
          )}
        </div>

        <aside className="col-span-12 lg:col-span-5 lg:pl-8 space-y-10">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
              Stack
            </div>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
              Results
            </div>
            <ul className="border-t border-line">
              {project.metrics.map((m) => (
                <li
                  key={m.label}
                  className="flex items-baseline justify-between border-b border-line py-4"
                >
                  <span className="text-fg/70">{m.label}</span>
                  <span className="font-display text-2xl">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="mt-24 sm:mt-32 border-t border-line pt-10 sm:pt-12">
        <div className="flex items-baseline justify-between mb-8 sm:mb-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <span>(Up next)</span>
          <Link href="/#work" className="hover:text-fg">
            All work →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              data-cursor="View →"
              className="group block border border-line p-5 sm:p-6 hover:bg-white/[0.03] transition-colors"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                ({p.index})
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl">
                {p.title}
              </h3>
              <p className="mt-3 text-fg/70 text-sm leading-relaxed">
                {p.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
