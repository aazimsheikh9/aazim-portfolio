"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One client component driving every scroll-linked effect on the page, so the
// sections themselves can stay server components. Everything is opt-in by
// attribute:
//
//   [data-reveal]    word-by-word blur reveal (words come from <Reveal>)
//   .rise            fade + translate on first intersection
//   [data-parallax]  slow vertical drift for the portrait behind Services
//
// Native scrolling throughout — one rAF-throttled listener covers all of it.
export default function ScrollFX() {
  // Re-scan on every route change. This lives in the root layout, which is NOT
  // remounted on client-side navigation — so with an empty dep array a case
  // study reached from the homepage kept the homepage's element list, and its
  // own paragraphs stayed stuck at opacity .14 / blur 7px forever.
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealEls = Array.from(document.querySelectorAll("[data-reveal]")).map(
      (el) => ({ el, words: Array.from(el.querySelectorAll(".w")) })
    );

    function paintReveals() {
      const vh = window.innerHeight;
      for (const { el, words } of revealEls) {
        const r = el.getBoundingClientRect();
        // Resolve fully by the time the block reaches ~55% of the viewport —
        // the reference's version lags and finishes below the fold.
        const start = vh * 0.95;
        const end = vh * 0.55;
        let p = (start - r.top) / (start - end);
        p = p < 0 ? 0 : p > 1 ? 1 : p;

        const span = 1 / words.length;
        // The 1.45 overlap means the last word resolves as the block reaches
        // the fold rather than after it.
        words.forEach((w, i) => {
          const local = (p * 1.45 - i * span) / span;
          w.classList.toggle("on", local > 0.1);
        });
      }
    }

    // ---- generic rise-in ----
    const riseEls = Array.from(document.querySelectorAll(".rise"));
    let io = null;
    if ("IntersectionObserver" in window && !reduced) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );
      riseEls.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
        io.observe(el);
      });
    } else {
      riseEls.forEach((el) => el.classList.add("is-in"));
    }

    // ---- parallax portrait behind the services grid ----
    const par = document.querySelector("[data-parallax]");
    function paintParallax() {
      if (!par) return;
      const sec = par.parentElement;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (vh - r.top) / (vh + r.height);
      par.style.transform = `translateX(-50%) translateY(${((p - 0.5) * -90).toFixed(1)}px)`;
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        paintReveals();
        paintParallax();
        ticking = false;
      });
    }

    if (reduced) {
      // Settle everything into its resolved state and never listen.
      revealEls.forEach(({ words }) =>
        words.forEach((w) => w.classList.add("on"))
      );
      return () => io?.disconnect();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    paintReveals();
    paintParallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
