import React from "react";

import classnames from "classnames";
import ToolTip from "components/Common/ToolTip";
import { capitalize } from "utils/common";

const Option = ({ Icon, command, active, optionName }) => (
  <ToolTip content={capitalize(optionName)} position="top" delay={[500]}>
    <div
      className={classnames("scooter-editor-bubble-menu__item", {
        active: active,
      })}
      onClick={command}
      data-cy={`scooter-editor-bubble-menu-${optionName}-option`}
    >
      <Icon size={20} />
    </div>
  </ToolTip>
);

export default Option;
