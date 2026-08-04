import { ImageResponse } from "next/og";

export const alt =
  "Romain Mailliu · Tech & IA au service de votre mission, à Marseille";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FOREST = "#1a3300";
const CREAM = "#fcfaf5";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          color: FOREST,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.75,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: FOREST,
            }}
          />
          Offre Tech &amp; IA
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            La technologie et l&apos;IA au service de votre mission
          </div>
          <div style={{ fontSize: 34, opacity: 0.8 }}>
            Sites web · Automatisation · Outils IA · au juste prix
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
            borderTop: `3px solid ${FOREST}`,
            paddingTop: 32,
          }}
        >
          <div style={{ fontWeight: 700 }}>Romain Mailliu</div>
          <div style={{ opacity: 0.75 }}>Marseille · romainmailliu.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
