import { getTranslations } from "next-intl/server";
import { fromUnixTime, subDays } from "date-fns";
import { unauthorized, forbidden } from "next/navigation";

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
  searchParams: Promise<{
    postId?: string;
    tab?: "ctr" | "impression" | "view" | "like";
    from?: string;
    to?: string;
  }>;
}

export const generateMetadata = async () => {
  const t = await getTranslations("dashboard.analytics.metadata");

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
      const impressions = await db.impression.findMany({
        where: {
          postId: post?.id,
          createdAt: {
            gte: fromUnixTime(Number(from)) || subDays(new Date(), 6),
            lte: fromUnixTime(Number(to)) || new Date(),
          },
        },
        select: {
          createdAt: true,
        },
      });

      const keys = (date: Date) => date.toISOString().split("T")[0];

      const now = new Date();
      data = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(now, 6 - i);
        const key = keys(date);

        const impression = impressions.filter(
          (impression) => keys(impression.createdAt) === key
        ).length;

        return {
          time: date,
          value: impression,
        };
      });

      break;
    }
    case "view": {
      const views = await db.view.findMany({
        where: {
          postId: post?.id,
          createdAt: {
            gte: fromUnixTime(Number(from)) || subDays(new Date(), 6),
            lte: fromUnixTime(Number(to)) || new Date(),
          },
        },
        select: {
          createdAt: true,
        },
      });

      const keys = (date: Date) => date.toISOString().split("T")[0];

      const now = new Date();
      data = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(now, 6 - i);
        const key = keys(date);

        const view = views.filter(
          (view) => keys(view.createdAt) === key
        ).length;

        return {
          time: date,
          value: view,
        };
      });

      break;
    }
    case "like": {
      const likes = await db.like.findMany({
        where: {
          postId: post?.id,
          createdAt: {
            gte: fromUnixTime(Number(from)) || subDays(new Date(), 6),
            lte: fromUnixTime(Number(to)) || new Date(),
          },
        },
        select: {
          createdAt: true,
        },
      });

      const keys = (date: Date) => date.toISOString().split("T")[0];

      const now = new Date();
      data = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(now, 6 - i);
        const key = keys(date);

        const like = likes.filter(
          (like) => keys(like.createdAt) === key
        ).length;

        return {
          time: date,
          value: like,
        };
      });

      break;
    }
    default:
      const views = await db.view.findMany({
        where: {
          postId: post?.id,
          createdAt: {
            gte: fromUnixTime(Number(from)) || subDays(new Date(), 6),
            lte: fromUnixTime(Number(to)) || new Date(),
          },
        },
        select: { createdAt: true },
      });

      const impressions = await db.impression.findMany({
        where: {
          postId: post?.id,
          createdAt: {
            gte: fromUnixTime(Number(from)) || subDays(new Date(), 6),
            lte: fromUnixTime(Number(to)) || new Date(),
          },
        },
        select: { createdAt: true },
      });

      const keys = (date: Date) => date.toISOString().split("T")[0];

      const now = new Date();
      data = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(now, 6 - i);
        const key = keys(date);

        const view = views.filter(
          (view) => keys(view.createdAt) === key
        ).length;
        const impression = impressions.filter(
          (impression) => keys(impression.createdAt) === key
        ).length;

        return {
          time: date,
          value: impression > 0 ? Math.round((view / impression) * 100) : 0,
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
          <LineChart title={t(tab ?? "ctr")} data={data} />
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
