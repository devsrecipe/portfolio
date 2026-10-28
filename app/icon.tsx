import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// rgb() copies of the dark palette's ink and primary: ImageResponse cannot read CSS variables.
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgb(28, 23, 20)",
        borderRadius: 14,
      }}
    >
      <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
        <path d="M5 27h38a19 19 0 0 1-38 0Z" fill="rgb(232, 103, 58)" />
        <path
          d="M17 6l-7 7 7 7M31 6l7 7-7 7M27 4l-6 18"
          stroke="rgb(232, 103, 58)"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    size,
  );
}
