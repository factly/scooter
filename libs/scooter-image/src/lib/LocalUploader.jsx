import React, { useState } from "react";

import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import { DragDrop, useUppy } from "@uppy/react";
import Url from "@uppy/url";
//import XHRUpload from "@uppy/xhr-upload";

import {
  DEFAULT_UPPY_CONFIG,
  UPPY_UPLOAD_CONFIG,
  DEFAULT_UPLOAD_ENDPOINT,
} from "./constants";
import Progress from "./Progress";
import { convertToFileSize } from "./utils";

export const LocalUploader = ({
  endpoint = DEFAULT_UPLOAD_ENDPOINT,
  onSuccess,
  onFileAdded = () => {},
  onUploadComplete = () => {},
  uploadConfig,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const uppyConfig = { ...DEFAULT_UPPY_CONFIG, ...uploadConfig };

  const uppy = useUppy(() =>
    new Uppy({
      ...uppyConfig,
      onBeforeFileAdded: file => {
        const { maxFileSize, allowedFileTypes } = uppyConfig.restrictions;

        if (file.size > maxFileSize) {
          setError(
            `File size is too large. Max size is  ${convertToFileSize(
              uppyConfig.restrictions.maxFileSize
            )}.`
          );
          return false;
        } else if (!allowedFileTypes.includes(`.${file.extension}`)) {
          setError(
            `File type is not permitted. Allowed file types are: ${allowedFileTypes.join(
              ", "
            )}.`
          );
          return false;
        }

        return true;
      },
    })
      .use(AwsS3, {
        companionUrl: endpoint,
        ...UPPY_UPLOAD_CONFIG.awsS3,
      })
      .use(Url, { companionUrl: endpoint, ...UPPY_UPLOAD_CONFIG.url })
      //  .use(XHRUpload, { endpoint, ...UPPY_UPLOAD_CONFIG })
      .on("upload", () => setIsUploading(true))
      .on("upload-success", (_, response) => onSuccess(response.uploadURL))
      .on("cancel-all", () => setIsUploading(false))
      .on("file-added", file => onFileAdded(file))
      .on("complete", result => {
        onUploadComplete(result);
        setIsUploading(false);
      })
  );

  return isUploading ? (
    <Progress uppy={uppy} />
  ) : (
    <div className="scooter-editor-image-uploader__dnd-wrapper">
      <DragDrop
        className="scooter-editor-image-uploader__dnd"
        note={`Max. File Size: ${convertToFileSize(
          uppyConfig.restrictions.maxFileSize
        )}`}
        locale={{
          strings: {
            dropHereOr: "Drop your file(s) here or %{browse}",
            browse: "Browse",
          },
        }}
        uppy={uppy}
        data-cy="scooter-editor-image-local-uploader"
      />
      {error && (
        <p className="scooter-editor-image-uploader__dnd--error">{error}</p>
      )}
    </div>
  );
};

export default LocalUploader;
