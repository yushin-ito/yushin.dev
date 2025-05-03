"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactSchema } from "@/schemas/contact";
import Icons from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";

type FormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const t = useTranslations("content.contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      console.log(data);

      toast.success(t("success.title"), {
        description: t("success.description"),
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name">{t("name")}</Label>
          <div className="space-y-2">
            <Input
              id="name"
              placeholder={t("name_placeholder")}
              autoComplete="name"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isPending}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-error px-1 text-xs">
                {t(errors.name.message as "too_short_name" | "too_long_name")}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">{t("email")}</Label>
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-error px-1 text-xs">
                {t(errors.email.message as "invalid_email")}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="subject">{t("subject")}</Label>
          <div className="space-y-2">
            <Input
              id="subject"
              placeholder={t("subject_placeholder")}
              disabled={isPending}
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-error px-1 text-xs">
                {t(
                  errors.subject.message as
                    | "too_short_subject"
                    | "too_long_subject"
                )}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="message">{t("message")}</Label>
          <div className="space-y-2">
            <Textarea
              id="message"
              placeholder={t("message_placeholder")}
              className="h-[160px]"
              disabled={isPending}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-error px-1 text-xs">
                {t(
                  (errors.message.message as "too_short_message") ||
                    "too_long_message"
                )}
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-center pt-4">
          <Button className="w-4/5" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {t("submit")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
