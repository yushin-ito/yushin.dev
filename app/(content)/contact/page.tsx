import { getTranslations } from "next-intl/server";

import ContactForm from "@/components/contact-form";

export const generateMetadata = async () => {
  const t = await getTranslations("content.contact.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const ContactPage = async () => {
  const t = await getTranslations("content.contact");

  return (
    <section className="container max-w-5xl py-6 md:py-8 lg:py-10">
      <div className="space-y-1.5">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
          {t("metadata.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("metadata.description")}
        </p>
      </div>
      <hr className="mb-8 mt-4 w-full" />
      <div className="mx-auto sm:w-[540px]">
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactPage;
