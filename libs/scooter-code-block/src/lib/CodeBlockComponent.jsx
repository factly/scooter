import React from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export const CodeBlockComponent = () => (
  <NodeViewWrapper data-cy="scooter-editor-code-block">
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);

export default CodeBlockComponent;
