import { getAllPostsNoDB, getPostBySlug } from "@/lib/mdx";
import Link from "next/link";
import type { Metadata } from "next";
import BlogHeroImage from "@/components/hooks/BlogHeroImage";
import AuthorSignature from "@/components/layout/AuthorSignature";
import BlogViewTracker from "@/components/hooks/BlogViewTracker";

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
      images: [
        {
          url:
            post.frontmatter.coverImage &&
            post.frontmatter.coverImage.startsWith("http")
              ? post.frontmatter.coverImage
              : post.frontmatter.coverImage
              ? `https://landtaxshare.com${post.frontmatter.coverImage}`
              : "https://landtaxshare.com/images/blog/default.jpeg",
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images:
        post.frontmatter.coverImage &&
        post.frontmatter.coverImage.startsWith("http")
          ? post.frontmatter.coverImage
          : post.frontmatter.coverImage
          ? `https://landtaxshare.com${post.frontmatter.coverImage}`
          : "https://landtaxshare.com/images/blog/default.jpeg",
    },
  };
}

export function generateStaticParams() {
  const posts = getAllPostsNoDB();

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  //const { slug } = params;
  const slug = params?.slug;
  if (!slug) throw new Error("Slug is undefined");

  const post = await getPostBySlug(slug); // ✅ Must pass params.slug
  if (!post?.frontmatter?.title) {
    throw new Error("Post title is undefined");
  }
  const [englishHeading, urduHeading] = post.frontmatter.title.split(" - ");

  return (
    <div className="prose mx-auto p-6">
      {/* 👇 Call tracker here */}
      <BlogViewTracker slug={slug} />
      <BlogHeroImage
        src={post.frontmatter.coverImage}
        alt={post.frontmatter.title}
      />

      <h1 className="text-2xl text-center font-semibold">{englishHeading}</h1>
      <p className="text-gray-500 text-sm text-center">
        {post.frontmatter.date}
      </p>
      <h2 className="text-nafees text-2xl font-semibold text-center mb-4">
        {urduHeading}
      </h2>
      <article>{post.compiled}</article>
      <AuthorSignature />

      <Link
        href="/blog"
        className="text-blue-600 underline text-center block mt-10"
      >
        ← Back to Blog
      </Link>
    </div>
  );
}
