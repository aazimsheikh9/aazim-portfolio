"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "../lib/gsap";

export default function Template({ children }) {
  const overlayRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (reduced) {
      gsap.set(overlay, { yPercent: -100 });
      return;
    }

    gsap.set(overlay, { yPercent: 0 });
    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.95,
      ease: "expo.inOut",
      delay: 0.05,
    });
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[120] bg-bg pointer-events-none"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
