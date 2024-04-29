import React from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

// import InnerHTML from "dangerously-set-html-content";

export const Embed = props => {
  // const [data, setData] = React.useState(null);

  // useEffect(() => {
  //   setData({ html: props?.node?.attrs?.["data-html"] });
  // }, [props]);

  return (
    <NodeViewWrapper data-cy="scooter-embed-node-view-wrapper">
      <NodeViewContent as="div" />
      {/* {data && <InnerHTML className="embed-content" html={data.html} />} */}
    </NodeViewWrapper>
  );
};
