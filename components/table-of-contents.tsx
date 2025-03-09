"use client";

import { useEffect, useState } from "react";

import useMounted from "hooks/use-mounted";
import { cn } from "lib/tools";
import { env } from "env";

interface Item {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: Item[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const mounted = useMounted();
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -60% 0%` }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-0.5">
      <p className="font-bold">目次</p>
      <ul className="m-0 list-decimal pl-5">
        {items.map((item, index) => {
          return (
            <li
              key={index}
              className={cn(
                "mt-0 pt-2",
                item.id === activeId
                  ? "font-medium text-primary marker:font-medium marker:text-primary"
                  : "text-muted-foreground marker:text-muted-foreground"
              )}
            >
              <a
                href={env.NEXT_PUBLIC_SITE_URL + "#" + item.id}
                className="inline-block no-underline"
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContents;
