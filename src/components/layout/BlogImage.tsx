// components/BlogImage.tsx
"use client";

import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function BlogImage({
  src,
  alt,
  width = 900,
  height = 600,
  className = "",
}: BlogImageProps) {
  return (
    <div className="w-full flex justify-center my-2">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-lg shadow-md border ${className}`}
      />
    </div>
  );
}
