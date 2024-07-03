"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { DrawerDialogLegalHeirs } from "./LegalHeitsDetail";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const relativeNames = [
  { label: "والد", value: "abu" },
  { label: "بیوہ", value: "bewah" },
  { label: "والدہ", value: "ami" },
  { label: "شوہر", value: "shohar" },
  { label: "دادا", value: "dada" },
  { label: "دادی", value: "dadi" },
  { label: "بیٹا", value: "beta" },
  { label: "بیٹی", value: "byti" },
  { label: "بھائی", value: "bhai" },
  { label: "بہن", value: "behan" },
] as const;

const FormSchema = z.object({
  relative: z.string({
    required_error: "Please select a Heir.",
  }),
});

export function ComboboxForm() {
  const [open, setOpen] = React.useState(false);
  const [getHeirs, setHeirs] = React.useState<string[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (getHeirs.includes(data.relative)) {
      toast({
        title: "Error",
        description: "This heir | وارث has already been added.",
        variant: "destructive",
      });
      return;
    }
    const updatedHeirs = [...getHeirs, data.relative];
    setHeirs(updatedHeirs);
    toast({
      title: "آپکے وارثان منتخب ہو رہے ہیں۔",
      description: (
        <div>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              وارثان: {JSON.stringify(updatedHeirs, null, 2)}
            </code>
          </pre>
        </div>
      ),
    });
  }

  return (
    <div className="w-full flex flex-col gap-y-3">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row md:gap-x-3 gap-y-3 items-center justify-center"
          >
            <FormField
              control={form.control}
              name="relative"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "md:w-[250px] w-full justify-between text-nafees text-lg font-semibold",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? relativeNames.find(
                                (relative) => relative.value === field.value
                              )?.label
                            : "Select Heirs"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search relative..." />

                        <ScrollArea className="h-72 w-full rounded-md border">
                          <CommandList className="max-h-[500px] text-nafees text-xl font-semibold overflow-hidden text-center items-center">
                            <CommandEmpty>Not Found.</CommandEmpty>
                            <CommandGroup>
                              {relativeNames.map((relative) => (
                                <CommandItem
                                  value={relative.label}
                                  key={relative.value}
                                  onSelect={() => {
                                    form.setValue("relative", relative.value);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 ",
                                      relative.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {relative.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                          <ScrollBar orientation="vertical" />
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-pehla" />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {getHeirs.length > 0 && (
        <div className="w-full text-center">
          <DrawerDialogLegalHeirs heirs={getHeirs} />
        </div>
      )}
    </div>
  );
}