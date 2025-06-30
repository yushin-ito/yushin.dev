import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Typewriter from "@/components/typewriter";

export const generateMetadata = async () => {
  const t = await getTranslations("content.top.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const TopPage = async () => {
  const t = await getTranslations("content.top");

  return (
    <section className="container flex max-w-5xl flex-col items-center justify-center space-y-8 py-16 md:h-[calc(100vh-6rem)] md:flex-row md:space-x-12">
      <Image
        src="/images/icon.png"
        alt="avatar"
        width={512}
        height={512}
        className="size-[240px] rounded-full md:size-[280px]"
        priority
        loading="eager"
      />
      <div className="hidden space-y-4 md:block">
        <div className="space-y-2">
          <div className="flex items-center justify-start space-x-6">
            <div className="space-y-0.5 text-center">
              <p className="text-lg font-semibold tracking-widest">ITO</p>
              <h1 className="text-4xl font-bold tracking-[0.175rem]">伊藤</h1>
            </div>
            <div className="space-y-0.5 text-center">
              <p className="text-lg font-semibold tracking-widest">YUSHIN</p>
              <h1 className="text-4xl font-bold tracking-[0.175rem]">優心</h1>
            </div>
          </div>
          <p className="text-start text-muted-foreground">{t("birthday")}</p>
        </div>
        <p className="max-w-md text-start leading-relaxed">{t("profile")}</p>
      </div>
      <div className="space-y-2 text-center md:hidden">
        <Typewriter cursor="|" speed={100} className="text-3xl font-bold">
          Hi, I&apos;m Yushin Ito
        </Typewriter>
        <p className="text-muted-foreground">
          Junior Web Developer & CS Student
        </p>
      </div>
    </section>
  );
};

export default TopPage;
