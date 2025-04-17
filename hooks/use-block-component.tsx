"use client";

import { OutputBlockData } from "@editorjs/editorjs";
import { JSX, useMemo } from "react";
import { z } from "zod";

interface BlockComponentProps {
  components: Record<
    string,
    (data: OutputBlockData["data"]) => JSX.Element | null
  >;
}

const BlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.any(),
});

const BlocksSchema = z.object({
  blocks: z.array(BlockSchema),
});

const getBlockComponent = (code: string) => {
  const raw = JSON.parse(code);

  const { blocks } = BlocksSchema.parse(raw);

  const BlockComponent = ({ components }: BlockComponentProps) => {
    return blocks.map((block) => {
      const Block = components[block.type];

      if (Block) {
        return <Block key={block.id} data={block.data} />;
      }

      return null;
    });
  };

  return BlockComponent;
};

export const useBlockComponent = (code: string) => {
  const BlockComponent = useMemo(() => getBlockComponent(code), [code]);

  return BlockComponent;
};
