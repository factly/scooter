import React, { useState } from "react";

import Button from "components/Common/Button";
import Input from "components/Common/Input";
import { DOMPurify } from "dompurify";

const EmbedView = ({ url, editor, onClose, meta, html, caption }) => {
  const [captionText, setCaptionText] = useState(caption || "");
  const handleSubmit = () => {
    editor.chain().focus().setEmbed({ src: url, meta, html, caption }).run();
    onClose();
  };

  const handleKeyDown = event => {
    event.key === "Enter" && handleSubmit();
  };
  const sanitize = DOMPurify.sanitize;
  return (
    <div className="scooter-editor-image-editor" onKeyDown={handleKeyDown}>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(html, { ADD_ATTR: ["target"] }),
        }}
      />
      <Input
        value={captionText}
        onChange={e => setCaptionText(e.target.value)}
        placeholder="Caption the embed"
        label="Caption"
      />
      <div className="scooter-editor-image-editor__footer">
        <Button label="Save Changes" onClick={handleSubmit} />
        <Button label="Cancel" style="text" onClick={onClose} />
      </div>
    </div>
  );
};

export default EmbedView;
