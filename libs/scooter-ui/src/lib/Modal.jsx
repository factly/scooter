import React, { useRef } from "react";

import classnames from "classnames";
import Backdrop from "./Backdrop";
import Button from "./Button";
import Portal from "./Portal";
import { useOutsideClick } from "@factly/scooter-shared-utils";
import { useHotkeys } from "react-hotkeys-hook";
import { RiCloseLine } from "react-icons/ri";

const noop = () => {};
const sizes = {
  xs: "xs",
  sm: "sm",
  md: "md",
};

export const Modal = ({
  size = "md",
  isOpen = false,
  onClose = noop,
  loading = false,
  children,
  className = "",
  closeOnEsc = true,
  closeButton = true,
  backdropClassName = "",
  closeOnOutsideClick = true,
  ...otherProps
}) => {
  const modalWrapper = useRef();

  useOutsideClick(modalWrapper, closeOnOutsideClick ? onClose : noop);

  useHotkeys("esc", closeOnEsc ? onClose : noop);

  return (
    <Portal className="sc-portal">
      {isOpen && (
        <Backdrop
          key="modal-backdrop"
          className={classnames("sc-modal__backdrop", backdropClassName)}
        >
          <div
            ref={modalWrapper}
            key="modal-wrapper"
            className={classnames("sc-modal__wrapper", {
              "sc-modal__wrapper--xs": size === sizes.xs,
              "sc-modal__wrapper--sm": size === sizes.sm,
              "sc-modal__wrapper--md": size === sizes.md,
              [className]: className,
            })}
            {...otherProps}
          >
            {closeButton && (
              <Button
                variant="text"
                icon={RiCloseLine}
                className="sc-modal__close"
                onClick={onClose}
              />
            )}
            {loading ? "" : children}
          </div>
        </Backdrop>
      )}
    </Portal>
  );
};

export default Modal;
