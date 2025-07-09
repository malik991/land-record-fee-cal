import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["landtaxshare.com", "res.cloudinary.com"], // Add any domains you use
  },
  //   async headers() {
  //     return [
  //       {
  //         source: "/(.*)", // Apply to all routes
  //         headers: [
  //           {
  //             key: "Permissions-Policy",
  //             value: "geolocation=*", // Adjust as needed, removing any problematic directives
  //           },
  //         ],
  //       },
  //     ];
  //   },
};
// add mdx plugin
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX({
  ...nextConfig,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
//export default nextConfig;
