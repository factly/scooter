import React from "react";

import SlashCommandMenu from "./SlashCommandMenu";

export class SlashCommand extends React.Component {
  state = { activeMenuIndex: 0 };

  onKeyDown = ({ event }) =>
    ["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
      event.key
    );

  setActiveMenuIndex = index => this.setState({ activeMenuIndex: index });

  render() {
    return (
      <SlashCommandMenu
        {...this.props}
        menuIndex={0}
        activeMenuIndex={this.state.activeMenuIndex}
        setActiveMenuIndex={this.setActiveMenuIndex}
      />
    );
  }
}

export default SlashCommand;
