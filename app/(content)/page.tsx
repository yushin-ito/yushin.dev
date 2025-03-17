import { Avatar, AvatarImage } from "@/components/ui/avatar";

const TopPage = () => {
  return (
    <section className="container flex max-w-5xl items-center justify-center space-x-12 py-16 md:py-24 lg:py-32 xl:h-[calc(100vh-6rem)]">
      <Avatar className="size-72">
        <AvatarImage alt="icon" src="/images/icon.png" />
      </Avatar>
      <div className="max-w-md space-y-4 text-start">
        <div className="space-y-2">
          <div className="flex gap-6 text-center tracking-widest">
            <div className="space-y-0.5">
              <p className="font-semibold">ITO</p>
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                伊藤
              </h1>
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold">YUSHIN</p>
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                優心
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">2005年 1月 25日 生まれ</p>
        </div>
        <p>
          筑波大学 情報学群 情報科学類の3年生です。 鈴鹿高専
          電子情報工学科から編入し、現在はWebアプリケーション開発を中心に、フロントエンド・バックエンドの両方を学んでいます。
          新しい技術を試すのが好きで、実践を通じてスキルを磨いています。ユーザー体験を意識した開発を心がけながら、より良いプロダクトを生み出すことを目指しています。
        </p>
      </div>
    </section>
  );
};

export default TopPage;
