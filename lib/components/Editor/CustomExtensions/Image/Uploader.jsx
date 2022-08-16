import React, { useState } from "react";

import Modal from "components/Common/Modal";
import Tab from "components/Common/Tab";
import useTabBar from "hooks/useTabBar";

import { IMAGE_UPLOAD_OPTIONS } from "./constants";
import ImageEditor from "./ImageEditor";
import LocalUploader from "./LocalUploader";
import UnsplashImagePicker from "./UnsplashImagePicker";
import URLForm from "./URLForm";

const ImageUpload = ({
  editor,
  imageUploadUrl,
  uploadConfig,
  isVisible,
  setIsVisible,
  unsplashApiKey,
  isUnsplashImageUploadActive,
}) => {
  const [activeTab, setActiveTab] = useTabBar(IMAGE_UPLOAD_OPTIONS);
  const [imageUrl, setImageUrl] = useState("");

  const handleUrlFormSubmit = url => {
    setImageUrl(url);
  };

  const tab = {
    gallery: () => (
      <URLForm
        onSubmit={handleUrlFormSubmit}
        buttonLabel="Upload Image"
        placeholder="Paste the image link"
      />
    ),
    local: () => (
      <LocalUploader
        endpoint={imageUploadUrl}
        onSuccess={handleUrlFormSubmit}
        uploadConfig={uploadConfig}
      />
    ),
    link: () => (
      <URLForm
        onSubmit={handleUrlFormSubmit}
        buttonLabel="Upload Image"
        placeholder="Paste the image link"
      />
    ),
    unsplash: () => (
      <UnsplashImagePicker
        unsplashApiKey={unsplashApiKey}
        onSubmit={handleUrlFormSubmit}
      />
    ),
  };

  const ActiveTab = tab[activeTab];

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      closeButton={false}
    >
      <div className="scooter-editor-image-uploader">
        <Tab>
          {IMAGE_UPLOAD_OPTIONS.filter(
            option => option.key !== "unsplash" || isUnsplashImageUploadActive
          ).map(option => (
            <Tab.Item
              key={option.key}
              active={activeTab === option.key}
              onClick={() => setActiveTab(option)}
            >
              {option.title}
            </Tab.Item>
          ))}
        </Tab>

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
            <ActiveTab />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageUpload;
