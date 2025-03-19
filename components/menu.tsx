"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { navConfig } from "@/config/nav";

const Menu = () => {
  const t = useTranslations("contents");
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Icons.menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>{t("nav")}</SheetTitle>
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>
        <div className="space-4 py-4">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
