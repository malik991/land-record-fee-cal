"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BlogHeroImage from "@/components/hooks/BlogHeroImage";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 8;

export default function BLogListClient({ posts }: { posts: any[] }) {
  //const headerImage =
  //posts[0]?.frontmatter.coverImage || "/images/blog/default.jpg";
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {paginatedPosts.map((post) => (
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
        ))}
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
