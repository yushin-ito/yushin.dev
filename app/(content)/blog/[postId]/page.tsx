import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@/styles/content.css";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { db } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icons from "@/components/icons";
import TableOfContents from "@/components/table-of-contents";
import { getTableOfContents } from "@/actions/content";
import LikeButton from "@/components/like-button";
import Tracker from "@/components/tracker";
import env from "@/env";
import { siteConfig } from "@/config/site";

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

const getPostFromParams = async (params: PostPageProps["params"]) => {
  const { postId } = await params;
  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      thumbnail: true,
      updatedAt: true,
      _count: {
        select: { views: true, likes: true },
      },
    },
  });

  if (!post) {
    return null;
  }

  return post;
};

export const generateMetadata = async ({ params }: PostPageProps) => {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogUrl = new URL("/api/og", env.NEXT_PUBLIC_APP_URL);
  ogUrl.searchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: [],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteConfig.url}/blog/${post.id}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const t = await getTranslations("content.blog");
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const toc = await getTableOfContents(post.content as string);

  const tags = [] as string[];

  return (
    <article className="py-6 md:py-8 lg:py-12">
      <div className="container max-w-5xl">
        <div className="flex w-full items-center justify-between">
          <div className="w-full space-y-2">
            <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
              {post.title}
            </h1>
            <div className="flex w-full justify-between px-1">
              <div className="flex items-center">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  {tags.map((tag) => (
                    <Link key={tag} href={`/tags/${tag}`} className="text-sm">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icons.heart className="size-4" />
                  <p className="text-xs">{post._count.likes}</p>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icons.eye className="size-4" />
                  <p className="text-xs">{post._count.views}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-8 mt-4 w-full" />
        <div className="relative px-1 lg:grid lg:grid-cols-[1fr_120px] lg:gap-20">
          <div className="space-y-8">
            <div dangerouslySetInnerHTML={{ __html: post.content as string }} />
            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
              <Link
                href="/blog"
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
            <div className="sticky top-12 overflow-y-auto">
              <TableOfContents items={toc} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8">
        <LikeButton postId={post.id} />
      </div>
      <Tracker postId={post.id} />
    </article>
  );
};

export default PostPage;
