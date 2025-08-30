// app/api/blogs/views/route.ts
import { NextRequest, NextResponse } from "next/server";
import myDbConnection from "@/lib/dbConnect";
import BlogModel from "@/model/blog.model";

export async function POST(req: NextRequest) {
  try {
    await myDbConnection();
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug required" },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true, upsert: true } // create if doesn't exist
    );

    return NextResponse.json({ success: true, views: blog.views });
  } catch (error: any) {
    console.error("Error updating blog views:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
