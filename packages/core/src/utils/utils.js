import { isMacOS } from "@tiptap/core";

export function formatKeyboardShortcut(shortcut) {
  if (isMacOS()) {
    return shortcut.replace("Mod", "⌘");
  } else {
    return shortcut.replace("Mod", "Ctrl");
  }
}
