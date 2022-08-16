import React, { useState, useEffect } from "react";

//import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { getIframelyData } from "apis/iframely";
import { Input } from "components/Common/Input";

const EmbedComponent = ({ onSubmit, embedConfig, iframelyUrl }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [embedData, setEmbedData] = useState({});

  useEffect(() => {
    fetchIframelydata({ url, embedConfig, iframelyUrl });
    const hello = () => (error, loading, embedData);
    hello();
    onSubmit();
  }, [embedConfig, embedData, error, iframelyUrl, loading, onSubmit, url]);

  const fetchIframelydata = async ({ url, embedConfig, iframelyUrl }) => {
    try {
      setLoading(true);
      setError(false);

      const response = await getIframelyData({
        url,
        embedConfig,
        iframelyUrl,
      });
      const {
        data: { html, meta },
      } = response;
      setEmbedData({ html, meta });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-cy="scooter-editor-embed"
      className="scooter-editor-embed-wrapper"
    >
      <Input
        name="text"
        value={url}
        placeholder="Get Embed Data"
        onChange={({ target: { value } }) => {
          setUrl(value);
        }}
        data-cy="scooter-editor-embed-search-input"
      />
    </div>
  );
};

export default EmbedComponent;
