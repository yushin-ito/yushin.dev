"use client";

import { useEffect, useState } from "react";

import useMounted from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: {
    id: string;
    title: string;
  }[];
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
      { rootMargin: `0% 0% -80% 0%` }
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
    <div className="space-y-0.5 transition-colors">
      <p className="text-sm font-bold">目次</p>
      <ul className="list-decimal pl-5">
        {items.map((item, index) => {
          return (
            <li
              key={index}
              className={cn(
                "pt-1.5",
                item.id === activeId
                  ? "font-medium text-primary marker:font-medium marker:text-primary"
                  : "text-muted-foreground marker:text-muted-foreground"
              )}
            >
              <a
                href={`#${item.id}`}
                className="inline-block text-sm no-underline"
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
