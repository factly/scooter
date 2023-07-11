import { mergeAttributes, Node, posToDOMRect } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";

export const ClaimExtension = Node.create({
  name: "claim",

  group: "block",
  
  draggable: true,
  content: 'inline*',

  addAttributes() { 
    return {
          id: {
            default: null,
            parseHTML: element => element.getAttribute('id')
          },
          order: {
            default: null,
            parseHTML: element => element.getAttribute('order')
          },
        }

  },
  parseHTML() {
    return [
      {
        tag: "claim",
      },
    ];
  },
 
  renderHTML({ HTMLAttributes }) {
    return ["claim", mergeAttributes(HTMLAttributes),0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

export default ClaimExtension;
