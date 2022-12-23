import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";
import { isNilOrEmpty } from "utils/common";

import CommandsList from "./CommandsList";
import { MENU_ITEMS } from "./constants";

const CommandsPluginKey = new PluginKey("commands");

export default {
  configure: ({
    setImageUploadVisible,
    setEmbedFetcherVisible,
    addonCommands,
    options: allowedCommandOptions,
  }) => {
    let commandItems = [
      MENU_ITEMS.PARAGRAPH,
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
      MENU_ITEMS.CODE,
      MENU_ITEMS.TASKLIST,
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
              const filteredItems = commandItems.filter(({ title }) =>
                title.toLowerCase().includes(query.toLowerCase())
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
