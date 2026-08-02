import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="band" id="about">
      <div className="shell">
        <div className="srow">
          <span>(About)</span>
          <span>—</span>
          <span>4+ Years</span>
        </div>

        <Reveal as="h2" className="stitle stitle--wide">
          I build the part of the web people actually feel — interfaces that
          load fast, read clearly, and move with intent.
        </Reveal>

        <div className="about__grid">
          <div className="about__copy">
            <Reveal>
              Four+ years shipping front-ends with Next.js, React, and
              JavaScript. I led the migration of internationalschooling.org from
              WordPress to Next.js 14 with zero downtime, lifted page
              performance by 35% and engagement by 20%, and earned a Letter of
              Appreciation from management for the rollout.
            </Reveal>
            <Reveal>
              I care a lot about pacing and rhythm — type that breathes, motion
              that has reason, and an accessibility floor that never drops. Most
              of my recent work lives at the intersection of editorial design
              and real product engineering.
            </Reveal>
          </div>

          <div>
            <div className="about__img rise">
              {/* Square source (640×640). In the 4:5 desktop box it crops at
                  the sides; in the 16:10 mobile box it crops top and bottom,
                  which is why the Y bias sits at 20% — it keeps his head in
                  frame there. */}
              <Image
                src="/aazim-about.jpg"
                alt="Mohammad Aazim"
                fill
                sizes="(max-width: 860px) 100vw, 40vw"
              />
            </div>
            <dl className="about__meta">
              <div>
                <dt>Based</dt>
                <dd>Delhi, India</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Next.js · Motion</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
