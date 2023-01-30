import React, { forwardRef } from 'react';

import classnames from 'classnames';
import { hyphenize } from './utils/common';

import Label from './Label';

export const Input = forwardRef((props, ref) => {
  const {
    id,
    size = 'small',
    type = 'text',
    label,
    error = null,
    suffix = null,
    prefix = null,
    disabled = false,
    helpText = '',
    className = '',
    nakedInput = false,
    contentSize = null,
    required = false,
    ...otherProps
  } = props;

  return (
    <div className={classnames(['sc-input__wrapper', className])}>
      {label && (
        <Label
          required={required}
          data-cy={`scooter-editor-${hyphenize(label)}-input-label`}
          htmlFor={id}
        >
          {label}
        </Label>
      )}
      <div
        className={classnames('sc-input', {
          'sc-input--naked': !!nakedInput,
          'sc-input--error': !!error,
          'sc-input--disabled': !!disabled,
          'sc-input--small': size === 'small',
        })}
      >
        {prefix && <div className="sc-input__prefix">{prefix}</div>}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          size={contentSize}
          required={required}
          aria-invalid={!!error}
          data-cy={`${hyphenize(label)}-input-field`}
          {...otherProps}
        />
        {suffix && <div className="sc-input__suffix">{suffix}</div>}
      </div>
      {!!error && (
        <p
          data-cy={`${hyphenize(label)}-input-error`}
          className="sc-input__error"
        >
          {error}
        </p>
      )}
      {helpText && <p className="sc-input__help-text">{helpText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
