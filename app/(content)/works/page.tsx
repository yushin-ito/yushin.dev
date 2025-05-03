import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { getFormatter, getTranslations } from "next-intl/server";

import { allWorks } from "contentlayer/generated";
import {
  EmptyPlaceholder,
  EmptyPlaceholderIcon,
  EmptyPlaceholderTitle,
  EmptyPlaceholderDescription,
} from "@/components/empty-placeholder";

export const generateMetadata = async () => {
  const t = await getTranslations("content.works.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const WorksPage = async () => {
  const t = await getTranslations("content.works");
  const format = await getFormatter();

  const works = allWorks
    .filter((work) => work.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.updatedAt), new Date(b.updatedAt));
    });

  return (
    <section className="container max-w-5xl py-6 md:py-8 lg:py-10">
      <div className="space-y-2">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
          {t("metadata.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("metadata.description")}
        </p>
      </div>
      <hr className="mb-8 mt-4 w-full" />
      {works.length ? (
        <div className="grid gap-10 px-2 sm:grid-cols-2">
          {works.map((work) => (
            <article
              key={work._id}
              className="group relative flex flex-col space-y-2.5"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image
                  src={work.thumbnail}
                  alt={work.title}
                  fill
                  sizes="(min-width: 640px) 640px, 100vw"
                  className="bg-muted transition-colors"
                />
              </div>
              <div className="space-y-0.5 px-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{work.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {format.relativeTime(new Date(work.updatedAt), new Date())}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {work.description}
                </p>
              </div>
              <Link href={work.slug} className="absolute inset-0">
                <span className="sr-only">{t("view_work")}</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <EmptyPlaceholder className="min-h-[360px] border-none">
          <EmptyPlaceholderIcon name="book" />
          <EmptyPlaceholderTitle>
            {t("empty_placeholder.title")}
          </EmptyPlaceholderTitle>
          <EmptyPlaceholderDescription>
            {t("empty_placeholder.description")}
          </EmptyPlaceholderDescription>
        </EmptyPlaceholder>
      )}
    </section>
  );
};

export default WorksPage;
