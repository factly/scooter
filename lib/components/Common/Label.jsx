import React from "react";

import classnames from "classnames";
import Tooltip from "components/Common/ToolTip";
import { RiInformationLine } from "react-icons/ri";

const Label = ({
  children,
  className = "",
  required = false,
  helpIconProps = null,
  ...otherProps
}) => {
  const {
    onClick,
    icon,
    tooltipProps,
    className: helpIconClassName,
    ...otherHelpIconProps
  } = helpIconProps || {};
  const HelpIcon = icon || RiInformationLine;
  return (
    <label
      className={classnames("sc-label flex items-center", className)}
      {...otherProps}
    >
      {children}
      {required && <span aria-hidden>*</span>}
      {helpIconProps && (
        <Tooltip {...tooltipProps} disabled={!tooltipProps}>
          <span
            className={classnames("ml-1", {
              [helpIconClassName]: helpIconClassName,
            })}
            onClick={onClick}
          >
            <HelpIcon size={16} {...otherHelpIconProps} />
          </span>
        </Tooltip>
      )}
    </label>
  );
};

export default Label;
