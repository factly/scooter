import React from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Input } from "components/Common/Input";

const EmbedComponent = () => (
  <NodeViewWrapper data-cy="scooter-editor-embed">
    <Input />
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);

export default EmbedComponent;
