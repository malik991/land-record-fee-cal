"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FaqSection from "./FaqSection";

export default function FaqDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open FAQs</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <FaqSection />
      </DialogContent>
    </Dialog>
  );
}
