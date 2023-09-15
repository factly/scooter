import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "@tiptap/pm/state";
import tippy from "tippy.js";
import { isNilOrEmpty } from "@factly/scooter-shared-utils";

import CommandsList from "./CommandsList";
import { MENU_ITEMS } from "./constants";

const CommandsPluginKey = new PluginKey("commands");

export const SlashCommandsExtension = {
  configure: ({
    setImageUploadVisible,
    setEmbedFetcherVisible,
    setAddNewClaimVisible,
    setAddExistingClaimVisible,
    addonCommands,
    options: allowedCommandOptions,
  }) => {
    let commandItems = [
      MENU_ITEMS.WRITE_WITH_AI,
      MENU_ITEMS.PARAGRAPH,
      MENU_ITEMS.TABLE,
      MENU_ITEMS.H1,
      MENU_ITEMS.H2,
      MENU_ITEMS.H3,
      MENU_ITEMS.H4,
      MENU_ITEMS.H5,
      MENU_ITEMS.H6,
      MENU_ITEMS.LIST_ORDERED,
      MENU_ITEMS.LIST_BULLETS,
      MENU_ITEMS.BLOCKQUOTE,
      {
        ...MENU_ITEMS.IMAGE,
        command: (...args) => {
          setImageUploadVisible(true);
          MENU_ITEMS.IMAGE.command(...args);
        },
      },
      {
        ...MENU_ITEMS.ADD_EXISTING_CLAIM,
        command: (...args) => {
          setAddExistingClaimVisible(true);
          MENU_ITEMS.ADD_EXISTING_CLAIM.command(...args);
        },
      },
      {
        ...MENU_ITEMS.ADD_NEW_CLAIM,
        command: (...args) => {
          setAddNewClaimVisible(true);
          MENU_ITEMS.ADD_NEW_CLAIM.command(...args);
        },
      },
      MENU_ITEMS.CODE,
      MENU_ITEMS.EMOJI,
      MENU_ITEMS.DIVIDER,
      MENU_ITEMS.RAW_HTML,
      {
        ...MENU_ITEMS.EMBED,
        command: (...args) => {
          setEmbedFetcherVisible(true);
          MENU_ITEMS.EMBED.command(...args);
        },
      },
    ];

    if (!isNilOrEmpty(allowedCommandOptions)) {
      commandItems = commandItems.filter(({ optionName }) =>
        allowedCommandOptions.includes(optionName)
      );
    }

    if (!isNilOrEmpty(addonCommands)) {
      commandItems = commandItems.concat(addonCommands);
    }

    return Extension.create({
      name: "SlashCommandsExtension",
      addOptions() {
        return {
          HTMLAttributes: {
            class: "commands",
          },
          suggestion: {
            char: "/",
            startOfLine: false,
            pluginKey: CommandsPluginKey,
            command: ({ editor, range, props }) => {
              props.command({ editor, range });
            },

            items: ({ query }) => {
              const filteredItems = commandItems.filter(
                ({ title, description }) =>
                  title.toLowerCase().includes(query.toLowerCase()) ||
                  description.toLowerCase().includes(query.toLowerCase())
              );

              return isNilOrEmpty(filteredItems)
                ? [MENU_ITEMS.NO_RESULT]
                : filteredItems;
            },

            render: () => {
              let reactRenderer;
              let popup;

              return {
                onStart: props => {
                  reactRenderer = new ReactRenderer(CommandsList, {
                    props,
                    editor: props.editor,
                  });
                  popup = tippy("body", {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: reactRenderer.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                    placement: "bottom-start",
                    arrow: false,
                    zIndex: 99999,
                    theme: "light",
                  });
                },
                onUpdate(props) {
                  reactRenderer.updateProps(props);

                  popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                  });
                },
                onKeyDown(props) {
                  return reactRenderer.ref?.onKeyDown(props);
                },
                onExit() {
                  popup && popup[0].destroy();
                  reactRenderer && reactRenderer.destroy();
                },
              };
            },
          },
        };
      },

      addProseMirrorPlugins() {
        return [
          Suggestion({
            editor: this.editor,
            ...this.options.suggestion,
          }),
        ];
      },
    });
  },
};

export default SlashCommandsExtension;
