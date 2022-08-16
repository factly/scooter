import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { getIframelyData } from "../../../../apis/iframely";
import { sanitize } from "dompurify";
import Input from "components/Common/Input";
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

  const fetchIframelyData = async url => {
    try {
      setLoading(true);
      setError(false);

      const response = await getIframelyData(url);
      const { data } = response;
      setData(data);
      // console.log({data,response})
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchIframelyData(url);
  }, [url]);

  return (
    <NodeViewWrapper className="embed-component-container">
      {data && (
        <div
          className="embed-content"
          dangerouslySetInnerHTML={{ __html: data.html }}
        ></div>
      )}
    </NodeViewWrapper>
  );
};
