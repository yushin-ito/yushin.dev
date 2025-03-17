import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { Link, List, Paragraph, Root } from "mdast";
import { VFile } from "vfile";

const getItems = (list: List) => {
  return list.children.map(
    (item) =>
      ((item.children[0] as Paragraph).children[0] as Link).url.split("#")[1]
  );
};

const remarkToc = () => (node: Root, file: VFile) => {
  const table = toc(node, { minDepth: 2, maxDepth: 2 });

  if (table.map) {
    file.data.toc = getItems(table.map);
  }
};

export const getTableOfContents = async (content: string) => {
  const result = await remark().use(remarkToc).process(content);

  return result.data.toc as string[];
};
