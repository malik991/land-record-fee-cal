import { z } from "zod";
import { formSchema } from "@/schemas/MainFormSchema";

const STAMPDUTY_CHARGES_String = process.env.NEXT_PUBLIC_STAMPDUTY!;
const STAMPDUTY_MAP_NotAvailable_String =
  process.env.NEXT_PUBLIC_STAMPDUTY_MAP_NA!;
const CONSTRUCTION_CHARGES_String =
  process.env.NEXT_PUBLIC_CONSTRUCTION_CHARGES!;
const taxTMAString = process.env.NEXT_PUBLIC_taxTMA!;
const filerFbrTaxFor236KString = process.env.NEXT_PUBLIC_filerFbrTaxFor236K!;
const filerFbrTaxFor236CString = process.env.NEXT_PUBLIC_filerFbrTaxFor236C!;
const nonFilerFbrTaxFor236KString =
  process.env.NEXT_PUBLIC_nonFilerFbrTaxFor236K!;
const nonFilerFbrTaxFor236CString =
  process.env.NEXT_PUBLIC_nonFilerFbrTaxFor236C!;
const fbrTaxFor7EString = process.env.NEXT_PUBLIC_fbrTaxFor7E!;

const freshfilerFbrTaxFor236KString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236KFresh!;
const freshfilerFbrTaxFor236CString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236CFresh!;
const aboveFiftyMillion236KfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236KFiftyMillion!;
const aboveHunderedMillion236KfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236KHundredMillion!;
const aboveFiftyMillion236CfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236CFiftyMillion!;
const aboveHunderedMillion236CfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236CHundredMillion!;
const aboveFiftyMillion236KNonfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_nonFilerFbrTaxFor236KFiftyMillion!;
const aboveHunderedMillion236KNonfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_nonFilerFbrTaxFor236KHundredMillion!;
const freshAboveFiftyMillion236CfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236CFiftyMillionFresh!;
const freshAboveHunderedMillion236CfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236CHundredMillionFresh!;
const freshAboveFiftyMillion236KfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236KFiftyMillionFresh!;
const freshAboveHunderedMillion236KfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236KHundredMillionFresh!;

const taxTMA = Number(taxTMAString);
const CONSTRUCTION_CHARGES = Number(CONSTRUCTION_CHARGES_String);
const STAMPDUTY_MAP_NotAvailable = Number(STAMPDUTY_MAP_NotAvailable_String);
const STAMPDUTY_CHARGES = Number(STAMPDUTY_CHARGES_String);
const filerFbrTaxFor236K = Number(filerFbrTaxFor236KString);
const filerFbrTaxFor236C = Number(filerFbrTaxFor236CString);
const nonFilerFbrTaxFor236K = Number(nonFilerFbrTaxFor236KString);
const nonFilerFbrTaxFor236C = Number(nonFilerFbrTaxFor236CString);
const fbrTaxFor7E = Number(fbrTaxFor7EString);
const FreshFilerFbrTax236C = Number(freshfilerFbrTaxFor236CString);
const FreshFilerFbrTax236K = Number(freshfilerFbrTaxFor236KString);
// above and below 50 million and 100 million
const aboveFiftyMillion236KfilerFbrTaxFor = Number(
  aboveFiftyMillion236KfilerFbrTaxForString
);
const aboveHunderedMillion236KfilerFbrTaxFor = Number(
  aboveHunderedMillion236KfilerFbrTaxForString
);
const aboveFiftyMillion236CfilerFbrTaxFor = Number(
  aboveFiftyMillion236CfilerFbrTaxForString
);
const aboveHunderedMillion236CfilerFbrTaxFor = Number(
  aboveHunderedMillion236CfilerFbrTaxForString
);
const aboveFiftyMillion236KNonfilerFbrTaxFor = Number(
  aboveFiftyMillion236KNonfilerFbrTaxForString
);
const aboveHunderedMillion236KNonfilerFbrTaxFor = Number(
  aboveHunderedMillion236KNonfilerFbrTaxForString
);
const FreshFilerFbrTax236KfiftyMillion = Number(
  freshAboveFiftyMillion236KfilerFbrTaxForString
);
const FreshFilerFbrTax236KhundredMillion = Number(
  freshAboveHunderedMillion236KfilerFbrTaxForString
);
const FreshFilerFbrTax236CfiftyMillion = Number(
  freshAboveFiftyMillion236CfilerFbrTaxForString
);
const FreshFilerFbrTax236ChundredMillion = Number(
  freshAboveHunderedMillion236CfilerFbrTaxForString
);

