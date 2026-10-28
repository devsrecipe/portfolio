import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/*
 * ImageResponse cannot read CSS variables, so the Warm Kitchen values are
 * repeated here as rgb() triplets (ground, ink, primary, muted).
 */
const ground = "rgb(255, 250, 243)";
const ink = "rgb(28, 23, 20)";
const primary = "rgb(196, 70, 30)";
const muted = "rgb(107, 98, 89)";

export function renderOg(title: string, eyebrow = "Devs Recipe") {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: ground,
        color: ink,
        padding: 72,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
          <path d="M5 27h38a19 19 0 0 1-38 0Z" fill={primary} />
          <path
            d="M17 6l-7 7 7 7M31 6l7 7-7 7M27 4l-6 18"
            stroke={primary}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ fontSize: 40, fontWeight: 700 }}>devsrecipe</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 26,
            color: muted,
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </div>
      </div>
      <div style={{ height: 8, width: 160, background: primary, borderRadius: 4 }} />
    </div>,
    ogSize,
  );
}
