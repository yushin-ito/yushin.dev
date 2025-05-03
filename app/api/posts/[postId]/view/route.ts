import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";

const contextSchema = z.object({
  params: z
    .object({
      postId: z.string(),
    })
    .promise(),
});

const bodySchema = z.object({
  visitorId: z.string(),
});

export const POST = async (
  req: NextRequest,
  context: z.infer<typeof contextSchema>
) => {
  try {
    const { params } = contextSchema.parse(context);
    const { postId } = await params;

    const json = await req.json();
    const body = bodySchema.parse(json);

    const view = await db.view.create({
      data: { postId, visitorId: body.visitorId },
    });

    return NextResponse.json(view, { status: 201 });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json("Conflict", { status: 409 });
    }

    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
