import Link from "next/link";
import { projects } from "../lib/projects";
import Reveal from "./Reveal";

// Project rows, as on the original — not cards. Each row links to its case
// study at /work/[slug].
export default function Work() {
  return (
    <section className="band band--alt" id="work">
      <div className="shell">
        <div className="srow">
          <span>(Selected Work)</span>
          <span>2022 — 2026</span>
        </div>

        <Reveal as="h2" className="stitle stitle--xl">
          A short list of things I&apos;m proud of.
        </Reveal>

        <div className="wlist">
          {projects.map((p) => (
            <Link className="wrow" href={`/work/${p.slug}`} key={p.slug}>
              <span className="wrow__n">({p.index})</span>
              <h3 className="wrow__h">{p.title}</h3>
              <p className="wrow__stack">{p.stack.slice(0, 3).join(" · ")}</p>
              <p className="wrow__yr">{p.year}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
