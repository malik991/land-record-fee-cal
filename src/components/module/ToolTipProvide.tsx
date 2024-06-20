import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { useState } from "react";

export interface toolTipText {
  testDescription: string;
}

export default function ProvideToolTip({ testDescription }: toolTipText) {
  const [isOpen, setIsopen] = useState(false);

  const handleToggle = () => {
    setIsopen((prev) => !prev);
  };
  function handleMouseEnter() {
    setIsopen(true);
  }
  const handleMouseLeave = () => {
    setIsopen(false);
  };

  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger
          asChild
          onClick={handleToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleToggle}
        >
          <CircleHelp className="w-5 h-5 animate-pulse mb-1 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="max-w-[200px] p-2">
          <p className="text-nafees text-sm sm:text-base leading-tight md:font-semibold break-words">
            {testDescription}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
