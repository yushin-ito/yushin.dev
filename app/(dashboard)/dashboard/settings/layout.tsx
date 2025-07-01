import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout = async ({ children }: SettingsLayoutProps) => {
  const t = await getTranslations("dashboard.settings");

  return (
    <section className="container max-w-6xl space-y-10 py-4 md:py-6 lg:py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-bold md:text-xl">
            {t("metadata.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("metadata.description")}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
};

export default SettingsLayout;
