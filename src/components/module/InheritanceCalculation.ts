export interface InheritanceProps {
  allHeirs: { heir: string; quantity: number }[];
  landArea: {
    kanal: number;
    marla: number;
    foot: number;
  };
}

interface InheritanceResult {
  // Define the structure of the result here
  summary: string;
}

export default function InheritanceCal(
  inputParams: InheritanceProps
): InheritanceResult {
  //console.log("all heirs: ", inputParams.allHeirs);
  //console.log("land data: ", inputParams.landArea?.kanal);
  const summary = `Calculated for ${inputParams.allHeirs.length} heirs and land area of ${inputParams.landArea.kanal} kanal, ${inputParams.landArea.marla} marla, ${inputParams.landArea.foot} foot`;

  return { summary };
}
