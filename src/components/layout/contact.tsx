import Image from "next/image";
import Link from "next/link";
import FaqDialog from "./FaqDialog";
export default function ContactPage() {
  return (
    <div className="flex flex-col items-center ">
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
      <div className="flex items-center gap-x-2 pl-2">
        <div className="flex flex-col  md:mt-4 mt-2 text-center gap-y-2">
          <p className="text-sm font-semibold">
            For any queries or assistance, feel free to reach out via WhatsApp
            or book a free appointment.
          </p>
          <Link
            className="text-pehla text-lg font-semibold "
            href="https://calendly.com/mutation-fee-inheritance-share/15min"
            target="_blank"
          >
            Book a Free Appointment ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
