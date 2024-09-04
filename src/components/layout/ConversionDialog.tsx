import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export function ConversionDialog() {
  const [userInput, setuserInput] = useState<number>(0);
  const [outPutInFoot, setOutput] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function convertMarlaToFoot() {
    if (userInput > 0) {
      setOutput(userInput * 272);
      return;
    } else {
      return alert("write value of marla");
    }
  }

  function handleDialogChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      setOutput(0); // Reset output when dialog is closed
    }
  }
  return (
    <Dialog onOpenChange={handleDialogChange}>
      {/* <Button variant="outline">Edit Profile</Button> */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <CalculatorIcon className="w-8 h-8 animate-bounce ml-2 cursor-pointer" />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-nafees text-md font-semibold">
              مرلہ سے فٹ بنائیں
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="w-full max-w-lg mx-auto p-4 sm:max-w-md sm:p-6 md:p-8">
        <DialogHeader>
          <DialogTitle>Land Conversion Calculator</DialogTitle>
          <DialogDescription className="text-nafees text-sm font-semibold text-muted-foreground">
            زمین کی پیمائش کو مرلہ سے فٹ میں تبدیل کریں
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Marla
            </Label>
            <Input
              id="name"
              type="number"
              placeholder="write marla"
              onChange={(e) => setuserInput(e.target.valueAsNumber)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="sm:text-right">
              SQFT
            </Label>
            <Input
              id="username"
              readOnly
              value={outPutInFoot > 0 ? outPutInFoot : 0}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={convertMarlaToFoot}>
            Convert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
