import { getTranslations } from "next-intl/server";

import { db } from "@/lib/db";
import {
  EmptyPlaceholder,
  EmptyPlaceholderIcon,
  EmptyPlaceholderTitle,
  EmptyPlaceholderDescription,
} from "@/components/empty-placeholder";
import PostItem from "@/components/post-item";

export const generateMetadata = async () => {
  const t = await getTranslations("content.blog.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const BlogPage = async () => {
  const t = await getTranslations("content.blog");

  const posts = await db.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
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
          {posts.map((post, index) => (
            <PostItem
              key={index}
              id={post.id}
              title={post.title}
              description={post.description || t("no_description")}
              updatedAt={post.updatedAt}
            />
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
