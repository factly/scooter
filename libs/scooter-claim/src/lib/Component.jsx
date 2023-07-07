import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Claim = ({
  claim = { id: 0, claim: "Default Claim", fact: "Default Fact" },
  index = 0,
  moveClaim = () => {},
  isTop = true,
  isBottom = true,
}) => {
  return (
    <NodeViewWrapper>
      <div
        style={{
          borderRadius: "5px",
          border: "1px solid #ccc",
          margin: "10px 0",
        }}
      >
        <div
          key={claim.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #ccc",
            padding: "12px 24px",
          }}
        >
          <h3 style={{ margin: 0 }}>{claim?.claim}</h3>
          <div>
            <button
              style={{ marginRight: "5px" }}
              onClick={() => moveClaim(index, -1)}
              disabled={isTop}
            >
              <AiOutlineUp />
            </button>
            <button onClick={() => moveClaim(index, 1)} disabled={isBottom}>
              <AiOutlineDown />
            </button>
          </div>
        </div>
        <div style={{ padding: "24px" }}>{claim.fact}</div>
      </div>
    </NodeViewWrapper>
  );
};

export default Claim;
