"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { navConfig } from "@/config/nav";
import Icons from "@/components/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const DashboardHeader = () => {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-12 items-center px-4 md:hidden">
      <Sheet>
        <SheetTrigger onClick={() => setOpen(!open)}>
          <Icons.menu className="size-6" />
        </SheetTrigger>
        <SheetContent className="w-3/5" side="left">
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>{t("navigation")}</SheetTitle>
              <SheetDescription />
            </VisuallyHidden>
          </SheetHeader>
          <nav className="space-y-4 py-8">
            {navConfig.dashboard.map((item, index) => {
              const Icon = Icons[item.icon as keyof typeof Icons];

              return (
                <SheetClose asChild key={index}>
                  <Link
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
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-expect-error */}
                    {t(`${item.label}.metadata.title`)}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardHeader;
