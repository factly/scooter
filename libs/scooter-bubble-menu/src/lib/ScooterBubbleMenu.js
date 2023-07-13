import { EDITOR_OPTIONS, isNilOrEmpty } from "@factly/scooter-shared-utils";

import React, { useState, useEffect } from "react";

import { BubbleMenu as BubbleMenuTipTap } from "@tiptap/react";
import classnames from "classnames";
import { roundArrow } from "tippy.js";
import ImageEditorModal from "./ImageEditorModal";
import ImageOptions from "./ImageOptions";
import TextOptions from "./TextOptions";
import { CellSelection } from "@tiptap/pm/tables";
import TableRowOptions from "./TableRowOptions";
import TableOptions from "./TableOptions";
import TableColOptions from "./TableColOptions";
import { getRowIndex, getColumnIndex } from "@factly/scooter-shared-utils";

const defaultPosition = {
  left: -1000,
  top: 0,
  offset: 0,
  visible: false,
};

export const BubbleMenu = ({ editor, options: textOptions }) => {
  const [isInvalidLink, setIsInvalidLink] = useState(false);
  const [isLinkOptionActive, setIsLinkOptionActive] = useState(false);
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const [placement, setPlacement] = useState("top");
  const selectedNode = editor && editor.view.state.selection.node;
  const isImageNodeSelected =
    selectedNode && selectedNode.type.name === "image";
  const isTagoreNodeSelected =
    selectedNode && selectedNode.type.name === "tagore";

  let isTableSelection = false;
  let isColSelection = false;
  let isRowSelection = false;

  useEffect(() => {
    if (isTableSelection) {
      setPlacement("top-start");
    } else if (isRowSelection) {
      setPlacement("left-start");
    } else {
      setPlacement("top");
    }
  }, [isTableSelection, isRowSelection]);
  if (!editor) return null;
  const { selection } = editor.view.state;
  let fromPos;
  let toPos;
  try {
    fromPos = editor.view.coordsAtPos(selection.from);
    toPos = editor.view.coordsAtPos(selection.to, -1);
  } catch (err) {
    console.warn(err);
    return defaultPosition;
  }

  // ensure that start < end for the menu to be positioned correctly
  const selectionBounds = {
    top: Math.min(fromPos.top, toPos.top),
    bottom: Math.max(fromPos.bottom, toPos.bottom),
    left: Math.min(fromPos.left, toPos.left),
    right: Math.max(fromPos.right, toPos.right),
  };

  isColSelection =
    selection instanceof CellSelection &&
    selection.isColSelection &&
    selection.isColSelection();
  isRowSelection =
    selection instanceof CellSelection &&
    selection.isRowSelection &&
    selection.isRowSelection();

  if (isColSelection) {
    const { node: element } = editor.view.domAtPos(selection.from);
    const { width } = element.getBoundingClientRect();
    selectionBounds.top -= 20;
    selectionBounds.right = selectionBounds.left + width;
  }

  if (isRowSelection) {
    selectionBounds.right = selectionBounds.left = selectionBounds.left - 18;
  }

  const bubbleMenuOptions = [
    EDITOR_OPTIONS.ASK_AI,
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
  if (isTagoreNodeSelected) {
    return null;
  }

  const colIndex = getColumnIndex(selection);
  const rowIndex = getRowIndex(selection);
  isTableSelection = colIndex !== undefined && rowIndex !== undefined;

  return (
    <div>
      <BubbleMenuTipTap
        editor={editor}
        shouldShow={({ editor,from, to }) => from !== to && !(editor.isActive("claims") || editor.isActive("claim"))}
        tippyOptions={{
          theme: "light",
          arrow: roundArrow,
          zIndex: 99999,
          onHide: () => setIsLinkOptionActive(false),
          placement: "top-start", // isTableSelection ? "top-start" : isRowSelection ? "left-start" : "top",
          maxWidth: "none",
        }}
        className={classnames("scooter-editor-bubble-menu", {
          "scooter-editor-bubble-menu-animate-shake": isInvalidLink,
        })}
      >
        {isTableSelection ? (
          <TableOptions editor={editor} />
        ) : isColSelection ? (
          <TableColOptions editor={editor} colIndex={colIndex} />
        ) : isRowSelection ? (
          <TableRowOptions editor={editor} rowIndex={rowIndex} />
        ) : null}
        {isImageNodeSelected ? (
          <ImageOptions
            editor={editor}
            isImageEditorModalOpen={isImageEditorModalOpen}
            setIsImageEditorModalOpen={setIsImageEditorModalOpen}
          />
        ) : !(
            isTableSelection ||
            colIndex ||
            colIndex === 0 ||
            rowIndex ||
            rowIndex === 0
          ) ? (
          <TextOptions
            editor={editor}
            options={textOptions}
            setIsInvalidLink={setIsInvalidLink}
            isLinkOptionActive={isLinkOptionActive}
            setIsLinkOptionActive={setIsLinkOptionActive}
          />
        ) : null}
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
