"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

type TooltipWrapperProps = {
  text: string;
  children: ReactNode;
};

export default function TooltipWrapper({
  text,
  children,
}: TooltipWrapperProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="left"
          sideOffset={12}
          className="bg-black text-white px-3 py-1 rounded-md text-sm max-w-[180px]"
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
