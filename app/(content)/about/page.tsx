import { getTranslations } from "next-intl/server";

import Icons from "@/components/icons";
import TableOfContents from "@/components/table-of-contents";

export const generateMetadata = async () => {
  const t = await getTranslations("content.about.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const AboutPage = async () => {
  const t = await getTranslations("content.about");

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
      <div className="relative px-1 lg:grid lg:grid-cols-[1fr_140px] lg:gap-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 id="introduction" className="font-bold sm:text-lg md:text-xl">
              {t("introduction.title")}
            </h2>
            <p className="whitespace-pre-line leading-relaxed">
              {t("introduction.description")}
            </p>
          </div>
          <div className="space-y-8">
            <div className="space-y-0.5">
              <h2 id="skills" className="font-bold sm:text-lg md:text-xl">
                {t("skills.title")}
              </h2>
              <p className="text-muted-foreground">{t("skills.description")}</p>
            </div>
            <div className="grid grid-cols-4 place-items-center gap-8 px-4 sm:grid-cols-8 sm:gap-12">
              <Icons.python className="size-12 dark:fill-white" />
              <Icons.cplusplus className="size-12 dark:fill-white" />
              <Icons.html5 className="size-12 dark:fill-white" />
              <Icons.css3 className="size-12 dark:fill-white" />
              <Icons.javascript className="size-12 dark:fill-white" />
              <Icons.typescript className="size-12 dark:fill-white" />
              <Icons.ruby className="size-12 dark:fill-white" />
              <Icons.go className="size-12 dark:fill-white" />
              <Icons.react className="size-12 dark:fill-white" />
              <Icons.nextdotjs className="size-12 dark:fill-white" />
              <Icons.tailwindcss className="size-12 dark:fill-white" />
              <Icons.expo className="size-12 dark:fill-white" />
              <Icons.supabase className="size-12 dark:fill-white" />
              <Icons.prisma className="size-12 dark:fill-white" />
              <Icons.github className="size-12 dark:fill-white" />
              <Icons.figma className="size-12 dark:fill-white" />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-12 overflow-y-auto pt-12">
            <TableOfContents
              items={[
                {
                  id: "introduction",
                  title: t("introduction.title"),
                },
                {
                  id: "skills",
                  title: t("skills.title"),
                },
                {
                  id: "career",
                  title: t("career.title"),
                },
                {
                  id: "hobby",
                  title: t("hobby.title"),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
