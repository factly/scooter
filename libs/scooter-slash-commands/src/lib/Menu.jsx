import React, { forwardRef } from 'react';

import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import { isNilOrEmpty } from './utils/common';
import { scrollHandler } from './utils/scrollhandler';

export class SlashCommandsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 };
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    const { menuIndex, activeMenuIndex } = this.props;
    const isCurrentMenuActive = menuIndex === activeMenuIndex;
    if (isCurrentMenuActive) {
      document.addEventListener('keydown', this.keydownHandler);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  componentDidUpdate(oldProps) {
    const { items, menuIndex, activeMenuIndex } = this.props;
    const isCurrentMenuActive = menuIndex === activeMenuIndex;

    if (items !== oldProps.items) this.setState({ selectedIndex: 0 });

    scrollHandler({
      wrapperRef: this.menuRef,
      index: this.state.selectedIndex,
    });

    if (isCurrentMenuActive) {
      document.addEventListener('keydown', this.keydownHandler);
    } else document.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (event) => {
    const listeners = {
      Enter: this.enterHandler,
      ArrowUp: this.upHandler,
      ArrowDown: this.downHandler,
      ArrowLeft: this.leftArrowHandler,
      ArrowRight: this.rightArrowHandler,
    };

    if (event.key in listeners) listeners[event.key](event);
  };

  selectItem = (index) => {
    const { items, editor, range } = this.props;
    const selectedItem = items[index];
    const hasCommand = selectedItem && selectedItem.command;
    const isLeafNode = isNilOrEmpty(selectedItem.items);
    if (hasCommand && isLeafNode) selectedItem.command({ editor, range });
  };

  upHandler = () => {
    const { items } = this.props;
    const { selectedIndex } = this.state;
    this.setState({
      selectedIndex: (selectedIndex + items.length - 1) % items.length,
    });
  };

  downHandler = () => {
    const { items } = this.props;
    const { selectedIndex } = this.state;
    this.setState({ selectedIndex: (selectedIndex + 1) % items.length });
  };

  enterHandler = () => {
    const { selectedIndex } = this.state;
    this.selectItem(selectedIndex);
  };

  leftArrowHandler = () => {
    const { menuIndex, setActiveMenuIndex } = this.props;
    if (menuIndex > 0) setActiveMenuIndex(menuIndex - 1);
  };

  rightArrowHandler = () => {
    const { menuIndex, setActiveMenuIndex, items } = this.props;
    const { selectedIndex } = this.state;
    const selectedItem = items[selectedIndex];
    const hasSubItems = selectedItem && !isNilOrEmpty(selectedItem.items);
    if (hasSubItems) setActiveMenuIndex(menuIndex + 1);
  };

  render() {
    const { items, menuIndex, activeMenuIndex } = this.props;
    const { selectedIndex } = this.state;
    const isCurrentMenuActive = menuIndex === activeMenuIndex;

    return (
      <div
        ref={this.menuRef}
        className="scooter-editor-slash-commands__wrapper"
      >
        {items.map((item, index) => {
          const isLeafNode = isNilOrEmpty(item.items);

          const nodeElement = (
            <MenuItem
              key={item.title}
              item={item}
              index={index}
              selectedIndex={isCurrentMenuActive ? selectedIndex : -1}
              selectItem={() => isLeafNode && this.selectItem(index)}
              onHover={() => this.setState({ selectedIndex: index })}
            />
          );

          if (isLeafNode) return nodeElement;

          return (
            <Tippy
              key={item.title}
              interactive
              placement="right"
              content={
                <Menu
                  {...this.props}
                  items={item.items}
                  menuIndex={menuIndex + 1}
                />
              }
              onCreate={({ popper }) => (popper.style.width = 'max-content')}
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
  }
}

// eslint-disable-next-line react/display-name
const MenuItem = forwardRef(
  ({ item, selectedIndex, index, selectItem, onHover }, ref) => {
    const { Icon } = item;

    return (
      <div
        className={classnames('scooter-editor-slash-commands__item', {
          active: index === selectedIndex,
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
