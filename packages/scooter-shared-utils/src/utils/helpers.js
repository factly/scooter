import {
  EDITOR_PADDING_SIZE,
  EDITOR_LINE_HEIGHT,
  EDITOR_BORDER_SIZE,
} from "./constants";
import { EDITOR_OPTIONS } from "./constants";

import { Slice, Fragment, Node } from "@tiptap/pm/model";

export const getIsPlaceholderActive = placeholder => {
  if (placeholder) {
    if (typeof placeholder === "string" && placeholder.length) return true;

    if (typeof placeholder === "object" && Object.keys(placeholder).length) {
      return true;
    }

    if (typeof placeholder === "function") return true;
  }

  return false;
};

export const getEditorStyles = ({ heightStrategy, rows }) => {
  const styles = {};
  const editorHeight =
    rows * EDITOR_LINE_HEIGHT + 2 * (EDITOR_PADDING_SIZE + EDITOR_BORDER_SIZE);
  if (heightStrategy === "flexible") styles["min-height"] = `${editorHeight}px`;
  else styles.height = `${editorHeight}px`;

  return styles;
};

export const generateAddonOptions = (
  defaults,
  extensionList = {},
  { includeImageUpload }
) => {
  const userAddonOptions = [];
  if (includeImageUpload) userAddonOptions.push(EDITOR_OPTIONS.IMAGE_UPLOAD);
  if (extensionList.includes("TagoreCommandsExtension")) {
    userAddonOptions.push(EDITOR_OPTIONS.WRITE_WITH_AI);
    userAddonOptions.push(EDITOR_OPTIONS.ASK_AI);
  }
  if (extensionList.includes("ClaimExtension")) {
    userAddonOptions.push(EDITOR_OPTIONS.ADD_EXISTING_CLAIM);
    userAddonOptions.push(EDITOR_OPTIONS.ADD_NEW_CLAIM);
  }
  if (extensionList.includes("EmbedExtension")) {
    userAddonOptions.push(EDITOR_OPTIONS.EMBED);
  }
  if (extensionList.includes("ImageExtensionConfig")) {
    userAddonOptions.push(EDITOR_OPTIONS.IMAGE_UPLOAD);
  }
  if (extensionList.includes("CodeBlockExtension")) {
    userAddonOptions.push(EDITOR_OPTIONS.CODE_BLOCK);
  }
  if (
    extensionList.includes("Table") &&
    extensionList.includes("TableRow") &&
    extensionList.includes("TableCell") &&
    extensionList.includes("TableHeadCell")
  ) {
    userAddonOptions.push(EDITOR_OPTIONS.TABLE);
  }
  return [].concat(defaults, userAddonOptions);
};

export const clipboardTextParser = (text, context) => {
  const nodes = [];
  const blocks = text.split(/\n/);

  blocks.forEach(line => {
    const nodeJson = { type: "paragraph" };
    if (line.length > 0) {
      nodeJson.content = [{ type: "text", text: line }];
    }
    const node = Node.fromJSON(context.doc.type.schema, nodeJson);
    nodes.push(node);
  });

  const fragment = Fragment.fromArray(nodes);
  return Slice.maxOpen(fragment);
};
