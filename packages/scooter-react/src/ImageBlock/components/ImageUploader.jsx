import React, { useState } from "react";

import { useTabBar } from "@factly/scooter-shared-utils";

import { IMAGE_UPLOAD_OPTIONS } from "../utils/constants";
import LocalUploader from "./LocalUploader";
import UnsplashImagePicker from "./UnsplashImagePicker";
import { Modal } from "../../components/shared/Modal";
import { Tab } from "../../components/shared/Tab";
import { ImageBlock } from "../ImageBlock";

import URLForm from "./URLForm";
import Gallery from "./Gallery";

export const ImageUploader = ({
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
            <ImageBlock
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
