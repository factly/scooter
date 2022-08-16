import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import EmbedComponent from "./EmbedComponent";

export default Node.create({
  name: "reactComponent",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      class: {
        default: "embed",
        rendered: true
      },
      'data-url': {
        default: "",
        rendered: true
      },
      'data-html': {
        default: "",
        rendered: true
      },
    };
  },
  addCommands() {
    return {
      setEmbed:
        options =>
        ({ tr, commands }) => {
          // console.log({options})
          if (tr.selection?.node?.type?.name === "embed") {
            return commands.updateAttributes("embed", {src: options.src, 'data-url': options.src, 'data-html': options.data?.html});
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },

      setEmbedAttributes:
        attributes =>
        ({ tr }) => {
          const { selection } = tr;
          const options = {
            ...selection.node.attrs,
            ...attributes,
          };

          const node = this.type.create(options);
          tr.replaceRangeWith(selection.from, selection.to, node);
        },
    };
  },

  parseHTML(elem) {
    // console.log({elem, parseHtml: ''})
    return [
      {
        tag: "div[data-embed]",
      },
    ];
  },

  // renderHTML({ HTMLAttributes }) {
  //   console.log({ HTMLAttributes });
  //   return ["div", mergeAttributes(HTMLAttributes)];
  // },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedComponent);
  },

  renderHTML({ node, HTMLAttributes }) {
    // console.log({ HTMLAttributes,node });
    const { src, alt, caption, data} = HTMLAttributes;

    // delete HTMLAttributes.src;
    // delete HTMLAttributes.alt;
    // delete HTMLAttributes.caption;

    return [
      "div",
      { 'data-embed': '' },
      ["div", { className: "embed-container", 'data-html': HTMLAttributes['data-html'],'data-url': HTMLAttributes['data-url'] } ],
      ["div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
      // ["div", { src, 'data-url': src, 'data-html': data.html }],
    ];
  },
});
