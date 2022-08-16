import { UrlRegExp } from "constants/regexp";

import React, { useRef, useState } from "react";

import Button from "components/Common/Button";
import Dropdown from "components/Common/Dropdown";
import Input from "components/Common/Input";
import MenuButton from "components/Common/MenuButton";
import { RiLink } from "react-icons/ri";

const LinkOption = ({ editor }) => {
  const dropdownRef = useRef();
  const inputRef = useRef();
  const [error, setError] = useState("");
  const [urlString, setUrlString] = useState("");

  const isActive = editor.isActive("link");

  const onClickTrigger = () => {
    setUrlString(editor.getAttributes("link").href || "");
  };

  const handleKeyDown = event => {
    if (event.key === "Escape") {
      dropdownRef.current.close();
    } else if (event.key === "Enter") {
      handleLink();
    }
  };

  const handleLink = () => {
    if (UrlRegExp.test(urlString)) {
      editor.chain().focus().setLink({ href: urlString }).run();
      dropdownRef.current?.close();
    } else {
      setError("Please enter a valid url");
    }
  };

  const handleUnlink = () => {
    editor.chain().focus().unsetLink().run();
    dropdownRef.current?.close();
  };

  return (
    <Dropdown
      ref={dropdownRef}
      onVisible={() =>
        inputRef.current?.focus({
          preventScroll: true,
        })
      }
      customTarget={() => (
        <MenuButton
          icon={RiLink}
          iconActive={isActive}
          onClick={onClickTrigger}
          tooltipProps={{ content: "Link", position: "bottom", delay: [500] }}
          data-cy="scooter-editor-fixed-menu-link-option"
        />
      )}
      className="scooter-editor-link-wrapper"
      closeOnSelect={false}
      position="bottom"
    >
      <div onKeyDown={handleKeyDown} className="scooter-editor-link__item">
        <Input
          ref={inputRef}
          name="url"
          value={urlString}
          placeholder="Paste URL"
          onFocus={() => setError("")}
          error={error}
          onChange={({ target: { value } }) => setUrlString(value)}
          data-cy="scooter-editor-fixed-menu-link-option-input"
        />
        <Button
          label="Link"
          onClick={handleLink}
          data-cy="scooter-editor-fixed-menu-link-option-link-button"
        />
        {isActive && (
          <Button
            label="Unlink"
            onClick={handleUnlink}
            data-cy="scooter-editor-fixed-menu-link-option-unlink-button"
          />
        )}
      </div>
    </Dropdown>
  );
};

export default LinkOption;
