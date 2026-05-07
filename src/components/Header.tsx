import Link from "next/link";

const categories = [
  { slug: "subsidy", name: "지원금/보조금" },
  { slug: "application", name: "신청/발급" },
  { slug: "saving", name: "절약/재테크" },
];

export default function Header() {
  return (
    <header className="border-b border-[#e5e7eb]">
      <div className="max-w-3xl mx-auto px-5 py-5">
        <Link href="/" className="block mb-4">
          <h1 className="text-xl font-bold tracking-tight text-[#1a1a1a]">
            스펙트리파이
          </h1>
          <p className="text-sm text-[#6b7280] mt-0.5">
            생활 정보 · 지원금 · 절약 가이드
          </p>
        </Link>
        <nav className="flex gap-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="text-sm px-3 py-1.5 rounded-full text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f3f4f6] transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
