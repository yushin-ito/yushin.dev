import { getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "next-intl";

import { db } from "@/lib/db";
import {
  EmptyPlaceholder,
  EmptyPlaceholderIcon,
  EmptyPlaceholderTitle,
  EmptyPlaceholderDescription,
} from "@/components/empty-placeholder";

interface BlogPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export const generateMetadata = async ({ params }: BlogPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "content.blog.metadata",
  });

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
              className="group relative flex flex-col space-y-2.5"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image
                  src=""
                  alt={post.title}
                  fill
                  className="bg-muted transition-colors"
                  priority
                />
              </div>
              <div className="space-y-0.5 px-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {format.relativeTime(new Date(post.updatedAt), new Date())}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{post.title}</p>
              </div>
              <Link href={post.id} className="absolute inset-0">
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
