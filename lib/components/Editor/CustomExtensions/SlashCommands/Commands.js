import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";

export const CommandsPluginKey = new PluginKey("commands");

export default Extension.create({
  name: "commands",

  defaultOptions: {},

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
