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
import { ScooterClaim } from "@factly/scooter-claim";
import { ScooterDragHandle } from "@factly/scooter-drag-handle";
// import { ScooterImage } from "@factly/scooter-image";

export const useExtensions = ({ characterLimit }) => {
  let extensions = [
    Document,
    StarterKit?.configure({
      document: false,
      codeBlock: false,
      history: false,
      dropcursor: true,
    }),
    BlockQuote,
    Superscript,
    Subscript,
    Underline,
    TextStyle,
    TextAlign?.configure({
      types: ["heading", "paragraph"],
    }),
    Highlight,
    Link,
    Color,
    Placeholder,
    CharacterCount.configure({
      limit: characterLimit,
    }),
    Table.configure({ resizable: true, lastColumnResizable: false }),
    ScooterCodeBlock,
    // ScooterImage,
    ScooterClaim,
    ScooterTypography,
    ScooterTableCell,
    ScooterTableHeader,
    TableRow.extend({
      allowGapCursor: false,
      content: "tableCell*",
    }),
    ScooterHeading?.configure({
      levels: [1, 2, 3],
    }),
    ScooterSlashCommand,
    ScooterDragHandle,
  ];

  return extensions;
};
