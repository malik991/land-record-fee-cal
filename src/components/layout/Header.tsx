"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/Logo.svg";
import logo1 from "../../../public/logo1-compress.png";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { DropdownMenuDemo } from "./MenueFormobile";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface authParams {
  name: string;
  status: string;
}

export default function HeaderPage() {
  const session = useSession();
  const userData = session.data?.user;
  let userName: any = userData?.name;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  function UserAuthentication({ name, status }: authParams) {
    if (status === "loading") {
      return <Loader className="w-5 h-5 animate-spin" />;
    } else if (status === "authenticated") {
      return (
        <>
          <div className="flex items-center gap-x-1">
            <Avatar>
              <AvatarImage
                src={
                  userData?.image
                    ? userData?.image!
                    : "https://github.com/shadcn.png"
                }
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="whitespace-nowrap italic pt-2">Hello, {name}</span>
          </div>

          <Button onClick={() => signOut({ callbackUrl: "/signin" })}>
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button variant={"outline"}>
            <Link href={"/signin"} className="font-semibold">
              Login
            </Link>
          </Button>
          <Button variant={"destructive"}>
            <Link href={"/signup"} className="font-semibold">
              Register
            </Link>
          </Button>
        </>
      );
    }
  }
  const navArray = [
    { name: "Tax Calculator", link: "/#calculator" },
    { name: "Instructions", link: "/#instructions" },
    { name: "Inheritence | وراثت", link: "/Inheritance" },
    { name: "Videos", link: "/#videos" },
    { name: "Contact", link: "/#contact" },
  ];
  return (
    <header
      className="sticky top-0 z-50 bg-white bg-opacity-60 shadow-md 
    shadow-card-foreground transition-shadow duration-300 hover:shadow-lg hover:shadow-card-foreground backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6  ">
        <nav>
          <div className="flex items-center lg:pl-5">
            <Link href={"/"} className="flex items-center gap-x-1">
              <Image src={logo1} alt="logo" width={100} height={100} />
              {/* <span
                className="text-pehla font-semibold pt-4 lg:font-bold"
                style={{ letterSpacing: "-1px" }}
              >
                Alrehman AI
              </span> */}
            </Link>
            <div className="hidden md:flex items-center lg:pl-[45px] pl-12 pt-2">
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
        <nav className="flex items-center gap-x-3 pt-4">
          <div className="hidden md:flex items-center space-x-3">
            <UserAuthentication name={userName} status={session?.status} />
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
