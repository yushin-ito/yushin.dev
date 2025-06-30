"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import Icons from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsProps {
  data: {
    impressions: {
      total: number;
      weekly: number;
    };
    views: {
      total: number;
      weekly: number;
    };
    likes: {
      total: number;
      weekly: number;
    };
  };
}

const Stats = ({ data }: StatsProps) => {
  const t = useTranslations("dashboard.analytics");

  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card
        className="hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("tab", "ctr");
          router.push(`?${params}`);
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">{t("ctr")}</CardTitle>
          <Icons.pointer className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="mx-1 space-y-0.5">
          <div className="text-2xl font-bold">
            {data.impressions.total > 0
              ? Math.round((data.views.total / data.impressions.total) * 100)
              : 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {t("from_last_week", {
              value:
                data.impressions.weekly > 0
                  ? Math.round(
                      (data.views.weekly / data.impressions.weekly) * 100
                    )
                  : 0,
            })}
          </p>
        </CardContent>
      </Card>
      <Card
        className="hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("tab", "impression");
          router.push(`?${params}`);
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">
            {t("impression")}
          </CardTitle>
          <Icons.eye className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="mx-1 space-y-0.5">
          <div className="text-2xl font-bold">{data.impressions.total}</div>
          <p className="text-xs text-muted-foreground">
            +{t("since_last_week", { value: data.impressions.weekly })}
          </p>
        </CardContent>
      </Card>
      <Card
        className="hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("tab", "view");
          router.push(`?${params}`);
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">{t("view")}</CardTitle>
          <Icons.chart className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="mx-1 space-y-0.5">
          <div className="text-2xl font-bold">{data.views.total}</div>
          <p className="text-xs text-muted-foreground">
            +{t("since_last_week", { value: data.views.weekly })}
          </p>
        </CardContent>
      </Card>
      <Card
        className="hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("tab", "like");
          router.push(`?${params}`);
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">{t("like")}</CardTitle>
          <Icons.heart className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="mx-1 space-y-0.5">
          <div className="text-2xl font-bold">{data.likes.total}</div>
          <p className="text-xs text-muted-foreground">
            +{t("since_last_week", { value: data.likes.weekly })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
