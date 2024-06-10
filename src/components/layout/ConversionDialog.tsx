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

export function ConversionDialog() {
  return (
    <Dialog>
      {/* <Button variant="outline">Edit Profile</Button> */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <CalculatorIcon className="w-8 h-8 ml-2 cursor-pointer" />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-nafees text-md font-semibold">
              مرلہ سے فٹ بنائیں
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="md:max-w-[425px] max-w-[325px] m-1 ">
        <DialogHeader>
          <DialogTitle>Land Conversion Calculator</DialogTitle>
          <DialogDescription className="text-nafees text-sm font-semibold text-muted-foreground">
            زمین کی پیمائش کو مختلف یونٹ میں تبدیل کریں.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
