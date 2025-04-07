"use client";

import "@/styles/editor.css";

import { useRouter } from "next/navigation";
import EditorJS, { BlockMutationEvent } from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import { useRef, useState, useCallback, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { editorSchema } from "@/schemas/post";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import { getTextFromBlocks } from "@/lib/editor";

type Post = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    content: true;
    published: true;
  };
}>;

interface EditorProps {
  post: Post;
}

type FormData = z.infer<typeof editorSchema>;

const Editor = ({ post }: EditorProps) => {
  const t = useTranslations("editor");
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(editorSchema),
  });
  const ref = useRef<EditorJS | null>(null);
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const initEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    const Header = (await import("@editorjs/header")).default;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const Embed = (await import("@editorjs/embed")).default;

    const Table = (await import("@editorjs/table")).default;

    const List = (await import("@editorjs/list")).default;

    const Code = (await import("@editorjs/code")).default;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const LinkTool = (await import("@editorjs/link")).default;

    const InlineCode = (await import("@editorjs/inline-code")).default;

    const Delimiter = (await import("@editorjs/delimiter")).default;

    const Underline = (await import("@editorjs/underline")).default;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const Maker = (await import("@editorjs/marker")).default;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const RawTool = (await import("@editorjs/raw")).default;

    const Quote = (await import("@editorjs/quote")).default;

    const ImageTool = (await import("@editorjs/image")).default;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const AttachesTool = (await import("@editorjs/attaches")).default;

    const body = editorSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        onChange: async (api, event: BlockMutationEvent) => {
          if (event.type !== "block-changed") {
            return;
          }

          const content = await api.saver.save();
          const text = getTextFromBlocks(content.blocks);

          setCount(text.length);
        },
        placeholder: t("content_placeholder"),
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          delimiter: Delimiter,
          underline: Underline,
          marker: Maker,
          raw: RawTool,
          quote: Quote,
          attaches: {
            class: AttachesTool,
            config: {
              endpoint: "",
              buttonText: t("editorjs.select_file_to_upload"),
              errorMessage: t("editorjs.file_upload_failed"),
            },
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/api/upload",
              },
            },
          },
        },
        i18n: {
          messages: {
            ui: {
              blockTunes: {
                toggler: {
                  "Click to tune": t("editorjs.click_to_tune"),
                  "or drag to move": t("editorjs.or_drag_to_move"),
                },
              },
              inlineToolbar: {
                converter: {
                  "Convert to": t("editorjs.convert_to"),
                },
              },
              toolbar: {
                toolbox: {
                  Add: t("editorjs.add"),
                },
              },
              popover: {
                Filter: t("editorjs.filter"),
                "Nothing found": t("editorjs.nothing_found"),
                "Convert to": t("editorjs.convert_to"),
              },
            },
            toolNames: {
              Attachment: t("editorjs.attachment"),
              Text: t("editorjs.text"),
              Heading: t("editorjs.heading"),
              "Ordered List": t("editorjs.ordered_list"),
              "Unordered List": t("editorjs.unordered_list"),
              Checklist: t("editorjs.checklist"),
              Quote: t("editorjs.quote"),
              Code: t("editorjs.code"),
              Delimiter: t("editorjs.delimiter"),
              "Raw HTML": t("editorjs.raw_html"),
              Table: t("editorjs.table"),
              Link: t("editorjs.link"),
              Marker: t("editorjs.marker"),
              Underline: t("editorjs.underline"),
              Bold: t("editorjs.bold"),
              Italic: t("editorjs.italic"),
              InlineCode: t("editorjs.inline_code"),
              Image: t("editorjs.image"),
            },
            tools: {
              header: {
                "Heading 1": t("editorjs.heading_1"),
                "Heading 2": t("editorjs.heading_2"),
                "Heading 3": t("editorjs.heading_3"),
                "Heading 4": t("editorjs.heading_4"),
                "Heading 5": t("editorjs.heading_5"),
                "Heading 6": t("editorjs.heading_6"),
              },
              link: {
                "Add a link": t("editorjs.add_a_link"),
              },
              linkTool: {
                Link: t("editorjs.link"),
                "Couldn't fetch the link data": t(
                  "editorjs.couldnt_fetch_the_link_data"
                ),
                "Couldn't get this link data, try the other one": t(
                  "editorjs.couldnt_get_this_link_data_try_the_other_one"
                ),
                "Wrong response format from the server": t(
                  "editorjs.wrong_response_format_from_the_server"
                ),
              },
              stub: {
                "The block can not be displayed correctly.": t(
                  "editorjs.the_block_can_not_be_displayed_correctly"
                ),
              },
              image: {
                Caption: t("editorjs.caption"),
                "Select an Image": t("editorjs.select_an_image"),
                "With border": t("editorjs.with_border"),
                "Stretch image": t("editorjs.stretch_image"),
                "With background": t("editorjs.with_background"),
                "Couldn’t upload image. Please try another.": t(
                  "editorjs.couldnt_upload_image_please_try_another"
                ),
              },
              list: {
                Unordered: t("editorjs.unordered"),
                Ordered: t("editorjs.ordered"),
                Checklist: t("editorjs.checklist"),
                "Start with": t("editorjs.start_with"),
                "Counter type": t("editorjs.counter_type"),
                Numeric: t("editorjs.numeric"),
                "Lower Roman": t("editorjs.lower_roman"),
                "Upper Roman": t("editorjs.upper_roman"),
                "Lower Alpha": t("editorjs.lower_alpha"),
                "Upper Alpha": t("editorjs.upper_alpha"),
              },
              table: {
                Heading: t("editorjs.heading"),
                "With headings": t("editorjs.with_headings"),
                "Without headings": t("editorjs.without_headings"),
                Stretch: t("editorjs.stretch"),
                Callapse: t("editorjs.collapse"),
                "Add column to left": t("editorjs.add_column_to_left"),
                "Add column to right": t("editorjs.add_column_to_right"),
                "Delete column": t("editorjs.delete_column"),
                "Add row above": t("editorjs.add_row_above"),
                "Add row below": t("editorjs.add_row_below"),
                "Delete row": t("editorjs.delete_row"),
              },
              raw: {
                "Enter HTML code": t("editorjs.enter_html_code"),
              },
              code: {
                "Enter a code": t("editorjs.enter_a_code"),
              },
              quote: {
                "Align Left": t("editorjs.align_left"),
                "Align Center": t("editorjs.align_center"),
                "Enter a quote": t("editorjs.enter_a_quote"),
                "Enter a caption": t("editorjs.enter_a_caption"),
              },
              convertTo: {
                "Convert to": t("editorjs.convert_to"),
              },
            },
            blockTunes: {
              delete: {
                Delete: t("editorjs.delete"),
                "Click to delete": t("editorjs.click_to_delete"),
              },
              moveUp: {
                "Move up": t("editorjs.move_up"),
              },
              moveDown: {
                "Move down": t("editorjs.move_down"),
              },
            },
          },
        },
      });
    }
  }, [post, t]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initEditor();

      return () => {
        ref.current?.destroy();
        ref.current = null;
      };
    }
  }, [isMounted, initEditor]);

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const content = await ref.current?.save();

      if (!content) {
        toast.error(t("error.title"), {
          description: t("error.description"),
        });

        return;
      }

      const text = getTextFromBlocks(content.blocks);

      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          content,
          preview: text.slice(0, 100),
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
  };

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "pl-2 flex items-center"
            )}
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
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder={t("title_placeholder")}
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
        </div>
      </div>
    </form>
  );
};

export default Editor;
