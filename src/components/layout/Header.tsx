import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/Logo.svg";
import { ModeToggle } from "./ThemeToggle";

export default function HeaderPage() {
  return (
    <section className="mt-2">
      <header>
        <div className="flex items-center justify-between px-6 py-3">
          <nav>
            <Link href={"/"} className="flex items-center gap-x-1">
              <Image src={logo} alt="logo" />
              <span
                className="text-pehla font-semibold pt-4 lg:font-bold"
                style={{ letterSpacing: "-1px" }}
              >
                Alrehman AI
              </span>
            </Link>
          </nav>
          <nav>
            <ModeToggle />
          </nav>
        </div>
      </header>
    </section>
  );
}
