import React from "react";

import classnames from "classnames";

import { capitalize } from "@factly/scooter-shared-utils";
import { Tooltip } from "../../components/shared/Tooltip";

export const Option = ({ Icon, command, active, optionName }) => (
  <Tooltip content={capitalize(optionName)} position="top" delay={[500]}>
    <div
      className={classnames("scooter-editor-bubble-menu__item", {
        active: active,
      })}
      onClick={command}
      data-cy={`scooter-editor-bubble-menu-${optionName}-option`}
    >
      <Icon size={20} />
    </div>
  </Tooltip>
);

export default Option;
