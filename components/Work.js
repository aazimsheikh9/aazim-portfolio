"use client";

import Link from "next/link";
import { projects } from "../lib/projects";
import RevealText from "./RevealText";

function ProjectRow({ project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View →"
      className="group relative block border-b border-line py-6 sm:py-8"
    >
      <div className="grid grid-cols-12 gap-3 sm:gap-4 items-baseline">
        <span className="col-span-2 sm:col-span-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted pt-2">
          ({project.index})
        </span>
        <h3 className="col-span-10 sm:col-span-6 font-display text-2xl sm:text-4xl lg:text-5xl leading-none transition-transform duration-500 group-hover:-translate-x-2">
          {project.title}
        </h3>
        <div className="col-span-12 sm:col-span-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted">
          {project.stack.slice(0, 3).join(" · ")}
        </div>
        <div className="col-span-12 sm:col-span-2 text-left sm:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-fg/70 transition-opacity group-hover:opacity-100 sm:group-hover:opacity-70">
          {project.year}
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative px-6 sm:px-10 py-24 sm:py-32 lg:py-40 border-t border-line"
    >
      <div className="flex items-baseline justify-between mb-10 sm:mb-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>(Selected Work)</span>
        <span>2022 — 2026</span>
      </div>

      <RevealText
        as="h2"
        type="lines"
        className="font-display text-[12vw] sm:text-6xl lg:text-[6.5vw] leading-[0.95] mb-12 sm:mb-16 max-w-5xl tracking-tight"
      >
        A short list of things I&apos;m proud of.
      </RevealText>

      <div className="border-t border-line">
        {projects.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
