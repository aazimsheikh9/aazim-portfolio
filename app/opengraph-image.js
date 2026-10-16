import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mohammad Aazim — AI Full Stack Developer";

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
          // Matches the hero band — night ground, terracotta glow, sand text.
          background:
            "radial-gradient(circle at 22% 30%, rgba(188,75,53,0.30) 0%, #14100F 62%)",
          color: "#F4F1EA",
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
            color: "#DD6B6B",
          }}
        >
          <span>AI Full Stack Developer</span>
          <span>Delhi · 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            Mohammad Aazim
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              opacity: 0.72,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Next.js · Node.js · LLM Integration · Firebase
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
