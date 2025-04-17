export interface HeaderData {
  level: number;
  text: string;
}

export interface ParagraphData {
  text: string;
}

type ListDataStyle = "ordered" | "unordered" | "checklist";

export interface ChecklistItemMeta {
  checked: boolean;
}

export interface OrderedListItemMeta {
  start?: number;
  counterType?: OlCounterType;
}

export type UnorderedListItemMeta = object;

interface ListItem {
  content: string;
  itemMeta: ChecklistItemMeta | OrderedListItemMeta | UnorderedListItemMeta;
  items: ListItem[];
}

export interface ListData extends Omit<ListItem, "content"> {
  style: ListDataStyle;
}

export interface TableData {
  withHeadings: boolean;
  stretched: boolean;
  content: string[][];
}

export interface CodeData {
  code: string;
}

export interface EmbedData {
  service: string;
  source: string;
  embed?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface ImageData {
  file: {
    url: string;
  };
  caption: string;
  withBorder: boolean;
  withBackground: boolean;
  stretched: boolean;
}
