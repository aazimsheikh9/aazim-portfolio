"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "../lib/gsap";

const items = [
  { label: "Home", href: "/#top" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Beyond", href: "/#beyond" },
  { label: "Contact", href: "/#contact" },
];

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  const overlayRef = useRef(null);
  const itemsRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    const mql = window.matchMedia("(min-width: 1024px)");
    const onMql = () => setIsDesktop(mql.matches);
    onScroll();
    onMql();
    window.addEventListener("scroll", onScroll, { passive: true });
    mql.addEventListener("change", onMql);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mql.removeEventListener("change", onMql);
    };
  }, []);

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // open/close animation — clip-path differs by viewport
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const lenis = window.__lenis;

    const links = itemsRef.current?.querySelectorAll("[data-menu-line]") || [];
    const meta = metaRef.current?.children || [];

    // anchor the clip-path origin to the hamburger button center
    const closedClip = isDesktop
      ? "inset(0% 0% 100% 100%)"
      : "circle(0% at calc(100% - 44px) 44px)";
    const openClip = isDesktop
      ? "inset(0% 0% 0% 0%)"
      : "circle(150% at calc(100% - 44px) 44px)";

    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { autoAlpha: 1, clipPath: closedClip });
      const tl = gsap.timeline();
      tl.to(overlay, {
        clipPath: openClip,
        duration: reduced ? 0.001 : 0.85,
        ease: "expo.inOut",
      })
        .from(
          links,
          {
            yPercent: 110,
            duration: reduced ? 0.001 : 0.8,
            ease: "expo.out",
            stagger: 0.06,
          },
          "-=0.4"
        )
        .from(
          meta,
          {
            y: 20,
            opacity: 0,
            duration: reduced ? 0.001 : 0.6,
            ease: "expo.out",
            stagger: 0.06,
          },
          "-=0.4"
        );
    } else {
      // unlock immediately so anchor-click scroll handlers can run during close
      document.body.style.overflow = "";
      lenis?.start();
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { autoAlpha: 0 });
        },
      });
      tl.to(overlay, {
        clipPath: closedClip,
        duration: reduced ? 0.001 : 0.7,
        ease: "expo.inOut",
      });
    }
  }, [open, isDesktop]);

  // close when any in-menu link is clicked (even same-page hash)
  const closeOnLink = (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    // unlock synchronously so the document-level smooth-scroll handler
    // (which runs after this) can actually scroll
    document.body.style.overflow = "";
    window.__lenis?.start();
    setOpen(false);
  };

  // button visible from start on mobile; on desktop only after scroll
  const buttonVisible = open || scrolled || !isDesktop;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-[130] grid place-items-center h-14 w-14 rounded-full border border-white/20 bg-bg/80 backdrop-blur-md mix-blend-difference text-white transition-all duration-500 ${
          buttonVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-3 scale-90 pointer-events-none"
        }`}
        data-cursor={open ? "Close" : "Menu"}
      >
        <span className="relative block h-3 w-5">
          <span
            className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
              open ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
              open ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Backdrop — desktop only, click-to-close */}
      {open && isDesktop && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[124] bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        ref={overlayRef}
        onClick={closeOnLink}
        data-lenis-prevent
        className="fixed top-0 right-0 bottom-0 z-[125] bg-bg invisible flex flex-col px-6 sm:px-10 pt-24 lg:pt-20 pb-8 overflow-y-auto w-full lg:w-[44%] lg:border-l lg:border-line shadow-2xl"
      >
        <nav
          ref={itemsRef}
          className="flex-1 flex flex-col justify-center gap-0 sm:gap-1"
        >
          {items.map((it, i) => (
            <div key={it.href} className="overflow-hidden">
              <Link
                href={it.href}
                data-menu-line
                data-cursor="Go →"
                className="font-display block text-[12vw] sm:text-7xl lg:text-[4.5vw] leading-[1] hover:text-fg/60 transition-colors"
              >
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted align-top mr-3 sm:mr-5">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                {it.label}
              </Link>
            </div>
          ))}
        </nav>

        <div
          ref={metaRef}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-6 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em]"
        >
          <div>
            <div className="text-muted mb-2">Email</div>
            <a
              href="mailto:sheikhaazim13@gmail.com"
              className="text-fg hover:text-fg/70 normal-case tracking-normal text-sm break-all"
              data-cursor="Send"
            >
              sheikhaazim13@gmail.com
            </a>
          </div>
          <div>
            <div className="text-muted mb-2">Socials</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-fg">
              <a
                href="https://www.linkedin.com/in/mohammad-aazim"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg/60"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.github.com/aazimsheikh9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg/60"
              >
                GitHub ↗
              </a>
            </div>
          </div>
          <div>
            <div className="text-muted mb-2">Resume</div>
            <a
              href="/Mohammad_Aazim_Resume_2026.pdf"
              download
              className="text-fg hover:text-fg/60"
              data-cursor="Download"
            >
              Download PDF ↓
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
