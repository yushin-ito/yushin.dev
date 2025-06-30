import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeCitation from "rehype-citation";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import type { UnistNode, UnistTree } from "@/types/unist";

export const Deck = defineNestedType(() => ({
  name: "Deck",
  fields: {
    directory: {
      type: "string",
      required: true,
    },
    length: {
      type: "number",
      required: true,
    },
  },
}));

export const Work = defineDocumentType(() => ({
  name: "Work",
  filePathPattern: `works/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    thumbnail: {
      type: "string",
      required: true,
    },
    deck: {
      type: "nested",
      of: Deck,
    },
    published: {
      type: "boolean",
      required: true,
    },
    createdAt: {
      type: "date",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Work],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      rehypeCitation,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: UnistTree) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: UnistNode) {
            node.properties?.className?.push("line--highlighted");
          },
          onVisitHighlightedWord(node: UnistNode) {
            node.properties?.className?.push("word--highlighted");
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
