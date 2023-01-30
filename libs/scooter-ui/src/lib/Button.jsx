import React, { forwardRef } from 'react';

import classnames from 'classnames';
import ToolTip from './ToolTip';
import { Link } from 'react-router-dom';

const noop = () => {};
const BUTTON_STYLES = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
  text: 'text',
  link: 'link',
};
const BUTTON_SIZES = { large: 'large', default: 'default' };
const ICON_POSITIONS = { left: 'left', right: 'right' };

export const Button = forwardRef((props, ref) => {
  const {
    icon = null,
    iconPosition = 'right',
    iconSize = 16,
    label = '',
    loading = false,
    onClick = noop,
    to = null,
    variant = 'button',
    type = 'primary',
    fullWidth = false,
    className = '',
    disabled = false,
    size = null,
    href = null,
    tooltipProps = null,
    ...otherProps
  } = props;

  const handleClick = (e) => {
    if (!loading && !disabled) {
      onClick(e);
    }
  };

  let Parent, elementSpecificProps;
  if (to) {
    Parent = Link;
    elementSpecificProps = { to };
  } else if (href) {
    Parent = 'a';
    elementSpecificProps = { href };
  } else {
    Parent = 'button';
    elementSpecificProps = {
      type: variant,
    };
  }

  const Icon =
    typeof icon === 'string'
      ? () => <i className={classnames('sc-btn__icon', [icon])} />
      : icon || React.Fragment;

  return (
    <ToolTip {...tooltipProps} disabled={!tooltipProps}>
      <Parent
        ref={ref}
        onClick={handleClick}
        className={classnames('sc-btn', [className], {
          'sc-btn--style-primary': type === BUTTON_STYLES.primary,
          'sc-btn--style-secondary': type === BUTTON_STYLES.secondary,
          'sc-btn--style-danger': type === BUTTON_STYLES.danger,
          'sc-btn--style-text': type === BUTTON_STYLES.text,
          'sc-btn--style-link': type === BUTTON_STYLES.link,
          'sc-btn--size-large': size === BUTTON_SIZES.large,
          'sc-btn--width-full': fullWidth,
          'sc-btn--icon-left': iconPosition === ICON_POSITIONS.left,
          'sc-btn--icon-only': !label,
          disabled: disabled,
        })}
        disabled={disabled}
        {...elementSpecificProps}
        {...otherProps}
      >
        {label && <span>{label}</span>}
        {icon ? (
          <Icon key="2" size={iconSize} className="sc-btn__icon" />
        ) : null}
      </Parent>
    </ToolTip>
  );
});

Button.displayName = 'Button';
export default Button;
