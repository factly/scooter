import React from "react";

import axios from "axios";
import classnames from "classnames";
import Loader from "components/Common/Loader";
import { init, SearchIndex } from "emoji-mart";
import { isNilOrEmpty } from "utils/common";

class EmojiSuggestionMenu extends React.Component {
  state = {
    isLoading: false,
    selectedIndex: 0,
    emojiSuggestions: [],
  };

  componentDidMount() {
    init({
      data: this.fetchEmojiData,
      theme: "light",
      previewPosition: "none",
    });
    this.searchEmojiAndSetState();
  }

  componentDidUpdate(oldProps) {
    if (this.props.query !== oldProps.query) {
      this.searchEmojiAndSetState();
    }
  }

  fetchEmojiData = async () => {
    this.setState({ isLoading: true });
    try {
      const { data } = await axios.get(
        "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
      );
      this.setState({ isLoading: false });
      return data;
    } catch (error) {
      this.setState({ isLoading: false });
      return {};
    }
  };

  searchEmoji = async () =>
    (await SearchIndex.search(this.props.query || "smile")).slice(0, 5);

  searchEmojiAndSetState = async () => {
    const suggestions = await this.searchEmoji();
    this.setState({
      emojiSuggestions: suggestions,
    });
  };

  setEditorState = async () => {
    const suggestions = await this.searchEmoji();
    this.props.editor
      .chain()
      .focus()
      .deleteRange(this.props.range)
      .setEmoji(suggestions[0])
      .run();
  };

  onKeyDown = ({ event }) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      this.setState(({ selectedIndex, emojiSuggestions }) => ({
        selectedIndex:
          (selectedIndex + emojiSuggestions.length - 1) %
          emojiSuggestions.length,
      }));

      return true;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      this.setState(({ selectedIndex, emojiSuggestions }) => ({
        selectedIndex: (selectedIndex + 1) % emojiSuggestions.length,
      }));

      return true;
    }

    if (event.key === "Enter") {
      this.selectItem(this.state.selectedIndex);
      return true;
    }

    if (event.key === " ") {
      if (isNilOrEmpty(this.props.query)) {
        this.props.editor.chain().focus().insertContent(" ").run();
      } else {
        this.setEditorState();
      }

      return true;
    }

    if (event.key === "Escape") {
      this.props.editor.chain().focus().insertContent(" ").run();

      return true;
    }

    return false;
  };

  selectItem = index => {
    this.props.editor
      .chain()
      .focus()
      .deleteRange(this.props.range)
      .setEmoji(this.state.emojiSuggestions[index])
      .run();
  };

  render() {
    return (
      <div className="scooter-editor-emoji-suggestion">
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading &&
          (this.state.emojiSuggestions.length > 0 ? (
            this.state.emojiSuggestions.map((emoji, index) => (
              <div
                key={emoji.id}
                onClick={() => this.selectItem(index)}
                className={classnames("scooter-editor-emoji-suggestion__item", {
                  "scooter-editor-emoji-suggestion__item--selected":
                    index === this.state.selectedIndex,
                })}
                data-cy={`scooter-editor-emoji-suggestion-${emoji.id}`}
              >
                {emoji.skins[0].native}
              </div>
            ))
          ) : (
            <p>No results</p>
          ))}
      </div>
    );
  }
}

export default EmojiSuggestionMenu;
