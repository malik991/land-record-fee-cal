interface urbanInputParam {
  transferType: string;
  mutationType: string;
  landType: string;
  totalAmount: number;
}

export default function name(inputParam: urbanInputParam): any {
  console.log(inputParam);
}
