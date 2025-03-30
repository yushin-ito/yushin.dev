import { getTranslations } from "next-intl/server";

import Icons from "@/components/icons";
import TableOfContents from "@/components/table-of-contents";

const AboutPage = async () => {
  const t = await getTranslations("contents.about");

  return (
    <section className="container max-w-5xl py-6 md:py-8 lg:py-10">
      <div className="space-y-2">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <hr className="mb-8 mt-4 w-full" />
      <div className="relative px-1 lg:grid lg:grid-cols-[1fr_120px] lg:gap-12 xl:gap-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 id="introduction" className="font-bold sm:text-lg md:text-xl">
              自己紹介
            </h2>
            <p>
              筑波大学 情報学群 情報科学類の3年生です。鈴鹿工業高等専門学校
              電子情報工学科から編入し、現在はWebアプリケーション開発を中心に、フロントエンド・バックエンドの両方を学んでいます。新しい技術に触れることが好きで、実践を通じてスキルを磨きながら、より良いプロダクトを生み出すことを目指しています。
              <br />
              <br />
              プログラミングをする上で、「シンプルさ」を追求することをモットーに活動しています。シンプルで読みやすいコードを心がけ、ユーザーにとって使いやすいサービスを提供することを意識しています。
              <br />
              <br />
              鈴鹿高専では、バイオディーゼル燃料製造プラントのデジタルトランスフォーメーションに関する研究に取り組んでいました。画像処理を用いた撹拌状態の解析や、IoT技術を活用したシステムの開発を行い、データを活用した最適化の可能性に興味を持つようになりました。この経験から、ハードウェアとソフトウェアの連携や、システム全体の設計を考えることの面白さを実感しました。
              <br />
              <br />
              最近の趣味はWebアプリケーション開発とアニメ鑑賞です。個人開発で様々な技術を試しながら、使いやすく、見た目にもこだわったアプリを作ることを楽しんでいます。一時期はマイコンをいじることにもハマっており、ハードウェアとソフトウェアの融合にも関心があります。
              <br />
              <br />
              今後は、より洗練されたユーザー体験を提供できるような開発に取り組み、技術的な深みを追求していきたいと考えています。常に新しい技術やトレンドをキャッチアップしながら、学び続ける姿勢を大切にしていきます。
              筑波大学 情報学群 情報科学類の3年生です。鈴鹿工業高等専門学校
              電子情報工学科から編入し、現在はWebアプリケーション開発を中心に、フロントエンド・バックエンドの両方を学んでいます。新しい技術に触れることが好きで、実践を通じてスキルを磨きながら、より良いプロダクトを生み出すことを目指しています。
              <br />
              <br />
              プログラミングをする上で、「シンプルさ」を追求することをモットーに活動しています。シンプルで読みやすいコードを心がけ、ユーザーにとって使いやすいサービスを提供することを意識しています。
              <br />
              <br />
              鈴鹿高専では、バイオディーゼル燃料製造プラントのデジタルトランスフォーメーションに関する研究に取り組んでいました。画像処理を用いた撹拌状態の解析や、IoT技術を活用したシステムの開発を行い、データを活用した最適化の可能性に興味を持つようになりました。この経験から、ハードウェアとソフトウェアの連携や、システム全体の設計を考えることの面白さを実感しました。
              <br />
              <br />
              最近の趣味はWebアプリケーション開発とアニメ鑑賞です。個人開発で様々な技術を試しながら、使いやすく、見た目にもこだわったアプリを作ることを楽しんでいます。一時期はマイコンをいじることにもハマっており、ハードウェアとソフトウェアの融合にも関心があります。
              <br />
              <br />
              今後は、より洗練されたユーザー体験を提供できるような開発に取り組み、技術的な深みを追求していきたいと考えています。常に新しい技術やトレンドをキャッチアップしながら、学び続ける姿勢を大切にしていきます。
            </p>
          </div>
          <div className="space-y-8">
            <div className="space-y-0.5">
              <h2 id="skills" className="font-bold sm:text-lg md:text-xl">
                スキル
              </h2>
              <p className="text-muted-foreground">
                私が普段使っているスキルです。
              </p>
            </div>
            <div className="mx-auto grid grid-cols-2 justify-center gap-12 px-4 md:max-w-5xl md:grid-cols-8">
              <Icons.python className="dark:fill-white" />
              <Icons.cplusplus className="dark:fill-white" />
              <Icons.html5 className="dark:fill-white" />
              <Icons.css3 className="dark:fill-white" />
              <Icons.javascript className="dark:fill-white" />
              <Icons.typescript className="dark:fill-white" />
              <Icons.ruby className="dark:fill-white" />
              <Icons.go className="dark:fill-white" />
              <Icons.react className="dark:fill-white" />
              <Icons.nextdotjs className="dark:fill-white" />
              <Icons.tailwindcss className="dark:fill-white" />
              <Icons.expo className="dark:fill-white" />
              <Icons.supabase className="dark:fill-white" />
              <Icons.prisma className="dark:fill-white" />
              <Icons.github className="dark:fill-white" />
              <Icons.figma className="dark:fill-white" />
            </div>
          </div>
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 mt-4 overflow-y-auto pt-6">
            <TableOfContents
              items={[
                {
                  id: "introduction",
                  title: "自己紹介",
                },
                {
                  id: "skills",
                  title: "スキル",
                },
                {
                  id: "career",
                  title: "略歴",
                },
                {
                  id: "hobby",
                  title: "趣味",
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
