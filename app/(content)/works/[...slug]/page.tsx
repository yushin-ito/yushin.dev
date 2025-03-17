import "@/styles/mdx.css";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { allWorks } from "contentlayer/generated";
import Mdx from "@/components/mdx";
import { buttonVariants } from "@/components/ui/button";
import TableOfContents from "@/components/table-of-contents";
import { getTableOfContents } from "@/lib/toc";
import SlideShow from "@/components/slide-show";
import { cn } from "@/lib/utils";
import Icons from "@/components/icons";
import { siteConfig } from "@/config/site";

interface WorkPageProps {
  params: {
    slug: string[];
  };
}

const getWorkFromParams = (params: WorkPageProps["params"]) => {
  const slug = params.slug.join("/");
  const work = allWorks.find((work) => work.slugAsParams === slug);

  if (!work) {
    return null;
  }

  return work;
};

export const generateMetadata = async ({ params }: WorkPageProps) => {
  const work = getWorkFromParams(params);

  if (!work) {
    return {};
  }

  const url = new URL(`${siteConfig.url}/api/og`);
  url.searchParams.set("heading", work.title);
  url.searchParams.set("type", "Blog Work");
  url.searchParams.set("mode", "dark");

  return {
    title: work.title,
    description: work.description,
    authors: [],
    openGraph: {
      title: work.title,
      description: work.description,
      type: "article",
      url: `${url}/works/${work.slug}`,
      images: [
        {
          url: url.toString(),
          width: 1200,
          height: 630,
          alt: work.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.description,
      images: [url.toString()],
    },
  };
};

export const generateStaticParams = async () => {
  return allWorks.map((work) => ({
    slug: work.slugAsParams.split("/"),
  }));
};

const WorkPage = async ({ params }: WorkPageProps) => {
  const work = getWorkFromParams(params);

  if (!work) {
    notFound();
  }

  const toc = await getTableOfContents(work.body.raw);

  return (
    <article className="py-6 md:py-8 lg:py-12">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
              {work.title}
            </h1>
            <p className="text-sm text-muted-foreground">{work.description}</p>
          </div>
        </div>
        <hr className="mb-8 mt-4 w-full" />
        <div className="relative px-1 lg:grid lg:grid-cols-[1fr_120px] lg:gap-12 xl:gap-20">
          <div className="space-y-8">
            {work.deck ? (
              <SlideShow deck={work.deck} />
            ) : (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted transition-colors">
                <Image src={work.thumbnail} alt={work.title} fill priority />
              </div>
            )}
            <Mdx code={work.body.code} />
            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <Icons.chevronLeft className="mr-2 size-4" />
                戻る
              </Link>
            </div>
          </div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 mt-4 overflow-y-auto pt-6">
              <TableOfContents items={toc} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WorkPage;
