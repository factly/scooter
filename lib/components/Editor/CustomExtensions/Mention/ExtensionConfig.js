import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import { createMentionSuggestions } from "./helpers";
import { MentionList } from "./MentionList";

const suggestion = {
  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart: props => {
        reactRenderer = new ReactRenderer(MentionList, {
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
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return reactRenderer.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        reactRenderer.destroy();
      },
    };
  },
};

const Mentions = Mention.extend({
  addCommands() {
    return {
      setMention:
        name =>
        ({ chain }) => {
          chain()
            .focus()
            .insertContent([
              {
                type: this.name,
                attrs: {
                  id: name,
                  label: name,
                },
              },
              {
                type: "text",
                text: " ",
              },
            ])
            .run();
        },
    };
  },
});

export default {
  configure: ({ suggestion: suggestionConfig = {}, ...otherConfig }) =>
    Mentions.configure({
      ...otherConfig,
      suggestion: { ...suggestion, ...suggestionConfig },
    }),
};

export { createMentionSuggestions };
