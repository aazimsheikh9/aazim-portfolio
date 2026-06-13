"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Marquee({ items, speed = 30, className = "" }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const halfWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -halfWidth,
      duration: halfWidth / speed,
      ease: "none",
      repeat: -1,
    });
    return () => tween.kill();
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
