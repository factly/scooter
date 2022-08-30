import React, { useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { getIframelyData } from "../../../../apis/iframely";
import { sanitize } from "dompurify";
import Input from "components/Common/Input";
import InnerHTML from "dangerously-set-html-content";
//import Input from '../../../Common/Input';

export default props => {
  const [url, setUrl] = React.useState("");
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };

  useEffect(() => {
    setData({ html: props?.node?.attrs?.["data-html"] });
  }, [props]);

  return (
    <NodeViewWrapper className="embed-component-container">
      {data && <InnerHTML className="embed-content" html={data.html} />}
    </NodeViewWrapper>
  );
};
