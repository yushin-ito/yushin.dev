import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { unauthorized, forbidden } from "next/navigation";

import PostSwitcher from "@/components/post-switcher";
import { auth } from "@/auth";
import { db } from "@/lib/db";

interface AnalyticsLayoutProps {
  children: ReactNode;
}

const AnalyticsLayout = async ({ children }: AnalyticsLayoutProps) => {
  const t = await getTranslations("dashboard.settings");
  const session = await auth();

  if (!session?.user) {
    unauthorized();
  }

  if (session.user.role !== "ADMIN") {
    forbidden();
  }

  const posts = await db.post.findMany({
    where: {
      authorId: session.user.id,
    },
    select: {
      id: true,
      title: true,
    },
  });

  return (
    <section className="container max-w-6xl space-y-10 py-4 md:py-6 lg:py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-bold md:text-xl">
            {t("metadata.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("metadata.description")}
          </p>
        </div>
        <PostSwitcher posts={posts} />
      </div>
      {children}
    </section>
  );
};

export default AnalyticsLayout;
