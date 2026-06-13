"use client";

import { useEffect, useRef } from "react";
import RevealText from "./RevealText";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function BeyondCode() {
  const ref = useRef(null);
  const cricketRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cricketRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="beyond"
      ref={ref}
      className="relative px-6 sm:px-10 py-24 sm:py-32 lg:py-40 border-t border-line"
    >
      <div className="flex items-baseline justify-between mb-10 sm:mb-14 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>(Beyond Code)</span>
        <span>The human bit</span>
      </div>

      <RevealText
        as="h2"
        type="lines"
        className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mb-14 sm:mb-20 max-w-4xl"
      >
        I also build cricket bats.
      </RevealText>

      <a
        href="https://ascricketgears.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Visit ↗"
        className="group block max-w-5xl"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-gradient-to-br from-emerald-900 via-emerald-700 to-yellow-600">
          <div
            ref={cricketRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="font-display text-7xl sm:text-8xl lg:text-9xl text-white/95 transition-transform duration-700 group-hover:scale-110">
                AS
              </div>
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.35em] text-white/85 mt-3">
                Cricket Gears
              </div>
            </div>
          </div>
          <div className="absolute inset-0 ring-1 ring-white/10" />
          <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
            ascricketgears.vercel.app ↗
          </div>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-display text-3xl sm:text-4xl">
                AS Cricket Gears
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted whitespace-nowrap">
                Co-founder
              </span>
            </div>
            <p className="mt-4 text-fg/70 leading-relaxed max-w-xl">
              A cricket equipment brand I co-founded — bats, gloves, and pads
              built for club players who want gear that punches above its
              price. I lead the digital side of the brand.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:text-right space-y-1">
            <div>Equipment Brand</div>
            <div>Founded 2024</div>
            <div className="text-fg/80">Visit site ↗</div>
          </div>
        </div>
      </a>
    </section>
  );
}
