import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Harmony Solutions : sites, applications et SaaS sur mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const root = process.cwd();
  const [serif, mono] = await Promise.all([
    readFile(join(root, "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff")),
    readFile(join(root, "assets/monogram.png")),
  ]);
  const monoSrc = `data:image/png;base64,${mono.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07182E",
          color: "#F5F2EC",
          padding: "72px 80px",
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={monoSrc} width={64} height={58} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, letterSpacing: 3 }}>HARMONY</span>
            <span style={{ fontSize: 16, letterSpacing: 10, color: "rgba(245,242,236,0.7)" }}>SOLUTIONS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 92, lineHeight: 0.95, letterSpacing: -2 }}>Des solutions digitales</span>
          <span style={{ fontSize: 92, lineHeight: 0.95, letterSpacing: -2 }}>pensées pour votre activité.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, color: "rgba(245,242,236,0.65)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 56 }}>
            <div style={{ height: 2, background: "#C7A45A" }} />
            <div style={{ height: 2, background: "rgba(199,164,90,0.6)" }} />
          </div>
          Sites, applications, SaaS et outils métier sur mesure
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
