import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { forbidden, unauthorized } from "next/navigation";

import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user) {
      unauthorized();
    }

    if (session.user.role === "ADMIN") {
      forbidden();
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
  } catch {
    return NextResponse.json(
      { success: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
