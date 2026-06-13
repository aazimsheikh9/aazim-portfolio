"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0.1 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.defaults({ markers: false });
    ScrollTrigger.refresh();

    const onAnchorClick = (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;

      let hash = null;
      let targetPath = null;

      if (href.startsWith("#")) {
        hash = href;
        targetPath = pathname;
      } else if (href.startsWith("/#")) {
        hash = href.slice(1);
        targetPath = "/";
      }

      if (!hash) return;

      e.preventDefault();
      if (targetPath !== pathname) {
        router.push(href);
        return;
      }

      const el = document.querySelector(hash);
      if (el) {
        lenis.scrollTo(el, { offset: -20, duration: 1.4 });
        history.replaceState(null, "", hash);
      } else if (hash === "#top") {
        lenis.scrollTo(0, { duration: 1.4 });
      }
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [pathname, router]);

  return children;
}
