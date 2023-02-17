import React from "react";

import classnames from "classnames";
import { Tooltip as ToolTip } from "@factly/scooter-ui";
import { capitalize } from "@factly/scooter-shared-utils";

export const Option = ({ Icon, command, active, optionName }) => (
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
