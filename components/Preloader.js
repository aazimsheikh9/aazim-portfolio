"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

export default function Preloader() {
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const wordRef = useRef(null);
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("aazim:intro");
  });

  useEffect(() => {
    if (!show) return;

    const lenis = window.__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        lenis?.start();
        sessionStorage.setItem("aazim:intro", "1");
        setShow(false);
      },
    });

    tl.set(rootRef.current, { autoAlpha: 1 })
      .from(wordRef.current, {
        yPercent: 110,
        duration: 0.9,
        ease: "expo.out",
      })
      .to(
        counter,
        {
          value: 100,
          duration: 2.4,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.floor(counter.value)
              ).padStart(3, "0");
            }
          },
        },
        "<+0.1"
      )
      .to(
        wordRef.current,
        { yPercent: -110, duration: 0.7, ease: "expo.in" },
        "-=0.2"
      )
      .to(
        counterRef.current,
        { yPercent: -110, duration: 0.7, ease: "expo.in" },
        "<"
      )
      .to(
        rootRef.current,
        {
          yPercent: -100,
          duration: 1.05,
          ease: "expo.inOut",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] bg-bg flex items-end justify-between px-6 pb-6 sm:px-10 sm:pb-10 invisible"
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        {/* Decorative — using a span, not <h2>, so it doesn't pollute the
            document outline that crawlers read. */}
        <span
          ref={wordRef}
          className="font-display text-[12vw] leading-none sm:text-[8vw] block"
        >
          Aazim
        </span>
      </div>
      <div className="overflow-hidden">
        <span
          ref={counterRef}
          className="font-mono text-[12vw] leading-none sm:text-[8vw] tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  );
}
