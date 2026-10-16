import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Edgeline Exports — Driven by Value";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = readFileSync(join(process.cwd(), "public/logo-dark-bg.png")).toString("base64");

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo}`} width={520} height={277} alt="" />
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
