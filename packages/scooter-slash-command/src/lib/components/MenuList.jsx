import React, { useCallback, useEffect, useRef, useState } from "react";

import classNames from "classnames";

export const MenuList = React.forwardRef((props, ref) => {
  const scrollContainer = useRef(null);
  const activeItem = useRef(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

  useEffect(() => {
    setSelectedGroupIndex(0);
    setSelectedCommandIndex(0);
  }, [props.items]);

  const selectItem = useCallback(
    (groupIndex, commandIndex) => {
      const command = props.items[groupIndex].commands[commandIndex];
      props.command(command);
    },
    [props]
  );

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowDown") {
        if (!props.items.length) {
          return false;
        }

        const commands = props.items[selectedGroupIndex].commands;

        let commandIndex = selectedCommandIndex + 1;
        let groupIndex = selectedGroupIndex;

        if (commands.length - 1 < commandIndex) {
          commandIndex = 0;
          groupIndex = selectedGroupIndex + 1;
        }

        if (props.items.length - 1 < groupIndex) {
          groupIndex = 0;
        }

        setSelectedCommandIndex(commandIndex);
        setSelectedGroupIndex(groupIndex);

        return true;
      }

      if (event.key === "ArrowUp") {
        if (!props.items.length) {
          return false;
        }

        let commandIndex = selectedCommandIndex - 1;
        let groupIndex = selectedGroupIndex;

        if (commandIndex < 0) {
          groupIndex = selectedGroupIndex - 1;
          commandIndex = props.items[groupIndex]?.commands.length - 1 || 0;
        }

        if (groupIndex < 0) {
          groupIndex = props.items.length - 1;
          commandIndex = props.items[groupIndex].commands.length - 1;
        }

        setSelectedCommandIndex(commandIndex);
        setSelectedGroupIndex(groupIndex);

        return true;
      }

      if (event.key === "Enter") {
        if (
          !props.items.length ||
          selectedGroupIndex === -1 ||
          selectedCommandIndex === -1
        ) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedCommandIndex);

        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    if (activeItem.current && scrollContainer.current) {
      const offsetTop = activeItem.current.offsetTop;
      const offsetHeight = activeItem.current.offsetHeight;

      scrollContainer.current.scrollTop = offsetTop - offsetHeight;
    }
  }, [selectedCommandIndex, selectedGroupIndex]);

  if (!props.items.length) {
    return null;
  }

  return (
    <div
      ref={scrollContainer}
      className="scooter-editor-slash-commands__wrapper"
    >
      <div key={`group_`} className="group-wrapper">
        {props.items.map((group, groupIndex) => (
          <React.Fragment key={`${group.title}-wrapper`}>
            <div className="group-title">{group.title}</div>
            {group.commands.map((item, index) => (
              <div
                key={item.title}
                className={classNames("scooter-editor-slash-commands__item", {
                  active:
                    index === selectedCommandIndex &&
                    groupIndex === selectedGroupIndex,
                })}
                onClick={() => selectItem(groupIndex, index)}
                data-cy={`scooter-editor-command-list-item-${index}`}
              >
                {item.Icon && <item.Icon size={20} />}
                <div className="scooter-editor-slash-commands__item-content-wrapper">
                  <div className="scooter-editor-slash-commands__item-content">
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                  <div className="scooter-editor-slash-commands__keyboard-shortcut">
                    <span>{item.keyShortcut}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});
