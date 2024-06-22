"use client";
import {
  Github,
  LifeBuoy,
  LogOut,
  Settings,
  Users,
  MenuSquareIcon,
  HomeIcon,
  CalculatorIcon,
  Video,
  NotebookIcon,
} from "lucide-react";

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

export function DropdownMenuDemo() {
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
              <Link href={"/#instructions"} onClick={handleClick}>
                Instructions
              </Link>
            </span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span className="pt-1">
              <Link href={"/"} onClick={handleClick}>
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
              <Link href={"/"} onClick={handleClick}>
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
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
