"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { mutationTypeArray } from "../module/muttaionType";
import { AllParams, zaraiTaxCalculation } from "../module/TaxCalculation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formSchema } from "@/schemas/MainFormSchema";
import { fromTheme } from "tailwind-merge";

export default function FormCalculatorPage() {
  const [isLandValueVisible, setIsLandValue] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landValue: 0,
      mutationType: "",
      type: "zarai",
      plotType: "",
      landArea: 0,
      tmaMapApprovedOrNot: "",
      constructedArea: 0,
    },
  });
  const transferMode = form.watch("transferType");
  const mutatonType = form.watch("mutationType");
  const areaType = form.watch("type");
  const plotType = form.watch("plotType");
  const tmaMapAvailableOrNot = form.watch("tmaMapApprovedOrNot");
  const [finalAmountResult, setFinalAmountResult] = useState<any[]>([]);

  useEffect(() => {
    form.setValue("plotType", "");
    form.setValue("landArea", 0);
  }, [form.setValue, areaType]);

  useEffect(() => {
    if (plotType === "empty") {
      form.setValue("tmaMapApprovedOrNot", "");
      form.setValue("constructedArea", 0);
    } else {
      form.setValue("constructedArea", 0);
    }
  }, [plotType, tmaMapAvailableOrNot]);

  useEffect(() => {
    form.setValue("type", "zarai");
    form.setValue("tmaMapApprovedOrNot", "");
    form.setValue("constructedArea", 0);
    form.setValue("plotType", "");
    form.setValue("landArea", 0);
  }, [transferMode]);

  useEffect(() => {
    setFinalAmountResult([]);
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
      console.log(values);

      // const urbanInputParams: AllParams = {
      //   transferType: values.transferType,
      //   mutationType: values.mutationType,
      //   landType: values.type,
      //   totalAmount: values.landValue,
      // };
    }
  }
  return (
    <section className="mt-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center p-3 gap-y-3">
        <div className="md:w-1/3 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

                    <FormMessage />
                  </FormItem>
                )}
              />
              {(transferMode === "Registery" || transferMode === "Intiqal") && (
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
                            {mutationTypeArray.map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className="text-nafees font-bold text-lg"
                                style={{ textAlign: "right" }}
                              >
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
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
                                <FormLabel className="text-nafees md:text-lg text-sm font-semibold">
                                  سکنی زرعی
                                </FormLabel>
                              </FormItem>

                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="urban"
                                    disabled={
                                      transferMode === "Intiqal" ? true : false
                                    }
                                  />
                                </FormControl>
                                <FormLabel
                                  className={`text-nafees md:text-lg text-sm font-semibold ${
                                    transferMode === "Intiqal" &&
                                    "text-muted-foreground"
                                  } `}
                                >
                                  اندرون حدود / ریٹنگ ایریا
                                </FormLabel>
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
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
                            <FormMessage />
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
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      {plotType === "construct" && (
                        <FormField
                          control={form.control}
                          name="constructedArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <div className="flex gap-x-2 items-center ">
                                  <span>Covered Area(Marla)</span>
                                  <span className="text-nafees md:text-md text-sm font-bold text-dooja">
                                    (تعمیر شدہ رقبہ مرلہ میں)
                                  </span>
                                </div>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="text-nafeed"
                                  type="number"
                                  disabled={
                                    tmaMapAvailableOrNot === "no" ? true : false
                                  }
                                  placeholder="رقبہ کو مرلہ میں لکھیں"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="landArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex gap-x-2 items-center ">
                                <span>Plot Area(Marla)</span>
                                <span className="text-nafees md:text-md text-sm font-bold text-dooja">
                                  (کل رقبہ مرلہ میں)
                                </span>
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="text-nafeed"
                                type="number"
                                //disabled={!isLandValueVisible}
                                placeholder="رقبہ کو مرلہ میں لکھیں"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                        <FormControl>
                          <Input
                            type="number"
                            disabled={!isLandValueVisible}
                            placeholder="enter amount in PKR"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
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
        <div className="w-full flex lg:flex-row flex-col items-center justify-center lg:gap-x-4 gap-y-3 p-3">
          {finalAmountResult?.length > 0 && (
            <>
              <Card className="w-[350px]">
                <CardHeader className="bg-slate-100 m-2 rounded-lg py-3">
                  <CardTitle className="text-center text-dooja">
                    TAX FOR FILER
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(finalAmountResult[0]).map((key) => (
                    <div
                      key={key}
                      className="w-full flex items-center justify-between mt-2 px-3 py-2 shadow-sm shadow-dooja/40"
                    >
                      <span className="text-sm font-semibold">{key}:</span>{" "}
                      {finalAmountResult[0][key]}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <span className="text-xs font-semibold text-pehla tracking-tighter">
                    * Applicant will show the tax exemption certificate for 7E.
                  </span>
                </CardFooter>
              </Card>
              <Card className="w-[350px]">
                <CardHeader className="bg-slate-100 m-2 rounded-lg py-3">
                  <CardTitle className="text-center text-pehla">
                    TAX FOR NON-FILER
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  {Object.keys(finalAmountResult[1]).map((key) => (
                    <div
                      key={key}
                      className="w-full flex items-center justify-between mt-2 px-3 py-2 shadow-sm shadow-dooja/40"
                    >
                      <span className="text-sm font-semibold">{key}:</span>{" "}
                      {finalAmountResult[1][key]}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <span className="text-xs font-semibold text-pehla">
                    * TAX 7E WILL BE APPLIED.
                  </span>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
