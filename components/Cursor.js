"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "../lib/gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const resetRef = useRef(() => {});
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const setHover = (state, text) => {
      gsap.to(ring, {
        scale: state ? 2.4 : 1,
        backgroundColor: state ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
        duration: 0.35,
        ease: "power3",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: state ? 0 : 1,
        duration: 0.3,
        overwrite: "auto",
      });
      if (label) {
        label.textContent = text || "";
        gsap.to(label, {
          opacity: state && text ? 1 : 0,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    const resetCursor = () => setHover(false, "");
    resetRef.current = resetCursor;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      xToDot(pos.x);
      yToDot(pos.y);
      xToRing(pos.x);
      yToRing(pos.y);
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const onLeave = () =>
      gsap.to([dot, ring], { opacity: 0, duration: 0.2, overwrite: "auto" });

    const interactiveSelector =
      "a, button, [data-cursor], input, textarea, label, [role='button']";

    const onOver = (e) => {
      const target = e.target.closest(interactiveSelector);
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        setHover(true, text);
      }
    };
    const onOut = (e) => {
      const target = e.target.closest(interactiveSelector);
      if (target) setHover(false);
    };

    // reset when clicking a link/button — covers route transitions and
    // the case where the element gets removed mid-hover
    const onClick = () => {
      requestAnimationFrame(resetCursor);
      setTimeout(resetCursor, 300);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // reset on every route change
  useEffect(() => {
    resetRef.current?.();
  }, [pathname]);

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[150] h-9 w-9 rounded-full border border-white/40 flex items-center justify-center mix-blend-difference"
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] uppercase tracking-widest opacity-0 text-white whitespace-nowrap"
        />
      </div>
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed top-0 left-0 z-[150] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        aria-hidden="true"
      />
    </>
  );
}
