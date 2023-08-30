import React, { useState } from "react";

import { Modal } from "@factly/scooter-ui";
import { Tab } from "@factly/scooter-ui";
import { ImageEditor } from "@factly/scooter-ui";
import { useTabBar } from "@factly/scooter-shared-utils";

import { IMAGE_UPLOAD_OPTIONS } from "./constants";
import LocalUploader from "./LocalUploader";
import UnsplashImagePicker from "./UnsplashImagePicker";
import URLForm from "./URLForm";
import Gallery from "./Gallery";

export const Uploader = ({
  editor,
  imageUploadUrl,
  uploadConfig,
  isVisible,
  setIsVisible,
  unsplashApiKey,
  isUnsplashImageUploadActive,
  imagesFetcher,
  itemsPerPage,
  onFileAdded,
  onUploadComplete,
}) => {
  const [activeTab, setActiveTab] = useTabBar(IMAGE_UPLOAD_OPTIONS);
  const [imageUrl, setImageUrl] = useState("");

  const handleUrlFormSubmit = url => {
    setImageUrl(url);
  };

  const tab = {
    gallery: () => (
      <Gallery
        onSubmit={handleUrlFormSubmit}
        imagesFetcher={imagesFetcher}
        itemsPerPage={itemsPerPage}
      />
    ),
    local: () => (
      <LocalUploader
        endpoint={imageUploadUrl}
        onSuccess={handleUrlFormSubmit}
        uploadConfig={uploadConfig}
        onFileAdded={onFileAdded}
        onUploadComplete={onUploadComplete}
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
      onClose={() => {
        setImageUrl(null);
        setIsVisible(false);
      }}
      closeButton={false}
    >
      <div className="scooter-editor-image-uploader">
        <Tab>
          {IMAGE_UPLOAD_OPTIONS.filter(
            option => option.key !== "unsplash" || isUnsplashImageUploadActive
          )
            .filter(option => option.key !== "gallery" || imagesFetcher)
            .map(option => (
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

export default Uploader;
