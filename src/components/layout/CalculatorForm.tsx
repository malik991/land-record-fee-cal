"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import React, { useEffect, useState } from "react";
import { mutationTypeArray } from "../module/muttaionType";
import { AllParams, zaraiTaxCalculation } from "../module/TaxCalculation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formSchema } from "@/schemas/MainFormSchema";
import HeaderSectionPage from "@/app/compo/headerSection";
import ZaraiSakniTaxFunction, {
  UrbanTaxFunction,
} from "../module/UrbanTaxCalculation";
import { ConversionDialog } from "./ConversionDialog";
import useScrollToError from "../module/useScrollToError";

export default function FormCalculatorPage() {
  const [isLandValueVisible, setIsLandValue] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landValue: 0,
      mutationType: "",
      type: "zarai",
      plotType: "",
      landArea: undefined,
      tmaMapApprovedOrNot: "",
      constructedArea: undefined,
      numberOfFloors: "",
      floorsArea: undefined,
    },
  });
  const transferMode = form.watch("transferType");
  const mutatonType = form.watch("mutationType");
  const areaType = form.watch("type");
  const plotType = form.watch("plotType");
  const tmaMapAvailableOrNot = form.watch("tmaMapApprovedOrNot");
  const numberOfFloors = form.watch("numberOfFloors");
  const [finalAmountResult, setFinalAmountResult] = useState<any[]>([]);
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    form.setValue("plotType", "");
    form.setValue("landArea", undefined);
  }, [form.setValue, areaType]);

  useEffect(() => {
    if (plotType === "empty") {
      form.setValue("tmaMapApprovedOrNot", "");
      form.setValue("constructedArea", undefined);
      form.setValue("floorsArea", undefined);
      form.setValue("numberOfFloors", "");
    } else {
      form.setValue("constructedArea", undefined);
      form.setValue("numberOfFloors", "");
    }
  }, [plotType, tmaMapAvailableOrNot]);

  useEffect(() => {
    setFinalAmountResult([]);
    form.setValue("type", "zarai");
    form.setValue("tmaMapApprovedOrNot", "");
    form.setValue("constructedArea", undefined);
    form.setValue("plotType", "");
    form.setValue("landArea", undefined);
    form.setValue("numberOfFloors", "");
    form.setValue("floorsArea", undefined);
  }, [transferMode]);

  useEffect(() => {
    setFinalAmountResult([]);
    form.setValue("landArea", undefined);
    setDisplayValue("");
    if (transferMode === "Registery") {
      form.setValue("landValue", 1);
      form.setValue("constructedArea", undefined);
      form.setValue("floorsArea", undefined);
      form.setValue("numberOfFloors", "");
      form.setValue("plotType", "");
      form.setValue("tmaMapApprovedOrNot", "");
    }

    if (
      mutatonType === "وراثت" ||
      mutatonType === "آڑرہن" ||
      mutatonType === "تملیک" ||
      mutatonType === "فک-آڑرہن"
    ) {
      setIsLandValue(false);
      form.setValue("landValue", 1);
      form.clearErrors("landValue"); // clear previous errors
    } else {
      form.setValue("landValue", 0);
      setIsLandValue(true);
      form.trigger("landValue");
    }
  }, [mutatonType, form.clearErrors, form.trigger]);

  useScrollToError(form.formState.errors); // Use the custom hook

  // Helper function to format number with commas
  const formatNumber = (value: number) => {
    // Format with commas
    return value.toLocaleString("en-US");
  };
  const parseNumber = (value: string) => {
    return value.replace(/,/g, "");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values);
    setFinalAmountResult([]);
    if (values.transferType === "Intiqal") {
      const inputParams: AllParams = {
        transferType: values.transferType,
        mutationType: values.mutationType,
        landType: values.type,
        totalAmount: values.landValue,
      };
      const result = zaraiTaxCalculation(inputParams);
      if (result?.length > 0) {
        setFinalAmountResult(result);
      }
    } else if (values.transferType === "Registery") {
      //console.log(values);
      let outPut = [];
      if (values.type === "sakni" || values.type === "zarai") {
        outPut = ZaraiSakniTaxFunction(values);
      } else {
        outPut = UrbanTaxFunction(values);
      }
      if (outPut?.length > 0) {
        setFinalAmountResult(outPut);
      }
    }
  }
  return (
    <section className="mt-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center p-3 gap-y-7">
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
          {/* header section of form */}
          <div className="w-full p-3">
            <HeaderSectionPage
              header="FILL TAX FORM"
              subHeader="ٹیکس کیلکولیٹر فارم"
              isVisible={true}
            />
          </div>
          {/* form div */}
          <div className="lg:w-1/2 w-full p-3 rounded-lg shadow-md shadow-card-foreground transition-shadow duration-300 hover:shadow-xl hover:shadow-card-foreground ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 p-3"
              >
                <FormField
                  control={form.control}
                  name="transferType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Select Transfer Type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="please select mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Intiqal">
                            <span className="text-nafees text-lg">انتقال</span>
                            <span className=""> - mutation</span>
                          </SelectItem>
                          <SelectItem value="Registery">
                            <span className="text-nafees text-lg">رجسٹری</span>
                            <span className=""> - registry deed</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage className="font-semibold text-pehla" />
                    </FormItem>
                  )}
                />
                {(transferMode === "Registery" ||
                  transferMode === "Intiqal") && (
                  <div className="flex flex-col space-y-5">
                    <FormField
                      control={form.control}
                      name="mutationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="">
                            {transferMode === "Intiqal"
                              ? "Mutation Type"
                              : "Registry Type"}
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="please select type" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent className="text-nafees">
                              <ScrollArea className="h-auto w-full">
                                {mutationTypeArray.map((type) => (
                                  <React.Fragment key={type}>
                                    <SelectItem
                                      value={type}
                                      className="text-nafees font-bold text-lg"
                                      style={{ textAlign: "right" }}
                                    >
                                      {type}
                                    </SelectItem>
                                    <Separator className="my-2" />
                                  </React.Fragment>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>

                          <FormMessage className="font-semibold text-pehla" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            <div className="flex gap-x-2 items-center ">
                              <span>Select Land Type</span>
                              <span className="text-nafees md:text-lg text-md font-bold text-dooja">
                                ( زمین کی قسم )
                              </span>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="w-full flex items-center gap-x-3 ">
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="zarai" />
                                  </FormControl>
                                  <FormLabel className="text-nafees md:text-lg text-sm font-bold ">
                                    زرعی
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="sakni" />
                                  </FormControl>
                                  <FormLabel className="text-nafees md:text-lg text-xs font-semibold">
                                    سکنی زرعی
                                  </FormLabel>
                                </FormItem>

                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem
                                      value="urban"
                                      disabled={
                                        transferMode === "Intiqal"
                                          ? true
                                          : false
                                      }
                                    />
                                  </FormControl>
                                  <FormLabel
                                    className={`text-nafees md:text-lg text-xs font-semibold ${
                                      transferMode === "Intiqal" &&
                                      "text-muted-foreground"
                                    } `}
                                  >
                                    اندرون حدود / ریٹنگ ایریا
                                  </FormLabel>
                                </FormItem>
                                <ConversionDialog />
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="font-semibold text-pehla" />
                        </FormItem>
                      )}
                    />
                    {areaType === "urban" && mutatonType !== "وراثت" && (
                      <div className="flex flex-col space-y-5">
                        <FormField
                          control={form.control}
                          name="plotType"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>
                                <div className="flex gap-x-2 items-center ">
                                  <span>Plot Type</span>
                                  <span className="text-nafees md:text-lg text-md font-bold text-dooja">
                                    ( پلاٹ کا انتخاب )
                                  </span>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="w-full flex items-center gap-x-3 ">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="empty" />
                                      </FormControl>
                                      <FormLabel className="text-nafees md:text-lg text-sm font-bold ">
                                        خالی پلاٹ
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="construct" />
                                      </FormControl>
                                      <FormLabel className="text-nafees md:text-lg text-sm font-semibold">
                                        بلڈنگ / عمارت
                                      </FormLabel>
                                    </FormItem>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="font-semibold text-pehla" />
                            </FormItem>
                          )}
                        />
                        {plotType === "construct" && (
                          <FormField
                            control={form.control}
                            name="tmaMapApprovedOrNot"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>
                                  <div className="flex gap-x-2 items-center ">
                                    <span>Approved TMA Map Available</span>
                                    <span className="text-nafees md:text-lg text-md font-bold text-dooja">
                                      ( منظور شدہ نقشہ ہے؟ )
                                    </span>
                                  </div>
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <div className="w-full flex items-center gap-x-3 ">
                                      <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="yes" />
                                        </FormControl>
                                        <FormLabel className="text-nafees md:text-lg text-sm font-bold ">
                                          ہاں
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="no" />
                                        </FormControl>
                                        <FormLabel className="text-nafees md:text-lg text-sm font-semibold">
                                          نہیں
                                        </FormLabel>
                                      </FormItem>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage className="font-semibold text-pehla" />
                              </FormItem>
                            )}
                          />
                        )}
                        {plotType === "construct" &&
                          tmaMapAvailableOrNot === "yes" && (
                            <>
                              <FormField
                                control={form.control}
                                name="constructedArea"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      <div className="flex gap-x-2 items-center ">
                                        <span>Ground Covered Area(Sqft)</span>
                                        <span className="text-nafees md:text-md text-sm font-bold text-dooja">
                                          (زمینی منزل کا تعمیری رقبہ فٹ میں)
                                        </span>
                                      </div>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="text-nafeed"
                                        type="number"
                                        placeholder="رقبہ کو فٹ میں لکھیں"
                                        {...field}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          field.onChange(
                                            value === ""
                                              ? undefined
                                              : Number(value)
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage className="font-semibold text-pehla" />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="numberOfFloors"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="">
                                      Total Floors
                                    </FormLabel>
                                    <Select onValueChange={field.onChange}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue
                                            className="text-nafees text-sm font-semibold"
                                            placeholder="عمارت کی منزلیں"
                                          />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="0">0</SelectItem>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="6">6</SelectItem>
                                      </SelectContent>
                                    </Select>

                                    <FormMessage className="font-semibold text-pehla" />
                                  </FormItem>
                                )}
                              />
                              {numberOfFloors !== "0" &&
                                numberOfFloors !== "" && (
                                  <FormField
                                    control={form.control}
                                    name="floorsArea"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          <div className="flex gap-x-2 items-center ">
                                            <span>All Floors Area(Sqft)</span>
                                            <span className="text-nafees md:text-md text-sm font-bold text-dooja">
                                              (منازل رقبہ فٹ میں)
                                            </span>
                                          </div>
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              field.onChange(
                                                value === ""
                                                  ? undefined
                                                  : Number(value)
                                              );
                                            }}
                                          />
                                        </FormControl>
                                        <FormMessage className="font-semibold text-pehla" />
                                      </FormItem>
                                    )}
                                  />
                                )}
                            </>
                          )}

                        <FormField
                          control={form.control}
                          name="landArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <div className="flex gap-x-2 items-center ">
                                  <span>Plot Area(Sqft)</span>
                                  <span className="text-nafees md:text-md text-sm font-bold text-dooja">
                                    (کل رقبہ فٹ میں)
                                  </span>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="text-nafeed"
                                  type="number"
                                  placeholder="رقبہ کو فٹ میں لکھیں"
                                  {...field}
                                  onChange={
                                    (e) => {
                                      const value = e.target.value;
                                      field.onChange(
                                        value === "" ? undefined : Number(value)
                                      );
                                    }
                                    //field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage className="font-semibold text-pehla" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    {transferMode === "Registery" &&
                      areaType === "sakni" &&
                      mutatonType === "تملیک" && (
                        <FormField
                          control={form.control}
                          name="landArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <div className="flex gap-x-2 items-center ">
                                  <span>Plot Area(Sqft)</span>
                                  <span className="text-nafees md:text-md text-sm font-bold text-dooja">
                                    (کل رقبہ فٹ میں)
                                  </span>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="text-nafeed"
                                  type="number"
                                  //disabled={!isLandValueVisible}
                                  placeholder="رقبہ کو فٹ میں لکھیں"
                                  {...field}
                                  onChange={
                                    (e) => {
                                      const value = e.target.value;
                                      field.onChange(
                                        value === "" ? undefined : Number(value)
                                      );
                                    }
                                    //field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage className="font-semibold text-pehla" />
                            </FormItem>
                          )}
                        />
                      )}
                    <FormField
                      control={form.control}
                      name="landValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex gap-x-2 items-center">
                              <span
                                className={`${
                                  mutatonType === "وراثت" &&
                                  "text-muted-foreground"
                                }`}
                              >
                                Total Amount
                              </span>
                              <span
                                className={`text-nafees ${
                                  mutatonType === "وراثت"
                                    ? "text-muted-foreground"
                                    : "md:text-md text-sm font-bold text-dooja"
                                }`}
                              >
                                (مکمل قیمت جتنے میں لین دین ہوا)
                              </span>
                            </div>
                          </FormLabel>
                          {/* <FormControl>
                            <Input
                              type="number"
                              disabled={!isLandValueVisible}
                              placeholder="enter amount in PKR"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl> */}
                          <FormControl>
                            <Input
                              type="text" // Use text input for formatting
                              disabled={!isLandValueVisible}
                              placeholder="enter amount in PKR"
                              {...field}
                              onChange={(e) => {
                                const rawValue = e.target.value;
                                const parsedValue = parseNumber(rawValue);
                                const numericValue = parseFloat(parsedValue);

                                if (!isNaN(numericValue)) {
                                  field.onChange(numericValue);
                                  setDisplayValue(formatNumber(numericValue));
                                } else {
                                  setDisplayValue(rawValue);
                                }
                              }}
                              value={displayValue}
                              onBlur={() =>
                                setDisplayValue(formatNumber(field.value))
                              }
                            />
                          </FormControl>
                          <FormMessage className="font-semibold text-pehla" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
        {/* final result div */}
        <div className="lg:w-[800px] w-full flex md:flex-row flex-col items-center justify-center md:gap-x-6 gap-y-6 md:p-5 ">
          {finalAmountResult?.length > 0 && (
            <>
              <Accordion
                type="single"
                collapsible
                className="w-full shadow-md rounded-md shadow-card-foreground md:px-4 px-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-lg font-semibold tracking-tight">
                        FOR FILER
                      </span>
                      <span className="pt-1">👇</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="md:w-[350px] w-full">
                      <CardHeader className="bg-slate-100 m-2 rounded-lg py-3">
                        <CardTitle className="text-center text-dooja">
                          TAX FOR FILER
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {Object.keys(finalAmountResult[0]).map((key) => (
                          <div
                            key={key}
                            className="w-full flex items-center justify-between mt-2 md:px-3 px-2 py-2 shadow-sm shadow-dooja/40"
                          >
                            <span className="text-sm font-semibold">
                              {key}:
                            </span>{" "}
                            {formatNumber(finalAmountResult[0][key])}
                          </div>
                        ))}
                      </CardContent>
                      {mutatonType !== "تملیک" && mutatonType !== "وراثت" ? (
                        <CardFooter>
                          <span className="text-md font-semibold text-pehla tracking-tighter">
                            * Applicant will show the tax exemption certificate
                            for 7E.
                          </span>
                        </CardFooter>
                      ) : (
                        <CardFooter>
                          {mutatonType !== "وراثت" && (
                            <span className="text-nafees text-md font-semibold text-pehla items-end">
                              1٪ مکمل رقم یا شیڈول ریٹ کا ایک فیصد
                            </span>
                          )}
                        </CardFooter>
                      )}
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion
                type="single"
                collapsible
                className="w-full shadow-md rounded-md shadow-card-foreground md:px-4 px-1"
              >
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-lg font-semibold tracking-tight">
                        FOR NON-FILER
                      </span>
                      <span className="pt-1">👇</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="md:w-[350px] w-full">
                      <CardHeader className="bg-slate-100 m-2 rounded-lg py-3">
                        <CardTitle className="text-center text-pehla">
                          TAX FOR NON-FILER
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="">
                        {Object.keys(finalAmountResult[1]).map((key) => (
                          <div
                            key={key}
                            className="w-full flex items-center justify-between mt-2 md:px-3 px-2 py-2 shadow-sm shadow-dooja/40"
                          >
                            <span className="text-sm font-semibold">
                              {key}:
                            </span>{" "}
                            {formatNumber(finalAmountResult[1][key])}
                          </div>
                        ))}
                      </CardContent>
                      {mutatonType !== "تملیک" && mutatonType !== "وراثت" ? (
                        <CardFooter>
                          <span className="text-md font-semibold text-pehla">
                            * TAX 7E WILL BE APPLIED.
                          </span>
                        </CardFooter>
                      ) : (
                        <CardFooter>
                          {mutatonType !== "وراثت" && (
                            <span className="text-nafees text-md font-semibold text-pehla items-end">
                              1٪ مکمل رقم یا شیڈول ریٹ کا ایک فیصد
                            </span>
                          )}
                        </CardFooter>
                      )}
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
