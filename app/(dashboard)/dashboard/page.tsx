import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Locale } from "next-intl";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  EmptyPlaceholder,
  EmptyPlaceholderDescription,
  EmptyPlaceholderIcon,
  EmptyPlaceholderTitle,
} from "@/components/empty-placeholder";
import CreatePostButton from "@/components/create-post-button";
import DataTable from "@/components/data-table";
import { columns } from "@/components/columns";

interface PostsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export const generateMetadata = async ({ params }: PostsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "dashboard.posts.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
};

const PostsPage = async () => {
  const t = await getTranslations("dashboard.posts");
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const posts = await db.post.findMany({
    where: {
      authorId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      preview: true,
      published: true,
      authorId: true,
      createdAt: true,
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
    <section className="container max-w-6xl space-y-12 py-4 md:py-6 lg:py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-bold md:text-xl">
            {t("metadata.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("metadata.description")}
          </p>
        </div>
        <CreatePostButton>{t("new_post")}</CreatePostButton>
      </div>
      {posts.length ? (
        <DataTable data={posts} columns={columns} />
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholderIcon name="post" />
          <EmptyPlaceholderTitle>
            {t("empty_placeholder.title")}
          </EmptyPlaceholderTitle>
          <EmptyPlaceholderDescription>
            {t("empty_placeholder.description")}
          </EmptyPlaceholderDescription>
          <CreatePostButton className="rounded-full px-10 py-5">
            {t("new_post")}
          </CreatePostButton>
        </EmptyPlaceholder>
      )}
    </section>
  );
};
export default PostsPage;
