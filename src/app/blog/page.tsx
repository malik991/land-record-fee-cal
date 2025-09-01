import BLogListClient from "@/components/layout/BlogListClient";
import { getAllPosts } from "@/lib/mdx";

// ✅ ISR (Incremental Static Regeneration)
export const revalidate = 3600; // 1 hour in seconds

export const metadata = {
  title: "Blog - Land Transfer & Inheritance Info",
  description:
    "Educational guides and how-tos for land mutation, inheritance shares, taxes and more.",
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  return <BLogListClient posts={allPosts} />;
}
