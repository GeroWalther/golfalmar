import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0f3d2a 0%, #1f6f4a 60%, #2a8a5c 100%)",
          color: "#fff",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "#cee93f",
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          Since 2013
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 130,
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          GOLF AL MAR
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            fontWeight: 500,
            opacity: 0.9,
          }}
        >
          Sport sunscreen · Magic Golf Grip
        </div>
      </div>
    ),
    { ...size },
  );
}
