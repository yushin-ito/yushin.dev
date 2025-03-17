import { NextResponse } from "next/server";
import { z } from "zod";
import { render } from "@react-email/render";

import { auth } from "@/auth";
import VerifyEmail from "@/components/verify-email";
import { siteConfig } from "@/config/site";

export const searchParamsSchema = z.object({
  type: z.enum(["verify"]).optional(),
});

export const GET = async (req: Request) => {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);

    const { type } = searchParamsSchema.parse(Object.fromEntries(searchParams));

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
