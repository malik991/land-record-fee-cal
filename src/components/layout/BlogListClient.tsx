"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BlogHeroImage from "@/components/hooks/BlogHeroImage";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const POSTS_PER_PAGE = 8;

export default function BLogListClient({ posts }: { posts: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // 🧠 Extract unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.frontmatter.tags?.forEach((tag: string) =>
        tagSet.add(tag.toLowerCase())
      );
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // 🔍 Filtered posts based on search + tag
  const filteredPosts = useMemo(() => {
    const result = posts.filter((post) => {
      const matchesSearch =
        post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
        post.frontmatter.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTag = selectedTag
        ? post.frontmatter.tags
            ?.map((t: string) => t.toLowerCase())
            .includes(selectedTag)
        : true;

      return matchesSearch && matchesTag;
    });

    // 📌 Sort by date (latest first)
    return result.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  }, [posts, search, selectedTag]);

  // pagination logic

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset to page 1 when search/tag changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
    setCurrentPage(1);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h1>
      {/* 🔎 Search Input */}
      <div className="flex justify-center mb-6">
        <Input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={handleSearchChange}
          className="w-full max-w-md"
        />
      </div>
      {/* 🏷️ Tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`cursor-pointer ${
              selectedTag === tag
                ? "bg-pehla text-white"
                : "bg-muted text-foreground hover:bg-pehla hover:text-white"
            }`}
          >
            {tag}
          </Badge>
        ))}
      </div>
      {/* 📝 Posts */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="flex flex-col h-full hover:shadow-lg transition duration-200 cursor-pointer rounded-xl bg-background hover:bg-muted">
                <CardHeader className="p-0 relative h-48">
                  <BlogHeroImage
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.title}
                  />
                </CardHeader>
                <CardContent className="px-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mb-2">
                    {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
                  </p>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {post.frontmatter.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blog posts found.
          </p>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
