import {
  RiParagraph,
  RiH1,
  RiH2,
  RiH3,
  RiListUnordered,
  RiListOrdered,
  RiDoubleQuotesL,
  RiImage2Line,
  RiCodeSSlashFill,
  RiSeparator,
  RiVideoLine,
  RiTableLine,
  RiTaskLine,
} from "react-icons/ri";

import { BiChip } from "react-icons/bi";

import { EDITOR_OPTIONS } from "./constants";

import { formatKeyboardShortcut } from "@factly/scooter-core";

export const GROUPS = [
  {
    name: "ai",
    title: "Scooter AI",
    commands: [
      {
        optionName: EDITOR_OPTIONS.WRITE_WITH_AI,
        title: "AI Writer",
        description: "Write with AI",
        Icon: BiChip,
        action: ({ editor, range }) => {
          return editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent("<tagore-component></tagore-component>")
            .run();
        },
      },
    ],
  },
  {
    name: "factCheck",
    title: "Fact Check",
    commands: [
      {
        optionName: EDITOR_OPTIONS.ADD_EXISTING_CLAIM,
        title: "Add existing claim",
        description: "Add existing claim",
        Icon: RiTaskLine,
        action: editor => editor.chain().focus().run(),
      },
      {
        optionName: EDITOR_OPTIONS.ADD_NEW_CLAIM,
        title: "Add new claim",
        description: "Add new claim",
        Icon: RiTaskLine,
        action: editor => editor.chain().focus().setClaim().run(),
      },
    ],
  },
  {
    name: "basicBlocks",
    title: "Basic Blocks",
    commands: [
      {
        optionName: EDITOR_OPTIONS.PARAGRAPH,
        title: "Paragraph",
        description: "Add a plain text block.",
        keyShortcut: formatKeyboardShortcut("Mod Alt 0"),
        Icon: RiParagraph,
        action: editor => {
          editor.chain().focus().setNode("paragraph").run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.H1,
        title: "H1",
        description: "Add a big heading.",
        keyShortcut: formatKeyboardShortcut("Mod Alt 1"),
        Icon: RiH1,
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.H2,
        title: "H2",
        description: "Add a sub-heading.",
        keyShortcut: formatKeyboardShortcut("Mod Alt 2"),
        Icon: RiH2,
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.H3,
        title: "H3",
        description: "Add a sub-heading of level 3.",
        keyShortcut: formatKeyboardShortcut("Mod Alt 3"),
        Icon: RiH3,
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.LIST_ORDERED,
        title: "Numbered list",
        description: "Add a list with numbering.",
        keyShortcut: formatKeyboardShortcut("Mod Shift 7"),
        Icon: RiListOrdered,
        action: editor => {
          editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.LIST_BULLETS,
        title: "Bulleted list",
        description: "Add a list with bullets.",
        keyShortcut: formatKeyboardShortcut("Mod Shift 8"),
        Icon: RiListUnordered,
        action: editor => {
          editor.chain().focus().toggleBulletList().run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.BLOCKQUOTE,
        title: "Blockquote",
        description: "Add a quote.",
        keyShortcut: formatKeyboardShortcut("Mod Shift B"),
        Icon: RiDoubleQuotesL,
        action: editor => {
          editor.chain().focus().toggleBlockquote().run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.IMAGE_UPLOAD,
        title: "Image",
        description: "Add an image.",
        Icon: RiImage2Line,
        action: editor => {
          editor.chain().focus().setImage().run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.CODE_BLOCK,
        group: "Basic Blocks",
        title: "Code block",
        description: "Add a code block.",
        keyShortcut: formatKeyboardShortcut("Mod Shift C"),
        Icon: RiCodeSSlashFill,
        action: editor => {
          editor.chain().focus().setCodeBlock().run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.TABLE,
        group: "Basic Blocks",
        title: "Table",
        description: "Add a table.",
        Icon: RiTableLine,
        action: editor => {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 2, cols: 2, withHeaderRow: false })
            .run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.DIVIDER,
        group: "Basic Blocks",
        title: "Divider",
        description: "Add an horizontal line to separate sections.",
        Icon: RiSeparator,
        action: editor => {
          editor.chain().focus().setHorizontalRule().run();
        },
      },
      {
        optionName: EDITOR_OPTIONS.EMBED,
        group: "Basic Blocks",
        title: "Embed",
        description: "Embed anything from major services.",
        Icon: RiVideoLine,
        action: editor => editor.chain().focus().setEmbed().run(),
      },
    ],
  },
];
