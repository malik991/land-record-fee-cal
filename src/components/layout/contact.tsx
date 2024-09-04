import Image from "next/image";
import Link from "next/link";
export default function ContactPage() {
  return (
    <div className="flex flex-col items-start gap-y-2">
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
      <div className="pl-2">
        <Link
          className="text-pehla text-lg font-semibold"
          href="https://calendly.com/mutation-fee-inheritance-share/15min"
          target="_blank"
        >
          Book a Free Appointment ↗
        </Link>
      </div>
    </div>
  );
}
