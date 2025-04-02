"use client";

import { useTranslations } from "next-intl";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Error = ({ reset }: { reset: () => void }) => {
  const t = useTranslations("root.error");

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center space-y-16">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <Button
        onClick={() => reset()}
        className={cn(buttonVariants(), "px-8 py-6 rounded-full")}
      >
        {t("reload")}
      </Button>
    </div>
  );
};

export default Error;
