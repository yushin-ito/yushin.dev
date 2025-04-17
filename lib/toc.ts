import { toc } from "mdast-util-toc";
import { remark } from "remark";
import type { Link, List, Paragraph, Root, Text } from "mdast";
import { VFile } from "vfile";

const getItems = (list: List) => {
  return list.children.map((item) => {
    const paragraph = item.children[0] as Paragraph;
    const link = paragraph.children[0] as Link;
    const text = link.children[0] as Text;

    return {
      id: link.url.split("#")[1],
      title: text.value,
    };
  });
};

const remarkToc = () => (node: Root, file: VFile) => {
  const table = toc(node, { minDepth: 2, maxDepth: 2 });

  if (table.map) {
    file.data.toc = getItems(table.map);
  }
};

export const getTableOfContents = async (content: string) => {
  const result = await remark().use(remarkToc).process(content);

  return result.data.toc as {
    id: string;
    title: string;
  }[];
};
