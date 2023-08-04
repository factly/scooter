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
  editor,
  ...props
}) => {
  // const claims = editor.storage.claims
  return (
    <NodeViewWrapper className="scooter-editor-claim" 
    // contentEditable={false}
    >
      <div
        className="claim-container"
        contentEditable={false}
      >
        <div
          key={claim.id}
          className="claim-header"
        >
         <h3 style={{ margin: 0 }}>
  {
  //claims[props.node.attrs.id]?.claim ??
   (props.node.attrs.claim ? props.node.attrs.claim : "Claim not found")}</h3>
             {/* <figure 
              contentEditable="false"
              data-drag-handle
              draggable={true}
              className="drag-handle"
             /> */}
        </div>
         <div className="claim-content" >{
         //claims[props.node.attrs.id]?.fact??
         (props.node.attrs.fact ? props.node.attrs.fact : "fact not found")}</div>
      </div>
    </NodeViewWrapper>
  );
};

export default Claim;
