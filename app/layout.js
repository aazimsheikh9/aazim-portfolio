// Root layout — sets up:
//   • Fonts (next/font, self-hosted, zero CLS)
//   • Global Metadata API: title, description, OG, Twitter, robots, canonical
//   • Viewport API: theme-color, color-scheme
//   • Structured data (JSON-LD) for Person, WebSite, ProfessionalService
//   • Preloads the hero portrait (LCP candidate)
//   • Mounts global chrome: Preloader, Cursor, ScrollProgress, Nav, Menu,
//     SmoothScroll, Analytics
//
// Keep this file a Server Component — metadata + JSON-LD must render on
// the server for crawlers to see them in the initial HTML.

import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import Preloader from "../components/Preloader";
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import ScrollProgress from "../components/ScrollProgress";
import Analytics from "../components/Analytics";

// Fonts — display: "swap" so text paints in fallback first, swaps when the
// web font arrives. Each font exposes a CSS variable consumed by globals.css.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Single source of truth for canonical URL. Set in Vercel envs as
// https://byaazim.in (must include scheme — `new URL()` will throw otherwise).
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata = {
  // metadataBase tells Next to resolve any relative URL (OG image, canonical,
  // etc.) against this origin. Without it, Vercel preview URLs leak into prod.
  metadataBase: new URL(SITE_URL),

  // Templated title — every child page just sets a short string, gets
  // "<page> — Mohammad Aazim" automatically.
  title: {
    default: "Mohammad Aazim — Front-End Web Developer (Next.js · React)",
    template: "%s — Mohammad Aazim",
  },
  description:
    "Mohammad Aazim is a Front-End Web Developer in Delhi with 4+ years of experience building fast, accessible interfaces with Next.js, React, and Tailwind. Led the WordPress → Next.js 14 migration of internationalschooling.org.",

  applicationName: "Mohammad Aazim — Portfolio",
  authors: [{ name: "Mohammad Aazim", url: SITE_URL }],
  creator: "Mohammad Aazim",
  publisher: "Mohammad Aazim",

  // Keywords are mostly cosmetic for Google (they ignore them) but Bing
  // and some smaller engines still use them — cheap to keep.
  keywords: [
    "Mohammad Aazim",
    "Aazim Sheikh",
    "Front-End Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript Developer Delhi",
    "Tailwind CSS",
    "GSAP",
    "Portfolio",
    "Web Developer India",
    "International Schooling",
  ],

  // Canonical for the root. Child pages set their own.
  alternates: { canonical: "/" },
  category: "technology",

  // Open Graph — used by LinkedIn, Slack, WhatsApp, Discord, Facebook.
  // The `images` array is auto-populated by app/opengraph-image.js.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Mohammad Aazim",
    title: "Mohammad Aazim — Front-End Web Developer",
    description:
      "Next.js · React · Tailwind. Editorial portfolio of a front-end developer based in Delhi.",
    locale: "en_US",
  },

  // Twitter/X card. summary_large_image gives the full hero preview.
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Aazim — Front-End Web Developer",
    description:
      "Next.js · React · Tailwind. Editorial portfolio of a front-end developer based in Delhi.",
    creator: "@aazim",
  },

  // Crawler instructions — index + follow site-wide; the googleBot section
  // unlocks rich previews (large image, full snippet, full video preview).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Stops mobile Safari from auto-linking phone numbers / emails — which can
  // wrap them in invisible <a> tags and break custom styling on the page.
  formatDetection: { email: false, address: false, telephone: false },
};

// Viewport — split from metadata in App Router. Theme-color drives the
// mobile browser chrome (Chrome address bar, iOS status bar tint).
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b0b0b" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  colorScheme: "dark",
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────
// Three schemas:
//   1. Person      — the primary entity (Google Knowledge Graph candidate)
//   2. WebSite     — required to enable sitelinks search box for the domain
//   3. ProfessionalService — what services I sell, location, area served
//
// All three render as inline <script type="application/ld+json"> in <head>
// so crawlers see them in the first byte of HTML.

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Mohammad Aazim",
  alternateName: "Aazim Sheikh",
  url: SITE_URL,
  image: `${SITE_URL}/Firefly.jpg`,
  jobTitle: "Front-End Web Developer",
  description:
    "Front-End Web Developer with 4+ years building production Next.js and React applications.",
  email: "mailto:sheikhaazim13@gmail.com",
  telephone: "+91-8533990022",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressRegion: "DL",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "Entire Techno Solutions Pvt. Ltd.",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Meerut Institute of Engineering & Technology",
  },
  // sameAs — canonical external profiles. Critical for Knowledge Graph
  // disambiguation; Google uses these to link the entity across the web.
  sameAs: [
    "https://www.linkedin.com/in/mohammad-aazim",
    "https://www.github.com/aazimsheikh9",
    "https://ascricketgears.vercel.app/",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "JavaScript",
    "Tailwind CSS",
    "GSAP",
    "Web Performance",
    "Accessibility",
    "Internationalization",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Mohammad Aazim — Portfolio",
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

// ProfessionalService — improves local SEO and rich result eligibility for
// "front-end developer near me" style queries.
const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: "Mohammad Aazim — Front-End Development",
  url: SITE_URL,
  image: `${SITE_URL}/Firefly.jpg`,
  founder: { "@id": `${SITE_URL}/#person` },
  priceRange: "$$",
  areaServed: ["IN", "Worldwide"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressCountry: "IN",
  },
  serviceType: [
    "Front-end web development",
    "Next.js development",
    "React development",
    "Web performance optimization",
    "Internationalization (i18n)",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning quiets the dev warning when extensions
      // (Grammarly, dark-reader, etc.) mutate <html> attributes before React
      // hydrates. Doesn't disable SSR safety, just the noisy console message.
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload the hero portrait — LCP candidate on the homepage.
            fetchPriority=high tells the browser to grab it before scripts. */}
        <link
          rel="preload"
          as="image"
          href="/Firefly.jpg"
          fetchPriority="high"
        />

        {/* Inline JSON-LD so crawlers see the schema in the first byte. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
      </head>
      <body className="bg-bg text-fg grain">
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <Menu />
        <SmoothScroll>{children}</SmoothScroll>

        {/* Analytics loaded after the page is interactive so it never
            competes with LCP. Renders nothing if NEXT_PUBLIC_GA_ID is unset. */}
        <Analytics />
      </body>
    </html>
  );
}
