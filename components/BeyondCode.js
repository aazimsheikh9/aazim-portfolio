import Image from "next/image";
import Reveal from "./Reveal";

export default function BeyondCode() {
  return (
    <section className="band" id="beyond">
      <div className="shell">
        <div className="srow">
          <span>(Beyond Code)</span>
          <span>The human bit</span>
        </div>

        <Reveal as="h2" className="stitle stitle--wide">
          I build premium cricket gear — from bats and gloves to pads — and the
          digital brand behind it.
        </Reveal>

        {/* The storefront itself, in a browser frame on the brand's green. The
            screenshot is 2.1:1 — wider than the 16:9 card — so framing it and
            letting it bleed off the bottom shows the whole layout instead of
            cropping into the nav. It also says what the copy below claims: the
            digital side is the part he built. */}
        <a
          className="beyond__card rise"
          href="https://ascricketgears.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AS Cricket Gears — visit the site"
        >
          <span className="beyond__frame">
            <span className="beyond__bar">
              <span className="beyond__dot" />
              <span className="beyond__dot" />
              <span className="beyond__dot" />
              <span className="beyond__addr">ascricketgears.vercel.app</span>
            </span>
            <span className="beyond__shot">
              <Image
                src="/as-cricket-site.png"
                alt="The AS Cricket Gears storefront"
                fill
                sizes="(max-width: 1240px) 86vw, 1000px"
              />
            </span>
          </span>
        </a>

        <div className="beyond__foot">
          <div>
            <h3 className="beyond__h">AS Cricket Gears</h3>
            <p className="beyond__p">
              A cricket equipment brand I co-founded — bats, gloves, and pads
              built for club players who want gear that punches above its price.
              I lead the digital side of the brand.
            </p>
          </div>
          <div className="beyond__side">
            <span>Co-founder</span>
            <span>Equipment Brand</span>
            <span>Founded 2024</span>
            <b>
              Visit site <span className="glyph">↗</span>
            </b>
          </div>
        </div>
      </div>
    </section>
  );
}
