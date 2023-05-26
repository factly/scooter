import React, { useState, useEffect, useRef, forwardRef } from "react";
import Tippy from "@tippyjs/react";
import classnames from "classnames";
import { isNilOrEmpty, scrollHandler } from "@factly/scooter-shared-utils";
import { RiArrowRightLine } from "react-icons/ri";
import { BsArrowReturnLeft, BsArrowUpLeft } from "react-icons/bs";

const MenuItem = forwardRef(
  ({ item, selectedIndex, index, selectItem, onHover }, ref) => {
    const { Icon } = item;
    const hasSubItems = item && !isNilOrEmpty(item.items);

    return (
      <div
        className={classnames(
          "scooter-editor-slash-commands__item scooter-editor-tagore-commands__item",
          {
            active: index === selectedIndex,
          }
        )}
        onClick={() => selectItem(index)}
        ref={ref}
        data-cy={`scooter-editor-command-list-item-${index}`}
        onMouseEnter={onHover}
      >
        {Icon && <Icon size={20} />}
        <div className="scooter-editor-slash-commands__item-content scooter-editor-tagore-commands__item-content">
          <h5>{item.title}</h5>
          <div className="tagore-command-icon">
            {hasSubItems && <RiArrowRightLine size={20} />}
            {!hasSubItems ? (
              item.commandType === "prompt" ? (
                <BsArrowUpLeft size={14} className="hover-icon" />
              ) : (
                <BsArrowReturnLeft size={14} className="hover-icon" />
              )
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

export const TagoreCommandsMenu = props => {
  const {
    items,
    menuIndex,
    activeMenuIndex,
    setActiveMenuIndex,
    editor,
    inputValue,
    setInputValue,
    fetchData,
    pos,
    deleteNode,
    content,
    setContent,
    selectedContent,
    hideMenu,
    showMenu,
    className,
    range,
    to,
    from,
    currentSelectedItem,
    setCurrentSelectedItem,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef();

  useEffect(() => {
    const isCurrentMenuActive = menuIndex === activeMenuIndex;
    if (isCurrentMenuActive) {
      document.addEventListener("keydown", keydownHandler);
    }

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [menuIndex, activeMenuIndex]);

  useEffect(() => {
    scrollHandler({
      wrapperRef: menuRef,
      index: selectedIndex,
    });
  }, [selectedIndex]);

  const keydownHandler = event => {
    const listeners = {
      Enter: enterHandler,
      ArrowUp: upHandler,
      ArrowDown: downHandler,
      ArrowLeft: leftArrowHandler,
      ArrowRight: rightArrowHandler,
    };
    if (event.key in listeners) listeners[event.key](event);
  };

  const selectItem = async index => {
    const selectedItem = items[index];

    if (selectedItem.title !== "Try Again") {
      setCurrentSelectedItem(selectedItem);
    }

    const hasCommand = selectedItem && selectedItem.command;
    const hasCommandType = selectedItem && selectedItem.commandType;
    const isLeafNode = isNilOrEmpty(selectedItem.items);
    if (hasCommand && isLeafNode) {
      if (hasCommandType === "prompt") {
        //  console.log("prompt ran", selectedItem.prompt)
        //  setInputValue(selectItem.prompt);
        setInputValue(selectedItem.prompt);
      }
      if (hasCommandType === "generate") {
        //   editor.commands.insertContentAt(
        //   pos,
        //   //props.getPos(),
        //   content
        // );
        //  console.log("generate");
        const data = await fetchData(
          `${selectedContent?.length > 0 ? selectedContent : editor.getText()}`,
          selectedItem?.promptId || "default"
        );
        //   console.log({ "g": "generate", data })
        if (data) {
          deleteNode();
          editor.commands.insertContentAt(
            props.getPos(),
            //props.getPos(),
            `${data.output.replace(/\n|\t|(?<=>)\s*/g, "")}`
          );
          hideMenu();

          setContent("");
        }
      }
      if (hasCommandType === "replace") {
        if (selectedItem.title === "Insert Below") {
          editor.commands.insertContentAt(
            props.getPos(),
            //props.getPos(),
            `${content}`
          );
          deleteNode();
          setContent("");
          return;
        }
        if (selectedItem.title === "Try Again") {
          const data = await fetchData(
            `${selectedContent}`,
            currentSelectedItem?.promptId || "default"
          );
          if (data) {
            setContent(data.output.replace(/\n|\t|(?<=>)\s*/g, ""));
            showMenu();
          }
          return;
        }

        if (selectedItem.title === "Replace Selection") {
          console.log({ content });
          const pos = props.getPos();
          editor.commands.insertContentAt(
            { from, to },
            //props.getPos(),
            content.replace(/\n|\t|(?<=>)\s*/g, "")
          );
          //deleteNode();
          setContent("");
          return;
        }

        const data = await fetchData(
          `${selectedContent?.length > 0 ? selectedContent : editor.getText()}`,
          selectedItem?.promptId || "default"
        );
        if (data) {
          //    console.log({ "g": "generate", data })
          setContent(data.output.replace(/\n|\t|(?<=>)\s*/g, ""));
          showMenu();
        }

        // editor.commands.insertContentAt(
        //   props.getPos(),
        //   //props.getPos(),
        //   `${data.output}`
        // );
        // hideMenu();
        // deleteNode();
        // setContent("");
      }
      if (hasCommandType === "delete") {
        setContent("");
        deleteNode();
      }
    }

    hideMenu();
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  const leftArrowHandler = () => {
    if (menuIndex > 0) setActiveMenuIndex(menuIndex - 1);
  };

  const rightArrowHandler = () => {
    const selectedItem = items[selectedIndex];
    const hasSubItems = selectedItem && !isNilOrEmpty(selectedItem.items);
    if (hasSubItems) setActiveMenuIndex(menuIndex + 1);
  };

  const isCurrentMenuActive = menuIndex === activeMenuIndex;

  return (
    <div
      ref={menuRef}
      className={
        className
          ? className
          : "  scooter-editor-slash-commands__wrapper scooter-editor-tagore-commands__wrapper"
      }
    >
      {items?.map((item, index) => {
        const isLeafNode = isNilOrEmpty(item.items);
        if (item.type === "heading") {
          return (
            <div
              key={item.title}
              className="scooter-editor-tagore-commands__section-heading"
            >
              {selectedContent?.length > 0
                ? item.title.replace(/page|Page/, "Selection")
                : item.title}
            </div>
          );
        }

        const nodeElement = (
          <MenuItem
            key={item.title}
            item={item}
            index={index}
            selectedIndex={isCurrentMenuActive ? selectedIndex : -1}
            selectItem={() => isLeafNode && selectItem(index)}
            onHover={() => setSelectedIndex(index)}
          />
        );

        if (isLeafNode) return nodeElement;

        return (
          <Tippy
            key={item.title}
            interactive
            placement="right"
            theme="light"
            arrow={false}
            content={
              <TagoreCommandsMenu
                {...props}
                items={item.items}
                menuIndex={menuIndex + 1}
                className={"no-styles"}
              />
            }
            onCreate={({ popper }) => (popper.style.width = "max-content")}
            visible={selectedIndex === index}
            onShow={() => {
              // this.isSubmenuOpened = true;
            }}
            onHide={() => {
              //  this.isSubmenuOpened = false;
            }}
          >
            {nodeElement}
          </Tippy>
        );
      })}
    </div>
  );
};

export default TagoreCommandsMenu;
