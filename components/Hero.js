import Image from "next/image";

// Original hero copy — meta strip, name, sub, the two CTAs and the numbered
// capability strip — in the new theme's night band. The name runs on one line
// so it crosses the body of the portrait and never the face.
export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__photo">
        <Image
          src="/aazim-pic-2-beige.png"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 700px) 94vw, 660px"
        />
      </div>
      <div className="hero__wash" />

      <div className="hero__in shell">
        <div className="hero__meta">
          <span>Portfolio — 2026</span>
          <span>Delhi, IN · Available for select work</span>
        </div>

        <h1 className="hero__name">
          Mohammad Aazim<span>.</span>
        </h1>

        <div className="hero__lower">
          <p className="hero__sub">
            AI Full Stack Developer building fast, accessible web experiences
            and LLM-powered features with Next.js, React, Node.js, and a sharp
            eye for motion.
          </p>

          <div className="hero__cta">
            <a className="btn" href="#work">
              View work
            </a>
            <a
              className="btn btn--ghost"
              href="/Mohammad_Aazim_AI_Full_Stack_Developer_Resume.pdf"
              download
            >
              Resume <span className="glyph">↓</span>
            </a>
          </div>
        </div>

        <div className="hero__strip">
          <span>(01) Next.js · Node.js</span>
          <span>(02) LLM Integration</span>
          <span>(03) i18n · Perf · A11y</span>
          <span>
            <span className="dot" />
            Scroll
          </span>
        </div>
      </div>
    </header>
  );
}
