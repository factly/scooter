import { mergeAttributes, Node, posToDOMRect } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";

export const ClaimsExtension = Node.create({
  name: "claims",

  group: "block",
  content: "claim+",
  parseHTML() {
    return [
      {
        tag: "claims",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["claims", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

export default ClaimsExtension;
