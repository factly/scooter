import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const dragHandleStyles = {
  flex: '0 0 auto',
  position: 'relative',
  width: '1rem',
  height: '1rem',
  top: '0.3rem',
  marginRight: '0.5rem',
  cursor: 'grab',
  backgroundImage: 'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16"><path fill-opacity="0.2" d="M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>\')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
};


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
          <h3 style={{ margin: 0 }}>{claims[props.node.attrs.id]?.claim??"Claim not found"}</h3>
             <figure 
              contentEditable="false"
              data-drag-handle
              draggable={true}
             style={dragHandleStyles}/>
        </div>
        <div style={{ padding: "24px" }}>{claims[props.node.attrs.id]?.fact??"fact not found"}</div>
      </div>
    </NodeViewWrapper>
  );
};

export default Claim;
