// Generates /apple-icon (180×180 PNG) for iOS home-screen shortcuts.
// Next.js auto-injects <link rel="apple-touch-icon" sizes="180x180" />
// pointing to this route — no manual <head> entry needed.

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 30%, #1f2937 0%, #0b0b0b 70%)",
          color: "#ededed",
          fontFamily: "Georgia, serif",
          fontSize: 110,
          letterSpacing: -4,
          lineHeight: 1,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
