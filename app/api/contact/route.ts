import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { render } from "@react-email/render";

import ContactEmail from "@/emails/contact-email";
import env from "@/env";

const bodySchema = z.object({
  subject: z.string(),
  message: z.string(),
  from: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
});

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const body = bodySchema.parse(json);

    const element = await ContactEmail({
      subject: body.subject,
      message: body.message,
      from: body.from,
    });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: body.from.email,
        subject: body.subject,
        html: await render(element),
      }),
    });

    if (!response.ok) {
      return NextResponse.json("Internal Server Error", { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.errors, { status: 400 });
    }

    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
