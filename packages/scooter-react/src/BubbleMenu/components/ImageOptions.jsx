import React from "react";

import Option from "./Option";
import { getImageMenuOptions } from "../../utils/helpers";

export const ImageOptions = ({
  editor,
  isImageEditorModalOpen,
  setIsImageEditorModalOpen,
}) =>
  getImageMenuOptions({
    editor,
    isImageEditorModalOpen,
    setIsImageEditorModalOpen,
  }).map(option => <Option key={option.optionName} {...option} />);
