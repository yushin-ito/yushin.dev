import { BlockId, OutputBlockData } from "@editorjs/editorjs";

import env from "@/env";

export const getTextFromBlocks = (blocks: OutputBlockData[]) => {
  return blocks
    .filter((block) => "text" in block.data)
    .map((block) => block.data.text as string)
    .join("");
};

export const generateThumnail = async (id: string, title: string) => {
  const ogUrl = new URL("/api/og", env.NEXT_PUBLIC_APP_URL);
  ogUrl.searchParams.set("title", title);
  ogUrl.searchParams.set("width", "1280");
  ogUrl.searchParams.set("height", "720");

  const response = await fetch(ogUrl.toString());

  if (!response.ok) {
    return null;
  }

  const blob = await response.blob();

  const file = new File([blob], `${id}.png`, { type: "image/png" });

  if (file) {
    const formData = new FormData();
    formData.append("bucket", "images/thumbnails");
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.url as string;
  }
};

export const getTableOfContents = (blocks: OutputBlockData[]) => {
  const result = blocks
    .filter((block) => block.type === "header" && block.data.level === 2)
    .map((block) => {
      return {
        id: block.id as BlockId,
        title: block.data.text as string,
      };
    });

  return result;
};
