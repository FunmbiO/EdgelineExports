import { ImageResponse } from "next/og";

export const alt = "Edgeline Exports — Driven by Value";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, backgroundColor: "#c41e2a" }} />
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: "#ffffff", letterSpacing: 4 }}>
          EDGELINE
          <span style={{ color: "#c41e2a", marginLeft: 24 }}>EXPORTS</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 10,
            textTransform: "uppercase",
          }}
        >
          Driven by Value
        </div>
      </div>
    ),
    { ...size },
  );
}
