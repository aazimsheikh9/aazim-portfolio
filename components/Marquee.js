"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Marquee({
  items,
  speed = 200,
  mobileSpeed,
  className = "",
}) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const mobileMql = window.matchMedia("(max-width: 640px)");
    const pickSpeed = () =>
      mobileMql.matches ? (mobileSpeed ?? speed * 0.6) : speed;

    // halfWidth = one loop unit (track has [...items, ...items])
    const compute = () => {
      const halfWidth = track.scrollWidth / 2;
      return halfWidth / pickSpeed();
    };

    gsap.set(track, { xPercent: 0 });
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: compute(),
      ease: "none",
      repeat: -1,
    });

    const onResize = () => tween.duration(compute());
    window.addEventListener("resize", onResize);
    mobileMql.addEventListener("change", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mobileMql.removeEventListener("change", onResize);
      tween.kill();
    };
  }, [speed, mobileSpeed, items]);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="marquee-track">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="inline-flex items-center">
            <span>{it}</span>
            <span className="mx-3 sm:mx-6 lg:mx-8 opacity-30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
