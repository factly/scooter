import React, { forwardRef } from "react";

import Tippy from "@tippyjs/react";
import classnames from "classnames";
import { isNilOrEmpty, scrollHandler } from "@factly/scooter-shared-utils";


export class SlashCommandsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 , groupIndex: 0};
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    const { menuIndex, activeMenuIndex } = this.props;
    const isCurrentMenuActive = menuIndex === activeMenuIndex;
    if (isCurrentMenuActive) {
      document.addEventListener("keydown", this.keydownHandler);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler);
  }

  componentDidUpdate(oldProps) {
    const { items, menuIndex, activeMenuIndex } = this.props;
    const isCurrentMenuActive = menuIndex === activeMenuIndex;

    if (items !== oldProps.items) this.setState({ selectedIndex: 0 , groupIndex: 0 });

    scrollHandler({
      wrapperRef: this.menuRef,
      itemIndex: this.state.selectedIndex,
      groupIndex: this.state.groupIndex,
     });

    if (isCurrentMenuActive) {
      document.addEventListener("keydown", this.keydownHandler);
    } else document.removeEventListener("keydown", this.keydownHandler);
  }
  groupItems = (items) => {
    const groupedItems = {};
  
    items.forEach((item) => {
      const { optionName, title, description, group , Icon , command } = item;
  
      if (!groupedItems[group]) {
        groupedItems[group] = {
          title: group,
          options: [],
        };
      }
  
      groupedItems[group].options.push({ optionName, title, description , Icon , command});
    });
  
    return Object.values(groupedItems);
  }

  keydownHandler = event => {
    const listeners = {
      Enter: this.enterHandler,
      ArrowUp: this.upHandler,
      ArrowDown: this.downHandler,
      ArrowLeft: this.leftArrowHandler,
      ArrowRight: this.rightArrowHandler,
    };

    if (event.key in listeners) listeners[event.key](event);
  }; 
  selectItem = (index,title) => {
    const { items, editor, range } = this.props;
    const selectedItem = items.filter(item => item.title === title)[0];
    const hasCommand = selectedItem && selectedItem.command;
    const isLeafNode = isNilOrEmpty(selectedItem.items);
    if (hasCommand && isLeafNode) selectedItem.command({ editor, range });
  };

  upHandler = () => {
    const { items } = this.props;
    const groupedItems = this.groupItems(items);
    const { selectedIndex , groupIndex } = this.state;
   
    if (groupedItems[groupIndex].options[selectedIndex-1]) {
      this.setState({ selectedIndex: (selectedIndex - 1)});
      return;
    }
    const newGroupIndex = (groupIndex - 1 + groupedItems.length) % groupedItems.length;
    this.setState({ groupIndex: newGroupIndex, selectedIndex: groupedItems[newGroupIndex].options.length - 1 });
  };

  downHandler = () => {
    const { items } = this.props;
    const groupedItems = this.groupItems(items);
    const { selectedIndex , groupIndex } = this.state;
    if (groupedItems[groupIndex].options[selectedIndex+1]) {
      this.setState({ selectedIndex: (selectedIndex + 1)});
      return;
    }
   this.setState({ groupIndex: (groupIndex + 1) % groupedItems.length , selectedIndex: 0 });
  };

  enterHandler = () => {
    const { selectedIndex } = this.state;
    const { items, editor, range } = this.props;
    const groupedItems = this.groupItems(items);
    const selectedItem = groupedItems[this.state.groupIndex].options[selectedIndex];
    const hasCommand = selectedItem && selectedItem.command;
    const isLeafNode = isNilOrEmpty(selectedItem.items);
    if (hasCommand && isLeafNode) selectedItem.command({ editor, range });
  };

  leftArrowHandler = () => {
    const { menuIndex, setActiveMenuIndex } = this.props;
    if (menuIndex > 0) setActiveMenuIndex(menuIndex - 1);
  };

  rightArrowHandler = () => {
    const { menuIndex, setActiveMenuIndex, items } = this.props;
    const { selectedIndex } = this.state;
    const groupedItems = this.groupItems(items);
    const selectedItem = groupedItems[this.state.groupIndex].options[selectedIndex];
    const hasSubItems = selectedItem && !isNilOrEmpty(selectedItem.items);
    if (hasSubItems) setActiveMenuIndex(menuIndex + 1);
  };

  render() {
    const { items, menuIndex, activeMenuIndex } = this.props;
    const { selectedIndex , groupIndex } = this.state;
    const isCurrentMenuActive = menuIndex === activeMenuIndex;
    const groupedItems = this.groupItems(items);

    return (    <div ref={this.menuRef} className="scooter-editor-slash-commands__wrapper">
    {groupedItems.map((group, groupIndex) => {
      const groupTitle = group.title
      const groupItems = group.options;
     return (
        <div key={`group_${groupIndex}`} className="group-wrapper">
          <div className="group-title">{groupTitle}</div>
          {groupItems.map((item, itemIndex) => {
            const isLeafNode = isNilOrEmpty(item.items);
            const nodeElement = (
              <MenuItem
                key={item.title}
                item={item}
                index={itemIndex}
                groupIndex={groupIndex}
                selectedIndex={isCurrentMenuActive ? selectedIndex : -1}
                selectedGroupIndex={isCurrentMenuActive ? this.state.groupIndex : -1}
                selectItem={() => isLeafNode && this.selectItem(itemIndex,item.title)}
                onHover={() => this.setState(()=>{
            
                  return { selectedIndex: itemIndex , groupIndex: groupIndex }
                })}
              />
            );

            if (isLeafNode) return nodeElement;

            return (
              <Tippy
                key={item.title}
                interactive
                placement="right"
                theme="light"
                content={
                  <SlashCommandsMenu
                    {...this.props}
                    items={item.items}
                    menuIndex={menuIndex + 1}
                  />
                }
                onCreate={({ popper }) => (popper.style.width = "max-content")}
                visible={selectedIndex === index}
                onShow={() => {
                  this.isSubmenuOpened = true;
                }}
                onHide={() => {
                  this.isSubmenuOpened = false;
                }}
              >
                {nodeElement}
              </Tippy>
            );
          })}
        </div>
      );
    })}
  </div>);
  }
}

// eslint-disable-next-line react/display-name
const MenuItem = forwardRef(
  ({ item, selectedIndex, index, selectItem, onHover , groupIndex , selectedGroupIndex}, ref) => {
    const { Icon } = item; 
    return (
      <div
        className={classnames("scooter-editor-slash-commands__item", {
          active: index === selectedIndex && groupIndex === selectedGroupIndex ,
        })}
        onClick={selectItem}
        ref={ref}
        data-cy={`scooter-editor-command-list-item-${index}`}
        onMouseEnter={onHover}
      >
        {Icon && <Icon size={20} />}
        <div className="scooter-editor-slash-commands__item-content">
          <h5>{item.title}</h5>
          <p>{item.description}</p>
        </div>
      </div>
    );
  }
);

export default SlashCommandsMenu;
