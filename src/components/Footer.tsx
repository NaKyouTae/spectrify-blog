import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] mt-auto">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6b7280] mb-4">
          <Link href="/about" className="hover:text-[#1a1a1a] transition-colors">
            소개
          </Link>
          <Link href="/privacy" className="hover:text-[#1a1a1a] transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/contact" className="hover:text-[#1a1a1a] transition-colors">
            문의
          </Link>
        </div>
        <p className="text-xs text-[#9ca3af]">
          © 2026 스펙트리파이. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
