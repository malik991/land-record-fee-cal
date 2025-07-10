"use client";

import Link from "next/link";

type UrduLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function UrduLink({ href, children }: UrduLinkProps) {
  return (
    <Link
      href={href}
      target="_self"
      rel="noopener noreferrer"
      className="text-pehla font-semibold underline hover:opacity-80"
    >
      {children}
    </Link>
  );
}
