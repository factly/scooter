import { mergeAttributes } from "@tiptap/core";
import TiptapImage from "@tiptap/extension-image";

export const ScooterImage = TiptapImage.extend({
  name: "image",
  content: "block",

  addAttributes() {
    return {
      ...TiptapImage.config.addAttributes(),
      size: {
        default: "small",
        rendered: false,
      },
      float: {
        default: "none",
        rendered: false,
      },
      align: {
        default: "center",
        rendered: false,
      },
    };
  },

  addCommands() {
    return {
      setImage:
        options =>
        ({ tr, commands }) => {
          if (tr.selection?.node?.type?.name === "image") {
            return commands.updateAttributes("image", options);
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },

      setImageAttributes:
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

  renderHTML({ node, HTMLAttributes }) {
    const { src, alt, caption } = HTMLAttributes;
    const imageClass = node.attrs.size === "large" ? "image-banner" : "";

    HTMLAttributes.class = ` image-size-${node.attrs.size}`;
    HTMLAttributes.class += ` image-float-${node.attrs.float}`;
    HTMLAttributes.class += ` image-align-${node.attrs.align}`;
    delete HTMLAttributes.src;
    delete HTMLAttributes.alt;
    delete HTMLAttributes.caption;

    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ["img", { src, class: imageClass, alt }],
      ["figcaption", caption || ""],
    ];
  },
});
