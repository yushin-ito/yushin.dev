import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { forbidden, unauthorized } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@/auth";

const contextSchema = z.object({
  params: z
    .object({
      postId: z.string(),
    })
    .promise(),
});

const bodySchema = z.object({
  title: z.string().min(3).max(128).optional(),
  content: z.any().optional(),
  description: z.string().optional(),
  published: z.boolean().optional(),
});

export const DELETE = async (
  _req: NextRequest,
  context: z.infer<typeof contextSchema>
) => {
  try {
    const session = await auth();

    if (!session?.user) {
      unauthorized();
    }

    if (session.user.role === "ADMIN") {
      forbidden();
    }

    const { params } = contextSchema.parse(context);
    const { postId } = await params;

    await db.post.delete({
      where: {
        id: postId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  context: z.infer<typeof contextSchema>
) => {
  try {
    const session = await auth();

    if (!session?.user) {
      unauthorized();
    }

    if (session.user.role === "ADMIN") {
      forbidden();
    }

    const { params } = contextSchema.parse(context);
    const { postId } = await params;

    const json = await req.json();
    const body = bodySchema.parse(json);

    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        title: body.title,
        content: body.content,
        description: body.description,
        published: body.published,
        updatedAt: new Date(),
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
