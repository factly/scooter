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
} from "react-icons/ri";

export const EDITOR_OPTIONS = {
  // DEFAULT EDITOR OPTIONS
  FONT_COLOR: "font-color",
  BOLD: "bold",
  ITALIC: "italic",
  UNDERLINE: "underline",
  STRIKETHROUGH: "strike",
  LINK: "link",
  PARAGRAPH: "paragraph",
  H1: "h1",
  H2: "h2",
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

  // OTHER AVAILABLE OPTIONS
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
};
export const MENU_ITEMS = {
  PARAGRAPH: {
    optionName: EDITOR_OPTIONS.PARAGRAPH,
    title: "Paragraph",
    description: "Add a plain text block.",
    Icon: RiParagraph,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  H1: {
    optionName: EDITOR_OPTIONS.H1,
    title: "H1",
    description: "Add a big heading.",
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
    title: "H2",
    description: "Add a sub-heading.",
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
    title: "H3",
    description: "Add a sub-heading of level 3.",
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
    title: "H4",
    description: "Add a sub-heading of level 4.",
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
    title: "H5",
    description: "Add a sub-heading of level 5.",
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
    title: "H6",
    description: "Add a sub-heading of level 6.",
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
    title: "Numbered list",
    description: "Add a list with numbering.",
    Icon: RiListOrdered,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  LIST_BULLETS: {
    optionName: EDITOR_OPTIONS.LIST_BULLETS,
    title: "Bulleted list",
    description: "Add a list with bullets.",
    Icon: RiListUnordered,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  BLOCKQUOTE: {
    optionName: EDITOR_OPTIONS.BLOCKQUOTE,
    title: "Blockquote",
    description: "Add a quote.",
    Icon: RiDoubleQuotesL,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  IMAGE: {
    optionName: EDITOR_OPTIONS.IMAGE_UPLOAD,
    title: "Image",
    description: "Add an image.",
    Icon: RiImage2Line,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
  },
  CODE: {
    optionName: EDITOR_OPTIONS.CODE_BLOCK,
    title: "Code block",
    description: "Add a code block with syntax highlighting.",
    Icon: RiCodeSSlashFill,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  EMOJI: {
    optionName: EDITOR_OPTIONS.EMOJI,
    title: "Emoji",
    description: "Add an emoji.",
    Icon: RiEmotionHappyLine,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("::").run();
    },
  },
  DIVIDER: {
    optionName: EDITOR_OPTIONS.DIVIDER,
    title: "Divider",
    description: "Add an horizontal line to separate sections.",
    Icon: RiSeparator,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  VIDEO: {
    optionName: EDITOR_OPTIONS.VIDEO_EMBED,
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
    title: "Embed",
    description: "Embed anything from major services.",
    Icon: RiVideoLine,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
  },
  RAW_HTML: {
    optionName: EDITOR_OPTIONS.RAW_HTML,
    title: "Raw HTML",
    description: "Insert Raw HTML",
    Icon: RiCodeSSlashFill,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
  },

  // placeholder item when no matching results found
  NO_RESULT: {
    title: "No results",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
    },
  },
};