if (
  isNaN(STAMPDUTY_CHARGES) ||
  isNaN(taxTMA) ||
  isNaN(filerFbrTaxFor236K) ||
  isNaN(filerFbrTaxFor236C) ||
  isNaN(nonFilerFbrTaxFor236K) ||
  isNaN(nonFilerFbrTaxFor236C) ||
  isNaN(fbrTaxFor7E) ||
  isNaN(FreshFilerFbrTax236C) ||
  isNaN(FreshFilerFbrTax236K) ||
  isNaN(aboveFiftyMillion236KfilerFbrTaxFor) ||
  isNaN(aboveHunderedMillion236KfilerFbrTaxFor) ||
  isNaN(aboveFiftyMillion236CfilerFbrTaxFor) ||
  isNaN(aboveHunderedMillion236CfilerFbrTaxFor) ||
  isNaN(aboveFiftyMillion236KNonfilerFbrTaxFor) ||
  isNaN(aboveHunderedMillion236KNonfilerFbrTaxFor) ||
  isNaN(FreshFilerFbrTax236KfiftyMillion) ||
  isNaN(FreshFilerFbrTax236KhundredMillion) ||
  isNaN(FreshFilerFbrTax236CfiftyMillion) ||
  isNaN(FreshFilerFbrTax236ChundredMillion)
) {
  throw new Error(
    "One or more environment variables are not defined or not valid numbers in taxCalculation.tsx"
  );
}

let StampDuty_Fee = 500;
let fbr236KForFiler = 0;
let fbr236KForNonFiler = 0;
let fbr236CForFiler = 0;
let fbr236CForNonFiler = 0;
let totalForFiler = 0;
let totalForNonFiler = 0;
let totalForFreshFiler = 0;
let TMAtax = 0;
let tax7E = 0;
let constructionCharges = 0;
let fbr236KForFreshFiler = 0;
let fbr236CForFreshFiler = 0;

// choose correct tax rates based on totalAmount
let appliedFiler236KTaxRate = filerFbrTaxFor236K;
let appliedNonFiler236KTaxRate = nonFilerFbrTaxFor236K;
let appliedFreshFiler236KTaxRate = FreshFilerFbrTax236K;

let appliedFiler236CTaxRate = filerFbrTaxFor236C;
let appliedNonFiler236CTaxRate = nonFilerFbrTaxFor236C;
let appliedFreshFiler236CTaxRate = FreshFilerFbrTax236C;

