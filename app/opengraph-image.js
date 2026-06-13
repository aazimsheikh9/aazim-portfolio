import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mohammad Aazim — Front-End Web Developer";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 80% 20%, #1f2937 0%, #0b0b0b 60%)",
          color: "#ededed",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          <span>Aazim / dev</span>
          <span>Delhi · 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            Mohammad
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            <span>Aazim</span>
            <span style={{ opacity: 0.4 }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              opacity: 0.7,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Front-End Web Developer · Next.js · React · Motion
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
