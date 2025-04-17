"use client";

import { OutputBlockData } from "@editorjs/editorjs";
import { JSX, useMemo } from "react";

interface BlockComponentProps {
  components: Record<
    string,
    (data: OutputBlockData["data"]) => JSX.Element | null
  >;
}

const getBlockComponent = (data: OutputBlockData[]) => {
  const BlockComponent = ({ components }: BlockComponentProps) => {
    return data.map((block) => {
      const Block = components[block.type];

      if (Block) {
        return <Block key={block.id} {...block.data} />;
      }

      return null;
    });
  };

  return BlockComponent;
};

export const useBlockComponent = (data: OutputBlockData[]) => {
  const BlockComponent = useMemo(() => getBlockComponent(data), [data]);

  return BlockComponent;
};
