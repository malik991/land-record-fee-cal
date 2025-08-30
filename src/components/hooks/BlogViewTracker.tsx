"use client";
import { useEffect } from "react";

export default function BlogViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch("/api/blogs/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
      } catch (error) {
        console.error("Error tracking blog view:", error);
      }
    };

    trackView();
  }, [slug]);

  return null; // nothing to render
}
