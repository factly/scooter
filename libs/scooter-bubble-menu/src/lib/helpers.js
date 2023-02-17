import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiLink,
  RiCodeSSlashFill,
  RiMarkPenLine,
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiComputerLine,
  RiEdit2Line,
  RiChatQuoteLine,
} from "react-icons/ri";

export const getTextMenuOptions = ({ editor, setIsLinkOptionActive }) => [
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
    Icon: RiLink,
    command: () => setIsLinkOptionActive(true),
    active: editor.isActive("link"),
    optionName: "link",
  },
  {
    Icon: RiCodeSSlashFill,
    command: () => editor.chain().focus().toggleCode().run(),
    active: editor.isActive("code"),
    optionName: "code",
  },
  {
    Icon: RiMarkPenLine,
    command: () => editor.chain().focus().toggleHighlight().run(),
    active: editor.isActive("highlight"),
    optionName: "highlight",
  },
  {
    Icon: RiAlignLeft,
    command: () =>
      editor.isActive({ textAlign: "left" })
        ? editor.chain().focus().unsetTextAlign().run()
        : editor.chain().focus().setTextAlign("left").run(),
    active: editor.isActive({ textAlign: "left" }),
    optionName: "text-align-left",
  },
  {
    Icon: RiAlignCenter,
    command: () =>
      editor.isActive({ textAlign: "center" })
        ? editor.chain().focus().unsetTextAlign().run()
        : editor.chain().focus().setTextAlign("center").run(),
    active: editor.isActive({ textAlign: "center" }),
    optionName: "text-align-center",
  },
  {
    Icon: RiAlignRight,
    command: () =>
      editor.isActive({ textAlign: "right" })
        ? editor.chain().focus().unsetTextAlign().run()
        : editor.chain().focus().setTextAlign("right").run(),
    active: editor.isActive({ textAlign: "right" }),
    optionName: "text-align-right",
  },
];

export const getImageMenuOptions = ({
  editor,
  isImageEditorModalOpen,
  setIsImageEditorModalOpen,
}) => [
  {
    Icon: RiAlignLeft,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          size: "small",
          float: "left",
          align: "none",
        })
        .run(),
    active: editor.isActive("image", {
      size: "small",
      float: "left",
      align: "none",
    }),
    optionName: "Float Left",
  },
  {
    Icon: RiAlignCenter,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          size: "small",
          float: "none",
          align: "center",
        })
        .run(),
    active: editor.isActive("image", {
      size: "small",
      float: "none",
      align: "center",
    }),
    optionName: "Align Center",
  },
  {
    Icon: RiComputerLine,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          size: "large",
          float: "none",
          align: "center",
        })
        .run(),
    active: editor.isActive("image", {
      size: "large",
      float: "none",
      align: "center",
    }),
    optionName: "Banner",
  },
  {
    Icon: RiAlignRight,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          size: "small",
          float: "right",
          align: "none",
        })
        .run(),
    active: editor.isActive("image", {
      size: "small",
      float: "right",
      align: "none",
    }),
    optionName: "Float Right",
  },
  {
    Icon: RiEdit2Line,
    command: () => setIsImageEditorModalOpen(true),
    active: isImageEditorModalOpen,
    optionName: "Alt Text",
  },
  {
    Icon: RiChatQuoteLine,
    command: () => setIsImageEditorModalOpen(true),
    active: isImageEditorModalOpen,
    optionName: "Caption",
  },
];

export const getTableMenuOptions = ({ editor, isTableActive }) => [
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
    Icon: RiLink,
    command: () => isTableActive(true),
    active: editor.isActive("link"),
    optionName: "link",
  },
  {
    Icon: RiCodeSSlashFill,
    command: () => editor.chain().focus().toggleCode().run(),
    active: editor.isActive("code"),
    optionName: "code",
  },
  {
    Icon: RiMarkPenLine,
    command: () => editor.chain().focus().toggleHighlight().run(),
    active: editor.isActive("highlight"),
    optionName: "highlight",
  },
];

export const getTableCellOptions = ({ editor, isTableCellActive }) => [
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
    Icon: RiLink,
    command: () => isTableCellActive(true),
    active: editor.isActive("link"),
    optionName: "link",
  },
  {
    Icon: RiCodeSSlashFill,
    command: () => editor.chain().focus().toggleCode().run(),
    active: editor.isActive("code"),
    optionName: "code",
  },
  {
    Icon: RiMarkPenLine,
    command: () => editor.chain().focus().toggleHighlight().run(),
    active: editor.isActive("highlight"),
    optionName: "highlight",
  },
];

export const helpers = {
  getImageMenuOptions,
  getTableCellOptions,
  getTableMenuOptions,
  getTextMenuOptions,
};
export default helpers;
