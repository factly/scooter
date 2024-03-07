import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Embed from "./components/Embed";

export const ScooterEmbed = Node.create({
  name: "embed",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      class: {
        default: "embed-container",
        rendered: true,
      },
      "data-type": {
        default: "embed",
        rendered: true,
      },
      "data-url": {
        default: "",
        rendered: true,
      },
      "data-html": {
        default: "<p></p>",
        rendered: true,
        parseHTML: element => {
          return element.innerHTML;
        },
      },
    };
  },
  addCommands() {
    return {
      setEmbed: attributes => editor => {
        const { tr, commands } = editor;
        if (tr.selection?.node?.type?.name === "embed") {
          return commands.updateAttributes("embed", {
            src: attributes?.src,
            "data-url": attributes?.src,
            "data-html": attributes?.data?.html,
          });
        }

        return commands.insertContent([
          {
            type: this.name,
            attrs: { src: attributes?.src, "data-html": attributes?.data.html },
          },
        ]);
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

  parseHTML() {
    return [
      {
        tag: "div[data-embed]",
      },
      {
        tag: 'div[class="embed-container"]',
      },
      {
        tag: 'div[class="embed-wrapper"]',
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Embed);
  },

  renderHTML({ HTMLAttributes }) {
    const div = document.createElement("div");

    div.dataset.type = "embed";
    div.className = "embed-wrapper";
    div.innerHTML = HTMLAttributes["data-html"];

    return div;
  },
});
