"use client";

import { codeBlock } from "@blocknote/code-block";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { en, ja } from "@blocknote/core/locales";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Post } from "@prisma/client";
import { toast } from "sonner";
import { CharacterCount } from "@tiptap/extension-character-count";
import { useRouter } from "next/navigation";

import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { editorSchema } from "@/schemas/post";
import { generateThumnail } from "@/lib/editor";
import LeftArrowConversionExtension from "@/extensions/left-arrow-conversion-extension";
import RightArrowConversionExtension from "@/extensions/right-arrow-conversion-extension";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@/styles/editor.css";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

type FormData = z.infer<typeof editorSchema>;

const Editor = ({ post }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("editor");
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(editorSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const dictionary = locale === "ja" ? ja : en;

  const editor = useCreateBlockNote({
    animations: false,
    codeBlock,
    dictionary: {
      ...dictionary,
      placeholders: {
        emptyDocument: t("content_placeholder"),
      },
    },
    _tiptapOptions: {
      extensions: [
        LeftArrowConversionExtension,
        RightArrowConversionExtension,
        CharacterCount.configure({
          limit: 10000,
        }),
      ],
    },
  });

  const [isDirty, setIsDirty] = useState(false);
  const [count, setCount] = useState(
    editor._tiptapEditor.storage.characterCount.characters()
  );

  const onSubmit = useCallback(
    (data: FormData) => {
      startTransition(async () => {
        setIsDirty(false);

        const html = await editor.blocksToHTMLLossy(editor.document);

        const url = await generateThumnail(post.id, data.title);

        if (!url) {
          toast.error(t("error.title"), {
            description: t("error.description"),
          });

          return;
        }

        const response = await fetch(`/api/posts/${post.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            content: html,
            description: "",
            thumbnail: url,
          }),
        });

        if (!response.ok) {
          toast.error(t("error.title"), {
            description: t("error.description"),
          });

          return;
        }

        router.refresh();

        toast.success(t("success.title"), {
          description: t("success.description"),
        });
      });
    },
    [t, editor, router, post.id]
  );

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);

    const onPopState = () => {
      if (isDirty) {
        setOpen(true);
      }
    };

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [isDirty, setOpen]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "pl-2 flex items-center"
              )}
              onNavigate={(e) => {
                if (isDirty) {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            >
              <Icons.chevronLeft className="size-8" />
              <span className="text-sm">{t("back")}</span>
            </Link>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-muted-foreground">
                {t("char", { count })}
              </span>
              <Button
                type="submit"
                className={cn({ "cursor-not-allowed opacity-60": isPending })}
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.spinner className="size-4 animate-spin" />
                ) : (
                  <span>{t("save")}</span>
                )}
              </Button>
            </div>
          </div>
          <div className="container mx-auto max-w-3xl space-y-4">
            <TextareaAutosize
              id="title"
              defaultValue={post.title}
              className="w-full resize-none appearance-none overflow-hidden  bg-transparent text-5xl font-bold leading-tight focus:outline-none"
              {...register("title")}
              onChange={(e) => {
                setIsDirty(true);
                register("title").onChange(e);
              }}
            />
            <BlockNoteView
              autoFocus
              theme={resolvedTheme as "light" | "dark"}
              editor={editor}
              onChange={() => {
                setIsDirty(true);
                setCount(
                  editor._tiptapEditor.storage.characterCount.characters()
                );
              }}
            />
          </div>
        </div>
      </form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("unload_dialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("unload_dialog.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() =>
                window.history.pushState(null, "", window.location.pathname)
              }
            >
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/dashboard")}>
              {t("continue")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Editor;
