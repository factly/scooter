import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";

function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="scooter-editor-claims" contentEditable="false">
      <div
        className="collapsible-container"
      >
        <div className="header"
        >
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span onClick={() => setIsOpen(!isOpen)}>
            {" "}
            {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}{" "}
          </span>
        </div>
        {isOpen && (
          <div className="content"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
export default props => {
  return (
    <NodeViewWrapper>
        <Collapsible title="Claims"><NodeViewContent></NodeViewContent></Collapsible>
    </NodeViewWrapper>
  );
};
