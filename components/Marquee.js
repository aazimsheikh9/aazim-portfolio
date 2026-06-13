"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Marquee({ items, speed = 200, className = "" }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    // The track contains [...items, ...items], so width is exactly 2x the loop unit.
    // Moving by xPercent: -50 puts the second copy in the visual position of the first —
    // when repeat: -1 wraps back to 0, the snap is invisible. No jitter.
    const compute = () => {
      const halfWidth = track.scrollWidth / 2;
      return halfWidth / speed; // duration for one loop in seconds
    };

    gsap.set(track, { xPercent: 0 });
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: compute(),
      ease: "none",
      repeat: -1,
    });

    const onResize = () => {
      const d = compute();
      tween.duration(d);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tween.kill();
    };
  }, [speed, items]);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="marquee-track">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="inline-flex items-center mx-8">
            <span>{it}</span>
            <span className="mx-8 opacity-30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
