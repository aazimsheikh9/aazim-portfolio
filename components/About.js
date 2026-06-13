"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import RevealText from "./RevealText";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function About() {
  const ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: 0 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 sm:px-10 py-24 sm:py-32 lg:py-40 border-t border-line"
    >
      <div className="flex items-baseline justify-between mb-10 sm:mb-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>(About)</span>
        <span>—</span>
        <span>4+ Years</span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          <RevealText
            as="h2"
            type="lines"
            className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
          >
            I build the part of the web people actually feel — interfaces that
            load fast, read clearly, and move with intent.
          </RevealText>

          <div className="flex flex-col gap-5 text-fg/75 text-base sm:text-lg max-w-xl leading-relaxed">
            <RevealText as="p" type="lines">
              Four+ years shipping front-ends with Next.js, React, and JavaScript.
              I led the migration of internationalschooling.org from WordPress
              to Next.js 14 with zero downtime, lifted page performance by 35%
              and engagement by 20%, and earned a Letter of Appreciation from
              management for the rollout.
            </RevealText>
            <RevealText as="p" type="lines">
              I care a lot about pacing and rhythm — type that breathes, motion
              that has reason, and an accessibility floor that never drops.
              Most of my recent work lives at the intersection of editorial
              design and real product engineering.
            </RevealText>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <div
              ref={imgRef}
              className="absolute inset-x-0 top-0 h-[118%] will-change-transform"
            >
              <Image
                src="/aazim-pic-2-beige.png"
                alt="Mohammad Aazim"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_top]"
                priority={false}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <div>
              <div className="text-fg/50">Based</div>
              <div className="text-fg mt-1">Delhi, India</div>
            </div>
            <div>
              <div className="text-fg/50">Focus</div>
              <div className="text-fg mt-1">Next.js · Motion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
