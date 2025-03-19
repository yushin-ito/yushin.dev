"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/lib/utils";
import { navConfig } from "@/config/nav";
import ModeToggle from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import Icons from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Header = () => {
  const t = useTranslations("contents");
  const pathname = usePathname();

  return (
    <>
      <div className="hidden h-16 items-center justify-between space-x-6 px-10 md:flex">
        <nav className="flex space-x-6">
          {navConfig.contents.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
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
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" variant="ghost">
            <Icons.menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="md:hidden" side="left">
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>{t("nav")}</SheetTitle>
              <SheetDescription />
            </VisuallyHidden>
          </SheetHeader>
          <nav className="space-4 py-4">
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
    </>
  );
};

export default Header;
