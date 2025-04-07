import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";
import { redirect } from "next/navigation";
import { subDays } from "date-fns";

import PostSwitcher from "@/components/post-switcher";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import {
  EmptyPlaceholder,
  EmptyPlaceholderIcon,
  EmptyPlaceholderTitle,
  EmptyPlaceholderDescription,
} from "@/components/empty-placeholder";
import Stats from "@/components/stats";
import LineChart from "@/components/line-chart";

interface AnalyticsPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    postId?: string;
    tab?: string;
    from?: string;
    to?: string;
  }>;
}

export const generateMetadata = async ({ params }: AnalyticsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "dashboard.analytics.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
};

const AnalyticsPage = async ({ searchParams }: AnalyticsPageProps) => {
  const { postId, tab, from, to } = await searchParams;

  const t = await getTranslations("dashboard.analytics");
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
    },
  });

  const post = await db.post.findUnique({
    where: {
      id: postId || "",
      authorId: session.user.id,
    },
    select: {
      id: true,
      title: true,
    },
  });

  const impressions = {
    total: await db.impression.count({
      where: { postId: post?.id },
    }),
    weekly: await db.impression.count({
      where: {
        postId: post?.id,
        createdAt: { gte: subDays(new Date(), 7) },
      },
    }),
  };

  const views = {
    total: await db.view.count({
      where: { postId: post?.id },
    }),
    weekly: await db.view.count({
      where: {
        postId: post?.id,
        createdAt: { gte: subDays(new Date(), 7) },
      },
    }),
  };

  const likes = {
    total: await db.like.count({
      where: { postId: post?.id },
    }),
    weekly: await db.like.count({
      where: {
        postId: post?.id,
        createdAt: { gte: subDays(new Date(), 7) },
      },
    }),
  };

  let data: { time: Date; value: number }[] = [];

  switch (tab) {
    case "impression": {
      const raws = await db.impression.findMany({
        where: {
          postId: post?.id,
          createdAt: {
            gte: from || subDays(new Date(), 6),
            lte: to || new Date(),
          },
        },
        select: {
          createdAt: true,
        },
      });

      data = raws.map((d, i) => ({
        time: d.createdAt,
        value: i + 1,
      }));

      break;
    }
    case "view": {
      const raws = await db.view.findMany({
        where: {
          postId: post?.id,
          createdAt: {
            gte: from || subDays(new Date(), 6),
            lte: to || new Date(),
          },
        },
        select: {
          createdAt: true,
        },
      });

      data = raws.map((d, i) => ({
        time: d.createdAt,
        value: i + 1,
      }));

      break;
    }
    case "like": {
      const raws = await db.like.findMany({
        where: {
          postId: post?.id,
          createdAt: {
            gte: from || subDays(new Date(), 6),
            lte: to || new Date(),
          },
        },
        select: {
          createdAt: true,
        },
      });

      data = raws.map((d, i) => ({
        time: d.createdAt,
        value: i + 1,
      }));

      break;
    }
    default:
      const now = new Date();
      data = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(now, 6 - i);
        return {
          time: date,
          value: Math.floor(Math.random() * 100) + 1,
        };
      });
      break;
  }

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
      {post ? (
        <div className="space-y-8">
          <Stats data={{ impressions, views, likes }} />
          <LineChart data={data} />
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholderIcon name="chart" />
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
export default AnalyticsPage;
