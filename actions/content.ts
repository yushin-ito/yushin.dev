"use server";

import { JSDOM } from "jsdom";

export const getTableOfContents = async (html: string) => {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const elements = document.querySelectorAll<HTMLDivElement>(
    'div.bn-block-content[data-content-type="heading"][data-level="2"]'
  );

  const toc = Array.from(elements)
    .map((element) => {
      const outer = element.closest<HTMLDivElement>("div.bn-block-outer");
      const id = outer?.getAttribute("data-id") || "";
      const title = element.textContent?.trim() || "";
      return { id, title };
    })
    .filter((item) => item.id && item.title);

  return toc;
};

export const getHTMLWithAnchor = async (html: string) => {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const elements = document.querySelectorAll<HTMLDivElement>(
    'div.bn-block-content[data-content-type="heading"][data-level="2"]'
  );

  elements.forEach((element) => {
    const outer = element.closest<HTMLDivElement>("div.bn-block-outer");
    const id = outer?.getAttribute("data-id");
    if (id) {
      element.setAttribute("id", id);
    }
  });

  return dom.serialize();
};
