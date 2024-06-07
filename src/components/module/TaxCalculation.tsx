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

const mutationTaxForZarai = Number(mutationTaxForZaraiString);
const taxTMA = Number(taxTMAString);
const filerFbrTaxFor236K = Number(filerFbrTaxFor236KString);
const filerFbrTaxFor236C = Number(filerFbrTaxFor236CString);
const nonFilerFbrTaxFor236K = Number(nonFilerFbrTaxFor236KString);
const nonFilerFbrTaxFor236C = Number(nonFilerFbrTaxFor236CString);
const fbrTaxFor7E = Number(fbrTaxFor7EString);

if (
  isNaN(mutationTaxForZarai) ||
  isNaN(taxTMA) ||
  isNaN(filerFbrTaxFor236K) ||
  isNaN(filerFbrTaxFor236C) ||
  isNaN(nonFilerFbrTaxFor236K) ||
  isNaN(nonFilerFbrTaxFor236C) ||
  isNaN(fbrTaxFor7E)
) {
  throw new Error(
    "One or more environment variables are not defined or not valid numbers"
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
  let TMAtax = 0;
  let tax7E = 0;
  let chargesPlra = 900;

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

    fbr236KForFiler = Math.round(inputParams.totalAmount * filerFbrTaxFor236K);
    fbr236KForNonFiler = Math.round(
      inputParams.totalAmount * nonFilerFbrTaxFor236K
    );

    fbr236CForFiler = Math.round(inputParams.totalAmount * filerFbrTaxFor236C);
    fbr236CForNonFiler = Math.round(
      inputParams.totalAmount * nonFilerFbrTaxFor236C
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

  let forFiler = {
    BOR_FEE: mutationFeeForFiler,
    TMA_TAX: TMAtax,
    FBR_236K_TAX: fbr236KForFiler,
    FBR_236C_TAX: fbr236CForFiler,
    FBR_7E_TAX: 0,
    PLRA_CHARGES: chargesPlra,
    TOATAL_PAYABLE_TAX: totalForFiler,
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
  finalArrayAmount.push(forNonFiler);
  return finalArrayAmount;
}
