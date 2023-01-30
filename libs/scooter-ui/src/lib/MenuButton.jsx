import React from 'react';

import PropTypes from 'prop-types';

import {
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
  MENU_ICON_SIZE,
} from './constants';
import ToolTip from './ToolTip';

export const MenuButton = ({
  icon: Icon,
  iconActive = true,
  tooltipProps,
  ...otherProps
}) => (
  <ToolTip {...tooltipProps}>
    <button
      className="scooter-editor-fixed-menu__item"
      type="button"
      {...otherProps}
    >
      <Icon
        color={iconActive ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE}
        size={MENU_ICON_SIZE}
      />
    </button>
  </ToolTip>
);

MenuButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  iconActive: PropTypes.bool,
  onClick: PropTypes.func,
  tooltipProps: PropTypes.object,
};

export default MenuButton;
