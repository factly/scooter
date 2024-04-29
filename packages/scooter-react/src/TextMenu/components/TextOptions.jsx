import React from "react";

import LinkOption from "../../BubbleMenu/components/LinkOption";
import Option from "../../BubbleMenu/components/Option";
import { getTextMenuOptions } from "../../utils/helpers";

export const TextOptions = ({
  editor,
  options,
  setIsInvalidLink,
  isLinkOptionActive,
  setIsLinkOptionActive,
}) => {
  const handleAnimateInvalidLink = () => {
    setIsInvalidLink(true);
    setTimeout(() => {
      setIsInvalidLink(false);
    }, 1000);
  };

  return isLinkOptionActive ? (
    <LinkOption
      editor={editor}
      handleClose={() => setIsLinkOptionActive(false)}
      handleAnimateInvalidLink={handleAnimateInvalidLink}
    />
  ) : (
    getTextMenuOptions({
      editor,
      setIsLinkOptionActive,
    })
      .filter(({ optionName }) => options.includes(optionName))
      .map(option => <Option {...option} key={option.optionName} />)
  );
};
