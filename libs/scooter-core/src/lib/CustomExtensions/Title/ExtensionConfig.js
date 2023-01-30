import { mergeAttributes } from "@tiptap/core";
import Heading from "@tiptap/extension-heading";

export default Heading.extend({
  name: "title",
  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `h1`,
      },
    ];
  },

  renderHTML({ _node, HTMLAttributes }) {
    return [
      `h1`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
