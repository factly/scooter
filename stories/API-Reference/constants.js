export const EDITOR_COMMANDS_TABLE_COLUMNS = ["Command", "Description"];

export const EDITOR_COMMANDS_TABLE_ROWS = [
  ["clearContent()", "Clear the entire editor content."],
  ["insertContent(content)", "Insert content at the current cursor position."],
  ["insertContentAt(position, content)", "Insert content at the given index."],
  [
    "setContent(content)",
    "Replace the whole editor content with the given content.",
  ],
  ["focus()", "Focus the editor."],
  ["blur()", "Removes focus from the editor."],
];

export const EDITOR_METHODS_TABLE_COLUMNS = ["Method", "Description"];

export const EDITOR_METHODS_TABLE_ROWS = [
  ["getHTML()", "Returns the editor content as a valid HTML string."],
  ["getText()", "Returns the editor content as a plain text."],
  ["getJSON()", "Returns the editor content as a JSON object."],
  ["setEditable(bool)", "Controls whether the editor can be editable or not."],
  [
    "isEditable",
    "Returns a boolean value indicating whether the editor is editable or not.",
  ],
  [
    "isEmpty",
    "Returns a boolean value indicating whether the editor is empty or not.",
  ],
];

export const EDITOR_PROP_TABLE_ROWS = [
  [
    "ref",
    "Accepts a React reference. This reference can be used to access TipTap's inbuilt editor methods, such as getHTML().",
    `React.createRef()`,
  ],
  [
    "initialValue",
    "Accepts a valid HTML string. This string will be parsed to HTML and will be displayed as the editor content.",
    `"<p>Hello World</p"`,
  ],
  [
    "onSubmit",
    "Accepts a function. This function will be invoked when the editor is submitted.",
    "(htmlContent) => {}",
  ],
  [
    "onChange",
    "Accepts a function. This function will be invoked whenever the editor content changes, with new the content as argument.",
    `(newContent) => {}`,
  ],
  [
    "onFocus",
    "Accepts a function. This function will be invoked whenever the editor is focused.",
    `() => {}`,
  ],
  [
    "onBlur",
    "Accepts a function. This function will be invoked whenever the editor has lost focus.",
    `() => {}`,
  ],
  [
    "menuType",
    "Describes the menu type that editor should display. value should be one of ['fixed', 'bubble']. Defaults to 'fixed'.",
    `"bubble"`,
  ],
  [
    "hideSlashCommands",
    "Accepts a boolean value. When true, the Slash Commands menu will be hidden.",
    `true`,
  ],
  [
    "placeholder",
    "Accepts a string, an object or a function that returns the placeholder for HTML nodes.",
    `"Input text here"`,
  ],
  [
    "forceTitle",
    "Accepts a boolean value. When true, the content is forced to have a title by default.",
    `true`,
  ],
  [
    "titleError",
    "Accepts a boolean value. When true, an error message will be displayed below the title field when it is empty.",
    `true`,
  ],
  [
    "uploadEndpoint",
    "Accepts an URL endpoint string. This URL will be used for XHR image uploads.",
    `"/api/v1/direct_uploads"`,
  ],
  [
    "variables",
    "Accepts an array of variable suggestions.",
    `[{ label: "Subdomain", key: "subdomain" }]`,
  ],
  [
    "mentions",
    "Accepts an array of mention suggestions.",
    `[{ name: "Oliver Smith", key: "oliver-smith" }]`,
  ],
  [
    "showImageInMention",
    "Accepts a boolean value. This value controls the visibility of images in mention suggestions.",
    `true`,
  ],
  [
    "formatterOptions",
    "Accepts an array of string values. The values are used to filter actions that should be shown in the Bubble menu.",
    `["bold", "italic", "code", "highlight", "strike", "link"]`,
  ],
  [
    "extensions",
    "Accepts an array of TipTap extensions. When provided, this will be combined with the default set of extensions.",
    `[Bold, Color]`,
  ],
  [
    "className",
    "Accepts a string value. Can be used for further customisation of the editor content layout.",
    `"scooter-editor-content"`,
  ],
  [
    "addons",
    "Accepts an array of strings, each corresponding to the name of an addon.",
    `["highlight", "emoji", "code-block", "block-quote", "image-upload", "divider", "video-embed"]`,
  ],
  [
    "defaults",
    "Accepts an array of strings, each corresponding to the name of a default option.",
    `["h1", "h2", "h3", "h4", "h5", "h6"]`,
  ],
  [
    "addonCommands",
    "Accepts an array of additional custom Slash Command items to be displayed along with pre-defined command items.",
    `[{ title: 'Focus Editor', description: 'Focus the editor', optionName: 'focus-editor', command: ({editor}) => editor.focus() }]`,
  ],
  [
    "characterLimit",
    "Accepts an integer value. When provided, the editor will be limited to a certain number of characters.",
    "1000",
  ],
  [
    "editorSecrets",
    "Accepts an object. Use this prop to pass down API keys and other secrets.",
    `{
      unsplash: "<unsplash-api-key>"
     }`,
  ],
  [
    "rows",
    "Accepts an integer value. When provided, the editor height will be limited to a certain number of rows.",
    "6",
  ],
  [
    "heightStrategy",
    "Accepts a string value. This decides whether the editor height is fixed or flexible.",
    "fixed",
  ],
  [
    "autoFocus",
    "Accepts a boolean value. When true, the editor will be focused on load.",
    "true",
  ],
  [
    "characterCountStrategy",
    "Accepts a string value. This decides on how the character count should be displayed.",
    "limit",
  ],
  [
    "uploadConfig",
    "Accepts an object. This object will be used to configure the image uploader.",
    `{
      autoProceed: true,
      allowMultipleUploads: false,
      restrictions: {
        maxFileSize: 1048576,
        allowedFileTypes: [".jpg"]
      },
    }`,
  ],
];

export const ARG_VALUES = EDITOR_PROP_TABLE_ROWS.reduce((acc, value) => {
  return {
    ...acc,
    [value[0]]: {
      name: value[0],
      description: value[1],
      control: false,
      table: {
        defaultValue: { summary: value[2] },
      },
    },
  };
}, {});
