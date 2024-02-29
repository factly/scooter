import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "@tiptap/pm/state";

export const CommandsPluginKey = new PluginKey("commands");

export const CommandsExtension = Extension.create({
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
export default CommandsExtension;
