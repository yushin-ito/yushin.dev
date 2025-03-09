"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav } from "@/config/nav";
import { cn } from "@/functions/tools";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="flex h-16 w-full items-center px-12 sm:justify-end">
        <nav className="flex gap-6">
          {nav.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium",
                pathname !== item.href && "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
