"use client";

import { fromUnixTime, getUnixTime, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useFormatter, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icons from "@/components/icons";

const DatePicker = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const t = useTranslations("dashboard.analytics");
  const format = useFormatter();

  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [date, setDate] = useState<DateRange>({
    from: from ? fromUnixTime(Number(from)) : subDays(new Date(), 6),
    to: to ? fromUnixTime(Number(to)) : new Date(),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="w-[280px] justify-center font-normal"
          >
            <Icons.calendar />
            <span>
              {date.from && date.to ? (
                <>
                  {format.dateTime(date.from, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {format.dateTime(date.to, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </>
              ) : (
                t("pick_a_date")
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="range"
            required
            min={1}
            max={6}
            defaultMonth={date?.from}
            selected={date}
            onSelect={(selected) => {
              setDate(selected);

              const params = new URLSearchParams(searchParams);

              if (!selected.from || !selected.to) {
                params.delete("from");
                params.delete("to");
              } else {
                params.set("from", getUnixTime(selected.from).toString());
                params.set("to", getUnixTime(selected.to).toString());
              }

              router.push(`?${params}`);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
