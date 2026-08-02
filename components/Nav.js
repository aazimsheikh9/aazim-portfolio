import Link from "next/link";
import { SocialLinks } from "./SocialIcons";

// The site's own nav items.
const items = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

// The pill sits absolute over the top of the page and scrolls away with it. On
// the homepage it rides the dark hero band; on subpages it reads as a dark pill
// on paper, which the backdrop blur and its own border keep legible either way.
// Below 900px the links hide and Menu.js takes over.
export default function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav__pill">
        <Link href="/" className="nav__mark" aria-label="Mohammad Aazim — home">
          AAZIM<sup>®</sup>
        </Link>

        <ul className="nav__links">
          {items.map((i) => (
            <li key={i.href}>
              <Link href={i.href}>{i.label}</Link>
            </li>
          ))}
        </ul>

        <SocialLinks className="nav__social" />
      </div>
    </nav>
  );
}
