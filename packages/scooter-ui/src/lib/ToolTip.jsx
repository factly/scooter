import React from "react";

import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";

export const Tooltip = ({
  content,
  children,
  theme = "light",
  disabled = false,
  placement,
  position = "auto",
  interactive = false,
  delay = 0,
  ...otherProps
}) => (
  <Tippy
    role="tooltip"
    theme={theme}
    content={content}
    arrow={
      "<svg width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10 5H0.926697L3.95208 1.63847C4.74227 0.760478 6.11722 0.754951 6.91445 1.62656L10 5Z' /></svg>"
    }
    disabled={disabled}
    animation={"scale-subtle"}
    placement={placement || position}
    plugins={[followCursor]}
    interactive={interactive}
    duration={[100, 200]}
    zIndex={100001}
    delay={delay}
    {...otherProps}
  >
    {children}
  </Tippy>
);

export default Tooltip;
