import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import BlockQuote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";

import { ScooterHeading } from "@factly/scooter-heading";
import { ScooterTypography } from "@factly/scooter-typography";
import { ScooterSlashCommand } from "@factly/scooter-slash-command";
import { ScooterTableCell, ScooterTableHeader } from "@factly/scooter-table";
import Placeholder from "@tiptap/extension-placeholder";
import { ScooterCodeBlock } from "@factly/scooter-code-block";
import { ScooterImage } from "@factly/scooter-image";

export const useExtensions = ({ characterLimit }) => {
  // const {ClaimsExtension,ClaimExtension, EmbedExtension , Table , TableRow , TableCell , TableHeadCell , CodeBlockExtension , ImageExtensionConfig , TagoreCommandsExtension,...otherExtensions} = extensions || {};
  let extensions = [
    Document,
    StarterKit?.configure({
      document: false,
      codeBlock: false,
      history: false,
    }),
    BlockQuote,
    Superscript,
    Subscript,
    // InsertRawHTML,
    Underline,
    TextStyle,
    TextAlign?.configure({
      types: ["heading", "paragraph"],
    }),
    Highlight,
    // ImageExtensionConfig,
    // EmbedExtension,
    Link,
    Color,
    Placeholder,
    CharacterCount.configure({
      limit: characterLimit,
    }),
    Table.configure({ resizable: true, lastColumnResizable: false }),
    ScooterCodeBlock,
    ScooterImage,
    ScooterTypography,
    ScooterTableCell,
    ScooterTableHeader,
    TableRow.extend({
      allowGapCursor: false,
      content: "tableCell*",
    }),

    // KeyboardShortcuts.configure({
    //   handleSubmit: onSubmit,
    //   shortcuts: keyboardShortcuts,
    // }),
    // Table,
    // TableRow,
    // TableHeadCell,
    // TableCell,
    // ClaimExtension?.configure({
    //   claims : meta?.claims??{},
    // }),
    // ClaimsExtension,
    // TagoreCommandsExtension?.configure({
    //   apiUrl: tagoreEndpoint,
    //   userId,
    //   ...tagoreConfig,
    // }),
    ScooterHeading?.configure({
      levels: [1, 2, 3],
    }),
    ScooterSlashCommand,
  ];

  // if (isSlashCommandsActive) {
  //   customExtensions.push(
  //     SlashCommandsExtension?.configure({
  //       setImageUploadVisible,
  //       setEmbedFetcherVisible,
  //       options,
  //       addonCommands,
  //       setAddNewClaimVisible,
  //       setAddExistingClaimVisible,
  //     })
  //   );
  // }

  // if (!isNilOrEmpty(otherExtensions)) {
  //   customExtensions = customExtensions.concat(otherExtensions);
  // }

  return extensions;
};
