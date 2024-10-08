import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  InheritanceProps,
  HeirWithShare,
} from "../module/InheritanceCalculation";

import { Loader } from "lucide-react";
import ContactPage from "./contact";

interface legalHeirsProps {
  heirs: string[];
}

export function DrawerDialogLegalHeirs({ heirs }: legalHeirsProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="w-1/2">
            <span className="w-full text-nafees p-3 text-lg font-semibold">
              منتخب کردہ وارثان دیکھیں
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your Selected Legal Heirs</DialogTitle>
            <DialogDescription className="flex flex-col items-end gap-y-1">
              <span className="pr-2 text-nafees text-lg text-pehla font-semibold whitespace-nowrap">
                تمام وارثان کی تعداد لکیھں۔
              </span>
              <span className="pr-2 text-lg text-nafees text-pehla font-semibold whitespace-nowrap">
                اگر متوفی کا بیٹا ہے تو بھائی یا بہن مت چنیں۔
              </span>
            </DialogDescription>
          </DialogHeader>
          <ProfileForm heirs={heirs} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" className="w-full">
          <span className="w-full p-3 text-nafees text-lg font-semibold">
            منتخب کردہ وارثان دیکھیں
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Your Selected Legal Heirs</DrawerTitle>
          <DrawerDescription className="flex flex-col items-end gap-y-2">
            <span className="pr-2 text-nafees text-lg text-pehla font-semibold whitespace-nowrap">
              تمام وارثان کی تعداد لکیھں۔
            </span>
            <span className="pr-2 text-lg text-nafees text-pehla font-semibold whitespace-nowrap">
              اگر متوفی کا بیٹا ہے تو بھائی یا بہن مت چنیں۔
            </span>
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm heirs={heirs} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface ProfileFormProps {
  heirs: string[];
  className?: string;
}

const heirSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

const kanalMarlaFootSchema = z.object({
  kanal: z.number().min(0, { message: "Enter 0 or above" }),
  marla: z.number().min(0, { message: "Enter 0 or above" }),
  foot: z.number().min(0, { message: "Enter 0 or above" }),
});

export const FormSchemaHeir = z.object({
  heirs: z.array(heirSchema),
  land: kanalMarlaFootSchema,
});

function ProfileForm({ heirs, className }: ProfileFormProps) {
  const [result, setResult] = React.useState<HeirWithShare[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loadBtn, setLoadBtn] = React.useState(false);
  const [heirsList, setHeirsList] = React.useState(heirs);
  const [dialogOpen, setdialogOpen] = React.useState(false);
  const defaultValues = {
    heirs: heirs.map(() => ({ quantity: 1 })),
    land: {
      kanal: undefined,
      marla: undefined,
      foot: undefined,
    },
  };
  const form = useForm<z.infer<typeof FormSchemaHeir>>({
    resolver: zodResolver(FormSchemaHeir),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof FormSchemaHeir>) => {
    setLoadBtn(true);
    const submittedQuantities = heirsList.map((heir, index) => ({
      heir,
      quantity: data.heirs[index].quantity,
    }));
    const inputParams: InheritanceProps = {
      allHeirs: submittedQuantities,
      landArea: data.land,
    };

    //const calculatedResult = InheritanceCal(inputParams);
    const response = await fetch("/api/inheritance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputParams),
    });
    if (!response.ok) {
      setLoadBtn(false);
      throw new Error("Network response was not ok");
    }

    const calculatedResult = await response.json();
    setLoadBtn(false);
    //console.log(calculatedResult);

    if ("errorUsbah" in calculatedResult) {
      setError(calculatedResult.errorUsbah);
      setResult(null);
    } else {
      setError(null);
      setResult(calculatedResult.allHeirs);
    }
    setdialogOpen(true);
    //console.log("all data: ", data.heirs, " land ", data.land);
    // toast({
    //   title: "Submitted quantities",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         {JSON.stringify(
    //           { Heirs: submittedQuantities, Land: landData },
    //           null,
    //           2
    //         )}
    //       </code>
    //     </pre>
    //   ),
    // });
  };

  const handleDelete = (index: number) => {
    setHeirsList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col items-center gap-4", className)}
      >
        <ScrollArea className="h-72 w-full rounded-md border">
          <div className="p-3 flex flex-col gap-y-3">
            {heirsList.map((heir, index) => (
              <div key={heir} className="grid grid-cols-3 gap-2 items-center">
                <Label>{heir}</Label>
                <FormField
                  control={form.control}
                  name={`heirs.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="تعداد لیکھیں"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                          className="col-span-1"
                        />
                      </FormControl>
                      <FormMessage className="text-pehla">
                        {
                          form.formState.errors.heirs?.[index]?.quantity
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button variant="outline" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </div>
            ))}
            {heirsList?.length > 0 ? (
              <>
                <div className="mx-auto my-1 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                  <span className="text-xs">Write Land Area 👇</span>
                </div>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <FormField
                    control={form.control}
                    name="land.kanal"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Kanal"
                            value={field.value === undefined ? "" : field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(
                                value === "" ? undefined : Number(value)
                              );
                            }}
                            className="col-span-1"
                          />
                        </FormControl>
                        <FormMessage className="text-pehla">
                          {form.formState.errors.land?.kanal?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="land.marla"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Marla"
                            value={field.value === undefined ? "" : field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(
                                value === "" ? undefined : Number(value)
                              );
                            }}
                            className="col-span-1"
                          />
                        </FormControl>
                        <FormMessage className="text-pehla">
                          {form.formState.errors.land?.marla?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="land.foot"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Foot"
                            value={field.value === undefined ? "" : field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(
                                value === "" ? undefined : Number(value)
                              );
                            }}
                            className="col-span-1"
                          />
                        </FormControl>
                        <FormMessage className="text-pehla" />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              <p>please select Heirs from main screen</p>
            )}
          </div>
        </ScrollArea>

        {heirsList?.length > 0 && (
          <Button type="submit" disabled={loadBtn} className="w-full">
            {loadBtn ? (
              <div className="flex items-center space-x-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Please wait...</span>
              </div>
            ) : (
              "Calculate"
            )}
          </Button>
        )}
        <Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
          <DialogContent className="max-w-[350px] md:max-w-lg mx-auto">
            <DialogHeader>
              <DialogTitle>Final Result</DialogTitle>
              <DialogDescription>
                <div className="flex md:flex-row flex-col md:gap-x-2 gap-y-1 items-center">
                  <span className="text-lg">for more detail:</span>
                  <ContactPage />
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 flex flex-col items-center">
              <h1 className="text-nafees font-semibold lg:text-4xl text-xl leading-3">
                وارثان کے حصے
              </h1>
              <div className="mt-5 text-sm text-muted-foreground">
                {error ? (
                  <div className="text-red-600">{error}</div>
                ) : (
                  <ScrollArea className="h-72 md:w-64 w-48 rounded-md border">
                    <div className="p-6 grid grid-cols-2 gap-4">
                      <div className="font-bold text-lg">Heir</div>
                      {/* <div className="font-bold">Share</div> */}
                      <div className="font-bold text-lg">K-M-F</div>
                      {result &&
                        result.map((heir) => (
                          <React.Fragment key={heir.heir}>
                            <div>{heir.heir}</div>
                            {/* <div>{heir.share}</div> */}
                            <div>{heir.landArea}</div>
                          </React.Fragment>
                        ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
