import React from 'react';

import { getImageMenuOptions } from './helpers';
import Option from './Option';

export const ImageOptions = ({
  editor,
  isImageEditorModalOpen,
  setIsImageEditorModalOpen,
}) =>
  getImageMenuOptions({
    editor,
    isImageEditorModalOpen,
    setIsImageEditorModalOpen,
  }).map((option) => <Option key={option.optionName} {...option} />);

export default ImageOptions;
