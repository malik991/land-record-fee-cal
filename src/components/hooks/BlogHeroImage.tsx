"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
};

export default function BlogHeroImage({ src, alt }: Props) {
  const [imgSrc, setImgSrc] = useState(src || "/images/blog/default.jpeg");

  return (
    <div className="relative w-full aspect-[3/2] mb-6 rounded-lg overflow-hidden shadow">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL="/images/blog/default.jpeg"
        onError={() => setImgSrc("/images/blog/default.jpeg")}
      />
    </div>
  );
}
