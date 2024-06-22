import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/Logo.svg";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
import { DropdownMenuDemo } from "./MenueFormobile";

export default function HeaderPage() {
  const navArray = [
    { name: "Tax Calculator", link: "/#calculator" },
    { name: "Instructions", link: "/#instructions" },
    { name: "Inheritence" },
    { name: "Videos", link: "/#videos" },
    { name: "Contact", link: "/" },
  ];
  return (
    <header className="sticky top-0 z-50 shadow-md shadow-card-foreground transition-shadow duration-300 hover:shadow-lg hover:shadow-card-foreground">
      <div className="flex items-center justify-between px-6 pt-4 pb-5 ">
        <nav>
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center gap-x-1">
              <Image src={logo} alt="logo" />
              <span
                className="text-pehla font-semibold pt-4 lg:font-bold"
                style={{ letterSpacing: "-1px" }}
              >
                Alrehman AI
              </span>
            </Link>
            <div className="hidden md:flex items-center lg:pl-[60px] pl-12">
              <Link href={"/#home"} className="pt-5">
                <span className="text-normal font-semibold hover:text-pehla">
                  Home
                </span>
              </Link>
              {navArray.map((item, index) => (
                <Link
                  href={item?.link ? item.link : "/"}
                  className="pt-5 lg:pl-4 pl-2"
                  key={index}
                >
                  <span className="text-normal font-semibold hover:text-pehla">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <nav className="flex items-center gap-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant={"outline"}>Login</Button>
            <Button variant={"destructive"}>Register</Button>
          </div>
          <div className="md:hidden block">
            <DropdownMenuDemo />
          </div>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
