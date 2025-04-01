"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { navConfig } from "@/config/nav";
import ModeToggle from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import Icons from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const t = useTranslations("contents");
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex h-12 items-center justify-between px-4 md:h-16 md:px-10">
      <nav className="hidden space-x-6 md:flex">
        {navConfig.contents.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60"
            )}
          >
            {
              // todo: fix this type
              t(
                `${item.label as "top" | "about" | "works" | "blog" | "contact"}.title`
              )
            }
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger
          className="flex md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
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
            {navConfig.contents.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.href
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "w-full"
                )}
              >
                {
                  // todo: fix this type
                  t(
                    `${item.label as "top" | "about" | "works" | "blog" | "contact"}.title`
                  )
                }
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex space-x-2">
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "ghost" }), "size-8")}
        >
          <Icons.github className="size-6 dark:fill-white" />
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
