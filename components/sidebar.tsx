"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { useTranslations } from "next-intl";

import { navConfig } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "@/actions/auth";
import Icons from "./icons";

const Sidebar = () => {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="fixed z-40 flex h-screen flex-col justify-between border-r px-6 py-8">
      <nav className="space-y-6">
        {navConfig.dashboard.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "w-full relative"
              )}
            >
              <Icon className="absolute left-4 size-6" />
              {
                // todo: fix this type
                t(`${item.label as "posts" | "analytics" | "settings"}.title`)
              }
            </Link>
          );
        })}
      </nav>
      <Button
        variant="ghost"
        className="relative w-full"
        onClick={() => {
          startTransition(async () => {
            await signOut();
          });
        }}
        disabled={isPending}
      >
        <Icons.signOut className="absolute left-4 size-6" />
        {t("signout")}
      </Button>
    </div>
  );
};

export default Sidebar;
