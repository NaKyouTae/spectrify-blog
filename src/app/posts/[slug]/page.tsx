import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, posts, categoryInfo } from "@/data/posts";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++}>{processInline(line.slice(3).trim())}</h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++}>{processInline(line.slice(4).trim())}</h3>
      );
      i++;
      continue;
    }

    // Table
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, key++));
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++}>
          {items.map((item, idx) => (
            <li key={idx}>{processInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++}>
          {items.map((item, idx) => (
            <li key={idx}>{processInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph
    if (line.trim()) {
      const paraLines: string[] = [];
      while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].startsWith("- ") && !/^\d+\.\s/.test(lines[i].trim()) && !(lines[i].includes("|") && lines[i].trim().startsWith("|"))) {
        paraLines.push(lines[i]);
        i++;
      }
      elements.push(
        <p key={key++}>{processInline(paraLines.join(" "))}</p>
      );
      continue;
    }

    i++;
  }

  return elements;
}

function processInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let k = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={k++}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}

function renderTable(lines: string[], key: number) {
  const parseRow = (line: string) =>
    line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

  const headers = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow);

  return (
    <table key={key}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{processInline(h)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci}>{processInline(cell)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const info = categoryInfo[post.category];

  // Find related posts (same category, excluding current)
  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#9ca3af] mb-6">
        <Link href="/" className="hover:text-[#6b7280] transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link
          href={`/category/${post.category}`}
          className="hover:text-[#6b7280] transition-colors"
        >
          {info.name}
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-[#6b7280] bg-[#f3f4f6] px-2 py-0.5 rounded">
            {info.name}
          </span>
          <time className="text-xs text-[#9ca3af]">{post.date}</time>
          <span className="text-xs text-[#9ca3af]">· {post.readTime} 읽기</span>
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a] leading-tight">
          {post.title}
        </h1>
        <p className="text-[#6b7280] mt-3">{post.description}</p>
      </header>

      {/* Article Content */}
      <article className="prose mb-12">{renderMarkdown(post.content)}</article>

      {/* CTA - Related Posts */}
      {related.length > 0 && (
        <section className="border-t border-[#e5e7eb] pt-8">
          <h3 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wider mb-4">
            함께 읽으면 좋은 글
          </h3>
          <div className="space-y-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/posts/${r.slug}`}
                className="block p-4 rounded-lg border border-[#e5e7eb] hover:border-[#d1d5db] transition-colors"
              >
                <h4 className="font-medium text-[#1a1a1a] mb-1">{r.title}</h4>
                <p className="text-sm text-[#6b7280] line-clamp-1">
                  {r.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
