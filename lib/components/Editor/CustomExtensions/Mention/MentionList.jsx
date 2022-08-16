import React from "react";

import classNames from "classnames";
import Avatar from "components/Common/Avatar";
import { scrollHandler } from "utils/scrollhandler";

export class MentionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0 };
    this.mentionRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;
    if (items !== prevProps.items) {
      this.setState({ selectedIndex: 0 });
    }

    scrollHandler({
      wrapperRef: this.mentionRef,
      index: this.state.selectedIndex,
    });
  }

  selectItem = index => {
    const { items, command } = this.props;
    const item = items[index];

    if (item) {
      command({ label: item.name, id: item.key });
    }
  };

  upHandler = () => {
    const { items } = this.props;
    this.setState(prevState => {
      const { selectedIndex } = prevState;
      const nextSelectedIndex =
        (selectedIndex + items.length - 1) % items.length;
      return {
        selectedIndex: nextSelectedIndex,
      };
    });
  };

  downHandler = () => {
    const { items } = this.props;
    this.setState(prevState => {
      const { selectedIndex } = prevState;
      const nextSelectedIndex = (selectedIndex + 1) % items.length;
      return {
        selectedIndex: nextSelectedIndex,
      };
    });
  };

  enterHandler = () => {
    const { selectedIndex } = this.state;
    this.selectItem(selectedIndex);
  };

  onKeyDown = ({ event }) => {
    const keyDownHandlers = {
      ArrowUp: this.upHandler,
      ArrowDown: this.downHandler,
      Enter: this.enterHandler,
    };

    if (Object.prototype.hasOwnProperty.call(keyDownHandlers, event.key)) {
      keyDownHandlers[event.key]();
      return true;
    }

    return false;
  };

  render() {
    const { selectedIndex } = this.state;
    const { items } = this.props;

    if (items.length === 0) {
      return (
        <div className="scooter-editor-mentions__wrapper">
          <p className="scooter-editor-mentions__item">No Results</p>
        </div>
      );
    }

    return (
      <div
        ref={this.mentionRef}
        className="scooter-editor-mentions__wrapper"
        data-cy="scooter-editor-mention-list"
      >
        {items.map(({ key, name, imageUrl, showImage }, index) => (
          <button
            className={classNames("scooter-editor-mentions__item", {
              active: index === selectedIndex,
            })}
            key={key}
            onClick={() => this.selectItem(index)}
            type="button"
            data-cy={`scooter-editor-mention-list-${name}`}
          >
            {showImage && <Avatar user={{ name, imageUrl }} />}
            <p>{name}</p>
          </button>
        ))}
      </div>
    );
  }
}
