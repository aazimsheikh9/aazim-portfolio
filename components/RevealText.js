"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";

export default function RevealText({
  as: Tag = "p",
  children,
  className,
  type = "lines",
  delay = 0,
  stagger = 0.08,
  start = "top 85%",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let split;
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type,
        linesClass: "reveal-line",
        wordsClass: "reveal-word",
        mask: type.includes("lines") ? "lines" : undefined,
      });

      const targets =
        type.includes("lines")
          ? split.lines
          : type.includes("words")
            ? split.words
            : split.chars;

      gsap.set(targets, { yPercent: reduced ? 0 : 110, opacity: reduced ? 0 : 1 });

      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: reduced ? 0.001 : 1.0,
        ease: "expo.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    }, el);

    return () => {
      try {
        split?.revert();
      } catch {}
      ctx.revert();
    };
  }, [type, delay, stagger, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
