import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Urdu from "@/components/mdx/Urdu";
import UrduLink from "@/components/mdx/UrduLink";
import BlogImage from "@/components/layout/BlogImage";

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    coverImage?: string;
    tags?: string[];
  };
  content: string;
  filePath?: string; // add this
}

export function getAllPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: {
          title: data.title,
          date: data.date,
          description: data.description,
          coverImage: data.coverImage,
          tags: data.tags || [], // ✅ Include tags safely
        },
        content,
        filePath: fullPath, // add this
      };
    });
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  if (!fs.existsSync(filePath)) {
    throw new Error(`MDX file not found for slug: ${slug}`);
  }
  const { data, content } = matter(raw);

  const { content: compiled } = await compileMDX({
    source: content,
    components: {
      Urdu, // ✅ register your Urdu component
      UrduLink, // ✅ register your UrduLink component
      BlogImage, // ✅ register your BlogImage component
    },
    options: {
      scope: data,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  });

  return {
    frontmatter: {
      title: data.title,
      date: data.date,
      description: data.description,
      coverImage: data.coverImage,
    },
    compiled,
  };
}
