"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { navConfig } from "@/config/nav";
import ModeToggle from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import Icons from "@/components/icons";

const Header = () => {
  const t = useTranslations("contents");
  const pathname = usePathname();

  return (
    <header>
      <div className="flex h-16 items-center justify-between space-x-6 px-10">
        <nav className="hidden space-x-6 md:flex">
          {navConfig.content.map((item, index) => (
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
    </header>
  );
};

export default Header;
