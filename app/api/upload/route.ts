import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { success: 0, message: "Bad Request" },
        { status: 400 }
      );
    }

    const blob = await put(`images/${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json({
      success: 1,
      file: {
        url: blob.url,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
