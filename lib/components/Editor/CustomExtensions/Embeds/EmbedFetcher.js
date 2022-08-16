import React, { useState } from "react";
import { getIframelyData } from "apis/iframely";
import { sanitize } from "dompurify";
import Input from "components/Common/Input";
import Modal from "components/Common/Modal";
import  Button from 'components/Common/Button';

const EmbedFetcher = ({
  isVisible,
  setIsVisible,
  editor,
  iframelyEndpoint,
  embedConfig,
}) => {
  const ref = React.createRef();

  const [url, setUrl] = React.useState("");
  const [data, setData] = React.useState(null);
  const [captionText, setCaptionText] = React.useState("");
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
      console.log({data})
    } catch (error) {
      setError(true);
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
    setIsVisible(false);
  }

  React.useEffect(() => {
    fetchIframelyData(url);
  }, [url]);
  React.useEffect(() => {
   if(isVisible) ref?.current?.focus();
  }, [isVisible]);


  return (
      <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      closeButton={false}
    ><div className="scooter-editor-embed">

        <div className="scooter-editor-embed__content">

          {data ? (
            <div>
               <div
          className="embed-content"
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
          <div className="scooter-editor-image-editor__footer">
        <Button label="Save Changes" onClick={handleSubmit} />
        <Button label="Cancel" style="text" onClick={onClose} />
      </div>
            </div>

          ) : (
            <Input type="text" value={url} onChange={e => setUrl(e.target.value)} ref={ref} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EmbedFetcher;
