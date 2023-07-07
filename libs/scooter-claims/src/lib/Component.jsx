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
    <div>
      <div
        style={{
          margin: "10px 0",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          border: "1px solid #ccc",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span onClick={() => setIsOpen(!isOpen)}>
            {" "}
            {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}{" "}
          </span>
        </div>
        {isOpen && (
          <div
            style={{ margin: "10px 0", padding: "10px", borderRadius: "5px" }}
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
