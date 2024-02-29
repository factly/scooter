import { BiPlus } from "react-icons/bi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useEffect, useState } from "react";

export const SideBlockMenu = ({ editor }) => {
  const actions = {};
  const [show, setShow] = useState(true);

  // useEffect(()=>{
  //   editor && setShow(editor.isFocused)
  // }, [editor])
  return (
    <div style={{ display: show ? "flex" : "none", direction: "row" }}>
      <BiPlus size="24px" />
      <RxDragHandleDots2 size="24px" />
    </div>
  );
};
