import React from 'react';

import classNames from 'classnames';

export const PortalBackDrop = ({ children, className, ...otherProps }) => (
  <div
    className={classNames('sc-backdrop', {
      [className]: className,
    })}
    {...otherProps}
  >
    {children}
  </div>
);

export default PortalBackDrop;
