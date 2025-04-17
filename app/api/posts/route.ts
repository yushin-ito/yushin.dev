import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { forbidden, unauthorized } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@/auth";

const bodySchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user) {
      unauthorized();
    }

    if (session.user.role === "ADMIN") {
      forbidden();
    }
    const json = await req.json();
    const body = bodySchema.parse(json);

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: session.user.id,
      },
      select: { id: true },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 422 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
