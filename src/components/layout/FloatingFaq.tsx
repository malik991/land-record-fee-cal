"use client";

import { useState } from "react";
import { CircleX, MessageSquareMoreIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FaqSection from "./FaqSection";
import TooltipWrapper from "./TooltipWrapper";

export default function FloatingFaq() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <TooltipWrapper text="FAQ - عمومی سوالات">
        <div
          onClick={() => setIsOpen(true)}
          className="fixed z-50 right-4 bottom-4 bg-white dark:bg-gray-900 p-3 rounded-full shadow-lg border border-gray-300 hover:scale-110 transition-transform cursor-pointer"
        >
          <MessageSquareMoreIcon
            className="text-blue-600 dark:text-blue-400"
            size={22}
          />
        </div>
      </TooltipWrapper>

      {/* FAQ Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto p-4 sm:p-8">
          <FaqSection />
        </DialogContent>
      </Dialog>
    </>
  );
}
