import React, { useState } from "react";

import Modal from "components/Common/Modal";

import Embed from "./Embed";
import EmbedView from "./EmbedView";

const EmbedComponent = ({
  editor,
  iframelyUrl,
  embedConfig,
  isVisible,
  setIsVisible,
}) => {
  const [embedUrl, setEmbedUrl] = useState("");
  const embedCaption = "";
  const [embedHtml, setEmbedHtml] = useState("");
  const [embedMeta, setEmbedMeta] = useState({});

  const handleUrlFormSubmit = ({ url, html, meta }) => {
    setEmbedUrl(url);
    setEmbedHtml(html);
    setEmbedMeta(meta);
  };

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      closeButton={false}
    >
      <div className="scooter-editor-image-uploader">
        {/* Iframly */}
        <Embed
          onSubmit={handleUrlFormSubmit}
          iframelyUrl={iframelyUrl}
          embedConfig={embedConfig}
        />

        <div className="scooter-editor-image-uploader__content">
          {embedUrl && (
            <EmbedView
              // ImageEditor
              url={embedUrl}
              editor={editor}
              onClose={() => {
                setEmbedUrl(null);
                setIsVisible(false);
              }}
              meta={embedMeta}
              html={embedHtml}
              caption={embedCaption}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EmbedComponent;
