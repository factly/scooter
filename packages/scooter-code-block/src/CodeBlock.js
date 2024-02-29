import TiptapCodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { ReactNodeViewRenderer } from "@tiptap/react";
import { lowlight } from "lowlight";

import { CodeBlock } from "./components/ClodeBlock";

export const ScooterCodeBlock = TiptapCodeBlockLowlight.extend({
  addNodeView() {
    return new ReactNodeViewRenderer(CodeBlock);
  },
}).configure({
  lowlight,
});
