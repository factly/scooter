import { isMacOS } from "@tiptap/core";

export function formatKeyboardShortcut(shortcut) {
    if (isMacOS()) {
      return shortcut
        .replace("Mod", "⌘")
        .replace("Alt", "⌥")
        .replace("Shift", "⇧");
    } else {
      return shortcut.replace("Mod", "Ctrl");
    }
  }
  