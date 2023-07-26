import { mergeAttributes, Node, posToDOMRect } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";

export const ClaimExtension = Node.create({
  name: "claim",

  group: "block",
  // atom: true,
  
  // draggable: true,
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
          claim : {
            default: null,
            parseHTML: element => element.getAttribute('claim')
          } ,
          fact : {
            default: null,
            parseHTML: element => element.getAttribute('fact')
          }
        }

  },
  addStorage() {
    return {
       claims : 100,
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
  addCommands() {
    return {
      setClaim: options =>
      ({ commands , chain }) => {
        return commands.insertContentAt(this.editor.state.selection.head,{
          type: this.name,
          attrs: options,
        });
      },
    } },
});

export default ClaimExtension;
