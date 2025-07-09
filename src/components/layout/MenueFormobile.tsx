"use client";
import {
  Github,
  LogOut,
  Settings,
  Users,
  MenuSquareIcon,
  HomeIcon,
  CalculatorIcon,
  Video,
  NotebookIcon,
  Key,
  Signpost,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export function DropdownMenuDemo() {
  const session = useSession();
  const status = session?.status;
  const userData = session?.data?.user;
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen(false);
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"} onClick={() => setOpen(!open)}>
          <MenuSquareIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        {status === "authenticated" && (
          <>
            <div className="flex items-center justify-center">
              <Avatar className="w-6 h-6">
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
              <DropdownMenuLabel>Hello, {userData?.name}</DropdownMenuLabel>
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HomeIcon className="mr-2 h-4 w-4" />
            <span className="pt-1">
              <Link href={"/#home"} onClick={handleClick}>
                Home
              </Link>
            </span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CalculatorIcon className="mr-2 h-4 w-4" />
            <span className="pt-1">
              <Link href={"/#calculator"} onClick={handleClick}>
                Calculator
              </Link>
            </span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span className="pt-1">
              <Link href={"/blog"} onClick={handleClick}>
                Blogs
              </Link>
            </span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span className="pt-1">
              <Link href={"/Inheritance"} onClick={handleClick}>
                Inheritence
              </Link>
            </span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Video className="mr-2 h-4 w-4" />
            <span className="pt-1">
              <Link href={"/#videos"} onClick={handleClick}>
                Videos
              </Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NotebookIcon className="mr-2 h-4 w-4" />
            <span className="pt-1">
              <Link href={"/#contact"} onClick={handleClick}>
                Contact
              </Link>
            </span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        {status === "unauthenticated" && (
          <>
            <DropdownMenuItem>
              <Signpost className="mr-2 h-4 w-4" />
              <Link href={"/signup"} onClick={handleClick}>
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        {status === "authenticated" ? (
          <>
            <DropdownMenuItem>
              <Button
                className="w-full flex items-center gap-x-1"
                onClick={() => signOut({ callbackUrl: "/signin" })}
              >
                <LogOut className="mr-1 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Key className="mr-2 h-4 w-4" />
              <Link href={"/signin"} onClick={handleClick}>
                Login
              </Link>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
