"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const items = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // hide once the hamburger takes over (desktop only behavior)
        setHidden(window.scrollY > 120);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[80] mix-blend-difference transition-all duration-500 ${
        hidden ? "lg:-translate-y-full lg:opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6 text-white">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.2em]"
          data-cursor="Home"
        >
          Aazim<span className="opacity-50">/dev</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="font-mono text-xs uppercase tracking-[0.2em] opacity-80 hover:opacity-100"
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
