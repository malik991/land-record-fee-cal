import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import Link from "next/link";
import type { Metadata } from "next";
import BlogHeroImage from "@/components/hooks/BlogHeroImage";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
    },
    // twitter: {
    //   card: "summary",
    //   title: post.frontmatter.title,
    //   description: post.frontmatter.description,
    // },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  //const { slug } = params;
  const slug = params?.slug;
  if (!slug) throw new Error("Slug is undefined");

  const post = await getPostBySlug(slug); // ✅ Must pass params.slug

  return (
    <div className="prose mx-auto p-6">
      <BlogHeroImage
        src={post.frontmatter.coverImage}
        alt={post.frontmatter.title}
      />

      <h1>{post.frontmatter.title}</h1>
      <p className="text-gray-500 text-sm">{post.frontmatter.date}</p>
      <article>{post.compiled}</article>
      <Link href="/blog" className="text-blue-600 underline">
        ← Back to Blog
      </Link>
    </div>
  );
}
