import myDbConnection from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { _id, verifyCode } = await req.json();

  if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
    return Response.json(
      {
        success: false,
        message: "UserId is not Correct",
      },
      { status: 401 }
    );
  }
  try {
    // Convert _id to ObjectId
    //const objectId = new
    await myDbConnection();
    const checkUserStatus = await UserModel.findOne({ _id });
    if (!checkUserStatus) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found , please register yourself",
        },
        { status: 404 }
      );
    }
    const isCodeVerified = checkUserStatus.verifyCode === verifyCode;
    const checkCodeExpiry =
      new Date(checkUserStatus.verifyCodeExpiry) > new Date();
    if (checkCodeExpiry && isCodeVerified) {
      checkUserStatus.isVerified = true;
      //checkUserStatus.verifyCode = "";
      //checkUserStatus.verifyCodeExpiry = null;
      await checkUserStatus.save();
      return NextResponse.json(
        {
          success: true,
          message: "Account Verified Successfully",
        },
        { status: 201 }
      );
    } else if (!checkCodeExpiry) {
      return Response.json(
        {
          success: false,
          message: "verify code expire, please signup again",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "PIN code is not correct",
        },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("Error in signup API: ", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Error while verifing code API",
      },
      { status: 500 }
    );
  }
}
