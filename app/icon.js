// Generates /icon (32×32 PNG) at build time using next/og's ImageResponse.
// This is the modern Next.js favicon route — it overrides the legacy
// favicon.ico for browsers that support PNG, while .ico stays as fallback.

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0b",
          color: "#ededed",
          fontFamily: "Georgia, serif",
          fontSize: 22,
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
