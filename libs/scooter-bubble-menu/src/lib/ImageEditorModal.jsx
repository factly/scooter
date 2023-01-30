import React from 'react';

import { Modal } from '@factly/scooter-ui';

import { ImageEditor } from '@factly/scooter-image';

export const ImageEditorModal = ({ editor, isOpen, onClose }) => {
  const node = editor && editor.view.state.selection.node;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="scooter-editor-image-uploader">
        <div className="scooter-editor-image-uploader__content">
          <ImageEditor
            editor={editor}
            onClose={onClose}
            url={node?.attrs.src}
            alt={node?.attrs.alt}
            caption={node?.attrs.caption}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImageEditorModal;
