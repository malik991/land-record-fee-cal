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
          <Button variant="default" className="w-full">
            <span className="w-full text-nafees p-3 text-xl font-semibold tracking-widest">
              تعداد وارثان و رقبہ لکیھں۔
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-base text-muted-foreground">
              Your Selected Legal Heirs are:
            </DialogTitle>
            <DialogDescription>
              <div className="w-full text-right bg-amber-50 border border-amber-200 rounded-md p-3 space-y-2 text-amber-800 md:text-[16px] text-sm font-semibold text-nafees">
                <ol className="list-decimal list-inside space-y-1">
                  <li>تمام وارثان کی تعداد لکیھں۔</li>
                  <li>رقبہ کو کنال مرلہ اور فٹ میں لکھیں۔</li>
                  <li>
                    رقبہ کی فیلڈ کو خالی مت چھوڑیں- خالی کی جگہ 0 یا صفر لکھیں۔
                  </li>
                </ol>
              </div>
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
          <span className="w-full p-3 text-nafees text-lg font-semibold tracking-widest">
            تعداد وارثان و رقبہ لکیھں۔
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center text-base text-muted-foreground">
            Your Selected Legal Heirs
          </DrawerTitle>
          <DrawerDescription>
            <div className="w-full text-right bg-amber-50 border border-amber-200 rounded-md p-3 space-y-2 text-amber-800 md:text-[16px] text-sm font-semibold text-nafees">
              <ol className="list-decimal list-inside space-y-1">
                <li>تمام وارثان کی تعداد لکیھں۔</li>
                <li>رقبہ کو کنال مرلہ اور فٹ میں لکھیں۔</li>
                <li>
                  رقبہ کی فیلڈ کو خالی مت چھوڑیں- خالی کی جگہ 0 یا صفر لکھیں۔
                </li>
              </ol>
            </div>
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
              "Calculate Shares"
            )}
          </Button>
        )}
        <Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
          <DialogContent className="max-w-[400px] md:max-w-lg mx-auto p-0 overflow-hidden">
            <div className="flex flex-col">
              <div className="bg-pehla text-primary-foreground p-4 text-center">
                <h2 className="text-xl font-bold tracking-wide">
                  🏠 وارثان کے حصے (Final Result)
                </h2>
                <p className="text-base opacity-80 mt-1 text-nafees tracking-wider font-semibold">
                  تقسیم کا خلاصہ نیچے دیا گیا ہے۔
                </p>
              </div>
              <div className="p-4 flex flex-col gap-y-4">
                {error ? (
                  <div className="text-red-600 text-center">{error}</div>
                ) : result ? (
                  <>
                    <ScrollArea className="h-72 w-full rounded-md border border-muted shadow-inner">
                      <div className="divide-y divide-muted p-2">
                        {result.map((heir, index) => {
                          const [kanal, marla, foot] = (
                            heir.landArea ?? "0-0-0"
                          ).split("-");

                          return (
                            <div
                              key={heir.heir}
                              className={cn(
                                "rounded border border-muted p-3 flex flex-col shadow hover:shadow-md transition mt-2",
                                index % 2 === 0 ? "bg-dooja/20" : "bg-pehla/20"
                              )}
                            >
                              {/* Card Header */}
                              <div className="flex justify-between items-center border-b pb-2 mb-2">
                                <span className="font-bold text-primary flex items-center gap-1 text-lg">
                                  👤 {heir.heir}
                                </span>
                                <span className="text-xs font-semibold text-muted-foreground">
                                  K-M-F
                                </span>
                              </div>
                              {/* Card Body */}
                              <div className="flex justify-around text-center">
                                <div className="flex flex-col">
                                  <span className="bg-emerald-100 text-emerald-700 rounded px-1">
                                    {kanal}
                                  </span>
                                  <span className="text-xs">Kanal</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="bg-emerald-100 text-emerald-700 rounded px-1">
                                    {marla}
                                  </span>
                                  <span className="text-xs">Marla</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="bg-emerald-100 text-emerald-700 rounded px-1">
                                    {foot}
                                  </span>
                                  <span className="text-xs">Foot</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                    <div className="flex justify-center text-muted-foreground text-lg mt-2 text-nafees tracking-wider">
                      مزید تفصیلات کے لیے نیچے دیے گئے بٹن پر کلک کریں
                    </div>
                    <div className="flex justify-center">
                      <ContactPage />
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">
                    کوئی ڈیٹا دستیاب نہیں
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
