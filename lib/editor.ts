import { OutputBlockData } from "@editorjs/editorjs";

export const getTextFromBlocks = (blocks: OutputBlockData[]) => {
  return blocks
    .filter((block) => "text" in block.data)
    .map((block) => block.data.text as string)
    .join("");
};
