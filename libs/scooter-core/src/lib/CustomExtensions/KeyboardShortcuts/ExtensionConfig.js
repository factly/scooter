import { Extension } from "@tiptap/core";

const KeyboardShortcuts = ({ handleSubmit, shortcuts }) =>
  Extension.create({
    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => {
          handleSubmit?.(this.editor.getHTML());
          this.editor.commands.blur();
          return true;
        },
        ...shortcuts,
      };
    },
  });

export default {
  configure: ({ handleSubmit, shortcuts }) =>
    KeyboardShortcuts({ handleSubmit, shortcuts }),
};
