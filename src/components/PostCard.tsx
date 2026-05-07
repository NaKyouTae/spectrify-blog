import Link from "next/link";
import { categoryInfo, type Post } from "@/data/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="py-5 border-b border-[#e5e7eb] last:border-b-0">
      <Link href={`/posts/${post.slug}`} className="block group">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-[#6b7280] bg-[#f3f4f6] px-2 py-0.5 rounded">
            {categoryInfo[post.category].name}
          </span>
          <span className="text-xs text-[#9ca3af]">{post.date}</span>
        </div>
        <h2 className="text-lg font-semibold text-[#1a1a1a] group-hover:text-[#4b5563] transition-colors mb-1.5">
          {post.title}
        </h2>
        <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-2">
          {post.description}
        </p>
        <span className="text-xs text-[#9ca3af] mt-2 block">
          읽는 시간 {post.readTime}
        </span>
      </Link>
    </article>
  );
}
