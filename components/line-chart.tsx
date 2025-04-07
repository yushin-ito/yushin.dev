"use client";

import { CartesianGrid, Line, LineChart as Chart, XAxis } from "recharts";
import { formatDate } from "date-fns";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import DatePicker from "@/components/date-picker";
import { Card, CardContent } from "@/components/ui/card";

interface LineCartProps {
  data: {
    time: Date;
    value: number;
  }[];
}

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const LineChart = ({ data }: LineCartProps) => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Monthly Impressions</h2>
            <DatePicker />
          </div>
          <ChartContainer className="h-[320px]" config={chartConfig}>
            <Chart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => formatDate(new Date(value), "MM/dd HH:mm")}
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
              />
            </Chart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
