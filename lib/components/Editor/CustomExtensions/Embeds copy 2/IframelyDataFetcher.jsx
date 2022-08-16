import React, { useEffect, useState } from "react";

import { getIframelyData } from "apis/iframely";
import Input from "components/Common/Input";
import { isNilOrEmpty } from "utils/common";

const IframelyDataFetcher = ({ onSubmit, iframelyEndpoint, embedConfig }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchIframelyData = async ({ url, embedConfig, iframelyEndpoint }) => {
    try {
      setLoading(true);
      setError(false);
      // console.log({ url });

      const response = await getIframelyData({
        url,
        embedConfig,
        iframelyEndpoint,
      });
      const { data } = response;
      setData(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIframelyData({ url, embedConfig, iframelyEndpoint });
  }, [url]);

  return (
    <div className="scooter-editor-unsplash-wrapper">
      <Input
        name="text"
        value={url}
        placeholder="Search Unsplash"
        onChange={({ target: { value } }) => {
          setUrl(value);
        }}
        data-cy="scooter-editor-unsplash-image-picker-search-input"
      />
      {error && (
        <p
          className="scooter-editor-unsplash-gallery__text"
          data-cy="scooter-editor-unsplash-image-picker-error"
        >
          Something went wrong! Please try again later.
        </p>
      )}
      {!error && !loading && isNilOrEmpty(data) && (
        <p
          className="scooter-editor-unsplash-gallery__text"
          data-cy="scooter-editor-unsplash-image-picker-no-results-error"
        >
          No results
        </p>
      )}
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default IframelyDataFetcher;
