import {
  EDITOR_CONTENT_CLASSNAME,
  highlightCode,
} from "@factly/scooter-shared-utils";

import React, { useEffect } from "react";

import classnames from "classnames";
import DOMPurify from "dompurify";
import InnerHTML from "dangerously-set-html-content";

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
      // dangerouslySetInnerHTML={{
      //   __html: content,
      // }}
      data-cy="scooter-editor-content"
      {...otherProps}
    >
      <InnerHTML className="editor-content" html={content} />
    </div>
  );
};

export default EditorContent;
