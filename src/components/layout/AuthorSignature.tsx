import Link from "next/link";
import Image from "next/image";

// components/AuthorSignature.tsx
export default function AuthorSignature() {
  return (
    <div className="mt-10 border-t pt-6 flex flex-col">
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-pehla shadow-md">
          <Image
            src="/images/blog/author.png" // ⬅️ Place this image in /public/images/
            alt="Malik Mubashar Hassan"
            fill
            className="object-contain"
            sizes="56px"
          />
        </div>
        <div>
          <p className="text-base font-semibold">Malik Mubashar Hassan</p>
          <p className="text-sm text-gray-600">
            Incharge Land Record & Legal Tech Writer
          </p>
          <p className="text-xs text-muted-foreground italic">
            Author of this article
          </p>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-lg font-semibold">Need Help?</h3>
        <p className="text-gray-600">
          If you need any assistance with property transfer, feel free to
          contact us.
        </p>
        <Link
          href="/#contact"
          className="text-pehla underline mt-2 inline-block"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
