import React, { useState } from "react";

import { Input, Button } from "@factly/scooter-ui";

export const ImageEditor = ({ url, editor, onClose, alt, caption }) => {
  const [altText, setAltText] = useState(alt || "");
  const [captionText, setCaptionText] = useState(caption || "");

  const handleSubmit = () => {
    editor
      .chain()
      .focus()
      .setImage({ src: url, alt: altText, caption: captionText })
      .run();
    onClose();
  };

  const handleKeyDown = event => {
    event.key === "Enter" && handleSubmit();
  };

  return (
    <div className="sc-scooter-editor-image-editor" onKeyDown={handleKeyDown}>
      <img src={url} />
      <Input
        value={captionText}
        onChange={e => setCaptionText(e.target.value)}
        placeholder="Caption the Image or add attribution"
        label="Caption"
      />
      <Input
        value={altText}
        onChange={e => setAltText(e.target.value)}
        placeholder="Brand Image"
        label="Alt Text"
      />
      <div className="sc-scooter-editor-image-editor__footer">
        <Button label="Save Changes" onClick={handleSubmit} />
        <Button label="Cancel" variant="text" onClick={onClose} />
      </div>
    </div>
  );
};

export default ImageEditor;
