import { useState } from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { RiFileCopy2Line } from "react-icons/ri";

import "../styles/scooter-code-block.scss";

export const CodeBlock = ({ node }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (
      node &&
      node.content &&
      node.content.content[0] &&
      node.content.content[0].text
    ) {
      navigator.clipboard.writeText(node.content.content[0].text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <NodeViewWrapper data-cy="scooter-editor-code-block">
      <pre className="scooter-editor-code-block">
        <button onClick={handleCopy}>
          {copied ? (
            <span className="copied-message">Copied!</span>
          ) : (
            <>
              {" "}
              <RiFileCopy2Line /> Copy{" "}
            </>
          )}
        </button>

        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
