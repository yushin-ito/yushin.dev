import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

const searchParamsSchema = z.object({
  title: z.string(),
  theme: z.enum(["light", "dark"]).default("light"),
  width: z.coerce.number().int().positive().default(1200),
  height: z.coerce.number().int().positive().default(630),
});

const noto_sans_jp = fetch(`${siteConfig.url}/fonts/NotoSansJP-Bold.woff`).then(
  (res) => res.arrayBuffer()
);

export const GET = async (req: NextRequest) => {
  try {
    const font = await noto_sans_jp;

    const { searchParams } = new URL(req.url);
    const { title, theme, width, height } = searchParamsSchema.parse(
      Object.fromEntries(searchParams)
    );

    return new ImageResponse(
      (
        <div
          tw={cn(
            "flex w-full h-full flex-col",
            theme === "dark" ? "bg-black text-white" : "bg-white text-zinc-950"
          )}
        >
          <div
            tw={cn(
              "relative flex h-20 items-center w-full border-b",
              theme === "dark"
                ? "bg-zinc-800 border-zinc-800"
                : "bg-zinc-100 border-zinc-200"
            )}
          >
            <div tw="absolute left-6 flex">
              <div tw="flex mx-2 w-6 h-6 rounded-full bg-red-500" />
              <div tw="flex mx-2 w-6 h-6 rounded-full bg-yellow-500" />
              <div tw="flex mx-2 w-6 h-6 rounded-full bg-green-500" />
            </div>
          </div>
          <div tw="flex flex-col justify-between flex-1 px-24 py-14">
            <div tw="flex leading-[1.4] text-[80px] font-bold">
              {title.length > 12 * 3 - 1
                ? `${title.substring(0, 12 * 3 - 1)}...`
                : title}
            </div>
            <div tw="flex items-center justify-end">
              {/* eslint-disable @next/next/no-img-element */}
              <div tw="flex items-center">
                <img
                  alt="icon"
                  src="https://yushin.dev/images/icon.png"
                  width={80}
                  height={80}
                  tw="rounded-full"
                />
                <div tw="flex flex-col ml-4">
                  <div tw="flex text-[40px] font-bold">Yushin Ito</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
        fonts: [
          {
            name: "Noto Sans JP",
            data: font,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
