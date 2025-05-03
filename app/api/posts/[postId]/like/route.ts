import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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

export const GET = async (
  req: NextRequest,
  context: z.infer<typeof contextSchema>
) => {
  try {
    const { params } = contextSchema.parse(context);
    const { postId } = await params;

    const { searchParams } = new URL(req.url);
    const visitorId = searchParams.get("visitorId");

    if (!visitorId) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    const like = await db.like.findUnique({
      where: { postId_visitorId: { postId, visitorId } },
    });

    if (!like) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(like, { status: 200 });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 422 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: NextRequest,
  context: z.infer<typeof contextSchema>
) => {
  try {
    const { params } = contextSchema.parse(context);
    const { postId } = await params;

    const json = await req.json();
    const body = bodySchema.parse(json);

    const like = await db.like.create({
      data: { postId, visitorId: body.visitorId },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json({ error: "Conflict" }, { status: 409 });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 422 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  context: z.infer<typeof contextSchema>
) => {
  try {
    const { params } = contextSchema.parse(context);
    const { postId } = await params;

    const json = await req.json();
    const body = bodySchema.parse(json);

    await db.like.delete({
      where: { postId_visitorId: { postId, visitorId: body.visitorId } },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 422 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
