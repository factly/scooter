import { EDITOR_OPTIONS, isNilOrEmpty } from "@factly/scooter-shared-utils";

import React, { useState, useCallback } from "react";

import { BubbleMenu as TiptapBubbleMenu, isTextSelection } from "@tiptap/react";
import classnames from "classnames";
import { roundArrow } from "tippy.js";
import { TextOptions } from "./components/TextOptions";

const bubbleMenuOptions = [
  EDITOR_OPTIONS.ASK_AI,
  EDITOR_OPTIONS.BOLD,
  EDITOR_OPTIONS.ITALIC,
  EDITOR_OPTIONS.UNDERLINE,
  EDITOR_OPTIONS.STRIKETHROUGH,
  EDITOR_OPTIONS.LINK,
];

export const TextMenu = ({ editor, options: textOptions }) => {
  const [isInvalidLink, setIsInvalidLink] = useState(false);
  const [isLinkOptionActive, setIsLinkOptionActive] = useState(false);

  const shouldShowTextMenu = useCallback(
    ({ view }) => {
      if (!view) {
        return false;
      }

      const {
        state: {
          doc,
          selection,
          selection: { empty, from, to },
        },
      } = editor;

      const isEmpty =
        !doc.textBetween(from, to).length && isTextSelection(selection);

      if (empty || isEmpty || !editor.isEditable) {
        return false;
      }

      return true;
    },
    [editor]
  );

  if (!editor) return null;

  const noTextOptions = isNilOrEmpty(
    textOptions.filter(option => bubbleMenuOptions.includes(option))
  );
  if (!editor || noTextOptions) {
    return null;
  }

  return (
    <div>
      <TiptapBubbleMenu
        editor={editor}
        tippyOptions={{
          theme: "light",
          arrow: roundArrow,
          zIndex: 99999,
          onHide: () => setIsLinkOptionActive(false),
          placement: "top-start", // isTableSelection ? "top-start" : isRowSelection ? "left-start" : "top",
          maxWidth: "none",
        }}
        pluginKey="textMenu"
        shouldShow={shouldShowTextMenu}
        className={classnames("scooter-editor-bubble-menu", {
          "scooter-editor-bubble-menu-animate-shake": isInvalidLink,
        })}
      >
        <TextOptions
          editor={editor}
          options={textOptions}
          setIsInvalidLink={setIsInvalidLink}
          isLinkOptionActive={isLinkOptionActive}
          setIsLinkOptionActive={setIsLinkOptionActive}
        />
      </TiptapBubbleMenu>
    </div>
  );
};
