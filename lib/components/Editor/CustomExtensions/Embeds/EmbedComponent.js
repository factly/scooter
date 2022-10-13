import React, { useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import InnerHTML from "dangerously-set-html-content";

export default props => {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    setData({ html: props?.node?.attrs?.["data-html"] });
  }, [props]);

  return (
    <NodeViewWrapper className="embed-node-view-wrapper">
      {data && <InnerHTML className="embed-content" html={data.html} />}
    </NodeViewWrapper>
  );
};
