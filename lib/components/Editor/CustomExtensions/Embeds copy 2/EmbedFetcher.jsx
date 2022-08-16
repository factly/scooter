import React, { useState } from "react";

import Modal from "components/Common/Modal";

import IframelyDataFetcher from "./IframelyDataFetcher";
import ImageEditor from "./ImageEditor";

const EmbedFetcher = ({
  isVisible,
  setIsVisible,
  editor,
  iframelyEndpoint,
  embedConfig,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUrlFormSubmit = url => {
    setImageUrl(url);
  };

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      closeButton={false}
    >
      <div className="scooter-editor-image-uploader">
        {/* <UnsplashImagePicker
          onSubmit={handleUrlFormSubmit}
          iframelyEndpoint={iframelyEndpoint}
          embedConfig={embedConfig}
        /> */}

        <div className="scooter-editor-image-uploader__content">
          {imageUrl ? (
            <ImageEditor
              url={imageUrl}
              editor={editor}
              onClose={() => {
                setImageUrl(null);
                setIsVisible(false);
              }}
            />
          ) : (
            <IframelyDataFetcher
              onSubmit={handleUrlFormSubmit}
              iframelyEndpoint={iframelyEndpoint}
              embedConfig={embedConfig}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EmbedFetcher;
