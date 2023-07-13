import React from "react";
import { NodeViewWrapper } from "@tiptap/react";




const Claim = ({
  claim = { id: 0, claim: "Default Claim", fact: "Default Fact" },
  index = 0,
  moveClaim = () => {},
  isTop = true,
  isBottom = true,
  extension: {
    options: {
     claims
    } = {},
  },
  ...props
}) => {
  return (
    <NodeViewWrapper className="scooter-editor-claim">
      <div
        className="claim-container"
      >
        <div
          key={claim.id}
          className="claim-header"
        >
          <h3 style={{ margin: 0 }}>{claims[props.node.attrs.id]?.claim??"Claim not found"}</h3>
             <figure 
              contentEditable="false"
              data-drag-handle
              draggable={true}
              className="drag-handle"
             />
        </div>
         <div className="claim-content" >{claims[props.node.attrs.id]?.fact??"fact not found"}</div>
      </div>
    </NodeViewWrapper>
  );
};

export default Claim;
