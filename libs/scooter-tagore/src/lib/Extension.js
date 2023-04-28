import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";

export const TagoreCommandsExtension = Node.create({
  name: "tagore",

  group: "block",

  atom: true,

  addAttributes() {
    return {};
  },
  addOptions() {
    return {
      apiUrl: "http://localhost:8080",
    };
  },

  parseHTML() {
    return [
      {
        tag: "tagore-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["tagore-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

export default TagoreCommandsExtension;
