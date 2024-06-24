import Image from "next/image";
export default function ContactPage() {
  return (
    <div className="flex items-center gap-x-2">
      <a
        href="https://wa.me/923157473743"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={"/whatsapp.png"}
          alt="WhatsApp icon"
          width={40}
          height={40}
          className="cursor-pointer"
        />
      </a>
      <a
        href="https://wa.me/923157473743"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold underline"
      >
        +92 315 7473 743
      </a>
    </div>
  );
}
