import { NextResponse } from "next/server";
import { z } from "zod";
import { render } from "@react-email/render";

import { auth } from "@/auth";
import { siteConfig } from "@/config/site";
import VerifyEmail from "@/emails/verify-email";
import ContactEmail from "@/emails/contact-email";

const searchParamsSchema = z.object({
  type: z.enum(["contact", "verify"]).optional(),
});

export const GET = async (req: Request) => {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);

    const { type } = searchParamsSchema.parse(Object.fromEntries(searchParams));

    if (type === "contact") {
      const element = await ContactEmail({
        from: {
          name: "john doe",
          email: "johndoe@example.com",
        },
        subject: "Test",
        message: "This is test.",
      });
      const html = await render(element);

      return new NextResponse(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (type === "verify") {
      const element = await VerifyEmail({ url: siteConfig.url });
      const html = await render(element);

      return new NextResponse(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new NextResponse("Bad Request", { status: 400 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
