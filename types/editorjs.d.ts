export interface HeaderData {
  level: number;
  text: string;
}

export interface ParagraphData {
  text: string;
}

export type DelimitorData = object;

type ListDataStyle = "ordered" | "unordered" | "checklist";

type CounterType =
  | "numeric"
  | "upper-roman"
  | "lower-roman"
  | "upper-alpha"
  | "lower-alpha";

export interface ChecklistItemMeta {
  checked: boolean;
}

export interface OrderedListItemMeta {
  start?: number;
  counterType?: CounterType;
}

export type UnorderedListItemMeta = object;

interface ListItem {
  content: string;
  itemMeta: OrderedListItemMeta | UnorderedListItemMeta | ChecklistItemMeta;
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
