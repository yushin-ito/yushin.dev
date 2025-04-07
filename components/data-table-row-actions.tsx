"use client";

import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Icons from "@/components/icons";
import { tableSchema } from "@/schemas/post";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const DataTableRowActions = <TData,>({
  row,
}: DataTableRowActionsProps<TData>) => {
  const t = useTranslations("dashboard.posts");
  const post = tableSchema.parse(row.original);

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <Icons.ellipsis />
            <span className="sr-only">{t("open_menu")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/editor/${post.id}`}>
              <Icons.pencil className="ml-1 mr-2" />
              <span>{t("edit")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.copy className="ml-1 mr-2" />
            <span>{t("duplicate")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-error focus:text-error">
              <Icons.trash className="ml-1 mr-2" />
              <span>{t("delete")}</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete_dialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete_dialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction>{t("continue")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DataTableRowActions;
