import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import EmbedComponent from "./EmbedComponent";

export default Node.create({
  name: "embeds",

  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: null,
      },
      frameborder: {
        default: "0",
      },
      allow: {
        default:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      },
      allowfullscreen: {
        default: "allowfullscreen",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe[src]",
      },
    ];
  },

  addNodeView() {
    return new ReactNodeViewRenderer(EmbedComponent);
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, {
        ...HTMLAttributes,
        class: "video-wrapper",
      }),
    ];
  },

  addCommands() {
    return {
      setEmbed:
        options =>
        ({ tr, commands }) => {
          if (tr.selection?.node?.type?.name === "embeds") {
            return commands.updateAttributes("embeds", options);
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },

      setExternalVideo:
        options =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
    };
  },
});
