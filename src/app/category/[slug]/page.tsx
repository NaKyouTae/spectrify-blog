import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { categoryInfo, getPostsByCategory, type Category } from "@/data/posts";
import type { Metadata } from "next";

const validCategories: Category[] = ["subsidy", "application", "saving"];

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return validCategories.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const info = categoryInfo[slug as Category];
  if (!info) return {};
  return {
    title: info.name,
    description: info.description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: info.name,
      description: info.description,
      url: `/category/${slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!validCategories.includes(slug as Category)) notFound();

  const category = slug as Category;
  const info = categoryInfo[category];
  const catPosts = getPostsByCategory(category);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">{info.name}</h2>
        <p className="text-[#6b7280]">{info.description}</p>
      </section>

      <div>
        {catPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
