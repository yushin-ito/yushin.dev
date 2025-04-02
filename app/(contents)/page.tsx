import Image from "next/image";

import Typewriter from "@/components/typewriter";

const TopPage = () => {
  return (
    <section className="container flex max-w-5xl flex-col items-center justify-center space-y-8 py-16 md:h-[calc(100vh-6rem)] md:flex-row md:space-x-12">
      <Image
        src="/images/icon.png"
        alt="Profile Image"
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
          <p className="text-start text-muted-foreground">
            2005年 1月 25日 生まれ
          </p>
        </div>
        <p className="max-w-md text-start">
          筑波大学 情報学群 情報科学類の3年生です。 鈴鹿高専
          電子情報工学科から編入し、現在はWebアプリケーション開発を中心に、フロントエンド・バックエンドの両方を学んでいます。
          新しい技術を試すのが好きで、実践を通じてスキルを磨いています。ユーザー体験を意識した開発を心がけながら、より良いプロダクトを生み出すことを目指しています。
        </p>
      </div>
      <div className="space-y-2 text-center md:hidden">
        <Typewriter cursor="|" speed={100} className="text-3xl font-bold">
          Hi, I&apos;m Yushin Ito
        </Typewriter>
        <p className="text-muted-foreground">Web Developer & Web Designer</p>
      </div>
    </section>
  );
};

export default TopPage;
