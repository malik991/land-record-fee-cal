import { mutationTypeArray } from "@/components/module/muttaionType";
import { z } from "zod";

export const formSchema = z
  .object({
    transferType: z.enum(["Intiqal", "Registery"], {
      message: "please select the transfer type",
    }),
    mutationType: z
      .string({ message: "please select mutation type" })
      .refine((val) => mutationTypeArray.includes(val), {
        message: "Please select mutation type",
      }),
    type: z.enum(["zarai", "sakni", "urban"], {
      required_error: "You need to select a Land type.",
    }),
    landValue: z
      .number()
      .refine((val) => val > 0, {
        message: "Please enter a valid amount in PKR",
      })
      .refine((val) => val.toString().length <= 11, {
        message: "Amount cannot exceed 11 digits.",
      }),
    plotType: z.string().optional(),
    landArea: z.number().optional(),
    tmaMapApprovedOrNot: z.string().optional(),
    constructedArea: z.number().optional(),
    numberOfFloors: z.string().optional(),
    floorsArea: z.number().optional(),
  })
  .refine(
    (data) => {
      if (
        data.type === "urban" &&
        data.mutationType !== "وراثت" &&
        !data.plotType
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Plot Type is required",
      path: ["plotType"], // This will make the error appear on the plotType field
    }
  )
  .refine(
    (data) => {
      if (
        data.type === "urban" &&
        data.mutationType !== "وراثت" &&
        (data.landArea === undefined || data.landArea <= 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "enter valid area in Marla",
      path: ["landArea"],
    }
  )
  .refine(
    (data) => {
      if (
        data.plotType === "construct" &&
        data.mutationType !== "وراثت" &&
        !data.tmaMapApprovedOrNot
      ) {
        return false;
      }
      return true;
    },
    {
      message: "please select TMA Map is Approved or Not",
      path: ["tmaMapApprovedOrNot"],
    }
  )
  .refine(
    (data) => {
      if (
        data.plotType === "construct" &&
        data.tmaMapApprovedOrNot === "yes" &&
        data.mutationType !== "وراثت" &&
        (data.constructedArea === undefined || data.constructedArea <= 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "please enter constructed area",
      path: ["constructedArea"],
    }
  )
  .refine(
    (data) => {
      if (
        data.plotType === "construct" &&
        data.tmaMapApprovedOrNot === "yes" &&
        data.mutationType !== "وراثت" &&
        !data.numberOfFloors
      ) {
        return false;
      }
      return true;
    },
    {
      message: "please select a value from floor list",
      path: ["numberOfFloors"],
    }
  )
  .refine(
    (data) => {
      if (
        data.type === "urban" &&
        data.mutationType !== "وراثت" &&
        data.numberOfFloors !== undefined &&
        data.numberOfFloors > "0" &&
        (data.floorsArea === undefined || data.floorsArea <= 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "enter valid area in Marla",
      path: ["floorsArea"],
    }
  );
