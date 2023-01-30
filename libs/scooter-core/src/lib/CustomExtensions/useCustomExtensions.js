import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { isNilOrEmpty } from '../utils/common';

import { CodeBlockExtension } from '@factly/scooter-code-block';
import Document from './Document/ExtensionConfig';
import { EmbedExtension } from '@factly/scooter-embed';
// import EmojiPicker from './Emoji/EmojiPicker/ExtensionConfig';
// import EmojiSuggestion from './Emoji/EmojiSuggestion/ExtensionConfig';
import { ImageExtensionConfig } from '@factly/scooter-image';
import KeyboardShortcuts from './KeyboardShortcuts/ExtensionConfig';
// import Mention, { createMentionSuggestions } from './Mention/ExtensionConfig';
import Placeholder, {
  placeholderGenerator,
} from './Placeholder/ExtensionConfig';
import { SlashCommandsExtension } from '@factly/scooter-slash-commands';
import Title from './Title/ExtensionConfig';
import Typography from './Typography/EditorConfig';
// import Variable from './Variable/ExtensionConfig';
// import InsertRawHTML from './InsertRawHTML';

const useCustomExtensions = ({
  forceTitle,
  placeholder,
  extensions,
  mentions,
  variables,
  isSlashCommandsActive,
  showImageInMention,
  setImageUploadVisible,
  setEmbedFetcherVisible,
  options,
  addonCommands,
  characterLimit,
  onSubmit,
  keyboardShortcuts,
}) => {
  let customExtensions = [
    Title,
    Document.extend({
      content: forceTitle ? 'title block*' : 'block+',
    }),
    StarterKit.configure({
      document: false,
      codeBlock: false,
      history: false,
    }),
    //InsertRawHTML,
    Underline,
    Typography,
    TextStyle,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight,
    CodeBlockExtension,
    ImageExtensionConfig,
    // Dropcursor,
    EmbedExtension,
    Link,
    Color,
    // Placeholder,
    // Placeholder.configure({
    //   placeholder: placeholderGenerator(placeholder),
    // }),
    //   EmojiSuggestion,
    //   EmojiPicker,
    CharacterCount.configure({
      limit: characterLimit,
    }),
    KeyboardShortcuts.configure({
      handleSubmit: onSubmit,
      shortcuts: keyboardShortcuts,
    }),
    Table.configure({
      resizable: true,
      allowTableNodeSelection: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ];

  if (isSlashCommandsActive) {
    customExtensions.push(
      SlashCommandsExtension.configure({
        setImageUploadVisible,
        setEmbedFetcherVisible,
        options,
        addonCommands,
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

  if (!isNilOrEmpty(extensions)) {
    customExtensions = customExtensions.concat(extensions);
  }

  return customExtensions;
};

export default useCustomExtensions;
