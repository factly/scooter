import React, { useRef } from "react";

import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";
import { RiEmotionHappyLine } from "react-icons/ri";

import EmojiPickerMenu from "../Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({ editor }) => {
  const dropdownRef = useRef();

  return (
    <Dropdown
      ref={dropdownRef}
      closeOnSelect={false}
      customTarget={() => (
        <MenuButton
          icon={RiEmotionHappyLine}
          iconActive={dropdownRef?.current?.visible}
          tooltipProps={{ content: "Emoji", position: "bottom", delay: [500] }}
          data-cy="scooter-editor-fixed-menu-emoji-option-button"
        />
      )}
      position="bottom-start"
    >
      <EmojiPickerMenu editor={editor} />
    </Dropdown>
  );
};

export default EmojiOption;
