import { mergeAttributes, Node } from "@tiptap/core";

export const TableRow = Node.create({
  name: "tr",
  content: "(th | td)*",
  tableRole: "row",
  parseHTML: [{ tag: "tr" }],
  renderHTML({ HTMLAttributes }) {
    return [
      "tr",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      class: {
        default: null,
        rendered: true,
      },
    };
  },

  // get schema() {
  //   return {
  //     content: "(th | td)*",
  //     tableRole: "row",
  //     parseDOM: [{ tag: "tr" }],
  //     toDOM() {
  //       return ["tr", 0];
  //     },
  //   };
  // },

  // parseMarkdown() {
  //   return { block: "tr" };
  // }
});
