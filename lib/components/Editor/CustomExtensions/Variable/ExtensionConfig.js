import { Node, mergeAttributes } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";

import VariableSuggestion from "./VariableSuggestion";

const VariablePluginKey = new PluginKey("variables");
const Variable = Node.create({
  name: "variable",

  addOptions() {
    return {
      HTMLAttributes: { class: "scooter-editor-variable" },
      charOpen: "{{",
      charClose: "}}",
      renderLabel({ options, node }) {
        return `${options.charOpen}${node.attrs.label || node.attrs.id}${
          options.charClose
        }`;
      },
      suggestion: {},
    };
  },

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute("data-id"),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {};
          }

          return {
            "data-id": attributes.id,
          };
        },
      },

      label: {
        default: null,
        parseHTML: element => element.getAttribute("data-label"),
        renderHTML: attributes => {
          if (!attributes.label) {
            return {};
          }

          return {
            "data-label": attributes.label,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-variable]",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        { "data-variable": "" },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ];
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    });
  },

  addCommands() {
    return {
      setVariable:
        attributes =>
        ({ chain }) => {
          chain()
            .focus()
            .insertContent([
              {
                type: this.name,
                attrs: attributes,
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

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isVariable = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isVariable = true;
              tr.insertText("", pos, pos + node.nodeSize);

              return false;
            }

            return undefined;
          });

          return isVariable;
        }),
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

const suggestionConfig = {
  char: "{{",
  startOfLine: false,
  pluginKey: VariablePluginKey,
  command: ({ editor, range, props }) => {
    editor.chain().focus().deleteRange(range).setVariable(props).run();
  },

  items: () => [],
  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart: props => {
        reactRenderer = new ReactRenderer(VariableSuggestion, {
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

      onExit() {
        popup[0].destroy();
        reactRenderer.destroy();
      },
    };
  },
};

export default {
  configure: ({ suggestion = {} }) =>
    Variable.configure({
      suggestion: { ...suggestionConfig, ...suggestion },
    }),
};

export { VariablePluginKey };
