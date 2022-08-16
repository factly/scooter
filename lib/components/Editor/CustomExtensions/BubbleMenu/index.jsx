import { EDITOR_OPTIONS } from "constants/common";

import React, { useState } from "react";

import { BubbleMenu as BubbleMenuTipTap } from "@tiptap/react";
import classnames from "classnames";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";
import { isNilOrEmpty } from "utils/common";

import ImageEditorModal from "./ImageEditorModal";
import ImageOptions from "./ImageOptions";
import TextOptions from "./TextOptions";

const BubbleMenu = ({ editor, options: textOptions }) => {
  const [isInvalidLink, setIsInvalidLink] = useState(false);
  const [isLinkOptionActive, setIsLinkOptionActive] = useState(false);
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const selectedNode = editor && editor.view.state.selection.node;
  const isImageNodeSelected =
    selectedNode && selectedNode.type.name === "image";

  const bubbleMenuOptions = [
    EDITOR_OPTIONS.BOLD,
    EDITOR_OPTIONS.ITALIC,
    EDITOR_OPTIONS.UNDERLINE,
    EDITOR_OPTIONS.STRIKETHROUGH,
    EDITOR_OPTIONS.LINK,
  ];
  const noTextOptions = isNilOrEmpty(
    textOptions.filter(option => bubbleMenuOptions.includes(option))
  );
  if (!editor || (!isImageNodeSelected && noTextOptions)) {
    return null;
  }

  return (
    <div>
      <BubbleMenuTipTap
        editor={editor}
        tippyOptions={{
          arrow: roundArrow,
          zIndex: 99999,
          onHide: () => setIsLinkOptionActive(false),
        }}
        className={classnames("scooter-editor-bubble-menu", {
          "scooter-editor-bubble-menu-animate-shake": isInvalidLink,
        })}
      >
        {isImageNodeSelected ? (
          <ImageOptions
            editor={editor}
            isImageEditorModalOpen={isImageEditorModalOpen}
            setIsImageEditorModalOpen={setIsImageEditorModalOpen}
          />
        ) : (
          <TextOptions
            editor={editor}
            options={textOptions}
            setIsInvalidLink={setIsInvalidLink}
            isLinkOptionActive={isLinkOptionActive}
            setIsLinkOptionActive={setIsLinkOptionActive}
          />
        )}
      </BubbleMenuTipTap>
      <ImageEditorModal
        editor={editor}
        isOpen={isImageEditorModalOpen}
        onClose={() => setIsImageEditorModalOpen(false)}
      />
    </div>
  );
};

export default BubbleMenu;
