import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import Preloader from "../components/Preloader";
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import ScrollProgress from "../components/ScrollProgress";

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

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata = {
  metadataBase: new URL(SITE_URL),
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
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Mohammad Aazim",
    title: "Mohammad Aazim — Front-End Web Developer",
    description:
      "Next.js · React · Tailwind. Editorial portfolio of a front-end developer based in Delhi.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Aazim — Front-End Web Developer",
    description:
      "Next.js · React · Tailwind. Editorial portfolio of a front-end developer based in Delhi.",
    creator: "@aazim",
  },
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
  formatDetection: { email: false, address: false, telephone: false },
};

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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammad Aazim",
  alternateName: "Aazim Sheikh",
  url: SITE_URL,
  image: `${SITE_URL}/Firefly.jpg`,
  jobTitle: "Front-End Web Developer",
  email: "mailto:sheikhaazim13@gmail.com",
  telephone: "+91-8533990022",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
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
  sameAs: [
    "https://www.linkedin.com/in/mohammad-aazim",
    "https://www.github.com/aazimsheikh9",
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
  url: SITE_URL,
  name: "Mohammad Aazim — Portfolio",
  inLanguage: "en",
  publisher: { "@type": "Person", name: "Mohammad Aazim" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/Firefly.jpg"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg grain">
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <Menu />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
