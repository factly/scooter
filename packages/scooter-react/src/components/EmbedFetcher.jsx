import React, { useRef } from "react";
import { getIframelyData } from "../utils/apis/iframely";
import InnerHTML from "dangerously-set-html-content";
import { Input } from "./shared/Input";
import { Button } from "./shared/Button";
import { Modal } from "./shared/Modal";
import { Loader } from "./shared/Loader";
import { noop } from "../utils/constants";
import "../styles/scooter-embed.scss";

// https://twitter.com/bennythomas03/status/1557766634059997188
export const EmbedFetcher = ({
  isVisible,
  setIsVisible = noop,
  editor,
  iframelyEndpoint,
}) => {
  const ref = useRef();

  const [url, setUrl] = React.useState("");
  const [data, setData] = React.useState(null);
  const [captionText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  const fetchIframelyData = async url => {
    try {
      setLoading(true);
      setError(null);
      const response = await getIframelyData(url, iframelyEndpoint);
      const { data: responseData } = response;
      responseData.html
        ? setData(responseData)
        : setError("Couldn't fetch the data");
    } catch (error) {
      setError("Couldn't fetch data");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = () => {
    editor
      .chain()
      .focus()
      .setEmbed({ src: url, data, caption: captionText })
      .run();
    onClose();
  };

  const onClose = () => {
    setUrl("");
    setData(null);
    setIsVisible(false);
  };

  const handleGetData = () => {
    fetchIframelyData(url);
  };

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      closeButton={false}
    >
      <div className="scooter-editor-embed">
        <div className="scooter-editor-embed__content">
          {data ? (
            <div>
              <InnerHTML className="embed-content" html={data.html} />

              <div className="scooter-editor-image-editor__footer">
                <Button label="Save Changes" onClick={handleSubmit} />
                <Button label="Cancel" variant="text" onClick={onClose} />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "start" }}>
              <Input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                ref={ref}
                error={error}
                autoFocus
              />
              <Button
                style={{ height: "2rem" }}
                onClick={handleGetData}
                label={!loading ? "Fetch Data" : <Loader />}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
