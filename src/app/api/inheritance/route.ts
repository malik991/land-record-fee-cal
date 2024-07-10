import { NextRequest, NextResponse } from "next/server";
import {
  InheritanceProps,
  InheritanceCal,
  InheritanceResult,
  ErrorForUsbah,
} from "@/components/module/InheritanceCalculation";

export async function POST(req: NextRequest) {
  try {
    const inputParams: InheritanceProps = await req.json();
    const result = InheritanceCal(inputParams);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in processing request:", error);
    const errorResponse: ErrorForUsbah = {
      errorUsbah: "Internal Server Error",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
