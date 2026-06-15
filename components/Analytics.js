// Google Analytics 4 — loaded after the page becomes interactive so it never
// blocks LCP or hydration. Uses next/script with strategy="afterInteractive",
// which is the official Next.js recommendation for analytics tags.
//
// The measurement ID is read from NEXT_PUBLIC_GA_ID (set in Vercel env vars).
// If the env var is missing, the component renders nothing — safer than
// shipping a placeholder ID in prod that pollutes the dashboard.

import Script from "next/script";

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_ID) return null;

  return (
    <>
      {/* gtag library */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* Init script — anonymize_ip + SPA-friendly default (no auto page_view;
          App Router emits its own router events that you can hook into later). */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            transport_type: 'beacon',
          });
        `}
      </Script>
    </>
  );
}
