import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import LoginForm from "@/components/login-form";
import Icons from "@/components/icons";

interface LoginPageProps {
  params: {
    locale: string;
  };
}

export const generateMetadata = async ({ params }: LoginPageProps) => {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "auth" });

  return {
    title: t("login.title"),
    description: t("login.description"),
  };
};

const LoginPage = async () => {
  const t = await getTranslations("auth");

  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8 pl-2 flex items-center"
        )}
      >
        <Icons.chevronLeft className="size-8" />
        <span className="text-sm">{t("back")}</span>
      </Link>
      <div className="space-y-6 sm:w-[320px]">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">{t("login.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("login.description")}
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          {t("login.do_not_have_account")}{" "}
          <Link href="/signup" className="underline underline-offset-4">
            {t("signup.title")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
