import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { lowlight } from "lowlight";

import CodeBlockComponent from "./CodeBlockComponent";

export const CodeBlockExtension = CodeBlockLowlight.extend({
  addNodeView() {
    return new ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({ lowlight });

export default CodeBlockExtension;
