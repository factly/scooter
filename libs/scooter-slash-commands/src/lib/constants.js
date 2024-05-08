import {
  RiParagraph,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiListUnordered,
  RiListOrdered,
  RiDoubleQuotesL,
  RiImage2Line,
  RiCodeSSlashFill,
  RiEmotionHappyLine,
  RiSeparator,
  RiVideoLine,
  RiTableLine,
  RiTaskLine,
} from "react-icons/ri";

import { BiChip } from "react-icons/bi";
import { formatKeyboardShortcut } from "libs/scooter-core/src/lib/utils";


export const EDITOR_OPTIONS = {
  // DEFAULT EDITOR OPTIONS
  FONT_COLOR: "font-color",
  ASK_AI: "ask-ai",
  BOLD: "bold",
  ITALIC: "italic",
  UNDERLINE: "underline",
  STRIKETHROUGH: "strike",
  LINK: "link",
  PARAGRAPH: "paragraph",
  H1: "h1",
  H2: "h2",
  TABLE: "table",
  LIST_BULLETS: "bullet-list",
  LIST_ORDERED: "ordered-list",
  TEXT_ALIGN_LEFT: "text-align-left",
  TEXT_ALIGN_CENTER: "text-align-center",
  TEXT_ALIGN_RIGHT: "text-align-right",
  CODE: "code",

  // ADDON EDITOR OPTIONS
  HIGHLIGHT: "highlight",
  EMOJI: "emoji",
  CODE_BLOCK: "code-block",
  BLOCKQUOTE: "block-quote",
  IMAGE_UPLOAD: "image-upload",
  IMAGE_UPLOAD_UNSPLASH: "image-upload-unsplash",
  DIVIDER: "divider",
  VIDEO_EMBED: "video-embed",
  EMBED: "embed",
  RAW_HTML: "raw-html",
  WRITE_WITH_AI: "write-with-ai",
  ADD_EXISTING_CLAIM: "add-existing-claim",
  ADD_NEW_CLAIM: "add-new-claim",

  // OTHER AVAILABLE OPTIONS
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
};
export const MENU_ITEMS = {
  WRITE_WITH_AI: {
    optionName: EDITOR_OPTIONS.WRITE_WITH_AI,
    title: "Write with AI",
    group : "Basic Blocks",
    description: "Write with AI",
    keyShortcut: formatKeyboardShortcut("Mod /"),
    Icon: BiChip,
    command: ({ editor, range }) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("<tagore-component></tagore-component>")
        .run();
    },
  },
  ADD_EXISTING_CLAIM: {
    optionName: EDITOR_OPTIONS.ADD_EXISTING_CLAIM,
    group : "Fact Check",
    title: "Add existing claim",
    description: "Add existing claim",
    Icon: RiTaskLine, 
    command: ({ editor, range }) =>
    editor.chain().focus().deleteRange(range).run(),
  },
  ADD_NEW_CLAIM: {
    optionName: EDITOR_OPTIONS.ADD_NEW_CLAIM,
    group : "Fact Check",
    title: "Add new claim",
    description: "Add new claim",
    Icon: RiTaskLine,
    command: ({ editor, range }) =>
    editor.chain().focus().deleteRange(range).run(),
  },
  PARAGRAPH: {
    optionName: EDITOR_OPTIONS.PARAGRAPH,
    group : "Basic Blocks",
    title: "Paragraph",
    description: "Add a plain text block.",
    keyShortcut: formatKeyboardShortcut("Mod Alt 0"),
    Icon: RiParagraph,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  H1: {
    optionName: EDITOR_OPTIONS.H1,
    group : "Basic Blocks",
    title: "H1",
    description: "Add a big heading.",
    keyShortcut: formatKeyboardShortcut("Mod Alt 1"),
    Icon: RiH1,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  H2: {
    optionName: EDITOR_OPTIONS.H2,
    group : "Basic Blocks",
    title: "H2",
    description: "Add a sub-heading.",
    keyShortcut: formatKeyboardShortcut("Mod Alt 2"),
    Icon: RiH2,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  H3: {
    optionName: EDITOR_OPTIONS.H3,
    group : "Basic Blocks",
    title: "H3",
    description: "Add a sub-heading of level 3.",
    keyShortcut: formatKeyboardShortcut("Mod Alt 3"),
    Icon: RiH3,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  H4: {
    optionName: EDITOR_OPTIONS.H4,
    group : "Basic Blocks",
    title: "H4",
    description: "Add a sub-heading of level 4.",
    keyShortcut: formatKeyboardShortcut("Mod Alt 4"),
    Icon: RiH4,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 4 })
        .run();
    },
  },
  H5: {
    optionName: EDITOR_OPTIONS.H5,
    group : "Basic Blocks",
    title: "H5",
    description: "Add a sub-heading of level 5.",
    keyShortcut: formatKeyboardShortcut("Mod Alt 5"),
    Icon: RiH5,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 5 })
        .run();
    },
  },
  H6: {
    optionName: EDITOR_OPTIONS.H6,
    group : "Basic Blocks",
    title: "H6",
    description: "Add a sub-heading of level 6.",
    keyShortcut: formatKeyboardShortcut("Mod Alt 6"),
    Icon: RiH6,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 6 })
        .run();
    },
  },
  LIST_ORDERED: {
    optionName: EDITOR_OPTIONS.LIST_ORDERED,
    group : "Basic Blocks",
    title: "Numbered list",
    description: "Add a list with numbering.",
    keyShortcut: formatKeyboardShortcut("Mod Shift 7"),
    Icon: RiListOrdered,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  LIST_BULLETS: {
    optionName: EDITOR_OPTIONS.LIST_BULLETS,
    group : "Basic Blocks",
    title: "Bulleted list",
    description: "Add a list with bullets.",
    keyShortcut: formatKeyboardShortcut("Mod Shift 8"),
    Icon: RiListUnordered,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  BLOCKQUOTE: {
    optionName: EDITOR_OPTIONS.BLOCKQUOTE,
    group : "Basic Blocks",
    title: "Blockquote",
    description: "Add a quote.",
    keyShortcut: formatKeyboardShortcut("Mod Shift B"),
    Icon: RiDoubleQuotesL,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  IMAGE: {
    optionName: EDITOR_OPTIONS.IMAGE_UPLOAD,
    group : "Media",
    title: "Image",
    description: "Add an image.",
    Icon: RiImage2Line,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
  },
  CODE: {
    optionName: EDITOR_OPTIONS.CODE_BLOCK,
    group : "Basic Blocks",
    title: "Code block",
    description: "Add a code block.",
    keyShortcut: formatKeyboardShortcut("Mod Shift C"),
    Icon: RiCodeSSlashFill,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  EMOJI: {
    optionName: EDITOR_OPTIONS.EMOJI,
    group : "Basic Blocks",
    title: "Emoji",
    description: "Add an emoji.",
    Icon: RiEmotionHappyLine,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("::").run();
    },
  },
  TABLE: {
    optionName: EDITOR_OPTIONS.TABLE,
    group : "Basic Blocks",
    title: "Table",
    description: "Add a table.",
    Icon: RiTableLine,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .createTable({ rowsCount: 4, colsCount: 3, withHeaderRow: true })
        .run();
    },
  },
  DIVIDER: {
    optionName: EDITOR_OPTIONS.DIVIDER,
    group : "Basic Blocks",
    title: "Divider",
    description: "Add an horizontal line to separate sections.",
    Icon: RiSeparator,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  VIDEO: {
    optionName: EDITOR_OPTIONS.VIDEO_EMBED,
    group : "Media",
    title: "Embed Youtube/Vimeo",
    description: "Embed a video from major services.",
    Icon: RiVideoLine,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
    //  { const embedURL = prompt("Please enter Youtube/Vimeo embed URL.");

    // const validatedUrl =
    //   validateYouTubeUrl(embedURL) || validateVimeoUrl(embedURL);

    // if (validatedUrl) {
    //   editor
    //     .chain()
    //     .focus()
    //     .deleteRange(range)
    //     .setExternalVideo({ src: validatedUrl })
    //     .run();
    // } else {
    //   editor
    //     .chain()
    //     .focus()
    //     .deleteRange(range)
    //     .insertContent("#invalid")
    //     .run();
    // }
    // },
  },
  EMBED: {
    optionName: EDITOR_OPTIONS.EMBED,
    group : "Basic Blocks",
    title: "Embed",
    description: "Embed anything from major services.",
    Icon: RiVideoLine,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
  },
  RAW_HTML: {
    optionName: EDITOR_OPTIONS.RAW_HTML,
    group : "Basic Blocks",
    title: "Raw HTML",
    description: "Insert Raw HTML",
    Icon: RiCodeSSlashFill,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
  },

  // placeholder item when no matching results found
  NO_RESULT: {
    title: "No results",
    group : "N/A",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
    },
  },
};
