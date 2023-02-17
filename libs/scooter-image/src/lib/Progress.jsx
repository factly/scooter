import React, { useState, useEffect } from "react";

import { Button } from "@factly/scooter-ui";
import { RiCloseLine } from "react-icons/ri";

export const Progress = ({ uppy }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    uppy.on("progress", setProgress);
  }, [uppy]);

  const progressPercentage = `${progress}%`;

  return (
    <div className="scooter-editor-image-uploader__progress">
      <p className="scooter-editor-image-uploader__progress-title">
        Uploading...
      </p>
      <p className="scooter-editor-image-uploader__progress-file">
        {uppy.getFiles()[0]?.name}
      </p>
      <div
        className="scooter-editor-progress-bar__wrapper"
        data-cy="scooter-editor-image-upload-progress-bar"
      >
        <div className="scooter-editor-progress-bar__percent">
          <p>{progressPercentage}</p>
          <Button
            icon={RiCloseLine}
            onClick={() => uppy.cancelAll()}
            size="small"
            variant="text"
          />
        </div>
        <div className="scooter-editor-progress-bar__indicator">
          <div
            style={{ width: progressPercentage }}
            className="scooter-editor-progress-bar__indicator-inner"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
