"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useFormatter, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import { siteConfig } from "@/config/site";

interface PostItem {
  id: string;
  title: string;
  description: string;
  updatedAt: Date;
}

const PostItem = ({ id, title, description, updatedAt }: PostItem) => {
  const t = useTranslations("content.blog");
  const format = useFormatter();

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set("title", title);
  ogUrl.searchParams.set("mode", theme === "dark" ? "dark" : "light");
  ogUrl.searchParams.set("width", "1280");
  ogUrl.searchParams.set("height", "720");

  return (
    <article key={id} className="group relative flex flex-col space-y-2.5">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
        <Image
          src={ogUrl.toString()}
          alt={title}
          fill
          sizes="(min-width: 640px) 640px, 100vw"
          className="bg-muted transition-colors"
          priority
        />
      </div>
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="whitespace-nowrap text-xs text-muted-foreground">
          {format.relativeTime(new Date(updatedAt), new Date())}
        </p>
      </div>
      <Link href={id} className="absolute inset-0">
        <span className="sr-only">{t("view_post")}</span>
      </Link>
    </article>
  );
};

export default PostItem;
