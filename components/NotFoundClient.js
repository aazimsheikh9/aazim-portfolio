"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "../lib/gsap";

export default function NotFoundClient() {
  const wrapRef = useRef(null);
  const fourRef = useRef(null);
  const ohRef = useRef(null);
  const fourTwoRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const split = new SplitText(subRef.current, {
        type: "lines",
        linesClass: "reveal-line",
        mask: "lines",
      });

      const digits = [fourRef.current, ohRef.current, fourTwoRef.current];

      gsap.set(digits, { yPercent: reduced ? 0 : 110, opacity: reduced ? 0 : 1 });
      gsap.set(split.lines, { yPercent: reduced ? 0 : 110 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(digits, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.07,
      }).to(
        split.lines,
        {
          yPercent: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
        },
        "-=0.6"
      );

      // gentle hover wobble on the "0"
      if (!reduced && ohRef.current) {
        ohRef.current.addEventListener("mouseenter", () => {
          gsap.fromTo(
            ohRef.current,
            { rotate: 0 },
            {
              rotate: 360,
              duration: 1.2,
              ease: "expo.inOut",
              overwrite: "auto",
            }
          );
        });
      }

      // floating idle drift
      if (!reduced) {
        gsap.to(digits, {
          y: -10,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.3, from: "center" },
        });
      }
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end">
        <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
          <div
            aria-label="404"
            className="font-display text-[28vw] sm:text-[22vw] lg:text-[16vw] leading-[0.85] tracking-tight flex"
          >
            <span className="overflow-hidden inline-block">
              <span ref={fourRef} className="inline-block">
                4
              </span>
            </span>
            <span className="overflow-hidden inline-block">
              <span ref={ohRef} className="inline-block text-fg/60">
                0
              </span>
            </span>
            <span className="overflow-hidden inline-block">
              <span ref={fourTwoRef} className="inline-block">
                4
              </span>
            </span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 order-1 lg:order-2 flex flex-col gap-3 lg:items-end lg:text-right">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted">
            Lost in the routes
          </span>
          <p
            ref={subRef}
            className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.05] max-w-sm"
          >
            This page <span className="text-muted">drifted</span> into the void.
          </p>
        </div>
      </div>
    </div>
  );
}
