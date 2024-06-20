import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export interface ToolTipText {
  testDescription: string;
}

export default function ProvideToolTip({ testDescription }: ToolTipText) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault(); // Prevent default touch behavior
    setIsOpen(true);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault(); // Prevent default touch behavior
    // Keep the tooltip open for a brief period after touch end
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 1000); // Adjust the delay as needed
  };

  useEffect(() => {
    const triggerElement = triggerRef.current;

    if (triggerElement) {
      triggerElement.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      triggerElement.addEventListener("touchend", handleTouchEnd, {
        passive: false,
      });

      return () => {
        triggerElement.removeEventListener("touchstart", handleTouchStart);
        triggerElement.removeEventListener("touchend", handleTouchEnd);
        // Clear any timeout when component unmounts or re-renders
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, []);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger
          asChild
          onClick={handleToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={triggerRef}>
            <CircleHelp className="w-5 h-5 mb-1 animate-pulse cursor-pointer" />
          </div>
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