export default function ZaraiSakniTaxFunction(
  inputParams: z.infer<typeof formSchema>
) {
  if (inputParams.landValue > 100000000) {
    // console.log("Above 100 million");

    appliedFiler236KTaxRate = aboveHunderedMillion236KfilerFbrTaxFor;
    appliedNonFiler236KTaxRate = aboveHunderedMillion236KNonfilerFbrTaxFor;
    appliedFiler236CTaxRate = aboveHunderedMillion236CfilerFbrTaxFor;
    appliedNonFiler236CTaxRate = nonFilerFbrTaxFor236C;
    appliedFreshFiler236KTaxRate = FreshFilerFbrTax236KhundredMillion;
    appliedFreshFiler236CTaxRate = FreshFilerFbrTax236ChundredMillion;
  } else if (inputParams.landValue > 50000000) {
    // console.log("Above 50 million");

    appliedFiler236KTaxRate = aboveFiftyMillion236KfilerFbrTaxFor;
    appliedNonFiler236KTaxRate = aboveFiftyMillion236KNonfilerFbrTaxFor;
    appliedFiler236CTaxRate = aboveFiftyMillion236CfilerFbrTaxFor;
    appliedNonFiler236CTaxRate = nonFilerFbrTaxFor236C;
    appliedFreshFiler236KTaxRate = FreshFilerFbrTax236KfiftyMillion;
    appliedFreshFiler236CTaxRate = FreshFilerFbrTax236CfiftyMillion;
  }
  //console.log(inputParams);
  const finalArrayAmount = [];
  const getChargesForPlra = inputParams.landValue
    ? plraChargesAmount(inputParams.landValue)
    : 0;

  let chargesPlra = {
    charges: inputParams.mutationType === "وراثت" ? 0 : getChargesForPlra,
  };
  let registryCharges = {
    charges: inputParams.mutationType === "وراثت" ? 0 : 1100,
  };

  // if land is not urban
  if (inputParams.type === "sakni" || inputParams.type === "zarai") {
    if (
      inputParams.mutationType === "بیع" ||
      inputParams.mutationType === "ہبہ" ||
      inputParams.mutationType === "تبادلہ"
    ) {
      StampDuty_Fee = Math.round(
        inputParams.landValue * STAMPDUTY_MAP_NotAvailable
      );
      if (inputParams.mutationType !== "تبادلہ") {
        TMAtax = Math.round(inputParams.landValue * taxTMA);
      }

      fbr236KForFiler = Math.round(
        inputParams.landValue * appliedFiler236KTaxRate
      );
      fbr236KForNonFiler = Math.round(
        inputParams.landValue * appliedNonFiler236KTaxRate
      );
      fbr236KForFreshFiler = Math.round(
        inputParams.landValue * appliedFreshFiler236KTaxRate
      );

      fbr236CForFiler = Math.round(
        inputParams.landValue * appliedFiler236CTaxRate
      );
      fbr236CForNonFiler = Math.round(
        inputParams.landValue * appliedNonFiler236CTaxRate
      );
      fbr236CForFreshFiler = Math.round(
        inputParams.landValue * appliedFreshFiler236CTaxRate
      );

      if (
        inputParams.type === "sakni" &&
        inputParams.mutationType !== "تبادلہ"
      ) {
        tax7E = Math.round(inputParams.landValue * fbrTaxFor7E);
      }
    } else if (
      inputParams.type === "sakni" &&
      inputParams.mutationType === "تملیک"
    ) {
      let objecForTamleekFiler = {};
      let objecForTamleekNonFiler = {};
      let objecForTamleekFreshFiler = {};
      if (inputParams.landArea! <= 5440) {
        objecForTamleekFiler = {
          STAMP_DUTY: "3%",
          TMA_TAX: "1.0%",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        objecForTamleekFreshFiler = {
          STAMP_DUTY: "3%",
          TMA_TAX: "1.0%",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        objecForTamleekNonFiler = {
          STAMP_DUTY: "3%",
          TMA_TAX: "1.0%",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        finalArrayAmount.push(objecForTamleekFiler);
        finalArrayAmount.push(objecForTamleekFreshFiler);
        finalArrayAmount.push(objecForTamleekNonFiler);
        return finalArrayAmount;
      } else {
        objecForTamleekFiler = {
          MUTATION_FEE: 500,
          TMA_TAX: 0,
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          COMPARISON_CHARGES: 100,
        };
        objecForTamleekFreshFiler = {
          MUTATION_FEE: 500,
          TMA_TAX: 0,
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          COMPARISON_CHARGES: 100,
        };
        objecForTamleekNonFiler = {
          MUTATION_FEE: 500,
          TMA_TAX: 0,
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          COMPARISON_CHARGES: 100,
        };
        finalArrayAmount.push(objecForTamleekFiler);
        finalArrayAmount.push(objecForTamleekFreshFiler);
        finalArrayAmount.push(objecForTamleekNonFiler);
        return finalArrayAmount;
      }
    } else if (
      inputParams.type === "zarai" &&
      inputParams.mutationType === "تملیک"
    ) {
      let objecForTamleekFiler = {};
      let objecForTamleekNonFiler = {};
      let objecForTamleekFreshFiler = {};
      objecForTamleekFiler = {
        MUTATION_CHARGES: 500,
        TMA_TAX: 0,
        FBR_236K_TAX: 0,
        FBR_236C_TAX: 0,
        FBR_7E_TAX: 0,
        PLRA_CHARGES: chargesPlra.charges,
        COMAPERISON_CHARGES: 100,
      };
      objecForTamleekFreshFiler = {
        MUTATION_CHARGES: 500,
        TMA_TAX: 0,
        FBR_236K_TAX: 0,
        FBR_236C_TAX: 0,
        FBR_7E_TAX: 0,
        PLRA_CHARGES: chargesPlra.charges,
        COMAPERISON_CHARGES: 100,
      };
      objecForTamleekNonFiler = {
        MUTATION_CHARGES: 500,
        TMA_TAX: 0,
        FBR_236K_TAX: 0,
        FBR_236C_TAX: 0,
        FBR_7E_TAX: 0,
        PLRA_CHARGES: chargesPlra.charges,
        COMAPERISON_CHARGES: 100,
      };
      finalArrayAmount.push(objecForTamleekFiler);
      finalArrayAmount.push(objecForTamleekFreshFiler);
      finalArrayAmount.push(objecForTamleekNonFiler);
      return finalArrayAmount;
    } else {
      StampDuty_Fee = 500;
      TMAtax = 0;
      fbr236CForFiler = 0;
      fbr236CForNonFiler = 0;
      fbr236KForFiler = 0;
      fbr236KForNonFiler = 0;
      fbr236KForFreshFiler = 0;
      fbr236CForFreshFiler = 0;
      tax7E = 0;
    }
  }

  totalForFiler =
    StampDuty_Fee +
    TMAtax +
    fbr236KForFiler +
    fbr236CForFiler +
    0 +
    registryCharges.charges +
    chargesPlra.charges;

  totalForFreshFiler =
    StampDuty_Fee +
    TMAtax +
    fbr236KForFreshFiler +
    fbr236CForFreshFiler +
    tax7E +
    registryCharges.charges +
    chargesPlra.charges;

  totalForNonFiler =
    StampDuty_Fee +
    TMAtax +
    fbr236KForNonFiler +
    fbr236CForNonFiler +
    tax7E +
    registryCharges.charges +
    chargesPlra.charges;

  let forFiler = {
    STAMP_DUTY: StampDuty_Fee,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForFiler,
    FBR_236C_TAX: fbr236CForFiler,
    FBR_7E_TAX: 0,
    PLRA_CHARGES: chargesPlra.charges,
    REGISTRY_CHARGES: registryCharges.charges,
    TOATAL_PAYABLE_TAX: totalForFiler,
  };
  let forFreshFiler = {
    STAMP_DUTY: StampDuty_Fee,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForFreshFiler,
    FBR_236C_TAX: fbr236CForFreshFiler,
    FBR_7E_TAX: tax7E,
    PLRA_CHARGES: chargesPlra.charges,
    REGISTRY_CHARGES: registryCharges.charges,
    TOATAL_PAYABLE_TAX: totalForFreshFiler,
  };
  let forNonFiler = {
    STAMP_DUTY: StampDuty_Fee,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForNonFiler,
    FBR_236C_TAX: fbr236CForNonFiler,
    FBR_7E_TAX: tax7E,
    PLRA_CHARGES: chargesPlra.charges,
    REGISTRY_CHARGES: registryCharges.charges,
    TOATAL_PAYABLE_TAX: totalForNonFiler,
  };

  finalArrayAmount.push(forFiler);
  finalArrayAmount.push(forFreshFiler);
  finalArrayAmount.push(forNonFiler);
  return finalArrayAmount;
}

export function UrbanTaxFunction(inputParams: z.infer<typeof formSchema>) {
  if (inputParams.landValue > 100000000) {
    // console.log("Above 100 million");

    appliedFiler236KTaxRate = aboveHunderedMillion236KfilerFbrTaxFor;
    appliedNonFiler236KTaxRate = aboveHunderedMillion236KNonfilerFbrTaxFor;
    appliedFiler236CTaxRate = aboveHunderedMillion236CfilerFbrTaxFor;
    appliedNonFiler236CTaxRate = nonFilerFbrTaxFor236C;
    appliedFreshFiler236KTaxRate = FreshFilerFbrTax236KhundredMillion;
    appliedFreshFiler236CTaxRate = FreshFilerFbrTax236ChundredMillion;
  } else if (inputParams.landValue > 50000000) {
    // console.log("Above 50 million");

    appliedFiler236KTaxRate = aboveFiftyMillion236KfilerFbrTaxFor;
    appliedNonFiler236KTaxRate = aboveFiftyMillion236KNonfilerFbrTaxFor;
    appliedFiler236CTaxRate = aboveFiftyMillion236CfilerFbrTaxFor;
    appliedNonFiler236CTaxRate = nonFilerFbrTaxFor236C;
    appliedFreshFiler236KTaxRate = FreshFilerFbrTax236KfiftyMillion;
    appliedFreshFiler236CTaxRate = FreshFilerFbrTax236CfiftyMillion;
  }
  const finalArrayResult = [];
  const getChargesForPlra = inputParams.landValue
    ? plraChargesAmount(inputParams.landValue)
    : 0;
  let chargesPlra = {
    charges: inputParams.mutationType === "وراثت" ? 0 : getChargesForPlra,
  };
  let registryCharges = {
    charges: inputParams.mutationType == "وراثت" ? 0 : 1100,
  };
  let forFiler = {};
  let forNonFiler = {};
  let forFreshFiler = {};

  // if plot is empty
  if (
    inputParams.mutationType === "بیع" ||
    inputParams.mutationType === "ہبہ" ||
    inputParams.mutationType === "تبادلہ"
  ) {
    if (inputParams.plotType === "empty") {
      StampDuty_Fee = Math.round(inputParams.landValue * STAMPDUTY_CHARGES);
      //if (inputParams.mutationType !== "تبادلہ") {
      TMAtax = Math.round(inputParams.landValue * taxTMA);
      //}
      fbr236KForFiler = Math.round(
        inputParams.landValue * appliedFiler236KTaxRate
      );
      fbr236KForNonFiler = Math.round(
        inputParams.landValue * appliedNonFiler236KTaxRate
      );
      fbr236KForFreshFiler = Math.round(
        inputParams.landValue * appliedFreshFiler236KTaxRate
      );

      fbr236CForFiler = Math.round(
        inputParams.landValue * appliedFiler236CTaxRate
      );
      fbr236CForNonFiler = Math.round(
        inputParams.landValue * appliedNonFiler236CTaxRate
      );
      fbr236CForFreshFiler = Math.round(
        inputParams.landValue * appliedFreshFiler236CTaxRate
      );
      tax7E = Math.round(inputParams.landValue * fbrTaxFor7E);

      constructionCharges = 0;
      /// total of all taxes
      totalForFiler =
        StampDuty_Fee +
        constructionCharges +
        TMAtax +
        fbr236KForFiler +
        fbr236CForFiler +
        0 +
        registryCharges.charges +
        chargesPlra.charges;

      totalForFreshFiler =
        StampDuty_Fee +
        constructionCharges +
        TMAtax +
        fbr236KForFreshFiler +
        fbr236CForFreshFiler +
        tax7E +
        registryCharges.charges +
        chargesPlra.charges;
      totalForNonFiler =
        StampDuty_Fee +
        constructionCharges +
        TMAtax +
        fbr236KForNonFiler +
        fbr236CForNonFiler +
        tax7E +
        registryCharges.charges +
        chargesPlra.charges;
    } else if (inputParams.plotType === "construct") {
      if (inputParams.tmaMapApprovedOrNot === "yes") {
        if (
          inputParams.numberOfFloors !== "" &&
          inputParams.numberOfFloors === "1"
        ) {
          inputParams.landValue =
            inputParams.landValue + inputParams.landValue / 2;
        }

        if (
          inputParams.numberOfFloors !== "" &&
          Number(inputParams.numberOfFloors) > 1
        ) {
          inputParams.landValue =
            inputParams.landValue +
            inputParams.landValue / 2 +
            Math.round(inputParams.landValue * 0.25);
        }
        StampDuty_Fee = Math.round(inputParams.landValue * STAMPDUTY_CHARGES);
        TMAtax = Math.round(inputParams.landValue * taxTMA);
        fbr236KForFiler = Math.round(
          inputParams.landValue * filerFbrTaxFor236K
        );
        fbr236KForNonFiler = Math.round(
          inputParams.landValue * nonFilerFbrTaxFor236K
        );
        fbr236CForFiler = Math.round(
          inputParams.landValue * filerFbrTaxFor236C
        );
        fbr236CForNonFiler = Math.round(
          inputParams.landValue * nonFilerFbrTaxFor236C
        );
        fbr236CForFreshFiler = Math.round(
          inputParams.landValue * FreshFilerFbrTax236C
        );
        fbr236KForFreshFiler = Math.round(
          inputParams.landValue * FreshFilerFbrTax236K
        );
        tax7E = Math.round(inputParams.landValue * fbrTaxFor7E);
        constructionCharges = Math.round(
          inputParams.constructedArea! * CONSTRUCTION_CHARGES
        );
        if (
          inputParams.numberOfFloors !== "" &&
          inputParams.numberOfFloors !== "0"
        ) {
          constructionCharges += inputParams.floorsArea! * CONSTRUCTION_CHARGES;
        }
        /// total of all taxes
        totalForFiler =
          StampDuty_Fee +
          constructionCharges +
          TMAtax +
          fbr236KForFiler +
          fbr236CForFiler +
          0 +
          registryCharges.charges +
          chargesPlra.charges;

        totalForFreshFiler =
          StampDuty_Fee +
          constructionCharges +
          TMAtax +
          fbr236KForFreshFiler +
          fbr236CForFreshFiler +
          tax7E +
          registryCharges.charges +
          chargesPlra.charges;

        totalForNonFiler =
          StampDuty_Fee +
          constructionCharges +
          TMAtax +
          fbr236KForNonFiler +
          fbr236CForNonFiler +
          tax7E +
          registryCharges.charges +
          chargesPlra.charges;
      } else if (inputParams.tmaMapApprovedOrNot === "no") {
        //let convertTosqft = inputParams.landArea! * marlaToFoot;
        StampDuty_Fee = Math.round(
          inputParams.landValue * STAMPDUTY_MAP_NotAvailable
        );

        TMAtax = Math.round(inputParams.landValue * taxTMA);
        fbr236KForFiler = Math.round(
          inputParams.landValue * appliedFiler236KTaxRate
        );
        fbr236KForNonFiler = Math.round(
          inputParams.landValue * appliedNonFiler236KTaxRate
        );
        fbr236CForFiler = Math.round(
          inputParams.landValue * appliedFiler236CTaxRate
        );
        fbr236CForNonFiler = Math.round(
          inputParams.landValue * appliedNonFiler236CTaxRate
        );
        fbr236CForFreshFiler = Math.round(
          inputParams.landValue * appliedFreshFiler236CTaxRate
        );
        fbr236KForFreshFiler = Math.round(
          inputParams.landValue * appliedFreshFiler236KTaxRate
        );
        tax7E = Math.round(inputParams.landValue * fbrTaxFor7E);
        constructionCharges = Math.round(
          inputParams.landArea! * CONSTRUCTION_CHARGES
        );
        /// total of all taxes
        totalForFiler =
          StampDuty_Fee +
          constructionCharges +
          TMAtax +
          fbr236KForFiler +
          fbr236CForFiler +
          0 +
          registryCharges.charges +
          chargesPlra.charges;

        totalForFreshFiler =
          StampDuty_Fee +
          constructionCharges +
          TMAtax +
          fbr236KForFreshFiler +
          fbr236CForFreshFiler +
          tax7E +
          registryCharges.charges +
          chargesPlra.charges;

        totalForNonFiler =
          StampDuty_Fee +
          constructionCharges +
          TMAtax +
          fbr236KForNonFiler +
          fbr236CForNonFiler +
          tax7E +
          registryCharges.charges +
          chargesPlra.charges;
      }
    }
  } else if (inputParams.mutationType === "تملیک") {
    if (inputParams.plotType === "empty") {
      forFiler = {
        STAMP_DUTY: "1.0 %",
        CONSTRUCTION_CHARGES: 0,
        TMA_TAX: "1.0 %",
        FBR_236K_TAX: 0,
        FBR_236C_TAX: 0,
        FBR_7E_TAX: 0,
        PLRA_CHARGES: chargesPlra.charges,
        REGISTRY_CHARGES: registryCharges.charges,
      };
      forFreshFiler = {
        STAMP_DUTY: "1.0 %",
        CONSTRUCTION_CHARGES: 0,
        TMA_TAX: "1.0 %",
        FBR_236K_TAX: 0,
        FBR_236C_TAX: 0,
        FBR_7E_TAX: 0,
        PLRA_CHARGES: chargesPlra.charges,
        REGISTRY_CHARGES: registryCharges.charges,
      };
      forNonFiler = {
        STAMP_DUTY: "1.0 %",
        CONSTRUCTION_CHARGES: 0,
        TMA_TAX: "1.0 %",
        FBR_236K_TAX: 0,
        FBR_236C_TAX: 0,
        FBR_7E_TAX: 0,
        PLRA_CHARGES: chargesPlra.charges,
        REGISTRY_CHARGES: registryCharges.charges,
      };
      finalArrayResult.push(forFiler);
      finalArrayResult.push(forFreshFiler);
      finalArrayResult.push(forNonFiler);
      return finalArrayResult;
    } else if (inputParams.plotType === "construct") {
      if (inputParams.tmaMapApprovedOrNot === "yes") {
        if (Number(inputParams.numberOfFloors) > 0) {
          constructionCharges =
            Math.round(inputParams.constructedArea! * CONSTRUCTION_CHARGES) +
            Math.round(inputParams.floorsArea! * CONSTRUCTION_CHARGES);
        } else {
          constructionCharges = Math.round(
            inputParams.constructedArea! * CONSTRUCTION_CHARGES
          );
        }

        forFiler = {
          STAMP_DUTY: "1.0 %",
          CONSTRUCTION_CHARGES: constructionCharges,
          TMA_TAX: "1.0 %",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        forFreshFiler = {
          STAMP_DUTY: "1.0 %",
          CONSTRUCTION_CHARGES: constructionCharges,
          TMA_TAX: "1.0 %",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        forNonFiler = {
          STAMP_DUTY: "1.0 %",
          CONSTRUCTION_CHARGES: constructionCharges,
          TMA_TAX: "1.0 %",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        finalArrayResult.push(forFiler);
        finalArrayResult.push(forFreshFiler);
        finalArrayResult.push(forNonFiler);
        return finalArrayResult;
      } else if (inputParams.tmaMapApprovedOrNot === "no") {
        constructionCharges = Math.round(
          inputParams.landArea! * CONSTRUCTION_CHARGES
        );
        forFiler = {
          STAMP_DUTY: "3.0 %",
          CONSTRUCTION_CHARGES: constructionCharges,
          TMA_TAX: "1.0 %",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        forFreshFiler = {
          STAMP_DUTY: "3.0 %",
          CONSTRUCTION_CHARGES: constructionCharges,
          TMA_TAX: "1.0 %",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        forNonFiler = {
          STAMP_DUTY: "3.0 %",
          CONSTRUCTION_CHARGES: constructionCharges,
          TMA_TAX: "1.0 %",
          FBR_236K_TAX: 0,
          FBR_236C_TAX: 0,
          FBR_7E_TAX: 0,
          PLRA_CHARGES: chargesPlra.charges,
          REGISTRY_CHARGES: registryCharges.charges,
        };
        finalArrayResult.push(forFiler);
        finalArrayResult.push(forFreshFiler);
        finalArrayResult.push(forNonFiler);
        return finalArrayResult;
      }
    }
  } else {
    StampDuty_Fee = 500;
    constructionCharges = 0;
    TMAtax = 0;
    fbr236CForFiler = 0;
    fbr236CForNonFiler = 0;
    tax7E = 0;
    fbr236KForFiler = 0;
    fbr236KForNonFiler = 0;
    fbr236KForFreshFiler = 0;
    fbr236CForFreshFiler = 0;
    totalForFiler = 500;
    totalForNonFiler = 500;
  }

  const constructionChargesValue =
    constructionCharges > 0 ? constructionCharges : 0;

  forFiler = {
    STAMP_DUTY: StampDuty_Fee,
    CONSTRUCTION_CHARGES: constructionChargesValue,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForFiler,
    FBR_236C_TAX: fbr236CForFiler,
    FBR_7E_TAX: 0,
    PLRA_CHARGES: chargesPlra.charges,
    REGISTRY_CHARGES: registryCharges.charges,
    TOATAL_PAYABLE_TAX: totalForFiler,
  };

  forFreshFiler = {
    STAMP_DUTY: StampDuty_Fee,
    CONSTRUCTION_CHARGES: constructionChargesValue,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForFreshFiler,
    FBR_236C_TAX: fbr236CForFreshFiler,
    FBR_7E_TAX: tax7E,
    PLRA_CHARGES: chargesPlra.charges,
    REGISTRY_CHARGES: registryCharges.charges,
    TOATAL_PAYABLE_TAX: totalForFreshFiler,
  };

  forNonFiler = {
    STAMP_DUTY: StampDuty_Fee,
    CONSTRUCTION_CHARGES: constructionChargesValue,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForNonFiler,
    FBR_236C_TAX: fbr236CForNonFiler,
    FBR_7E_TAX: tax7E,
    PLRA_CHARGES: chargesPlra.charges,
    REGISTRY_CHARGES: registryCharges.charges,
    TOATAL_PAYABLE_TAX: totalForNonFiler,
  };
  finalArrayResult.push(forFiler);
  finalArrayResult.push(forFreshFiler);
  finalArrayResult.push(forNonFiler);
  //console.log(finalArrayResult);

  return finalArrayResult;
}

function plraChargesAmount(landValue: any) {
  //console.log("land value input: ", landValue);

  if (landValue && landValue <= 3000000) {
    return 3000;
  } else {
    return landValue * 0.001;
  }
}
