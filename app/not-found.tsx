import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NotFound = async () => {
  const t = await getTranslations("root.not_found");

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center space-y-16">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <Link href="/" className={cn(buttonVariants(), "px-8 py-6 rounded-full")}>
        {t("back")}
      </Link>
    </div>
  );
};

export default NotFound;
