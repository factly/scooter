import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
// import { Table } from "@factly/scooter-table";
// import { TableRow } from "@factly/scooter-table-row";
// import { TableCell } from "@factly/scooter-table-cell";
// import { TableHeadCell } from "@factly/scooter-table-head-cell";
import { isNilOrEmpty } from "@factly/scooter-shared-utils";

// import { CodeBlockExtension } from "@factly/scooter-code-block";
import Document from "./Document/ExtensionConfig";
// import { EmbedExtension } from "@factly/scooter-embed";
// import EmojiPicker from './Emoji/EmojiPicker/ExtensionConfig'; 
// import EmojiSuggestion from './Emoji/EmojiSuggestion/ExtensionConfig';

import KeyboardShortcuts from "./KeyboardShortcuts/ExtensionConfig";
// import Mention, { createMentionSuggestions } from './Mention/ExtensionConfig';
import Placeholder, {
  placeholderGenerator,
} from "./Placeholder/ExtensionConfig";
import { SlashCommandsExtension } from "@factly/scooter-slash-commands";
import Title from "./Title/ExtensionConfig";
import Typography from "./Typography/EditorConfig";
// import Variable from './Variable/ExtensionConfig';
// import InsertRawHTML from './InsertRawHTML';
// import { TagoreCommandsExtension } from "@factly/scooter-tagore";
// import { ClaimsExtension } from "@factly/scooter-claims";
// import { ClaimExtension } from "@factly/scooter-claim";
import { AiOutlineEdit } from "react-icons/ai";

const useCustomExtensions = ({
  meta = {},
  forceTitle,
  placeholder,
  extensions,
  mentions,
  variables,
  isSlashCommandsActive,
  isTagoreCommandsActive,
  showImageInMention,
  setImageUploadVisible,
  setEmbedFetcherVisible,
  setAddNewClaimVisible,
  setAddExistingClaimVisible,
  options,
  addonCommands,
  characterLimit,
  onSubmit,
  keyboardShortcuts,
  tagoreEndpoint = "http://localhost:8080",
  userId = "20",
  tagoreConfig = {},
}) => {
  const {ClaimsExtension,ClaimExtension, EmbedExtension , Table , TableRow , TableCell , TableHeadCell , CodeBlockExtension , ImageExtensionConfig , TagoreCommandsExtension,...otherExtensions} = extensions || {};
  let customExtensions = [
    Title,
    Document.extend({
      content: forceTitle ? "title block*" : "block+",
    }),
    StarterKit.configure({
      document: false,
      codeBlock: false,
      history: false,
    }),
    Superscript,
    Subscript,
    //InsertRawHTML,
    Underline,
    Typography,
    TextStyle,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Highlight,
    CodeBlockExtension,
    ImageExtensionConfig,
    // Dropcursor,
    EmbedExtension,
    Link,
    Color,
    Placeholder.configure({
      placeholder: placeholderGenerator(placeholder),
    }),
    //   EmojiSuggestion,
    //   EmojiPicker,
    CharacterCount.configure({
      limit: characterLimit,
    }),
    KeyboardShortcuts.configure({
      handleSubmit: onSubmit,
      shortcuts: keyboardShortcuts,
    }),
    Table,
    TableRow,
    TableHeadCell,
    TableCell,
    ClaimExtension?.configure({
      claims : meta?.claims??{},
    }),
    ClaimsExtension,
    TagoreCommandsExtension?.configure({
      apiUrl: tagoreEndpoint,
      userId,
      // (...args) => axios.post(...args).then(res => res.data)
      ...tagoreConfig,
    }),
  ];

  if (isSlashCommandsActive) {
    customExtensions.push(
      SlashCommandsExtension.configure({
        setImageUploadVisible,
        setEmbedFetcherVisible,
        options,
        addonCommands,
        setAddNewClaimVisible,
        setAddExistingClaimVisible,
      })
    );
  }

  // if (!isNilOrEmpty(mentions)) {
  //   customExtensions.push(
  //     Mention.configure({
  //       suggestion: {
  //         items: createMentionSuggestions(mentions, {
  //           showImage: showImageInMention,
  //         }),
  //       },
  //     })
  //   );
  // }

  // if (!isNilOrEmpty(variables)) {
  //   customExtensions.push(
  //     Variable.configure({ suggestion: { items: () => variables } })
  //   );
  // }
 
  if (!isNilOrEmpty(otherExtensions)) {
    customExtensions = customExtensions.concat(otherExtensions);
  }

  return customExtensions;
};

export default useCustomExtensions;
