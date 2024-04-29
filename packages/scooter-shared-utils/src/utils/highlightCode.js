import { EDITOR_CONTENT_CLASSNAME } from "@factly/scooter-shared-utils";

import hljs from "highlight.js/lib/common";

export const highlightCode = () => {
  document
    .querySelectorAll(`div.${EDITOR_CONTENT_CLASSNAME} pre code`)
    .forEach(el => {
      hljs.highlightElement(el);
    });
};

export default highlightCode;
