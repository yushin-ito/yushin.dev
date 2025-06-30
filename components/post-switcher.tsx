"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "@prisma/client";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";

interface PostSwitcherProps {
  posts: Pick<Post, "id" | "title">[];
}

const PostSwitcher = ({ posts }: PostSwitcherProps) => {
  const t = useTranslations("dashboard.analytics");

  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => searchParams.get("postId") || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className="w-[200px] justify-between"
        >
          <span className="truncate">
            {value
              ? posts.find((post) => post.id === value)?.title
              : t("select_post")}
          </span>
          <Icons.chevronsUpDown className="ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={t("search_post")} />
          <CommandList>
            <CommandEmpty>{t("no_post_found")}</CommandEmpty>
            <CommandGroup>
              {posts.map((post) => (
                <CommandItem
                  key={post.id}
                  onSelect={() => {
                    const params = new URLSearchParams(searchParams);

                    if (post.id === value) {
                      params.delete("postId");
                      setValue("");
                    } else {
                      params.set("postId", post.id);
                      setValue(post.id);
                    }
                    router.push(`?${params}`);

                    setOpen(false);
                  }}
                >
                  <span className="truncate text-sm">{post.title}</span>
                  {value && (
                    <Icons.check
                      className={cn(
                        "ml-auto",
                        value === post.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PostSwitcher;
