"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import TooltipWrapper from "./TooltipWrapper";

export default function ViewToggle({ views }: { views: number }) {
  const [showViews, setShowViews] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // ✅ stops <Link> navigation
    e.stopPropagation(); // ✅ prevents bubbling to Card/Link
    setShowViews((prev) => !prev);
  };

  return (
    <>
      <TooltipWrapper text={showViews ? "Hide Views" : "Show Views"}>
        <button
          onClick={handleClick}
          className="flex items-center text-xs font-semibold text-pehla text-muted-foreground focus:outline-none"
          aria-label={showViews ? "Hide views count" : "Show views count"} // ✅ accessibility
        >
          {showViews ? (
            <>
              <Eye size={14} className="mr-1" />
            </>
          ) : (
            <>
              <EyeOff size={14} className="mr-1 animate-pulse" /> {views}
            </>
          )}
        </button>
      </TooltipWrapper>
    </>
  );
}
