import Link from "next/link";
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
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main id="top" className="subpage">
      <div className="shell">
        <div className="srow">
          <span>(Error 404)</span>
          <span>Wrong turn — page missing</span>
        </div>

        <NotFoundClient />

        <div className="cs__grid">
          <div className="cs__body">
            <p>
              The page you&apos;re looking for has either been moved, renamed,
              or never existed. No harm done — let&apos;s get you back on the
              path.
            </p>
            <Link className="btn" href="/">
              Back to home{" "}
              <span aria-hidden="true" className="glyph">
                →
              </span>
            </Link>
          </div>

          <aside>
            <p className="aside__label">Try one of these instead</p>
            <ul className="metrics">
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="nf__link">
                    {s.label}
                  </Link>
                  <span aria-hidden="true" className="glyph nf__arrow">
                    →
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
