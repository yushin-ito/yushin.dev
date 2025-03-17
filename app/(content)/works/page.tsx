import { compareDesc, formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { allWorks } from "contentlayer/generated";

const WorksPage = () => {
  const works = allWorks
    .filter((work) => work.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.updatedAt), new Date(b.updatedAt));
    });

  return (
    <section className="container max-w-5xl py-6 md:py-8 lg:py-10">
      <div className="space-y-1">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Works</h1>
        <p className="text-sm text-muted-foreground">
          私のポートフォリオへようこそ。このページでは私の作品を紹介しています。
        </p>
      </div>
      <hr className="mb-8 mt-4 w-full" />
      {works.length ? (
        <div className="grid gap-10 px-2 sm:grid-cols-2">
          {works.map((work, index) => (
            <article
              key={work._id}
              className="relative flex flex-col space-y-2"
            >
              <Image
                src={work.thumbnail}
                alt={work.title}
                width={540}
                height={450}
                className="rounded-md border bg-muted transition-colors"
                priority={index <= 1}
              />
              <h2 className="text-2xl font-extrabold">{work.title}</h2>
              <p className="text-muted-foreground">{work.description}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(work.updatedAt, "yyyy/MM/dd")}
              </p>
              <Link href={work.slug} className="absolute inset-0">
                <span className="sr-only">作品を見る</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>作品がありません</p>
      )}
    </section>
  );
};

export default WorksPage;
