import { posts, categoryInfo } from "@/data/posts";

const BASE_URL = "https://spectrify.kr";
const SITE_TITLE = "스펙트리파이";
const SITE_DESC =
  "정부 지원금, 서류 발급, 절약 꿀팁까지. 꼭 필요한 생활 정보를 쉽고 빠르게 안내합니다.";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const lastBuildDate = new Date(
    sorted[0]?.date ?? Date.now()
  ).toUTCString();

  const items = sorted
    .map(
      (post) => `
    <item>
      <title>${escape(post.title)}</title>
      <link>${BASE_URL}/posts/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/posts/${post.slug}</guid>
      <description>${escape(post.description)}</description>
      <category>${escape(categoryInfo[post.category].name)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escape(SITE_DESC)}</description>
    <language>ko-KR</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
