import { ImageBlock } from "../ImageBlock/ImageBlock";
import { Modal } from "../components/shared/Modal";

export const ImageBlockModal = ({ editor, isOpen, onClose }) => {
  const node = editor && editor.view.state.selection.node;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="scooter-editor-image-uploader">
        <div className="scooter-editor-image-uploader__content">
          <ImageBlock
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
