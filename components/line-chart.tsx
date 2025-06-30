"use client";

import { CartesianGrid, Line, LineChart as Chart, XAxis } from "recharts";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import DatePicker from "@/components/date-picker";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LineCartProps {
  title: string;
  data: {
    time: Date;
    value: number;
  }[];
}

const LineChart = ({ title, data }: LineCartProps) => {
  const t = useTranslations("dashboard.analytics");

  const chartConfig = useMemo(
    () =>
      ({
        value: {
          label: t("value"),
          color: "hsl(var(--primary))",
        },
      }) satisfies ChartConfig,
    [t]
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pt-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <DatePicker />
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[320px]" config={chartConfig}>
          <Chart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                formatDate(new Date(value), "MM/dd HH:mm")
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </Chart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineChart;
