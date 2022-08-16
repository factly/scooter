import { Node, mergeAttributes } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";

import EmojiSuggestionMenu from "./EmojiSuggestionMenu";

const EmojiSuggestionPluginKey = new PluginKey("emoji-suggestion");
const EmojiSuggestion = Node.create({
  name: "emojiSuggestion",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: { class: "scooter-editor-emoji" },
      renderEmoji({ node }) {
        return node.attrs.label;
      },
      suggestion: {},
    };
  },

  addAttributes() {
    return {
      label: {
        default: null,
        parseHTML: element => element.getAttribute("data-label"),
        renderHTML: attributes => {
          if (!attributes.label) {
            return {};
          }

          return {
            "data-label": attributes.label,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-emoji]",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        { "data-emoji": "" },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderEmoji({ node }),
    ];
  },

  renderText({ node }) {
    return this.options.renderEmoji({ node });
  },

  addCommands() {
    return {
      setEmoji:
        emoji =>
        ({ chain }) => {
          chain()
            .focus()
            .insertContent([
              {
                type: this.name,
                attrs: {
                  label: emoji?.native || emoji?.skins[0]?.native || "",
                },
              },
              {
                type: "text",
                text: " ",
              },
            ])
            .run();
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const suggestionConfig = {
  char: ":",
  startOfLine: false,
  pluginKey: EmojiSuggestionPluginKey,
  command: ({ editor, range, props }) => {
    editor.chain().focus().deleteRange(range).setEmoji(props).run();
  },

  items: () => [],

  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart(props) {
        reactRenderer = new ReactRenderer(EmojiSuggestionMenu, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          theme: "light",
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "top-start",
          zIndex: 99999,
        });
      },

      onUpdate(props) {
        reactRenderer.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        return reactRenderer.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        reactRenderer.destroy();
      },
    };
  },
};

export default EmojiSuggestion.configure({ suggestion: suggestionConfig });
