import React, { useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import InnerHTML from "dangerously-set-html-content";

export const EmbedComponent = props => {
  const [data, setData] = React.useState(null);
  const flourishUrl = props.node.attrs.src
  useEffect(() => {
    setData({ html: props?.node?.attrs?.["data-html"] });
  }, [props]);
  
  return (
    <NodeViewWrapper className="embed-node-view-wrapper">
      {data?.html ? (
        <InnerHTML className="embed-content" html={data.html} />
      ) : flourishUrl ? (
        <InnerHTML className="embed-content" html={`<iframe src="${flourishUrl}" style="width: 100%; height: 575px;" frameborder="0"></iframe>`} />
      ) : null}
    </NodeViewWrapper>
  );
};

export default EmbedComponent;
