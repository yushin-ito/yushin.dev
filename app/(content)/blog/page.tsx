import { getFormatter, getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

import { db } from "@/lib/db";
import {
  EmptyPlaceholder,
  EmptyPlaceholderIcon,
  EmptyPlaceholderTitle,
  EmptyPlaceholderDescription,
} from "@/components/empty-placeholder";

export const generateMetadata = async () => {
  const t = await getTranslations("content.blog.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const BlogPage = async () => {
  const t = await getTranslations("content.blog");
  const format = await getFormatter();

  const posts = await db.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      published: true,
      updatedAt: true,
      _count: {
        select: { views: true, likes: true },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <section className="container max-w-5xl py-6 md:py-8 lg:py-10">
      <div className="space-y-2">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
          {t("metadata.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("metadata.description")}
        </p>
      </div>
      <hr className="mb-8 mt-4 w-full" />
      {posts.length ? (
        <div className="grid gap-10 px-2 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col space-y-2.5 overflow-hidden"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                {post.thumbnail && (
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="(min-width: 640px) 640px, 100vw"
                    className="bg-muted transition-colors"
                  />
                )}
              </div>
              <div className="flex items-center justify-between space-x-4 px-2">
                <p className="truncate whitespace-nowrap text-sm text-muted-foreground">
                  {post.description || t("no_description")}
                </p>
                <p className="whitespace-nowrap text-xs text-muted-foreground">
                  {format.relativeTime(new Date(post.updatedAt), new Date())}
                </p>
              </div>
              <Link href={`/blog/${post.id}`} className="absolute inset-0">
                <span className="sr-only">{t("view_post")}</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <EmptyPlaceholder className="min-h-[360px] border-none">
          <EmptyPlaceholderIcon name="post" />
          <EmptyPlaceholderTitle>
            {t("empty_placeholder.title")}
          </EmptyPlaceholderTitle>
          <EmptyPlaceholderDescription>
            {t("empty_placeholder.description")}
          </EmptyPlaceholderDescription>
        </EmptyPlaceholder>
      )}
    </section>
  );
};

export default BlogPage;
