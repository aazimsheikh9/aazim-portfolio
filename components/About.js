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
          I build the part of the web people actually feel — and the AI
          underneath it that makes the product smarter.
        </Reveal>

        <div className="about__grid">
          <div className="about__copy">
            <Reveal>
              Four+ years shipping full-stack products with Next.js, React,
              Node.js, and REST/GraphQL APIs. I led the migration of
              internationalschooling.org from WordPress to Next.js 14 with zero
              downtime, lifted page performance by 35% and engagement by 20%,
              and earned a Letter of Appreciation from management for the
              rollout.
            </Reveal>
            <Reveal>
              More recently I&apos;ve been building the AI layer on top — LLM-powered
              course recommendations and class summarization shipped straight
              into the student onboarding and revision flows. I care about
              pacing and rhythm as much as I care about correct state — type
              that breathes, motion that has reason, and an accessibility floor
              that never drops.
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
                <dd>Next.js · LLM Integration</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
