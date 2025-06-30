import { Decoration, DecorationSource } from "prosemirror-view";

declare module "prosemirror-view" {
  interface NodeView {
    decorations: {
      decorations: Decoration[];
      innerDecorations: DecorationSource;
    };
  }
}