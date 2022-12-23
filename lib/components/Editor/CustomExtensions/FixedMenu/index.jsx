import React, { useState } from "react";

import MenuButton from "components/Common/MenuButton";
import Modal from "components/Common/Modal";
import { EDITOR_OPTIONS } from "lib";
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiMarkPenLine,
  RiCodeSSlashFill,
  RiListUnordered,
  RiListOrdered,
  RiAlignRight,
  RiAlignLeft,
  RiAlignCenter,
  RiImage2Line,
  RiDoubleQuotesL,
  RiTaskLine
} from "react-icons/ri";
import { capitalize } from "utils/common";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkOption from "./LinkOption";
import TextColorOption from "./TextColorOption";

import { getImageMenuOptions } from "../BubbleMenu/helpers";
import ImageEditor from "../Image/ImageEditor";
import Mentions from "../Mention";
import Variables from "../Variable";

const FixedMenu = ({
  editor,
  variables,
  setImageUploadVisible,
  options,
  mentions,
  showImageInMention,
}) => {
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const selectedNode = editor && editor.view.state.selection.node;
  const isImageNodeSelected =
    selectedNode && selectedNode.type.name === "image";
  const isTableNodeSelected =
    selectedNode && selectedNode.type.name === "table";
  const isTextAlignActive = selectedNode && selectedNode.type.name === "text";
  if (!editor) {
    return null;
  }

  const fontStyleOptions = [
    {
      Icon: RiBold,
      command: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      optionName: "bold",
    },
    {
      Icon: RiItalic,
      command: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      optionName: "italic",
    },
    {
      Icon: RiUnderline,
      command: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      optionName: "underline",
    },
    {
      Icon: RiStrikethrough,
      command: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      optionName: "strike",
    },
    {
      Icon: RiMarkPenLine,
      command: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
      optionName: "highlight",
    },
  ].filter(item => options.includes(item.optionName));

  const blockStyleOptions = [
    {
      Icon: RiDoubleQuotesL,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      optionName: "block-quote",
    },
    {
      Icon: RiCodeSSlashFill,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
      optionName: "code-block",
    },
    {
      Icon: RiImage2Line,
      command: () => setImageUploadVisible(true),
      active: editor.isActive("imageUpload"),
      optionName: "image-upload",
    },
  ].filter(item => options.includes(item.optionName));

  const listStyleOptions = [
    {
      Icon: RiListUnordered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      optionName: "bullet-list",
    },
    {
      Icon: RiListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      optionName: "ordered-list",
    },
    {
      Icon: RiTaskLine,
      command : ()=> editor.chain().focus().toggleTaskList().run(),
      active: editor.isActive("taskList"),
      optionName: "task-list"
    }
  ].filter(item => options.includes(item.optionName));

  const fontSizeOptions = options.filter(option => option.match(/^h[1-6]$/));
  const isTextColorActive = options.includes(EDITOR_OPTIONS.FONT_COLOR);
  const isFontSizeActive = fontSizeOptions.length > 0;
  const isEmojiActive = options.includes(EDITOR_OPTIONS.EMOJI);
  const isLinkActive = options.includes(EDITOR_OPTIONS.LINK);

  const renderOptionButton = ({ Icon, command, active, optionName }, index) => (
    <MenuButton
      key={index}
      icon={Icon}
      iconActive={active}
      onClick={command}
      tooltipProps={{
        content: capitalize(optionName),
        position: "bottom",
        delay: [500],
      }}
      data-cy={`scooter-editor-fixed-menu-${optionName}-option`}
    />
  );

  return (
    <div className="scooter-editor-fixed-menu">
      {isFontSizeActive && (
        <FontSizeOption editor={editor} options={fontSizeOptions} />
      )}
      {fontStyleOptions.map(renderOptionButton)}
      {isTextColorActive && (
        <TextColorOption
          color={editor.getAttributes("textStyle").color}
          onChange={color => editor.chain().focus().setColor(color).run()}
        />
      )}
      {isTextAlignActive && (
        <div className="scooter-editor-fixed-menu-align-options">
          <MenuButton
            icon={RiAlignLeft}
            iconActive={editor.isActive("align", "left")}
            onClick={() => editor.chain().focus().setAlign("left").run()}
            tooltipProps={{
              content: "Left",
              position: "bottom",
              delay: [500],
            }}
            data-cy={`scooter-editor-fixed-menu-align-left-option`}
          />
          <MenuButton
            icon={RiAlignCenter}
            iconActive={editor.isActive("align", "center")}
            onClick={() => editor.chain().focus().setAlign("center").run()}
            tooltipProps={{
              content: "Center",
              position: "bottom",
              delay: [500],
            }}
            data-cy={`scooter-editor-fixed-menu-align-center-option`}
          />
          <MenuButton
            icon={RiAlignRight}
            iconActive={editor.isActive("align", "right")}
            onClick={() => editor.chain().focus().setAlign("right").run()}
            tooltipProps={{
              content: "Right",
              position: "bottom",
              delay: [500],
            }}
            data-cy={`scooter-editor-fixed-menu-align-right-option`}
          />
        </div>
      )}
      {isEmojiActive && <EmojiOption editor={editor} />}
      {isLinkActive && <LinkOption editor={editor} />}
      {blockStyleOptions.map(renderOptionButton)}
      {listStyleOptions.map(renderOptionButton)}
      {isImageNodeSelected &&
        getImageMenuOptions({
          editor,
          isImageEditorModalOpen,
          setIsImageEditorModalOpen,
        }).map(({ Icon, command, active, optionName }, index) => (
          <MenuButton
            key={index}
            icon={Icon}
            iconActive={active}
            onClick={command}
            tooltipProps={{
              content: capitalize(optionName),
              position: "bottom",
              delay: [500],
            }}
            data-cy={`scooter-editor-fixed-menu-${optionName}-option`}
          />
        ))}
      {isTableNodeSelected &&
        getImageMenuOptions({
          editor,
          isImageEditorModalOpen,
          setIsImageEditorModalOpen,
        }).map(({ Icon, command, active, optionName }, index) => (
          <MenuButton
            key={index}
            icon={Icon}
            iconActive={active}
            onClick={command}
            tooltipProps={{
              content: capitalize(optionName),
              position: "bottom",
              delay: [500],
            }}
            data-cy={`scooter-editor-fixed-menu-${optionName}-option`}
          />
        ))}
      <div className="scooter-editor-fixed-menu-addons">
        <Variables editor={editor} variables={variables} />
        <Mentions
          editor={editor}
          mentions={mentions}
          showImageInMention={showImageInMention}
        />
      </div>
      <Modal
        isOpen={isImageEditorModalOpen}
        onClose={() => setIsImageEditorModalOpen(false)}
      >
        <div className="scooter-editor-image-uploader">
          <div className="scooter-editor-image-uploader__content">
            <ImageEditor
              editor={editor}
              onClose={() => setIsImageEditorModalOpen(false)}
              url={selectedNode?.attrs.src}
              alt={selectedNode?.attrs.alt}
              caption={selectedNode?.attrs.caption}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FixedMenu;
