import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { categoryInfo, getPostBySlug, posts } from "@/data/posts";
import { loadGoogleFont } from "@/lib/og-font";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "스펙트리파이 포스트";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function PostOgImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const info = categoryInfo[post.category];
  const brand = "스펙트리파이";
  const text = `${brand}${info.name}${post.title}${post.description}spectrify.kr${post.date}`;

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
          padding: "70px 80px",
          background: "#ffffff",
          fontFamily: "Noto Sans KR",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              background: "#1a1a1a",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: -0.5,
            }}
          >
            {brand}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#6b7280",
              background: "#f3f4f6",
              padding: "8px 18px",
              borderRadius: 999,
              alignSelf: "flex-start",
              letterSpacing: -0.3,
            }}
          >
            {info.name}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.2,
              letterSpacing: -1.5,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "#6b7280",
              lineHeight: 1.5,
              letterSpacing: -0.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#9ca3af",
          }}
        >
          <span>spectrify.kr</span>
          <span>{post.date}</span>
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
