import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-font";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "스펙트리파이 | 생활 정보 · 지원금 · 절약 가이드";

export default async function OpengraphImage() {
  const title = "스펙트리파이";
  const subtitle = "꼭 필요한 생활 정보,\n쉽고 빠르게.";
  const tagline = "정부 지원금 · 서류 발급 · 절약 가이드";
  const text = `${title}${subtitle}${tagline}`;

  const [bold, regular] = await Promise.all([
    loadGoogleFont("Noto Sans KR", 700, text),
    loadGoogleFont("Noto Sans KR", 400, text),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background: "#ffffff",
          fontFamily: "Noto Sans KR",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              background: "#1a1a1a",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: -0.5,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.15,
              letterSpacing: -2,
              whiteSpace: "pre-line",
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#6b7280",
              letterSpacing: -0.5,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "#9ca3af",
          }}
        >
          spectrify.kr
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans KR", data: bold, weight: 700, style: "normal" },
        { name: "Noto Sans KR", data: regular, weight: 400, style: "normal" },
      ],
    }
  );
}
