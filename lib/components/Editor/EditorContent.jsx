import { EDITOR_CONTENT_CLASSNAME } from "constants/common";

import React, { useEffect } from "react";

import classnames from "classnames";
import DOMPurify from "dompurify";
import highlightCode from "utils/highlightCode";

const EditorContent = ({ content = "", className, ...otherProps }) => {
  useEffect(() => {
    // Highlight codeblocks;
    highlightCode();
  }, [content]);

  const sanitize = DOMPurify.sanitize;

  return (
    <div
      className={classnames(EDITOR_CONTENT_CLASSNAME, {
        [className]: className,
      })}
      dangerouslySetInnerHTML={{
        __html: sanitize(content, { ADD_ATTR: ["target"] }),
      }}
      data-cy="scooter-editor-content"
      {...otherProps}
    />
  );
};

export default EditorContent;
