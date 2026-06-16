"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const rootRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const metaRef = useRef(null);
  const portraitRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(headlineRef.current, {
        type: "lines",
        linesClass: "reveal-line",
        mask: "lines",
      });
      const subSplit = new SplitText(subRef.current, {
        type: "lines",
        linesClass: "reveal-line",
        mask: "lines",
      });

      gsap.set([...split.lines, ...subSplit.lines], {
        yPercent: reduced ? 0 : 110,
      });
      gsap.set(metaRef.current.children, {
        y: reduced ? 0 : 20,
        opacity: 0,
      });
      gsap.set(ctaRef.current.children, {
        y: reduced ? 0 : 20,
        opacity: 0,
      });
      gsap.set(portraitRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      const delay = sessionStorage.getItem("aazim:intro") ? 0.1 : 2.6;

      const tl = gsap.timeline({ delay });
      tl.to(split.lines, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
      })
        .to(
          subSplit.lines,
          {
            yPercent: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.06,
          },
          "-=0.7"
        )
        .to(
          portraitRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "expo.out",
          },
          "-=0.9"
        )
        .to(
          ctaRef.current.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.08,
          },
          "-=0.7"
        )
        .to(
          metaRef.current.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "expo.out",
            stagger: 0.06,
          },
          "-=0.5"
        );

      gsap.to(portraitRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] flex flex-col justify-between px-6 sm:px-10 pb-10 sm:pb-14 pt-28 sm:pt-32"
    >
      {/* Top meta strip */}
      <div className="grid grid-cols-2 items-start gap-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70 mb-10">
        <span>Portfolio — 2026</span>
        <span className="text-right">
          Delhi, IN · Available for select work
        </span>
      </div>

      {/* Main block */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end">
          <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
            <h1
              ref={headlineRef}
              className="font-display text-[18vw] sm:text-[14vw] lg:text-[11vw] leading-[0.88] tracking-tight"
            >
              Mohammad
              <br />
              Aazim<span className="text-muted">.</span>
            </h1>
          </div>

          <div
            ref={portraitRef}
            className="col-span-12 sm:col-span-6 lg:col-span-4 order-1 lg:order-2 lg:mb-2 mb-2 sm:mb-0"
          >
            <div className="relative aspect-[4/5] w-full max-w-none sm:max-w-[280px] lg:max-w-none mx-auto sm:ml-auto overflow-hidden rounded-sm">
              <Image
                src="/Firefly.jpg"
                alt="Portrait of Mohammad Aazim"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 280px, 28vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Sub headline + CTAs */}
        <div className="mt-8 sm:mt-12 grid grid-cols-12 gap-6 items-end">
          <p
            ref={subRef}
            className="col-span-12 md:col-span-7 text-base sm:text-lg lg:text-xl text-fg/80 leading-snug max-w-xl"
          >
            Front-End Web Developer building fast, expressive, accessible web
            experiences with Next.js, React, and a sharp eye for motion.
          </p>

          <div
            ref={ctaRef}
            className="col-span-12 md:col-span-5 flex flex-wrap gap-3 md:justify-end"
          >
            <MagneticButton
              as="a"
              href="/#work"
              variant="outline"
              data-cursor="View work"
            >
              View work
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/Mohammad_Aazim_Resume_2026_1.pdf"
              download
              variant="ghost"
              data-cursor="Download"
            >
              Resume ↓
            </MagneticButton>
          </div>
        </div>

        {/* Bottom meta row */}
        <div
          ref={metaRef}
          className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted border-t border-line pt-6"
        >
          <span>(01) Next.js · React</span>
          <span>(02) Tailwind · GSAP</span>
          <span className="hidden sm:block">(03) i18n · Perf · A11y</span>
          <span className="flex items-center gap-2 text-fg/90 justify-end">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
