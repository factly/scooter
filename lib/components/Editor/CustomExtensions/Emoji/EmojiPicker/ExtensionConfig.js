import { Node } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";

import EmojiPickerMenu from "./EmojiPickerMenu";

const EmojiPickerPluginKey = new PluginKey("emoji-picker");

const EmojiPicker = Node.create({
  name: "emojiPicker",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addOptions() {
    return {
      suggestion: {
        char: "::",
        startOfLine: false,
        pluginKey: EmojiPickerPluginKey,
        items: () => [],

        render: () => {
          let reactRenderer;
          let popup;

          return {
            onStart(props) {
              reactRenderer = new ReactRenderer(EmojiPickerMenu, {
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
                placement: "bottom-start",
                zIndex: 99999,
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

export default EmojiPicker;
