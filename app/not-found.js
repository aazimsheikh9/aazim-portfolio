import Link from "next/link";
import MagneticButton from "../components/MagneticButton";
import NotFoundClient from "../components/NotFoundClient";

export const metadata = {
  title: "404 — Page not found",
  description:
    "This page doesn't exist (or doesn't exist anymore). Head back to the homepage.",
  robots: { index: false, follow: false },
};

const suggestions = [
  { label: "Selected work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Beyond code", href: "/#beyond" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main
      id="top"
      className="relative min-h-[100svh] flex flex-col px-6 sm:px-10 pt-28 sm:pt-32 pb-10 sm:pb-14"
    >
      <div className="grid grid-cols-2 items-start gap-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70 mb-10">
        <span>(Error 404)</span>
        <span className="text-right">Wrong turn — page missing</span>
      </div>

      <NotFoundClient />

      <section className="mt-16 sm:mt-20 grid grid-cols-12 gap-6 sm:gap-8 items-end">
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          <p className="text-fg/70 text-base sm:text-lg leading-relaxed max-w-xl">
            The page you&apos;re looking for has either been moved, renamed, or
            never existed. No harm done — let&apos;s get you back on the path.
          </p>

          <div className="flex flex-wrap gap-3">
            <MagneticButton
              as="a"
              href="/"
              variant="outline"
              data-cursor="Home ↗"
            >
              Back to home
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/#contact"
              variant="ghost"
              data-cursor="Say hi"
            >
              Get in touch
            </MagneticButton>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-5 lg:pl-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
            Try one of these instead
          </div>
          <ul className="border-t border-line">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  data-cursor="Go →"
                  className="group flex items-center justify-between border-b border-line py-4 hover:pl-2 transition-[padding] duration-300"
                >
                  <span className="font-display text-xl sm:text-2xl">
                    {s.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted group-hover:text-fg transition-colors">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <footer className="mt-auto pt-12 sm:pt-16 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>© {new Date().getFullYear()} Mohammad Aazim</span>
        <span className="hidden sm:inline">
          Code 404 · Resource not found
        </span>
        <Link href="/" className="hover:text-fg" data-cursor="Top ↑">
          Home ↑
        </Link>
      </footer>
    </main>
  );
}
