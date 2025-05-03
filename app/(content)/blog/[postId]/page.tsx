import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@/styles/editor.css";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { db } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icons from "@/components/icons";
import TableOfContents from "@/components/table-of-contents";
import { getTableOfContents } from "@/actions/content";

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const { postId } = await params;

  const t = await getTranslations("content.blog");

  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      thumbnail: true,
      updatedAt: true,
    },
  });

  if (!post) {
    notFound();
  }

  const toc = await getTableOfContents(post.content as string);

  return (
    <article className="py-6 md:py-8 lg:py-12">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
              {post.title}
            </h1>
            {/* <p className="text-sm text-muted-foreground">{post.description}</p> */}
          </div>
        </div>
        <hr className="mb-8 mt-4 w-full" />
        <div className="relative px-1 lg:grid lg:grid-cols-[1fr_120px] lg:gap-20">
          <div className="space-y-8">
            <div dangerouslySetInnerHTML={{ __html: post.content as string }} />
            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
              <Link
                href="/posts"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "pl-2 flex items-center"
                )}
              >
                <Icons.chevronLeft className="size-8" />
                <span className="text-sm">{t("back")}</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-12 overflow-y-auto pt-12">
              <TableOfContents items={toc} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostPage;
