import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  EmptyPlaceholder,
  EmptyPlaceholderDescription,
  EmptyPlaceholderIcon,
  EmptyPlaceholderTitle,
} from "@/components/empty-placeholder";
import CreatePostButton from "@/components/create-post-button";
import { cn } from "@/lib/utils";
import Icons from "@/components/icons";

const DashboardPage = async () => {
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
      length: true,
      published: true,
      updatedAt: true,
      _count: {
        select: { like: true },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <section className="container max-w-6xl py-4 md:py-6 lg:py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-bold md:text-xl">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>
        <CreatePostButton>{t("create")}</CreatePostButton>
      </div>
      <div className="mt-8">
        {posts.length ? (
          <div className="mx-auto max-w-4xl divide-y divide-border">
            {posts.map((post) => (
              <div key={post.id} className="space-y-2 py-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-bold">{post.title}</h2>
                  <div
                    className={cn(
                      "px-1 text-center py-0.5 rounded-sm text-xs border",
                      {
                        "bg-muted-background text-muted-foreground":
                          !post.published,
                      }
                    )}
                  >
                    <p>{post.published ? t("published") : t("draft")}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-0.5">
                    <Icons.pencil className="size-4" />
                    <span className="text-sm">{post?.length}</span>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <Icons.heart className="size-4" />
                    <span className="text-sm">{post._count.like}</span>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <Icons.clock className="size-4" />
                    <span className="text-sm">
                      {format(new Date(post.updatedAt), "yyyy/MM/dd")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              {t("create")}
            </CreatePostButton>
          </EmptyPlaceholder>
        )}
      </div>
    </section>
  );
};
export default DashboardPage;
