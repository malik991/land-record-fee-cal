import myDbConnection from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
//import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import mongoose from "mongoose";
import { User } from "@/lib/types";

type UserDocument = User & mongoose.Document;

export async function POST(req: NextRequest) {
  try {
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    await myDbConnection();
    const { email, password, name } = await req.json();
    let dbResponseObj: UserDocument | null = null;
    const existingUserWithEmail = await UserModel.findOne({ email });
    if (existingUserWithEmail) {
      if (existingUserWithEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "this email is already taken by other user",
          },
          { status: 400 }
        );
      } else {
        const hasedPassword = await bcrypt.hash(password, 10);
        existingUserWithEmail.password = hasedPassword;
        existingUserWithEmail.verifyCode = verifyCode;
        existingUserWithEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserWithEmail.save();
        //dbResponseObj = existingUserWithEmail;
        dbResponseObj = await UserModel.findById(
          existingUserWithEmail?._id
        ).select("-password -verifyCode -verifyCodeExpiry");
      }
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        email,
        name,
        password: hasedPassword,
        verifyCode: verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAdmin: false,
      });
      await newUser.save();
      dbResponseObj = await UserModel.findById(newUser?._id).select(
        "-password -verifyCode -verifyCodeExpiry"
      );
      //dbResponseObj = newUser;
    }

    const emailResponse = await sendEmail({ email, otp: verifyCode });
    if (!emailResponse.success) {
      return NextResponse.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
        data: dbResponseObj ? dbResponseObj : {},
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in signup API: ", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error while registering user",
      },
      { status: 500 }
    );
  }
}
