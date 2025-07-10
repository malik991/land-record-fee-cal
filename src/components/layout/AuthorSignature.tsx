import Link from "next/link";

// components/AuthorSignature.tsx
export default function AuthorSignature() {
  return (
    <div className="mt-10 border-t pt-6 flex flex-col">
      <div className="flex items-center gap-4">
        <img
          src="/images/blog/author.png" // Add a small profile image in /public/images/
          alt="Author"
          className="w-12 h-12 rounded-full object-contain"
        />
        <div>
          <p className="text-base font-semibold text-gray-800">
            Malik Mubashar Hassan
          </p>
          <p className="text-sm text-gray-600">
            Incharge Land Record & Legal Tech Writer
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
