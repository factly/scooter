import React, { useRef } from "react";

import Avatar from "components/Common/Avatar";
import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";
import { RiMailLine } from "react-icons/ri";

const Mentions = ({ editor, mentions, showImageInMention }) => {
  const dropdownRef = useRef();

  if (!(mentions && mentions.length)) {
    return null;
  }

  return (
    <Dropdown
      ref={dropdownRef}
      customTarget={() => (
        <MenuButton
          icon={RiMailLine}
          iconActive={dropdownRef.current?.visible}
          tooltipProps={{
            content: "Mention",
            position: "bottom",
            delay: [500],
          }}
          data-cy="scooter-editor-mention-option"
        />
      )}
    >
      <div className="scooter-editor-mentions__wrapper scooter-editor-mentions__wrapper--small">
        {mentions.map(({ key, name, imageUrl }) => (
          <button
            className={
              "scooter-editor-mentions__item scooter-editor-mentions__item--light"
            }
            key={key}
            onClick={() => editor.commands.setMention(name)}
            type="button"
            data-cy={`scooter-editor-mention-option-${key}`}
          >
            {showImageInMention && (
              <Avatar size="small" user={{ name, imageUrl }} />
            )}
            <p>{name}</p>
          </button>
        ))}
      </div>
    </Dropdown>
  );
};

export default Mentions;
