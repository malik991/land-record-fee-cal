export interface AllParams {
  transferType: string;
  mutationType: string;
  landType: string;
  totalAmount: number;
}
const mutationTaxForZaraiString = process.env.NEXT_PUBLIC_mutationTaxForZarai!;
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
const freshfilerFbrTaxFor236CString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236CFresh!;
const freshAboveFiftyMillion236CfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236CFiftyMillionFresh!;
const freshAboveHunderedMillion236CfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236CHundredMillionFresh!;
const freshAboveFiftyMillion236KfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236KFiftyMillionFresh!;
const freshAboveHunderedMillion236KfilerFbrTaxForString =
  process.env.NEXT_PUBLIC_filerFbrTaxFor236KHundredMillionFresh!;
const mutationTaxForZarai = Number(mutationTaxForZaraiString);
const taxTMA = Number(taxTMAString);
const filerFbrTaxFor236K = Number(filerFbrTaxFor236KString);
const filerFbrTaxFor236C = Number(filerFbrTaxFor236CString);
const nonFilerFbrTaxFor236K = Number(nonFilerFbrTaxFor236KString);
const nonFilerFbrTaxFor236C = Number(nonFilerFbrTaxFor236CString);
const fbrTaxFor7E = Number(fbrTaxFor7EString);
const FreshFilerFbrTax236C = Number(freshfilerFbrTaxFor236CString);
const FreshFilerFbrTax236K = Number(freshfilerFbrTaxFor236KString);
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
  isNaN(mutationTaxForZarai) ||
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
export function zaraiTaxCalculation(inputParams: AllParams): any {
  //console.log(inputParams);

  let mutationFeeForFiler = 300;
  let fbr236KForFiler = 0;
  let fbr236KForNonFiler = 0;
  let fbr236CForFiler = 0;
  let fbr236CForNonFiler = 0;
  let totalForFiler = 0;
  let totalForNonFiler = 0;
  let totalForFreshFiler = 0;
  let TMAtax = 0;
  let tax7E = 0;
  let chargesPlra = 1200;
  let fbr236KForFreshFiler = 0;
  let fbr236CForFreshFiler = 0;

  // choose correct tax rates based on totalAmount
  let appliedFiler236KTaxRate = filerFbrTaxFor236K;
  let appliedNonFiler236KTaxRate = nonFilerFbrTaxFor236K;
  let appliedFreshFiler236KTaxRate = FreshFilerFbrTax236K;

  let appliedFiler236CTaxRate = filerFbrTaxFor236C;
  let appliedNonFiler236CTaxRate = nonFilerFbrTaxFor236C;
  let appliedFreshFiler236CTaxRate = FreshFilerFbrTax236C;
  console.log("Input Params:", inputParams.totalAmount);

  if (inputParams.totalAmount > 100000000) {
    console.log("Above 100 million");

    appliedFiler236KTaxRate = aboveHunderedMillion236KfilerFbrTaxFor;
    appliedNonFiler236KTaxRate = aboveHunderedMillion236KNonfilerFbrTaxFor;
    appliedFiler236CTaxRate = aboveHunderedMillion236CfilerFbrTaxFor;
    appliedNonFiler236CTaxRate = nonFilerFbrTaxFor236C;
    appliedFreshFiler236KTaxRate = FreshFilerFbrTax236KhundredMillion;
    appliedFreshFiler236CTaxRate = FreshFilerFbrTax236ChundredMillion;
  } else if (inputParams.totalAmount > 50000000) {
    console.log("Above 50 million");

    appliedFiler236KTaxRate = aboveFiftyMillion236KfilerFbrTaxFor;
    appliedNonFiler236KTaxRate = aboveFiftyMillion236KNonfilerFbrTaxFor;
    appliedFiler236CTaxRate = aboveFiftyMillion236CfilerFbrTaxFor;
    appliedNonFiler236CTaxRate = nonFilerFbrTaxFor236C;
    appliedFreshFiler236KTaxRate = FreshFilerFbrTax236KfiftyMillion;
    appliedFreshFiler236CTaxRate = FreshFilerFbrTax236CfiftyMillion;
  }

  if (
    inputParams.mutationType === "بیع" ||
    inputParams.mutationType === "ہبہ" ||
    inputParams.mutationType === "تبادلہ"
  ) {
    mutationFeeForFiler = Math.round(
      inputParams.totalAmount * mutationTaxForZarai
    );
    if (inputParams.mutationType !== "تبادلہ") {
      TMAtax = Math.round(inputParams.totalAmount * taxTMA);
    }

    fbr236KForFiler = Math.round(
      inputParams.totalAmount * appliedFiler236KTaxRate
    );
    fbr236KForNonFiler = Math.round(
      inputParams.totalAmount * appliedNonFiler236KTaxRate
    );
    fbr236KForFreshFiler = Math.round(
      inputParams.totalAmount * appliedFreshFiler236KTaxRate
    );

    fbr236CForFiler = Math.round(
      inputParams.totalAmount * appliedFiler236CTaxRate
    );
    fbr236CForNonFiler = Math.round(
      inputParams.totalAmount * appliedNonFiler236CTaxRate
    );
    fbr236CForFreshFiler = Math.round(
      inputParams.totalAmount * appliedFreshFiler236CTaxRate
    );

    if (
      inputParams.landType === "sakni" &&
      inputParams.mutationType !== "تبادلہ"
    ) {
      tax7E = Math.round(inputParams.totalAmount * fbrTaxFor7E);
    }
  }
  totalForFiler =
    mutationFeeForFiler +
    TMAtax +
    fbr236KForFiler +
    fbr236CForFiler +
    0 +
    chargesPlra;

  totalForNonFiler =
    mutationFeeForFiler +
    TMAtax +
    fbr236KForNonFiler +
    fbr236CForNonFiler +
    tax7E +
    chargesPlra;

  totalForFreshFiler =
    mutationFeeForFiler +
    TMAtax +
    fbr236KForFreshFiler +
    fbr236CForFreshFiler +
    tax7E +
    chargesPlra;

  let forFiler = {
    BOR_FEE: mutationFeeForFiler,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForFiler,
    FBR_236C_TAX: fbr236CForFiler,
    FBR_7E_TAX: 0,
    PLRA_CHARGES: chargesPlra,
    TOATAL_PAYABLE_TAX: totalForFiler,
  };

  let forFreshFiler = {
    BOR_FEE: mutationFeeForFiler,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForFreshFiler,
    FBR_236C_TAX: fbr236CForFreshFiler,
    FBR_7E_TAX: tax7E,
    PLRA_CHARGES: chargesPlra,
    TOATAL_PAYABLE_TAX: totalForFreshFiler,
  };

  let forNonFiler = {
    BOR_FEE: mutationFeeForFiler,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForNonFiler,
    FBR_236C_TAX: fbr236CForNonFiler,
    FBR_7E_TAX: tax7E,
    PLRA_CHARGES: chargesPlra,
    TOATAL_PAYABLE_TAX: totalForNonFiler,
  };

  const finalArrayAmount = [];
  finalArrayAmount.push(forFiler);
  finalArrayAmount.push(forFreshFiler);
  finalArrayAmount.push(forNonFiler);

  return finalArrayAmount;
}
