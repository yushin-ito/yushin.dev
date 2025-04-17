import { OutputBlockData } from "@editorjs/editorjs";
import { HeaderData } from "@editorjs/header";

export const getTextFromBlocks = (blocks: OutputBlockData[]) => {
  return blocks
    .filter((block) => "text" in block.data)
    .map((block) => block.data.text as string)
    .join("");
};

export const getTableOfContents = (blocks: OutputBlockData[]) => {
  const result = blocks
    .filter((block) => block.type === "header" && block.data.level === 2)
    .map(({ data }: { data: HeaderData }) => {
      return {
        id: data.text,
        title: data.text,
      };
    });

  return result;
};
