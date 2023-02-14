import React from "react";

import { SlashCommandsMenu } from "./Menu";

export class CommandsList extends React.Component {
  state = { activeMenuIndex: 0 };

  onKeyDown = ({ event }) =>
    ["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
      event.key
    );

  setActiveMenuIndex = index => this.setState({ activeMenuIndex: index });

  render() {
    return (
      <SlashCommandsMenu
        {...this.props}
        menuIndex={0}
        activeMenuIndex={this.state.activeMenuIndex}
        setActiveMenuIndex={this.setActiveMenuIndex}
      />
    );
  }
}

export default CommandsList;
