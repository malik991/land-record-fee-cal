import BLogListClient from "@/components/layout/BlogListClient";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog - Land Transfer & Inheritance Info",
  description:
    "Educational guides and how-tos for land mutation, inheritance shares, taxes and more.",
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  return <BLogListClient posts={allPosts} />;
}
