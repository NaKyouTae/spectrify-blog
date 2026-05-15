import Link from "next/link";
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { posts, categoryInfo, type Category } from "@/data/posts";

const categoryOrder: Category[] = ["subsidy", "application", "saving"];

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "스펙트리파이",
  url: "https://spectrify.kr",
  inLanguage: "ko-KR",
  description:
    "정부 지원금, 서류 발급, 절약 꿀팁까지. 꼭 필요한 생활 정보를 쉽고 빠르게 안내합니다.",
  publisher: {
    "@type": "Organization",
    name: "스펙트리파이",
    url: "https://spectrify.kr",
  },
};

export default function Home() {
  const latestPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Hero */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">
          꼭 필요한 생활 정보,
          <br />
          쉽고 빠르게 안내합니다.
        </h2>
        <p className="text-[#6b7280]">
          정부 지원금부터 서류 발급, 절약 꿀팁까지 한곳에서 확인하세요.
        </p>
      </section>

      {/* Latest Posts */}
      <section className="mb-14">
        <h3 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wider mb-4">
          최신 글
        </h3>
        <div>
          {latestPosts.slice(0, 5).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Categories */}
      {categoryOrder.map((cat) => {
        const catPosts = posts.filter((p) => p.category === cat);
        const info = categoryInfo[cat];
        return (
          <section key={cat} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wider">
                {info.name}
              </h3>
              <Link
                href={`/category/${cat}`}
                className="text-xs text-[#9ca3af] hover:text-[#6b7280] transition-colors"
              >
                전체 보기 →
              </Link>
            </div>
            <div>
              {catPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
