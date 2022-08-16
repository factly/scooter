const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FILE_TYPES = [".jpg", ".jpeg", ".png", ".gif"];

export const DEFAULT_UPPY_CONFIG = {
  autoProceed: true,
  allowMultipleUploads: false,
  restrictions: {
    maxFileSize: MAX_FILE_SIZE,
    allowedFileTypes: ALLOWED_FILE_TYPES,
  },
};

export const UPPY_UPLOAD_CONFIG = { formData: true, fieldName: "blob" };

export const DEFAULT_UPLOAD_ENDPOINT = "http://127.0.0.1:3020";

export const IMAGE_UPLOAD_OPTIONS = [
  { title: "Gallery", key: "gallery" },
  { title: "Upload", key: "local" },
  { title: "Link", key: "link" },
  { title: "Unsplash", key: "unsplash" },
];
