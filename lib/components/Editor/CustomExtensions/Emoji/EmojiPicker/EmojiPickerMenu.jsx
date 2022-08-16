import React from "react";

import axios from "axios";
import { Picker } from "emoji-mart";
import PropTypes from "prop-types";

class EmojiPickerMenu extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    new Picker({
      ...this.props,
      onEmojiSelect: this.handleSelect,
      style: { maxWidth: "100%" },
      theme: "light",
      native: true,
      previewPosition: "none",
      showSkinTones: false,
      data: this.fetchEmojiData,
      ref: this.ref,
    });
  }

  fetchEmojiData = async () => {
    try {
      const { data } = await axios.get(
        "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
      );
      return data;
    } catch (error) {
      return {};
    }
  };

  onKeyDown = ({ event }) => {
    if (event.key === "Escape") {
      this.props.editor.chain().focus().deleteRange(this.props.range).run();
      return true;
    }

    return false;
  };

  handleSelect = emoji => {
    this.props.editor
      .chain()
      .focus()
      .deleteRange(this.props.range)
      .setEmoji(emoji)
      .run();
  };

  render() {
    return <div ref={this.ref} data-cy="scooter-editor-emoji-picker" />;
  }
}

EmojiPickerMenu.defaultProps = {
  editor: {},
  range: {},
};

EmojiPickerMenu.propTypes = {
  editor: PropTypes.object.isRequired,
  range: PropTypes.object,
};

export default EmojiPickerMenu;
